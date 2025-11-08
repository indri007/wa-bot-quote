# 💱 Setup Currency Exchange API

Panduan untuk mengaktifkan fitur konversi mata uang dengan Fixer.io API (GRATIS!)

## 🎯 Fitur Konversi Mata Uang

Bot bisa konversi berbagai mata uang:
- 💵 Dollar (USD) ke Rupiah (IDR)
- 💶 Euro (EUR) ke Rupiah
- 💷 Pound (GBP) ke Rupiah
- 💴 Yen (JPY) ke Rupiah
- Dan 170+ mata uang lainnya!

---

## 🔑 Cara Mendapatkan API Key (GRATIS)

### Langkah 1: Daftar Fixer.io

1. Buka: https://fixer.io/signup/free
2. Isi form pendaftaran:
   - **Email:** Masukkan email Anda
   - **Password:** Buat password
3. Klik **"Get Free API Key"**

### Langkah 2: Verifikasi Email

1. Cek email Anda
2. Klik link verifikasi dari Fixer.io
3. Login ke dashboard

### Langkah 3: Copy API Key

1. Setelah login, Anda akan melihat API key di dashboard
2. **Copy API Key** (format: abc123def456...)

### Langkah 4: Masukkan ke Bot

1. Buka file `bot.js`
2. Cari baris:
```javascript
const apiKey = 'YOUR_FIXER_API_KEY';
```

3. Ganti dengan API key Anda:
```javascript
const apiKey = 'abc123def456'; // API key Anda
```

4. Save file

### Langkah 5: Restart Bot

```bash
# Stop bot (Ctrl+C)
# Lalu jalankan lagi:
npm start
```

---

## 💬 Cara Pakai

### Format Perintah:
```
kurs [mata uang]
kurs [jumlah] [dari] [ke]
```

### Contoh:

#### Kurs Dollar ke Rupiah
```
kurs USD
```

**Hasil:**
```
💱 KONVERSI MATA UANG

1 USD = 15,750.00 IDR

📊 Rate: 1 USD = 15,750.0000 IDR
📅 Update: 08/11/2025

Data dari Fixer.io
```

#### Konversi Jumlah Tertentu
```
kurs 100 USD IDR
```

**Hasil:**
```
💱 KONVERSI MATA UANG

100 USD = 1,575,000.00 IDR

📊 Rate: 1 USD = 15,750.0000 IDR
📅 Update: 08/11/2025

Data dari Fixer.io
```

#### Konversi Mata Uang Lain
```
kurs 50 EUR IDR      (Euro ke Rupiah)
kurs 1000 JPY IDR    (Yen ke Rupiah)
kurs 100 GBP IDR     (Pound ke Rupiah)
kurs 500 SGD IDR     (Dollar Singapura ke Rupiah)
kurs 200 MYR IDR     (Ringgit ke Rupiah)
```

#### Konversi Antar Mata Uang Asing
```
kurs 100 USD EUR     (Dollar ke Euro)
kurs 50 GBP USD      (Pound ke Dollar)
kurs 1000 JPY USD    (Yen ke Dollar)
```

---

## 💰 Mata Uang Populer

### Kode Mata Uang:

**Asia:**
- `IDR` - Rupiah Indonesia
- `SGD` - Dollar Singapura
- `MYR` - Ringgit Malaysia
- `THB` - Baht Thailand
- `PHP` - Peso Filipina
- `VND` - Dong Vietnam
- `JPY` - Yen Jepang
- `CNY` - Yuan China
- `KRW` - Won Korea
- `INR` - Rupee India

**Amerika & Eropa:**
- `USD` - Dollar Amerika
- `EUR` - Euro
- `GBP` - Pound Inggris
- `CAD` - Dollar Kanada
- `AUD` - Dollar Australia
- `NZD` - Dollar Selandia Baru
- `CHF` - Franc Swiss

**Timur Tengah:**
- `SAR` - Riyal Saudi
- `AED` - Dirham UAE
- `QAR` - Riyal Qatar

**Cryptocurrency (jika didukung):**
- `BTC` - Bitcoin
- `ETH` - Ethereum

---

## 📊 Limit API

### Free Plan:
- **100 requests per bulan**
- Update data setiap jam
- 170+ mata uang
- Akurasi tinggi

