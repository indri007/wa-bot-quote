// Bot WhatsApp Sederhana dan Stabil
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

// Inisialisasi client dengan konfigurasi minimal
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './wa-session'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

// Event: QR Code
client.on('qr', (qr) => {
    console.log('📱 Scan QR Code ini dengan WhatsApp:');
    qrcode.generate(qr, { small: true });
    console.log('\n✅ QR Code berhasil di-generate!');
});

// Event: Ready
client.on('ready', () => {
    console.log('✅ Bot WhatsApp berhasil dijalankan!');
    console.log('📱 Bot siap menerima pesan!');
});

// Event: Authenticated
client.on('authenticated', () => {
    console.log('✅ Authenticated!');
});

// Event: Auth Failure
client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
});

// Event: Message
client.on('message', async (message) => {
    try {
        const pesan = message.body.toLowerCase();
        const pengirim = message.from;

        console.log(`📩 Pesan dari ${pengirim}: ${message.body}`);

        // FILTER: Abaikan pesan dari grup
        if (pengirim.includes('@g.us')) {
            console.log('⚠️ Pesan dari grup diabaikan');
            return;
        }

        // Respon sederhana
        if (pesan === 'halo' || pesan === 'hi' || pesan === 'hai') {
            await client.sendMessage(pengirim, '👋 Halo! Saya bot WhatsApp.\n\nKetik *menu* untuk lihat perintah.');
        }
        else if (pesan === 'menu') {
            const menu = `📋 *MENU BOT WHATSAPP*\n\n` +
                `🎯 *PERINTAH DASAR*\n` +
                `• menu - Tampilkan menu\n` +
                `• ping - Status bot\n` +
                `• info - Info bot\n\n` +
                `💡 Bot ini berjalan di chat pribadi saja!`;

            await client.sendMessage(pengirim, menu);
        }
        else if (pesan === 'ping') {
            await client.sendMessage(pengirim, '✅ Bot aktif! 🟢');
        }
        else if (pesan === 'info') {
            const info = `🤖 *BOT WHATSAPP*\n\n` +
                `Bot sederhana untuk testing.\n` +
                `Status: Aktif ✅\n\n` +
                `Ketik *menu* untuk perintah lainnya.`;
            
            await client.sendMessage(pengirim, info);
        }
        else {
            await client.sendMessage(pengirim, '❓ Ketik *menu* untuk lihat perintah yang tersedia.');
        }

    } catch (error) {
        console.error('❌ Error handling message:', error.message);
        try {
            await client.sendMessage(message.from, '❌ Terjadi kesalahan. Coba lagi nanti.');
        } catch (sendError) {
            console.error('❌ Error sending error message:', sendError.message);
        }
    }
});

// Error handling
client.on('disconnected', (reason) => {
    console.log('⚠️ Bot disconnected:', reason);
});

// Initialize client
console.log('🚀 Memulai bot sederhana...');
console.log('📱 Scan QR code dengan WhatsApp Anda!');
client.initialize();