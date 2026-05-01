@echo off
REM Team Task Manager - Windows Installation Script

echo.
echo ================================================
echo   Team Task Manager - Installation Script
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found: 
node -v
echo npm found:
npm -v
echo.

REM Install Frontend Dependencies
echo Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)
echo Frontend dependencies installed
echo.

REM Install Backend Dependencies
echo Installing Backend Dependencies...
cd ..\backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)
echo Backend dependencies installed
echo.

REM Create .env files
echo Setting up environment files...

if not exist backend\.env (
    (
        echo MONGODB_URI=mongodb://localhost:27017/task-manager
        echo JWT_SECRET=your_jwt_secret_key_change_in_production
        echo PORT=5000
        echo NODE_ENV=development
    ) > backend\.env
    echo Created backend\.env
)

if not exist frontend\.env (
    (
        echo VITE_API_URL=http://localhost:5000
    ) > frontend\.env
    echo Created frontend\.env
)
echo.

echo ================================================
echo Installation Complete!
echo ================================================
echo.
echo Next Steps:
echo.
echo 1. Start Backend Server:
echo    cd backend ^&^& npm run dev
echo.
echo 2. Start Frontend (in new terminal):
echo    cd frontend ^&^& npm run dev
echo.
echo 3. Open your browser:
echo    http://localhost:5173
echo.
echo For Production Deployment:
echo    Read DEPLOYMENT.md for Railway setup instructions
echo.
echo ================================================
echo.
pause
