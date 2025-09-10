@echo off
echo Starting Alumni Management Backend...
cd api
python -m flask --app src.index run --debug --host=0.0.0.0 --port=5000
pause
