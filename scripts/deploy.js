// Deployment script that handles all necessary steps
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...');

// Create .env.local if it doesn't exist
if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
  console.log('Creating .env.local file...');
  fs.writeFileSync(
    path.join(process.cwd(), '.env.local'),
    'NEXTAUTH_URL=http://localhost:3000\n' +
    'NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production\n'
  );
}

try {
  // Clean previous build
  console.log('Cleaning previous build...');
  execSync('npx rimraf .next', { stdio: 'inherit' });

  // Set environment variables
  process.env.SKIP_PRISMA_GENERATE = 'true';
  process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'this_is_a_secure_secret_key_for_development_do_not_use_in_production';

  // Run the safe build
  console.log('Building application...');
  execSync('node scripts/build.js', { 
    stdio: 'inherit',
    env: process.env
  });

  console.log('✅ Deployment process completed successfully!');
  console.log('Run "npm start" to start the production server');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} 