import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask
from flask_cors import CORS
from src.models.user import db
from src.models.alumni import Alumni
# Import your other models as needed...

# Import all blueprints
from src.routes.user import user_bp
from src.routes.auth import auth_bp
from src.routes.alumni import alumni_bp
from src.routes.events import events_bp
from src.routes.messages import messages_bp
from src.routes.jobs import jobs_bp
from src.routes.donations import donations_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(
    app,
    supports_credentials=True,
    resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}
)

# --- DATABASE CONFIGURATION ---
postgres_url = os.environ.get('POSTGRES_URL')
if postgres_url:
    # Vercel's URL starts with 'postgres://', but SQLAlchemy needs 'postgresql://'
    if postgres_url.startswith("postgres://"):
        postgres_url = postgres_url.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = postgres_url
else:
    # Use SQLite for local development
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "alumni.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
# --- END OF DATABASE CONFIGURATION ---

# Register all blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(alumni_bp, url_prefix='/api')
app.register_blueprint(events_bp, url_prefix='/api')
app.register_blueprint(messages_bp, url_prefix='/api')
app.register_blueprint(jobs_bp, url_prefix='/api')
app.register_blueprint(donations_bp, url_prefix='/api')

# Create database tables and sample data within app context
with app.app_context():
    db.create_all()
    
    # Create sample data if database is empty
    if Alumni.query.count() == 0:
        from src.utils.sample_data import create_sample_data
        create_sample_data()

# NOTE: The static file serving route and the app.run() block have been removed
# as they are handled by Vercel's configuration.