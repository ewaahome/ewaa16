// Health check function for Netlify deployment
const { PrismaClient } = require('@prisma/client');

exports.handler = async function(event, context) {
  console.log('Health check function invoked');
  
  // Check database connection
  let prisma;
  let dbStatus = 'unknown';
  
  try {
    prisma = new PrismaClient();
    await prisma.$connect();
    
    // Test query
    const result = await prisma.$runCommandRaw({
      ping: 1
    });
    
    if (result && result.ok === 1) {
      dbStatus = 'connected';
    } else {
      dbStatus = 'error: ping failed';
    }
  } catch (error) {
    console.error('Database connection error:', error);
    dbStatus = `error: ${error.message}`;
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      database: dbStatus,
      nodeVersion: process.version
    })
  };
}; 