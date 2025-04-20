# Deployment Checklist

This document outlines the key steps and verifications needed before and during deployment of the Airbnb clone application.

## Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint` to check for any linting errors
- [ ] Run `npm run test` if tests are set up
- [ ] Run `node test-deploy.js` to perform automated checks
- [ ] Manually verify key components handle undefined values gracefully

### Database
- [ ] Verify database connection string is valid
- [ ] Ensure all required schema migrations are prepared
- [ ] Back up production database before deployment (if applicable)

### Environment Variables
- [ ] Check all required environment variables are set up:
  - [ ] `DATABASE_URL`
  - [ ] `NEXTAUTH_SECRET`
  - [ ] `NEXTAUTH_URL`
  - [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  - [ ] `GITHUB_ID`
  - [ ] `GITHUB_SECRET`
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`

### Authentication
- [ ] Verify OAuth providers are correctly configured
- [ ] Test login functionality with each provider
- [ ] Ensure authentication redirects work as expected

### Performance
- [ ] Run Lighthouse audit to check performance scores
- [ ] Verify images are properly optimized with Next.js Image
- [ ] Check for any client-side performance bottlenecks

### Security
- [ ] Ensure no sensitive data is exposed in client-side code
- [ ] Verify API routes have proper authorization
- [ ] Check that user data is properly validated

## Deployment Process

1. Run the deployment script: `node deploy.js`
2. When prompted, confirm deployment to Vercel
3. Monitor the deployment process for any errors
4. After deployment completes, perform post-deployment checks

## Post-Deployment Checklist

- [ ] Visit the deployed site and verify it loads correctly
- [ ] Test user authentication flows
- [ ] Verify search functionality works properly
- [ ] Test creating a new listing
- [ ] Test booking functionality
- [ ] Verify map displays correctly with proper location data
- [ ] Check responsiveness on mobile devices
- [ ] Ensure favorites functionality works

## Rollback Procedure

If critical issues are found after deployment:

1. Log in to Vercel dashboard
2. Select the project
3. Go to "Deployments" tab
4. Find the previous working deployment
5. Click the three dots menu (⋮) and select "Promote to Production"

## Deployment History

| Date | Version | Deployed By | Notes |
|------|---------|-------------|-------|
|      |         |             |       |
|      |         |             |       |
|      |         |             |       | 