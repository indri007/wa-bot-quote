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
