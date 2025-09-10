from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/auth/login', methods=['POST'])
def login():
    # This function doesn't do anything but return a success message.
    # This is just to test if the request can reach the backend at all.
    return jsonify(
        success=True, 
        message="Test backend received the login request!",
        user={"name": "Test User"},
        user_type="alumni"
    )