from flask import Blueprint, jsonify, request, session
from src.models.user import User, UserRole, UserStatus, db
from src.models.institution import Institution
from src.models.invite_token import InviteToken, EmailVerification
from src.models.alumni import Alumni
from src.models.student import Student
from src.utils.auth_decorators import require_role
from src.utils.email_service import send_invite_email, send_verification_code_email
from datetime import datetime
import json

account_creation_bp = Blueprint('account_creation', __name__)

@account_creation_bp.route('/invite/validate', methods=['POST'])
def validate_invite_token():
    """Validate invite token and get user info"""
    data = request.json
    token = data.get('token')
    
    if not token:
        return jsonify({'success': False, 'message': 'Token is required'}), 400
    
    # Find and validate token
    invite_token = InviteToken.find_by_token(token)
    
    if not invite_token:
        return jsonify({'success': False, 'message': 'Invalid or expired invite token'}), 400
    
    if not invite_token.is_valid():
        return jsonify({'success': False, 'message': 'Token has expired or been used'}), 400
    
    # Get institution info
    institution = Institution.query.get(invite_token.institution_id)
    if not institution or not institution.is_active:
        return jsonify({'success': False, 'message': 'Institution is not active'}), 400
    
    return jsonify({
        'success': True,
        'invite_info': {
            'email': invite_token.email,
            'user_type': invite_token.user_type,
            'graduation_year': invite_token.graduation_year,
            'department': invite_token.department,
            'institution_name': institution.name,
            'token_expires': invite_token.expires_at.isoformat()
        }
    }), 200

@account_creation_bp.route('/account/verify-graduation', methods=['POST'])
def verify_graduation_year():
    """Verify graduation year during account creation"""
    data = request.json
    token = data.get('token')
    provided_year = data.get('graduation_year')
    
    if not token or not provided_year:
        return jsonify({'success': False, 'message': 'Token and graduation year are required'}), 400
    
    # Find and validate token
    invite_token = InviteToken.find_by_token(token)
    
    if not invite_token or not invite_token.is_valid():
        return jsonify({'success': False, 'message': 'Invalid or expired invite token'}), 400
    
    # Verify graduation year matches
    if invite_token.graduation_year != int(provided_year):
        return jsonify({
            'success': False,
            'message': 'Graduation year does not match our records'
        }), 400
    
    return jsonify({
        'success': True,
        'message': 'Graduation year verified successfully'
    }), 200

@account_creation_bp.route('/account/create', methods=['POST'])
def create_user_account():
    """Create user account after verification"""
    data = request.json
    token = data.get('token')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    graduation_year = data.get('graduation_year')
    
    # Validate input
    if not all([token, password, confirm_password, graduation_year]):
        return jsonify({'success': False, 'message': 'All fields are required'}), 400
    
    if password != confirm_password:
        return jsonify({'success': False, 'message': 'Passwords do not match'}), 400
    
    if len(password) < 8:
        return jsonify({'success': False, 'message': 'Password must be at least 8 characters'}), 400
    
    # Find and validate token
    invite_token = InviteToken.find_by_token(token)
    
    if not invite_token or not invite_token.is_valid():
        return jsonify({'success': False, 'message': 'Invalid or expired invite token'}), 400
    
    # Verify graduation year one more time
    if invite_token.graduation_year != int(graduation_year):
        return jsonify({'success': False, 'message': 'Invalid graduation year'}), 400
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=invite_token.email).first()
    if existing_user:
        return jsonify({'success': False, 'message': 'User with this email already exists'}), 400
    
    try:
        # Get request info for security tracking
        ip_address = request.remote_addr
        user_agent = request.headers.get('User-Agent', '')
        
        # Create user account
        username = invite_token.email.split('@')[0]
        # Ensure username uniqueness
        counter = 1
        original_username = username
        while User.query.filter_by(username=username).first():
            username = f"{original_username}{counter}"
            counter += 1
        
        new_user = User(
            username=username,
            email=invite_token.email,
            institution_id=invite_token.institution_id,
            role=UserRole.ALUMNI if invite_token.user_type == 'alumni' else UserRole.STUDENT,
            status=UserStatus.ACTIVE,  # Activate immediately after verification
            first_name=invite_token.profile_data.get('first_name', ''),
            last_name=invite_token.profile_data.get('last_name', ''),
            invited_by=invite_token.created_by,
            invite_token_id=invite_token.id
        )
        
        # Set password
        new_user.set_password(password)
        new_user.activate_account()
        
        db.session.add(new_user)
        db.session.flush()  # Flush to get user ID
        
        # Create profile based on user type
        if invite_token.user_type == 'alumni':
            alumni_profile = Alumni(
                user_id=new_user.id,
                alumni_id=invite_token.student_id,
                first_name=invite_token.profile_data.get('first_name', ''),
                last_name=invite_token.profile_data.get('last_name', ''),
                graduation_year=invite_token.graduation_year,
                department=invite_token.department,
                # Pre-populate from spreadsheet data
                graduation_month=invite_token.profile_data.get('graduation_month'),
                degree_type=invite_token.profile_data.get('degree_type'),
                major=invite_token.profile_data.get('major'),
                minor=invite_token.profile_data.get('minor'),
                current_position=invite_token.profile_data.get('current_position'),
                current_company=invite_token.profile_data.get('current_company'),
                location=invite_token.profile_data.get('location'),
                bio=invite_token.profile_data.get('bio'),
                skills=invite_token.profile_data.get('skills', []),
                linkedin_url=invite_token.profile_data.get('linkedin_url'),
                phone=invite_token.profile_data.get('phone')
            )
            db.session.add(alumni_profile)
            
        else:  # student
            student_profile = Student(
                user_id=new_user.id,
                student_id=invite_token.student_id,
                first_name=invite_token.profile_data.get('first_name', ''),
                last_name=invite_token.profile_data.get('last_name', ''),
                enrollment_year=invite_token.profile_data.get('enrollment_year', datetime.now().year),
                expected_graduation_year=invite_token.graduation_year,
                department=invite_token.department,
                # Pre-populate from spreadsheet data
                current_year=invite_token.profile_data.get('current_year'),
                current_semester=invite_token.profile_data.get('current_semester'),
                major=invite_token.profile_data.get('major'),
                minor=invite_token.profile_data.get('minor'),
                bio=invite_token.profile_data.get('bio'),
                skills=invite_token.profile_data.get('skills', []),
                interests=invite_token.profile_data.get('interests', []),
                career_interests=invite_token.profile_data.get('career_interests', []),
                phone=invite_token.profile_data.get('phone'),
                address=invite_token.profile_data.get('address')
            )
            db.session.add(student_profile)
        
        # Mark token as used
        invite_token.use_token(new_user.id, ip_address, user_agent)
        
        # Update user login info
        new_user.update_last_login(ip_address)
        
        db.session.commit()
        
        # Set session
        session['user_id'] = new_user.id
        session['user_type'] = new_user.role.value
        
        return jsonify({
            'success': True,
            'user': new_user.to_dict(),
            'user_type': new_user.role.value,
            'message': 'Account created successfully'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'Error creating account: {str(e)}'}), 500

