# 🎬 Setup Movie Database API

Panduan untuk mengaktifkan fitur pencarian film dengan OMDB API (GRATIS!)

## 🎯 Fitur Movie Database

Bot bisa memberikan info lengkap tentang film:
- Judul & Tahun
- Rating IMDb
- Genre & Durasi
- Sutradara & Pemain
- Sinopsis
- Awards
- Poster film

---

## 🔑 Cara Mendapatkan API Key (GRATIS)

### Langkah 1: Daftar OMDB API

1. Buka: http://www.omdbapi.com/apikey.aspx
2. Pilih **"FREE! (1,000 daily limit)"**
3. Isi form:
   - **Email:** Masukkan email Anda
   - **First Name:** Nama depan
   - **Last Name:** Nama belakang
4. Centang "I'm not a robot"
5. Klik **"Submit"**

### Langkah 2: Aktivasi

1. Cek email Anda
2. Buka email dari OMDB API
3. Klik link aktivasi
4. **Copy API Key** yang muncul

### Langkah 3: Masukkan ke Bot

1. Buka file `bot.js`
2. Cari baris:
```javascript
const apiKey = 'YOUR_OMDB_API_KEY';
```

3. Ganti dengan API key Anda:
```javascript
const apiKey = 'abc12345'; // API key Anda
```

4. Save file

### Langkah 4: Restart Bot

```bash
# Stop bot (Ctrl+C)
# Lalu jalankan lagi:
npm start
```

---

## 💬 Cara Pakai

### Format Perintah:
```
film [judul film]
```

### Contoh:

#### Film Hollywood
```
film Avengers
film Inception
film The Dark Knight
film Interstellar
film Titanic
```

**Hasil:**
```
🎬 Avengers: Endgame (2019)

⭐ Rating: 8.4/10
🎭 Genre: Action, Adventure, Drama
⏱️ Durasi: 181 min
🎬 Sutradara: Anthony Russo, Joe Russo
🎭 Pemain: Robert Downey Jr., Chris Evans...

📝 Sinopsis:
After the devastating events of Avengers: 
Infinity War, the universe is in ruins...

🏆 Awards: Nominated for 1 Oscar...

Data dari OMDB
```

Plus poster film!

#### Film Indonesia
```
film Pengabdi Setan
film Laskar Pelangi
```

**Catatan:** Gunakan judul dalam bahasa Inggris untuk hasil terbaik.

---

## 📊 Limit API

### Free Tier:
- **1,000 requests per hari**
- Cukup untuk penggunaan personal
- Reset setiap 24 jam

### Jika Butuh Lebih:
- Patreon: $1/bulan = 100,000 requests/bulan
- Buka: https://www.patreon.com/join/omdb

---

## 🎨 Kustomisasi

### 1. Ubah Format Pesan

Edit bagian `movieInfo` di `bot.js`:

```javascript
const movieInfo = `🎬 *${movie.Title}*\n\n` +
  `⭐ ${movie.imdbRating}/10\n` +
  `🎭 ${movie.Genre}\n` +
  // Tambah/kurangi info sesuai keinginan
```

### 2. Tambah Info Lain

Data yang tersedia dari OMDB:
- `movie.Country` - Negara
- `movie.Language` - Bahasa
- `movie.BoxOffice` - Box office
- `movie.Production` - Studio produksi
- `movie.Website` - Website resmi

### 3. Cari Serial TV

Ganti `film` dengan `tv`:

```javascript
else if (pesan.startsWith('tv ')) {
  // Copy code dari 'film' dan ganti
}
```

---

## 🧪 Testing

### Test Manual:

1. Jalankan bot
2. Chat pribadi ke bot:
```
film Inception
```

3. Bot akan kirim info lengkap + poster

### Test Berbagai Film:

```
film Avatar
film Joker
film Parasite
film Toy Story
film The Matrix
```

---

## ⚠️ Troubleshooting

### Error: Invalid API key
- API key salah atau belum diaktivasi
- Cek email untuk aktivasi
- Copy API key yang benar

### Error: Request limit exceeded
- Sudah mencapai 1,000 requests hari ini
- Tunggu 24 jam atau upgrade ke Patreon

### Film tidak ditemukan
- Coba judul dalam bahasa Inggris
- Cek ejaan judul
- Gunakan judul lengkap

### Poster tidak muncul
- Beberapa film tidak punya poster
- Koneksi internet lambat
- Normal, info film tetap muncul

---

## 🌟 Fitur Tambahan (Opsional)

### 1. Cari Film by Year

```javascript
// Tambah parameter year
params: {
  apikey: apiKey,
  t: judulFilm,
  y: '2019' // Tahun
}
```

### 2. Search Multiple Results

Gunakan parameter `s` untuk search:

```javascript
params: {
  apikey: apiKey,
  s: judulFilm // Search query
}
```

Akan return list film yang cocok.

### 3. Full Plot

Ganti `plot: 'short'` menjadi `plot: 'full'` untuk sinopsis lengkap.

---

## 📝 Alternatif API

Jika OMDB tidak cocok, bisa pakai:

### 1. TMDb (The Movie Database)
- Website: https://www.themoviedb.org/settings/api
- Free: 1,000 requests/day
- Data lebih lengkap

### 2. TVMaze API
- Website: https://www.tvmaze.com/api
- Gratis tanpa limit
- Fokus ke serial TV

---

## 🎉 Kesimpulan

Dengan OMDB API:
- ✅ Gratis 1,000 requests/day
- ✅ Data lengkap dari IMDb
- ✅ Poster film berkualitas
- ✅ Setup cuma 5 menit
- ✅ Mudah digunakan

---

Selamat menonton! 🍿🎬
