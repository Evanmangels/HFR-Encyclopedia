@echo off
setlocal
cd /d "%~dp0"
if not exist ".venv\Scripts\python.exe" (
  echo Run setup_and_run.bat once before building the site.
  pause
  exit /b 1
)
".venv\Scripts\mkdocs.exe" build --strict
if errorlevel 1 (
  echo.
  echo The build failed. Review the error above.
  pause
  exit /b 1
)
echo.
echo Build complete. The standalone site is in the "site" folder.
pause
