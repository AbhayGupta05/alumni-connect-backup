import os
import sys

# Add path for imports
sys.path.append(os.path.dirname(__file__))

try:
    from src.index import app
except ImportError as e:
    print(f"Failed to import main app: {e}")
    from flask import Flask
    app = Flask(__name__)
    
    @app.route('/')
    def health():
        return {'status': 'error', 'message': 'Failed to load main application'}

# Export for Vercel
app = app
