# PowerShell script to launch the stable development server

Write-Host "🔪 Killing any running Node.js processes..." -ForegroundColor Yellow
try {
    # Try to kill any running Node.js processes that might be using port 3600
    Get-Process | Where-Object { $_.MainWindowTitle -like "*next*" -or $_.ProcessName -eq "node" } | ForEach-Object {
        try {
            Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
            Write-Host "Killed process: $($_.ProcessName) (ID: $($_.Id))" -ForegroundColor Gray
        } catch {
            # Ignore errors if we can't kill a process
        }
    }
} catch {
    Write-Host "Could not kill all processes, but we will continue..." -ForegroundColor Yellow
}

# Add a short delay to ensure ports are released
Start-Sleep -Seconds 2

Write-Host "🔧 Fixing city display issues..." -ForegroundColor Cyan
try {
    node scripts/fix-city-display.js
} catch {
    Write-Host "⚠️ Warning: City display fix script failed, but we'll continue: $_" -ForegroundColor Yellow
}

Write-Host "🚀 Starting stable development server..." -ForegroundColor Green

# Run the stable development server script
try {
    node scripts/stable-dev.js
} catch {
    Write-Host "❌ Failed to start stable server: $_" -ForegroundColor Red
    exit 1
} 