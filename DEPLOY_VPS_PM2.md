# 🚀 Deploy Bot WhatsApp ke VPS dengan PM2

## 📋 Informasi VPS

- **IP:** 103.181.182.206
- **User:** root
- **Password:** K@artikasari1
- **Folder:** wa-bot-quote
- **PM2 App:** wa-bot

---

## 🔧 Setup Awal (Sekali Saja)

### 1. Login ke VPS

```bash
ssh root@103.181.182.206
# Password: K@artikasari1
```

### 2. Install Dependencies (Jika Belum)

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Chromium dan dependencies
apt install -y chromium libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libasound2 libpangocairo-1.0-0 libxss1 libgtk-3-0

# Verify installations
node --version  # Should be v20.x
pm2 --version
chromium --version
```

### 3. Clone/Upload Project

**Opsi A: Git Clone**
```bash
cd ~
git clone https://github.com/username/bot-whatsapp.git wa-bot-quote
cd wa-bot-quote
```

**Opsi B: Upload Manual (via SFTP/SCP)**
```bash
# Di komputer lokal
scp -r ./bot-wa root@103.181.182.206:~/wa-bot-quote
```

### 4. Install Dependencies

```bash
cd ~/wa-bot-quote
npm install
```

### 5. Setup PM2 Ecosystem

Buat file `ecosystem.config.js`:

```bash
nano ecosystem.config.js
```

Isi dengan:

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
      PUPPETEER_EXECUTABLE_PATH: '/usr/bin/chromium',
      NEWS_API_KEY: '05f96aa3312e44b0a8d7807e12733e5c',
      FOOTBALL_API_KEY: '692831933e644d3eb42f80e62856fe67',
      OMDB_API_KEY: 'b1a7b542',
      NUTRITION_API_KEY: 'flCk9ITCjlM5UgJNOGvrIw==htM5mkHmOb34IzBA'
    }
  }]
}
```

Save: `Ctrl+X`, `Y`, `Enter`

### 6. Start Bot Pertama Kali

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 7. Scan QR Code

```bash
pm2 logs wa-bot
```

Tunggu QR code muncul, lalu scan dengan WhatsApp.

---

## 🔄 Update Bot (Setiap Ada Perubahan)

### Langkah Lengkap:

```bash
# 1. Login ke VPS
ssh root@103.181.182.206

# 2. Masuk ke folder
cd wa-bot-quote

# 3. Stop bot
pm2 stop wa-bot

# 4. Hapus session lama (jika perlu reset QR)
rm -rf _IGNORE_bot-wa-saya

# 5. Pull update dari Git (jika pakai Git)
git pull origin main

# Atau upload file baru via SCP (jika manual)

# 6. Install dependencies baru (jika ada)
npm install

# 7. Start bot
pm2 start wa-bot

# 8. Scan QR Code (jika session dihapus)
pm2 logs wa-bot
```

### Quick Update (Tanpa Reset Session):

```bash
ssh root@103.181.182.206
cd wa-bot-quote
pm2 stop wa-bot
git pull origin main
npm install
pm2 start wa-bot
pm2 logs wa-bot
```

---

## 📊 Monitoring

### Cek Status Bot

```bash
# Status semua apps
pm2 status

# Logs real-time
pm2 logs wa-bot

# Logs 100 baris terakhir
pm2 logs wa-bot --lines 100

# Monitor CPU/Memory
pm2 monit
```

### Cek Bot Running

```bash
# Cek process
pm2 list

# Cek logs untuk error
pm2 logs wa-bot --err

# Restart jika error
pm2 restart wa-bot
```

---

## 🛠️ Troubleshooting

### Bot Tidak Start

```bash
# Cek logs
pm2 logs wa-bot --lines 50

# Cek error
pm2 logs wa-bot --err

# Restart
pm2 restart wa-bot

# Jika masih error, delete dan start ulang
pm2 delete wa-bot
pm2 start ecosystem.config.js
```

### QR Code Tidak Muncul

```bash
# Hapus session lama
rm -rf _IGNORE_bot-wa-saya

# Restart bot
pm2 restart wa-bot

# Lihat logs
pm2 logs wa-bot
```

