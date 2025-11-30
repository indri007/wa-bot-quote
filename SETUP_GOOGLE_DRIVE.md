# 📁 Setup Google Drive API

Panduan lengkap untuk upload file ke Google Drive secara otomatis.

## 🎯 Langkah-langkah:

### 1. Buat Project di Google Cloud Console

1. Buka: https://console.cloud.google.com/
2. Login dengan akun: **digimetateam@gmail.com**
3. Klik **"Select a project"** → **"New Project"**
4. Nama project: **Bot WhatsApp Drive**
5. Klik **"Create"**

### 2. Enable Google Drive API

1. Di dashboard, klik **"Enable APIs and Services"**
2. Cari: **"Google Drive API"**
3. Klik **"Google Drive API"**
4. Klik **"Enable"**

### 3. Buat Credentials

1. Klik **"Credentials"** di sidebar kiri
2. Klik **"Create Credentials"** → **"OAuth client ID"**
3. Jika diminta configure consent screen:
   - Klik **"Configure Consent Screen"**
   - Pilih **"External"**
   - Klik **"Create"**
   - App name: **Bot WhatsApp**
   - User support email: **digimetateam@gmail.com**
   - Developer email: **digimetateam@gmail.com**
   - Klik **"Save and Continue"**
   - Skip "Scopes" → **"Save and Continue"**
   - Add test users: **digimetateam@gmail.com**
   - Klik **"Save and Continue"**
   - Klik **"Back to Dashboard"**

4. Kembali ke **"Credentials"**
5. Klik **"Create Credentials"** → **"OAuth client ID"**
6. Application type: **"Desktop app"**
7. Name: **Bot WhatsApp Desktop**
8. Klik **"Create"**

### 4. Download Credentials

1. Setelah dibuat, akan muncul popup
2. Klik **"Download JSON"**
3. Rename file menjadi: **credentials.json**
4. Copy file ke folder: `D:\Downloads\wa-automate-nodejs-master\bot-wa\`

### 5. Authorize Aplikasi

Buka Command Prompt di folder bot-wa:

```bash
cd D:\Downloads\wa-automate-nodejs-master\bot-wa
node authorize-drive.js
```

**Yang akan terjadi:**
1. Script akan menampilkan URL
2. Copy URL tersebut
3. Paste di browser
4. Login dengan akun: **digimetateam@gmail.com**
5. Klik **"Allow"** / **"Izinkan"**
6. Copy kode yang muncul
7. Paste kode di Command Prompt
8. Tekan Enter

**Hasil:**
```
✅ Token berhasil disimpan ke token.json
🎉 Authorization berhasil!
```

### 6. Upload File

Sekarang jalankan:

```bash
node upload-to-drive.js
```

**Hasil:**
```
🚀 Memulai upload ke Google Drive...
📤 Mengupload file...

✅ Upload berhasil!
📄 Nama file: PANDUAN_BOT_WHATSAPP.md
🔗 Link: https://drive.google.com/file/d/...
🎉 File sudah tersimpan di Google Drive Anda!
```

File akan tersimpan di folder:
https://drive.google.com/drive/folders/1AvdFg9yLWyQg9UL1jKJUNU6KESjd-ugO

---

## 📝 Ringkasan Perintah:

```bash
# 1. Install dependencies (sudah dilakukan)
npm install googleapis

# 2. Authorize (sekali saja)
node authorize-drive.js

# 3. Upload file
node upload-to-drive.js
```

---

## ⚠️ Troubleshooting:

### Error: credentials.json not found
- Download credentials.json dari Google Cloud Console
- Letakkan di folder bot-wa

### Error: invalid_grant
- Token expired
- Jalankan ulang: `node authorize-drive.js`

### Error: File not found
- Pastikan file PANDUAN_LENGKAP_BOT_WHATSAPP.md ada di folder bot-wa

---

## 🔒 Keamanan:

**JANGAN upload file ini ke GitHub:**
- credentials.json
- token.json

File sudah ditambahkan ke .gitignore

---

## 🎉 Selesai!

Setelah setup sekali, Anda bisa upload file kapan saja dengan:
```bash
node upload-to-drive.js
```

Mudah kan? 😊
