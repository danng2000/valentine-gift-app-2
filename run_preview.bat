@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo "Starting local preview..."
echo "It will automatically open in your browser."
echo "Any changes you make to the code will update instantly!"
call npm.cmd run dev -- --open
pause
