# 📱 Panduan QR Code Generator

Bot dilengkapi dengan fitur generator QR Code dengan berbagai desain!

## ✨ Fitur QR Code:

### 1. QR Code Biasa
```
qr https://google.com
qr Halo, ini pesan saya!
qr 081234567890
```
- QR Code hitam putih standar
- Ukuran 500x500 pixel
- Bisa untuk URL, teks, nomor telepon, dll

### 2. QR Code dengan Logo
```
qrlogo https://instagram.com/username
qrlogo https://wa.me/6281234567890
```
- QR Code dengan desain lebih menarik
- Margin lebih besar untuk estetika
- Cocok untuk bisnis/promosi

### 3. QR Code Warna Custom
```
qrwarna https://tokosaya.com
qrwarna Menu Restoran: bit.ly/menu123
```
- QR Code dengan warna biru & putih
- Lebih eye-catching
- Tetap mudah di-scan

## 📋 Apa yang Bisa Dibuat QR Code?

### 🌐 Website/URL
```
qr https://google.com
qr https://tokopedia.com/namatok
```

### 📱 WhatsApp Direct
```
qr https://wa.me/6281234567890
qr https://wa.me/6281234567890?text=Halo
```

### 📧 Email
```
qr mailto:email@example.com
qr mailto:email@example.com?subject=Halo
```

### 📞 Telepon
```
qr tel:+6281234567890
```

### 📍 Lokasi/Maps
```
qr https://maps.google.com/?q=-6.200000,106.816666
qr geo:-6.200000,106.816666
```

### 📝 Teks Biasa
```
qr Ini adalah pesan rahasia
qr WIFI:T:WPA;S:NamaWiFi;P:Password123;;
```

### 📱 Social Media
```
qr https://instagram.com/username
qr https://facebook.com/pagename
qr https://twitter.com/username
qr https://tiktok.com/@username
```

## 💡 Tips Penggunaan:

### Untuk Bisnis:
```
qrlogo https://tokosaya.com
```
- Gunakan untuk kartu nama digital
- Menu restoran
- Link produk
- Promosi diskon

### Untuk Event:
```
qrwarna https://bit.ly/daftar-event
```
- Pendaftaran event
- Absensi
- Feedback form

### Untuk WiFi:
```
qr WIFI:T:WPA;S:NamaWiFi;P:Password123;;
```
- Share WiFi tanpa ketik password
- Format: WIFI:T:[WPA/WEP];S:[SSID];P:[Password];;

### Untuk vCard (Kontak):
```
qr BEGIN:VCARD
VERSION:3.0
FN:Nama Lengkap
TEL:+6281234567890
EMAIL:email@example.com
END:VCARD
```

## 🎨 Kustomisasi Warna (Advanced):

Jika ingin warna custom lain, edit di bot.js:

```javascript
// Format: color=R-G-B&bgcolor=R-G-B
// Merah: color=255-0-0
// Hijau: color=0-255-0
// Biru: color=0-0-255
// Ungu: color=128-0-128
```

Contoh di bot.js:
```javascript
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}&color=255-0-0&bgcolor=255-255-255`;
```

## 📊 Spesifikasi QR Code:

- **Ukuran**: 500x500 pixel (HD)
- **Format**: PNG
- **API**: QR Server API (Gratis, tanpa limit)
- **Scan Rate**: Tinggi (mudah di-scan)
- **Kompatibilitas**: Semua QR scanner

## ⚡ Keunggulan:

✅ Gratis tanpa batas
✅ Tidak perlu API key
✅ Kualitas tinggi (500x500px)
✅ Support semua jenis data
✅ Langsung dikirim sebagai gambar
✅ Bisa di-download dan di-print

## 🔥 Use Cases Populer:

1. **Kartu Nama Digital**
   ```
   qrlogo https://linktr.ee/username
   ```

2. **Menu Restoran**
   ```
   qrwarna https://bit.ly/menu-restoran
   ```

3. **Link Pembayaran**
   ```
   qr https://payment.link/invoice123
   ```

4. **Undangan Digital**
   ```
   qrlogo https://undangan.com/nama-acara
   ```

5. **Feedback Form**
   ```
   qr https://forms.gle/xxxxx
   ```

Selamat berkreasi dengan QR Code! 📱✨
