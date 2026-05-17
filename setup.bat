@echo off
REM Layout Agent - Complete Setup Script for Windows
REM This script sets up the entire project and runs it locally

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     Layout Agent - Project Setup & Deployment Script          ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo (Choose LTS version)
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js detected: 
node --version
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: Git is not installed or not in PATH
    echo.
    echo Please install Git from: https://git-scm.com/
    echo.
    pause
    exit /b 1
)

echo ✓ Git detected: 
git --version
echo.

REM Navigate to project root
cd /d d:\layout-agent
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: Cannot navigate to d:\layout-agent
    pause
    exit /b 1
)

echo ✓ Project directory: %CD%
echo.

REM Check if .env exists
if not exist "server\.env" (
    echo ⚠ WARNING: server\.env not found
    echo.
    echo Creating server\.env file...
    (
        echo ANTHROPIC_API_KEY=sk-ant-your-key-here
        echo PORT=3001
        echo NODE_ENV=development
    ) > server\.env
    echo.
    echo ✓ Created server\.env
    echo.
    echo 📝 IMPORTANT: Edit server\.env and add your API key!
    echo    Get your key from: https://console.anthropic.com
    echo.
    notepad server\.env
    if errorlevel 1 (
        echo.
        echo ❌ Setup cancelled
        pause
        exit /b 1
    )
)

echo ✓ API key configured in server\.env
echo.

REM Install dependencies
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Installing dependencies (this may take 2-3 minutes)...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

call npm install
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed successfully
echo.

REM Display menu
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🎉 Setup Complete! 
echo.
echo Choose what to do next:
echo.
echo   1 = Run locally (npm run dev)
echo   2 = Initialize Git & push to GitHub
echo   3 = Deploy to Vercel
echo   4 = Deploy to Render
echo   5 = View project documentation
echo   6 = Exit
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Starting development servers...
    echo    Frontend: http://localhost:5173
    echo    Backend: http://localhost:3001
    echo.
    echo Press Ctrl+C to stop
    echo.
    call npm run dev
) else if "%choice%"=="2" (
    echo.
    echo 📝 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: Layout agent with Claude integration"
    echo.
    echo ✓ Git initialized and first commit created
    echo.
    echo Next steps:
    echo   1. Go to https://github.com/new
    echo   2. Create a repository named "layout-agent"
    echo   3. Run these commands:
    echo.
    echo      git remote add origin https://github.com/YOUR-USERNAME/layout-agent.git
    echo      git branch -M main
    echo      git push -u origin main
    echo.
) else if "%choice%"=="3" (
    echo.
    echo 🌐 Deploying to Vercel...
    echo.
    echo Steps:
    echo   1. Commit and push to GitHub first (choice 2)
    echo   2. Go to https://vercel.com/signup
    echo   3. Sign up with GitHub
    echo   4. Click "Add New Project"
    echo   5. Select your layout-agent repo
    echo   6. Add ANTHROPIC_API_KEY environment variable
    echo   7. Click "Deploy"
    echo.
    echo Your live URL will be shown after deployment!
    echo.
) else if "%choice%"=="4" (
    echo.
    echo 🌐 Deploying to Render...
    echo.
    echo Steps:
    echo   1. Go to https://render.com
    echo   2. Sign up with GitHub
    echo   3. Create a new Web Service
    echo   4. Select your layout-agent repo
    echo   5. Add ANTHROPIC_API_KEY environment variable
    echo   6. Deploy
    echo.
) else if "%choice%"=="5" (
    echo.
    echo 📖 Project Documentation:
    echo.
    echo   README.md ..................... Setup and usage
    echo   QUICKSTART.md ................. 5-minute setup
    echo   APPROACH.md ................... Technical design
    echo   DEPLOYMENT_GUIDE.md ........... Deployment steps
    echo   SUBMISSION.md ................. For Compra submission
    echo   TROUBLESHOOTING.md ............ Common issues
    echo.
) else (
    echo.
    echo ✓ Setup script complete. Goodbye!
    echo.
)

pause
