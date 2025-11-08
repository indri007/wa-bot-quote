# 📰 Setup News API

Panduan untuk mengaktifkan fitur berita terkini dengan NewsAPI (GRATIS!)

## 🎯 Fitur Berita

Bot bisa memberikan berita terkini dari berbagai kategori:
- 📰 Berita Umum Indonesia
- 💻 Teknologi
- 💼 Bisnis
- ⚽ Olahraga
- 🏥 Kesehatan
- 🎬 Hiburan

---

## 🔑 Cara Mendapatkan API Key (GRATIS)

### Langkah 1: Daftar NewsAPI

1. Buka: https://newsapi.org/register
2. Isi form pendaftaran:
   - **Email:** Masukkan email Anda
   - **Password:** Buat password
3. Klik **"Submit"**

### Langkah 2: Verifikasi Email

1. Cek email Anda
2. Klik link verifikasi dari NewsAPI
3. Login ke dashboard

### Langkah 3: Copy API Key

1. Setelah login, Anda akan melihat API key
2. **Copy API Key** (format: abc123def456...)

### Langkah 4: Masukkan ke Bot

1. Buka file `bot.js`
2. Cari baris:
```javascript
const apiKey = 'YOUR_NEWSAPI_KEY';
```

3. Ganti dengan API key Anda:
```javascript
const apiKey = 'abc123def456'; // API key Anda
```

4. Save file

### Langkah 5: Restart Bot

```bash
# Stop bot (Ctrl+C)
# Lalu jalankan lagi:
npm start
```

---

## 💬 Cara Pakai

### Format Perintah:
```
berita
berita [kategori]
```

### Contoh:

#### Berita Umum
```
berita
```

**Hasil:**
```
📰 BERITA TERKINI

1. Presiden Resmikan Proyek Infrastruktur Baru
   Presiden Joko Widodo meresmikan proyek 
   infrastruktur senilai...
   🔗 https://...
   📅 08/11/2025, 20:30

2. Ekonomi Indonesia Tumbuh 5.2%
   Badan Pusat Statistik mengumumkan...
   🔗 https://...
   📅 08/11/2025, 19:15

... (5 berita terbaru)

Data dari NewsAPI
```

#### Berita Teknologi
```
berita teknologi
```

Berita terkini seputar teknologi, gadget, startup, dll.

#### Berita Bisnis
```
berita bisnis
```

Berita ekonomi, pasar saham, keuangan, dll.

#### Berita Olahraga
```
berita olahraga
```

Berita sepak bola, basket, badminton, dll.

#### Berita Kesehatan
```
berita kesehatan
```

Berita medis, tips kesehatan, pandemi, dll.

#### Berita Hiburan
```
berita hiburan
```

Berita selebriti, film, musik, dll.

---

## 📊 Limit API

### Free Tier (Developer):
- **100 requests per hari**
- Berita dari 30 hari terakhir
- Cukup untuk penggunaan personal
- Reset setiap 24 jam

### Jika Butuh Lebih:
- **Business Plan:** $449/bulan
- 250,000 requests/bulan
- Untuk aplikasi komersial

---

## 🌍 Negara yang Tersedia

Bot default menggunakan berita Indonesia (`country: 'id'`).

Negara lain yang tersedia:
- `us` - Amerika Serikat
- `gb` - Inggris
- `au` - Australia
- `my` - Malaysia
- `sg` - Singapura
- Dan 50+ negara lainnya

### Ubah Negara:

Edit di `bot.js`:
```javascript
let country = 'us'; // Ganti 'id' dengan kode negara
```

---

## 🎨 Kustomisasi

### 1. Ubah Jumlah Berita

Default: 5 berita

Edit di `bot.js`:
```javascript
params: {
  apiKey: apiKey,
  country: country,
  category: category,
  pageSize: 10 // Ubah jadi 10 berita
}
```

### 2. Tambah Kategori Baru

Tambah kondisi di `bot.js`:
```javascript
else if (pesan.includes('sains') || pesan.includes('science')) {
  category = 'science';
}
```

### 3. Cari Berita Spesifik

Gunakan parameter `q` untuk search:
```javascript
params: {
  apiKey: apiKey,
  q: 'Bitcoin', // Keyword pencarian
  language: 'id',
  pageSize: 5
}
```

### 4. Kirim dengan Gambar

Tambah kode untuk kirim thumbnail:
```javascript
if (article.urlToImage) {
  await client.sendImage(
    pengirim, 
    article.urlToImage, 
    'news.jpg', 
    article.title
  );
}
```

---

## 🧪 Testing

### Test Manual:

1. Jalankan bot
2. Chat pribadi ke bot:
```
berita
```

3. Bot akan kirim 5 berita terkini

### Test Berbagai Kategori:

```
berita teknologi
berita bisnis
berita olahraga
berita kesehatan
berita hiburan
```

---

## ⚠️ Troubleshooting

### Error: Invalid API key
- API key salah atau belum diverifikasi
- Cek email untuk verifikasi
- Copy API key yang benar dari dashboard

### Error: Rate limit exceeded
- Sudah mencapai 100 requests hari ini
- Tunggu 24 jam atau upgrade plan

### Berita tidak muncul
- Cek koneksi internet
- Pastikan API key sudah dimasukkan
- Coba kategori lain

### Berita dalam bahasa Inggris
- NewsAPI untuk Indonesia terbatas
- Bisa tambah parameter `language: 'id'`
- Atau gunakan sumber berita lokal

---

## 🌟 Fitur Tambahan (Opsional)

### 1. Berita dari Sumber Tertentu

```javascript
params: {
  apiKey: apiKey,
  sources: 'bbc-news,cnn', // Sumber spesifik
  pageSize: 5
}
```

### 2. Berita Berdasarkan Tanggal

```javascript
params: {
  apiKey: apiKey,
  from: '2025-11-01', // Dari tanggal
  to: '2025-11-08',   // Sampai tanggal
  q: 'teknologi'
}
```

### 3. Sort Berita

```javascript
params: {
  apiKey: apiKey,
  sortBy: 'popularity' // atau 'publishedAt', 'relevancy'
}
```

---

## 📝 Alternatif API

Jika NewsAPI tidak cocok, bisa pakai:

### 1. GNews API
- Website: https://gnews.io/
- Free: 100 requests/day
- Support Indonesia

### 2. Currents API
- Website: https://currentsapi.services/
- Free: 600 requests/day
- Berita real-time

### 3. MediaStack
- Website: https://mediastack.com/
- Free: 500 requests/month
- 7,500+ sumber berita

---

## 🎉 Kesimpulan

Dengan NewsAPI:
- ✅ Gratis 100 requests/day
- ✅ Berita dari seluruh dunia
- ✅ Update real-time
- ✅ Berbagai kategori
- ✅ Setup cuma 5 menit

---

## 💡 Tips Penggunaan

1. **Hemat Quota:** Gunakan cache untuk berita yang sama
2. **Jadwalkan:** Update berita setiap 1 jam sekali
3. **Filter:** Tampilkan hanya berita penting
4. **Notifikasi:** Kirim breaking news ke admin

---

Selamat membaca berita! 📰✨
