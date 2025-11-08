# 💪 Panduan Setup Health & Fitness API

Bot sudah dilengkapi dengan fitur kesehatan dan kebugaran!

## ✅ Fitur yang Sudah Bisa Digunakan (Tanpa API Key):

### 1. Kalkulator BMI
```
bmi 70 170
```
- Hitung Body Mass Index
- Kategori: Kurus, Normal, Kelebihan Berat, Obesitas
- Saran kesehatan otomatis

### 2. Kalkulator Kalori Harian
```
kalori 70 170 25 pria
```
- Hitung kebutuhan kalori berdasarkan aktivitas
- Menggunakan rumus Mifflin-St Jeor
- Saran untuk turun/naik berat badan

### 3. Tips Kesehatan Random
```
tips sehat
```
- Tips kesehatan acak
- Motivasi hidup sehat

### 4. Saran Olahraga
```
olahraga
```
- Program workout random
- Cardio, Strength, Flexibility, Full Body, Core

### 5. Info Nutrisi Makanan (Terbatas)
```
nutrisi nasi
nutrisi ayam
nutrisi telur
```
- Data lokal untuk makanan Indonesia
- Kalori, protein, karbohidrat, lemak

## 🔑 Untuk Fitur Nutrisi Lengkap (Opsional):

Jika ingin data nutrisi lebih lengkap dari ribuan makanan:

### 1. Daftar API Key Gratis

1. Buka: https://api-ninjas.com/register
2. Daftar dengan email
3. Verifikasi email
4. Login ke dashboard

### 2. Dapatkan API Key

1. Setelah login, buka: https://api-ninjas.com/profile
2. Copy API key Anda

### 3. Masukkan ke Bot

1. Buka file `bot.js`
2. Cari baris:
```javascript
'X-Api-Key': 'YOUR_API_NINJAS_KEY'
```
3. Ganti dengan API key Anda:
```javascript
'X-Api-Key': 'abc123...'
```
4. Save dan restart bot

## 📊 Contoh Penggunaan:

### BMI Calculator
```
User: bmi 65 165
Bot: 
💪 HASIL BMI

Berat: 65 kg
Tinggi: 165 cm

BMI: 23.9
Status: ✅ Normal

📝 Saran:
Pertahankan pola makan sehat dan olahraga teratur!
```

### Kalori Calculator
```
User: kalori 70 170 25 pria
Bot:
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

### Nutrisi Makanan
```
User: nutrisi chicken breast
Bot:
🍽️ NUTRISI: CHICKEN BREAST

📏 Porsi: 100g

🔥 Kalori: 165 kkal
🍖 Protein: 31g
🍚 Karbohidrat: 0g
🧈 Lemak: 3.6g
🍬 Gula: 0g
🧂 Sodium: 74mg

Data dari API Ninjas
```

## 💡 Tips:

- Semua fitur dasar sudah bisa digunakan tanpa API key
- API key hanya untuk data nutrisi lebih lengkap
- Free tier API Ninjas: 10,000 requests/bulan
- Cukup untuk penggunaan personal!

Selamat hidup sehat! 💪🥗
