from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))
    job_type = db.Column(db.String(50))  # full-time, part-time, contract, internship
    salary_min = db.Column(db.Integer)
    salary_max = db.Column(db.Integer)
    description = db.Column(db.Text)
    requirements = db.Column(db.Text)
    posted_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    application_deadline = db.Column(db.DateTime)
    is_remote = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(20), default='active')  # active, closed, filled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Job {self.title} at {self.company}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company,
            'location': self.location,
            'job_type': self.job_type,
            'salary_min': self.salary_min,
            'salary_max': self.salary_max,
            'description': self.description,
            'requirements': self.requirements,
            'posted_by': self.posted_by,
            'application_deadline': self.application_deadline.isoformat() if self.application_deadline else None,
            'is_remote': self.is_remote,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class JobApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    applicant_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    cover_letter = db.Column(db.Text)
    resume_url = db.Column(db.String(300))
    status = db.Column(db.String(20), default='applied')  # applied, reviewed, interviewed, rejected, hired
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<JobApplication {self.applicant_id} -> {self.job_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'job_id': self.job_id,
            'applicant_id': self.applicant_id,
            'cover_letter': self.cover_letter,
            'resume_url': self.resume_url,
            'status': self.status,
            'applied_at': self.applied_at.isoformat() if self.applied_at else None
        }

