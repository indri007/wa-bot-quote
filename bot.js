// Bot WhatsApp Otomatis - JavaScript
const wa = require('@open-wa/wa-automate');
const fs = require('fs');

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
