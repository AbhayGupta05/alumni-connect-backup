from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Alumni(db.Model):
    __tablename__ = 'alumni'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True, index=True)
    
    # Alumni identification
    alumni_id = db.Column(db.String(50))  # Institution alumni ID
    first_name = db.Column(db.String(50), nullable=False, index=True)
    last_name = db.Column(db.String(50), nullable=False, index=True)
    
    # Academic information
    graduation_year = db.Column(db.Integer, nullable=False, index=True)
    graduation_month = db.Column(db.Integer)  # Month of graduation (1-12)
    department = db.Column(db.String(100), nullable=False, index=True)
    degree_type = db.Column(db.String(50))  # Bachelor's, Master's, PhD, etc.
    major = db.Column(db.String(100))
    minor = db.Column(db.String(100))
    gpa = db.Column(db.Float)
    honors = db.Column(db.String(100))  # Magna Cum Laude, etc.
    
    # Professional information
    current_position = db.Column(db.String(100), index=True)
    current_company = db.Column(db.String(100), index=True)
    industry = db.Column(db.String(100), index=True)
    work_location = db.Column(db.String(100), index=True)
    years_experience = db.Column(db.Integer)
    
    # Contact and location
    location = db.Column(db.String(100), index=True)
    phone = db.Column(db.String(20))
    personal_email = db.Column(db.String(120))  # Personal email (different from institution email)
    
    # Profile information
    bio = db.Column(db.Text)
    skills = db.Column(db.JSON)  # JSON array of skills with proficiency levels
    achievements = db.Column(db.JSON)  # JSON array of notable achievements
    
    # Social and professional links
    linkedin_url = db.Column(db.String(200))
    twitter_url = db.Column(db.String(200))
    facebook_url = db.Column(db.String(200))
    github_url = db.Column(db.String(200))
    personal_website = db.Column(db.String(200))
    
    # Mentorship and networking
    is_mentor = db.Column(db.Boolean, default=False, index=True)
    mentor_categories = db.Column(db.JSON)  # Areas they can mentor in
    is_seeking_opportunities = db.Column(db.Boolean, default=False)
    networking_interests = db.Column(db.JSON)  # What they're looking for in networking
    
    # Privacy and visibility settings
    profile_visibility = db.Column(db.String(20), default='institution')  # public, institution, private
    show_contact_info = db.Column(db.Boolean, default=False)
    show_professional_info = db.Column(db.Boolean, default=True)
    allow_messages = db.Column(db.Boolean, default=True)
    allow_job_offers = db.Column(db.Boolean, default=True)
    
    # Engagement and activity
    last_profile_update = db.Column(db.DateTime)
    profile_completeness = db.Column(db.Integer, default=0)  # Percentage 0-100
    is_verified = db.Column(db.Boolean, default=False)  # Verified alumni status
    
    # Media
    profile_image = db.Column(db.String(300))
    cover_image = db.Column(db.String(300))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Alumni {self.first_name} {self.last_name} ({self.graduation_year})>'
    
    def get_full_name(self):
        """Get alumni's full name"""
        return f"{self.first_name} {self.last_name}"
    
    def get_years_since_graduation(self):
        """Calculate years since graduation"""
        current_year = datetime.now().year
        return current_year - self.graduation_year
    
    def calculate_profile_completeness(self):
        """Calculate profile completeness percentage"""
        fields = [
            self.first_name, self.last_name, self.graduation_year, self.department,
            self.current_position, self.current_company, self.location, self.bio,
            self.skills, self.linkedin_url, self.profile_image
        ]
        
        completed_fields = sum(1 for field in fields if field is not None and field != '' and field != [])
        completeness = int((completed_fields / len(fields)) * 100)
        
        # Update the database field
        if self.profile_completeness != completeness:
            self.profile_completeness = completeness
            self.last_profile_update = datetime.utcnow()
            db.session.commit()
        
        return completeness
    
    def get_networking_score(self):
        """Calculate networking score based on profile activity"""
        score = 0
        
        # Base score for profile completeness
        score += self.profile_completeness or 0
        
        # Bonus for being a mentor
        if self.is_mentor:
            score += 20
        
        # Bonus for recent profile activity
        if self.last_profile_update:
            days_since_update = (datetime.utcnow() - self.last_profile_update).days
            if days_since_update <= 30:
                score += 15
            elif days_since_update <= 90:
                score += 10
        
        # Bonus for social media presence
        social_links = [self.linkedin_url, self.twitter_url, self.github_url, self.personal_website]
        score += sum(5 for link in social_links if link)
        
        return min(score, 100)  # Cap at 100
    
    def can_be_contacted_by(self, user):
        """Check if user can contact this alumni"""
        if not self.allow_messages:
            return False
        
        # Same institution users can always contact (if messages allowed)
        if hasattr(user, 'institution_id') and user.institution_id == self.user.institution_id:
            return True
        
        # Public profiles can be contacted by anyone
        if self.profile_visibility == 'public':
            return True
        
        return False
    
    def update_last_activity(self):
        """Update last profile activity"""
        self.last_profile_update = datetime.utcnow()
        db.session.commit()
    
    def to_dict(self, include_private=False, viewer_role=None):
        """Convert to dictionary with privacy controls"""
        data = {
            'id': self.id,
            'user_id': self.user_id,
            'alumni_id': self.alumni_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': self.get_full_name(),
            'graduation_year': self.graduation_year,
            'graduation_month': self.graduation_month,
            'department': self.department,
            'degree_type': self.degree_type,
            'major': self.major,
            'minor': self.minor,
            'honors': self.honors,
            'years_since_graduation': self.get_years_since_graduation(),
            'location': self.location,
            'bio': self.bio,
            'skills': self.skills or [],
            'achievements': self.achievements or [],
            'is_mentor': self.is_mentor,
            'mentor_categories': self.mentor_categories or [],
            'is_seeking_opportunities': self.is_seeking_opportunities,
            'networking_interests': self.networking_interests or [],
            'profile_visibility': self.profile_visibility,
            'allow_messages': self.allow_messages,
            'allow_job_offers': self.allow_job_offers,
            'profile_completeness': self.profile_completeness or 0,
            'networking_score': self.get_networking_score(),
            'is_verified': self.is_verified,
            'profile_image': self.profile_image,
            'cover_image': self.cover_image,
            'linkedin_url': self.linkedin_url,
            'personal_website': self.personal_website,
            'github_url': self.github_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_profile_update': self.last_profile_update.isoformat() if self.last_profile_update else None
        }
        
        # Add professional information based on privacy settings
        if (include_private or self.show_professional_info or 
            viewer_role in ['super_admin', 'institution_admin']):
            data.update({
                'current_position': self.current_position,
                'current_company': self.current_company,
                'industry': self.industry,
                'work_location': self.work_location,
                'years_experience': self.years_experience
            })
        
        # Add contact information based on privacy settings and viewer role
        if (include_private or self.show_contact_info or 
            viewer_role in ['super_admin', 'institution_admin']):
            data.update({
                'phone': self.phone,
                'personal_email': self.personal_email,
                'twitter_url': self.twitter_url,
                'facebook_url': self.facebook_url
            })
        
        # Add sensitive academic information for admins only
        if include_private or viewer_role in ['super_admin', 'institution_admin']:
            data.update({
                'gpa': self.gpa
            })
        
        return data

