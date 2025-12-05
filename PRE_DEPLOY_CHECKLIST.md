# ✅ Pre-Deploy Checklist

Pastikan semua ini sudah OK sebelum deploy ke VPS:

## 📦 Files

- [x] `bot.js` - Main bot file
- [x] `package.json` - Dependencies
- [x] `ecosystem.config.js` - PM2 config
- [x] `.env.example` - Environment template
- [x] `.gitignore` - Git ignore file
- [x] `stock-analysis.js` - Stock analysis module
- [x] `check-book.js` - Google Drive module
- [x] `google-auth.js` - Google auth helper

## ⚙️ Configuration

- [x] `ecosystem.config.js` - PUPPETEER_EXECUTABLE_PATH set to `/usr/bin/chromium-browser`
- [x] `.env` - API keys configured (minimal GEMINI_API_KEY)
- [x] `package.json` - All dependencies listed

## 🔑 API Keys (Minimal)

- [x] **GEMINI_API_KEY** - WAJIB untuk analisis saham AI
- [ ] NEWS_API_KEY - Optional (untuk fitur berita)
- [ ] FOOTBALL_API_KEY - Optional (untuk klasemen bola)
- [ ] OMDB_API_KEY - Optional (untuk info film)
- [ ] NUTRITION_API_KEY - Optional (untuk nutrisi makanan)

## 🧪 Testing Lokal

- [x] Bot bisa start: `node bot.js`
- [x] QR code muncul
- [x] Bot bisa scan dan connect
- [x] Command `menu` berfungsi
- [x] Command `ping` berfungsi
- [x] Command `saham AAPL` berfungsi
- [x] Command `analisa TSLA` berfungsi (dengan Gemini AI)

## 📋 VPS Requirements

- [ ] VPS sudah ready (Ubuntu 20.04+)
- [ ] Punya akses SSH (root atau sudo user)
- [ ] RAM minimal 2GB (recommended 4GB)
- [ ] Storage minimal 20GB
- [ ] IP address VPS sudah dicatat

## 🚀 Ready to Deploy?

Jika semua checklist di atas sudah ✅, Anda siap deploy!

### Langkah Selanjutnya:

1. Baca: `QUICK_DEPLOY_VPS.md` (untuk deploy cepat)
2. Atau: `DEPLOY_VPS_LENGKAP.md` (untuk panduan detail)
3. Gunakan: `deploy-to-vps.sh YOUR_VPS_IP` (untuk auto deploy)

---

## 📝 Notes

### File yang TIDAK perlu di-upload ke VPS:
- `node_modules/` (akan di-install di VPS)
- `_IGNORE_bot-wa-saya/` (session WhatsApp, akan dibuat baru)
- `.git/` (optional, tergantung metode deploy)
- `*.log` (log files)
- `qr_code_*.png` (QR code images)

### File yang WAJIB di-upload:
- `bot.js`
- `package.json`
- `ecosystem.config.js`
- `.env` (atau buat manual di VPS)
- `stock-analysis.js`
- `check-book.js`
- `google-auth.js`
- Semua file `.md` (dokumentasi)

---

## 🎯 Deployment Methods

### Method 1: Git (Recommended untuk update berkala)
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main

# Di VPS
git clone https://github.com/username/repo.git
```

### Method 2: SCP (Recommended untuk one-time deploy)
```bash
./deploy-to-vps.sh YOUR_VPS_IP
```

### Method 3: FTP/SFTP (Untuk yang suka GUI)
- Gunakan FileZilla atau WinSCP
- Upload semua file ke `/home/bot-whatsapp`

---

## ✅ Post-Deploy Checklist

Setelah deploy ke VPS:

- [ ] Bot berhasil start dengan PM2
- [ ] QR code berhasil di-scan
- [ ] Bot merespon command `menu`
- [ ] Bot merespon command `ping`
- [ ] Analisis saham berfungsi (`analisa AAPL`)
- [ ] PM2 save sudah dijalankan
- [ ] Bot auto-restart jika crash
- [ ] Logs bisa diakses (`pm2 logs wa-bot`)

---

## 🎉 All Done!

Jika semua checklist sudah ✅, bot Anda siap production! 🚀
