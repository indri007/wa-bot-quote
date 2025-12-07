#!/bin/bash

# Script untuk monitoring dan auto-restart bot
# Jalankan dengan: ./monitor-bot.sh

echo "🔍 Bot Monitoring Script Started"
echo "Checking bot status every 2 minutes..."
echo ""

while true; do
    # Cek status PM2
    STATUS=$(pm2 jlist | jq -r '.[] | select(.name=="wa-bot") | .pm2_env.status')
    
    if [ "$STATUS" != "online" ]; then
        echo "⚠️ Bot is $STATUS - Restarting..."
        pm2 restart wa-bot
        echo "✅ Bot restarted at $(date)"
    else
        echo "✅ Bot is online - $(date)"
    fi
    
    # Tunggu 2 menit
    sleep 120
done
