from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Alumni(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    graduation_year = db.Column(db.Integer, nullable=False)
    department = db.Column(db.String(100), nullable=False)
    current_position = db.Column(db.String(100))
    current_company = db.Column(db.String(100))
    location = db.Column(db.String(100))
    bio = db.Column(db.Text)
    skills = db.Column(db.Text)  # JSON string of skills
    linkedin_url = db.Column(db.String(200))
    is_mentor = db.Column(db.Boolean, default=False)
    profile_image = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Alumni {self.first_name} {self.last_name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': f"{self.first_name} {self.last_name}",
            'graduation_year': self.graduation_year,
            'department': self.department,
            'current_position': self.current_position,
            'current_company': self.current_company,
            'location': self.location,
            'bio': self.bio,
            'skills': self.skills,
            'linkedin_url': self.linkedin_url,
            'is_mentor': self.is_mentor,
            'profile_image': self.profile_image,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

