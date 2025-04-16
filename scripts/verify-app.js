// Comprehensive application verification script
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

console.log(`${colors.cyan}Starting Airbnb Clone Application Verification${colors.reset}`);
console.log(`${colors.yellow}=====================================${colors.reset}`);

// Check if required files exist
const requiredFiles = [
  { path: '.env', name: 'Environment Variables' },
  { path: 'prisma/schema.prisma', name: 'Prisma Schema' },
  { path: '.eslintrc.js', name: 'ESLint Config' },
  { path: 'package.json', name: 'Package JSON' },
  { path: 'next.config.js', name: 'Next.js Config' },
  { path: 'scripts/vercel-deploy.js', name: 'Vercel Deploy Script' },
  { path: 'scripts/vercel-build-info.js', name: 'Vercel Build Info Script' }
];

let allFilesExist = true;
console.log(`\n${colors.magenta}Checking required files:${colors.reset}`);
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file.path));
  if (exists) {
    console.log(`${colors.green}✓ ${file.name} [${file.path}]${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ ${file.name} [${file.path}] is missing${colors.reset}`);
    allFilesExist = false;
  }
});

// Check for Prisma configuration
let prismaConfigured = false;
console.log(`\n${colors.magenta}Checking Prisma configuration:${colors.reset}`);
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  
  if (packageJson.prisma && packageJson.prisma.schema) {
    console.log(`${colors.green}✓ Prisma schema path is configured: ${packageJson.prisma.schema}${colors.reset}`);
    prismaConfigured = true;
  } else {
    console.log(`${colors.red}✗ Prisma schema path is not configured in package.json${colors.reset}`);
  }
  
  // Check if .env has DATABASE_URL
  if (fs.existsSync(path.join(process.cwd(), '.env'))) {
    const envContent = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf8');
    if (envContent.includes('DATABASE_URL=')) {
      console.log(`${colors.green}✓ DATABASE_URL is defined in .env${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ DATABASE_URL is missing in .env${colors.reset}`);
      prismaConfigured = false;
    }
  }
} catch (error) {
  console.log(`${colors.red}✗ Error checking Prisma configuration: ${error.message}${colors.reset}`);
}

// Check for essential npm scripts
console.log(`\n${colors.magenta}Checking essential npm scripts:${colors.reset}`);
const requiredScripts = [
  'dev', 'build', 'start', 'lint', 'vercel-build', 'postinstall'
];

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  
  let allScriptsExist = true;
  requiredScripts.forEach(scriptName => {
    if (packageJson.scripts && packageJson.scripts[scriptName]) {
      console.log(`${colors.green}✓ Script '${scriptName}' is defined: ${packageJson.scripts[scriptName]}${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Script '${scriptName}' is missing${colors.reset}`);
      allScriptsExist = false;
    }
  });
  
  // Validate Node.js version
  if (packageJson.engines && packageJson.engines.node) {
    console.log(`${colors.green}✓ Node.js version is specified: ${packageJson.engines.node}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}! Node.js version is not specified in package.json engines${colors.reset}`);
  }
} catch (error) {
  console.log(`${colors.red}✗ Error checking npm scripts: ${error.message}${colors.reset}`);
}

// Check for dependency versions
console.log(`\n${colors.magenta}Checking critical dependencies:${colors.reset}`);
const criticalDeps = [
  '@prisma/client', 'prisma', 'next', 'react', 'next-auth'
];

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  
  criticalDeps.forEach(dep => {
    const depVersion = 
      (packageJson.dependencies && packageJson.dependencies[dep]) || 
      (packageJson.devDependencies && packageJson.devDependencies[dep]);
    
    if (depVersion) {
      console.log(`${colors.green}✓ ${dep}: ${depVersion}${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ ${dep} is not installed${colors.reset}`);
    }
  });
} catch (error) {
  console.log(`${colors.red}✗ Error checking dependencies: ${error.message}${colors.reset}`);
}

// Test Prisma generation
console.log(`\n${colors.magenta}Testing Prisma client generation:${colors.reset}`);
try {
  execSync('npx prisma generate', { stdio: 'pipe' });
  console.log(`${colors.green}✓ Prisma client generated successfully${colors.reset}`);
} catch (error) {
  console.log(`${colors.red}✗ Failed to generate Prisma client: ${error.message}${colors.reset}`);
  console.log(`${colors.yellow}  This may cause deployment failures${colors.reset}`);
}

// Summary
console.log(`\n${colors.cyan}Verification Summary:${colors.reset}`);
console.log(`${colors.yellow}=====================================${colors.reset}`);

if (allFilesExist && prismaConfigured) {
  console.log(`${colors.green}✓ All required files are present and configured correctly.${colors.reset}`);
  console.log(`${colors.green}✓ Your application appears ready for deployment.${colors.reset}`);
  console.log(`\n${colors.cyan}Run the following to deploy:${colors.reset}`);
  console.log(`${colors.white}  - For local testing: npm run dev${colors.reset}`);
  console.log(`${colors.white}  - For Vercel deployment: Configure your project in the Vercel dashboard${colors.reset}`);
} else {
  console.log(`${colors.red}✗ Some issues were detected that may affect deployment.${colors.reset}`);
  console.log(`${colors.yellow}  Please fix the issues highlighted above before deploying.${colors.reset}`);
}

console.log(`\n${colors.cyan}Verification complete!${colors.reset}`); 