from flask import Flask, jsonify
import os
import sys

# Add path for imports
sys.path.insert(0, os.path.dirname(__file__))

app = Flask(__name__)

# Configuration from environment variables
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
app.config['ENV'] = os.environ.get('FLASK_ENV', 'production')

# Database configuration
database_configured = False
try:
    postgres_url = os.environ.get('POSTGRES_URL')
    if postgres_url:
        # Vercel's URL starts with 'postgres://', but SQLAlchemy needs 'postgresql://'
        if postgres_url.startswith("postgres://"):
            postgres_url = postgres_url.replace("postgres://", "postgresql://", 1)
        
        app.config['SQLALCHEMY_DATABASE_URI'] = postgres_url
        app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
            'pool_size': 5,
            'pool_recycle': 1800,
            'pool_pre_ping': True,
            'max_overflow': 0,
            'pool_timeout': 20
        }
        database_configured = True
    else:
        # Use SQLite for development
        basedir = os.path.abspath(os.path.dirname(__file__))
        db_path = os.path.join(basedir, "alumni.db")
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
        database_configured = True
        
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
except Exception as e:
    print(f"Database configuration error: {e}")

# Try to import and register the main application blueprints
db_initialized = False
main_app_loaded = False
try:
    # Import database first
    from src.models.user import db, User, UserRole, UserStatus
    
    # Import all models to ensure they are registered with SQLAlchemy
    from src.models.institution import Institution, DataUploadBatch
    from src.models.invite_token import InviteToken, EmailVerification
    from src.models.alumni import Alumni, AlumniExperience
    from src.models.student import Student, StudentAchievement
    from src.models.event import Event, EventRegistration
    from src.models.message import Message, ForumPost
    from src.models.job import Job, JobApplication
    from src.models.donation import Donation, DonationCampaign
    
    db.init_app(app)
    
    # Import blueprints
    from src.routes.auth import auth_bp
    from src.routes.alumni_claim import alumni_claim_bp
    from src.routes.alumni import alumni_bp
    from src.routes.events import events_bp
    from src.routes.messages import messages_bp
    from src.routes.jobs import jobs_bp
    from src.routes.donations import donations_bp
    from src.routes.institutions import institutions_bp
    from src.routes.account_creation import account_creation_bp
    from src.routes.data_import import data_import_bp
    from src.routes.user import user_bp
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(alumni_claim_bp, url_prefix='/alumni-claim')
    app.register_blueprint(alumni_bp, url_prefix='/api')
    app.register_blueprint(events_bp, url_prefix='/api')
    app.register_blueprint(messages_bp, url_prefix='/api')
    app.register_blueprint(jobs_bp, url_prefix='/api')
    app.register_blueprint(donations_bp, url_prefix='/api')
    app.register_blueprint(institutions_bp, url_prefix='/api')
    app.register_blueprint(account_creation_bp, url_prefix='/api')
    app.register_blueprint(data_import_bp, url_prefix='/api')
    app.register_blueprint(user_bp, url_prefix='/api')
    
    # Initialize database tables
    if database_configured:
        with app.app_context():
            try:
                print("Attempting to initialize database tables...")
                db.create_all()
                print("Database tables created successfully!")
                db_initialized = True
            except Exception as e:
                print(f"Database initialization error: {e}")
                import traceback
                traceback.print_exc()
    
    main_app_loaded = True
    
except Exception as e:
    print(f"Could not load full app: {e}")
    main_app_loaded = False

@app.route('/')
def hello():
    return {
        'status': 'success',
        'message': 'Alumni Management Platform API',
        'service': 'backend-api',
        'version': '1.0',
        'full_app_loaded': main_app_loaded,
        'database_configured': database_configured,
        'database_initialized': db_initialized,
        'endpoints': {
            'health': '/health',
            'test': '/test',
            'auth': '/auth/*',
            'alumni-claim': '/alumni-claim/*',
            'api': '/api/*'
        }
    }

