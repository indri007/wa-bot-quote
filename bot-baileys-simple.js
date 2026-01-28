// Bot WhatsApp Sederhana dengan Baileys
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

async function startBot() {
    console.log('🚀 Starting WhatsApp Bot with Baileys...');
    
    // Auth state
    const { state, saveCreds } = await useMultiFileAuthState('./baileys-auth');
    
    // Create socket dengan konfigurasi minimal
    const sock = makeWASocket({
        auth: state
    });
    
    // Save credentials
    sock.ev.on('creds.update', saveCreds);
    
    // Connection update
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('📱 QR Code received! Scan with WhatsApp:');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('❌ Connection closed due to', lastDisconnect?.error, ', reconnecting:', shouldReconnect);
            
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ Bot connected successfully!');
            console.log('📱 Ready to receive messages!');
        }
    });
    
    // Message handler sederhana
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        
        if (!msg.message || msg.key.fromMe) return;
        
        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        
        console.log(`📨 Message from ${from}: "${text}"`);
        
        // Skip groups
        if (from.includes('@g.us')) {
            console.log('⏭️ Skipping group message');
            return;
        }
        
        try {
            let reply = '';
            
            if (text.toLowerCase() === 'ping') {
                reply = '✅ Pong!';
                console.log('🏓 Sending pong...');
            } 
            else if (text.toLowerCase() === 'halo' || text.toLowerCase() === 'hello') {
                reply = '👋 Halo! Bot Baileys aktif!';
                console.log('👋 Sending greeting...');
            }
            else if (text.toLowerCase() === 'menu') {
                reply = '📋 *MENU BOT*\n\n• ping - Test bot\n• halo - Greeting\n• menu - Show menu\n\n✅ Bot dengan Baileys aktif!';
                console.log('📋 Sending menu...');
            }
            else {
                reply = '🤖 Bot Baileys aktif!\n\nCoba kirim:\n• ping\n• halo\n• menu';
                console.log('❓ Sending help...');
            }
            
            await sock.sendMessage(from, { text: reply });
            console.log('✅ Reply sent successfully!');
            
        } catch (error) {
            console.error('❌ Error sending message:', error);
        }
    });
}

// Start the bot
startBot().catch(err => {
    console.error('❌ Error starting bot:', err);
});