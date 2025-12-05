# 🚀 Deploy Bot WhatsApp ke VPS - Panduan Lengkap

## 📋 Persiapan

### 1. Kebutuhan VPS
- **OS**: Ubuntu 20.04 / 22.04 LTS
- **RAM**: Minimal 2GB (Recommended 4GB)
- **Storage**: Minimal 20GB
- **CPU**: 2 Core
- **Provider**: DigitalOcean, Vultr, Linode, AWS, dll

### 2. Software yang Dibutuhkan
- Node.js 20.x
- PM2 (Process Manager)
- Git
- Chromium (untuk WhatsApp Web)

---

## 🔧 LANGKAH 1: Setup VPS

### A. Login ke VPS
```bash
ssh root@your_vps_ip
```

### B. Update System
```bash
apt update && apt upgrade -y
```

### C. Install Node.js 20.x
```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verifikasi
node -v  # Harus v20.x.x
npm -v
```

### D. Install PM2
```bash
npm install -g pm2

# Setup PM2 startup
pm2 startup
# Ikuti instruksi yang muncul
```

### E. Install Dependencies untuk Chromium
```bash
apt install -y \
    chromium-browser \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libgbm1 \
    libxshmfence1
```

---

## 📦 LANGKAH 2: Upload Bot ke VPS

### Opsi A: Menggunakan Git (Recommended)

#### 1. Push ke GitHub (dari komputer lokal)
```bash
# Di komputer lokal
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/bot-whatsapp.git
git push -u origin main
```

#### 2. Clone di VPS
```bash
# Di VPS
cd /home
git clone https://github.com/username/bot-whatsapp.git
cd bot-whatsapp
```

### Opsi B: Menggunakan SCP (Upload Manual)

```bash
# Di komputer lokal
# Compress folder
tar -czf bot-whatsapp.tar.gz .

# Upload ke VPS
scp bot-whatsapp.tar.gz root@your_vps_ip:/home/

# Di VPS
cd /home
tar -xzf bot-whatsapp.tar.gz
cd bot-whatsapp
```

### Opsi C: Menggunakan FTP/SFTP
- Gunakan FileZilla atau WinSCP
- Upload semua file ke `/home/bot-whatsapp`

---

## ⚙️ LANGKAH 3: Setup Environment

### 1. Install Dependencies
```bash
cd /home/bot-whatsapp
npm install
```

### 2. Setup Environment Variables
```bash
nano .env
```

Isi dengan:
```env
# Gemini API Key
GEMINI_API_KEY=AIzaSyCaq1aKirCU_OU3tr-60BWRotT81zSo8vk

# Google Drive (Optional)
GOOGLE_CREDENTIALS=
GOOGLE_TOKEN=

# API Keys (Optional)
NEWS_API_KEY=05f96aa3312e44b0a8d7807e12733e5c
FOOTBALL_API_KEY=692831933e644d3eb42f80e62856fe67
OMDB_API_KEY=b1a7b542
NUTRITION_API_KEY=flCk9ITCjlM5UgJNOGvrIw==htM5mkHmOb34IzBA
```

Simpan: `Ctrl + X`, `Y`, `Enter`

### 3. Update ecosystem.config.js
```bash
nano ecosystem.config.js
```

Pastikan isinya:
```javascript
module.exports = {
  apps: [{
    name: 'wa-bot',
    script: 'bot.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: 'true',
      PUPPETEER_EXECUTABLE_PATH: '/usr/bin/chromium-browser'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
```

### 4. Buat Folder Logs
```bash
mkdir -p logs
```

---

## 🚀 LANGKAH 4: Jalankan Bot

### 1. Start Bot dengan PM2
```bash
pm2 start ecosystem.config.js
```

### 2. Lihat Status
```bash
pm2 status
```

### 3. Lihat Logs
```bash
# Real-time logs
pm2 logs wa-bot

# Atau
pm2 logs wa-bot --lines 100
```

### 4. Scan QR Code

Bot akan generate QR code. Ada 2 cara untuk scan:

#### Cara A: Lihat QR di Terminal
```bash
pm2 logs wa-bot
```
QR code akan muncul di logs (jika terminal support)

#### Cara B: Download QR Code Image
```bash
# Lihat file QR yang di-generate
ls -la qr_code_*.png

# Download ke komputer lokal
# Di komputer lokal:
scp root@your_vps_ip:/home/bot-whatsapp/qr_code_bot-wa-saya.png ./
```

Lalu buka file `qr_code_bot-wa-saya.png` dan scan dengan WhatsApp

### 5. Save PM2 Configuration
```bash
pm2 save
```

---

## 🔄 LANGKAH 5: Management Bot

### Restart Bot
```bash
pm2 restart wa-bot
```

