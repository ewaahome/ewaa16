# Environment Variables Guide for Next.js Airbnb Clone

This document outlines all the environment variables required for the proper functioning of the application in both development and production environments.

## Required Environment Variables

### Database Configuration
- `DATABASE_URL`: Connection string for your PostgreSQL database
  - Format: `postgresql://username:password@hostname:port/database?schema=public`
  - Example: `postgresql://postgres:password@localhost:5432/airbnb?schema=public`

### Authentication (NextAuth.js)
- `NEXTAUTH_SECRET`: Secret key used to encrypt JWT tokens
  - Example: `your-long-secure-random-string`
  - For development, you can use any string, but for production use a secure random string
  - You can generate one using: `openssl rand -base64 32`

- `NEXTAUTH_URL`: The base URL of your application
  - Development: `http://localhost:3000`
  - Production: Your domain (e.g., `https://your-app-name.vercel.app`)

### OAuth Providers
- `GITHUB_ID`: GitHub OAuth App Client ID
  - Get from: [GitHub Developer Settings](https://github.com/settings/developers)

- `GITHUB_SECRET`: GitHub OAuth App Client Secret
  - Get from: [GitHub Developer Settings](https://github.com/settings/developers)

- `GOOGLE_CLIENT_ID`: Google OAuth Client ID
  - Get from: [Google Cloud Console](https://console.cloud.google.com)

- `GOOGLE_CLIENT_SECRET`: Google OAuth Client Secret
  - Get from: [Google Cloud Console](https://console.cloud.google.com)

### Cloudinary (Image Upload)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
  - Get from: [Cloudinary Dashboard](https://cloudinary.com/console)

- `CLOUDINARY_URL`: Full Cloudinary URL (includes API key and secret)
  - Format: `cloudinary://API_KEY:API_SECRET@CLOUD_NAME`

- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Cloudinary upload preset name
  - Create in: [Cloudinary Upload Settings](https://cloudinary.com/console/settings/upload)

- `CLOUDINARY_API_KEY`: Your Cloudinary API key
  - Get from: [Cloudinary Dashboard](https://cloudinary.com/console)

- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
  - Get from: [Cloudinary Dashboard](https://cloudinary.com/console)

### MapBox (Maps)
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`: MapBox access token
  - Get from: [MapBox Account Page](https://account.mapbox.com/)
  - Default: `pk.eyJ1IjoibmFqaXgiLCJhIjoiY2x0MndwNjVuMHZtYzJqcno4M2E3ejlmZyJ9.8TdM1VtE4z9PnvOA21Y6-w`

- `NEXT_PUBLIC_MAPBOX_STYLE`: MapBox map style URL
  - Default: `mapbox://styles/mapbox/streets-v11`

## Setting Up Environment Variables

### For Local Development
1. Create a `.env` file in the root of your project
2. Copy the contents from `.env.example` (if available) or the list above
3. Fill in your specific values for each variable

### For Vercel Deployment
1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" section
3. Add each variable individually or import from a .env file

### For Netlify Deployment
1. Go to your site settings in Netlify
2. Navigate to "Build & deploy" > "Environment"
3. Add each variable under "Environment variables"

### For Hostinger Deployment
1. Connect to your server via SSH
2. Create a `.env.production` file in your project root
3. Set environment variables in the server configuration
   - For VPS: Add to your environment or .bashrc file
   - For Node.js hosting: Add in the hosting control panel

## Troubleshooting

If you encounter authentication or other functionality issues, ensure:

1. All required environment variables are set correctly
2. OAuth callback URLs are configured properly in GitHub and Google developer settings
3. NextAuth URL matches your actual deployment URL
4. Database connection string is correct and the database is accessible
5. Cloudinary and MapBox credentials have the correct permissions

For more help, refer to the project README or contact the project maintainers. 