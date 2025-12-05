# Setup Gemini API untuk Analisis Saham

## 🎯 Kenapa Gemini?
- ✅ **100% GRATIS** - Free tier sangat generous
- ✅ **Tidak perlu kartu kredit** - Cukup akun Google
- ✅ **60 requests/menit** - Lebih dari cukup untuk bot WhatsApp
- ✅ **Analisis AI cerdas** - Powered by Google AI

## 📝 Cara Mendapatkan API Key

### 1. Buka Google AI Studio
Kunjungi: https://makersuite.google.com/app/apikey

### 2. Login dengan Akun Google
- Gunakan akun Google Anda
- Tidak perlu verifikasi kartu kredit

### 3. Create API Key
- Klik tombol **"Create API Key"**
- Pilih project atau buat project baru
- Copy API key yang muncul

### 4. Simpan API Key
Buka file `.env` di root project dan tambahkan:
```env
GEMINI_API_KEY=AIzaSy...your_api_key_here
```

## 🚀 Cara Pakai

### Di WhatsApp Bot
Setelah setup API key, gunakan command:
```
analisa AAPL
analisa BBCA.JK
analisa TSLA
```

Bot akan:
1. Ambil data real-time dari Yahoo Finance
2. Kirim data ke Gemini AI untuk analisis
3. Berikan rekomendasi BUY/SELL/HOLD dengan alasan

## 📊 Contoh Output

```
📊 ANALISIS SAHAM: AAPL

💰 RINGKASAN HARGA
Apple Inc. (AAPL) diperdagangkan di USD 286.19, naik 1.09% 
hari ini. Harga mendekati 52-week high di USD 287.40.

📈 ANALISIS TREND
Trend: BULLISH 📈
Harga berada di atas SMA 20 dan SMA 50, menunjukkan momentum 
positif jangka pendek dan menengah.

🎯 ANALISIS TEKNIKAL
- Support: USD 266.25
- Resistance: USD 287.40
- Volume: Normal, tidak ada spike signifikan

💡 REKOMENDASI
⏸️ HOLD - Harga sudah mendekati resistance. Tunggu breakout 
atau koreksi untuk entry point yang lebih baik.

⚠️ DISCLAIMER
Ini bukan saran investasi. Lakukan riset sendiri sebelum trading.

💡 Powered by Gemini AI
📊 Data dari Yahoo Finance
```

## 🔧 Troubleshooting

### Error: "API key not valid"
- Pastikan API key sudah benar di file `.env`
- Cek tidak ada spasi atau karakter tambahan
- Restart bot setelah update `.env`

### Error: "Quota exceeded"
- Free tier: 60 requests/menit
- Tunggu 1 menit lalu coba lagi
- Untuk production, upgrade ke paid tier

### Analisis tidak menggunakan AI
- Jika `GEMINI_API_KEY` tidak diset, bot akan fallback ke analisis manual
- Analisis manual tetap bagus, tapi tidak se-detail AI

## 📚 Resources

- **Gemini API Docs**: https://ai.google.dev/docs
- **Get API Key**: https://makersuite.google.com/app/apikey
- **Pricing**: https://ai.google.dev/pricing (Free tier sangat generous!)

## 💡 Tips

1. **Simpan API Key dengan Aman**
   - Jangan commit `.env` ke Git
   - Gunakan `.env.example` untuk template

2. **Monitor Usage**
   - Cek usage di Google AI Studio
   - Free tier: 60 requests/menit sudah lebih dari cukup

3. **Fallback Mode**
   - Bot tetap bisa analisis tanpa Gemini
   - Analisis manual akan digunakan jika Gemini gagal

## 🎉 Selesai!

Sekarang bot Anda bisa memberikan analisis saham dengan AI! 🚀
