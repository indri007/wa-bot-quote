# 📚 Panduan Wikipedia Feature

Fitur pencarian Wikipedia - 100% GRATIS, tanpa API key, unlimited!

## 🎯 Fitur Wikipedia

Bot bisa mencari informasi dari Wikipedia:
- 📚 Artikel lengkap
- 🖼️ Gambar (jika ada)
- 🔗 Link ke artikel lengkap
- 🌍 Support Indonesia & English
- ✅ Tanpa API key
- ✅ Tanpa limit
- ✅ 100% GRATIS!

---

## 💬 Cara Pakai

### Format Perintah:
```
wiki [topik]
```

### Contoh:

#### Topik Umum
```
wiki Indonesia
```

**Hasil:**
```
📚 Indonesia

Indonesia, officially the Republic of Indonesia, 
is a country in Southeast Asia and Oceania 
between the Indian and Pacific oceans...

🔗 Baca selengkapnya:
https://id.wikipedia.org/wiki/Indonesia

Sumber: Wikipedia Indonesia
```

Plus gambar bendera/peta Indonesia!

#### Tokoh Terkenal
```
wiki Soekarno
wiki Albert Einstein
wiki Elon Musk
wiki Cristiano Ronaldo
```

#### Tempat
```
wiki Jakarta
wiki Bali
wiki Candi Borobudur
wiki Menara Eiffel
```

#### Ilmu Pengetahuan
```
wiki Fotosintesis
wiki Teori Relativitas
wiki DNA
wiki Tata Surya
```

#### Teknologi
```
wiki Artificial Intelligence
wiki Blockchain
wiki Quantum Computing
wiki ChatGPT
```

#### Sejarah
```
wiki Perang Dunia II
wiki Kerajaan Majapahit
wiki Revolusi Industri
```

#### Hewan & Tumbuhan
```
wiki Komodo
wiki Rafflesia Arnoldii
wiki Harimau Sumatera
```

---

## 🌍 Bahasa

### Wikipedia Indonesia
Bot akan mencari di Wikipedia Indonesia terlebih dahulu.

Contoh topik Indonesia:
```
wiki Joko Widodo
wiki Nasi Goreng
wiki Batik
wiki Gamelan
```

### Wikipedia English
Jika tidak ditemukan di Wikipedia Indonesia, bot otomatis mencari di Wikipedia English.

Contoh topik internasional:
```
wiki Steve Jobs
wiki Bitcoin
wiki Marvel Cinematic Universe
```

---

## ✨ Keunggulan

### 1. 100% GRATIS
- Tidak perlu API key
- Tidak ada biaya
- Tidak ada limit request
- Unlimited selamanya!

### 2. Otomatis Dual Language
- Cari di Wikipedia Indonesia dulu
- Jika tidak ada, cari di Wikipedia English
- Otomatis tanpa perlu setting

### 3. Lengkap dengan Gambar
- Kirim gambar artikel (jika ada)
- Thumbnail berkualitas
- Otomatis dari Wikipedia

### 4. Link Artikel Lengkap
- Bisa baca artikel full di Wikipedia
- Link langsung ke halaman

---

## 🎨 Fitur Tambahan

### 1. Ringkasan Artikel
Bot menampilkan intro/ringkasan artikel (1000 karakter pertama).

### 2. Gambar Artikel
Jika artikel punya gambar, bot akan kirim otomatis.

### 3. Auto Fallback
Jika tidak ada di Wikipedia Indonesia, otomatis cari di English.

---

## 📊 Contoh Penggunaan

### Untuk Pelajar
```
wiki Proklamasi Kemerdekaan Indonesia
wiki Sistem Periodik Unsur
wiki Pythagoras
wiki Mitosis dan Meiosis
```

### Untuk Umum
```
wiki COVID-19
wiki Vaksin
wiki Resesi Ekonomi
wiki Pemanasan Global
```

### Untuk Hiburan
```
wiki One Piece
wiki Marvel
wiki K-Pop
wiki Sepak Bola
```

