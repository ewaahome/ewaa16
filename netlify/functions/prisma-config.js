// Helper for configuring Prisma in Netlify functions
const { PrismaClient } = require('@prisma/client');

// Configure Prisma with specific options for Netlify
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
  errorFormat: 'pretty',
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Add event listeners for connection issues
prisma.$on('query', (e) => {
  console.log('Query:', e.query);
  console.log('Duration:', e.duration, 'ms');
});

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e.message);
});

// Export configured Prisma client
module.exports = prisma; 