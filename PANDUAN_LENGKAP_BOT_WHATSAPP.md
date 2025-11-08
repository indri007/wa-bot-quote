# 📱 PANDUAN LENGKAP BOT WHATSAPP

## Selamat Datang! 👋

Bot WhatsApp ini adalah asisten pintar yang bisa membantu Anda mendapatkan informasi tentang:
- 💰 Harga Cryptocurrency
- 📈 Harga Saham
- ⚽ Klasemen Football
- 💪 Kesehatan & Fitness
- 📱 Generator QR Code

---

## 🚀 CARA MENGGUNAKAN BOT

### Langkah 1: Simpan Nomor Bot
Simpan nomor bot WhatsApp ke kontak Anda

### Langkah 2: Chat Pribadi
**PENTING:** Chat **PRIBADI** ke nomor bot, **BUKAN DI GRUP**

### Langkah 3: Ketik Perintah
Ketik perintah sesuai kebutuhan Anda (lihat daftar di bawah)

---

## 📋 DAFTAR LENGKAP PERINTAH

### 🎯 PERINTAH DASAR

#### Lihat Menu
```
menu
```
Menampilkan daftar semua perintah yang tersedia

#### Salam
```
halo
hi
hai
```
Bot akan menyapa Anda

#### Cek Status Bot
```
ping
```
Mengecek apakah bot aktif

#### Info Bot
```
info
```
Informasi tentang bot

#### Cek Waktu
```
waktu
```
Menampilkan waktu sekarang (WIB)

#### Quote Motivasi
```
quote
```
Mendapatkan quote motivasi random

---

## 💰 CRYPTOCURRENCY

### Cara Cek Harga Crypto

**Format:**
```
crypto [nama-crypto]
```

### Contoh Penggunaan:

#### Bitcoin
```
crypto bitcoin
```
atau
```
crypto btc
```

**Hasil:**
```
💰 BITCOIN

💵 Harga USD: $43,250
💴 Harga IDR: Rp 678,500,000
📈 Perubahan 24h: +2.5%

Data dari CoinGecko
```

#### Ethereum
```
crypto ethereum
```
atau
```
crypto eth
```

#### Crypto Lainnya
```
crypto bnb          (Binance Coin)
crypto cardano      (Cardano)
crypto solana       (Solana)
crypto dogecoin     (Dogecoin)
crypto polkadot     (Polkadot)
crypto ripple       (XRP)
crypto litecoin     (Litecoin)
crypto chainlink    (Chainlink)
```

### Tips:
- Gunakan nama lengkap crypto (contoh: bitcoin, ethereum)
- Atau gunakan singkatan populer (btc, eth, bnb)
- Harga dalam USD dan IDR (Rupiah)
- Menampilkan perubahan harga 24 jam

---

## 📈 SAHAM (STOCK)

### Cara Cek Harga Saham

**Format:**
```
saham [KODE-SAHAM]
```

### Saham Indonesia

**PENTING:** Tambahkan **.JK** di belakang kode saham Indonesia

#### Bank BCA
```
saham BBCA.JK
```

**Hasil:**
```
📈 BBCA.JK
PT Bank Central Asia Tbk

💵 Harga: IDR 10,250.00
📈 Perubahan: +50 (+0.49%)
📊 Market Cap: IDR 1.2T
🔓 Open: IDR 10,200.00
📊 High/Low: 10,300.00 / 10,150.00

Data dari Yahoo Finance
```

#### Saham Indonesia Populer
```
saham BBCA.JK       (Bank BCA)
saham BBRI.JK       (Bank BRI)
saham BMRI.JK       (Bank Mandiri)
saham TLKM.JK       (Telkom Indonesia)
saham ASII.JK       (Astra International)
saham UNVR.JK       (Unilever Indonesia)
saham ICBP.JK       (Indofood CBP)
saham GOTO.JK       (GoTo Gojek Tokopedia)
saham BUKA.JK       (Bukalapak)
saham EMTK.JK       (Elang Mahkota Teknologi)
```

