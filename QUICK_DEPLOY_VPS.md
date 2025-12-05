# 🚀 Quick Deploy ke VPS - 5 Menit

## Cara Tercepat Deploy Bot ke VPS

### 1️⃣ Persiapan VPS (Sekali saja)

SSH ke VPS dan jalankan:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Chromium dependencies
apt install -y chromium-browser ca-certificates fonts-liberation \
    libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 \
    libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils \
    libgbm1 libxshmfence1

# Setup PM2 startup
pm2 startup
# Jalankan command yang muncul
```

---

### 2️⃣ Upload Bot ke VPS

**Opsi A: Menggunakan Script (Recommended)**

Di komputer lokal:
```bash
chmod +x deploy-to-vps.sh
./deploy-to-vps.sh YOUR_VPS_IP
```

**Opsi B: Manual dengan SCP**

Di komputer lokal:
```bash
# Compress
tar -czf bot.tar.gz --exclude='node_modules' --exclude='_IGNORE_bot-wa-saya' .

# Upload
scp bot.tar.gz root@YOUR_VPS_IP:/home/

# SSH ke VPS
ssh root@YOUR_VPS_IP

# Extract
cd /home
tar -xzf bot.tar.gz
mv bot-whatsapp /home/bot-whatsapp
cd /home/bot-whatsapp
```

---

### 3️⃣ Setup di VPS

```bash
cd /home/bot-whatsapp

# Install dependencies
npm install

# Setup .env
nano .env
```

Isi minimal:
```env
GEMINI_API_KEY=AIzaSyCaq1aKirCU_OU3tr-60BWRotT81zSo8vk
```

Simpan: `Ctrl+X`, `Y`, `Enter`

---

### 4️⃣ Jalankan Bot

```bash
# Start dengan PM2
pm2 start ecosystem.config.js

# Lihat logs untuk QR code
pm2 logs wa-bot
```

---

### 5️⃣ Scan QR Code

**Cara 1: Lihat di logs**
```bash
pm2 logs wa-bot
```

**Cara 2: Download QR image**
```bash
# Di komputer lokal
scp root@YOUR_VPS_IP:/home/bot-whatsapp/qr_code_bot-wa-saya.png ./
```

Scan dengan WhatsApp!

---

### 6️⃣ Save Configuration

```bash
pm2 save
```

---

## ✅ SELESAI!

Bot sekarang running 24/7 di VPS!

### Command Penting:

```bash
pm2 status          # Lihat status
pm2 logs wa-bot     # Lihat logs
pm2 restart wa-bot  # Restart bot
pm2 stop wa-bot     # Stop bot
pm2 monit           # Monitoring
```

---

## 🔄 Update Bot

Jika ada perubahan code:

```bash
# Upload file baru
scp bot.js root@YOUR_VPS_IP:/home/bot-whatsapp/

# Restart
ssh root@YOUR_VPS_IP "cd /home/bot-whatsapp && pm2 restart wa-bot"
```

---

## 🐛 Troubleshooting

### Bot tidak start?
```bash
pm2 logs wa-bot --lines 50
```

### Chromium error?
```bash
apt install -y chromium-browser
pm2 restart wa-bot
```

### Memory error?
Edit `ecosystem.config.js`, ubah `max_memory_restart: '2G'`

---

## 📞 Test Bot

Kirim pesan ke bot:
```
menu
ping
saham AAPL
analisa TSLA
```

Jika bot balas, berarti berhasil! 🎉
