// Bot WhatsApp Otomatis - JavaScript
const wa = require('@open-wa/wa-automate');
const fs = require('fs');
const axios = require('axios');
const yahooFinance = require('yahoo-finance2').default;
const { checkBook } = require('./check-book');

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

      // FILTER: Abaikan pesan dari grup, hanya balas chat pribadi
      if (pengirim.includes('@g.us')) {
        console.log('⚠️ Pesan dari grup diabaikan');
        return; // Tidak balas pesan grup
      }

      // Respon otomatis
      if (pesan === 'halo' || pesan === 'hi' || pesan === 'hai') {
        await client.sendText(pengirim, '👋 Halo! Ada yang bisa saya bantu?\n\nKetik *menu* untuk lihat perintah.');
      }
      
      else if (pesan === 'menu') {
        const menu = `📋 *MENU BOT WHATSAPP*\n\n` +
          `🎯 *PERINTAH DASAR*\n` +
          `• menu - Tampilkan menu\n` +
          `• info - Info bot\n` +
          `• waktu - Cek waktu\n` +
          `• quote - Quote motivasi\n` +
          `• ping - Status bot\n\n` +
          `💰 *CRYPTO*\n` +
          `• crypto bitcoin\n` +
          `• crypto ethereum\n\n` +
          `📈 *SAHAM*\n` +
          `• saham AAPL (US)\n` +
          `• saham BBCA.JK (ID)\n\n` +
          `⚽ *FOOTBALL*\n` +
          `• bola epl\n` +
          `• bola laliga\n\n` +
          `💪 *KESEHATAN*\n` +
          `• bmi 70 170\n` +
          `• kalori 70 170 25 pria\n` +
          `• nutrisi nasi\n` +
          `• tips sehat\n` +
          `• olahraga\n\n` +
          `📱 *QR CODE*\n` +
          `• qr https://google.com\n` +
          `• qrlogo https://wa.me/628xxx\n` +
          `• qrwarna https://tokosaya.com\n\n` +
          `📚 *CEK BUKU*\n` +
          `• buku Atomic Habit\n\n` +
          `🎬 *FILM*\n` +
          `• film Avengers\n\n` +
          `📰 *BERITA*\n` +
          `• berita\n` +
          `• berita teknologi\n\n` +
          `💱 *KURS*\n` +
          `• kurs USD\n` +
          `• kurs 100 USD IDR\n\n` +
          `📚 *WIKIPEDIA*\n` +
          `• wiki Indonesia\n` +
          `• wiki [topik]\n\n` +
          `💡 Chat PRIBADI, bukan grup!\n` +
          `Selamat menggunakan! 🎉`;
        
        await client.sendText(pengirim, menu);
      }
      
      else if (pesan === 'info') {
        const infoText = `🤖 *BOT WHATSAPP ASSISTANT*\n\n` +
          `Bot otomatis dengan 10 fitur lengkap!\n\n` +
          `✅ Cryptocurrency\n` +
          `✅ Saham\n` +
          `✅ Football\n` +
          `✅ Kesehatan & Fitness\n` +
          `✅ QR Code Generator\n` +
          `✅ Cek Stok Buku\n` +
          `✅ Info Film\n` +
          `✅ Berita Terkini\n` +
          `✅ Konversi Mata Uang\n` +
          `✅ Wikipedia\n\n` +
          `📝 *CARA PAKAI:*\n` +
          `1. Chat PRIBADI (bukan di grup)\n` +
          `2. Ketik "menu" untuk lihat perintah\n` +
          `3. Ikuti format yang ada\n` +
          `4. Tunggu balasan bot\n\n` +
          `💡 *CONTOH:*\n` +
          `• crypto bitcoin\n` +
          `• saham BBCA.JK\n` +
          `• bmi 70 170\n` +
          `• wiki Indonesia\n\n` +
          `⚠️ *PENTING:*\n` +
          `Bot TIDAK balas di grup!\n` +
          `Hanya balas chat pribadi.\n\n` +
          `Ketik *menu* untuk mulai! 🚀`;
        
        await client.sendText(pengirim, infoText);
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
              'X-Auth-Token': '692831933e644d3eb42f80e62856fe67' // Bisa kosong untuk free tier terbatas
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
              'X-Api-Key': 'flCk9ITCjlM5UgJNOGvrIw==htM5mkHmOb34IzBA' // Gratis di api-ninjas.com
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
          // Convert ke base64 (tanpa prefix!)
          const base64Image = buffer.toString('base64');

          // Kirim ke whatsapp
          await client.sendImage(
            pengirim,
            base64Image,        // <== WAJIB base64 murni
            'qrcode.png',
            `✅ QR Code berhasil dibuat!\n\nIsi: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`
          );
          // Kirim sebagai gambar
          // await client.sendImage(
          //   pengirim,
          //   `data:image/png;base64,${buffer.toString('base64')}`,
          //   'qrcode.png',
          //   `✅ QR Code berhasil dibuat!\n\nIsi: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`
          // );
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
      
      // Fitur Cek Stok Buku dari Google Drive
      else if (pesan.startsWith('buku ')) {
        const judulBuku = message.body.substring(5).trim();
        
        if (!judulBuku) {
          await client.sendText(pengirim, '❌ Format salah!\n\nContoh: buku Atomic Habit');
          return;
        }
        
        try {
          await client.sendText(pengirim, '⏳ Mengecek ketersediaan buku...');
          
          // Cek apakah credentials dan token ada
          if (!fs.existsSync('./credentials.json') || !fs.existsSync('./token.json')) {
            await client.sendText(pengirim, 
              '⚠️ Fitur cek buku belum disetup.\n\n' +
              'Admin perlu setup Google Drive API terlebih dahulu.\n' +
              'Lihat file: SETUP_GOOGLE_DRIVE.md'
            );
            return;
          }
          
          // Cek buku di Google Drive
          const result = await checkBook(judulBuku);
          
          if (result.found) {
            // Buku READY
            const pesanReady = `✅ *BUKU READY!*\n\n` +
              `📚 Judul: ${result.fileName}\n` +
              `📦 Status: TERSEDIA\n\n` +
              `💰 Silakan lakukan pembayaran:\n` +
              `Scan QR Code di katalog atau hubungi admin untuk info pembayaran.\n\n` +
              `Terima kasih! 🙏`;
            
            await client.sendText(pengirim, pesanReady);
            
            // Optional: Kirim QR Code pembayaran
            // Uncomment jika sudah ada QR pembayaran
            // await client.sendImage(pengirim, './qr-pembayaran.png', 'qr-pembayaran.png', 'QR Code Pembayaran');
            
          } else {
            // Buku TIDAK READY
            const pesanTidakReady = `❌ *BUKU TIDAK READY*\n\n` +
              `📚 Judul: ${judulBuku}\n` +
              `📦 Status: TIDAK TERSEDIA\n\n` +
              `Maaf, buku ini sedang tidak tersedia.\n` +
              `Silakan coba judul lain atau hubungi admin untuk info lebih lanjut.`;
            
            await client.sendText(pengirim, pesanTidakReady);
          }
          
        } catch (error) {
          console.error('Error cek buku:', error);
          await client.sendText(pengirim, 
            '❌ Gagal mengecek buku.\n\n' +
            'Silakan coba lagi atau hubungi admin.'
          );
        }
      }
      
      // Fitur Movie Database dengan OMDB API
      else if (pesan.startsWith('film ')) {
        const judulFilm = message.body.substring(5).trim();
        
        if (!judulFilm) {
          await client.sendText(pengirim, '❌ Format salah!\n\nContoh: film Avengers');
          return;
        }
        
        try {
          await client.sendText(pengirim, '⏳ Mencari info film...');
          
          // OMDB API (gratis, tanpa API key untuk pencarian terbatas)
          // Untuk fitur lengkap, daftar API key gratis di: http://www.omdbapi.com/apikey.aspx
          const apiKey = 'b1a7b542'; // Ganti dengan API key Anda
          
          const response = await axios.get(`http://www.omdbapi.com/`, {
            params: {
              apikey: apiKey,
              t: judulFilm,
              plot: 'short'
            }
          });
          
          if (response.data.Response === 'True') {
            const movie = response.data;
            
            const movieInfo = `🎬 *${movie.Title}* (${movie.Year})\n\n` +
              `⭐ Rating: ${movie.imdbRating}/10\n` +
              `🎭 Genre: ${movie.Genre}\n` +
              `⏱️ Durasi: ${movie.Runtime}\n` +
              `🎬 Sutradara: ${movie.Director}\n` +
              `🎭 Pemain: ${movie.Actors}\n\n` +
              `📝 Sinopsis:\n${movie.Plot}\n\n` +
              `🏆 Awards: ${movie.Awards}\n\n` +
              `Data dari OMDB`;
            
            await client.sendText(pengirim, movieInfo);
            
            // Kirim poster jika ada
            if (movie.Poster && movie.Poster !== 'N/A') {
              try {
                await client.sendImage(pengirim, movie.Poster, 'poster.jpg', movie.Title);
              } catch (err) {
                console.log('Gagal kirim poster');
              }
            }
            
          } else {
            await client.sendText(pengirim, 
              `❌ Film "${judulFilm}" tidak ditemukan.\n\n` +
              `Coba dengan judul dalam bahasa Inggris.\n` +
              `Contoh: film Avengers, film Inception`
            );
          }
          
        } catch (error) {
          console.error('Error fetching movie:', error);
          
          // Fallback jika belum ada API key
          if (error.response?.status === 401 || error.message.includes('Invalid API key')) {
            await client.sendText(pengirim,
              `ℹ️ *FITUR MOVIE DATABASE*\n\n` +
              `Untuk menggunakan fitur ini, perlu API key gratis dari OMDB.\n\n` +
              `📝 Cara mendapatkan:\n` +
              `1. Buka: http://www.omdbapi.com/apikey.aspx\n` +
              `2. Pilih FREE (1,000 requests/day)\n` +
              `3. Masukkan email\n` +
              `4. Cek email untuk aktivasi\n` +
              `5. Copy API key\n` +
              `6. Masukkan ke bot.js\n\n` +
              `Lihat file: MOVIE_API_SETUP.md untuk panduan lengkap.`
            );
          } else {
            await client.sendText(pengirim, '❌ Gagal mencari film. Coba lagi nanti.');
          }
        }
      }
      
      // Fitur Berita dengan NewsAPI
      else if (pesan.startsWith('berita')) {
        try {
          await client.sendText(pengirim, '⏳ Mengambil berita terkini...');
          
          const apiKey = '05f96aa3312e44b0a8d7807e12733e5c'; // Ganti dengan API key dari newsapi.org
          
          // Tentukan kategori berdasarkan pesan
          let category = 'general';
          let country = 'id'; // Indonesia
          let query = '';
          
          if (pesan.includes('teknologi') || pesan.includes('technology')) {
            category = 'technology';
          } else if (pesan.includes('bisnis') || pesan.includes('business')) {
            category = 'business';
          } else if (pesan.includes('olahraga') || pesan.includes('sports')) {
            category = 'sports';
          } else if (pesan.includes('kesehatan') || pesan.includes('health')) {
            category = 'health';
          } else if (pesan.includes('hiburan') || pesan.includes('entertainment')) {
            category = 'entertainment';
          }
          
          const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
              apiKey: apiKey,
              country: country,
              category: category,
              pageSize: 5
            }
          });
          
          if (response.data.status === 'ok' && response.data.articles.length > 0) {
            const articles = response.data.articles;
            
            let beritaText = `📰 *BERITA TERKINI*\n`;
            if (category !== 'general') {
              beritaText += `Kategori: ${category.toUpperCase()}\n`;
            }
            beritaText += `\n`;
            
            articles.forEach((article, index) => {
              beritaText += `${index + 1}. *${article.title}*\n`;
              if (article.description) {
                beritaText += `   ${article.description.substring(0, 100)}...\n`;
              }
              beritaText += `   🔗 ${article.url}\n`;
              beritaText += `   📅 ${new Date(article.publishedAt).toLocaleString('id-ID')}\n\n`;
            });
            
            beritaText += `Data dari NewsAPI`;
            
            await client.sendText(pengirim, beritaText);
            
          } else {
            await client.sendText(pengirim, '❌ Tidak ada berita ditemukan.');
          }
          
        } catch (error) {
          console.error('Error fetching news:', error);
          
          // Fallback jika belum ada API key
          if (error.response?.status === 401 || error.message.includes('apiKey')) {
            await client.sendText(pengirim,
              `ℹ️ *FITUR BERITA*\n\n` +
              `Untuk menggunakan fitur ini, perlu API key gratis dari NewsAPI.\n\n` +
              `📝 Cara mendapatkan:\n` +
              `1. Buka: https://newsapi.org/register\n` +
              `2. Daftar gratis (100 requests/day)\n` +
              `3. Verifikasi email\n` +
              `4. Copy API key\n` +
              `5. Masukkan ke bot.js\n\n` +
              `Lihat file: NEWS_API_SETUP.md untuk panduan lengkap.`
            );
          } else {
            await client.sendText(pengirim, '❌ Gagal mengambil berita. Coba lagi nanti.');
          }
        }
      }
      
      // Fitur Konversi Mata Uang dengan Fixer.io API
      else if (pesan.startsWith('kurs')) {
        try {
          await client.sendText(pengirim, '⏳ Mengambil kurs terkini...');
          
          const apiKey = '4c853c89575ee427ddd5eeb2af42da45'; // Ganti dengan API key dari fixer.io
          
          // Parse perintah
          const parts = message.body.split(' ').filter(p => p);
          
          let amount = 1;
          let from = 'USD';
          let to = 'IDR';
          
          if (parts.length === 2) {
            // Format: kurs USD
            from = parts[1].toUpperCase();
            to = 'IDR';
          } else if (parts.length === 4) {
            // Format: kurs 100 USD IDR
            amount = parseFloat(parts[1]);
            from = parts[2].toUpperCase();
            to = parts[3].toUpperCase();
          } else if (parts.length === 3) {
            // Format: kurs USD IDR
            from = parts[1].toUpperCase();
            to = parts[2].toUpperCase();
          }
          
          // Validasi amount
          if (isNaN(amount) || amount <= 0) {
            await client.sendText(pengirim, '❌ Jumlah tidak valid!\n\nContoh: kurs 100 USD IDR');
            return;
          }
          
          const response = await axios.get(`https://api.apilayer.com/fixer/convert`, {
            params: {
              from: from,
              to: to,
              amount: amount
            },
            headers: {
              'apikey': apiKey
            }
          });
          
          if (response.data.success) {
            const result = response.data.result;
            const rate = response.data.info.rate;
            const date = new Date(response.data.date).toLocaleDateString('id-ID');
            
            const kursInfo = `💱 *KONVERSI MATA UANG*\n\n` +
              `${amount.toLocaleString('id-ID')} ${from} = ${result.toLocaleString('id-ID', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${to}\n\n` +
              `📊 Rate: 1 ${from} = ${rate.toLocaleString('id-ID', {minimumFractionDigits: 4, maximumFractionDigits: 4})} ${to}\n` +
              `📅 Update: ${date}\n\n` +
              `Data dari Fixer.io`;
            
            await client.sendText(pengirim, kursInfo);
            
          } else {
            await client.sendText(pengirim, 
              `❌ Gagal konversi mata uang.\n\n` +
              `Pastikan kode mata uang benar.\n` +
              `Contoh: USD, EUR, GBP, JPY, IDR`
            );
          }
          
        } catch (error) {
          console.error('Error fetching currency:', error);
          
          // Fallback jika belum ada API key
          if (error.response?.status === 401 || error.message.includes('apikey')) {
            await client.sendText(pengirim,
              `ℹ️ *FITUR KONVERSI MATA UANG*\n\n` +
              `Untuk menggunakan fitur ini, perlu API key gratis dari Fixer.io\n\n` +
              `📝 Cara mendapatkan:\n` +
              `1. Buka: https://fixer.io/signup/free\n` +
              `2. Daftar gratis (100 requests/bulan)\n` +
              `3. Verifikasi email\n` +
              `4. Copy API key\n` +
              `5. Masukkan ke bot.js\n\n` +
              `Lihat file: CURRENCY_API_SETUP.md untuk panduan lengkap.`
            );
          } else {
            await client.sendText(pengirim, '❌ Gagal mengambil kurs. Coba lagi nanti.');
          }
        }
      }
      
      // Fitur Wikipedia (100% GRATIS, tanpa API key)
      else if (pesan.startsWith('wiki ')) {
        const topik = message.body.substring(5).trim();
        
        if (!topik) {
          await client.sendText(pengirim, '❌ Format salah!\n\nContoh: wiki Indonesia');
          return;
        }
        
        try {
          await client.sendText(pengirim, '⏳ Mencari di Wikipedia...');
          
          // Wikipedia API (GRATIS, tanpa limit, tanpa API key!)
          const searchResponse = await axios.get('https://id.wikipedia.org/w/api.php', {
            params: {
              action: 'query',
              format: 'json',
              list: 'search',
              srsearch: topik,
              utf8: 1
            }
          });
          
          if (searchResponse.data.query.search.length > 0) {
            const pageId = searchResponse.data.query.search[0].pageid;
            const title = searchResponse.data.query.search[0].title;
            
            // Ambil konten artikel
            const contentResponse = await axios.get('https://id.wikipedia.org/w/api.php', {
              params: {
                action: 'query',
                format: 'json',
                prop: 'extracts|pageimages',
                exintro: true,
                explaintext: true,
                piprop: 'original',
                pageids: pageId
              }
            });
            
            const page = contentResponse.data.query.pages[pageId];
            let extract = page.extract || 'Tidak ada deskripsi tersedia.';
            
            // Batasi panjang teks (max 1000 karakter)
            if (extract.length > 1000) {
              extract = extract.substring(0, 1000) + '...';
            }
            
            const wikiUrl = `https://id.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
            
            const wikiInfo = `📚 *${title}*\n\n` +
              `${extract}\n\n` +
              `🔗 Baca selengkapnya:\n${wikiUrl}\n\n` +
              `Sumber: Wikipedia Indonesia`;
            
            await client.sendText(pengirim, wikiInfo);
            
            // Kirim gambar jika ada
            if (page.original && page.original.source) {
              try {
                await client.sendImage(
                  pengirim, 
                  page.original.source, 
                  'wiki.jpg', 
                  title
                );
              } catch (err) {
                console.log('Gagal kirim gambar Wikipedia');
              }
            }
            
          } else {
            // Coba cari di Wikipedia English
            const searchResponseEN = await axios.get('https://en.wikipedia.org/w/api.php', {
              params: {
                action: 'query',
                format: 'json',
                list: 'search',
                srsearch: topik,
                utf8: 1
              }
            });
            
            if (searchResponseEN.data.query.search.length > 0) {
              const pageId = searchResponseEN.data.query.search[0].pageid;
              const title = searchResponseEN.data.query.search[0].title;
              
              const contentResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                  action: 'query',
                  format: 'json',
                  prop: 'extracts',
                  exintro: true,
                  explaintext: true,
                  pageids: pageId
                }
              });
              
              const page = contentResponse.data.query.pages[pageId];
              let extract = page.extract || 'No description available.';
              
              if (extract.length > 1000) {
                extract = extract.substring(0, 1000) + '...';
              }
              
              const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
              
              const wikiInfo = `📚 *${title}*\n\n` +
                `${extract}\n\n` +
                `🔗 Read more:\n${wikiUrl}\n\n` +
                `Source: Wikipedia (English)`;
              
              await client.sendText(pengirim, wikiInfo);
              
            } else {
              await client.sendText(pengirim, 
                `❌ Topik "${topik}" tidak ditemukan di Wikipedia.\n\n` +
                `Coba dengan kata kunci lain atau ejaan yang berbeda.`
              );
            }
          }
          
        } catch (error) {
          console.error('Error fetching Wikipedia:', error);
          await client.sendText(pengirim, '❌ Gagal mengambil data dari Wikipedia. Coba lagi nanti.');
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
