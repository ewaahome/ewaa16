#!/bin/bash

# Next.js Deployment Setup Script for Hostinger VPS
# This script helps set up your Next.js application on a Hostinger VPS
# Make this file executable: chmod +x setup.sh

echo "🚀 Setting up Next.js application on Hostinger VPS..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "⚠️ Please run as root or with sudo privileges"
  exit 1
fi

# Install Node.js and npm if not already installed
if ! command -v node &> /dev/null; then
  echo "📦 Installing Node.js and npm..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt-get install -y nodejs
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

# Install PM2 globally
echo "📦 Installing PM2 process manager..."
npm install -g pm2

# Install nginx if not already installed
if ! command -v nginx &> /dev/null; then
  echo "📦 Installing Nginx..."
  apt-get update
  apt-get install -y nginx
fi

# Enable and start Nginx
echo "🔄 Enabling and starting Nginx..."
systemctl enable nginx
systemctl start nginx

# Set up application directory
APP_DIR="/var/www/yourdomain.com"
echo "📁 Setting up application directory at: $APP_DIR"

# Create directory if it doesn't exist
mkdir -p $APP_DIR

# Copy Nginx configuration
echo "🔧 Setting up Nginx configuration..."
cp nginx.conf /etc/nginx/sites-available/yourdomain.com

# Create symbolic link to enable the site
ln -sf /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/

# Modify Nginx configuration with the correct domain name
echo "🔄 Please enter your domain name (without www): "
read DOMAIN_NAME

if [ -n "$DOMAIN_NAME" ]; then
  echo "📝 Updating Nginx configuration with domain: $DOMAIN_NAME"
  sed -i "s/yourdomain\.com/$DOMAIN_NAME/g" /etc/nginx/sites-available/$DOMAIN_NAME
  
  # Update application directory
  APP_DIR="/var/www/$DOMAIN_NAME"
  mkdir -p $APP_DIR
  
  echo "📁 Application directory updated to: $APP_DIR"
else
  echo "⚠️ No domain name provided, using default configuration"
fi

# Copy application files
echo "📂 Copying application files to $APP_DIR..."
cp -r .next public package.json $APP_DIR/

# Install production dependencies
echo "📦 Installing production dependencies..."
cd $APP_DIR
npm install --production

# Set up environment variables
echo "🔐 Setting up environment variables..."
if [ -f .env.production ]; then
  cp .env.production $APP_DIR/.env
else
  echo "⚠️ No .env.production file found. You'll need to set up environment variables manually."
fi

# Start the application with PM2
echo "🚀 Starting the application with PM2..."
cd $APP_DIR
pm2 start npm --name "next-app" -- start

# Save PM2 process list
pm2 save

# Set up PM2 to start on boot
pm2 startup

# Restart Nginx
echo "🔄 Restarting Nginx..."
systemctl restart nginx

echo "
✅ Setup complete!

Your Next.js application should now be running at: http://$DOMAIN_NAME

Next steps:
1. Set up SSL with Let's Encrypt:
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME

2. Set up a firewall:
   sudo ufw allow 'Nginx Full'
   sudo ufw allow ssh
   sudo ufw enable

3. Check your application status:
   pm2 status

4. View logs:
   pm2 logs next-app
" 