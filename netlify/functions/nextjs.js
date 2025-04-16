const { createNextHandler } = require('@netlify/next');

// Configure options for the Next.js handler
const options = {
  compression: true, // Enable compression
  distDir: '.next', // Next.js output directory
  debug: process.env.NODE_ENV !== 'production', // Enable debug in non-production
};

// Create and export the Next.js request handler
const handler = createNextHandler(options);

module.exports = { handler }; 