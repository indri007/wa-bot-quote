# 🔧 QR Code Feature Troubleshooting

## ✅ Fitur QR Code yang Tersedia

Bot memiliki 3 jenis QR Code:

1. **QR Basic** - `qr [text/url]`
2. **QR Logo** - `qrlogo [text/url]` (dengan margin lebih besar)
3. **QR Warna** - `qrwarna [text/url]` (warna biru & putih)

---

## 🧪 Test QR Code

### Test API

```bash
node test-qr-code.js
```

**Expected output:**
```
✅ All tests passed!
📋 Summary:
   ✅ API accessible
   ✅ Image downloaded
   ✅ Buffer created
   ✅ Base64 encoded
   ✅ File saved
   ✅ Data URI created
```

### Test via Bot

Kirim pesan ke bot:
```
qr https://google.com
```

**Expected response:**
```
⏳ Membuat QR Code...
✅ QR Code berhasil dibuat!
[Gambar QR Code]
```

---

## ❌ Masalah Umum & Solusi

### 1. QR Code Tidak Terkirim

**Gejala:**
- Bot balas "⏳ Membuat QR Code..." tapi tidak ada gambar
- Atau error "❌ Gagal membuat QR Code"

**Penyebab & Solusi:**

#### A. API Timeout
```
Error: timeout of 10000ms exceeded
```

**Solusi:**
- Cek koneksi internet
- Coba lagi dengan teks lebih pendek
- Tunggu beberapa saat lalu coba lagi

#### B. sendFile Error
```
Error: Failed to send file
```

**Solusi:**
- Pastikan bot sudah tersambung (scan QR WhatsApp)
- Restart bot: `pm2 restart wa-bot`
- Cek logs: `pm2 logs wa-bot`

#### C. Buffer Error
```
Error: Invalid buffer
```

**Solusi:**
- API mungkin down, coba lagi nanti
- Test API: `node test-qr-code.js`

---

### 2. Format Error

**Gejala:**
```
❌ Format salah!
```

**Penyebab:**
- Tidak ada teks setelah command

**Solusi:**
```
✅ Benar: qr https://google.com
❌ Salah: qr
```

---

### 3. Teks Terlalu Panjang

**Gejala:**
- QR Code terlalu kompleks
- Sulit di-scan

**Solusi:**
- Gunakan URL shortener (bit.ly, tinyurl)
- Maksimal 500 karakter untuk QR yang mudah di-scan

---

### 4. QR Code Tidak Bisa Di-scan

**Gejala:**
- QR Code terkirim tapi tidak bisa di-scan

**Penyebab:**
- Teks terlalu panjang
- Karakter spesial yang tidak didukung

**Solusi:**
- Gunakan teks lebih pendek
- Hindari emoji atau karakter unicode kompleks
- Gunakan URL yang sudah di-encode

---

## 🔍 Debugging

### Cek Logs Bot

```bash
# Lihat logs real-time
pm2 logs wa-bot

# Atau jika pakai node langsung
# Lihat console output
```

**Log yang diharapkan:**
```
📱 QR Code command detected: qr https://google.com
🔍 Generating QR for: https://google.com
📡 API URL: https://api.qrserver.com/v1/create-qr-code/...
✅ QR downloaded, size: 534 bytes
🔐 Base64 length: 712
✅ QR Code sent successfully
```

**Log jika error:**
```
❌ Error generating QR: timeout of 10000ms exceeded
```

---

## 📋 Checklist Troubleshooting

- [ ] Bot sudah running (`pm2 status` atau cek process)
- [ ] Bot sudah scan QR WhatsApp (tersambung)
- [ ] Internet connection OK
- [ ] Test API: `node test-qr-code.js` berhasil
- [ ] Format command benar: `qr [text]`
- [ ] Teks tidak terlalu panjang (< 500 char)
- [ ] Cek logs untuk error detail

---

## 🧪 Test Cases

### Test 1: URL Simple
```
qr https://google.com
```
**Expected:** ✅ QR Code terkirim

### Test 2: URL Panjang
```
qr https://www.google.com/search?q=test+query+with+parameters
```
**Expected:** ✅ QR Code terkirim

### Test 3: Teks Biasa
```
qr Halo ini adalah teks untuk QR Code
```
**Expected:** ✅ QR Code terkirim

### Test 4: Nomor WhatsApp
```
qr https://wa.me/628123456789
```
**Expected:** ✅ QR Code terkirim, bisa di-scan untuk chat

### Test 5: QR Logo
```
qrlogo https://tokosaya.com
```
**Expected:** ✅ QR Code dengan margin lebih besar

### Test 6: QR Warna
```
qrwarna https://instagram.com/username
```
**Expected:** ✅ QR Code warna biru & putih

---

## 🔧 Perbaikan Kode

### Versi Terbaru (Sudah Diperbaiki)

Fitur QR Code sudah menggunakan:
- ✅ `sendFile` (lebih reliable dari `sendImage`)
- ✅ Timeout 10 detik
- ✅ Error handling yang baik
- ✅ Logging untuk debugging
- ✅ Base64 encoding yang benar

### Jika Masih Error

Coba alternatif API:

```javascript
// Alternatif 1: QR Code Monkey
const qrUrl = `https://api.qrcode-monkey.com/qr/custom?data=${encodeURIComponent(text)}&size=500`;

// Alternatif 2: QR Code Generator
const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${encodeURIComponent(text)}`;
```

---

## 💡 Tips

1. **Gunakan URL Shortener** untuk link panjang
2. **Test lokal dulu** dengan `node test-qr-code.js`
3. **Cek logs** untuk error detail
4. **Restart bot** jika ada masalah: `pm2 restart wa-bot`
5. **Gunakan teks simple** untuk test pertama

---

## 📞 Support

Jika masih ada masalah:

1. **Cek logs:**
   ```bash
   pm2 logs wa-bot --lines 50
   ```

2. **Test API:**
   ```bash
   node test-qr-code.js
   ```

3. **Restart bot:**
   ```bash
   pm2 restart wa-bot
   ```

4. **Cek koneksi:**
   - Internet OK?
   - Bot tersambung ke WhatsApp?
   - API qrserver.com accessible?

---

## ✅ Kesimpulan

Fitur QR Code sudah:
- ✅ Tested dan working
- ✅ Error handling lengkap
- ✅ Logging untuk debugging
- ✅ 3 variasi QR (basic, logo, warna)
- ✅ Dokumentasi lengkap

Jika ada error, cek logs dan ikuti troubleshooting di atas! 🚀
