# How to Start the Application

This document provides simple instructions for starting the application on a single, stable port.

## Running the Application

### Option 1: Using PowerShell (Recommended for Windows)

Run the PowerShell script by right-clicking it and selecting "Run with PowerShell" or by typing the following in PowerShell:

```powershell
.\start-stable.ps1
```

### Option 2: Using Batch File

Double-click the `start-stable.bat` file or run it from the command prompt:

```cmd
start-stable.bat
```

### Option 3: Using npm

Run the following command:

```bash
npm run stable-dev
```

## What This Does

The stable startup script:

1. Kills any existing Node.js processes that might be blocking the port
2. Fixes city display issues automatically
3. Clears the Next.js cache to prevent issues
4. Sets all required environment variables automatically
5. Starts the application on a fixed port (3600)

## Accessing the Application

Once started, you can access the application at:

**[http://localhost:3600](http://localhost:3600)**

## Browse by City Section Display Issues

If the "تصفح حسب المدينة" (Browse by City) section is not displaying correctly:

1. The startup script includes automatic fixes for common city display issues
2. We've implemented a fallback mechanism that shows simplified city circles if the original component fails to load
3. The external image URLs have been replaced with more reliable placeholder images
4. If you still see issues:
   - Try hard refreshing the page with Ctrl+F5 to clear browser cache
   - Reload the page a few times as the images might take time to load
   - Check your browser's console for any error messages
   - Verify your internet connection is working

### Manually Fixing City Display

If issues persist, you can manually run:

```bash
npm run fix-city-display
```

This will repair any issues with the city images and ensure they load properly.

## Troubleshooting

### Port Issues

If you still encounter port issues:

1. Manually kill Node.js processes using Task Manager
2. Try restarting your computer
3. Check if other applications are using port 3600 and stop them

### General Issues

If you encounter other issues:

1. Try clearing the Next.js cache by deleting the `.next` folder
2. Run `npm run fix-app` to fix common code issues
3. Make sure all environment variables are properly set 