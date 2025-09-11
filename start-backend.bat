@echo off
echo Starting Alumni Management Backend with WebSocket support...
cd api
echo Installing dependencies if needed...
pip install -r requirements.txt
echo.
python run_socketio_server.py
pause
