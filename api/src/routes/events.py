from flask import Blueprint, jsonify, request, session
from datetime import datetime
from src.models.event import Event, EventRegistration, db
from src.models.user import User

events_bp = Blueprint('events', __name__)

@events_bp.route('/events', methods=['GET'])
def get_events():
    # Get query parameters
    event_type = request.args.get('type')
    status = request.args.get('status', 'active')
    upcoming_only = request.args.get('upcoming_only', 'false').lower() == 'true'
    
    query = Event.query
    
    # Apply filters
    if event_type and event_type != 'all':
        query = query.filter(Event.event_type == event_type)
    
    if status != 'all':
        query = query.filter(Event.status == status)
    
    if upcoming_only:
        query = query.filter(Event.event_date >= datetime.utcnow())
    
    events = query.order_by(Event.event_date.asc()).all()
    
    # Add registration count for each event
    events_data = []
    for event in events:
        event_dict = event.to_dict()
        registration_count = EventRegistration.query.filter_by(
            event_id=event.id, 
            status='registered'
        ).count()
        event_dict['registration_count'] = registration_count
        events_data.append(event_dict)
    
    return jsonify({
        'success': True,
        'events': events_data,
        'total': len(events_data)
    }), 200

@events_bp.route('/events', methods=['POST'])
def create_event():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    data = request.json
    
    event = Event(
        title=data['title'],
        description=data.get('description'),
        event_date=datetime.fromisoformat(data['event_date'].replace('Z', '+00:00')),
        location=data.get('location'),
        is_virtual=data.get('is_virtual', False),
        virtual_link=data.get('virtual_link'),
        max_attendees=data.get('max_attendees'),
        registration_deadline=datetime.fromisoformat(data['registration_deadline'].replace('Z', '+00:00')) if data.get('registration_deadline') else None,
        organizer_id=user_id,
        event_type=data.get('event_type', 'general')
    )
    
    db.session.add(event)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'event': event.to_dict(),
        'message': 'Event created successfully'
    }), 201

@events_bp.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    
    # Get registration count
    registration_count = EventRegistration.query.filter_by(
        event_id=event.id, 
        status='registered'
    ).count()
    
    # Get organizer info
    organizer = User.query.get(event.organizer_id)
    
    event_data = event.to_dict()
    event_data['registration_count'] = registration_count
    event_data['organizer'] = organizer.to_dict() if organizer else None
    
    # Check if current user is registered
    user_id = session.get('user_id')
    if user_id:
        registration = EventRegistration.query.filter_by(
            event_id=event.id,
            user_id=user_id
        ).first()
        event_data['user_registered'] = registration is not None
        event_data['registration_status'] = registration.status if registration else None
    
    return jsonify({
        'success': True,
        'event': event_data
    }), 200

@events_bp.route('/events/<int:event_id>/register', methods=['POST'])
def register_for_event(event_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    event = Event.query.get_or_404(event_id)
    
    # Check if already registered
    existing_registration = EventRegistration.query.filter_by(
        event_id=event_id,
        user_id=user_id
    ).first()
    
    if existing_registration:
        return jsonify({
            'success': False, 
            'message': 'Already registered for this event'
        }), 400
    
    # Check if event is full
    if event.max_attendees:
        current_registrations = EventRegistration.query.filter_by(
            event_id=event_id,
            status='registered'
        ).count()
        
        if current_registrations >= event.max_attendees:
            return jsonify({
                'success': False,
                'message': 'Event is full'
            }), 400
    
    # Check registration deadline
    if event.registration_deadline and datetime.utcnow() > event.registration_deadline:
        return jsonify({
            'success': False,
            'message': 'Registration deadline has passed'
        }), 400
    
    # Create registration
    registration = EventRegistration(
        event_id=event_id,
        user_id=user_id
    )
    
    db.session.add(registration)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'registration': registration.to_dict(),
        'message': 'Successfully registered for event'
    }), 201

@events_bp.route('/events/<int:event_id>/unregister', methods=['DELETE'])
def unregister_from_event(event_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    registration = EventRegistration.query.filter_by(
        event_id=event_id,
        user_id=user_id
    ).first()
    
    if not registration:
        return jsonify({
            'success': False,
            'message': 'Not registered for this event'
        }), 404
    
    db.session.delete(registration)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Successfully unregistered from event'
    }), 200

@events_bp.route('/events/<int:event_id>/attendees', methods=['GET'])
def get_event_attendees(event_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    event = Event.query.get_or_404(event_id)
    
    # Check if user is organizer or admin
    if event.organizer_id != user_id and session.get('user_type') != 'admin':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    registrations = EventRegistration.query.filter_by(
        event_id=event_id,
        status='registered'
    ).all()
    
    attendees = []
    for reg in registrations:
        user = User.query.get(reg.user_id)
        if user:
            attendee_data = user.to_dict()
            attendee_data['registration_date'] = reg.registration_date.isoformat()
            attendees.append(attendee_data)
    
    return jsonify({
        'success': True,
        'attendees': attendees,
        'total': len(attendees)
    }), 200

@events_bp.route('/my-events', methods=['GET'])
def get_my_events():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    # Get events user is registered for
    registrations = EventRegistration.query.filter_by(
        user_id=user_id,
        status='registered'
    ).all()
    
    registered_events = []
    for reg in registrations:
        event = Event.query.get(reg.event_id)
        if event:
            event_data = event.to_dict()
            event_data['registration_date'] = reg.registration_date.isoformat()
            registered_events.append(event_data)
    
    # Get events organized by user
    organized_events = Event.query.filter_by(organizer_id=user_id).all()
    
    return jsonify({
        'success': True,
        'registered_events': registered_events,
        'organized_events': [event.to_dict() for event in organized_events]
    }), 200

