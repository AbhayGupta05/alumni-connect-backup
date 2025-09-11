from flask import Blueprint, jsonify, request, session
from src.models.user import User, UserRole, UserStatus, db
from src.models.institution import Institution, DataUploadBatch
from src.models.invite_token import InviteToken
from src.utils.auth_decorators import require_role
from src.utils.email_service import send_admin_credentials_email, send_bulk_invitations
import secrets

institutions_bp = Blueprint('institutions', __name__)

@institutions_bp.route('/institutions', methods=['GET'])
@require_role([UserRole.SUPER_ADMIN])
def get_institutions():
    """Get all institutions (Super Admin only)"""
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)
    search = request.args.get('search', '')
    status = request.args.get('status', 'all')  # all, active, inactive
    
    query = Institution.query
    
    # Apply search filter
    if search:
        query = query.filter(
            Institution.name.ilike(f'%{search}%') |
            Institution.code.ilike(f'%{search}%') |
            Institution.email_domain.ilike(f'%{search}%')
        )
    
    # Apply status filter
    if status != 'all':
        is_active = status == 'active'
        query = query.filter(Institution.is_active == is_active)
    
    # Order by creation date
    query = query.order_by(Institution.created_at.desc())
    
    # Paginate results
    institutions_page = query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'success': True,
        'institutions': [inst.to_dict() for inst in institutions_page.items],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': institutions_page.total,
            'pages': institutions_page.pages,
            'has_next': institutions_page.has_next,
            'has_prev': institutions_page.has_prev
        }
    }), 200

@institutions_bp.route('/institutions', methods=['POST'])
@require_role([UserRole.SUPER_ADMIN])
def create_institution():
    """Create new institution (Super Admin only)"""
    data = request.json
    
    # Validate required fields
    required_fields = ['name', 'code', 'email_domain', 'admin_email']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'success': False, 'message': f'{field} is required'}), 400
    
    # Check if institution code already exists
    if Institution.query.filter_by(code=data['code']).first():
        return jsonify({'success': False, 'message': 'Institution code already exists'}), 400
    
    # Check if admin email already exists
    if User.query.filter_by(email=data['admin_email']).first():
        return jsonify({'success': False, 'message': 'Admin email already exists'}), 400
    
    try:
        # Generate admin credentials
        admin_creds = Institution.generate_admin_credentials(
            data['name'], data['admin_email']
        )
        
        # Create institution
        institution = Institution(
            name=data['name'],
            code=data['code'].upper(),
            email_domain=data['email_domain'],
            address=data.get('address'),
            phone=data.get('phone'),
            website=data.get('website'),
            logo_url=data.get('logo_url'),
            max_users=data.get('max_users', 10000),
            features_enabled=data.get('features_enabled', []),
            admin_email=admin_creds['admin_email'],
            admin_password_hash=admin_creds['admin_password_hash'],
            admin_temp_password=admin_creds['admin_temp_password']
        )
        
        db.session.add(institution)
        db.session.commit()
        
        # Create admin user account
        admin_user = User(
            username=f"admin_{institution.code.lower()}",
            email=data['admin_email'],
            institution_id=institution.id,
            role=UserRole.INSTITUTION_ADMIN,
            status=UserStatus.ACTIVE,
            first_name=data.get('admin_first_name', 'Admin'),
            last_name=data.get('admin_last_name', 'User'),
            must_change_password=True,
            invited_by=session.get('user_id')
        )
        
        admin_user.set_password(admin_creds['admin_temp_password'])
        db.session.add(admin_user)
        db.session.commit()
        
        # Send credentials email
        send_admin_credentials_email(
            admin_creds['admin_email'],
            institution.name,
            admin_user.username,
            admin_creds['admin_temp_password']
        )
        
        return jsonify({
            'success': True,
            'institution': institution.to_dict(include_sensitive=True),
            'message': 'Institution created successfully. Admin credentials sent via email.'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'Error creating institution: {str(e)}'}), 500

@institutions_bp.route('/institutions/<int:institution_id>', methods=['GET'])
@require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])
def get_institution(institution_id):
    """Get specific institution details"""
    current_user = User.query.get(session.get('user_id'))
    
    # Check permissions
    if (current_user.role == UserRole.INSTITUTION_ADMIN and 
        current_user.institution_id != institution_id):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    institution = Institution.query.get_or_404(institution_id)
    
    # Get institution statistics
    stats = {
        'total_users': institution.get_user_count(),
        'active_users': institution.users.filter_by(status=UserStatus.ACTIVE).count(),
        'pending_users': institution.users.filter_by(status=UserStatus.PENDING).count(),
        'alumni_count': institution.users.filter_by(role=UserRole.ALUMNI, status=UserStatus.ACTIVE).count(),
        'student_count': institution.users.filter_by(role=UserRole.STUDENT, status=UserStatus.ACTIVE).count(),
        'recent_uploads': institution.upload_batches.filter(
            DataUploadBatch.uploaded_at >= db.func.date('now', '-30 days')
        ).count()
    }
    
    response_data = institution.to_dict(include_sensitive=current_user.is_super_admin())
    response_data['statistics'] = stats
    
    return jsonify({
        'success': True,
        'institution': response_data
    }), 200

