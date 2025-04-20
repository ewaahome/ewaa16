const { execSync } = require('child_process');
const http = require('http');

console.log('🔍 Checking if server is running on port 3000...');

// Function to check if the server is running
function isServerRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000', (res) => {
      console.log(`✅ Server is running. Status code: ${res.statusCode}`);
      resolve(true);
    });
    
    req.on('error', (err) => {
      console.log(`❌ Server is not running or not responding: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      req.destroy();
      console.log('❌ Server request timed out');
      resolve(false);
    });
  });
}

// Function to kill any running Node processes
function killNodeProcesses() {
  try {
    console.log('🔪 Killing any running Node.js processes...');
    execSync('taskkill /F /IM node.exe', { stdio: 'inherit' });
    console.log('✅ Node processes terminated');
  } catch (error) {
    console.log('⚠️ No Node processes to terminate or unable to terminate');
  }
}

// Function to clean up .next directory
function cleanNextDirectory() {
  try {
    console.log('🧹 Removing .next directory...');
    execSync('Remove-Item -Recurse -Force -ErrorAction Ignore .next', { shell: 'powershell.exe', stdio: 'inherit' });
    console.log('✅ .next directory removed');
  } catch (error) {
    console.log(`⚠️ Error removing .next directory: ${error.message}`);
  }
}

// Function to start the server
function startServer() {
  try {
    console.log('🚀 Starting Next.js server on port 3000...');
    // Use execSync for simplicity, but we could use spawn for background process
    execSync(
      '$env:SKIP_PRISMA_GENERATE="true"; $env:NEXTAUTH_URL="http://localhost:3000"; $env:NEXTAUTH_SECRET="this_is_a_secure_secret_key_for_development_do_not_use_in_production"; npx next dev -p 3000',
      { 
        shell: 'powershell.exe',
        stdio: 'inherit' 
      }
    );
  } catch (error) {
    console.log(`❌ Error starting server: ${error.message}`);
  }
}

// Main function
async function main() {
  const isRunning = await isServerRunning();
  
  if (!isRunning) {
    console.log('🔄 Server is not running. Restarting...');
    killNodeProcesses();
    cleanNextDirectory();
    startServer();
  } else {
    console.log('✨ Server is already running on port 3000');
  }
}

// Run the main function
main(); 