@app.route('/health')
def health():
    return {
        'status': 'healthy', 
        'service': 'alumni-api',
        'full_app_loaded': main_app_loaded,
        'database_configured': database_configured,
        'database_initialized': db_initialized
    }

@app.route('/test')
def test():
    return {
        'test': 'working', 
        'success': True,
        'full_app_loaded': main_app_loaded
    }

@app.route('/debug-db')
def debug_database():
    debug_info = {
        'database_configured': database_configured,
        'database_initialized': db_initialized,
        'postgres_url_exists': bool(os.environ.get('POSTGRES_URL')),
        'environment_vars': {
            'FLASK_ENV': os.environ.get('FLASK_ENV'),
            'SECRET_KEY_SET': bool(os.environ.get('SECRET_KEY'))
        }
    }
    
    # Try to test database connection
    if database_configured and main_app_loaded:
        try:
            from src.models.user import db
            with app.app_context():
                # Try a simple query (SQLAlchemy 2.0 syntax)
                from sqlalchemy import text
                result = db.session.execute(text('SELECT 1')).fetchone()
                debug_info['database_connection_test'] = 'SUCCESS'
        except Exception as e:
            debug_info['database_connection_test'] = f'FAILED: {str(e)}'
    else:
        debug_info['database_connection_test'] = 'NOT_ATTEMPTED'
    
    return debug_info

@app.route('/init-db')
def force_init_database():
    global db_initialized
    
    if not database_configured:
        return {'error': 'Database not configured'}, 500
    
    if not main_app_loaded:
        return {'error': 'Main app not loaded'}, 500
    
    try:
        from src.models.user import db
        # Import all models to ensure proper table creation order
        from src.models.institution import Institution, DataUploadBatch
        from src.models.invite_token import InviteToken, EmailVerification
        from src.models.alumni import Alumni, AlumniExperience
        from src.models.student import Student, StudentAchievement
        from src.models.event import Event, EventRegistration
        from src.models.message import Message, ForumPost
        from src.models.job import Job, JobApplication
        from src.models.donation import Donation, DonationCampaign
        
        with app.app_context():
            print("Force initializing database with all models...")
            db.create_all()
            db_initialized = True
            print("Database force initialization completed!")
            
            return {
                'success': True,
                'message': 'Database initialized successfully',
                'database_initialized': db_initialized
            }
    except Exception as e:
        error_msg = str(e)
        print(f"Force database initialization failed: {error_msg}")
        import traceback
        traceback.print_exc()
        return {
            'success': False,
            'error': error_msg,
            'database_initialized': db_initialized
        }, 500

@app.route('/alumni-claim/colleges')
def get_colleges_simple():
    """Simple colleges endpoint that doesn't require database"""
    colleges = [
        "Indian Institute of Technology Bombay (IIT Bombay)",
        "Indian Institute of Technology Delhi (IIT Delhi)", 
        "Indian Institute of Technology Madras (IIT Madras)",
        "Indian Institute of Technology Kanpur (IIT Kanpur)",
        "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
        "Indian Institute of Science (IISc) Bangalore",
        "All India Institute of Medical Sciences (AIIMS), New Delhi",
        "Jawaharlal Nehru University (JNU), New Delhi",
        "University of Delhi (DU)",
        "Banaras Hindu University (BHU), Varanasi",
        "Vellore Institute of Technology (VIT), Vellore",
        "Amrita Vishwa Vidyapeetham, Coimbatore",
        "National Institute of Technology Tiruchirappalli (NIT Trichy)",
        "Anna University, Chennai",
        "Indian Institute of Management Ahmedabad (IIM Ahmedabad)",
        "Jadavpur University, Kolkata",
        "BITS Pilani - Pilani Campus",
        "Delhi Technological University (DTU)",
        "Pune Institute of Computer Technology",
        "Manipal Academy of Higher Education, Manipal"
    ]
    
    return {
        'success': True,
        'colleges': colleges
    }

# Add CORS support
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# This is required for Vercel
if __name__ == '__main__':
    app.run()