### Saham Amerika Serikat

**Tidak perlu** tambahan .JK

#### Apple
```
saham AAPL
```

#### Saham US Populer
```
saham AAPL          (Apple)
saham GOOGL         (Google/Alphabet)
saham MSFT          (Microsoft)
saham AMZN          (Amazon)
saham TSLA          (Tesla)
saham META          (Meta/Facebook)
saham NVDA          (NVIDIA)
saham NFLX          (Netflix)
saham DIS           (Disney)
saham BABA          (Alibaba)
```

### Tips Saham:
- Saham Indonesia: Tambahkan **.JK**
- Saham US: Langsung kode ticker
- Harga real-time dari Yahoo Finance
- Menampilkan perubahan harga, market cap, high/low

---

## ⚽ FOOTBALL (KLASEMEN LIGA)

### Cara Cek Klasemen

**Format:**
```
bola [nama-liga]
```

### Liga yang Tersedia

#### Premier League (Inggris)
```
bola epl
```
atau
```
bola premierleague
```

**Hasil:**
```
⚽ KLASEMEN PREMIER LEAGUE

🥇 Manchester City
   Main: 25 | Poin: 56 | GD: +35

🥈 Arsenal
   Main: 25 | Poin: 53 | GD: +28

🥉 Liverpool
   Main: 25 | Poin: 51 | GD: +24

... (Top 10 tim)

Data dari Football-Data.org
```

#### La Liga (Spanyol)
```
bola laliga
```

#### Serie A (Italia)
```
bola seriea
```

#### Bundesliga (Jerman)
```
bola bundesliga
```

#### Ligue 1 (Prancis)
```
bola ligue1
```

### Informasi yang Ditampilkan:
- 🥇 Posisi 1-3 dengan emoji medali
- Jumlah pertandingan dimainkan
- Total poin
- Goal difference (selisih gol)
- Top 10 tim klasemen

### Catatan:
Untuk data real-time lengkap, perlu API key gratis dari football-data.org
(Lihat file FOOTBALL_API_SETUP.md)

---

## 💪 KESEHATAN & FITNESS

### 1. KALKULATOR BMI (Body Mass Index)

**Format:**
```
bmi [berat] [tinggi]
```
- Berat dalam **kilogram (kg)**
- Tinggi dalam **centimeter (cm)**

#### Contoh:
```
bmi 70 170
```

**Hasil:**
```
💪 HASIL BMI

Berat: 70 kg
Tinggi: 170 cm

BMI: 24.2
Status: ✅ Normal

📝 Saran:
Pertahankan pola makan sehat dan olahraga teratur!
```

#### Kategori BMI:
- **< 18.5** = Kurus ⚠️
- **18.5 - 24.9** = Normal ✅
- **25 - 29.9** = Kelebihan Berat ⚠️
- **≥ 30** = Obesitas 🚨

#### Contoh Lain:
```
bmi 55 160      (Berat 55kg, Tinggi 160cm)
bmi 80 175      (Berat 80kg, Tinggi 175cm)
bmi 65 165      (Berat 65kg, Tinggi 165cm)
```

---

### 2. KALKULATOR KALORI HARIAN

**Format:**
```
kalori [berat] [tinggi] [umur] [jenis-kelamin]
```
- Berat: kilogram (kg)
- Tinggi: centimeter (cm)
- Umur: tahun
- Jenis kelamin: **pria** atau **wanita**

#### Contoh:
```
kalori 70 170 25 pria
```

**Hasil:**
```
🔥 KEBUTUHAN KALORI HARIAN

Data: 70kg, 170cm, 25th, pria
BMR: 1690 kkal

📊 Berdasarkan Aktivitas:

🛋️ Tidak aktif: 2028 kkal
🚶 Ringan (1-3x/minggu): 2325 kkal
🏃 Sedang (3-5x/minggu): 2620 kkal
💪 Aktif (6-7x/minggu): 2915 kkal
🏋️ Sangat aktif (2x/hari): 3211 kkal

💡 Untuk turun berat: kurangi 500 kkal/hari
💡 Untuk naik berat: tambah 500 kkal/hari
```

