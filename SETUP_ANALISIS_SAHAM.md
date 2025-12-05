# Setup Analisis Saham dengan Gemini AI

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Dapatkan Gemini API Key (GRATIS)

1. Buka: https://makersuite.google.com/app/apikey
2. Login dengan akun Google
3. Klik "Create API Key"
4. Copy API key

### 3. Setup Environment Variable

Buka file `.env` dan tambahkan API key:
```env
GEMINI_API_KEY=AIzaSy...your_api_key_here
```

### 4. Test Analisis

```bash
node test-stock.js
```

### 5. Jalankan Bot

```bash
npm start
```

## 📱 Cara Pakai di WhatsApp

Kirim pesan ke bot (chat pribadi, bukan grup):

```
analisa AAPL
analisa BBCA.JK
analisa TSLA
```

## 🎯 Fitur

### Dengan Gemini AI (Jika API key diset)
- ✅ Analisis mendalam dengan AI
- ✅ Rekomendasi BUY/SELL/HOLD dengan alasan
- ✅ Insight yang actionable
- ✅ Bahasa Indonesia yang natural

### Tanpa Gemini AI (Fallback)
- ✅ Analisis teknikal manual
- ✅ SMA 20 & 50
- ✅ Support & Resistance
- ✅ Volume analysis
- ✅ Rekomendasi dasar

## 📊 Contoh Output dengan Gemini AI

```
📊 ANALISIS SAHAM: AAPL

💰 RINGKASAN HARGA
Apple Inc. diperdagangkan di USD 286.19, naik 1.09% hari ini.
Harga mendekati 52-week high, menunjukkan momentum kuat.

📈 ANALISIS TREND
Trend: BULLISH 📈
Harga berada di atas SMA 20 (273.09) dan SMA 50 (263.99).
Ini menunjukkan momentum positif jangka pendek dan menengah.

🎯 ANALISIS TEKNIKAL
- Support kuat di USD 266.25
- Resistance di USD 287.40 (52W high)
- Volume normal, tidak ada spike signifikan
- Volatilitas rendah, pergerakan stabil

💡 REKOMENDASI
⏸️ HOLD - Harga sudah mendekati resistance. Untuk investor 
yang sudah hold, pertahankan posisi. Untuk yang belum masuk, 
tunggu breakout di atas 287.40 atau koreksi ke support 266.

⚠️ DISCLAIMER
Ini bukan saran investasi. Lakukan riset sendiri sebelum trading.

💡 Powered by Gemini AI
📊 Data dari Yahoo Finance
```

## 🔧 Troubleshooting

### Bot tidak menggunakan AI
- Cek file `.env` sudah ada `GEMINI_API_KEY`
- Pastikan tidak ada spasi atau karakter tambahan
- Restart bot setelah update `.env`

### Error "API key not valid"
- Pastikan API key benar
- Cek di https://makersuite.google.com/app/apikey
- Generate API key baru jika perlu

### Analisis lambat
- Gemini AI butuh 5-10 detik untuk analisis
- Ini normal untuk analisis yang mendalam
- Bot akan kirim pesan "Mohon tunggu sebentar"

## 💡 Tips

1. **Free Tier Gemini**
   - 60 requests/menit
   - Lebih dari cukup untuk bot WhatsApp
   - Tidak perlu kartu kredit

2. **Fallback Mode**
   - Bot tetap bisa analisis tanpa Gemini
   - Analisis manual tetap akurat
   - Hanya kurang detail dibanding AI

3. **Best Practice**
   - Gunakan untuk saham liquid (AAPL, TSLA, BBCA.JK)
   - Jangan spam command, tunggu hasil sebelum request lagi
   - Kombinasikan dengan riset sendiri

## 📚 Resources

- **Gemini API**: https://ai.google.dev/
- **Get API Key**: https://makersuite.google.com/app/apikey
- **Yahoo Finance**: https://finance.yahoo.com/

## 🎉 Selesai!

Bot Anda sekarang bisa memberikan analisis saham dengan AI! 🚀

Untuk dokumentasi lengkap, lihat: `GEMINI_API_SETUP.md`
