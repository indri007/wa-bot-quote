# 📚 FITUR CEK STOK BUKU

Bot WhatsApp sekarang bisa cek ketersediaan buku dari Google Drive!

## 🎯 Cara Kerja:

1. Pelanggan chat: `buku Atomic Habit`
2. Bot cek ke Google Drive folder "persediaan buku"
3. Jika buku ada → Bot balas "READY" + info pembayaran
4. Jika tidak ada → Bot balas "TIDAK READY"

---

## 🚀 SETUP (Sekali Saja)

### Langkah 1: Setup Google Drive API

Ikuti panduan di file: **SETUP_GOOGLE_DRIVE.md**

Ringkasan:
1. Buka: https://console.cloud.google.com/
2. Login: digimetateam@gmail.com
3. Buat project & enable Google Drive API
4. Download credentials.json
5. Taruh di folder bot-wa

### Langkah 2: Authorize

```bash
cd bot-wa
node authorize-drive.js
```

Ikuti instruksi di layar untuk authorize.

### Langkah 3: Test

```bash
node test-book.js
```

Untuk test apakah koneksi ke Drive berhasil.

---

## 💬 CARA PAKAI (Untuk Pelanggan)

### Format Perintah:
```
buku [judul buku]
```

### Contoh:

#### Cek Atomic Habit
```
buku Atomic Habit
```

**Jika READY:**
```
✅ BUKU READY!

📚 Judul: Atomic_Habit.pdf
📦 Status: TERSEDIA

💰 Silakan lakukan pembayaran:
Scan QR Code di katalog atau hubungi admin 
untuk info pembayaran.

Terima kasih! 🙏
```

**Jika TIDAK READY:**
```
❌ BUKU TIDAK READY

📚 Judul: Atomic Habit
📦 Status: TIDAK TERSEDIA

Maaf, buku ini sedang tidak tersedia.
Silakan coba judul lain atau hubungi admin 
untuk info lebih lanjut.
```

#### Contoh Lain:
```
buku Harry Potter
buku Rich Dad Poor Dad
buku Sapiens
buku 48 Laws of Power
```

---

## 📁 FORMAT FILE DI GOOGLE DRIVE

Bot akan mencari file yang **mengandung** kata kunci judul buku.

### Contoh Nama File yang Cocok:

Jika pelanggan ketik: `buku Atomic Habit`

Bot akan menemukan file:
- ✅ `Atomic_Habit.pdf`
- ✅ `Atomic Habit - James Clear.pdf`
- ✅ `atomic-habit.pdf`
- ✅ `ATOMIC HABIT.pdf`

### Tips Penamaan File:
- Gunakan nama yang jelas
- Bisa pakai underscore atau spasi
- Case insensitive (huruf besar/kecil sama saja)

---

## 🔧 KUSTOMISASI

### 1. Tambah QR Code Pembayaran

Edit file `bot.js`, cari bagian:
```javascript
// Optional: Kirim QR Code pembayaran
// Uncomment jika sudah ada QR pembayaran
```

Uncomment dan ganti dengan:
```javascript
await client.sendImage(
  pengirim, 
  './qr-pembayaran.png', 
  'qr-pembayaran.png', 
  'QR Code Pembayaran'
);
```

Pastikan file `qr-pembayaran.png` ada di folder bot-wa.

### 2. Ubah Pesan

Edit bagian `pesanReady` dan `pesanTidakReady` di `bot.js` sesuai kebutuhan.

### 3. Tambah Info Harga

Jika ingin tampilkan harga, edit pesan:
```javascript
const pesanReady = `✅ *BUKU READY!*\n\n` +
  `📚 Judul: ${result.fileName}\n` +
  `📦 Status: TERSEDIA\n` +
  `💰 Harga: Rp 50.000\n\n` +
  `Silakan lakukan pembayaran...`;
```

---

## 🧪 TESTING

### Test Manual:

1. Jalankan bot:
```bash
npm start
```

2. Chat pribadi ke bot:
```
buku Atomic Habit
```

3. Bot akan cek ke Google Drive dan balas.

### Test Script:

```bash
node test-book.js
```

Akan menampilkan semua buku yang ada di folder.

---

## ⚠️ TROUBLESHOOTING

### Error: credentials.json not found
- Download credentials.json dari Google Cloud Console
- Taruh di folder bot-wa

### Error: token.json not found
- Jalankan: `node authorize-drive.js`
- Authorize dengan akun digimetateam@gmail.com

### Bot balas "Fitur belum disetup"
- Setup Google Drive API dulu
- Ikuti SETUP_GOOGLE_DRIVE.md

### Buku tidak ditemukan padahal ada
- Cek nama file di Google Drive
- Pastikan file ada di folder yang benar
- Coba ketik judul yang lebih spesifik

### Error: invalid_grant
- Token expired
- Jalankan ulang: `node authorize-drive.js`

---

## 📊 FITUR TAMBAHAN (Opsional)

### 1. List Semua Buku

Tambah perintah:
```
list buku
```

Bot akan tampilkan semua buku yang tersedia.

### 2. Kategori Buku

Buat folder per kategori di Drive:
- Folder "Novel"
- Folder "Bisnis"
- Folder "Self Help"

### 3. Notifikasi Admin

Ketika ada yang request buku, kirim notifikasi ke admin.

---

## 🎉 KESIMPULAN

Fitur ini memudahkan:
- ✅ Pelanggan cek stok buku otomatis
- ✅ Tidak perlu cek manual ke Drive
- ✅ Respon cepat 24/7
- ✅ Mengurangi pertanyaan berulang

---

## 📝 CATATAN PENTING

1. **Setup sekali saja** - Setelah setup, fitur langsung jalan
2. **Update stok** - Tinggal upload/hapus file di Google Drive
3. **Otomatis** - Bot langsung cek ke Drive real-time
4. **Aman** - credentials.json tidak diupload ke GitHub

---

Selamat menggunakan fitur cek buku! 📚🎉
