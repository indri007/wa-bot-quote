# 🚀 Deploy Bot dengan whatsapp-web.js ke VPS

## ✅ Keuntungan whatsapp-web.js:
- Lebih stabil dan reliable
- QR code lebih mudah di-scan
- Session management lebih baik
- Tidak perlu chromium path yang rumit

---

## 📦 STEP 1: Install Dependencies Baru

**Di komputer lokal:**

```bash
# Install dependencies baru
npm install

# Atau manual
npm install whatsapp-web.js qrcode-terminal
```

---

## 🗑️ STEP 2: Hapus Session Lama di VPS

**SSH ke VPS:**

```bash
ssh root@103.181.182.206
# Password: K@artikasari13

# Masuk ke folder bot
cd /root/bot-whatsapp-ai

# Stop bot lama
pm2 stop wa-bot
pm2 delete wa-bot

# Hapus session lama
rm -rf _IGNORE_bot-wa-saya
rm -rf .node-persist
rm -rf *.data.json

# Hapus node_modules lama
rm -rf node_modules
```

---

## 📤 STEP 3: Upload Bot Baru ke VPS

**Di komputer lokal:**

```bash
# Compress bot baru
tar -czf bot-new.tar.gz \
    --exclude='node_modules' \
    --exclude='_IGNORE_bot-wa-saya' \
    --exclude='wa-session' \
    --exclude='.git' \
    bot-new.js package.json ecosystem.config.js .env stock-analysis.js check-book.js google-auth.js

# Upload ke VPS
scp bot-new.tar.gz root@103.181.182.206:/root/bot-whatsapp-ai/
```

---

## ⚙️ STEP 4: Setup di VPS

**Di VPS:**

```bash
cd /root/bot-whatsapp-ai

# Extract
tar -xzf bot-new.tar.gz
rm bot-new.tar.gz

# Install dependencies
npm install

# Pastikan .env ada
cat .env
# Harus ada GEMINI_API_KEY
```

---

## 🚀 STEP 5: Start Bot Baru

```bash
# Start dengan PM2
pm2 start ecosystem.config.js

# Lihat logs untuk QR code
pm2 logs wa-bot
```

**QR Code akan muncul di terminal!**

---

## 📱 STEP 6: Scan QR Code

Ada 2 cara:

### **Cara 1: Lihat QR di Terminal (Recommended)**

QR code akan muncul langsung di terminal SSH. Scan dengan WhatsApp!

### **Cara 2: Screenshot Terminal**

1. Screenshot terminal yang menampilkan QR
2. Scan dari screenshot

---

## ✅ STEP 7: Verify Bot Running

```bash
# Cek status
pm2 status

# Harus: online

# Save configuration
pm2 save
```

---

## 🧪 STEP 8: Test Bot

Kirim pesan ke bot:

```
ping
menu
analisa AAPL
```

---

## 📊 Monitoring

```bash
# Lihat logs
pm2 logs wa-bot

# Monitoring
pm2 monit

# Restart jika perlu
pm2 restart wa-bot
```

---

## 🔧 Troubleshooting

### QR tidak muncul?
```bash
pm2 logs wa-bot --lines 50
```

### Bot crash?
```bash
pm2 logs wa-bot --err
pm2 restart wa-bot
```

### Session error?
```bash
cd /root/bot-whatsapp-ai
rm -rf wa-session
pm2 restart wa-bot
```

---

## ✅ Selesai!

Bot sekarang menggunakan whatsapp-web.js yang lebih stabil!