@account_creation_bp.route('/email/send-verification', methods=['POST'])
def send_email_verification():
    """Send email verification code"""
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'success': False, 'message': 'Email is required'}), 400
    
    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    if user.is_email_verified:
        return jsonify({'success': False, 'message': 'Email already verified'}), 400
    
    try:
        # Generate verification code
        verification = EmailVerification.generate_verification(user.id, email)
        db.session.add(verification)
        db.session.commit()
        
        # Send verification email
        send_verification_code_email(email, verification.verification_code)
        
        # Update user record
        user.email_verification_sent_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Verification code sent successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'Error sending verification: {str(e)}'}), 500

@account_creation_bp.route('/email/verify', methods=['POST'])
def verify_email():
    """Verify email with code"""
    data = request.json
    email = data.get('email')
    code = data.get('code')
    
    if not all([email, code]):
        return jsonify({'success': False, 'message': 'Email and code are required'}), 400
    
    # Find user
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    if user.is_email_verified:
        return jsonify({'success': False, 'message': 'Email already verified'}), 400
    
    # Find latest verification
    verification = EmailVerification.query.filter_by(
        user_id=user.id, 
        email=email
    ).order_by(EmailVerification.created_at.desc()).first()
    
    if not verification:
        return jsonify({'success': False, 'message': 'No verification code found'}), 404
    
    # Verify code
    if verification.verify(code):
        user.is_email_verified = True
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Email verified successfully'
        }), 200
    else:
        remaining_attempts = verification.max_attempts - verification.attempts
        if remaining_attempts > 0:
            return jsonify({
                'success': False,
                'message': f'Invalid code. {remaining_attempts} attempts remaining'
            }), 400
        else:
            return jsonify({
                'success': False,
                'message': 'Maximum verification attempts exceeded. Please request a new code'
            }), 400

@account_creation_bp.route('/password/change-first-time', methods=['POST'])
def change_first_time_password():
    """Change password for first-time admin login"""
    data = request.json
    username = data.get('username')
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')
    
    if not all([username, current_password, new_password, confirm_password]):
        return jsonify({'success': False, 'message': 'All fields are required'}), 400
    
    if new_password != confirm_password:
        return jsonify({'success': False, 'message': 'New passwords do not match'}), 400
    
    if len(new_password) < 8:
        return jsonify({'success': False, 'message': 'Password must be at least 8 characters'}), 400
    
    # Find user
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    if not user.must_change_password:
        return jsonify({'success': False, 'message': 'Password change not required'}), 400
    
    # Check current password
    if not user.check_password(current_password):
        return jsonify({'success': False, 'message': 'Current password is incorrect'}), 400
    
    try:
        # Update password
        user.set_password(new_password)
        user.must_change_password = False
        
        # Update institution if this is admin
        if user.is_institution_admin():
            institution = Institution.query.get(user.institution_id)
            if institution:
                institution.admin_must_change_password = False
                institution.admin_temp_password = None
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Password updated successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'Error updating password: {str(e)}'}), 500
