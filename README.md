# 🤖 Bot WhatsApp Multi-Fitur

Bot WhatsApp otomatis dengan 10+ fitur lengkap menggunakan Node.js dan @open-wa/wa-automate.

## ✨ Fitur

- 📈 **Saham** - Cek harga saham real-time (Yahoo Finance)
- 💰 **Crypto** - Harga cryptocurrency (CoinGecko)
- ⚽ **Football** - Klasemen liga sepakbola
- 💪 **Kesehatan** - BMI calculator, kalori, nutrisi
- 📚 **Cek Buku** - Cek stok buku di Google Drive
- 🎬 **Film** - Info film dari OMDB
- 📰 **Berita** - Berita terkini dari NewsAPI
- 📱 **QR Code** - Generate QR code
- 📖 **Wikipedia** - Cari info di Wikipedia
- 💱 **Kurs** - Konversi mata uang (coming soon)

## 🚀 Quick Start

### Lokal

```bash
# Install dependencies
npm install

# Jalankan bot
node bot.js

# Scan QR code dengan WhatsApp
```

### Deploy ke Coolify

**Opsi 1: Nixpacks (Recommended)**

```bash
# Push ke Git
git push origin main

# Deploy di Coolify dengan Nixpacks
# Lihat: DEPLOY_NIXPACKS.md
```

**Opsi 2: Docker**

```bash
# Test Docker lokal
.\test-docker.ps1  # Windows
./test-docker.sh   # Linux/Mac

# Push ke Git
git push origin main

# Deploy di Coolify dengan Dockerfile
# Lihat: QUICK_START_DEPLOY.md
```

## 📋 Requirements

- Node.js 18+
- npm atau yarn
- WhatsApp account
- (Optional) Google Drive API untuk fitur cek buku

## 🔧 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Konfigurasi API Keys

Copy `.env.example` ke `.env` dan isi API keys:

```env
NEWS_API_KEY=your_key_here
FOOTBALL_API_KEY=your_key_here
OMDB_API_KEY=your_key_here
NUTRITION_API_KEY=your_key_here
```

### 3. Google Drive (Optional)

Untuk fitur cek buku:

```bash
# Setup Google Drive API
node setup-book-folder.js

# Authorize
node authorize-drive.js
```

Lihat: [SETUP_GOOGLE_DRIVE.md](./SETUP_GOOGLE_DRIVE.md)

### 4. Jalankan Bot

```bash
node bot.js
```

Scan QR code yang muncul dengan WhatsApp.

## 📱 Cara Pakai

Kirim pesan ke bot:

```
menu                    → Lihat semua perintah
saham BBCA.JK          → Harga saham BCA
crypto bitcoin         → Harga Bitcoin
bola epl               → Klasemen Premier League
bmi 70 170             → Hitung BMI
buku Atomic Habits     → Cek stok buku
film Avengers          → Info film
berita teknologi       → Berita teknologi
wiki Indonesia         → Info Wikipedia
qr https://google.com  → Generate QR code
```

## 🐳 Docker

### Build

```bash
docker build -t bot-whatsapp .
```

### Run

```bash
docker run -d \
  -e NODE_ENV=production \
  -e NEWS_API_KEY=your_key \
  --name bot-whatsapp \
  bot-whatsapp
```

### Docker Compose

```bash
docker-compose up -d
```

## 📚 Dokumentasi

### Deployment
- [DEPLOY_NIXPACKS.md](./DEPLOY_NIXPACKS.md) - Deploy dengan Nixpacks (Recommended)
- [QUICK_START_DEPLOY.md](./QUICK_START_DEPLOY.md) - Deploy cepat dengan Docker
- [DEPLOY_COOLIFY.md](./DEPLOY_COOLIFY.md) - Panduan lengkap deployment

### Setup
- [SETUP_GOOGLE_DRIVE.md](./SETUP_GOOGLE_DRIVE.md) - Setup Google Drive API
- [CARA_UPLOAD_BUKU.md](./CARA_UPLOAD_BUKU.md) - Upload buku ke Drive

## 🔒 Security

**JANGAN commit file berikut:**
- `credentials.json` - Google Drive credentials
- `token.json` - Google Drive token
- `.env` - Environment variables
- `_IGNORE_*` - WhatsApp session data

File `.gitignore` sudah dikonfigurasi untuk mencegah ini.

## 🛠️ Development

### Test Fitur Individual

```bash
node test-yahoo-finance.js  # Test saham
node test-wikipedia.js      # Test Wikipedia
node test-news.js           # Test berita
node test-check-book.js     # Test cek buku
```

### Encode Credentials untuk Deploy

```bash
node encode-credentials.js
```

## 📊 Tech Stack

- **Runtime:** Node.js 18
- **WhatsApp:** @open-wa/wa-automate
- **APIs:**
  - Yahoo Finance (Saham)
  - CoinGecko (Crypto)
  - NewsAPI (Berita)
  - OMDB (Film)
  - Wikipedia API
  - Google Drive API
  - Football-Data.org
  - API Ninjas (Nutrisi)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 License

ISC

## 🆘 Support

- **Issues:** [GitHub Issues](https://github.com/username/bot-whatsapp/issues)
- **Docs:** Lihat folder dokumentasi
- **@open-wa:** [Documentation](https://docs.openwa.dev/)

## ⚠️ Disclaimer

Bot ini untuk educational purposes. Gunakan dengan bijak dan patuhi Terms of Service WhatsApp.

## 🎉 Credits

- [@open-wa/wa-automate](https://github.com/open-wa/wa-automate-nodejs)
- [Yahoo Finance](https://finance.yahoo.com/)
- [CoinGecko](https://www.coingecko.com/)
- [NewsAPI](https://newsapi.org/)
- [OMDB](http://www.omdbapi.com/)
- [Wikipedia](https://www.wikipedia.org/)

---

Made with ❤️ by [Your Name]
