// Simple script to test MongoDB connection
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testConnection() {
  console.log('Testing database connection...');
  console.log(`Using DATABASE_URL: ${process.env.DATABASE_URL.substring(0, 40)}...`);
  
  const prisma = new PrismaClient({
    log: ['error', 'warn', 'info'],
  });

  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('✅ Connection successful!');
    
    // Try a simple query
    console.log('Testing simple query...');
    const userCount = await prisma.user.count();
    console.log(`✅ Query successful! User count: ${userCount}`);
    
    // Get database stats
    console.log('Getting database statistics...');
    try {
      const stats = await prisma.$runCommandRaw({ dbStats: 1 });
      console.log(`✅ Database stats retrieved!`);
      console.log(JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('❌ Could not get database stats:', statsError.message);
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    if (error.message.includes('timed out')) {
      console.error('  - Connection timeout. Check network connectivity or MongoDB Atlas status.');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('  - Host not found. Check DATABASE_URL for typos.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('  - Authentication failed. Check username and password in DATABASE_URL.');
    }
    
    return { success: false, error: error.message };
  } finally {
    try {
      await prisma.$disconnect();
      console.log('Database connection closed.');
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError.message);
    }
  }
}

// Run the test
testConnection()
  .then((result) => {
    console.log('\nTest completed');
    process.exit(result.success ? 0 : 1);
  })
  .catch((err) => {
    console.error('Unhandled error in test script:', err);
    process.exit(1);
  }); 