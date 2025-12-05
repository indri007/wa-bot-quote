#!/bin/bash

# Script untuk deploy/update bot di VPS

echo "🚀 Deploying Bot WhatsApp..."
echo ""

# Stop bot
echo "⏸️  Stopping bot..."
pm2 stop wa-bot

# Pull latest code (jika pakai Git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest code..."
    git pull origin main
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Start bot
echo "▶️  Starting bot..."
pm2 start wa-bot

# Show logs
echo ""
echo "✅ Deploy complete!"
echo ""
echo "📋 Checking logs..."
sleep 2
pm2 logs wa-bot --lines 20
