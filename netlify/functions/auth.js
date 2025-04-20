/**
 * Auth Function for Netlify
 * 
 * This function handles authentication-related API requests
 */

const bcrypt = require('bcrypt');
const prisma = require('./prisma-provider');

// Main handler function
exports.handler = async (event, context) => {
  try {
    // Parse path and method
    const path = event.path.replace('/.netlify/functions/auth', '');
    const method = event.httpMethod;
    console.log(`[Auth] ${method} ${path}`);
    
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
    
    // Login endpoint
    if (path === '/login' && method === 'POST') {
      const { email, password } = body;
      
      if (!email || !password) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Email and password are required' }),
          headers: { 'Content-Type': 'application/json' }
        };
      }
      
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email }
      });
      
      if (!user || !user.hashedPassword) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Invalid credentials' }),
          headers: { 'Content-Type': 'application/json' }
        };
      }
      
      // Check password
      const isValid = await bcrypt.compare(password, user.hashedPassword);
      
      if (!isValid) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Invalid credentials' }),
          headers: { 'Content-Type': 'application/json' }
        };
      }
      
      // Return user data (excluding sensitive information)
      const { hashedPassword, ...userData } = user;
      response = {
        statusCode: 200,
        body: JSON.stringify({ 
          user: userData,
          message: 'Login successful'
        }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    
    // User registration endpoint
    else if (path === '/register' && method === 'POST') {
      const { email, name, password } = body;
      
      if (!email || !name || !password) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Email, name, and password are required' }),
          headers: { 'Content-Type': 'application/json' }
        };
      }
      
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        return {
          statusCode: 409,
          body: JSON.stringify({ error: 'User already exists' }),
          headers: { 'Content-Type': 'application/json' }
        };
      }
      
      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const user = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword
        }
      });
      
      // Return user data (excluding sensitive information)
      const { hashedPassword: _, ...userData } = user;
      response = {
        statusCode: 201,
        body: JSON.stringify({ 
          user: userData,
          message: 'Registration successful'
        }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    
    return response;
  } catch (error) {
    console.error('Auth Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } finally {
    // Disconnect Prisma client to prevent connection leaks
    await prisma.$disconnect();
  }
}; 