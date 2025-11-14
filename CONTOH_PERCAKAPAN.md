# 💬 CONTOH PERCAKAPAN DENGAN BOT

Panduan lengkap cara chat dengan bot dari awal sampai dapat hasil!

---

## 📱 CONTOH 1: CEK WIKIPEDIA

### Percakapan:

**Pengguna:**
```
halo
```

**Bot:**
```
👋 Halo! Ada yang bisa saya bantu?

Ketik *menu* untuk lihat perintah.
```

**Pengguna:**
```
menu
```

**Bot:**
```
📋 MENU BOT WHATSAPP

🎯 PERINTAH DASAR
• menu - Tampilkan menu
• info - Info bot
...

📚 WIKIPEDIA
• wiki Indonesia
• wiki [topik]

💡 Chat PRIBADI, bukan grup!
Selamat menggunakan! 🎉
```

**Pengguna:**
```
wiki Indonesia
```

**Bot:**
```
⏳ Mencari di Wikipedia...
```

**Bot:**
```
📚 Indonesia

Indonesia, officially the Republic of Indonesia, 
is a country in Southeast Asia and Oceania 
between the Indian and Pacific oceans. It consists 
of over 17,000 islands...

🔗 Baca selengkapnya:
https://id.wikipedia.org/wiki/Indonesia

Sumber: Wikipedia Indonesia
```

**Bot:** *(Kirim gambar bendera/peta Indonesia)*

---

## 📚 CONTOH 2: CEK STOK BUKU

### Percakapan:

**Pengguna:**
```
halo
```

**Bot:**
```
👋 Halo! Ada yang bisa saya bantu?

Ketik *menu* untuk lihat perintah.
```

**Pengguna:**
```
buku Atomic Habit
```

**Bot:**
```
⏳ Mengecek ketersediaan buku...
```

**Bot (Jika READY):**
```
✅ BUKU READY!

📚 Judul: Atomic_Habit.pdf
📦 Status: TERSEDIA

💰 Silakan lakukan pembayaran:
Scan QR Code di katalog atau hubungi admin 
untuk info pembayaran.

Terima kasih! 🙏
```

**Bot (Jika TIDAK READY):**
```
❌ BUKU TIDAK READY

📚 Judul: Atomic Habit
📦 Status: TIDAK TERSEDIA

Maaf, buku ini sedang tidak tersedia.
Silakan coba judul lain atau hubungi admin 
untuk info lebih lanjut.
```

---

## 📰 CONTOH 3: CEK BERITA TERKINI

### Percakapan:

**Pengguna:**
```
berita teknologi
```

**Bot:**
```
⏳ Mengambil berita terkini...
```

**Bot:**
```
📰 BERITA TERKINI
Kategori: TECHNOLOGY

1. Apple Luncurkan iPhone 16 dengan AI Canggih
   Apple mengumumkan peluncuran iPhone 16 
   dengan fitur AI terbaru...
   🔗 https://...
   📅 08/11/2025, 20:30

2. Google Rilis Update Android Terbaru
   Google merilis Android 15 dengan fitur 
   keamanan yang ditingkatkan...
   🔗 https://...
   📅 08/11/2025, 19:15

3. Tesla Umumkan Mobil Listrik Termurah
   Tesla mengumumkan model baru dengan harga...
   🔗 https://...
   📅 08/11/2025, 18:45

... (5 berita terbaru)

Data dari NewsAPI
```

---

## 🎬 CONTOH 4: INFO FILM

### Percakapan:

**Pengguna:**
```
film Avengers
```

**Bot:**
```
⏳ Mencari info film...
```

**Bot:**
```
🎬 Avengers: Endgame (2019)

⭐ Rating: 8.4/10
🎭 Genre: Action, Adventure, Drama
⏱️ Durasi: 181 min
🎬 Sutradara: Anthony Russo, Joe Russo
🎭 Pemain: Robert Downey Jr., Chris Evans, 
Mark Ruffalo, Chris Hemsworth

📝 Sinopsis:
After the devastating events of Avengers: 
Infinity War (2018), the universe is in ruins. 
With the help of remaining allies, the Avengers 
assemble once more...

🏆 Awards: Nominated for 1 Oscar. 70 wins & 
132 nominations total

Data dari OMDB
```

**Bot:** *(Kirim poster film Avengers)*

---

## 💱 CONTOH 5: KONVERSI MATA UANG

### Percakapan:

**Pengguna:**
```
kurs 100 USD IDR
```

**Bot:**
```
⏳ Mengambil kurs terkini...
```

