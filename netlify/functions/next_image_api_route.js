// This allows Next.js Image Optimization API to work with Netlify
const { builder } = require("@netlify/functions");

async function handler(event, context) {
  // Forward the request to Next.js Image Optimization API
  const path = event.path.replace('/.netlify/functions/next_image_api_route', '');
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      url: `/_next/image${path}`,
      skipPlugin: true 
    }),
  };
}

exports.handler = builder(handler); 