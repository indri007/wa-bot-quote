#!/bin/bash

# Script Deploy Bot WhatsApp ke VPS
# Usage: ./deploy-to-vps.sh your_vps_ip

if [ -z "$1" ]; then
    echo "❌ Error: VPS IP tidak diberikan"
    echo "Usage: ./deploy-to-vps.sh your_vps_ip"
    exit 1
fi

VPS_IP=$1
VPS_USER="root"
VPS_PATH="/home/bot-whatsapp"

echo "🚀 Deploying Bot WhatsApp ke VPS: $VPS_IP"
echo ""

# 1. Compress bot files
echo "📦 Compressing bot files..."
tar -czf bot-whatsapp.tar.gz \
    --exclude='node_modules' \
    --exclude='_IGNORE_bot-wa-saya' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='*.tar.gz' \
    .

# 2. Upload to VPS
echo "📤 Uploading to VPS..."
scp bot-whatsapp.tar.gz $VPS_USER@$VPS_IP:/tmp/

# 3. Setup on VPS
echo "⚙️  Setting up on VPS..."
ssh $VPS_USER@$VPS_IP << 'ENDSSH'
    # Create directory
    mkdir -p /home/bot-whatsapp
    cd /home/bot-whatsapp
    
    # Extract files
    tar -xzf /tmp/bot-whatsapp.tar.gz
    rm /tmp/bot-whatsapp.tar.gz
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    npm install --production
    
    # Create logs directory
    mkdir -p logs
    
    echo "✅ Setup complete!"
ENDSSH

# 4. Cleanup
rm bot-whatsapp.tar.gz

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. SSH ke VPS: ssh $VPS_USER@$VPS_IP"
echo "2. Edit .env: nano /home/bot-whatsapp/.env"
echo "3. Start bot: cd /home/bot-whatsapp && pm2 start ecosystem.config.js"
echo "4. View logs: pm2 logs wa-bot"
echo ""
