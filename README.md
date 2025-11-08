# 🤖 Bot WhatsApp Multi-Fungsi

Bot WhatsApp canggih dengan berbagai fitur: Crypto, Saham, Football, Kesehatan, dan QR Code Generator!

## ✨ Fitur Lengkap

### 💰 Cryptocurrency (CoinGecko API)
- Cek harga Bitcoin, Ethereum, dan crypto lainnya
- Harga dalam USD dan IDR
- Perubahan 24 jam

### 📈 Saham (Yahoo Finance API)
- Harga saham real-time
- Saham US: AAPL, GOOGL, TSLA, dll
- Saham Indonesia: BBCA.JK, TLKM.JK, dll

### ⚽ Football (Football-Data API)
- Klasemen liga top Eropa
- Premier League, La Liga, Serie A, Bundesliga, Ligue 1

### 💪 Kesehatan & Fitness
- Kalkulator BMI
- Kalkulator kalori harian
- Info nutrisi makanan
- Tips kesehatan
- Saran olahraga/workout

### 📱 QR Code Generator
- QR Code biasa
- QR Code dengan logo
- QR Code warna custom
- Support URL, teks, WhatsApp, email, dll

### 🎯 Fitur Lainnya
- Quote motivasi
- Cek waktu
- Status bot

## 📋 Cara Install

1. Masuk ke folder bot:
```bash
cd bot-wa
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Cara Menjalankan

```bash
npm start
```

Scan QR code yang muncul dengan WhatsApp Anda!

## 💬 Contoh Penggunaan

### Crypto
```
crypto bitcoin
crypto ethereum
crypto bnb
```

### Saham
```
saham AAPL
saham BBCA.JK
saham TLKM.JK
```

### Football
```
bola epl
bola laliga
bola seriea
```

### Kesehatan
```
bmi 70 170
kalori 70 170 25 pria
nutrisi nasi
tips sehat
olahraga
```

### QR Code
```
qr https://google.com
qrlogo https://instagram.com/username
qrwarna https://tokosaya.com
```

## 📚 Dokumentasi Lengkap

- `FOOTBALL_API_SETUP.md` - Setup API Football
- `HEALTH_API_SETUP.md` - Panduan fitur kesehatan
- `QR_CODE_GUIDE.md` - Panduan QR Code Generator

## 🔑 API Keys (Opsional)

Beberapa fitur sudah bisa digunakan tanpa API key. Untuk fitur lengkap:

1. **Football**: Daftar di football-data.org
2. **Nutrisi**: Daftar di api-ninjas.com

Semua GRATIS! Lihat file panduan untuk detail.

## 📝 Catatan

- Bot menyimpan sesi di folder `_IGNORE_bot-wa-saya`
- Setelah scan QR pertama kali, bot auto-login
- Untuk logout, hapus folder sesi

## 🛠️ Troubleshooting

Jika ada error:
1. Pastikan Node.js v12.18.3 atau lebih baru
2. Hapus `node_modules` dan install ulang
3. Pastikan koneksi internet stabil

## 🌟 Fitur Mendatang

- [ ] Cuaca
- [ ] Berita
- [ ] Translate
- [ ] Dan lainnya!

## 📞 Support

Butuh bantuan? Buka issue di GitHub!

Selamat menggunakan! 🎉
