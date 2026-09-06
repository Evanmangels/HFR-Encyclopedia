@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel%==0 (
  set "PYTHON=py"
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    set "PYTHON=python"
  ) else (
    echo Python was not found.
    echo Install Python 3 from python.org and enable "Add Python to PATH", then run this file again.
    pause
    exit /b 1
  )
)

if not exist ".venv\Scripts\python.exe" (
  echo Creating the private HFR website environment...
  %PYTHON% -m venv .venv || goto :error
)

echo Installing or updating the free website tools...
".venv\Scripts\python.exe" -m pip install --upgrade pip
".venv\Scripts\python.exe" -m pip install -r requirements.txt || goto :error

echo.
echo Opening the HFR Encyclopedia at http://127.0.0.1:8000
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:8000"
".venv\Scripts\mkdocs.exe" serve
exit /b 0

:error
echo.
echo Setup failed. Review the error above.
pause
exit /b 1