#### Contoh Lain:
```
kalori 60 165 30 wanita
kalori 75 180 28 pria
kalori 55 160 22 wanita
```

#### Level Aktivitas:
- **Tidak aktif**: Duduk/kerja kantoran, jarang olahraga
- **Ringan**: Olahraga ringan 1-3x seminggu
- **Sedang**: Olahraga sedang 3-5x seminggu
- **Aktif**: Olahraga berat 6-7x seminggu
- **Sangat aktif**: Atlet/olahraga 2x sehari

---

### 3. INFO NUTRISI MAKANAN

**Format:**
```
nutrisi [nama-makanan]
```

#### Makanan Indonesia (Built-in):
```
nutrisi nasi
nutrisi ayam
nutrisi telur
nutrisi tempe
nutrisi tahu
```

**Hasil:**
```
🍽️ NUTRISI: NASI

📏 Per 100g

🔥 Kalori: 130 kkal
🍖 Protein: 2.7g
🍚 Karbohidrat: 28g
🧈 Lemak: 0.3g
```

#### Makanan Internasional:
Untuk data lengkap ribuan makanan, perlu API key gratis dari api-ninjas.com

Contoh (dengan API key):
```
nutrisi chicken breast
nutrisi banana
nutrisi apple
nutrisi rice
```

---

### 4. TIPS KESEHATAN

**Format:**
```
tips sehat
```
atau
```
tips kesehatan
```

**Hasil:**
Bot akan memberikan tips kesehatan random, seperti:
```
💪 TIPS KESEHATAN

💧 Minum 8 gelas air putih setiap hari 
untuk menjaga hidrasi tubuh.
```

#### Tips Lainnya:
- Konsumsi buah dan sayur
- Tidur 7-8 jam
- Olahraga rutin
- Hindari rokok
- Kurangi screen time
- Dan lainnya (10+ tips berbeda)

---

### 5. SARAN OLAHRAGA

**Format:**
```
olahraga
```
atau
```
workout
```

**Hasil:**
Bot akan memberikan program workout random:

```
💪 PROGRAM OLAHRAGA

🏃 CARDIO

• Lari 20-30 menit
• Bersepeda 30 menit
• Lompat tali 15 menit
• Berenang 30 menit

⏰ Istirahat 60 detik antar set
💧 Jangan lupa minum air!
```

#### Kategori Workout:
- **Cardio**: Lari, bersepeda, lompat tali
- **Strength**: Push up, squat, plank
- **Flexibility**: Yoga, stretching, pilates
- **Full Body**: Burpees, mountain climbers
- **Core**: Sit ups, plank, leg raises

---

## 📱 QR CODE GENERATOR

### 1. QR CODE BIASA

**Format:**
```
qr [teks/url]
```

#### Contoh - Website:
```
qr https://google.com
```

#### Contoh - Teks:
```
qr Halo, ini pesan rahasia saya!
```

#### Contoh - Nomor Telepon:
```
qr 081234567890
```

**Hasil:**
Bot akan mengirim gambar QR Code yang bisa di-scan

---

### 2. QR CODE DENGAN LOGO

**Format:**
```
qrlogo [teks/url]
```

#### Contoh:
```
qrlogo https://instagram.com/username
qrlogo https://tokosaya.com
```

**Hasil:**
QR Code dengan desain lebih menarik, cocok untuk bisnis

---

### 3. QR CODE WARNA CUSTOM

**Format:**
```
qrwarna [teks/url]
```

#### Contoh:
```
qrwarna https://tokosaya.com
qrwarna Menu Restoran: bit.ly/menu123
```

**Hasil:**
QR Code dengan warna biru & putih (lebih eye-catching)

---

### 📋 CONTOH PENGGUNAAN QR CODE

#### WhatsApp Direct Link
```
qr https://wa.me/6281234567890
qr https://wa.me/6281234567890?text=Halo
```

