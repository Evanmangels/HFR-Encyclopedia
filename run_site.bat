@echo off
setlocal
cd /d "%~dp0"
if not exist ".venv\Scripts\python.exe" (
  call setup_and_run.bat
  exit /b %errorlevel%
)
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:8000"
".venv\Scripts\mkdocs.exe" serve
