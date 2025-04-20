const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to remove entirely
const directoriesToRemove = [
  '.next',
  'node_modules',
  'out',
  'backup-files',
  'temp-auth',
  'test-drop',
  'netlify-drop',
  'netlify-plugin-prisma-provider',
  '.netlify',
  '.github'
];

// Large files to remove
const filesToRemove = [
  'hostinger-deploy.zip',
  'vercel-setup.js',
  'vercel-build-wrapper.js',
  'vercel-prebuild.js',
  'test-deploy.js',
  'prepare-netlify-drop.js',
  'netlify-prebuild.js',
  'next.config.vercel.js',
  'setup-vercel.js',
  'netlify-setup.js',
  'netlify-install-deps.js',
  'deployment-debug.js',
  'prepare-for-drop.js',
  'package-lock.json',
  '.vercel-build-info.json',
  '.deployment-marker.json',
  '.htaccess'
];

// Backup scripts if needed later
const scriptsToBackup = [
  'fix-syntax.js',
  'fix-layout.js',
  'fix-client-layout.js',
  'fix-error-boundary.js',
  'fix-and-run.js',
  'fix-component-imports.js',
  'fix-homepage.js',
  'restore-homepage.js',
  'check-server.js'
];

// Function to recursively copy directory
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Creates minimal package.json for deployment
function createMinimalPackageJson() {
  const pkg = require('./package.json');
  
  // Keep only essential dependencies
  const minimalPkg = {
    name: pkg.name,
    version: pkg.version,
    private: true,
    engines: { node: "18.x" },
    scripts: {
      start: "next start",
      build: "next build",
    },
    dependencies: {
      // Keep only runtime dependencies
      "@next-auth/prisma-adapter": pkg.dependencies["@next-auth/prisma-adapter"],
      "@prisma/client": pkg.dependencies["@prisma/client"],
      "axios": pkg.dependencies["axios"],
      "bcrypt": pkg.dependencies["bcrypt"],
      "cloudinary": pkg.dependencies["cloudinary"],
      "date-fns": pkg.dependencies["date-fns"],
      "dotenv": pkg.dependencies["dotenv"],
      "leaflet": pkg.dependencies["leaflet"],
      "mapbox-gl": pkg.dependencies["mapbox-gl"],
      "mongodb": pkg.dependencies["mongodb"],
      "next": pkg.dependencies["next"],
      "next-auth": pkg.dependencies["next-auth"],
      "query-string": pkg.dependencies["query-string"],
      "react": pkg.dependencies["react"],
      "react-date-range": pkg.dependencies["react-date-range"],
      "react-dom": pkg.dependencies["react-dom"],
      "react-hook-form": pkg.dependencies["react-hook-form"],
      "react-hot-toast": pkg.dependencies["react-hot-toast"],
      "react-icons": pkg.dependencies["react-icons"],
      "react-leaflet": pkg.dependencies["react-leaflet"],
      "react-select": pkg.dependencies["react-select"],
      "react-spinners": pkg.dependencies["react-spinners"],
      "swr": pkg.dependencies["swr"],
      "world-countries": pkg.dependencies["world-countries"],
      "zustand": pkg.dependencies["zustand"]
    }
  };
  
  // Backup the original package.json
  fs.copyFileSync('package.json', 'cleanup-backup/package.json.bak');
  
  // Write the minimal package.json
  fs.writeFileSync('package.json.min', JSON.stringify(minimalPkg, null, 2));
  
  console.log('✅ Created minimal package.json as package.json.min');
}

// Function to backup important scripts
function backupScripts() {
  const backupDir = 'cleanup-backup/scripts';
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  scriptsToBackup.forEach(script => {
    if (fs.existsSync(script)) {
      fs.copyFileSync(script, path.join(backupDir, script));
      console.log(`✅ Backed up ${script}`);
    }
  });
}

