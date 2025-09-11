from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from src.models.user import db
import secrets
import hashlib

class InviteToken(db.Model):
    __tablename__ = 'invite_tokens'
    
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(255), unique=True, nullable=False, index=True)
    token_hash = db.Column(db.String(255), nullable=False, index=True)  # Hashed version for security
    
    # Institution and user info
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # 'alumni' or 'student'
    
    # Verification data (for graduation year validation)
    graduation_year = db.Column(db.Integer)  # Expected graduation year
    student_id = db.Column(db.String(50))  # Student/Alumni ID from institution
    department = db.Column(db.String(100))
    
    # Pre-populated profile data from spreadsheet
    profile_data = db.Column(db.JSON)  # JSON with pre-filled profile information
    
    # Token status and lifecycle
    is_used = db.Column(db.Boolean, default=False)
    is_expired = db.Column(db.Boolean, default=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    
    # Tracking
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    used_at = db.Column(db.DateTime)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))  # Institution admin who created this
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # User who used this token
    
    # Security tracking
    ip_address = db.Column(db.String(45))  # IP address when token was used
    user_agent = db.Column(db.String(500))  # Browser info when token was used
    
    def __repr__(self):
        return f'<InviteToken {self.email} - {self.user_type}>'
    
    @classmethod
    def generate_token(cls, institution_id, email, user_type, graduation_year=None, 
                      student_id=None, department=None, profile_data=None, 
                      created_by=None, expires_in_days=30):
        """Generate a secure invite token"""
        # Generate a secure random token
        raw_token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(raw_token.encode()).hexdigest()
        
        # Set expiration
        expires_at = datetime.utcnow() + timedelta(days=expires_in_days)
        
        invite_token = cls(
            token=raw_token,
            token_hash=token_hash,
            institution_id=institution_id,
            email=email,
            user_type=user_type,
            graduation_year=graduation_year,
            student_id=student_id,
            department=department,
            profile_data=profile_data or {},
            expires_at=expires_at,
            created_by=created_by
        )
        
        return invite_token, raw_token
    
    @classmethod
    def find_by_token(cls, token):
        """Find token by raw token value"""
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        return cls.query.filter_by(token_hash=token_hash, is_used=False, is_expired=False).first()
    
    def is_valid(self):
        """Check if token is still valid"""
        if self.is_used or self.is_expired:
            return False
        
        if datetime.utcnow() > self.expires_at:
            self.is_expired = True
            db.session.commit()
            return False
        
        return True
    
    def use_token(self, user_id, ip_address=None, user_agent=None):
        """Mark token as used"""
        self.is_used = True
        self.used_at = datetime.utcnow()
        self.user_id = user_id
        self.ip_address = ip_address
        self.user_agent = user_agent
        db.session.commit()
    
    def expire_token(self):
        """Manually expire the token"""
        self.is_expired = True
        db.session.commit()
    
    def to_dict(self, include_sensitive=False):
        data = {
            'id': self.id,
            'institution_id': self.institution_id,
            'email': self.email,
            'user_type': self.user_type,
            'graduation_year': self.graduation_year,
            'student_id': self.student_id,
            'department': self.department,
            'is_used': self.is_used,
            'is_expired': self.is_expired,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'used_at': self.used_at.isoformat() if self.used_at else None,
            'created_by': self.created_by,
            'user_id': self.user_id
        }
        
        if include_sensitive:
            data.update({
                'token': self.token,
                'profile_data': self.profile_data,
                'ip_address': self.ip_address,
                'user_agent': self.user_agent
            })
        
        return data

class EmailVerification(db.Model):
    __tablename__ = 'email_verifications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    verification_code = db.Column(db.String(10), nullable=False)  # 6-digit code
    
    is_verified = db.Column(db.Boolean, default=False)
    attempts = db.Column(db.Integer, default=0)  # Track verification attempts
    max_attempts = db.Column(db.Integer, default=5)
    
    expires_at = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    verified_at = db.Column(db.DateTime)
    
    def __repr__(self):
        return f'<EmailVerification {self.email}>'
    
    @classmethod
    def generate_verification(cls, user_id, email, expires_in_minutes=15):
        """Generate email verification code"""
        verification_code = secrets.randbelow(999999)  # 6-digit code
        verification_code = f"{verification_code:06d}"  # Pad with zeros
        
        expires_at = datetime.utcnow() + timedelta(minutes=expires_in_minutes)
        
        verification = cls(
            user_id=user_id,
            email=email,
            verification_code=verification_code,
            expires_at=expires_at
        )
        
        return verification
    
    def is_valid(self):
        """Check if verification code is still valid"""
        if self.is_verified or self.attempts >= self.max_attempts:
            return False
        
        return datetime.utcnow() <= self.expires_at
    
    def verify(self, code):
        """Verify the code"""
        self.attempts += 1
        
        if not self.is_valid():
            return False
        
        if self.verification_code == code:
            self.is_verified = True
            self.verified_at = datetime.utcnow()
            db.session.commit()
            return True
        
        db.session.commit()
        return False
    
    def to_dict(self, include_sensitive=False):
        data = {
            'id': self.id,
            'user_id': self.user_id,
            'email': self.email,
            'is_verified': self.is_verified,
            'attempts': self.attempts,
            'max_attempts': self.max_attempts,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'verified_at': self.verified_at.isoformat() if self.verified_at else None
        }
        
        if include_sensitive:
            data['verification_code'] = self.verification_code
        
        return data