### Paid Plans:
- **Basic:** $9.99/bulan - 1,000 requests
- **Professional:** $39.99/bulan - 10,000 requests
- **Professional Plus:** $79.99/bulan - 100,000 requests

---

## 🎨 Kustomisasi

### 1. Ubah Mata Uang Default

Edit di `bot.js`:
```javascript
let from = 'EUR'; // Ganti USD dengan EUR
let to = 'IDR';
```

### 2. Tambah Mata Uang Crypto

Jika Fixer support crypto:
```javascript
if (parts.length === 2) {
  from = parts[1].toUpperCase();
  to = 'USD'; // Default ke USD untuk crypto
}
```

### 3. Format Angka

Ubah format tampilan:
```javascript
result.toLocaleString('en-US', {
  style: 'currency',
  currency: to
})
```

### 4. Historical Rates

Untuk kurs tanggal tertentu:
```javascript
const response = await axios.get(`https://api.apilayer.com/fixer/${date}`, {
  params: {
    base: from,
    symbols: to
  },
  headers: {
    'apikey': apiKey
  }
});
```

---

## 🧪 Testing

### Test Manual:

1. Jalankan bot
2. Chat pribadi ke bot:
```
kurs USD
```

3. Bot akan kirim kurs terkini

### Test Berbagai Konversi:

```
kurs 100 USD IDR
kurs 50 EUR IDR
kurs 1000 JPY IDR
kurs 100 SGD IDR
kurs 200 MYR IDR
```

---

## ⚠️ Troubleshooting

### Error: Invalid API key
- API key salah atau belum diverifikasi
- Cek email untuk verifikasi
- Copy API key yang benar dari dashboard

### Error: Monthly limit exceeded
- Sudah mencapai 100 requests bulan ini
- Tunggu bulan depan atau upgrade plan

### Mata uang tidak ditemukan
- Cek kode mata uang (harus 3 huruf)
- Gunakan kode standar ISO 4217
- Contoh: USD, EUR, IDR (bukan Rp, $, €)

### Rate tidak akurat
- Free plan update setiap jam
- Untuk real-time, perlu paid plan
- Atau gunakan API lain

---

## 🌟 Fitur Tambahan (Opsional)

### 1. Kurs Multiple Mata Uang

```javascript
// Tampilkan USD ke berbagai mata uang
const currencies = ['IDR', 'EUR', 'GBP', 'JPY'];
```

### 2. Alert Kurs

Kirim notifikasi jika kurs mencapai target:
```javascript
if (rate >= targetRate) {
  // Kirim notifikasi
}
```

### 3. Historical Chart

Tampilkan grafik pergerakan kurs 7 hari terakhir.

### 4. Calculator

Buat kalkulator konversi interaktif.

---

## 📝 Alternatif API

Jika Fixer.io tidak cocok, bisa pakai:

### 1. ExchangeRate-API
- Website: https://www.exchangerate-api.com/
- Free: 1,500 requests/bulan
- Update setiap 24 jam

### 2. CurrencyAPI
- Website: https://currencyapi.com/
- Free: 300 requests/bulan
- Real-time rates

### 3. Open Exchange Rates
- Website: https://openexchangerates.org/
- Free: 1,000 requests/bulan
- 200+ mata uang

### 4. Currency Layer (by Fixer)
- Website: https://currencylayer.com/
- Free: 100 requests/bulan
- Sama dengan Fixer

---

## 🎉 Kesimpulan

Dengan Fixer.io API:
- ✅ Gratis 100 requests/bulan
- ✅ 170+ mata uang
- ✅ Data akurat dari bank sentral
- ✅ Update setiap jam
- ✅ Setup cuma 5 menit

---

## 💡 Tips Penggunaan

1. **Hemat Quota:** Cache kurs untuk 1 jam
2. **Batch Request:** Ambil multiple currencies sekaligus
3. **Fallback:** Gunakan API alternatif jika limit habis
4. **Monitor:** Track penggunaan API di dashboard

---

## 📚 Referensi

- Dokumentasi: https://fixer.io/documentation
- Kode Mata Uang: https://en.wikipedia.org/wiki/ISO_4217
- Dashboard: https://fixer.io/dashboard

---

Selamat bertransaksi! 💱✨
