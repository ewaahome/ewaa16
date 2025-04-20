# Cleanup Guide for Eiwaa Home Project

This guide helps you clean up the project for deployment on Hostinger VPS by removing unnecessary files and folders.

## What Has Been Done

1. ✅ Created a minimal deployment package in the `hostinger-minimal` folder
2. ✅ Created a compressed archive at `hostinger-minimal-deploy.zip` (0.27 MB)
3. ✅ Backed up important files to `cleanup-backup` folder

## Directories to Safely Remove

These large directories can be safely removed to free up space:

- `.next` (~560 MB): Next.js build output, can be regenerated
- `node_modules` (~733 MB): NPM dependencies, can be reinstalled
- `out`: Static export output
- `backup-files`: Old backup files
- `temp-auth`: Temporary authentication files
- `test-drop`: Test files for deployment
- `netlify-drop`: Netlify-specific deployment files
- `netlify-plugin-prisma-provider`: Netlify plugins
- `.netlify`: Netlify configuration
- `.github`: GitHub-specific files
- `hostinger-deploy`: Previous deployment package (~539 MB)

## Files to Safely Remove

These files can be safely removed:

- `hostinger-deploy.zip` (~118 MB): Previous deployment archive
- `vercel-setup.js`, `vercel-build-wrapper.js`, `vercel-prebuild.js`: Vercel deployment scripts
- `test-deploy.js`: Test deployment script
- `prepare-netlify-drop.js`, `netlify-prebuild.js`, `netlify-setup.js`, `netlify-install-deps.js`: Netlify deployment scripts
- `deployment-debug.js`: Debug script
- `prepare-for-drop.js`: Deployment preparation script
- `package-lock.json`: Will be regenerated when needed

## How to Remove Files and Directories

### Option 1: Using the cleanup script (safest)

Run:
```powershell
node -e "require('./cleanup.js').removeFiles()"
```

### Option 2: Manual deletion using PowerShell

For directories:
```powershell
# Example: To remove .next directory
Remove-Item -Path .\.next -Recurse -Force

# To remove node_modules
Remove-Item -Path .\node_modules -Recurse -Force

# To remove hostinger-deploy
Remove-Item -Path .\hostinger-deploy -Recurse -Force
```

For files:
```powershell
# Example: To remove hostinger-deploy.zip
Remove-Item -Path .\hostinger-deploy.zip -Force
```

## Deploying to Hostinger VPS

1. Upload the `hostinger-minimal-deploy.zip` file to your Hostinger VPS
2. Unzip the file on the server:
   ```bash
   unzip hostinger-minimal-deploy.zip -d /var/www/ewaahome
   ```
3. Navigate to the directory:
   ```bash
   cd /var/www/ewaahome
   ```
4. Make the startup script executable:
   ```bash
   chmod +x make-executable.sh
   ./make-executable.sh
   ```
5. Follow the `DEPLOYMENT-CHECKLIST.md` for the complete setup process

## Reinstalling for Development

If you need to reinstall dependencies for local development:

```powershell
npm install
```

## Important Notes

- The deployment package includes all necessary application code and configuration files
- Deployment documentation is included in the package
- Essential files for development are preserved
- Environment variables need to be set on the Hostinger VPS 