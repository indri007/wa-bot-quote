# 🤖 Bot WhatsApp Otomatis

Bot WhatsApp sederhana yang bisa membalas pesan secara otomatis.

## 📋 Cara Install

1. Masuk ke folder bot:
```bash
cd bot-wa
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Cara Menjalankan

Jalankan bot dengan perintah:
```bash
npm start
```

Atau:
```bash
node bot.js
```

## 📱 Cara Pakai

1. Jalankan bot
2. Scan QR code yang muncul dengan WhatsApp Anda
3. Bot siap menerima pesan!

## 💬 Perintah Bot

Kirim pesan ke nomor bot:

- `halo` - Salam pembuka
- `menu` - Lihat daftar perintah
- `info` - Informasi bot
- `waktu` - Cek waktu sekarang
- `quote` - Dapatkan quote motivasi
- `ping` - Cek status bot

## ⚙️ Kustomisasi

Edit file `bot.js` untuk menambah perintah atau mengubah respon bot sesuai kebutuhan Anda.

## 📝 Catatan

- Bot akan membuat folder `bot-wa-saya` untuk menyimpan sesi
- Setelah scan QR pertama kali, bot akan otomatis login di jalankan berikutnya
- Untuk logout, hapus folder sesi tersebut

## 🛠️ Troubleshooting

Jika ada error:
1. Pastikan Node.js sudah terinstall (minimal v12.18.3)
2. Hapus folder `node_modules` dan `bot-wa-saya`, lalu install ulang
3. Pastikan koneksi internet stabil

Selamat menggunakan! 🎉
