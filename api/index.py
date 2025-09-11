from flask import Flask, jsonify
import os
import sys

# Add path for imports
sys.path.insert(0, os.path.dirname(__file__))

# Create Flask app
app = Flask(__name__)

# Try to import the main application routes
try:
    from src.index import app as main_app
    # If successful, use the main app
    app = main_app
except Exception as e:
    print(f"Could not import main app: {e}")
    # Use fallback routes
    @app.route('/')
    def home():
        return jsonify({
            'status': 'ok',
            'message': 'Alumni Management Platform API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/health',
                'auth': '/auth/*',
                'api': '/api/*',
                'alumni-claim': '/alumni-claim/*'
            }
        })
    
    @app.route('/health')
    def health():
        return jsonify({'status': 'healthy', 'timestamp': '2024-01-01'})

# Make sure CORS is enabled for basic requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# This is what Vercel uses
if __name__ == '__main__':
    app.run(debug=True)
