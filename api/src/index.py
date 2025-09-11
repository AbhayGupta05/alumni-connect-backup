import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, session
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit, disconnect
from src.models.user import db, User, UserRole, UserStatus
# Import all models to ensure they're registered
from src.models.institution import Institution, DataUploadBatch
from src.models.invite_token import InviteToken, EmailVerification
from src.models.alumni import Alumni, AlumniExperience
from src.models.student import Student, StudentAchievement
from src.models.event import Event, EventRegistration
from src.models.message import Message, ForumPost
from src.models.job import Job, JobApplication
from src.models.donation import Donation, DonationCampaign

# Import all blueprints
from src.routes.user import user_bp
from src.routes.auth import auth_bp
from src.routes.alumni import alumni_bp
from src.routes.events import events_bp
from src.routes.messages import messages_bp
from src.routes.jobs import jobs_bp
from src.routes.donations import donations_bp
from src.routes.institutions import institutions_bp
from src.routes.account_creation import account_creation_bp
from src.routes.data_import import data_import_bp
from src.routes.alumni_claim import alumni_claim_bp

app = Flask(__name__)

# Configuration from environment variables
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
app.config['ENV'] = os.environ.get('FLASK_ENV', 'production')

# CORS configuration
allowed_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173').split(',')
CORS(
    app,
    supports_credentials=True,
    resources={r"/*": {"origins": allowed_origins}}
)

# Initialize SocketIO with authentication
socketio = SocketIO(
    app,
    cors_allowed_origins=allowed_origins,
    async_mode='threading'
)

# --- DATABASE CONFIGURATION ---
postgres_url = os.environ.get('POSTGRES_URL')
if postgres_url:
    # Vercel's URL starts with 'postgres://', but SQLAlchemy needs 'postgresql://'
    if postgres_url.startswith("postgres://"):
        postgres_url = postgres_url.replace("postgres://", "postgresql://", 1)
    
    # Add connection pooling and optimization parameters
    if '?' not in postgres_url:
        postgres_url += '?'
    else:
        postgres_url += '&'
    
    postgres_url += 'sslmode=require&pool_size=20&max_overflow=0&pool_pre_ping=true&pool_recycle=3600'
    app.config['SQLALCHEMY_DATABASE_URI'] = postgres_url
    
    # PostgreSQL optimizations
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_size': 20,
        'pool_recycle': 3600,
        'pool_pre_ping': True,
        'max_overflow': 0,
        'pool_timeout': 30,
        'echo': False  # Set to True for debugging
    }
else:
    # Use SQLite for local development with optimizations
    basedir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(basedir, "alumni.db")
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}?timeout=20'
    
    # SQLite optimizations
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_timeout': 20,
        'pool_recycle': -1,
        'echo': False
    }

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_RECORD_QUERIES'] = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'

db.init_app(app)
# --- END OF DATABASE CONFIGURATION ---

# Register all blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/auth')  # Changed from /api/auth to /auth
app.register_blueprint(alumni_bp, url_prefix='/api')
app.register_blueprint(events_bp, url_prefix='/api')
app.register_blueprint(messages_bp, url_prefix='/api')
app.register_blueprint(jobs_bp, url_prefix='/api')
app.register_blueprint(donations_bp, url_prefix='/api')
app.register_blueprint(institutions_bp, url_prefix='/api')
app.register_blueprint(account_creation_bp, url_prefix='/api')
app.register_blueprint(data_import_bp, url_prefix='/api')
app.register_blueprint(alumni_claim_bp, url_prefix='/alumni-claim')

# Create database tables within app context
with app.app_context():
    try:
        db.create_all()
        
        # Create super admin user if it doesn't exist
        super_admin = User.query.filter_by(role=UserRole.SUPER_ADMIN).first()
        if not super_admin:
            admin_email = os.environ.get('SUPER_ADMIN_EMAIL')
            admin_password = os.environ.get('SUPER_ADMIN_PASSWORD')
            
            if admin_email and admin_password:
                super_admin = User(
                    username='super_admin',
                    email=admin_email,
                    role=UserRole.SUPER_ADMIN,
                    status=UserStatus.ACTIVE,
                    first_name='Super',
                    last_name='Admin',
                    is_email_verified=True
                )
                super_admin.set_password(admin_password)
                super_admin.activate_account()
                db.session.add(super_admin)
                db.session.commit()
                print(f"Created super admin user: {admin_email}")
            else:
                print("Warning: SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD environment variables not set")
                print("No super admin user created. You'll need to create one manually.")
        
    except Exception as e:
        print(f"Database initialization error: {e}")
        # Don't fail completely, but log the error

