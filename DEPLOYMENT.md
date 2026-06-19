# Deployment Setup Instructions

This project is configured to automatically deploy to Hostinger via FTP when you push to the main branch.

## Setup Steps

### 1. Get Your Hostinger FTP Credentials

From your Hostinger control panel, get:
- **FTP Server**: Usually `ftp.yourdomain.com` or an IP address
- **FTP Username**: Your FTP username
- **FTP Password**: Your FTP password

### 2. Add Secrets to GitHub Repository

1. Go to your GitHub repository: https://github.com/creativehandz/TFCproducts
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** and add these three secrets:

   - **Name**: `FTP_SERVER`  
     **Value**: Your FTP server address (e.g., `ftp.yourdomain.com`)

   - **Name**: `FTP_USERNAME`  
     **Value**: Your FTP username

   - **Name**: `FTP_PASSWORD`  
     **Value**: Your FTP password

### 3. Configure Server Directory (Optional)

The workflow uploads to `./public_html/` by default. If your Hostinger public directory is different:

1. Open `.github/workflows/deploy.yml`
2. Change the `server-dir` value to your directory path (e.g., `./htdocs/` or `./www/`)

### 4. How It Works

Once configured:
1. Make changes to your code
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. GitHub Actions will automatically:
   - Install dependencies
   - Build the project (`npm run build`)
   - Upload the `dist/` folder contents to your FTP server

### 5. Monitor Deployment

- Go to your GitHub repository
- Click the **Actions** tab
- You'll see the deployment progress and logs

### Manual Deployment Script (Alternative)

If you prefer to deploy manually, create a `deploy.sh` file:

```bash
#!/bin/bash
echo "Building project..."
npm run build

echo "Uploading to FTP..."
# Install lftp if not already: sudo apt-get install lftp
lftp -c "open -u $FTP_USER,$FTP_PASS $FTP_HOST; mirror -R ./dist/ ./public_html/ --delete --verbose"
echo "Deployment complete!"
```

Then run: `./deploy.sh` when you want to deploy.

## Troubleshooting

- **Build fails**: Check Node.js version compatibility
- **FTP connection fails**: Verify FTP credentials and server address
- **Files not appearing**: Check the `server-dir` path in the workflow file
- **Permission denied**: Ensure your FTP user has write permissions to the target directory
