#!/usr/bin/env python3
"""
WebSocket Server Startup Script for Alumni Management Platform
"""

import os
import sys

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, os.path.dirname(__file__))

try:
    from src.index import app, socketio
    
    if __name__ == '__main__':
        print("Starting Alumni Management Backend with WebSocket support...")
        print("Server will be available at: http://localhost:5000")
        print("WebSocket endpoint: ws://localhost:5000/socket.io/")
        print("Frontend should connect to: http://localhost:5173")
        print("-" * 50)
        
        # Run the SocketIO server
        socketio.run(
            app,
            debug=True,
            host='0.0.0.0',
            port=5000,
            allow_unsafe_werkzeug=True
        )
        
except ImportError as e:
    print(f"Import Error: {e}")
    print("Make sure you've installed the requirements:")
    print("   pip install -r requirements.txt")
    sys.exit(1)
    
except Exception as e:
    print(f"Error starting server: {e}")
    print("Check the error message above for troubleshooting")
    sys.exit(1)
