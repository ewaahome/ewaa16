# Eiwaa Home - Deployment Package

This is a minimal deployment package for the Eiwaa Home application.

## Deployment Steps

1. Upload these files to your Hostinger VPS
2. Create .env file from .env.example with your actual credentials
3. Install dependencies: `npm install`
4. Build the application: `npm run build`
5. Start the server: `npm start` (or use PM2 for production)

## Environment Variables

Make sure to set all the environment variables listed in .env.example

## Database Setup

The application requires a MongoDB connection. Make sure your DATABASE_URL is correctly configured.

## Important Notes

- The application requires Node.js 18.x or later
- For production deployment, use a process manager like PM2
- For HTTPS, configure your reverse proxy (Nginx or Apache)
