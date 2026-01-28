#!/bin/bash

# WhatsApp Bot Deployment Script for VPS
echo "🚀 Starting WhatsApp Bot deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js (if not installed)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 globally (if not installed)
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Set proper permissions for session directories
echo "🔐 Setting permissions for session storage..."
chmod -R 755 ./baileys-auth 2>/dev/null || true
chmod -R 755 ./wa-session 2>/dev/null || true

# Stop existing PM2 process (if running)
echo "⏹️ Stopping existing bot process..."
pm2 stop wa-bot-baileys 2>/dev/null || true
pm2 delete wa-bot-baileys 2>/dev/null || true

# Start bot with PM2
echo "🚀 Starting bot with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
echo "🔄 Setting up PM2 auto-startup..."
pm2 startup | tail -1 | sudo bash

# Show status
echo "📊 Bot status:"
pm2 status

echo "✅ Deployment completed!"
echo ""
echo "📋 Useful commands:"
echo "  pm2 status          - Check bot status"
echo "  pm2 logs wa-bot-baileys - View bot logs"
echo "  pm2 restart wa-bot-baileys - Restart bot"
echo "  pm2 stop wa-bot-baileys - Stop bot"
echo ""
echo "🔗 Bot will auto-restart on system reboot"
echo "📱 Bot will show QR code - scan with WhatsApp"