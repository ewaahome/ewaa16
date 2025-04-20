// Simplified setup script for Vercel deployment
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up project for Vercel deployment...');

// Ensure prisma directory exists
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

// Simple check for necessary environment variables
if (!process.env.DATABASE_URL) {
  console.warn('⚠️ Warning: DATABASE_URL environment variable is not set.');
  console.warn('   Make sure to set it in your Vercel project settings.');
}

console.log('✅ Setup for Vercel completed!'); 