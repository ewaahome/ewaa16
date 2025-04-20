const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to check and clean .next directory if it exists
function cleanNextDirectory() {
  console.log('🧹 Checking for .next directory...');
  const nextDir = path.join(__dirname, '.next');
  
  if (fs.existsSync(nextDir)) {
    try {
      console.log('🧹 Removing .next directory...');
      fs.rmSync(nextDir, { recursive: true, force: true });
      console.log('✅ .next directory removed successfully');
    } catch (error) {
      console.error('❌ Error removing .next directory:', error);
    }
  }
}

// Function to set environment variables for development
function setEnvironmentVariables() {
  console.log('🔧 Setting environment variables...');
  
  process.env.NEXTAUTH_URL = 'http://localhost:3000';
  process.env.NEXTAUTH_SECRET = 'this_is_a_secure_secret_key_for_development_do_not_use_in_production';
  process.env.SKIP_PRISMA_GENERATE = 'true';
  process.env.DEBUG = 'next-auth:*';
  
  // Write .env.local if it doesn't exist
  const envLocalPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envLocalPath)) {
    console.log('📝 Creating .env.local file...');
    const envContent = `NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production
SKIP_PRISMA_GENERATE=true
DEBUG=next-auth:*`;
    
    fs.writeFileSync(envLocalPath, envContent);
    console.log('✅ .env.local file created');
  }
}

// Main function to start the application
function startApp() {
  try {
    // Clean the Next.js cache directory
    cleanNextDirectory();
    
    // Set environment variables
    setEnvironmentVariables();
    
    // Run Next.js dev server
    console.log('🚀 Starting Next.js development server...');
    execSync('npx next dev', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_SECRET: 'this_is_a_secure_secret_key_for_development_do_not_use_in_production',
        SKIP_PRISMA_GENERATE: 'true',
        DEBUG: 'next-auth:*'
      }
    });
  } catch (error) {
    console.error('❌ Error starting Next.js development server:', error);
    process.exit(1);
  }
}

// Start the application
startApp(); 