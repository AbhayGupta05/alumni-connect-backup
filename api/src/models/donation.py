from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class DonationCampaign(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    goal_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, default=0.0)
    category = db.Column(db.String(50))  # scholarships, facilities, programs
    priority = db.Column(db.String(20), default='medium')  # high, medium, low
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='active')  # active, completed, paused
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<DonationCampaign {self.title}>'

    def to_dict(self):
        progress_percentage = (self.current_amount / self.goal_amount * 100) if self.goal_amount > 0 else 0
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'goal_amount': self.goal_amount,
            'current_amount': self.current_amount,
            'progress_percentage': round(progress_percentage, 1),
            'category': self.category,
            'priority': self.priority,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey('donation_campaign.id'))
    amount = db.Column(db.Float, nullable=False)
    message = db.Column(db.Text)
    is_anonymous = db.Column(db.Boolean, default=False)
    payment_method = db.Column(db.String(50))
    transaction_id = db.Column(db.String(100))
    status = db.Column(db.String(20), default='completed')  # pending, completed, failed
    donated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Donation ${self.amount} from {self.donor_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'donor_id': self.donor_id,
            'campaign_id': self.campaign_id,
            'amount': self.amount,
            'message': self.message,
            'is_anonymous': self.is_anonymous,
            'payment_method': self.payment_method,
            'transaction_id': self.transaction_id,
            'status': self.status,
            'donated_at': self.donated_at.isoformat() if self.donated_at else None
        }

