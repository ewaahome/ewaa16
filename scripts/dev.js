// Custom development script to bypass Prisma issues
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Next.js development server...');

// Set environment variables
process.env.SKIP_PRISMA_GENERATE = 'true';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'this_is_a_secure_secret_key_for_development_do_not_use_in_production';

try {
  // Start Next.js dev server with the correct path
  execSync('next dev', {
    stdio: 'inherit',
    env: process.env,
    shell: true
  });
} catch (error) {
  console.error('❌ Development server error:', error.message);
  process.exit(1);
} 