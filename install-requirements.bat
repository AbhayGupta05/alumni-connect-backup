@echo off
echo Installing Alumni Platform Backend Dependencies...
echo.

echo Installing minimal requirements first...
pip install -r api\requirements-minimal.txt

if %errorlevel% neq 0 (
    echo.
    echo ❌ Failed to install minimal requirements
    echo Trying individual installations...
    echo.
    
    echo Installing Flask and core packages...
    pip install Flask==3.1.1
    pip install flask-cors==6.0.0
    pip install Flask-SQLAlchemy==3.1.1
    pip install Flask-SocketIO==5.3.6
    pip install python-socketio==5.11.0
    pip install SQLAlchemy==2.0.41
    pip install psycopg2-binary
    pip install Werkzeug==3.1.3
    pip install Python-dotenv==1.0.0
    pip install email-validator
    
    echo.
    echo Installing data processing packages (optional)...
    pip install pandas || echo pandas installation failed - CSV-only mode will be used
    pip install openpyxl || echo openpyxl installation failed - Excel support disabled
    
) else (
    echo.
    echo ✅ Minimal requirements installed successfully!
    echo.
    echo Installing optional packages...
    pip install redis gunicorn celery || echo Optional packages failed - not critical for basic functionality
)

echo.
echo.
echo 🚀 Installation complete!
echo.
echo To start the backend server:
echo   cd api
echo   python -m flask --app src.index run --debug --host=0.0.0.0 --port=5000
echo.
echo Note: If pandas installation failed, Excel file uploads will be disabled
echo but CSV uploads will still work.
echo.
pause
