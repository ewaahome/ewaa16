/**
 * Prepare Hostinger Deployment
 * 
 * This script prepares your Next.js project for deployment to Hostinger by:
 * 1. Creating a deployment folder with all necessary files
 * 2. Copying the .next folder, public folder, and package files
 * 3. Creating a minimal package.json with only production dependencies
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOURCE_DIR = __dirname;
const DEPLOY_DIR = path.join(SOURCE_DIR, 'hostinger-deploy');
const NEXT_DIR = path.join(SOURCE_DIR, '.next');
const PUBLIC_DIR = path.join(SOURCE_DIR, 'public');

// Files to include in the deployment
const INCLUDE_FILES = [
  'package.json',
  '.env.production'
];

// Create deployment directory
console.log('🚀 Preparing deployment for Hostinger...');

// Create the deployment directory if it doesn't exist
if (!fs.existsSync(DEPLOY_DIR)) {
  fs.mkdirSync(DEPLOY_DIR, { recursive: true });
} else {
  console.log('Cleaning existing deployment directory...');
  execSync(`rmdir /s /q "${DEPLOY_DIR}"`);
  fs.mkdirSync(DEPLOY_DIR, { recursive: true });
}

// Copy .next folder
console.log('Copying .next folder...');
if (fs.existsSync(NEXT_DIR)) {
  execSync(`xcopy "${NEXT_DIR}" "${path.join(DEPLOY_DIR, '.next')}" /s /i /e /h`);
} else {
  console.error('❌ ERROR: .next folder not found! Run npm run build first.');
  process.exit(1);
}

// Copy public folder
console.log('Copying public folder...');
if (fs.existsSync(PUBLIC_DIR)) {
  execSync(`xcopy "${PUBLIC_DIR}" "${path.join(DEPLOY_DIR, 'public')}" /s /i /e /h`);
} else {
  console.warn('⚠️ Warning: public folder not found!');
}

// Copy necessary files
console.log('Copying configuration files...');
INCLUDE_FILES.forEach(file => {
  const sourcePath = path.join(SOURCE_DIR, file);
  const destPath = path.join(DEPLOY_DIR, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied: ${file}`);
  } else {
    console.warn(`⚠️ Warning: ${file} not found, skipping.`);
  }
});

// Create a minimal package.json with only production dependencies
console.log('Creating production package.json...');
const packageJson = require('./package.json');
const prodPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  private: packageJson.private,
  scripts: {
    start: packageJson.scripts.start
  },
  dependencies: packageJson.dependencies
};

fs.writeFileSync(
  path.join(DEPLOY_DIR, 'package.json'),
  JSON.stringify(prodPackageJson, null, 2)
);

// Create README with deployment instructions
console.log('Creating deployment instructions...');
fs.copyFileSync(
  path.join(SOURCE_DIR, 'HOSTINGER-DEPLOYMENT.md'),
  path.join(DEPLOY_DIR, 'README.md')
);

console.log(`
✅ Deployment preparation complete!

Your deployment-ready files are in the folder: ${DEPLOY_DIR}

To deploy to Hostinger:
1. Upload the contents of this folder to your Hostinger server
2. Follow the instructions in the README.md file

Good luck!
`); 