# --- Socket.IO Events ---
@socketio.on('connect')
def handle_connect(auth):
    """Handle client connection with authentication"""
    # Verify authentication
    user_id = session.get('user_id')
    if not user_id:
        disconnect()
        return False
    
    # Verify user exists and is active
    user = User.query.get(user_id)
    if not user or user.status != UserStatus.ACTIVE:
        disconnect()
        return False
    
    # Update user's last active time
    user.update_last_active()
    
    emit('connected', {
        'message': 'Connected to WebSocket',
        'user_id': user_id,
        'username': user.username
    })

@socketio.on('join')
def on_join(data):
    """Handle room joining with authentication"""
    user_id = session.get('user_id')
    if not user_id:
        return
    
    user = User.query.get(user_id)
    if not user or user.status != UserStatus.ACTIVE:
        return
    
    room = data.get('room')
    if room:
        # Validate room access (e.g., same institution for private rooms)
        room_type = data.get('room_type', 'conversation')
        
        if room_type == 'conversation':
            # For conversation rooms, check if user can access this conversation
            conversation_participants = room.split('_')  # Format: "user1_user2"
            if str(user_id) not in conversation_participants:
                return  # User not part of this conversation
        
        join_room(room)
        user.update_last_active()
        emit('joined', {'room': room}, room=room)

@socketio.on('leave')
def on_leave(data):
    """Handle room leaving"""
    user_id = session.get('user_id')
    if not user_id:
        return
    
    room = data.get('room')
    if room:
        leave_room(room)
        emit('left', {'room': room}, room=room)

@socketio.on('typing')
def on_typing(data):
    """Handle typing indicators"""
    user_id = session.get('user_id')
    if not user_id:
        return
    
    user = User.query.get(user_id)
    if not user or user.status != UserStatus.ACTIVE:
        return
    
    room = data.get('room')
    emit('typing', {
        'user_id': user_id,
        'username': user.username
    }, room=room, include_self=False)

@socketio.on('message')
def handle_message(data):
    """Handle message sending with authentication and validation"""
    user_id = session.get('user_id')
    if not user_id:
        return
    
    user = User.query.get(user_id)
    if not user or user.status != UserStatus.ACTIVE:
        return
    
    room = data.get('room')
    content = data.get('content')
    recipient_id = data.get('recipient_id')
    
    if not all([room, content, recipient_id]):
        emit('error', {'message': 'Missing required fields'})
        return
    
    # Validate recipient exists and user can message them
    recipient = User.query.get(recipient_id)
    if not recipient:
        emit('error', {'message': 'Recipient not found'})
        return
    
    # Check if user can message the recipient (same institution, etc.)
    if not user.can_message_user(recipient):
        emit('error', {'message': 'Cannot send message to this user'})
        return
    
    try:
        # Save message to database
        msg = Message(
            sender_id=user_id,
            recipient_id=recipient_id,
            content=content,
            message_type='direct'
        )
        db.session.add(msg)
        db.session.commit()
        
        # Update user activity
        user.update_last_active()
        
        payload = {
            'id': msg.id,
            'content': msg.content,
            'sender_id': msg.sender_id,
            'recipient_id': msg.recipient_id,
            'sender_name': user.get_full_name(),
            'created_at': msg.created_at.isoformat() if msg.created_at else None
        }
        
        # Broadcast to the room
        emit('message', payload, room=room)
        
    except Exception as e:
        emit('error', {'message': 'Failed to send message'})
        print(f"Message sending error: {e}")

# NOTE: The static file serving route and the app.run() block have been removed
# as they are handled by Vercel's configuration.
