from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import enum

db = SQLAlchemy()

class UserRole(enum.Enum):
    SUPER_ADMIN = "super_admin"  # Platform super admin
    INSTITUTION_ADMIN = "institution_admin"  # Institution administrator
    ALUMNI = "alumni"  # Alumni user
    STUDENT = "student"  # Current student

class UserStatus(enum.Enum):
    PENDING = "pending"  # Account created but not activated
    ACTIVE = "active"  # Active account
    INACTIVE = "inactive"  # Temporarily deactivated
    SUSPENDED = "suspended"  # Suspended account
    DELETED = "deleted"  # Soft deleted account

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255))
    
    # Institution relationship
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'))
    
    # User role and status
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.ALUMNI)
    status = db.Column(db.Enum(UserStatus), nullable=False, default=UserStatus.PENDING)
    
    # Profile basics
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    phone = db.Column(db.String(20))
    profile_image = db.Column(db.String(300))
    
    # Account management
    is_email_verified = db.Column(db.Boolean, default=False)
    email_verification_sent_at = db.Column(db.DateTime)
    last_login = db.Column(db.DateTime)
    login_count = db.Column(db.Integer, default=0)
    
    # Password management
    password_changed_at = db.Column(db.DateTime)
    must_change_password = db.Column(db.Boolean, default=False)
    password_reset_token = db.Column(db.String(255))
    password_reset_expires = db.Column(db.DateTime)
    
    # Security and tracking
    last_active = db.Column(db.DateTime)
    last_ip = db.Column(db.String(45))
    two_factor_enabled = db.Column(db.Boolean, default=False)
    two_factor_secret = db.Column(db.String(32))
    
    # Account lifecycle
    invited_by = db.Column(db.Integer, db.ForeignKey('users.id'))  # Who invited this user
    invite_token_id = db.Column(db.Integer, db.ForeignKey('invite_tokens.id'))  # Original invite token
    account_activated_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = db.Column(db.DateTime)  # Soft delete timestamp
    
    # Relationships
    alumni_profile = db.relationship('Alumni', backref='user', uselist=False, lazy='select')
    student_profile = db.relationship('Student', backref='user', uselist=False, lazy='select')
    
    # Self-referential relationship for invitation tracking
    invited_users = db.relationship('User', backref=db.backref('inviter', remote_side=[id]), lazy='dynamic')
    
    def __repr__(self):
        return f'<User {self.username} ({self.role.value})>'
    
    def set_password(self, password):
        """Set password hash"""
        self.password_hash = generate_password_hash(password)
        self.password_changed_at = datetime.utcnow()
        self.must_change_password = False
    
    def check_password(self, password):
        """Check if provided password matches hash"""
        if not self.password_hash:
            return False
        return check_password_hash(self.password_hash, password)
    
    def update_last_login(self, ip_address=None):
        """Update login tracking information"""
        self.last_login = datetime.utcnow()
        self.last_active = datetime.utcnow()
        self.login_count += 1
        if ip_address:
            self.last_ip = ip_address
        db.session.commit()
    
    def update_last_active(self):
        """Update last activity timestamp"""
        self.last_active = datetime.utcnow()
        db.session.commit()
    
    def activate_account(self):
        """Activate the user account"""
        self.status = UserStatus.ACTIVE
        self.account_activated_at = datetime.utcnow()
        db.session.commit()
    
    def deactivate_account(self):
        """Deactivate the user account"""
        self.status = UserStatus.INACTIVE
        db.session.commit()
    
    def suspend_account(self):
        """Suspend the user account"""
        self.status = UserStatus.SUSPENDED
        db.session.commit()
    
    def soft_delete(self):
        """Soft delete the user account"""
        self.status = UserStatus.DELETED
        self.deleted_at = datetime.utcnow()
        db.session.commit()
    
    def get_full_name(self):
        """Get user's full name"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username
    
    def is_super_admin(self):
        """Check if user is super admin"""
        return self.role == UserRole.SUPER_ADMIN
    
    def is_institution_admin(self):
        """Check if user is institution admin"""
        return self.role == UserRole.INSTITUTION_ADMIN
    
    def is_alumni(self):
        """Check if user is alumni"""
        return self.role == UserRole.ALUMNI
    
    def is_student(self):
        """Check if user is student"""
        return self.role == UserRole.STUDENT
    
    def can_access_admin_panel(self):
        """Check if user can access admin features"""
        return self.role in [UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN]
    
    def can_manage_institution(self, institution_id=None):
        """Check if user can manage institution"""
        if self.is_super_admin():
            return True
        if self.is_institution_admin():
            return institution_id is None or self.institution_id == institution_id
        return False
    
    def can_message_user(self, target_user):
        """Check if user can message another user"""
        # Same institution users can message each other
        if self.institution_id == target_user.institution_id:
            return True
        
        # Super admins can message anyone
        if self.is_super_admin():
            return True
        
        return False
    
    def to_dict(self, include_sensitive=False):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'institution_id': self.institution_id,
            'role': self.role.value if self.role else None,
            'status': self.status.value if self.status else None,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': self.get_full_name(),
            'phone': self.phone,
            'profile_image': self.profile_image,
            'is_email_verified': self.is_email_verified,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'login_count': self.login_count,
            'last_active': self.last_active.isoformat() if self.last_active else None,
            'two_factor_enabled': self.two_factor_enabled,
            'account_activated_at': self.account_activated_at.isoformat() if self.account_activated_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_sensitive:
            data.update({
                'must_change_password': self.must_change_password,
                'password_changed_at': self.password_changed_at.isoformat() if self.password_changed_at else None,
                'last_ip': self.last_ip,
                'invited_by': self.invited_by,
                'invite_token_id': self.invite_token_id,
                'email_verification_sent_at': self.email_verification_sent_at.isoformat() if self.email_verification_sent_at else None
            })
        
        return data
