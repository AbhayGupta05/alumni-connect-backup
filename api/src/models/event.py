from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    event_date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200))
    is_virtual = db.Column(db.Boolean, default=False)
    virtual_link = db.Column(db.String(300))
    max_attendees = db.Column(db.Integer)
    registration_deadline = db.Column(db.DateTime)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_type = db.Column(db.String(50))  # reunion, networking, workshop, etc.
    status = db.Column(db.String(20), default='active')  # active, cancelled, completed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Event {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'event_date': self.event_date.isoformat() if self.event_date else None,
            'location': self.location,
            'is_virtual': self.is_virtual,
            'virtual_link': self.virtual_link,
            'max_attendees': self.max_attendees,
            'registration_deadline': self.registration_deadline.isoformat() if self.registration_deadline else None,
            'organizer_id': self.organizer_id,
            'event_type': self.event_type,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class EventRegistration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='registered')  # registered, attended, cancelled

    def __repr__(self):
        return f'<EventRegistration {self.user_id} -> {self.event_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'registration_date': self.registration_date.isoformat() if self.registration_date else None,
            'status': self.status
        }

