/**
 * API Bridge for Netlify Functions
 * 
 * This function serves as a bridge between the static site and Prisma database
 * It handles API requests that would normally require server-side processing
 */

let prisma;
try {
  prisma = require('./prisma-provider');
} catch (e) {
  console.warn('Prisma provider not available. Using mock data.', e);
  prisma = null;
}

// Log environment information
console.log('API Bridge Function Environment:', {
  node: process.version,
  env: process.env.NODE_ENV || 'development'
});

// Mock data for when database is unavailable
const MOCK_DATA = {
  users: [
    { id: '6579f306e65f5fbbb8ed0e10', name: 'User 1', email: 'user1@example.com', image: null, createdAt: new Date().toISOString() },
    { id: '6579f306e65f5fbbb8ed0e11', name: 'User 2', email: 'user2@example.com', image: null, createdAt: new Date().toISOString() }
  ],
  listings: [
    {
      id: '6579f306e65f5fbbb8ed0e13',
      title: 'شقة فاخرة في الرياض',
      description: 'شقة فاخرة في حي الملقا في الرياض',
      imageSrc: '/placeholder.jpg',
      createdAt: new Date().toISOString(),
      category: 'شقق',
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 6,
      locationValue: 'SA',
      price: 500,
      userId: '6579f306e65f5fbbb8ed0e10',
      user: { id: '6579f306e65f5fbbb8ed0e10', name: 'User 1', image: null }
    },
    {
      id: '6579f306e65f5fbbb8ed0e14',
      title: 'فيلا في جدة',
      description: 'فيلا فاخرة في حي النهضة',
      imageSrc: '/placeholder.jpg',
      createdAt: new Date().toISOString(),
      category: 'فلل',
      roomCount: 5,
      bathroomCount: 4,
      guestCount: 10,
      locationValue: 'SA',
      price: 1200,
      userId: '6579f306e65f5fbbb8ed0e11',
      user: { id: '6579f306e65f5fbbb8ed0e11', name: 'User 2', image: null }
    }
  ]
};

// Generic error handler
const handleError = (error) => {
  console.error('API Error:', error);
  return {
    statusCode: error.statusCode || 500,
    body: JSON.stringify({ 
      error: error.message || 'Unknown server error',
      timestamp: new Date().toISOString()
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

// Main handler function
exports.handler = async (event, context) => {
  try {
    // Parse path and method
    const path = event.path.replace('/.netlify/functions/api-bridge', '');
    const method = event.httpMethod;
    console.log(`[API Bridge] ${method} ${path}`);
    
    // Parse request body if it exists
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid JSON in request body' })
        };
      }
    }
    
    // Default response
    let response = {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not Found' }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    // Route API requests based on path and method
    if (path === '/users' && method === 'GET') {
      if (prisma) {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true
          }
        });
        response = {
          statusCode: 200,
          body: JSON.stringify(users),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      } else {
        // Use mock data if prisma is not available
        response = {
          statusCode: 200,
          body: JSON.stringify(MOCK_DATA.users),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
    }
    else if (path === '/listings' && method === 'GET' || path.startsWith('/listings') && method === 'GET') {
      if (prisma) {
        const listings = await prisma.listing.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        });
        response = {
          statusCode: 200,
          body: JSON.stringify(listings),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      } else {
        // Use mock data if prisma is not available
        response = {
          statusCode: 200,
          body: JSON.stringify(MOCK_DATA.listings),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
    }
    // GET /api/health - always respond with 200 for health checks
    else if (path === '/health' || path === '/healthcheck') {
      response = {
        statusCode: 200,
        body: JSON.stringify({ 
          status: 'ok', 
          timestamp: new Date().toISOString(),
          prisma: !!prisma
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }
    
    return response;
  } catch (error) {
    return handleError(error);
  } finally {
    // Disconnect Prisma client to prevent connection leaks
    if (prisma) {
      try {
        await prisma.$disconnect();
      } catch (e) {
        console.error('Error disconnecting Prisma:', e);
      }
    }
  }
}; 