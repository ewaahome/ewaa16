// Script to print environment information during Vercel build
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🔍 Gathering build information for Vercel deployment...');

// Build information
const buildInfo = {
  timestamp: new Date().toISOString(),
  nodeVersion: process.version,
  npmVersion: execSync('npm --version').toString().trim(),
  environment: process.env.VERCEL_ENV || 'development',
  buildId: process.env.VERCEL_BUILD_ID || 'local',
  region: process.env.VERCEL_REGION || 'local',
  platform: process.platform,
  arch: process.arch
};

// Git information (if available)
try {
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    buildInfo.git = {
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA,
      commitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE,
      commitAuthorName: process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME,
      repoOwner: process.env.VERCEL_GIT_REPO_OWNER,
      repoSlug: process.env.VERCEL_GIT_REPO_SLUG,
      branch: process.env.VERCEL_GIT_COMMIT_REF
    };
  } else if (fs.existsSync(path.join(process.cwd(), '.git'))) {
    buildInfo.git = {
      branch: execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
      commitSha: execSync('git rev-parse HEAD').toString().trim(),
      commitMessage: execSync('git log -1 --pretty=%B').toString().trim(),
      commitAuthorName: execSync('git log -1 --pretty=%an').toString().trim()
    };
  }
} catch (error) {
  console.warn('⚠️ Could not collect git information:', error.message);
}

// Package information
try {
  const packageJson = require(path.join(process.cwd(), 'package.json'));
  buildInfo.app = {
    name: packageJson.name,
    version: packageJson.version,
    dependencies: Object.keys(packageJson.dependencies).length,
    devDependencies: Object.keys(packageJson.devDependencies).length
  };
} catch (error) {
  console.warn('⚠️ Could not collect package information:', error.message);
}

// Write build info to a file
const buildInfoPath = path.join(process.cwd(), '.vercel-build-info.json');
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));

// Output build info
console.log('📊 Build Information:');
console.log(`   App: ${buildInfo.app?.name} v${buildInfo.app?.version}`);
console.log(`   Environment: ${buildInfo.environment}`);
console.log(`   Node.js: ${buildInfo.nodeVersion}`);
console.log(`   NPM: ${buildInfo.npmVersion}`);
console.log(`   OS: ${buildInfo.platform} (${buildInfo.arch})`);
console.log(`   Build ID: ${buildInfo.buildId}`);
if (buildInfo.git) {
  console.log(`   Git: ${buildInfo.git.branch} (${buildInfo.git.commitSha.substring(0, 7)})`);
}
console.log('✅ Build information collected successfully');
console.log('🏗️ Proceeding with Next.js build...\n');

// This is just for build information, so exit successfully
process.exit(0); 