class AlumniExperience(db.Model):
    __tablename__ = 'alumni_experiences'
    
    id = db.Column(db.Integer, primary_key=True)
    alumni_id = db.Column(db.Integer, db.ForeignKey('alumni.id'), nullable=False)
    
    # Experience details
    company_name = db.Column(db.String(100), nullable=False)
    position_title = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100))
    location = db.Column(db.String(100))
    
    # Duration
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)  # NULL means current position
    is_current = db.Column(db.Boolean, default=False)
    
    # Details
    description = db.Column(db.Text)
    achievements = db.Column(db.JSON)  # List of achievements in this role
    skills_used = db.Column(db.JSON)  # Skills used in this position
    
    # Visibility
    is_public = db.Column(db.Boolean, default=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    alumni = db.relationship('Alumni', backref=db.backref('experiences', lazy='dynamic', order_by='AlumniExperience.start_date.desc()'))
    
    def __repr__(self):
        return f'<AlumniExperience {self.position_title} at {self.company_name}>'
    
    def get_duration(self):
        """Get duration of this experience"""
        start = self.start_date
        end = self.end_date or datetime.now().date()
        
        if start:
            duration = end - start
            years = duration.days // 365
            months = (duration.days % 365) // 30
            
            if years > 0:
                return f"{years} year{'s' if years != 1 else ''}, {months} month{'s' if months != 1 else ''}"
            else:
                return f"{months} month{'s' if months != 1 else ''}"
        
        return "Unknown duration"
    
    def to_dict(self):
        return {
            'id': self.id,
            'alumni_id': self.alumni_id,
            'company_name': self.company_name,
            'position_title': self.position_title,
            'department': self.department,
            'location': self.location,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'is_current': self.is_current,
            'duration': self.get_duration(),
            'description': self.description,
            'achievements': self.achievements or [],
            'skills_used': self.skills_used or [],
            'is_public': self.is_public,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

