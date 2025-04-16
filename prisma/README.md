# Prisma Configuration

This directory contains the Prisma schema and configuration files for the ewaahome application.

## Important Files

- `schema.prisma` - The main Prisma schema file defining the database models
- `generate-client.js` - A helper script to ensure Prisma client generation works during deployment
- `.gitignore` - Ensures the schema file is included in Git but generated files are excluded

## For Vercel Deployment

The Prisma schema is critical for deployment. During deployment:

1. The `vercel-deploy.js` script will ensure this directory exists
2. The `generate-client.js` script will create a minimal schema if needed
3. Prisma client will be generated based on the schema

## Troubleshooting

If you encounter database connection issues, check the DATABASE_URL environment variable.

## Commands

- Generate Prisma client: `npx prisma generate`
- Open Prisma Studio: `npx prisma studio` 