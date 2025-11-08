# 🔑 Cara Setup Football API

Untuk menggunakan fitur football/bola, Anda perlu API key gratis dari Football-Data.org

## 📝 Langkah-langkah:

### 1. Daftar API Key Gratis

1. Buka: https://www.football-data.org/client/register
2. Isi form pendaftaran:
   - Email
   - Password
   - Nama
3. Klik "Register"
4. Cek email untuk verifikasi
5. Login ke dashboard

### 2. Dapatkan API Key

1. Setelah login, buka: https://www.football-data.org/client/home
2. Copy API key Anda (terlihat seperti: `abc123def456...`)

### 3. Masukkan ke Bot

1. Buka file `bot.js`
2. Cari baris:
```javascript
'X-Auth-Token': 'YOUR_API_KEY_HERE'
```
3. Ganti `YOUR_API_KEY_HERE` dengan API key Anda:
```javascript
'X-Auth-Token': 'abc123def456...'
```
4. Save file
5. Restart bot

## ⚽ Fitur yang Tersedia

Setelah setup, Anda bisa:
- `bola epl` - Klasemen Premier League
- `bola laliga` - Klasemen La Liga Spanyol
- `bola seriea` - Klasemen Serie A Italia
- `bola bundesliga` - Klasemen Bundesliga Jerman
- `bola ligue1` - Klasemen Ligue 1 Prancis

## 📊 Free Tier Limits

API gratis memberikan:
- 10 requests per menit
- Data klasemen liga top Eropa
- Update setiap hari

Cukup untuk penggunaan personal! 🎉

## 🔄 Restart Bot

Setelah update API key:
```bash
# Stop bot (Ctrl+C)
# Lalu jalankan lagi:
npm start
```

Selamat mencoba! ⚽
