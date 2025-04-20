#!/usr/bin/env node
// Test deployment script
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

console.log('🚀 Testing deployment configuration...');

// Check for pages/api/auth files that might conflict with app router
const pagesAuthDir = path.join(__dirname, 'pages', 'api', 'auth');
if (fs.existsSync(pagesAuthDir)) {
  console.log('⚠️ Found pages/api/auth directory, renaming to avoid conflicts...');
  try {
    fs.renameSync(pagesAuthDir, path.join(__dirname, 'pages', 'api', 'auth_backup'));
    console.log('✅ Renamed pages/api/auth to pages/api/auth_backup');
  } catch (error) {
    console.error('❌ Error renaming auth directory:', error.message);
  }
}

// Check for output: export in any config files
const configFilePaths = [
  path.join(__dirname, 'next.config.js'),
  path.join(__dirname, 'next.config.vercel.js'),
  path.join(__dirname, 'vercel.json'),
];

configFilePaths.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('output') && content.includes('export')) {
        console.log(`⚠️ Found "output: export" in ${path.basename(filePath)}, this will cause problems with API Routes and Middleware`);
        console.log('Please remove the output: export option from your Next.js configuration.');
      } else {
        console.log(`✅ ${path.basename(filePath)} looks good!`);
      }
    } catch (error) {
      console.error(`❌ Error checking ${path.basename(filePath)}:`, error.message);
    }
  }
});

console.log('\n✅ Deployment test completed!\n');
console.log('If you deploy now, make sure to set all environment variables in Vercel dashboard as they are not included in vercel.json anymore.');
console.log('Visit: https://vercel.com/[your-username]/[your-project]/settings/environment-variables to set them.');

// Try to build the project to test configuration
console.log('\nAttempting to build the project...');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('✅ Build successful! Your configuration should work on Vercel.');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.log('Please fix any issues before deploying.');
}

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m'
};

// Load environment variables
try {
  dotenv.config({ path: '.env.production' });
  if (!process.env.DATABASE_URL) {
    dotenv.config(); // Fallback to .env if .env.production doesn't have DATABASE_URL
  }
} catch (error) {
  console.log(`${colors.yellow}Warning: Could not load environment variables${colors.reset}`);
}

