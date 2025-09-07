from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from src.models.user import User, db
from src.models.alumni import Alumni

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type', 'alumni')
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required'}), 400
    
    # Check for specific demo credentials
    demo_credentials = {
        'demo@gmail.com': {'password': '1234', 'user_type': 'alumni'},
        'admin@gmail.com': {'password': 'admin1234', 'user_type': 'admin'}
    }
    
    if email in demo_credentials:
        demo_user = demo_credentials[email]
        if password == demo_user['password'] and user_type == demo_user['user_type']:
            # Check if user exists, if not create demo user
            user = User.query.filter_by(email=email).first()
            if not user:
                # Create demo user
                username = email.split('@')[0]
                user = User(username=username, email=email)
                db.session.add(user)
                db.session.commit()
                
                # Create alumni profile if user_type is alumni
                if user_type == 'alumni':
                    alumni = Alumni(
                        user_id=user.id,
                        first_name='Demo',
                        last_name='User',
                        graduation_year=2020,
                        department='Computer Science',
                        current_position='Software Engineer',
                        current_company='Tech Corp',
                        location='San Francisco, CA',
                        bio='Demo alumni user for testing purposes.',
                        skills='["Python", "JavaScript", "React", "Node.js"]',
                        is_mentor=True
                    )
                    db.session.add(alumni)
                    db.session.commit()
            
            # Set session
            session['user_id'] = user.id
            session['user_type'] = user_type
            
            return jsonify({
                'success': True,
                'user': user.to_dict(),
                'user_type': user_type,
                'message': 'Login successful'
            }), 200
    
    # Check for registered users
    user = User.query.filter_by(email=email).first()
    if user:
        # For registered users, we'll accept any password for demo purposes
        # In production, you would verify the password hash here
        session['user_id'] = user.id
        session['user_type'] = user_type
        
        return jsonify({
            'success': True,
            'user': user.to_dict(),
            'user_type': user_type,
            'message': 'Login successful'
        }), 200
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logout successful'}), 200

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    user_type = session.get('user_type', 'alumni')
    
    response_data = {
        'success': True,
        'user': user.to_dict(),
        'user_type': user_type
    }
    
    # Add alumni profile if user is alumni
    if user_type == 'alumni':
        alumni = Alumni.query.filter_by(user_id=user.id).first()
        if alumni:
            response_data['alumni_profile'] = alumni.to_dict()
    
    return jsonify(response_data), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    user_type = data.get('user_type', 'alumni')
    
    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'User already exists'}), 400
    
    # Create new user
    user = User(username=username, email=email)
    db.session.add(user)
    db.session.commit()
    
    # Create alumni profile if user_type is alumni
    if user_type == 'alumni':
        alumni_data = data.get('alumni_profile', {})
        alumni = Alumni(
            user_id=user.id,
            first_name=alumni_data.get('first_name', ''),
            last_name=alumni_data.get('last_name', ''),
            graduation_year=alumni_data.get('graduation_year', 2020),
            department=alumni_data.get('department', ''),
            current_position=alumni_data.get('current_position', ''),
            current_company=alumni_data.get('current_company', ''),
            location=alumni_data.get('location', ''),
            bio=alumni_data.get('bio', ''),
            skills=alumni_data.get('skills', '[]'),
            is_mentor=alumni_data.get('is_mentor', False)
        )
        db.session.add(alumni)
        db.session.commit()
    
    return jsonify({
        'success': True,
        'user': user.to_dict(),
        'message': 'Registration successful'
    }), 201

