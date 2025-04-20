// Custom build script to bypass Prisma issues
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Next.js build process...');

// Set environment variables
process.env.SKIP_PRISMA_GENERATE = 'true';
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'this_is_a_secure_secret_key_for_development_do_not_use_in_production';

try {
  // Clean the next cache and previous build
  console.log('Cleaning previous build...');
  execSync('npx rimraf .next', { stdio: 'inherit' });
  
  // Build the application
  console.log('Building Next.js application...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: process.env
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 