### Untuk Bisnis
```
wiki Startup
wiki E-commerce
wiki Digital Marketing
wiki Cryptocurrency
```

---

## 🧪 Testing

### Test Manual:

1. Jalankan bot
2. Chat pribadi ke bot:
```
wiki Indonesia
```

3. Bot akan kirim info lengkap + gambar

### Test Berbagai Topik:

```
wiki Soekarno
wiki Jakarta
wiki Artificial Intelligence
wiki Bitcoin
wiki COVID-19
```

---

## ⚠️ Troubleshooting

### Topik tidak ditemukan
- Cek ejaan topik
- Coba kata kunci yang lebih umum
- Gunakan bahasa Inggris jika topik internasional

### Gambar tidak muncul
- Tidak semua artikel punya gambar
- Normal, info tetap muncul
- Gambar mungkin terlalu besar

### Teks terpotong
- Bot hanya kirim 1000 karakter pertama
- Klik link untuk baca lengkap
- Ini untuk menghemat pesan WhatsApp

### Error koneksi
- Cek koneksi internet
- Wikipedia mungkin sedang maintenance
- Coba lagi beberapa saat

---

## 💡 Tips Penggunaan

### 1. Kata Kunci Spesifik
Gunakan nama lengkap atau kata kunci spesifik:
- ✅ `wiki Joko Widodo`
- ❌ `wiki Jokowi` (mungkin tidak ditemukan)

### 2. Bahasa Inggris untuk Topik Internasional
Untuk topik luar negeri, gunakan bahasa Inggris:
- ✅ `wiki Albert Einstein`
- ❌ `wiki Albert Einsten` (typo)

### 3. Topik Populer
Topik yang lebih populer biasanya punya artikel lebih lengkap.

### 4. Kombinasi dengan Fitur Lain
```
wiki Bitcoin          (Info dari Wikipedia)
crypto bitcoin        (Harga real-time)
```

---

## 🌟 Ide Penggunaan

### 1. Edukasi
Gunakan untuk belajar dan riset cepat.

### 2. Fact Checking
Cek fakta dan informasi dengan cepat.

### 3. Trivia
Cari info menarik untuk kuis atau trivia.

### 4. Referensi
Dapatkan referensi untuk tugas atau artikel.

---

## 🔧 Kustomisasi (Opsional)

### 1. Ubah Panjang Ringkasan

Edit di `bot.js`:
```javascript
if (extract.length > 2000) { // Ubah dari 1000 ke 2000
  extract = extract.substring(0, 2000) + '...';
}
```

### 2. Tambah Bahasa Lain

Tambah Wikipedia bahasa lain:
```javascript
// Wikipedia Jepang
const searchResponseJP = await axios.get('https://ja.wikipedia.org/w/api.php', {
  // ...
});
```

### 3. Format Pesan

Ubah format tampilan sesuai keinginan:
```javascript
const wikiInfo = `📖 ${title}\n\n` +
  `${extract}\n\n` +
  `📎 ${wikiUrl}`;
```

---

## 📚 Sumber Data

- **Wikipedia Indonesia:** https://id.wikipedia.org
- **Wikipedia English:** https://en.wikipedia.org
- **Wikipedia API:** https://www.mediawiki.org/wiki/API:Main_page

---

## 🎉 Kesimpulan

Fitur Wikipedia:
- ✅ 100% GRATIS selamanya
- ✅ Tanpa API key
- ✅ Unlimited requests
- ✅ Dual language (ID & EN)
- ✅ Lengkap dengan gambar
- ✅ Setup 0 menit (sudah jalan!)

---

## 🌐 Wikipedia Bahasa Lain

Jika ingin tambah bahasa lain, ganti kode bahasa:
- `id` - Indonesia
- `en` - English
- `es` - Español (Spanyol)
- `fr` - Français (Prancis)
- `de` - Deutsch (Jerman)
- `ja` - 日本語 (Jepang)
- `zh` - 中文 (China)
- `ar` - العربية (Arab)

Format URL: `https://[kode].wikipedia.org/w/api.php`

---

Selamat belajar dengan Wikipedia! 📚✨