#### Email
```
qr mailto:email@example.com
qr mailto:email@example.com?subject=Halo
```

#### Telepon
```
qr tel:+6281234567890
```

#### Google Maps
```
qr https://maps.google.com/?q=-6.200000,106.816666
```

#### Social Media
```
qr https://instagram.com/username
qr https://facebook.com/pagename
qr https://tiktok.com/@username
qr https://twitter.com/username
```

#### WiFi Password
```
qr WIFI:T:WPA;S:NamaWiFi;P:Password123;;
```
Format: WIFI:T:[WPA/WEP];S:[SSID];P:[Password];;

#### Link Pendek
```
qr https://bit.ly/link-anda
qr https://s.id/link-anda
```

---

## 💡 TIPS & TRIK

### 1. Chat Pribadi vs Grup
- ✅ **Chat PRIBADI** → Bot akan balas
- ❌ **Chat GRUP** → Bot tidak balas (untuk menghindari spam)

### 2. Simpan Nomor Bot
Simpan nomor bot ke kontak agar mudah diakses

### 3. Gunakan Menu
Ketik `menu` untuk melihat semua perintah yang tersedia

### 4. Case Insensitive
Perintah tidak case-sensitive:
- `MENU` = `menu` = `Menu` (semua sama)

### 5. Kombinasi Fitur
Anda bisa menggunakan berbagai fitur sesuai kebutuhan:
- Pagi: Cek saham
- Siang: Hitung kalori
- Sore: Cek crypto
- Malam: Buat QR code

---

## 📊 RINGKASAN PERINTAH CEPAT

### Dasar
```
menu                    - Lihat semua perintah
halo                    - Salam
ping                    - Cek status
info                    - Info bot
waktu                   - Cek waktu
quote                   - Quote motivasi
```

### Crypto
```
crypto bitcoin          - Harga Bitcoin
crypto ethereum         - Harga Ethereum
crypto bnb              - Harga BNB
```

### Saham
```
saham BBCA.JK           - Saham BCA
saham TLKM.JK           - Saham Telkom
saham AAPL              - Saham Apple
```

### Football
```
bola epl                - Premier League
bola laliga             - La Liga
bola seriea             - Serie A
```

### Kesehatan
```
bmi 70 170              - Hitung BMI
kalori 70 170 25 pria   - Kalori harian
nutrisi nasi            - Info nutrisi
tips sehat              - Tips kesehatan
olahraga                - Saran workout
```

### QR Code
```
qr https://google.com   - QR biasa
qrlogo https://ig.com   - QR dengan logo
qrwarna https://web.com - QR warna
```

---

## ❓ FAQ (Pertanyaan Sering Ditanya)

### Q: Bot tidak balas pesan saya?
**A:** Pastikan Anda chat **PRIBADI**, bukan di grup. Bot tidak balas pesan grup.

### Q: Harga saham/crypto tidak update?
**A:** Data real-time dari API. Jika ada masalah, coba lagi beberapa saat.

### Q: Bisa request fitur baru?
**A:** Hubungi admin bot untuk request fitur.

### Q: Bot bisa digunakan 24/7?
**A:** Ya, selama bot aktif dan terhubung.

### Q: Apakah gratis?
**A:** Ya, semua fitur gratis!

### Q: Data saya aman?
**A:** Bot tidak menyimpan data pribadi Anda.

---

## 📞 BANTUAN

Jika ada pertanyaan atau masalah:
1. Ketik `menu` untuk melihat perintah
2. Ketik `info` untuk info bot
3. Hubungi admin bot

---

## 🎉 SELAMAT MENGGUNAKAN!

Nikmati semua fitur bot WhatsApp ini:
- 💰 Cek harga crypto & saham
- ⚽ Lihat klasemen football
- 💪 Hitung BMI & kalori
- 📱 Buat QR code custom

**Jangan lupa chat PRIBADI, bukan di grup!**

---

*Panduan ini dibuat untuk memudahkan penggunaan Bot WhatsApp*

*Versi 1.0 - 2025*