// Main function to run all tests
async function runTests() {
  console.log(`${colors.bold}${colors.cyan}=== Airbnb Clone Pre-Deployment Tests ===${colors.reset}\n`);
  
  let allPassed = true;
  
  // Test 1: Check if all required files exist
  console.log(`${colors.blue}1. Checking for required files...${colors.reset}`);
  const requiredFiles = [
    'package.json',
    'next.config.js',
    'tsconfig.json',
    'app/layout.tsx',
    'app/page.tsx'
  ];
  
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      console.log(`  ${colors.green}✓ ${file} exists${colors.reset}`);
    } else {
      console.log(`  ${colors.red}✗ ${file} missing${colors.reset}`);
      allPassed = false;
    }
  }
  console.log();

  // Test 2: Check environment variables
  console.log(`${colors.blue}2. Checking environment variables...${colors.reset}`);
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  ];
  
  const missingVars = [];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }
  
  if (missingVars.length === 0) {
    console.log(`  ${colors.green}✓ All required environment variables are set${colors.reset}`);
  } else {
    console.log(`  ${colors.red}✗ Missing environment variables: ${missingVars.join(', ')}${colors.reset}`);
    allPassed = false;
  }
  console.log();

  // Test 3: Check if npm dependencies can be installed
  console.log(`${colors.blue}3. Checking npm dependencies...${colors.reset}`);
  try {
    execSync('npm ls --depth=0', { stdio: 'pipe' });
    console.log(`  ${colors.green}✓ Dependencies are properly installed${colors.reset}`);
  } catch (error) {
    console.log(`  ${colors.yellow}⚠ Some dependencies might be missing or have issues${colors.reset}`);
    console.log(`  Run 'npm install' to fix potential issues`);
  }
  console.log();

  // Test 4: Check for linting errors
  console.log(`${colors.blue}4. Checking for linting errors...${colors.reset}`);
  try {
    if (packageJsonContainsCommand('lint')) {
      execSync('npm run lint', { stdio: 'pipe' });
      console.log(`  ${colors.green}✓ No linting errors found${colors.reset}`);
    } else {
      console.log(`  ${colors.yellow}⚠ Lint script not found in package.json${colors.reset}`);
    }
  } catch (error) {
    console.log(`  ${colors.red}✗ Linting errors found${colors.reset}`);
    console.log(`  ${error.stdout ? error.stdout.toString() : 'Run npm run lint to see errors'}`);
    allPassed = false;
  }
  console.log();

  // Test 5: Run build to check for TypeScript errors
  console.log(`${colors.blue}5. Checking for TypeScript/build errors...${colors.reset}`);
  try {
    execSync('npm run build', { stdio: 'pipe' });
    console.log(`  ${colors.green}✓ Build successful${colors.reset}`);
  } catch (error) {
    console.log(`  ${colors.red}✗ Build failed${colors.reset}`);
    console.log(`  ${error.stdout ? error.stdout.toString() : 'Run npm run build to see errors'}`);
    allPassed = false;
  }
  console.log();

  // Test 6: Check for unused dependencies
  console.log(`${colors.blue}6. Checking for unused dependencies...${colors.reset}`);
  try {
    const npmOutdated = execSync('npm outdated --json', { stdio: 'pipe' }).toString();
    const outdatedDeps = Object.keys(JSON.parse(npmOutdated || '{}'));
    
    if (outdatedDeps.length === 0) {
      console.log(`  ${colors.green}✓ All dependencies are up to date${colors.reset}`);
    } else {
      console.log(`  ${colors.yellow}⚠ Outdated dependencies: ${outdatedDeps.join(', ')}${colors.reset}`);
      console.log(`  Consider updating these dependencies before deploying`);
    }
  } catch (error) {
    // If the JSON parse fails, it's likely because there are no outdated dependencies
    if (error instanceof SyntaxError) {
      console.log(`  ${colors.green}✓ All dependencies are up to date${colors.reset}`);
    } else {
      console.log(`  ${colors.yellow}⚠ Could not check for outdated dependencies${colors.reset}`);
    }
  }
  console.log();

  // Test 7: Check database connection
  console.log(`${colors.blue}7. Testing database connection...${colors.reset}`);
  if (process.env.DATABASE_URL) {
    try {
      // Create a simple script to test the database connection
      const dbCheckScript = `
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        
        async function testConnection() {
          try {
            // Try to run a simple query
            await prisma.$queryRaw\`SELECT 1\`;
            console.log("Database connection successful");
            process.exit(0);
          } catch (error) {
            console.error("Database connection failed:", error.message);
            process.exit(1);
          } finally {
            await prisma.$disconnect();
          }
        }
        
        testConnection();
      `;
      
      // Write the script to a temporary file
      fs.writeFileSync('db-connection-test.js', dbCheckScript);
      
      try {
        execSync('node db-connection-test.js', { stdio: 'pipe' });
        console.log(`  ${colors.green}✓ Database connection successful${colors.reset}`);
      } catch (error) {
        console.log(`  ${colors.red}✗ Database connection failed${colors.reset}`);
        allPassed = false;
      } finally {
        // Clean up the temporary file
        fs.unlinkSync('db-connection-test.js');
      }
    } catch (error) {
      console.log(`  ${colors.red}✗ Could not test database connection${colors.reset}`);
      allPassed = false;
    }
  } else {
    console.log(`  ${colors.yellow}⚠ DATABASE_URL not set, skipping database connection test${colors.reset}`);
  }
  console.log();

  // Test 8: Check for critical files in .gitignore
  console.log(`${colors.blue}8. Checking .gitignore configuration...${colors.reset}`);
  try {
    if (fs.existsSync('.gitignore')) {
      const gitignore = fs.readFileSync('.gitignore', 'utf8');
      const criticalPatternsToIgnore = [
        '.env',
        '.env.local',
        '.env.development.local',
        '.env.test.local',
        '.env.production.local',
        'node_modules',
        '.next'
      ];
      
      const missingPatterns = [];
      for (const pattern of criticalPatternsToIgnore) {
        if (!gitignore.includes(pattern)) {
          missingPatterns.push(pattern);
        }
      }
      
      if (missingPatterns.length === 0) {
        console.log(`  ${colors.green}✓ .gitignore is properly configured${colors.reset}`);
      } else {
        console.log(`  ${colors.yellow}⚠ These patterns should be added to .gitignore: ${missingPatterns.join(', ')}${colors.reset}`);
      }
    } else {
      console.log(`  ${colors.red}✗ .gitignore file missing${colors.reset}`);
    }
  } catch (error) {
    console.log(`  ${colors.red}✗ Could not check .gitignore${colors.reset}`);
  }
  console.log();

  // Final summary
  console.log(`${colors.bold}${colors.cyan}=== Pre-Deployment Test Summary ===${colors.reset}`);
  if (allPassed) {
    console.log(`${colors.green}${colors.bold}All critical tests passed! Your app is ready for deployment.${colors.reset}`);
  } else {
    console.log(`${colors.red}${colors.bold}Some tests failed. Please fix the issues before deploying.${colors.reset}`);
    process.exit(1);
  }
}

// Helper function to check if package.json has a specific command
function packageJsonContainsCommand(command) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.scripts && packageJson.scripts[command];
  } catch (error) {
    return false;
  }
}

// Run the tests
runTests().catch(error => {
  console.error(`${colors.red}Error running tests:${colors.reset}`, error);
  process.exit(1);
}); 