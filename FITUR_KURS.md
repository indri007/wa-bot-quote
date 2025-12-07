# 💱 Fitur Kurs Mata Uang dengan AI

## 🎯 Fitur

Bot dapat:
1. ✅ Menampilkan kurs mata uang real-time
2. ✅ Konversi mata uang
3. ✅ Analisis kurs dengan Gemini AI (optional)
4. ✅ Data dari ExchangeRate-API (gratis, no API key needed)

---

## 📱 Cara Pakai

### **1. Lihat Kurs Hari Ini**

```
kurs USD
```

**Output:**
```
💱 KURS USD HARI INI

IDR: 16,679.20
EUR: 0.86
GBP: 0.75
JPY: 155.20
CNY: 7.08
SGD: 1.30
MYR: 4.11
AUD: 1.51

📅 Update: 2025-12-07
```

---

### **2. Cek Rate Antar Mata Uang**

```
kurs USD IDR
```

**Output:**
```
💱 KURS MATA UANG

📊 NILAI TUKAR
1 USD = 16,679.20 IDR

📈 RATE
1 USD = 16679.2000 IDR
1 IDR = 0.0001 USD

📅 Update: 2025-12-07

[Analisis AI jika tersedia]

💡 Powered by Gemini AI
📊 Data dari ExchangeRate-API
```

---

### **3. Konversi Jumlah Tertentu**

```
kurs 100 USD IDR
```

**Output:**
```
💱 KURS MATA UANG

📊 NILAI TUKAR
100 USD = 1,667,920.00 IDR

📈 RATE
1 USD = 16679.2000 IDR
1 IDR = 0.0001 USD

📅 Update: 2025-12-07

[Analisis AI jika tersedia]
```

---

## 💡 Contoh Penggunaan

### **Mata Uang Populer:**

```
kurs USD          → Kurs USD hari ini
kurs EUR          → Kurs EUR hari ini
kurs GBP          → Kurs GBP hari ini
kurs JPY          → Kurs JPY hari ini
```

### **Konversi:**

```
kurs USD IDR      → Rate USD ke IDR + AI analysis
kurs EUR USD      → Rate EUR ke USD + AI analysis
kurs 100 USD IDR  → Konversi 100 USD ke IDR
kurs 50 EUR USD   → Konversi 50 EUR ke USD
kurs 1000 IDR USD → Konversi 1000 IDR ke USD
```

---

## 🤖 Analisis AI (Optional)

Jika `GEMINI_API_KEY` tersedia, bot akan memberikan:

1. **Kondisi Saat Ini** - Analisis nilai tukar terkini
2. **Faktor yang Mempengaruhi** - Faktor ekonomi yang berpengaruh
3. **Outlook Jangka Pendek** - Prediksi pergerakan
4. **Tips untuk Pengguna** - Saran praktis

**Contoh Analisis AI:**

```
💱 KURS MATA UANG

📊 NILAI TUKAR
100 USD = 1,667,920.00 IDR

📈 RATE
1 USD = 16679.2000 IDR
1 IDR = 0.0001 USD

📅 Update: 2025-12-07

📊 KONDISI SAAT INI
Nilai tukar USD/IDR saat ini berada di level 16,679, 
menunjukkan Rupiah yang relatif stabil terhadap Dolar AS.

💡 FAKTOR YANG MEMPENGARUHI
• Kebijakan moneter Bank Indonesia
• Inflasi dan pertumbuhan ekonomi
• Harga komoditas global
• Sentimen pasar global

🔮 OUTLOOK JANGKA PENDEK
Rupiah diperkirakan akan bergerak dalam range 16,500-17,000
dalam beberapa minggu ke depan, tergantung data ekonomi.

💡 TIPS UNTUK PENGGUNA
• Pantau berita ekonomi untuk timing yang tepat
• Pertimbangkan hedging untuk transaksi besar
• Gunakan limit order untuk rate yang lebih baik

💡 Powered by Gemini AI
📊 Data dari ExchangeRate-API
```

---

## 🌍 Mata Uang yang Didukung

Bot mendukung 160+ mata uang, termasuk:

### **Populer:**
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- CNY (Chinese Yuan)
- IDR (Indonesian Rupiah)
- SGD (Singapore Dollar)
- MYR (Malaysian Ringgit)
- AUD (Australian Dollar)
- CAD (Canadian Dollar)

### **Asia:**
- THB (Thai Baht)
- PHP (Philippine Peso)
- VND (Vietnamese Dong)
- KRW (South Korean Won)
- INR (Indian Rupee)

### **Crypto (jika didukung):**
- BTC (Bitcoin)
- ETH (Ethereum)

---

## 📊 Sumber Data

- **API**: ExchangeRate-API (gratis, no API key)
- **Update**: Real-time, update setiap hari
- **Akurasi**: Data dari bank sentral dan pasar forex
- **Limit**: Unlimited requests (free tier)

---

## 🔧 Technical Details

### **API Endpoint:**
```
https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}
```

### **Response Format:**
```json
{
  "base": "USD",
  "date": "2025-12-07",
  "rates": {
    "IDR": 16679.20,
    "EUR": 0.86,
    "GBP": 0.75,
    ...
  }
}
```

---

## ⚠️ Disclaimer

- Data kurs untuk referensi saja
- Untuk transaksi resmi, cek dengan bank atau money changer
- Rate dapat berubah sewaktu-waktu
- Analisis AI bersifat edukatif, bukan saran investasi

---

## 🎉 Selesai!

Fitur kurs mata uang dengan AI sudah siap digunakan!

**Test command:**
```
kurs USD
kurs 100 USD IDR
kurs EUR USD
```