@institutions_bp.route('/institutions/<int:institution_id>', methods=['PUT'])
@require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])
def update_institution(institution_id):
    """Update institution details"""
    current_user = User.query.get(session.get('user_id'))
    
    # Check permissions
    if (current_user.role == UserRole.INSTITUTION_ADMIN and 
        current_user.institution_id != institution_id):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    institution = Institution.query.get_or_404(institution_id)
    data = request.json
    
    try:
        # Update allowed fields
        updateable_fields = ['name', 'address', 'phone', 'website', 'logo_url']
        for field in updateable_fields:
            if field in data:
                setattr(institution, field, data[field])
        
        # Super admin can update more sensitive fields
        if current_user.is_super_admin():
            admin_fields = ['code', 'email_domain', 'max_users', 'features_enabled', 'is_active']
            for field in admin_fields:
                if field in data:
                    if field == 'code':
                        # Check uniqueness for code changes
                        existing = Institution.query.filter_by(code=data[field]).first()
                        if existing and existing.id != institution_id:
                            return jsonify({'success': False, 'message': 'Institution code already exists'}), 400
                    setattr(institution, field, data[field])
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'institution': institution.to_dict(include_sensitive=current_user.is_super_admin()),
            'message': 'Institution updated successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'Error updating institution: {str(e)}'}), 500

@institutions_bp.route('/institutions/<int:institution_id>/users', methods=['GET'])
@require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])
def get_institution_users(institution_id):
    """Get users belonging to an institution"""
    current_user = User.query.get(session.get('user_id'))
    
    # Check permissions
    if (current_user.role == UserRole.INSTITUTION_ADMIN and 
        current_user.institution_id != institution_id):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)
    role_filter = request.args.get('role', 'all')
    status_filter = request.args.get('status', 'all')
    search = request.args.get('search', '')
    
    query = User.query.filter_by(institution_id=institution_id)
    
    # Apply filters
    if role_filter != 'all':
        query = query.filter_by(role=UserRole(role_filter))
    
    if status_filter != 'all':
        query = query.filter_by(status=UserStatus(status_filter))
    
    if search:
        query = query.filter(
            User.username.ilike(f'%{search}%') |
            User.email.ilike(f'%{search}%') |
            User.first_name.ilike(f'%{search}%') |
            User.last_name.ilike(f'%{search}%')
        )
    
    # Order by creation date
    query = query.order_by(User.created_at.desc())
    
    # Paginate results
    users_page = query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'success': True,
        'users': [user.to_dict() for user in users_page.items],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': users_page.total,
            'pages': users_page.pages,
            'has_next': users_page.has_next,
            'has_prev': users_page.has_prev
        }
    }), 200

@institutions_bp.route('/institutions/<int:institution_id>/upload-batches', methods=['GET'])
@require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])
def get_upload_batches(institution_id):
    """Get data upload batches for an institution"""
    current_user = User.query.get(session.get('user_id'))
    
    # Check permissions
    if (current_user.role == UserRole.INSTITUTION_ADMIN and 
        current_user.institution_id != institution_id):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)
    batch_type = request.args.get('type', 'all')  # all, alumni, student
    status_filter = request.args.get('status', 'all')
    
    query = DataUploadBatch.query.filter_by(institution_id=institution_id)
    
    # Apply filters
    if batch_type != 'all':
        query = query.filter_by(batch_type=batch_type)
    
    if status_filter != 'all':
        query = query.filter_by(status=status_filter)
    
    # Order by upload date
    query = query.order_by(DataUploadBatch.uploaded_at.desc())
    
    # Paginate results
    batches_page = query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'success': True,
        'batches': [batch.to_dict() for batch in batches_page.items],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': batches_page.total,
            'pages': batches_page.pages,
            'has_next': batches_page.has_next,
            'has_prev': batches_page.has_prev
        }
    }), 200

@institutions_bp.route('/institutions/<int:institution_id>/disable', methods=['POST'])
@require_role([UserRole.SUPER_ADMIN])
def disable_institution(institution_id):
    """Disable an institution (Super Admin only)"""
    institution = Institution.query.get_or_404(institution_id)
    
    institution.is_active = False
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Institution disabled successfully'
    }), 200

@institutions_bp.route('/institutions/<int:institution_id>/enable', methods=['POST'])
@require_role([UserRole.SUPER_ADMIN])
def enable_institution(institution_id):
    """Enable an institution (Super Admin only)"""
    institution = Institution.query.get_or_404(institution_id)
    
    institution.is_active = True
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Institution enabled successfully'
    }), 200

@institutions_bp.route('/institutions/<int:institution_id>/reset-admin-password', methods=['POST'])
@require_role([UserRole.SUPER_ADMIN])
def reset_admin_password(institution_id):
    """Reset institution admin password (Super Admin only)"""
    institution = Institution.query.get_or_404(institution_id)
    
    # Generate new temporary password
    new_temp_password = secrets.token_urlsafe(12)
    institution.admin_temp_password = new_temp_password
    institution.admin_must_change_password = True
    
    # Update admin user password
    admin_user = User.query.filter_by(
        institution_id=institution_id,
        role=UserRole.INSTITUTION_ADMIN
    ).first()
    
    if admin_user:
        admin_user.set_password(new_temp_password)
        admin_user.must_change_password = True
        
        db.session.commit()
        
        # Send new credentials email
        send_admin_credentials_email(
            admin_user.email,
            institution.name,
            admin_user.username,
            new_temp_password,
            is_reset=True
        )
        
        return jsonify({
            'success': True,
            'message': 'Admin password reset successfully. New credentials sent via email.'
        }), 200
    
    return jsonify({
        'success': False,
        'message': 'Admin user not found'
    }), 404
