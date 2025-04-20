# Running the Next.js Airbnb Clone Project

This guide provides instructions for running the project locally, addressing common issues with authentication and environment variables.

## Prerequisites

- Node.js version 18.17.0 or later
- Git
- A MongoDB database (local or remote)
- (Optional) Cloudinary account for image uploads
- (Optional) GitHub and Google OAuth credentials for social login

## Setup Steps

### 1. Clone the Repository (if you haven't already)

```bash
git clone https://github.com/yourusername/next13-airbnb-clone.git
cd next13-airbnb-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory with the following content:

```
# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production

# Database (REQUIRED)
DATABASE_URL=your_mongodb_connection_string

# OAuth Providers (OPTIONAL)
GITHUB_ID=your_github_oauth_app_client_id
GITHUB_SECRET=your_github_oauth_app_client_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Cloudinary for Image Upload (OPTIONAL)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_URL=your_cloudinary_url
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mapbox (OPTIONAL)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
NEXT_PUBLIC_MAPBOX_STYLE=mapbox://styles/mapbox/streets-v11
```

### 4. Run the Development Server

**Option 1**: Standard start command:
```bash
npm run dev
```

**Option 2**: If you encounter NextAuth or JWT decryption errors, use this command:
```bash
# For Windows PowerShell
$env:NEXTAUTH_URL='http://localhost:3000'; $env:NEXTAUTH_SECRET='this_is_a_secure_secret_key_for_development_do_not_use_in_production'; npx next dev

# For Windows Command Prompt
set NEXTAUTH_URL=http://localhost:3000 && set NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production && npx next dev

# For Linux/Mac
NEXTAUTH_URL=http://localhost:3000 NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production npx next dev
```

**Option 3**: If you encounter Prisma errors, skip the Prisma generation:
```bash
# For Windows PowerShell
$env:SKIP_PRISMA_GENERATE='true'; $env:NEXTAUTH_URL='http://localhost:3000'; $env:NEXTAUTH_SECRET='this_is_a_secure_secret_key_for_development_do_not_use_in_production'; npx next dev

# For Windows Command Prompt
set SKIP_PRISMA_GENERATE=true && set NEXTAUTH_URL=http://localhost:3000 && set NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production && npx next dev

# For Linux/Mac
SKIP_PRISMA_GENERATE=true NEXTAUTH_URL=http://localhost:3000 NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production npx next dev
```

### 5. Using a Different Port

If port 3000 is already in use, specify a different port:

```bash
npx next dev -p 3001
```

## Troubleshooting Common Issues

### JWT Decryption Errors

If you see error messages like:
```
[next-auth][error][JWT_SESSION_ERROR] decryption operation failed
```

Ensure that:
1. `NEXTAUTH_SECRET` is set and consistent between server restarts
2. `NEXTAUTH_URL` is correctly set to match your actual URL
3. Clear browser cookies and try again

### Database Connection Issues

If you see MongoDB connection errors:
1. Verify your MongoDB connection string in `DATABASE_URL`
2. Ensure your MongoDB instance is running
3. Check network connectivity to your MongoDB server

### Port Already in Use

If you see errors about the port being in use:
1. Kill existing Node.js processes: `taskkill /F /IM node.exe` (Windows) or `killall node` (Mac/Linux)
2. Specify a different port: `npx next dev -p 3001`

### Prisma Errors

If you encounter Prisma-related errors:
1. Run `npx prisma generate` to regenerate Prisma client
2. Run `npx prisma db push` to sync your database schema
3. Use the `SKIP_PRISMA_GENERATE=true` environment variable if necessary

### Cleaning Cache

If issues persist:
```bash
# Delete Next.js cache
rm -rf .next

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Running in Production Mode

To build and run in production mode:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/) 