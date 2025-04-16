// Robust Prisma setup script for deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Prisma client for deployment...');

// Paths
const rootDir = process.cwd();
const prismaDir = path.join(rootDir, 'prisma');
const schemaPath = path.join(prismaDir, 'schema.prisma');

// Make sure the prisma directory exists
if (!fs.existsSync(prismaDir)) {
  console.log('📁 Creating prisma directory...');
  try {
    fs.mkdirSync(prismaDir, { recursive: true });
  } catch (err) {
    console.warn('⚠️ Could not create prisma directory:', err.message);
    console.log('Continuing with installation...');
  }
}

// Create or verify schema file
if (!fs.existsSync(schemaPath)) {
  console.log('📄 Creating schema.prisma file...');
  
  // Basic schema for MongoDB
  const schemaContent = `// This is your Prisma schema file
// Learn more: https://pris.ly/d/prisma-schema

generator client {
  provider        = "prisma-client-js"
  binaryTargets   = ["native", "rhel-openssl-1.0.x"]
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// Basic User model
model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  name           String?
  email          String?   @unique
  emailVerified  DateTime?
  image          String?
  hashedPassword String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}`;
  
  try {
    fs.writeFileSync(schemaPath, schemaContent, 'utf8');
    console.log('✅ Created schema.prisma file');
  } catch (err) {
    console.warn('⚠️ Could not create schema.prisma file:', err.message);
    console.log('Continuing with installation...');
  }
} else {
  console.log('✅ schema.prisma file already exists');
}

// Generate Prisma Client
try {
  console.log('📊 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');
} catch (error) {
  console.warn('⚠️ Error generating Prisma client:', error.message);
  console.log('Continuing with installation - will retry during build phase...');
}

console.log('🏁 Prisma setup completed');

// Always exit with success to avoid breaking the installation
process.exit(0); 