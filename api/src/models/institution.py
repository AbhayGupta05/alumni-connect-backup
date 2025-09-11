from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db
import secrets
from werkzeug.security import generate_password_hash

class Institution(db.Model):
    __tablename__ = 'institutions'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)  # Unique institution identifier
    email_domain = db.Column(db.String(100), nullable=False)  # e.g., @university.edu
    address = db.Column(db.Text)
    phone = db.Column(db.String(20))
    website = db.Column(db.String(200))
    logo_url = db.Column(db.String(300))
    
    # Institution settings
    is_active = db.Column(db.Boolean, default=True)
    max_users = db.Column(db.Integer, default=10000)  # User limit for the institution
    features_enabled = db.Column(db.JSON)  # JSON array of enabled features
    
    # Admin account info
    admin_email = db.Column(db.String(120), nullable=False)
    admin_password_hash = db.Column(db.String(255))
    admin_temp_password = db.Column(db.String(50))  # Temporary password for first login
    admin_must_change_password = db.Column(db.Boolean, default=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    users = db.relationship('User', backref='institution', lazy='dynamic')
    upload_batches = db.relationship('DataUploadBatch', backref='institution', lazy='dynamic')
    
    def __repr__(self):
        return f'<Institution {self.name}>'
    
    @classmethod
    def generate_admin_credentials(cls, institution_name, admin_email):
        """Generate temporary admin credentials for new institution"""
        temp_password = secrets.token_urlsafe(12)
        return {
            'admin_email': admin_email,
            'admin_temp_password': temp_password,
            'admin_password_hash': generate_password_hash(temp_password)
        }
    
    def get_user_count(self):
        """Get current user count for this institution"""
        return self.users.count()
    
    def can_add_users(self, count=1):
        """Check if institution can add more users"""
        return self.get_user_count() + count <= self.max_users
    
    def to_dict(self, include_sensitive=False):
        data = {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'email_domain': self.email_domain,
            'address': self.address,
            'phone': self.phone,
            'website': self.website,
            'logo_url': self.logo_url,
            'is_active': self.is_active,
            'max_users': self.max_users,
            'current_user_count': self.get_user_count(),
            'features_enabled': self.features_enabled or [],
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_sensitive:
            data.update({
                'admin_email': self.admin_email,
                'admin_temp_password': self.admin_temp_password if self.admin_must_change_password else None,
                'admin_must_change_password': self.admin_must_change_password
            })
        
        return data

class DataUploadBatch(db.Model):
    __tablename__ = 'data_upload_batches'
    
    id = db.Column(db.Integer, primary_key=True)
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=False)
    batch_type = db.Column(db.String(20), nullable=False)  # 'alumni' or 'student'
    filename = db.Column(db.String(255), nullable=False)
    total_records = db.Column(db.Integer, default=0)
    processed_records = db.Column(db.Integer, default=0)
    successful_records = db.Column(db.Integer, default=0)
    failed_records = db.Column(db.Integer, default=0)
    
    # Processing status
    status = db.Column(db.String(20), default='pending')  # pending, processing, completed, failed
    error_log = db.Column(db.Text)  # JSON string of errors
    
    # Upload info
    uploaded_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    processed_at = db.Column(db.DateTime)
    
    def __repr__(self):
        return f'<DataUploadBatch {self.filename} - {self.status}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'institution_id': self.institution_id,
            'batch_type': self.batch_type,
            'filename': self.filename,
            'total_records': self.total_records,
            'processed_records': self.processed_records,
            'successful_records': self.successful_records,
            'failed_records': self.failed_records,
            'status': self.status,
            'progress_percentage': (self.processed_records / self.total_records * 100) if self.total_records > 0 else 0,
            'uploaded_by': self.uploaded_by,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None,
            'processed_at': self.processed_at.isoformat() if self.processed_at else None,
            'error_log': self.error_log
        }