// Create deployment directory with only necessary files
function prepareDeploymentFiles() {
  const deployDir = 'hostinger-minimal';
  if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir, { recursive: true });
  }
  
  // Copy necessary files and directories
  const essentialDirs = ['app', 'public', 'prisma'];
  const essentialFiles = [
    'package.json.min', 
    'next.config.js', 
    'middleware.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.json',
    'schema.prisma'
  ];
  
  essentialDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      try {
        console.log(`Copying ${dir} directory...`);
        copyDirectory(dir, path.join(deployDir, dir));
        console.log(`✅ Copied ${dir} directory`);
      } catch (error) {
        console.error(`Error copying ${dir}: ${error.message}`);
      }
    }
  });
  
  essentialFiles.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        const destFile = file === 'package.json.min' ? 'package.json' : file;
        fs.copyFileSync(file, path.join(deployDir, destFile));
        console.log(`✅ Copied ${file}`);
      } catch (error) {
        console.error(`Error copying ${file}: ${error.message}`);
      }
    }
  });
  
  // Create .env.example file with required environment variables
  const envExample = `# Required environment variables for deployment
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=https://your-domain.com

# Cloudinary configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# MapBox configuration
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
NEXT_PUBLIC_MAPBOX_STYLE=mapbox://styles/mapbox/streets-v12

# Optional: Google and GitHub OAuth
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
`;

  fs.writeFileSync(path.join(deployDir, '.env.example'), envExample);
  console.log('✅ Created .env.example file');
  
  // Create deployment README
  const deployReadme = `# Eiwaa Home - Deployment Package

This is a minimal deployment package for the Eiwaa Home application.

## Deployment Steps

1. Upload these files to your Hostinger VPS
2. Create .env file from .env.example with your actual credentials
3. Install dependencies: \`npm install\`
4. Build the application: \`npm run build\`
5. Start the server: \`npm start\` (or use PM2 for production)

## Environment Variables

Make sure to set all the environment variables listed in .env.example

## Database Setup

The application requires a MongoDB connection. Make sure your DATABASE_URL is correctly configured.

## Important Notes

- The application requires Node.js 18.x or later
- For production deployment, use a process manager like PM2
- For HTTPS, configure your reverse proxy (Nginx or Apache)
`;

  fs.writeFileSync(path.join(deployDir, 'README.md'), deployReadme);
  console.log('✅ Created deployment README');
  
  console.log(`\n✅ Deployment package created in ${deployDir} directory`);
}

// Main cleanup function
async function cleanup() {
  console.log('🧹 Starting cleanup process...');
  
  // Create minimal package.json
  createMinimalPackageJson();
  
  // Backup important scripts
  backupScripts();
  
  // Prepare deployment files
  prepareDeploymentFiles();
  
  console.log('\n⚠️ The following directories can be safely removed to free up space:');
  directoriesToRemove.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(` - ${dir}`);
    }
  });
  
  console.log('\n⚠️ The following files can be safely removed to free up space:');
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(` - ${file}`);
    }
  });
  
  console.log('\n✅ Cleanup preparation complete!');
  console.log('👉 Run the following command to remove directories (be careful - this will permanently delete files):');
  console.log('   node -e "require(\'./cleanup.js\').removeFiles()"');
}

// Function to actually remove files (separate to avoid accidental deletion)
function removeFiles() {
  console.log('🗑️ Removing unnecessary files and directories...');
  
  directoriesToRemove.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`Removing directory: ${dir}`);
      try {
        execSync(`rmdir /S /Q "${dir}"`, { stdio: 'inherit' });
      } catch (error) {
        console.error(`Error removing ${dir}: ${error.message}`);
      }
    }
  });
  
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`Removing file: ${file}`);
      try {
        fs.unlinkSync(file);
      } catch (error) {
        console.error(`Error removing ${file}: ${error.message}`);
      }
    }
  });
  
  console.log('✅ Cleanup complete!');
}

// Run the cleanup process
cleanup().catch(console.error);

// Export the removeFiles function for separate execution
module.exports = { removeFiles }; 