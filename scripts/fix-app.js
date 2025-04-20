// Fix and run the application
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing application issues...');

// Kill any running Node.js processes
try {
  execSync('taskkill /f /im node.exe', { stdio: 'ignore' });
  console.log('✅ Killed existing Node.js processes');
} catch (error) {
  console.log('⚠️ No Node.js processes found to kill');
}

// Fix layout.tsx file directly (critical fix)
console.log('🔧 Fixing layout.tsx file...');
const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  try {
    // Read the layout file
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    // Remove any 'use client' directive if present
    layoutContent = layoutContent.replace(/['"]use client['"];?\s*/gi, '');
    
    // Add correct comment at the top
    if (!layoutContent.includes('// This must be a server component')) {
      layoutContent = '// This must be a server component without \'use client\' directive\n' + layoutContent;
    }
    
    // Write back the fixed content
    fs.writeFileSync(layoutPath, layoutContent);
    console.log('✅ Fixed layout.tsx file');
  } catch (error) {
    console.error('❌ Error fixing layout.tsx:', error.message);
  }
}

// Clean up all cache and build directories
console.log('🧹 Cleaning up all cache and build directories...');
try {
  // Remove .next directory
  if (fs.existsSync(path.join(process.cwd(), '.next'))) {
    execSync('rmdir /s /q .next', { stdio: 'inherit', shell: true });
  }
  
  // Clear npm cache
  execSync('npm cache clean --force', { stdio: 'inherit', shell: true });
  
  // Remove node_modules/.cache directory
  if (fs.existsSync(path.join(process.cwd(), 'node_modules', '.cache'))) {
    execSync('rmdir /s /q node_modules\\.cache', { stdio: 'inherit', shell: true });
  }
} catch (error) {
  console.error('⚠️ Error during cleanup:', error.message);
}

// Ensure .env.local exists with proper values
console.log('📝 Creating .env.local file...');
fs.writeFileSync(
  path.join(process.cwd(), '.env.local'),
  'NEXTAUTH_URL=http://localhost:3500\n' +
  'NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production\n'
);

// Set environment variables for the script
process.env.PORT = '3500';
process.env.SKIP_PRISMA_GENERATE = 'true';
process.env.NEXTAUTH_URL = 'http://localhost:3500';
process.env.NEXTAUTH_SECRET = 'this_is_a_secure_secret_key_for_development_do_not_use_in_production';

// Verify node_modules is properly installed
console.log('📦 Verifying node_modules installation...');
try {
  if (!fs.existsSync(path.join(process.cwd(), 'node_modules', 'next'))) {
    console.log('⚠️ Missing Next.js modules, reinstalling dependencies...');
    execSync('npm install --no-audit --no-fund', { stdio: 'inherit', shell: true });
  }
} catch (error) {
  console.error('⚠️ Error checking node_modules:', error.message);
}

// Run the application on a specific port
console.log('🚀 Starting Next.js application on port 3500...');
try {
  // Use node_modules/.bin/next to ensure we're using the local installation
  const nextBinPath = path.join(process.cwd(), 'node_modules', '.bin', 'next');
  
  // Check if next binary exists
  if (fs.existsSync(nextBinPath + '.cmd')) {
    execSync(`"${nextBinPath}.cmd" dev -p 3500`, {
      stdio: 'inherit',
      env: process.env,
      shell: true
    });
  } else {
    // Fallback to npx if local binary is not found
    execSync('npx next dev -p 3500', {
      stdio: 'inherit',
      env: process.env,
      shell: true
    });
  }
} catch (error) {
  console.error('❌ Application crashed:', error.message);
  process.exit(1);
} 