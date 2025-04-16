// Script to prepare Prisma files for Vercel deployment
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Prisma files for Vercel deployment...');

// Ensure prisma directory exists
const dir = path.join(process.cwd(), 'prisma');
if (!fs.existsSync(dir)) {
  console.log('📁 Creating prisma directory...');
  fs.mkdirSync(dir, { recursive: true });
}

// Create generate-client.js if it doesn't exist
const file = path.join(dir, 'generate-client.js');
if (!fs.existsSync(file)) {
  console.log('📄 Creating generate-client.js file...');
  const content = `// Prisma client generation script
const {execSync} = require('child_process');
try {
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', {stdio: 'inherit'});
  console.log('✅ Prisma client generated successfully');
} catch(e) {
  console.log('⚠️ Error generating Prisma client, continuing anyway');
  process.exit(0);
}`;

  fs.writeFileSync(file, content, 'utf8');
  console.log('✅ Created generate-client.js file');
}

// Create a minimal schema.prisma if it doesn't exist
const schemaPath = path.join(dir, 'schema.prisma');
if (!fs.existsSync(schemaPath)) {
  console.log('📄 Creating schema.prisma file...');
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

  fs.writeFileSync(schemaPath, schemaContent, 'utf8');
  console.log('✅ Created schema.prisma file');
}

console.log('✅ Preparation complete!'); 