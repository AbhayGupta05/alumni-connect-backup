#!/usr/bin/env python3
"""
Vercel Entry Point for Alumni Management Platform API
"""

import os
import sys

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import the Flask app from src.index
from src.index import app

# For Vercel, we need to export the app
application = app

# This is required for Vercel
def handler(event, context):
    return app(event, context)

if __name__ == '__main__':
    app.run(debug=True)
