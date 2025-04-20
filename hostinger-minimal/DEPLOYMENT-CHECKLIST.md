# Eiwaa Home Deployment Checklist

## Pre-Deployment

- [ ] Verify MongoDB Atlas (or other MongoDB provider) account is set up
- [ ] Verify Cloudinary account is set up for image uploads
- [ ] Verify MapBox account is set up for location services
- [ ] Obtain VPS access credentials from Hostinger
- [ ] Prepare all environment variable values

## Hostinger VPS Setup

- [ ] Login to VPS using SSH
- [ ] Update system packages
- [ ] Install Node.js 18.x
- [ ] Install PM2
- [ ] Install Nginx
- [ ] Configure firewall (if needed)

## Application Deployment

- [ ] Upload application files to server
- [ ] Create and configure .env file with all required variables
- [ ] Install npm dependencies
- [ ] Build the application
- [ ] Start the application with PM2
- [ ] Set PM2 to start on system boot

## Nginx Configuration

- [ ] Create Nginx site configuration
- [ ] Test Nginx configuration
- [ ] Enable the site
- [ ] Restart Nginx

## Domain & SSL Setup

- [ ] Configure DNS settings for your domain in Hostinger panel
- [ ] Install Certbot for SSL
- [ ] Obtain and configure SSL certificate
- [ ] Test HTTPS access

## Post-Deployment Checks

- [ ] Verify the application is accessible via domain name
- [ ] Test user registration and login
- [ ] Test property listing creation
- [ ] Test reservation creation
- [ ] Test image uploads
- [ ] Test map functionality
- [ ] Verify mobile responsiveness

## Backup & Monitoring Setup

- [ ] Set up database backups
- [ ] Configure monitoring (PM2 monitoring or other tools)
- [ ] Set up log rotation

## Performance Optimization

- [ ] Test application response time
- [ ] Check for any console errors
- [ ] Verify Nginx caching is working properly
- [ ] Test application under load (if possible)

## Security Checks

- [ ] Ensure all endpoints are properly authenticated
- [ ] Verify rate limiting is in place
- [ ] Check for exposed environment variables
- [ ] Review SSL configuration
- [ ] Verify MongoDB access is restricted to necessary operations

## Documentation

- [ ] Document deployment process
- [ ] Document maintenance procedures
- [ ] Create troubleshooting guide

---

## Quick Reference Commands

### PM2 Commands
```
pm2 status                 # Check status of applications
pm2 logs ewaahome          # View application logs
pm2 restart ewaahome       # Restart application
pm2 stop ewaahome          # Stop application
pm2 delete ewaahome        # Remove application from PM2
pm2 monit                  # Monitor application
```

### Nginx Commands
```
sudo nano /etc/nginx/sites-available/ewaahome        # Edit configuration
sudo nginx -t                                        # Test configuration
sudo systemctl restart nginx                         # Restart Nginx
sudo systemctl status nginx                          # Check Nginx status
```

### SSL Commands
```
sudo certbot --nginx -d example.com                  # Set up SSL
sudo certbot renew --dry-run                         # Test certificate renewal
```

### MongoDB
```
mongosh "mongodb+srv://username:password@cluster.mongodb.net/database"  # Connect to MongoDB
``` 