# Manual FTP Deployment Script for Windows
# Usage: Update FTP credentials below and run: .\deploy.ps1

# FTP Configuration - UPDATE THESE VALUES
$FTP_SERVER = "ftp.yourdomain.com"
$FTP_USERNAME = "your-ftp-username"
$FTP_PASSWORD = "your-ftp-password"
$FTP_REMOTE_DIR = "/public_html"  # Your remote directory path

# Local directory to upload (dist folder after build)
$LOCAL_DIR = ".\dist"

Write-Host "Starting deployment process..." -ForegroundColor Cyan

# Step 1: Build the project
Write-Host "`nBuilding project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green

# Step 2: Upload to FTP using WinSCP (if installed)
# Alternative: You can also use any FTP client like FileZilla

Write-Host "`nUploading to FTP server..." -ForegroundColor Yellow

# Check if WinSCP is installed
$winscp = "C:\Program Files (x86)\WinSCP\WinSCP.com"
if (Test-Path $winscp) {
    # WinSCP script
    $script = @"
open ftp://${FTP_USERNAME}:${FTP_PASSWORD}@${FTP_SERVER}
cd $FTP_REMOTE_DIR
lcd $LOCAL_DIR
synchronize remote -delete
close
exit
"@
    
    $script | & $winscp /script=- /log=deploy.log
    
    Write-Host "Deployment completed!" -ForegroundColor Green
    Write-Host "Check deploy.log for details." -ForegroundColor Cyan
} else {
    Write-Host "`nWinSCP not found. Manual upload required:" -ForegroundColor Yellow
    Write-Host "1. Open your FTP client (FileZilla, etc.)" -ForegroundColor White
    Write-Host "2. Connect to: $FTP_SERVER" -ForegroundColor White
    Write-Host "3. Upload contents of '$LOCAL_DIR' to '$FTP_REMOTE_DIR'" -ForegroundColor White
    Write-Host "`nOr install WinSCP from: https://winscp.net/" -ForegroundColor Cyan
}

Write-Host "`nDeployment process finished!" -ForegroundColor Green
