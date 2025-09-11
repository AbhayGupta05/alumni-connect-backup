from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        'status': 'success',
        'message': 'Alumni Management Platform API is working!',
        'service': 'backend-api',
        'routes': {
            'health': '/health',
            'test': '/test',
            'auth': '/auth/*',
            'api': '/api/*',
            'alumni-claim': '/alumni-claim/*'
        }
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'Alumni Management API',
        'timestamp': '2024-01-01'
    })

@app.route('/test')
def test():
    return jsonify({
        'message': 'Test endpoint working!',
        'success': True
    })

if __name__ == '__main__':
    app.run(debug=True)
