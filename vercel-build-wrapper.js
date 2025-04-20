#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting Vercel build preparation...');

// Function to ensure a directory exists
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creating missing directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
    return false;
  }
  return true;
}

// Function to create a placeholder file if needed
function createPlaceholderIfNeeded(filePath, content) {
  if (!fs.existsSync(filePath)) {
    console.log(`Creating placeholder file: ${filePath}`);
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

// Function to handle conflicts between app/ and pages/ directories
function resolveDirectoryConflicts() {
  console.log('Checking for conflicting routes between app/ and pages/ directories...');
  
  // Check if both app/page.tsx and pages/index.js exist
  if (fs.existsSync('./app/page.tsx') && fs.existsSync('./pages/index.js')) {
    console.log('Conflict detected: Both app/page.tsx and pages/index.js exist');
    console.log('Removing pages/index.js to resolve conflict...');
    fs.unlinkSync('./pages/index.js');
  }
  
  // Check for other common conflicts
  const conflictMap = [
    { app: './app/api/auth/[...nextauth]/route.ts', pages: './pages/api/auth/[...nextauth].ts' }
  ];
  
  for (const conflict of conflictMap) {
    if (fs.existsSync(conflict.app) && fs.existsSync(conflict.pages)) {
      console.log(`Conflict detected: Both ${conflict.app} and ${conflict.pages} exist`);
      // We prefer app router, so rename the pages file to avoid conflicts
      const backupPath = `${conflict.pages}.bak`;
      console.log(`Renaming ${conflict.pages} to ${backupPath}...`);
      fs.renameSync(conflict.pages, backupPath);
    }
  }
}

// Check for the app directory
const appDirExists = ensureDirectoryExists('./app');
if (appDirExists) {
  console.log('app directory exists, checking for required files...');
  
  // Check for app/page.tsx
  createPlaceholderIfNeeded('./app/page.tsx', `
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to the Airbnb Clone</h1>
    </main>
  );
}
  `);
  
  // Check for app/layout.tsx
  createPlaceholderIfNeeded('./app/layout.tsx', `
import './globals.css';

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone using Next.js 13 App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
  `);
  
  // Check for app/globals.css
  createPlaceholderIfNeeded('./app/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}
  `);
}

// Check for the pages directory
const pagesDirExists = ensureDirectoryExists('./pages');
if (pagesDirExists) {
  console.log('pages directory exists, checking for required files...');
  
  // Check for pages/_app.tsx
  createPlaceholderIfNeeded('./pages/_app.tsx', `
import '../app/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
  `);
}

// Resolve conflicts between app/ and pages/ directories
resolveDirectoryConflicts();

// Log directory status for debugging
console.log('Current directory structure:');
const appFiles = fs.existsSync('./app') ? fs.readdirSync('./app') : [];
console.log('app directory:', appFiles);

const pagesFiles = fs.existsSync('./pages') ? fs.readdirSync('./pages') : [];
console.log('pages directory:', pagesFiles);

console.log('Vercel build preparation completed.');

// Set environment variables for the build
process.env.VERCEL = 'true';
process.env.NODE_ENV = 'production';

try {
  // First, ensure prisma directory exists
  const prismaDirPath = path.join(__dirname, 'prisma');
  if (!fs.existsSync(prismaDirPath)) {
    fs.mkdirSync(prismaDirPath, { recursive: true });
    console.log(`📁 Created directory: ${prismaDirPath}`);
  }

  // Check if prisma schema exists
  const prismaSchemaPath = path.join(prismaDirPath, 'schema.prisma');
  if (!fs.existsSync(prismaSchemaPath)) {
    // Look for schema.prisma in the root directory
    const rootSchemaPath = path.join(__dirname, 'schema.prisma');
    
    if (fs.existsSync(rootSchemaPath)) {
      // Copy the schema from root to prisma directory
      fs.copyFileSync(rootSchemaPath, prismaSchemaPath);
      console.log('✅ Copied schema.prisma from root to prisma directory');
    } else {
      console.log('⚠️ No schema.prisma found. Prisma may not work correctly.');
    }
  }

  // Run prisma generate directly
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Run next build
  console.log('Running Next.js build...');
  execSync('next build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Log additional information that might help debugging
  console.error('Error details:', error);
  
  // Provide helpful recovery suggestions
  console.log('Suggestions:');
  console.log('- Check the environment variables required by your application');
  console.log('- Verify that your database connection string is correct');
  console.log('- Check if your Prisma schema is valid');
  
  // Exit with error code to signal build failure
  process.exit(1);
} 