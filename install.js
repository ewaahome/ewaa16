#!/usr/bin/env node
// This script runs during NPM install
const fs = require('fs');
const path = require('path');

console.log('🚀 Running installation preparation script...');

// Create essential directories
const cwd = process.cwd();
const essentialDirs = [
  'app',
  'pages',
  'prisma',
  'public'
];

for (const dir of essentialDirs) {
  const dirPath = path.join(cwd, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating ${dir} directory...`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Skip file creation if app directory already has files
const appDir = path.join(cwd, 'app');
const appFiles = fs.readdirSync(appDir);
if (appFiles.length === 0) {
  // Only create minimal files if the app directory is empty
  const appPagePath = path.join(appDir, 'page.js');
  if (!fs.existsSync(appPagePath)) {
    console.log('Creating minimal app/page.js');
    fs.writeFileSync(appPagePath, `export default function Home() { return <div>Hello</div>; }`);
  }

  const appLayoutPath = path.join(appDir, 'layout.js');
  if (!fs.existsSync(appLayoutPath)) {
    console.log('Creating minimal app/layout.js');
    fs.writeFileSync(appLayoutPath, `export default function RootLayout({ children }) { return <html><body>{children}</body></html>; }`);
  }
} else {
  console.log('✅ App directory already contains files, skipping minimal file creation');
}

console.log('✅ Installation preparation completed!'); 