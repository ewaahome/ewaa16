@echo off
echo 🔪 Killing any running Node.js processes...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq next*" /T 2>nul
timeout /t 2 /nobreak > nul

echo 🔧 Fixing city display issues...
node scripts/fix-city-display.js

echo 🚀 Starting stable development server...
node scripts/stable-dev.js 