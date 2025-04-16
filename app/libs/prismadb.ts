import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

// Try to handle connection errors more gracefully
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn', 'query', 'info'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })
}

// Use global variable to prevent multiple instances during hot reload
const client = globalThis.prisma || prismaClientSingleton()

// Handle connection errors
if (!client) {
  console.error('Failed to initialize Prisma client')
  throw new Error('Database client initialization failed')
}

// Add error logging and connection testing
try {
  // Test connection on startup
  client.$connect().then(() => {
    console.log('Database connection established successfully to MongoDB')
    // Verify database exists and is accessible
    return client.$runCommandRaw({ ping: 1 })
      .then(() => console.log('Database ping successful'))
      .catch(err => console.error('Database ping failed:', err))
  }).catch((err) => {
    console.error('Database connection error:', err)
    
    // Provide more specific error messages based on error type
    if (err.message.includes('timed out')) {
      console.error('Connection timeout. Check network connectivity or MongoDB Atlas status.')
    } else if (err.message.includes('ENOTFOUND')) {
      console.error('Host not found. Check DATABASE_URL for typos.')
    } else if (err.message.includes('Authentication failed')) {
      console.error('Authentication failed. Check username and password in DATABASE_URL.')
    }
  })
} catch (error) {
  console.error('Prisma connection error:', error)
}

if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
