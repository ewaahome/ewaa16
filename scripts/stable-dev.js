// Stable development server script
const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Define a fixed port for the app
const PORT = 3600;

console.log(`🚀 Starting Next.js development server on port ${PORT}...`);

// First, let's try to kill any potentially running Next.js instances
try {
  if (process.platform === 'win32') {
    console.log('💤 Attempting to kill any running Next.js processes...');
    // On Windows, we can use taskkill
    execSync('taskkill /F /IM node.exe /FI "WINDOWTITLE eq next*" /T', { stdio: 'ignore' });
  } else {
    // On Unix systems, we could use something like pkill
    execSync('pkill -f "next dev"', { stdio: 'ignore' });
  }
} catch (error) {
  // It's okay if this fails, it just means there were no processes to kill
  console.log('No Next.js processes needed to be terminated');
}

// Set required environment variables
const env = {
  ...process.env,
  PORT: PORT.toString(),
  SKIP_PRISMA_GENERATE: 'true',
  DATABASE_URL: "mongodb+srv://finaleewa:finaleewa@finaleewa.7eytc2o.mongodb.net/finaleewa?retryWrites=true&w=majority&appName=finaleewa",
  NEXTAUTH_SECRET: "eiwaahomeauthsecretkey2024",
  NEXTAUTH_URL: `http://localhost:${PORT}`,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dzwkeydij",
  CLOUDINARY_URL: "cloudinary://261241242864329:KS0GJUBWc5m5gyMXLC2yPPozVuA@dzwkeydij",
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: "airbnb_upload",
  CLOUDINARY_API_KEY: "261241242864329",
  CLOUDINARY_API_SECRET: "KS0GJUBWc5m5gyMXLC2yPPozVuA",
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: "pk.eyJ1IjoiZXdhYWhvbWUiLCJhIjoiY204ZGpranNkMWs4cTJtczU0dmwxaXlpdiJ9.0xFsZgp69DtYp5iwQh9Ivw",
  NEXT_PUBLIC_MAPBOX_STYLE: "mapbox://styles/mapbox/streets-v11",
  DEBUG: "next-auth"
};

// Try to clean the .next directory if it exists to avoid cache issues
try {
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    console.log('🧹 Cleaning .next directory to avoid cache issues...');
    if (process.platform === 'win32') {
      execSync(`rmdir /s /q "${nextDir}"`, { stdio: 'ignore' });
    } else {
      execSync(`rm -rf "${nextDir}"`, { stdio: 'ignore' });
    }
  }
} catch (error) {
  console.log('⚠️ Could not clean .next directory:', error.message);
}

try {
  // Start Next.js dev server with the correct path and port
  const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const nextProcess = spawn(cmd, ['next', 'dev', '-p', PORT.toString()], {
    stdio: 'inherit',
    env,
    shell: true
  });

  nextProcess.on('error', (error) => {
    console.error('❌ Development server error:', error.message);
    process.exit(1);
  });

  nextProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Development server exited with code ${code}`);
    }
    process.exit(code || 0);
  });

  // Handle termination signals
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      console.log(`\n🛑 Received ${signal}, shutting down...`);
      nextProcess.kill();
      process.exit(0);
    });
  });
} catch (error) {
  console.error('❌ Failed to start development server:', error.message);
  process.exit(1);
} 