**Bot:**
```
💱 KONVERSI MATA UANG

100 USD = 1,575,000.00 IDR

📊 Rate: 1 USD = 15,750.0000 IDR
📅 Update: 08/11/2025

Data dari Fixer.io
```

---

## 🔄 CONTOH 6: KOMBINASI BEBERAPA FITUR

### Percakapan Lengkap:

**Pengguna:**
```
halo
```

**Bot:**
```
👋 Halo! Ada yang bisa saya bantu?

Ketik *menu* untuk lihat perintah.
```

**Pengguna:**
```
menu
```

**Bot:** *(Kirim menu lengkap)*

**Pengguna:**
```
crypto bitcoin
```

**Bot:**
```
💰 BITCOIN

💵 Harga USD: $43,250
💴 Harga IDR: Rp 678,500,000
📈 Perubahan 24h: +2.5%

Data dari CoinGecko
```

**Pengguna:**
```
saham BBCA.JK
```

**Bot:**
```
📈 BBCA.JK
PT Bank Central Asia Tbk

💵 Harga: IDR 10,250.00
📈 Perubahan: +50 (+0.49%)
📊 Market Cap: IDR 1.2T

Data dari Yahoo Finance
```

**Pengguna:**
```
bmi 70 170
```

**Bot:**
```
💪 HASIL BMI

Berat: 70 kg
Tinggi: 170 cm

BMI: 24.2
Status: ✅ Normal

📝 Saran:
Pertahankan pola makan sehat dan olahraga teratur!
```

**Pengguna:**
```
wiki Bitcoin
```

**Bot:**
```
📚 Bitcoin

Bitcoin is a decentralized digital currency 
that can be transferred on the peer-to-peer 
bitcoin network...

🔗 Read more:
https://en.wikipedia.org/wiki/Bitcoin

Source: Wikipedia (English)
```

**Pengguna:**
```
terima kasih
```

**Bot:**
```
❓ Ketik *menu* untuk lihat perintah.
```

---

## 💡 TIPS UNTUK PENGGUNA BARU

### 1. Mulai dengan "halo"
Selalu mulai dengan salam untuk memastikan bot aktif.

### 2. Ketik "menu" untuk lihat semua fitur
Jangan langsung ketik perintah jika belum tahu.

### 3. Ikuti format yang benar
Perhatikan spasi dan format:
- ✅ `crypto bitcoin` (ada spasi)
- ❌ `cryptobitcoin` (tanpa spasi)

### 4. Satu perintah satu waktu
Kirim satu perintah, tunggu balasan, baru kirim lagi.

### 5. Chat pribadi, bukan grup
Bot tidak akan balas di grup!

---

## ❌ KESALAHAN UMUM

### Kesalahan 1: Chat di Grup
**Pengguna di Grup:**
```
menu
```

**Bot:** *(Tidak balas)*

**Solusi:** Chat PRIBADI ke bot!

---

### Kesalahan 2: Format Salah
**Pengguna:**
```
bmi70170
```

**Bot:**
```
❓ Ketik *menu* untuk lihat perintah.
```

**Solusi:** Gunakan spasi: `bmi 70 170`

---

### Kesalahan 3: Saham Indonesia Tanpa .JK
**Pengguna:**
```
saham BBCA
```

**Bot:**
```
❌ Gagal mengambil data saham "BBCA".

Pastikan kode saham benar.
Contoh: AAPL, GOOGL, BBCA.JK
```

**Solusi:** Tambahkan .JK: `saham BBCA.JK`

---

## 🎯 CHECKLIST PENGGUNA BARU

Sebelum chat bot, pastikan:

- [ ] Sudah simpan nomor bot ke kontak
- [ ] Buka chat PRIBADI (bukan grup)
- [ ] Ketik "halo" untuk mulai
- [ ] Ketik "menu" untuk lihat perintah
- [ ] Ikuti format yang ada di menu
- [ ] Tunggu balasan bot sebelum kirim perintah lain

---

## 📞 JIKA MASIH BINGUNG

**Pengguna:**
```
info
```

**Bot:** *(Kirim info lengkap cara pakai bot)*

Atau hubungi admin untuk bantuan!

---

## 🎉 SELAMAT MENGGUNAKAN!

Dengan panduan ini, pengguna baru pasti bisa pakai bot dengan mudah!

**Ingat:**
1. Chat PRIBADI
2. Ketik "menu" dulu
3. Ikuti contoh
4. Tunggu balasan

Semua fitur mudah digunakan! 🚀
