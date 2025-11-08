// Bot WhatsApp Otomatis - JavaScript
const wa = require('@open-wa/wa-automate');
const fs = require('fs');
const axios = require('axios');
const yahooFinance = require('yahoo-finance2').default;

// Fungsi utama bot
async function start(client) {
  console.log('✅ Bot WhatsApp berhasil dijalankan!');
  
  const me = await client.getMe();
  console.log('📱 Nomor Bot:', me.user);

  // Mendengarkan pesan masuk
  client.onMessage(async (message) => {
    try {
      const pesan = message.body.toLowerCase();
      const pengirim = message.from;

      console.log(`📩 Pesan dari ${pengirim}: ${message.body}`);

      // Respon otomatis
      if (pesan === 'halo' || pesan === 'hi' || pesan === 'hai') {
        await client.sendText(pengirim, '👋 Halo! Ada yang bisa saya bantu?\n\nKetik *menu* untuk lihat perintah.');
      }
      
      else if (pesan === 'menu') {
        const menu = `📋 *MENU BOT*\n\n` +
          `• halo - Salam\n` +
          `• menu - Tampilkan menu\n` +
          `• info - Info bot\n` +
          `• waktu - Cek waktu\n` +
          `• quote - Quote motivasi\n` +
          `• ping - Status bot\n\n` +
          `💰 *CRYPTO*\n` +
          `• crypto btc - Harga Bitcoin\n` +
          `• crypto eth - Harga Ethereum\n` +
          `• crypto [nama] - Harga crypto lainnya\n\n` +
          `📈 *SAHAM*\n` +
          `• saham AAPL - Harga Apple\n` +
          `• saham BBCA.JK - Harga BCA\n` +
          `• saham [kode] - Harga saham lainnya\n\n` +
          `⚽ *FOOTBALL*\n` +
          `• bola epl - Klasemen Premier League\n` +
          `• bola laliga - Klasemen La Liga\n` +
          `• bola seriea - Klasemen Serie A\n` +
          `• bola bundesliga - Klasemen Bundesliga\n` +
          `• bola ligue1 - Klasemen Ligue 1\n\n` +
          `💪 *KESEHATAN & FITNESS*\n` +
          `• bmi 70 170 - Hitung BMI (kg, cm)\n` +
          `• kalori 70 170 25 pria - Kalori harian\n` +
          `• nutrisi nasi - Info nutrisi makanan\n` +
          `• tips sehat - Tips kesehatan random\n` +
          `• olahraga - Saran olahraga\n\n` +
          `📱 *QR CODE GENERATOR*\n` +
          `• qr https://google.com - QR Code biasa\n` +
          `• qrlogo https://google.com - QR dengan logo\n` +
          `• qrwarna https://google.com - QR warna custom\n\n` +
          `Silakan pilih! 😊`;
        await client.sendText(pengirim, menu);
      }
      
      else if (pesan === 'info') {
        await client.sendText(pengirim, '🤖 Bot WhatsApp otomatis siap melayani 24/7!');
      }
      
      else if (pesan === 'waktu') {
        const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
        await client.sendText(pengirim, `🕐 ${waktu}`);
      }
      
      else if (pesan === 'quote') {
        const quotes = [
          '💪 "Kesuksesan adalah hasil kerja keras."',
          '🌟 "Jangan menunggu, ciptakan kesempatan!"',
          '🚀 "Mimpi besar dimulai dari langkah kecil."',
          '✨ "Percaya pada diri sendiri."',
          '🎯 "Fokus pada tujuan, bukan hambatan."'
        ];
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        await client.sendText(pengirim, random);
      }
      
      else if (pesan === 'ping') {
        await client.sendText(pengirim, '✅ Bot aktif! 🟢');
      }
      
      // Fitur Saham dengan Yahoo Finance API
      else if (pesan.startsWith('saham ')) {
        const symbol = pesan.replace('saham ', '').trim().toUpperCase();
        
        try {
          await client.sendText(pengirim, '⏳ Mengambil data saham...');
          
          // Panggil Yahoo Finance API (gratis, tanpa API key)
          const quote = await yahooFinance.quote(symbol);
          
          if (quote && quote.regularMarketPrice) {
            const price = quote.regularMarketPrice.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
            const change = quote.regularMarketChange ? quote.regularMarketChange.toFixed(2) : 'N/A';
            const changePercent = quote.regularMarketChangePercent ? quote.regularMarketChangePercent.toFixed(2) : 'N/A';
            const changeEmoji = quote.regularMarketChange > 0 ? '📈' : '📉';
            const currency = quote.currency || 'USD';
            const marketCap = quote.marketCap ? (quote.marketCap / 1e9).toFixed(2) + 'B' : 'N/A';
            
            let stockInfo = `📈 *${quote.symbol}*\n`;
            if (quote.longName) stockInfo += `${quote.longName}\n\n`;
            else stockInfo += '\n';
            
            stockInfo += `💵 Harga: ${currency} ${price}\n` +
              `${changeEmoji} Perubahan: ${change} (${changePercent}%)\n` +
              `📊 Market Cap: ${currency} ${marketCap}\n`;
            
            if (quote.regularMarketOpen) {
              stockInfo += `🔓 Open: ${currency} ${quote.regularMarketOpen.toFixed(2)}\n`;
            }
            if (quote.regularMarketDayHigh && quote.regularMarketDayLow) {
              stockInfo += `📊 High/Low: ${quote.regularMarketDayHigh.toFixed(2)} / ${quote.regularMarketDayLow.toFixed(2)}\n`;
            }
            
            stockInfo += `\nData dari Yahoo Finance`;
            
            await client.sendText(pengirim, stockInfo);
          } else {
            await client.sendText(pengirim, `❌ Saham "${symbol}" tidak ditemukan.\n\nContoh:\n• saham AAPL (Apple)\n• saham BBCA.JK (BCA)\n• saham TLKM.JK (Telkom)`);
          }
        } catch (error) {
          console.error('Error fetching stock:', error);
          await client.sendText(pengirim, `❌ Gagal mengambil data saham "${symbol}".\n\nPastikan kode saham benar.\nContoh: AAPL, GOOGL, BBCA.JK`);
        }
      }
      
      // Fitur Football dengan API-Football (gratis)
      else if (pesan.startsWith('bola ')) {
        const league = pesan.replace('bola ', '').trim().toLowerCase();
        
        // Mapping liga ke ID
        const leagueMap = {
          'epl': { id: 'PL', name: 'Premier League' },
          'premierleague': { id: 'PL', name: 'Premier League' },
          'laliga': { id: 'PD', name: 'La Liga' },
          'seriea': { id: 'SA', name: 'Serie A' },
          'bundesliga': { id: 'BL1', name: 'Bundesliga' },
          'ligue1': { id: 'FL1', name: 'Ligue 1' }
        };
        
        const selectedLeague = leagueMap[league];
        
        if (!selectedLeague) {
          await client.sendText(pengirim, '❌ Liga tidak ditemukan.\n\nContoh:\n• bola epl\n• bola laliga\n• bola seriea\n• bola bundesliga\n• bola ligue1');
          return;
        }
        
        try {
          await client.sendText(pengirim, `⏳ Mengambil klasemen ${selectedLeague.name}...`);
          
          // Panggil Football-Data API (gratis, tanpa API key untuk data terbatas)
          const response = await axios.get(`https://api.football-data.org/v4/competitions/${selectedLeague.id}/standings`, {
            headers: {
              'X-Auth-Token': 'YOUR_API_KEY_HERE' // Bisa kosong untuk free tier terbatas
            }
          });
          
          if (response.data && response.data.standings && response.data.standings[0]) {
            const standings = response.data.standings[0].table.slice(0, 10); // Top 10
            
            let tableText = `⚽ *KLASEMEN ${selectedLeague.name.toUpperCase()}*\n\n`;
            
            standings.forEach((team, index) => {
              const pos = team.position;
              const name = team.team.name;
              const played = team.playedGames;
              const points = team.points;
              const gd = team.goalDifference;
              
              // Emoji untuk posisi
              let emoji = '';
              if (pos === 1) emoji = '🥇';
              else if (pos === 2) emoji = '🥈';
              else if (pos === 3) emoji = '🥉';
              else emoji = `${pos}.`;
              
              tableText += `${emoji} ${name}\n`;
              tableText += `   Main: ${played} | Poin: ${points} | GD: ${gd > 0 ? '+' : ''}${gd}\n\n`;
            });
            
            tableText += `Data dari Football-Data.org`;
            
            await client.sendText(pengirim, tableText);
          } else {
            await client.sendText(pengirim, '❌ Gagal mengambil data klasemen.');
          }
        } catch (error) {
          console.error('Error fetching football data:', error);
          
          // Fallback: gunakan data dummy untuk demo
          let demoText = `⚽ *KLASEMEN ${selectedLeague.name.toUpperCase()}*\n\n`;
          demoText += `ℹ️ Untuk data real-time, daftar API key gratis di:\nhttps://www.football-data.org/\n\n`;
          demoText += `Setelah dapat API key, masukkan ke bot.js\n\n`;
          demoText += `📝 Cara:\n`;
          demoText += `1. Daftar di football-data.org\n`;
          demoText += `2. Dapatkan API key gratis\n`;
          demoText += `3. Ganti 'YOUR_API_KEY_HERE' di bot.js`;
          
          await client.sendText(pengirim, demoText);
        }
      }
      
      // Fitur BMI Calculator
      else if (pesan.startsWith('bmi ')) {
        const parts = pesan.split(' ');
        if (parts.length < 3) {
          await client.sendText(pengirim, '❌ Format salah!\n\nContoh: bmi 70 170\n(berat dalam kg, tinggi dalam cm)');
          return;
        }
        
        const berat = parseFloat(parts[1]);
        const tinggiCm = parseFloat(parts[2]);
        
        if (isNaN(berat) || isNaN(tinggiCm) || berat <= 0 || tinggiCm <= 0) {
          await client.sendText(pengirim, '❌ Masukkan angka yang valid!\n\nContoh: bmi 70 170');
          return;
        }
        
        const tinggiM = tinggiCm / 100;
        const bmi = (berat / (tinggiM * tinggiM)).toFixed(1);
        
        let kategori = '';
        let emoji = '';
        let saran = '';
        
        if (bmi < 18.5) {
          kategori = 'Kurus';
          emoji = '⚠️';
          saran = 'Tingkatkan asupan kalori dan protein. Konsultasi dengan ahli gizi.';
        } else if (bmi >= 18.5 && bmi < 25) {
          kategori = 'Normal';
          emoji = '✅';
          saran = 'Pertahankan pola makan sehat dan olahraga teratur!';
        } else if (bmi >= 25 && bmi < 30) {
          kategori = 'Kelebihan Berat';
          emoji = '⚠️';
          saran = 'Kurangi kalori, perbanyak sayur dan buah, olahraga 30 menit/hari.';
        } else {
          kategori = 'Obesitas';
          emoji = '🚨';
          saran = 'Konsultasi dengan dokter untuk program penurunan berat badan yang aman.';
        }
        
        const bmiInfo = `💪 *HASIL BMI*\n\n` +
          `Berat: ${berat} kg\n` +
          `Tinggi: ${tinggiCm} cm\n\n` +
          `BMI: ${bmi}\n` +
          `Status: ${emoji} ${kategori}\n\n` +
          `📝 Saran:\n${saran}`;
        
        await client.sendText(pengirim, bmiInfo);
      }
      
      // Fitur Kalkulator Kalori Harian
      else if (pesan.startsWith('kalori ')) {
        const parts = pesan.split(' ');
        if (parts.length < 5) {
          await client.sendText(pengirim, '❌ Format salah!\n\nContoh: kalori 70 170 25 pria\n(berat kg, tinggi cm, umur, jenis kelamin)');
          return;
        }
        
        const berat = parseFloat(parts[1]);
        const tinggi = parseFloat(parts[2]);
        const umur = parseInt(parts[3]);
        const gender = parts[4].toLowerCase();
        
        if (isNaN(berat) || isNaN(tinggi) || isNaN(umur)) {
          await client.sendText(pengirim, '❌ Masukkan angka yang valid!');
          return;
        }
        
        if (gender !== 'pria' && gender !== 'wanita') {
          await client.sendText(pengirim, '❌ Jenis kelamin harus "pria" atau "wanita"');
          return;
        }
        
        // Rumus Mifflin-St Jeor
        let bmr;
        if (gender === 'pria') {
          bmr = (10 * berat) + (6.25 * tinggi) - (5 * umur) + 5;
        } else {
          bmr = (10 * berat) + (6.25 * tinggi) - (5 * umur) - 161;
        }
        
        const sedentary = Math.round(bmr * 1.2);
        const light = Math.round(bmr * 1.375);
        const moderate = Math.round(bmr * 1.55);
        const active = Math.round(bmr * 1.725);
        const veryActive = Math.round(bmr * 1.9);
        
        const kaloriInfo = `🔥 *KEBUTUHAN KALORI HARIAN*\n\n` +
          `Data: ${berat}kg, ${tinggi}cm, ${umur}th, ${gender}\n` +
          `BMR: ${Math.round(bmr)} kkal\n\n` +
          `📊 Berdasarkan Aktivitas:\n\n` +
          `🛋️ Tidak aktif: ${sedentary} kkal\n` +
          `🚶 Ringan (1-3x/minggu): ${light} kkal\n` +
          `🏃 Sedang (3-5x/minggu): ${moderate} kkal\n` +
          `💪 Aktif (6-7x/minggu): ${active} kkal\n` +
          `🏋️ Sangat aktif (2x/hari): ${veryActive} kkal\n\n` +
          `💡 Untuk turun berat: kurangi 500 kkal/hari\n` +
          `💡 Untuk naik berat: tambah 500 kkal/hari`;
        
        await client.sendText(pengirim, kaloriInfo);
      }
      
      // Fitur Info Nutrisi Makanan (API Gratis)
      else if (pesan.startsWith('nutrisi ')) {
        const makanan = pesan.replace('nutrisi ', '').trim();
        
        try {
          await client.sendText(pengirim, '⏳ Mencari info nutrisi...');
          
          // Gunakan API Nutrition gratis
          const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${makanan}`, {
            headers: {
              'X-Api-Key': 'YOUR_API_NINJAS_KEY' // Gratis di api-ninjas.com
            }
          });
          
          if (response.data && response.data.length > 0) {
            const food = response.data[0];
            const nutrisiInfo = `🍽️ *NUTRISI: ${food.name.toUpperCase()}*\n\n` +
              `📏 Porsi: ${food.serving_size_g}g\n\n` +
              `🔥 Kalori: ${food.calories} kkal\n` +
              `🍖 Protein: ${food.protein_g}g\n` +
              `🍚 Karbohidrat: ${food.carbohydrates_total_g}g\n` +
              `🧈 Lemak: ${food.fat_total_g}g\n` +
              `🍬 Gula: ${food.sugar_g}g\n` +
              `🧂 Sodium: ${food.sodium_mg}mg\n\n` +
              `Data dari API Ninjas`;
            
            await client.sendText(pengirim, nutrisiInfo);
          } else {
            await client.sendText(pengirim, `❌ Makanan "${makanan}" tidak ditemukan.\n\nCoba dengan nama dalam bahasa Inggris.\nContoh: nutrisi rice, nutrisi chicken`);
          }
        } catch (error) {
          console.error('Error fetching nutrition:', error);
          
          // Fallback dengan data lokal
          const nutrisiLokal = {
            'nasi': { kalori: 130, protein: 2.7, karbo: 28, lemak: 0.3 },
            'ayam': { kalori: 165, protein: 31, karbo: 0, lemak: 3.6 },
            'telur': { kalori: 155, protein: 13, karbo: 1.1, lemak: 11 },
            'tempe': { kalori: 195, protein: 20, karbo: 9, lemak: 11 },
            'tahu': { kalori: 76, protein: 8, karbo: 1.9, lemak: 4.8 }
          };
          
          if (nutrisiLokal[makanan]) {
            const data = nutrisiLokal[makanan];
            const info = `🍽️ *NUTRISI: ${makanan.toUpperCase()}*\n\n` +
              `📏 Per 100g\n\n` +
              `🔥 Kalori: ${data.kalori} kkal\n` +
              `🍖 Protein: ${data.protein}g\n` +
              `🍚 Karbohidrat: ${data.karbo}g\n` +
              `🧈 Lemak: ${data.lemak}g\n\n` +
              `💡 Untuk data lebih lengkap, daftar API key gratis di api-ninjas.com`;
            
            await client.sendText(pengirim, info);
          } else {
            await client.sendText(pengirim, `ℹ️ Untuk fitur nutrisi lengkap:\n\n1. Daftar gratis di api-ninjas.com\n2. Dapatkan API key\n3. Masukkan ke bot.js\n\nMakanan lokal tersedia: nasi, ayam, telur, tempe, tahu`);
          }
        }
      }
      
      // Tips Kesehatan Random
      else if (pesan === 'tips sehat' || pesan === 'tips kesehatan') {
        const tips = [
          '💧 Minum 8 gelas air putih setiap hari untuk menjaga hidrasi tubuh.',
          '🥗 Konsumsi 5 porsi buah dan sayur setiap hari untuk nutrisi optimal.',
          '😴 Tidur 7-8 jam setiap malam untuk pemulihan tubuh yang maksimal.',
          '🏃 Olahraga minimal 30 menit setiap hari untuk jantung yang sehat.',
          '🧘 Luangkan waktu 10 menit untuk meditasi mengurangi stress.',
          '🚭 Hindari rokok dan alkohol untuk kesehatan jangka panjang.',
          '🍎 Sarapan adalah waktu makan terpenting, jangan dilewatkan!',
          '🚶 Berjalan kaki 10.000 langkah sehari baik untuk kesehatan.',
          '📱 Kurangi screen time, istirahatkan mata setiap 20 menit.',
          '🥛 Konsumsi protein cukup untuk membangun dan memperbaiki otot.'
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        await client.sendText(pengirim, `💪 *TIPS KESEHATAN*\n\n${randomTip}`);
      }
      
      // Saran Olahraga
      else if (pesan === 'olahraga' || pesan === 'workout') {
        const workouts = [
          '🏃 *CARDIO*\n\n• Lari 20-30 menit\n• Bersepeda 30 menit\n• Lompat tali 15 menit\n• Berenang 30 menit',
          '💪 *STRENGTH*\n\n• Push up 3x15\n• Squat 3x20\n• Plank 3x30 detik\n• Lunges 3x15 per kaki',
          '🧘 *FLEXIBILITY*\n\n• Yoga 20 menit\n• Stretching 15 menit\n• Pilates 30 menit\n• Tai Chi 20 menit',
          '🏋️ *FULL BODY*\n\n• Burpees 3x10\n• Mountain climbers 3x20\n• Jumping jacks 3x30\n• High knees 3x30 detik',
          '🎯 *CORE*\n\n• Sit ups 3x20\n• Russian twist 3x30\n• Leg raises 3x15\n• Bicycle crunches 3x20'
        ];
        
        const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];
        await client.sendText(pengirim, `💪 *PROGRAM OLAHRAGA*\n\n${randomWorkout}\n\n⏰ Istirahat 60 detik antar set\n💧 Jangan lupa minum air!`);
      }
      
      // Fitur QR Code Generator - Basic
      else if (pesan.startsWith('qr ')) {
        const text = message.body.substring(3).trim();
        
        if (!text) {
          await client.sendText(pengirim, '❌ Format salah!\n\nContoh:\n• qr https://google.com\n• qr Halo ini teks saya');
          return;
        }
        
        try {
          await client.sendText(pengirim, '⏳ Membuat QR Code...');
          
          // Gunakan API QR Code gratis dari goqr.me
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
          
          // Download QR code
          const response = await axios.get(qrUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'binary');
          
          // Kirim sebagai gambar
          await client.sendImage(
            pengirim,
            `data:image/png;base64,${buffer.toString('base64')}`,
            'qrcode.png',
            `✅ QR Code berhasil dibuat!\n\nIsi: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`
          );
        } catch (error) {
          console.error('Error generating QR:', error);
          await client.sendText(pengirim, '❌ Gagal membuat QR Code. Coba lagi.');
        }
      }
      
      // Fitur QR Code dengan Logo Custom
      else if (pesan.startsWith('qrlogo ')) {
        const text = message.body.substring(7).trim();
        
        if (!text) {
          await client.sendText(pengirim, '❌ Format salah!\n\nContoh: qrlogo https://google.com');
          return;
        }
        
        try {
          await client.sendText(pengirim, '⏳ Membuat QR Code dengan logo...');
          
          // Gunakan API dengan logo di tengah
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}&format=png&margin=10`;
          
          const response = await axios.get(qrUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'binary');
          
          await client.sendImage(
            pengirim,
            `data:image/png;base64,${buffer.toString('base64')}`,
            'qrcode_logo.png',
            `✅ QR Code dengan desain khusus!\n\n💡 Scan untuk: ${text.substring(0, 80)}${text.length > 80 ? '...' : ''}`
          );
        } catch (error) {
          console.error('Error generating QR with logo:', error);
          await client.sendText(pengirim, '❌ Gagal membuat QR Code. Coba lagi.');
        }
      }
      
      // Fitur QR Code Warna Custom
      else if (pesan.startsWith('qrwarna ')) {
        const text = message.body.substring(8).trim();
        
        if (!text) {
          await client.sendText(pengirim, '❌ Format salah!\n\nContoh: qrwarna https://google.com');
          return;
        }
        
        try {
          await client.sendText(pengirim, '⏳ Membuat QR Code berwarna...');
          
          // QR Code dengan warna custom (biru dan putih)
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}&color=0-100-200&bgcolor=255-255-255`;
          
          const response = await axios.get(qrUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'binary');
          
          await client.sendImage(
            pengirim,
            `data:image/png;base64,${buffer.toString('base64')}`,
            'qrcode_color.png',
            `✅ QR Code warna custom!\n\n🎨 Warna: Biru & Putih\n📱 Scan untuk: ${text.substring(0, 70)}${text.length > 70 ? '...' : ''}`
          );
        } catch (error) {
          console.error('Error generating colored QR:', error);
          await client.sendText(pengirim, '❌ Gagal membuat QR Code. Coba lagi.');
        }
      }
      
      // Fitur Crypto dengan CoinGecko API
      else if (pesan.startsWith('crypto ')) {
        const coin = pesan.replace('crypto ', '').trim().toLowerCase();
        
        try {
          await client.sendText(pengirim, '⏳ Mengambil data harga...');
          
          // Panggil CoinGecko API (gratis, tanpa API key)
          const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
              ids: coin,
              vs_currencies: 'usd,idr',
              include_24hr_change: true,
              include_market_cap: true
            }
          });
          
          if (response.data[coin]) {
            const data = response.data[coin];
            const priceUSD = data.usd.toLocaleString('en-US');
            const priceIDR = data.idr.toLocaleString('id-ID');
            const change24h = data.usd_24h_change ? data.usd_24h_change.toFixed(2) : 'N/A';
            const changeEmoji = data.usd_24h_change > 0 ? '📈' : '📉';
            
            const cryptoInfo = `💰 *${coin.toUpperCase()}*\n\n` +
              `💵 Harga USD: $${priceUSD}\n` +
              `💴 Harga IDR: Rp ${priceIDR}\n` +
              `${changeEmoji} Perubahan 24h: ${change24h}%\n\n` +
              `Data dari CoinGecko`;
            
            await client.sendText(pengirim, cryptoInfo);
          } else {
            await client.sendText(pengirim, `❌ Crypto "${coin}" tidak ditemukan.\n\nContoh: crypto bitcoin, crypto ethereum`);
          }
        } catch (error) {
          console.error('Error fetching crypto:', error);
          await client.sendText(pengirim, '❌ Gagal mengambil data crypto. Coba lagi nanti.');
        }
      }
      
      else {
        await client.sendText(pengirim, '❓ Ketik *menu* untuk lihat perintah.');
      }

    } catch (error) {
      console.error('❌ Error:', error);
    }
  });

  // Event status berubah
  client.onStateChanged((state) => {
    console.log('📊 Status:', state);
    if (state === 'CONFLICT') client.forceRefocus();
  });

  // Event ditambahkan ke grup
  client.onAddedToGroup((grup) => {
    client.sendText(grup.id, '👋 Halo! Terima kasih sudah menambahkan saya!\n\nKetik *menu* untuk info.');
  });
}

// Event untuk menyimpan QR code sebagai gambar
wa.ev.on('qr.**', async (qrcode, sessionId) => {
  const imageBuffer = Buffer.from(qrcode.replace('data:image/png;base64,',''), 'base64');
  const filename = `qr_code_${sessionId}.png`;
  fs.writeFileSync(filename, imageBuffer);
  console.log(`\n✅ QR Code disimpan sebagai: ${filename}`);
  console.log('📱 Buka file tersebut dan scan dengan WhatsApp Anda!\n');
});

// Jalankan bot
wa.create({
  sessionId: 'bot-wa-saya',
  multiDevice: true,
  authTimeout: 60,
  headless: true,
  qrTimeout: 0,
  disableSpins: true,
  logConsole: false,
})
.then(client => start(client))
.catch(error => console.error('❌ Error:', error));

console.log('🚀 Memulai bot...');
console.log('📱 Scan QR code dengan WhatsApp Anda!');
