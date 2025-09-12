from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return {
        'status': 'success',
        'message': 'Alumni Management Platform Backend is WORKING!',
        'service': 'api',
        'version': '1.0'
    }

@app.route('/health')
def health():
    return {'status': 'healthy', 'service': 'alumni-api'}

@app.route('/test')
def test():
    return {'test': 'working', 'success': True}

# This is required for Vercel
if __name__ == '__main__':
    app.run()
