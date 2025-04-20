#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

console.log(`${colors.bold}${colors.cyan}=== Airbnb Clone Deployment Script ===${colors.reset}\n`);

// Check if test-deploy.js exists and run it
const runTests = () => {
  try {
    if (fs.existsSync('./test-deploy.js')) {
      console.log(`${colors.blue}Running deployment tests...${colors.reset}`);
      execSync('node test-deploy.js', { stdio: 'inherit' });
      return true;
    } else {
      console.log(`${colors.yellow}Warning: test-deploy.js not found. Skipping tests.${colors.reset}`);
      return true;
    }
  } catch (error) {
    console.error(`${colors.red}Tests failed! Please fix the issues before deploying.${colors.reset}`);
    return false;
  }
};

// Check for environment variables
const checkEnvVariables = () => {
  const envFile = '.env';
  const requiredVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
    'GITHUB_ID',
    'GITHUB_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ];
  
  console.log(`${colors.blue}Checking environment variables...${colors.reset}`);
  
  if (!fs.existsSync(envFile)) {
    console.log(`${colors.yellow}Warning: .env file not found.${colors.reset}`);
    return false;
  }
  
  const envContent = fs.readFileSync(envFile, 'utf8');
  let allVarsPresent = true;
  
  requiredVars.forEach(variable => {
    if (!envContent.includes(`${variable}=`)) {
      console.log(`${colors.yellow}Warning: ${variable} is not set in your .env file${colors.reset}`);
      allVarsPresent = false;
    }
  });
  
  if (!allVarsPresent) {
    console.log(`${colors.yellow}Please ensure all environment variables are set in your Vercel dashboard${colors.reset}`);
  } else {
    console.log(`${colors.green}All required environment variables are present${colors.reset}`);
  }
  
  return true;
};

// Run Prisma db push
const runPrismaDbPush = () => {
  try {
    console.log(`${colors.blue}Running Prisma DB push...${colors.reset}`);
    execSync('npx prisma db push', { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.red}Prisma DB push failed!${colors.reset}`);
    return false;
  }
};

// Build the application
const buildApp = () => {
  try {
    console.log(`${colors.blue}Building the application...${colors.reset}`);
    execSync('npm run build', { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.red}Build failed!${colors.reset}`);
    return false;
  }
};

// Deploy to Vercel
const deployToVercel = () => {
  return new Promise((resolve) => {
    rl.question(`${colors.bold}${colors.magenta}Ready to deploy. Proceed with deployment to Vercel? (y/N): ${colors.reset}`, (answer) => {
      if (answer.toLowerCase() === 'y') {
        try {
          console.log(`${colors.blue}Deploying to Vercel...${colors.reset}`);
          execSync('npx vercel --prod', { stdio: 'inherit' });
          console.log(`${colors.green}${colors.bold}Deployment successful!${colors.reset}`);
          
          // Update deployment history
          updateDeploymentHistory();
          
          // Reminder for post-deployment checks
          console.log(`\n${colors.cyan}Don't forget to run through the post-deployment checklist:${colors.reset}`);
          console.log(`${colors.white}1. Visit the deployed site and verify it loads correctly${colors.reset}`);
          console.log(`${colors.white}2. Test user authentication flows${colors.reset}`);
          console.log(`${colors.white}3. Verify search functionality works properly${colors.reset}`);
          console.log(`${colors.white}4. Test creating a new listing${colors.reset}`);
          console.log(`${colors.white}5. Test booking functionality${colors.reset}`);
          console.log(`${colors.white}6. Verify map displays correctly with proper location data${colors.reset}`);
          console.log(`${colors.white}7. Check responsiveness on mobile devices${colors.reset}`);
          console.log(`${colors.white}8. Ensure favorites functionality works${colors.reset}`);
          resolve(true);
        } catch (error) {
          console.error(`${colors.red}Deployment failed.${colors.reset}`);
          console.log(`${colors.yellow}Check the Vercel CLI output above for details.${colors.reset}`);
          resolve(false);
        }
      } else {
        console.log(`${colors.yellow}Deployment aborted.${colors.reset}`);
        resolve(false);
      }
    });
  });
};

// Main function
const main = async () => {
  let shouldContinue = true;
  
  shouldContinue = runTests();
  if (!shouldContinue) return;
  
  shouldContinue = checkEnvVariables();
  if (!shouldContinue) return;
  
  shouldContinue = runPrismaDbPush();
  if (!shouldContinue) return;
  
  shouldContinue = buildApp();
  if (!shouldContinue) return;
  
  await deployToVercel();
  
  console.log(`${colors.blue}===== DEPLOYMENT PROCESS COMPLETED =====${colors.reset}`);
  console.log(`${colors.green}Don't forget to check the deployment checklist in deployment-checklist.md${colors.reset}`);
  
  rl.close();
};

// Function to update deployment history in the markdown file
function updateDeploymentHistory() {
  try {
    const checklistFile = 'deployment-checklist.md';
    if (fs.existsSync(checklistFile)) {
      const content = fs.readFileSync(checklistFile, 'utf8');
      const deploymentTable = content.indexOf('## Deployment History');
      
      if (deploymentTable !== -1) {
        // Get current version from package.json
        let version = 'N/A';
        try {
          const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
          version = packageJson.version || 'N/A';
        } catch (e) {
          console.log(`${colors.yellow}Could not read version from package.json${colors.reset}`);
        }

        // Get current git username if available
        let deployedBy = 'N/A';
        try {
          deployedBy = execSync('git config user.name').toString().trim();
        } catch (e) {
          console.log(`${colors.yellow}Could not get git username${colors.reset}`);
        }

        // Today's date
        const date = new Date().toISOString().split('T')[0];

        // Find the table in the content
        const lines = content.split('\n');
        const tableIndex = lines.findIndex(line => line.includes('| Date | Version | Deployed By | Notes |'));
        
        if (tableIndex !== -1) {
          // Insert new row after the header and separator rows
          lines.splice(tableIndex + 2, 0, `| ${date} | ${version} | ${deployedBy} | Auto-deployment via deploy.js |`);
          fs.writeFileSync(checklistFile, lines.join('\n'));
          console.log(`${colors.green}Updated deployment history in ${checklistFile}${colors.reset}`);
        }
      }
    }
  } catch (error) {
    console.log(`${colors.yellow}Could not update deployment history: ${error.message}${colors.reset}`);
  }
}

main(); 