from functools import wraps
from flask import session, jsonify, request
from src.models.user import User, UserRole, UserStatus

def login_required(f):
    """Decorator to require user login"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Authentication required'}), 401
        
        # Check if user still exists and is active
        user = User.query.get(user_id)
        if not user or user.status != UserStatus.ACTIVE:
            session.clear()
            return jsonify({'success': False, 'message': 'Invalid session'}), 401
        
        # Update last activity
        user.update_last_active()
        
        return f(*args, **kwargs)
    return decorated_function

def require_role(allowed_roles):
    """Decorator to require specific user roles"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_id = session.get('user_id')
            if not user_id:
                return jsonify({'success': False, 'message': 'Authentication required'}), 401
            
            user = User.query.get(user_id)
            if not user or user.status != UserStatus.ACTIVE:
                session.clear()
                return jsonify({'success': False, 'message': 'Invalid session'}), 401
            
            # Check if user has required role
            if user.role not in allowed_roles:
                return jsonify({'success': False, 'message': 'Insufficient permissions'}), 403
            
            # Update last activity
            user.update_last_active()
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def require_institution_access(f):
    """Decorator to require institution-level access"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Authentication required'}), 401
        
        user = User.query.get(user_id)
        if not user or user.status != UserStatus.ACTIVE:
            session.clear()
            return jsonify({'success': False, 'message': 'Invalid session'}), 401
        
        # Super admins have access to everything
        if user.is_super_admin():
            user.update_last_active()
            return f(*args, **kwargs)
        
        # Institution admins can only access their own institution
        if user.is_institution_admin():
            institution_id = kwargs.get('institution_id') or request.view_args.get('institution_id')
            if institution_id and user.institution_id != int(institution_id):
                return jsonify({'success': False, 'message': 'Access denied to this institution'}), 403
            
            user.update_last_active()
            return f(*args, **kwargs)
        
        # Other users don't have institution-level access
        return jsonify({'success': False, 'message': 'Insufficient permissions'}), 403
    return decorated_function

def require_same_institution(f):
    """Decorator to require users to be from the same institution"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Authentication required'}), 401
        
        user = User.query.get(user_id)
        if not user or user.status != UserStatus.ACTIVE:
            session.clear()
            return jsonify({'success': False, 'message': 'Invalid session'}), 401
        
        # Super admins bypass institution restrictions
        if user.is_super_admin():
            user.update_last_active()
            return f(*args, **kwargs)
        
        # Check if target user is from same institution
        target_user_id = kwargs.get('user_id') or request.view_args.get('user_id')
        if target_user_id:
            target_user = User.query.get(target_user_id)
            if not target_user or target_user.institution_id != user.institution_id:
                return jsonify({'success': False, 'message': 'Can only access users from your institution'}), 403
        
        user.update_last_active()
        return f(*args, **kwargs)
    return decorated_function

def require_email_verified(f):
    """Decorator to require email verification"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Authentication required'}), 401
        
        user = User.query.get(user_id)
        if not user or user.status != UserStatus.ACTIVE:
            session.clear()
            return jsonify({'success': False, 'message': 'Invalid session'}), 401
        
        if not user.is_email_verified:
            return jsonify({'success': False, 'message': 'Email verification required'}), 403
        
        user.update_last_active()
        return f(*args, **kwargs)
    return decorated_function

def require_active_institution(f):
    """Decorator to require active institution"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Authentication required'}), 401
        
        user = User.query.get(user_id)
        if not user or user.status != UserStatus.ACTIVE:
            session.clear()
            return jsonify({'success': False, 'message': 'Invalid session'}), 401
        
        # Super admins bypass this check
        if user.is_super_admin():
            user.update_last_active()
            return f(*args, **kwargs)
        
        # Check if user's institution is active
        if not user.institution or not user.institution.is_active:
            return jsonify({'success': False, 'message': 'Institution is not active'}), 403
        
        user.update_last_active()
        return f(*args, **kwargs)
    return decorated_function

def rate_limit(max_requests=100, window_minutes=15):
    """Basic rate limiting decorator"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # This is a simplified rate limiting implementation
            # In production, you'd want to use Redis or similar
            user_id = session.get('user_id')
            ip_address = request.remote_addr
            
            # For now, just log the attempt
            # TODO: Implement proper rate limiting with Redis
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def log_access(action="access"):
    """Decorator to log user access for audit trail"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_id = session.get('user_id')
            ip_address = request.remote_addr
            user_agent = request.headers.get('User-Agent', 'Unknown')
            endpoint = request.endpoint
            method = request.method
            
            # TODO: Implement audit logging
            # For now, we'll just proceed with the request
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Role-specific decorators for convenience
def super_admin_required(f):
    """Convenience decorator for super admin only access"""
    return require_role([UserRole.SUPER_ADMIN])(f)

def admin_required(f):
    """Convenience decorator for admin access (super admin or institution admin)"""
    return require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])(f)

def alumni_required(f):
    """Convenience decorator for alumni access"""
    return require_role([UserRole.ALUMNI])(f)

def student_required(f):
    """Convenience decorator for student access"""
    return require_role([UserRole.STUDENT])(f)

def user_required(f):
    """Convenience decorator for any authenticated user"""
    return require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN, UserRole.ALUMNI, UserRole.STUDENT])(f)

# Feature-specific permission checks
def can_manage_users(user, target_institution_id=None):
    """Check if user can manage users"""
    if user.is_super_admin():
        return True
    
    if user.is_institution_admin():
        if target_institution_id is None or user.institution_id == target_institution_id:
            return True
    
    return False

def can_access_analytics(user, target_institution_id=None):
    """Check if user can access analytics"""
    if user.is_super_admin():
        return True
    
    if user.is_institution_admin():
        if target_institution_id is None or user.institution_id == target_institution_id:
            return True
    
    return False

def can_send_messages(user, target_user):
    """Check if user can send messages to target user"""
    if user.is_super_admin():
        return True
    
    # Same institution users can message each other
    if user.institution_id == target_user.institution_id:
        return True
    
    return False

def can_view_profile(user, target_user, profile_privacy="institution"):
    """Check if user can view target user's profile"""
    if user.id == target_user.id:
        return True
    
    if user.is_super_admin():
        return True
    
    if profile_privacy == "public":
        return True
    
    if profile_privacy == "institution" and user.institution_id == target_user.institution_id:
        return True
    
    return False