### Chromium Error

```bash
# Install ulang Chromium
apt install --reinstall chromium

# Cek path Chromium
which chromium

# Update environment variable jika perlu
pm2 set wa-bot:PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium
pm2 restart wa-bot
```

### Memory Leak

```bash
# Restart bot
pm2 restart wa-bot

# Atau set auto restart on memory limit
pm2 delete wa-bot
# Edit ecosystem.config.js, set max_memory_restart: '500M'
pm2 start ecosystem.config.js
```

---

## 🔒 Security

### Firewall

```bash
# Allow SSH
ufw allow 22

# Enable firewall
ufw enable

# Check status
ufw status
```

### Update System

```bash
# Update packages
apt update && apt upgrade -y

# Reboot jika perlu
reboot
```

### Backup Session

```bash
# Backup session folder
tar -czf session-backup-$(date +%Y%m%d).tar.gz _IGNORE_bot-wa-saya

# Download ke lokal
scp root@103.181.182.206:~/wa-bot-quote/session-backup-*.tar.gz ./
```

---

## 📝 PM2 Commands Cheat Sheet

```bash
# Start
pm2 start bot.js --name wa-bot
pm2 start ecosystem.config.js

# Stop
pm2 stop wa-bot
pm2 stop all

# Restart
pm2 restart wa-bot
pm2 restart all

# Delete
pm2 delete wa-bot
pm2 delete all

# Logs
pm2 logs wa-bot
pm2 logs wa-bot --lines 100
pm2 logs wa-bot --err

# Status
pm2 status
pm2 list
pm2 monit

# Save & Startup
pm2 save
pm2 startup
pm2 unstartup

# Update PM2
pm2 update
```

---

## 🔄 Auto Deploy dengan Git

### Setup Git Hook (Advanced)

```bash
# Di VPS
cd ~/wa-bot-quote
nano deploy.sh
```

Isi:

```bash
#!/bin/bash
cd ~/wa-bot-quote
git pull origin main
npm install
pm2 restart wa-bot
echo "✅ Deploy complete!"
```

```bash
chmod +x deploy.sh
```

### Deploy dari Lokal

```bash
# Push ke Git
git push origin main

# SSH dan deploy
ssh root@103.181.182.206 'cd wa-bot-quote && ./deploy.sh'
```

---

## 📋 Checklist Deployment

### Setup Awal:
- [ ] Login ke VPS
- [ ] Install Node.js 20
- [ ] Install PM2
- [ ] Install Chromium
- [ ] Clone/Upload project
- [ ] npm install
- [ ] Buat ecosystem.config.js
- [ ] pm2 start
- [ ] Scan QR code
- [ ] pm2 save
- [ ] pm2 startup

### Update Bot:
- [ ] Login ke VPS
- [ ] cd wa-bot-quote
- [ ] pm2 stop wa-bot
- [ ] git pull / upload file
- [ ] npm install
- [ ] pm2 start wa-bot
- [ ] Cek logs

---

## 🎯 Tips

1. **Jangan hapus session** kecuali perlu reset QR
2. **Backup session** secara berkala
3. **Monitor logs** untuk detect error
4. **Set memory limit** untuk prevent crash
5. **Use Git** untuk easy update
6. **Enable firewall** untuk security
7. **Update system** secara berkala

---

## 🆘 Emergency

### Bot Crash

```bash
pm2 restart wa-bot
pm2 logs wa-bot
```

### VPS Restart

```bash
# PM2 akan auto-start jika sudah setup startup
pm2 status

# Jika tidak, start manual
pm2 resurrect
```

### Lost Session

```bash
# Restore dari backup
tar -xzf session-backup-YYYYMMDD.tar.gz

# Atau scan QR ulang
rm -rf _IGNORE_bot-wa-saya
pm2 restart wa-bot
pm2 logs wa-bot
```

---

## 📞 Support

- **VPS Issues:** Contact hosting provider
- **Bot Issues:** Check logs dengan `pm2 logs wa-bot`
- **WhatsApp Issues:** Scan QR ulang

---

Selamat deploy! 🚀
