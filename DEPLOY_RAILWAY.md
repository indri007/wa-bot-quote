# 🚀 Cara Deploy Bot ke Railway.app (GRATIS)

Bot akan jalan 24/7 tanpa perlu laptop nyala!

## 📋 Langkah-langkah:

### 1. Daftar Railway (Gratis)

1. Buka: https://railway.app/
2. Klik **"Start a New Project"** atau **"Login"**
3. Login dengan **GitHub** (pakai akun indri007)
4. Verifikasi email jika diminta

### 2. Deploy dari GitHub

1. Setelah login, klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository: **indri007/wa-bot-quote**
4. Pilih folder: **bot-wa** (jika ada pilihan)
5. Railway akan otomatis detect Dockerfile dan mulai build

### 3. Tunggu Build Selesai

- Railway akan install dependencies
- Build Docker image
- Deploy bot
- Proses 5-10 menit

### 4. Scan QR Code

**PENTING:** Bot perlu di-scan QR code sekali!

1. Klik project Anda di Railway
2. Klik tab **"Deployments"**
3. Klik deployment yang aktif
4. Klik **"View Logs"**
5. Tunggu sampai muncul QR code di logs
6. **Scan QR code dengan WhatsApp Anda**

**Catatan:** QR code akan muncul sebagai ASCII art di logs. Agak susah di-scan dari logs.

### 5. Alternatif: Scan QR Lokal Dulu

**Cara Lebih Mudah:**

1. Jalankan bot di laptop dulu:
   ```bash
   cd bot-wa
   npm start
   ```

2. Scan QR code yang muncul

3. Tunggu 5 menit sampai sesi tersimpan

4. Stop bot (Ctrl+C)

5. Copy file sesi ke GitHub:
   ```bash
   # JANGAN lakukan ini! File sesi RAHASIA!
   # Gunakan cara di bawah
   ```

**MASALAH:** File sesi tidak bisa di-upload ke GitHub (rahasia).

## 🔧 Solusi Terbaik:

### Gunakan Environment Variables untuk Sesi

Saya akan update bot untuk support sesi dari environment variable:

1. Jalankan bot lokal sekali
2. Scan QR code
3. Copy isi file `bot-wa-saya.data.json`
4. Paste ke Railway Environment Variables

**Atau lebih mudah:**

### Gunakan Railway CLI

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login:
   ```bash
   railway login
   ```

3. Link project:
   ```bash
   cd bot-wa
   railway link
   ```

4. Deploy:
   ```bash
   railway up
   ```

5. Lihat logs untuk QR code:
   ```bash
   railway logs
   ```

## ⚠️ Catatan Penting:

### Masalah QR Code di Server:

Bot perlu scan QR code, tapi di server tidak ada display. Solusi:

**Opsi A: Headless QR (Sudah ada di bot)**
- Bot akan save QR code sebagai file PNG
- Tapi di Railway susah akses file

**Opsi B: QR Code di Logs (Sudah ada)**
- QR muncul di logs sebagai ASCII
- Bisa di-scan tapi agak susah

**Opsi C: Scan Lokal + Upload Sesi (Recommended)**
- Scan QR di laptop
- Upload sesi ke Railway
- Bot langsung jalan

## 💰 Biaya:

- **Free Tier**: 500 jam/bulan (cukup untuk 1 bot 24/7)
- **Hobby Plan**: $5/bulan (unlimited)

## 🔄 Auto Restart:

Railway otomatis restart bot jika crash!

## 📊 Monitoring:

- Lihat logs: Railway Dashboard → Deployments → View Logs
- Cek status: Railway Dashboard → Project

## 🆘 Troubleshooting:

### Bot tidak jalan?
- Cek logs di Railway
- Pastikan Dockerfile benar
- Pastikan dependencies terinstall

### QR Code tidak muncul?
- Cek logs
- Tunggu beberapa menit
- Restart deployment

### Bot disconnect?
- Scan QR code lagi
- Atau upload sesi yang valid

## 🎯 Kesimpulan:

Railway bagus untuk bot 24/7, tapi ada challenge untuk scan QR code pertama kali. 

**Rekomendasi:**
1. Scan QR di laptop dulu
2. Biarkan bot jalan 5 menit
3. Kemudian deploy ke Railway dengan sesi yang sudah ada

Atau gunakan VPS yang lebih mudah untuk akses QR code!

---

Butuh bantuan? Tanya saja! 😊
