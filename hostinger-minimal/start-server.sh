#!/bin/bash

# Eiwaa Home Server Startup Script
# This script prepares and starts the Next.js application

echo "🚀 Starting Eiwaa Home server..."

# Load environment variables
if [ -f .env ]; then
  echo "✅ Loading environment variables from .env"
  export $(grep -v '^#' .env | xargs)
else
  echo "⚠️ No .env file found, make sure environment variables are set!"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js v18 or later."
  exit 1
fi

# Get Node.js version
NODE_VERSION=$(node -v)
echo "📦 Using Node.js version: $NODE_VERSION"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
  echo "⚠️ PM2 is not installed. Installing PM2..."
  npm install -g pm2
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "⚠️ Installing dependencies..."
  npm install
fi

# Check if .next directory exists (if not, build the app)
if [ ! -d ".next" ]; then
  echo "⚠️ Building the application..."
  npm run build
fi

# Check if MongoDB is accessible
echo "🔍 Testing MongoDB connection..."
node -e "
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error('❌ DATABASE_URL is not set in the environment variables.');
  process.exit(1);
}
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✅ MongoDB connection successful!');
    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}
run();
"

# Check the exit status of the MongoDB connection test
if [ $? -ne 0 ]; then
  echo "❌ Failed to connect to MongoDB. Please check your DATABASE_URL."
  exit 1
fi

# Start the application with PM2
echo "🚀 Starting application with PM2..."
PM2_RUNNING=$(pm2 list | grep ewaahome)

if [ -z "$PM2_RUNNING" ]; then
  pm2 start npm --name "ewaahome" -- start
  echo "✅ Application started successfully!"
else
  echo "🔄 Application is already running in PM2. Restarting..."
  pm2 restart ewaahome
fi

# Save PM2 process list
pm2 save

echo "✨ Eiwaa Home is now running!"
echo "🌐 Access your application at: $NEXTAUTH_URL (or http://localhost:3000 if NEXTAUTH_URL is not set)"
echo "📊 Monitor with: pm2 monit"
echo "📝 View logs with: pm2 logs ewaahome" 