### Stop Bot
```bash
pm2 stop wa-bot
```

### Delete Bot dari PM2
```bash
pm2 delete wa-bot
```

### Monitoring
```bash
# Dashboard
pm2 monit

# Status
pm2 status

# Logs
pm2 logs wa-bot

# Flush logs
pm2 flush
```

---

## 🔒 LANGKAH 6: Security (Optional tapi Recommended)

### 1. Setup Firewall
```bash
# Install UFW
apt install -y ufw

# Allow SSH
ufw allow 22/tcp

# Enable firewall
ufw enable

# Check status
ufw status
```

### 2. Buat User Non-Root (Recommended)
```bash
# Buat user baru
adduser botuser

# Tambahkan ke sudo group
usermod -aG sudo botuser

# Pindahkan bot ke user folder
mv /home/bot-whatsapp /home/botuser/
chown -R botuser:botuser /home/botuser/bot-whatsapp

# Login sebagai user baru
su - botuser
cd /home/botuser/bot-whatsapp
```

### 3. Setup Auto-Update (Optional)
```bash
# Buat script update
nano /home/bot-whatsapp/update.sh
```

Isi:
```bash
#!/bin/bash
cd /home/bot-whatsapp
git pull
npm install
pm2 restart wa-bot
```

Buat executable:
```bash
chmod +x update.sh
```

---

## 🐛 TROUBLESHOOTING

### Bot Tidak Start
```bash
# Cek logs
pm2 logs wa-bot --lines 50

# Cek error
cat logs/err.log

# Test manual
node bot.js
```

### Chromium Error
```bash
# Install ulang dependencies
apt install -y chromium-browser

# Set path di ecosystem.config.js
PUPPETEER_EXECUTABLE_PATH: '/usr/bin/chromium-browser'
```

### Memory Error
```bash
# Increase memory limit
pm2 delete wa-bot
# Edit ecosystem.config.js, ubah max_memory_restart: '2G'
pm2 start ecosystem.config.js
```

### QR Code Tidak Muncul
```bash
# Cek file QR
ls -la qr_code_*.png

# Atau lihat di logs
pm2 logs wa-bot | grep QR
```

### Bot Crash Terus
```bash
# Cek logs
pm2 logs wa-bot --err

# Restart dengan clean state
pm2 delete wa-bot
rm -rf _IGNORE_bot-wa-saya
pm2 start ecosystem.config.js
```

---

## 📊 MONITORING & MAINTENANCE

### 1. Setup PM2 Web Dashboard (Optional)
```bash
pm2 install pm2-server-monit
```

### 2. Cek Resource Usage
```bash
# CPU & Memory
htop

# Disk space
df -h

# PM2 monitoring
pm2 monit
```

### 3. Backup Session
```bash
# Backup folder session
tar -czf session-backup.tar.gz _IGNORE_bot-wa-saya/

# Download ke lokal
scp root@your_vps_ip:/home/bot-whatsapp/session-backup.tar.gz ./
```

### 4. Auto-Restart Jika Crash
PM2 sudah handle ini otomatis dengan `autorestart: true`

---

## 🎯 CHECKLIST DEPLOYMENT

- [ ] VPS sudah setup (Ubuntu 20.04+)
- [ ] Node.js 20.x terinstall
- [ ] PM2 terinstall
- [ ] Chromium dependencies terinstall
- [ ] Bot code sudah di upload
- [ ] npm install berhasil
- [ ] .env sudah diisi (minimal GEMINI_API_KEY)
- [ ] ecosystem.config.js sudah dikonfigurasi
- [ ] Bot berhasil start dengan PM2
- [ ] QR Code sudah di-scan
- [ ] Bot merespon pesan di WhatsApp
- [ ] PM2 save sudah dijalankan
- [ ] Firewall sudah dikonfigurasi (optional)

---

## 📞 TESTING

Setelah bot running, test dengan command:

```
menu
ping
saham AAPL
analisa TSLA
crypto bitcoin
qr https://google.com
```

---

## 🔄 UPDATE BOT

Jika ada update code:

```bash
cd /home/bot-whatsapp
git pull  # Jika pakai git
npm install  # Jika ada dependency baru
pm2 restart wa-bot
```

---

## 💡 TIPS

1. **Gunakan screen/tmux** untuk session yang persistent
2. **Setup monitoring** dengan PM2 Plus (gratis untuk 1 server)
3. **Backup session** secara berkala
4. **Monitor logs** untuk detect error early
5. **Update dependencies** secara berkala: `npm update`

---

## 🎉 SELESAI!

Bot WhatsApp Anda sekarang running 24/7 di VPS!

Untuk support: Lihat logs dengan `pm2 logs wa-bot`
