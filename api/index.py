#!/usr/bin/env python3
"""
Vercel Entry Point for Alumni Management Platform API
"""

import os
import sys

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

try:
    # Import the Flask app from src.index
    from src.index import app
    
    # For Vercel, we need to export the app
    application = app
    
except Exception as e:
    print(f"Error importing app: {e}")
    # Create a minimal Flask app as fallback
    from flask import Flask
    app = Flask(__name__)
    
    @app.route('/')
    def health_check():
        return {'status': 'ok', 'message': 'Alumni Management API is running'}
    
    application = app

if __name__ == '__main__':
    application.run(debug=True)
