#!/usr/bin/env node

/**
 * This script logs debug information about the deployment environment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a log file
const logFile = 'deployment-debug.log';
const log = (message) => {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] ${message}\n`;
  console.log(formattedMessage);
  fs.appendFileSync(logFile, formattedMessage);
};

log('=== DEPLOYMENT DEBUG INFORMATION ===');
log(`Current Working Directory: ${process.cwd()}`);
log(`Node.js Version: ${process.version}`);
log(`Platform: ${process.platform}`);

// Log environment variables (without sensitive data)
log('Environment Variables:');
const safeEnvVars = Object.keys(process.env)
  .filter(key => !key.toLowerCase().includes('secret') && 
                !key.toLowerCase().includes('password') && 
                !key.toLowerCase().includes('token') &&
                !key.toLowerCase().includes('key'))
  .reduce((obj, key) => {
    obj[key] = process.env[key];
    return obj;
  }, {});

log(JSON.stringify(safeEnvVars, null, 2));

// Check directory structure
log('Directory Structure:');
const listFiles = (dir) => {
  if (!fs.existsSync(dir)) {
    log(`Directory does not exist: ${dir}`);
    return;
  }
  
  try {
    const files = fs.readdirSync(dir);
    log(`Contents of ${dir}: ${JSON.stringify(files)}`);
    
    // Log details of specific files we care about
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory() && 
          (file === 'app' || file === 'pages' || file === 'public')) {
        listFiles(fullPath);
      }
    }
  } catch (error) {
    log(`Error reading directory ${dir}: ${error.message}`);
  }
};

listFiles('.');

// Run package-specific commands
try {
  log('Package.json contents:');
  if (fs.existsSync('./package.json')) {
    const packageJson = require('./package.json');
    log(JSON.stringify(packageJson, null, 2));
  } else {
    log('package.json not found!');
  }
} catch (error) {
  log(`Error reading package.json: ${error.message}`);
}

// Check for next.config.js
try {
  log('Next.config.js:');
  if (fs.existsSync('./next.config.js')) {
    const nextConfig = fs.readFileSync('./next.config.js', 'utf8');
    log(nextConfig);
  } else {
    log('next.config.js not found!');
  }
} catch (error) {
  log(`Error reading next.config.js: ${error.message}`);
}

log('=== DEBUG INFORMATION COMPLETE ===');

// Add this to package.json scripts
try {
  if (fs.existsSync('./package.json')) {
    const packageJson = require('./package.json');
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.debug = 'node deployment-debug.js';
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
    log('Added debug script to package.json');
  }
} catch (error) {
  log(`Error updating package.json: ${error.message}`);
} 