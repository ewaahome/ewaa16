// Minimal Vercel prebuild hook
const fs = require('fs');
const path = require('path');

console.log('🚀 Running Vercel prebuild hook...');

// Get current working directory
const cwd = process.cwd();

// Ensure app directory exists
const appDir = path.join(cwd, 'app');
if (!fs.existsSync(appDir)) {
  console.log('Creating app directory...');
  fs.mkdirSync(appDir, { recursive: true });
}

// Ensure pages directory exists
const pagesDir = path.join(cwd, 'pages');
if (!fs.existsSync(pagesDir)) {
  console.log('Creating pages directory...');
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Ensure prisma directory exists
const prismaDir = path.join(cwd, 'prisma');
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir, { recursive: true });
  console.log('Created prisma directory');
}

// Create basic app/globals.css if it doesn't exist
const appGlobalsCssPath = path.join(appDir, 'globals.css');
if (!fs.existsSync(appGlobalsCssPath)) {
  console.log('Creating basic app/globals.css file');
  const appGlobalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
:root {
  height: 100%;
}`;
  fs.writeFileSync(appGlobalsCssPath, appGlobalsCssContent);
}

// Create basic app/page.js if it doesn't exist
const appPagePath = path.join(appDir, 'page.js');
if (!fs.existsSync(appPagePath)) {
  console.log('Creating basic app/page.js file');
  const appPageContent = `export default function Home() {
  return (
    <div>
      <h1>Welcome to Eiwaa Home</h1>
    </div>
  );
}`;
  fs.writeFileSync(appPagePath, appPageContent);
}

// Create basic app/layout.js if it doesn't exist
const appLayoutPath = path.join(appDir, 'layout.js');
if (!fs.existsSync(appLayoutPath)) {
  console.log('Creating basic app/layout.js file');
  const appLayoutContent = `export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>Eiwaa Home</title>
        <meta name="description" content="Eiwaa Home - Your Home in Saudi Arabia" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}`;
  fs.writeFileSync(appLayoutPath, appLayoutContent);
}

// Create basic pages/index.js if it doesn't exist
const pagesIndexPath = path.join(pagesDir, 'index.js');
if (!fs.existsSync(pagesIndexPath)) {
  console.log('Creating basic pages/index.js file');
  const pagesIndexContent = `import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);

  return <div>Redirecting...</div>;
}`;
  fs.writeFileSync(pagesIndexPath, pagesIndexContent);
}

// Copy specialized Prisma schema for Vercel
const targetSchemaPath = path.join(prismaDir, 'schema.prisma');
const specializedSchemaPath = path.join(cwd, 'prisma-vercel.prisma');
const rootSchemaPath = path.join(cwd, 'schema.prisma');

if (fs.existsSync(specializedSchemaPath)) {
  console.log('Using specialized Prisma schema for Vercel');
  fs.copyFileSync(specializedSchemaPath, targetSchemaPath);
} else if (fs.existsSync(rootSchemaPath)) {
  console.log('Copying schema.prisma from root to prisma directory');
  fs.copyFileSync(rootSchemaPath, targetSchemaPath);
} else {
  console.warn('WARNING: No Prisma schema found!');
}

// Use specialized next.config.js for Vercel
const nextConfigVercelPath = path.join(cwd, 'next.config.vercel.js');
const nextConfigPath = path.join(cwd, 'next.config.js');
const nextConfigBackupPath = path.join(cwd, 'next.config.original.js');

if (fs.existsSync(nextConfigVercelPath)) {
  // Backup the original next.config.js if it exists
  if (fs.existsSync(nextConfigPath) && !fs.existsSync(nextConfigBackupPath)) {
    console.log('Backing up original next.config.js');
    fs.copyFileSync(nextConfigPath, nextConfigBackupPath);
  }
  
  // Copy the Vercel-specific next.config.js
  console.log('Using specialized next.config.js for Vercel');
  fs.copyFileSync(nextConfigVercelPath, nextConfigPath);
}

// Create a fallback index.html in the public directory
const publicDir = path.join(cwd, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('Created public directory');
}

const fallbackIndexPath = path.join(publicDir, 'index.html');
if (!fs.existsSync(fallbackIndexPath)) {
  console.log('Creating fallback index.html');
  const fallbackIndexContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eiwaa Home</title>
  <style>
    body {
      font-family: 'Tajawal', sans-serif;
      text-align: center;
      padding: 50px;
      background-color: #f8f9fa;
    }
    h1 {
      color: #1e3a8a;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>مرحبا بكم في إيواء هوم</h1>
    <p>سيتم تحديث الموقع قريباً</p>
  </div>
</body>
</html>`;
  fs.writeFileSync(fallbackIndexPath, fallbackIndexContent);
}

// Ensure tailwind config exists
const tailwindConfigPath = path.join(cwd, 'tailwind.config.js');
if (!fs.existsSync(tailwindConfigPath)) {
  console.log('Creating basic tailwind.config.js');
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
}

// Check if any directories exist in the current working directory
console.log('Listing directories in project root:');
fs.readdirSync(cwd, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dir => console.log(`- ${dir.name}`));

// Verify that env variables exist
if (!process.env.DATABASE_URL) {
  console.warn('Warning: DATABASE_URL environment variable is not set');
}

console.log('✅ Vercel prebuild completed successfully!'); 