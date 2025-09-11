from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    
    # Student identification
    student_id = db.Column(db.String(50), nullable=False)  # Institution student ID
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    
    # Academic information
    enrollment_year = db.Column(db.Integer, nullable=False)
    expected_graduation_year = db.Column(db.Integer, nullable=False)
    current_year = db.Column(db.Integer)  # 1st year, 2nd year, etc.
    current_semester = db.Column(db.String(20))  # Fall 2024, Spring 2025
    department = db.Column(db.String(100), nullable=False)
    major = db.Column(db.String(100))
    minor = db.Column(db.String(100))
    gpa = db.Column(db.Float)
    
    # Contact and location
    phone = db.Column(db.String(20))
    address = db.Column(db.Text)
    emergency_contact_name = db.Column(db.String(100))
    emergency_contact_phone = db.Column(db.String(20))
    
    # Profile information
    bio = db.Column(db.Text)
    interests = db.Column(db.JSON)  # JSON array of interests
    skills = db.Column(db.JSON)  # JSON array of skills
    
    # Career and networking
    career_interests = db.Column(db.JSON)  # JSON array of career interests
    is_seeking_internship = db.Column(db.Boolean, default=False)
    is_seeking_mentorship = db.Column(db.Boolean, default=False)
    linkedin_url = db.Column(db.String(200))
    github_url = db.Column(db.String(200))
    portfolio_url = db.Column(db.String(200))
    
    # Academic status
    academic_status = db.Column(db.String(20), default='enrolled')  # enrolled, on_leave, graduated, withdrawn
    enrollment_status = db.Column(db.String(20), default='full_time')  # full_time, part_time
    
    # Privacy and visibility settings
    profile_visibility = db.Column(db.String(20), default='institution')  # public, institution, private
    show_contact_info = db.Column(db.Boolean, default=False)
    show_academic_info = db.Column(db.Boolean, default=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Student {self.first_name} {self.last_name} ({self.student_id})>'
    
    def get_full_name(self):
        """Get student's full name"""
        return f"{self.first_name} {self.last_name}"
    
    def get_current_academic_level(self):
        """Get current academic level based on enrollment year"""
        current_year = datetime.now().year
        years_enrolled = current_year - self.enrollment_year
        
        if years_enrolled < 0:
            return "Future Student"
        elif years_enrolled == 0:
            return "1st Year"
        elif years_enrolled == 1:
            return "2nd Year"
        elif years_enrolled == 2:
            return "3rd Year"
        elif years_enrolled == 3:
            return "4th Year"
        else:
            return f"{years_enrolled + 1}th Year"
    
    def is_graduate_student(self):
        """Check if student is in graduate program"""
        return (datetime.now().year - self.enrollment_year) > 4
    
    def years_until_graduation(self):
        """Calculate years until expected graduation"""
        current_year = datetime.now().year
        return max(0, self.expected_graduation_year - current_year)
    
    def is_eligible_for_alumni_network(self):
        """Check if student can access alumni network features"""
        # Students in their final year or graduate students can access alumni network
        return self.current_year and self.current_year >= 4
    
    def to_dict(self, include_private=False, viewer_role=None):
        """Convert to dictionary with privacy controls"""
        data = {
            'id': self.id,
            'user_id': self.user_id,
            'student_id': self.student_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': self.get_full_name(),
            'enrollment_year': self.enrollment_year,
            'expected_graduation_year': self.expected_graduation_year,
            'current_year': self.current_year,
            'current_semester': self.current_semester,
            'department': self.department,
            'major': self.major,
            'minor': self.minor,
            'academic_level': self.get_current_academic_level(),
            'years_until_graduation': self.years_until_graduation(),
            'bio': self.bio,
            'interests': self.interests or [],
            'skills': self.skills or [],
            'career_interests': self.career_interests or [],
            'is_seeking_internship': self.is_seeking_internship,
            'is_seeking_mentorship': self.is_seeking_mentorship,
            'linkedin_url': self.linkedin_url,
            'github_url': self.github_url,
            'portfolio_url': self.portfolio_url,
            'academic_status': self.academic_status,
            'enrollment_status': self.enrollment_status,
            'profile_visibility': self.profile_visibility,
            'is_graduate_student': self.is_graduate_student(),
            'can_access_alumni_network': self.is_eligible_for_alumni_network(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        # Add contact information based on privacy settings and viewer role
        if (include_private or self.show_contact_info or 
            viewer_role in ['super_admin', 'institution_admin']):
            data.update({
                'phone': self.phone,
                'address': self.address,
                'emergency_contact_name': self.emergency_contact_name,
                'emergency_contact_phone': self.emergency_contact_phone
            })
        
        # Add academic information based on privacy settings
        if (include_private or self.show_academic_info or 
            viewer_role in ['super_admin', 'institution_admin']):
            data.update({
                'gpa': self.gpa
            })
        
        return data

class StudentAchievement(db.Model):
    __tablename__ = 'student_achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    
    # Achievement details
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))  # academic, extracurricular, competition, etc.
    date_achieved = db.Column(db.Date)
    
    # Recognition details
    issued_by = db.Column(db.String(100))  # Organization/institution that issued
    verification_url = db.Column(db.String(300))  # URL for verification
    certificate_url = db.Column(db.String(300))  # URL to certificate/proof
    
    # Visibility
    is_public = db.Column(db.Boolean, default=True)
    is_featured = db.Column(db.Boolean, default=False)  # Featured on profile
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    student = db.relationship('Student', backref=db.backref('achievements', lazy='dynamic'))
    
    def __repr__(self):
        return f'<StudentAchievement {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'date_achieved': self.date_achieved.isoformat() if self.date_achieved else None,
            'issued_by': self.issued_by,
            'verification_url': self.verification_url,
            'certificate_url': self.certificate_url,
            'is_public': self.is_public,
            'is_featured': self.is_featured,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
