/**
 * Prisma Provider for Netlify Functions
 * 
 * This file helps Netlify Functions correctly locate and use the Prisma schema
 * It provides a configured Prisma client instance for use in serverless functions
 */

const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

// Verify Prisma schema location
const schemaPath = process.env.PRISMA_SCHEMA_PATH || './prisma/schema.prisma';
const resolvedSchemaPath = path.resolve(process.cwd(), schemaPath);

// Log diagnostic information
console.log(`[Prisma Provider] Looking for schema at: ${resolvedSchemaPath}`);
console.log(`[Prisma Provider] Schema exists: ${fs.existsSync(resolvedSchemaPath)}`);

// Create Prisma client with proper configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Only log queries in development
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

// Add connection management
prisma.$on('beforeExit', async () => {
  console.log('[Prisma Provider] Disconnecting Prisma client');
  await prisma.$disconnect();
});

// Export configured Prisma client
module.exports = prisma; 