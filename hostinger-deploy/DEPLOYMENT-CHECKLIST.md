# Next.js Deployment Checklist

## Before Uploading to Server

- [ ] Update .env.production with your actual domain (replace 'yourdomain.com')
- [ ] Update NEXTAUTH_URL and NEXT_PUBLIC_BASE_URL with your domain
- [ ] Ensure MongoDB connection string is correct
- [ ] Update nginx.conf with your domain name

## After Uploading to Server

- [ ] Install Node.js (v18+) and npm
- [ ] Install PM2 globally (npm install -g pm2)
- [ ] Run 'npm install --production'
- [ ] Set up Nginx configuration
- [ ] Configure SSL certificate with Let's Encrypt
- [ ] Start the application with PM2
- [ ] Set up PM2 to start on boot

