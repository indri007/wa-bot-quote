// Bot WhatsApp Lengkap dengan Baileys
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const pino = require('pino');
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
const { checkBook } = require('./check-book');
const { analyzeStock } = require('./stock-analysis');
const { convertCurrency, getPopularRates } = require('./currency-converter');

async function startBot() {
    console.log('🚀 Starting WhatsApp Bot with Baileys (Full Features)...');
    
    // Auth state
    const { state, saveCreds } = await useMultiFileAuthState('./baileys-auth');
    
    // Create socket dengan konfigurasi yang lebih stabil
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: ['WhatsApp Bot', 'Chrome', '1.0.0'],
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: false,
        fireInitQueries: true,
        generateHighQualityLinkPreview: false,
        syncFullHistory: false,
        markOnlineOnConnect: true
    });
    
    // Save credentials
    sock.ev.on('creds.update', saveCreds);
    
    // Connection update dengan error handling yang lebih baik
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('📱 QR Code received! Scan with WhatsApp:');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('❌ Connection closed due to', lastDisconnect?.error?.message || 'unknown error', ', reconnecting:', shouldReconnect);
            
            // Tambahkan delay sebelum reconnect untuk menghindari spam
            if (shouldReconnect) {
                console.log('🔄 Reconnecting in 10 seconds...');
                setTimeout(() => {
                    startBot();
                }, 10000);
            }
        } else if (connection === 'open') {
            console.log('✅ Bot connected successfully!');
            console.log('📱 Ready to receive messages with full features!');
        } else if (connection === 'connecting') {
            console.log('🔄 Connecting to WhatsApp...');
        }
    });
    
    // Message handler dengan fitur lengkap
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        
        if (!msg.message || msg.key.fromMe) return;
        
        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const pesan = text.toLowerCase();
        
        console.log(`📨 Message from ${from}: "${text}"`);
        
        // Skip groups
        if (from.includes('@g.us')) {
            console.log('⏭️ Skipping group message');
            return;
        }
        
        try {
            let reply = '';
            
            // Basic commands
            if (pesan === 'halo' || pesan === 'hi' || pesan === 'hai') {
                reply = '👋 Halo! Ada yang bisa saya bantu?\n\nKetik *menu* untuk lihat perintah.';
            }
            else if (pesan === 'menu') {
                reply = `📋 *MENU BOT WHATSAPP*\n\n` +
                    `🎯 *PERINTAH DASAR*\n` +
                    `• menu - Tampilkan menu\n` +
                    `• info - Info bot\n` +
                    `• ping - Status bot\n\n` +
                    `💰 *CRYPTO*\n` +
                    `• crypto bitcoin\n` +
                    `• crypto ethereum\n\n` +
                    `💱 *KURS*\n` +
                    `• kurs USD\n` +
                    `• kurs 100 USD IDR\n\n` +
                    `📈 *SAHAM*\n` +
                    `• saham AAPL (US)\n` +
                    `• saham BBCA.JK (ID)\n\n` +
                    `📈 *ANALISA SAHAM AI*\n` +
                    `• analisa AAPL\n` +
                    `• analisa TSLA\n\n` +
                    `💪 *KESEHATAN*\n` +
                    `• bmi 70 170\n` +
                    `• kalori 70 170 25 pria\n\n` +
                    `📱 *QR CODE*\n` +
                    `• qr https://google.com\n\n` +
                    `📚 *WIKIPEDIA*\n` +
                    `• wiki Indonesia\n\n` +
                    `💡 Chat PRIBADI, bukan grup!\n` +
                    `Selamat menggunakan! 🎉`;
            }
            else if (pesan === 'ping') {
                reply = '✅ Bot aktif! 🟢';
            }
            else if (pesan === 'info') {
                reply = `🤖 *BOT WHATSAPP ASSISTANT*\n\n` +
                    `Bot otomatis dengan AI untuk analisis saham & kurs!\n\n` +
                    `✅ Analisis Saham AI (Gemini)\n` +
                    `✅ Kurs Mata Uang + AI Analysis\n` +
                    `✅ Data Real-time\n` +
                    `✅ Cryptocurrency\n` +
                    `✅ QR Code Generator\n` +
                    `✅ Wikipedia\n\n` +
                    `Ketik *menu* untuk mulai! 🚀`;
            }
            
            // Fitur Analisa Saham AI
            else if (pesan.startsWith('analisa ') || pesan.startsWith('analyze ')) {
                const ticker = pesan.replace(/^(analisa|analyze)\s+/i, '').trim().toUpperCase();

                if (!ticker) {
                    reply = '❌ Format salah!\n\nContoh:\n• analisa AAPL\n• analisa BBCA.JK';
                } else {
                    try {
                        await sock.sendMessage(from, { text: `⏳ Menganalisa saham ${ticker}...\nMohon tunggu 15-30 detik.` });

                        const analysis = await analyzeStock(ticker);
                        reply = analysis;

                    } catch (error) {
                        console.error('Error analyzing stock:', error);
                        reply = `❌ Gagal menganalisa ${ticker}.\n\nPastikan kode ticker benar:\n• US: AAPL, TSLA, MSFT\n• ID: BBCA.JK, TLKM.JK`;
                    }
                }
            }
            
            // Fitur Saham
            else if (pesan.startsWith('saham ')) {
                const symbol = pesan.replace('saham ', '').trim().toUpperCase();
                try {
                    await sock.sendMessage(from, { text: '⏳ Mengambil data saham...' });

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

                        reply = `📈 *${quote.symbol}*\n`;
                        reply += quote.longName ? `${quote.longName}\n\n` : '\n';
                        reply += `💵 Harga: ${currency} ${price}\n`;
                        reply += `${changeEmoji} Perubahan: ${change} (${changePercent}%)\n\n`;
                        reply += `Data dari Yahoo Finance`;
                    } else {
                        reply = `❌ Saham "${symbol}" tidak ditemukan.\n\nContoh: AAPL, BBCA.JK`;
                    }

                } catch (error) {
                    console.error('Error fetching stock:', error);
                    reply = `❌ Gagal mengambil data saham "${symbol}".`;
                }
            }
            
            // Fitur Crypto
            else if (pesan.startsWith('crypto ')) {
                const coin = pesan.replace('crypto ', '').trim().toLowerCase();

                try {
                    await sock.sendMessage(from, { text: '⏳ Mengambil data harga...' });

                    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                        params: {
                            ids: coin,
                            vs_currencies: 'usd,idr',
                            include_24hr_change: true
                        }
                    });

                    if (response.data[coin]) {
                        const data = response.data[coin];
                        const priceUSD = data.usd.toLocaleString('en-US');
                        const priceIDR = data.idr.toLocaleString('id-ID');
                        const change24h = data.usd_24h_change ? data.usd_24h_change.toFixed(2) : 'N/A';
                        const changeEmoji = data.usd_24h_change > 0 ? '📈' : '📉';

                        reply = `💰 *${coin.toUpperCase()}*\n\n` +
                            `💵 Harga USD: ${priceUSD}\n` +
                            `💴 Harga IDR: Rp ${priceIDR}\n` +
                            `${changeEmoji} Perubahan 24h: ${change24h}%\n\n` +
                            `Data dari CoinGecko`;
                    } else {
                        reply = `❌ Crypto "${coin}" tidak ditemukan.\n\nContoh: bitcoin, ethereum`;
                    }
                } catch (error) {
                    console.error('Error fetching crypto:', error);
                    reply = '❌ Gagal mengambil data crypto.';
                }
            }
            
            // Fitur BMI
            else if (pesan.startsWith('bmi ')) {
                const parts = pesan.split(' ');
                if (parts.length < 3) {
                    reply = '❌ Format salah!\n\nContoh: bmi 70 170\n(berat kg, tinggi cm)';
                } else {
                    const berat = parseFloat(parts[1]);
                    const tinggiCm = parseFloat(parts[2]);

                    if (isNaN(berat) || isNaN(tinggiCm)) {
                        reply = '❌ Masukkan angka yang valid!';
                    } else {
                        const tinggiM = tinggiCm / 100;
                        const bmi = (berat / (tinggiM * tinggiM)).toFixed(1);

                        let kategori = '';
                        let emoji = '';

                        if (bmi < 18.5) {
                            kategori = 'Kurus';
                            emoji = '⚠️';
                        } else if (bmi >= 18.5 && bmi < 25) {
                            kategori = 'Normal';
                            emoji = '✅';
                        } else if (bmi >= 25 && bmi < 30) {
                            kategori = 'Kelebihan Berat';
                            emoji = '⚠️';
                        } else {
                            kategori = 'Obesitas';
                            emoji = '🚨';
                        }

                        reply = `💪 *HASIL BMI*\n\n` +
                            `Berat: ${berat} kg\n` +
                            `Tinggi: ${tinggiCm} cm\n\n` +
                            `BMI: ${bmi}\n` +
                            `Status: ${emoji} ${kategori}`;
                    }
                }
            }
            
            // Fitur QR Code
            else if (pesan.startsWith('qr ')) {
                const qrText = text.substring(3).trim();

                if (!qrText) {
                    reply = '❌ Format salah!\n\nContoh: qr https://google.com';
                } else {
                    try {
                        await sock.sendMessage(from, { text: '⏳ Membuat QR Code...' });

                        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrText)}`;
                        const response = await axios.get(qrUrl, { responseType: 'arraybuffer' });
                        const buffer = Buffer.from(response.data, 'binary');

                        // Send image
                        await sock.sendMessage(from, {
                            image: buffer,
                            caption: `✅ QR Code berhasil dibuat!\n\nIsi: ${qrText.substring(0, 100)}`
                        });
                        
                        return; // Don't send text reply
                    } catch (error) {
                        console.error('Error generating QR:', error);
                        reply = '❌ Gagal membuat QR Code.';
                    }
                }
            }
            
            // Fitur Kurs Mata Uang
            else if (pesan.startsWith('kurs')) {
                const parts = text.split(' ').filter(p => p);

                try {
                    // Format 1: kurs USD (tampilkan kurs USD hari ini)
                    if (parts.length === 2) {
                        const currency = parts[1].toUpperCase();
                        await sock.sendMessage(from, { text: '⏳ Mengambil data kurs...' });
                        
                        const result = await getPopularRates(currency);
                        reply = result;
                    }
                    // Format 2: kurs USD IDR (rate USD ke IDR dengan AI analysis)
                    else if (parts.length === 3) {
                        const fromCur = parts[1].toUpperCase();
                        const toCur = parts[2].toUpperCase();
                        
                        await sock.sendMessage(from, { text: '⏳ Mengambil data kurs dan analisis AI...\nMohon tunggu 15-20 detik.' });
                        
                        const result = await convertCurrency(fromCur, toCur, 1);
                        reply = result;
                    }
                    // Format 3: kurs 100 USD IDR (konversi amount)
                    else if (parts.length === 4) {
                        const amount = parseFloat(parts[1]);
                        const fromCur = parts[2].toUpperCase();
                        const toCur = parts[3].toUpperCase();
                        
                        if (isNaN(amount) || amount <= 0) {
                            reply = '❌ Jumlah tidak valid!\n\nContoh: kurs 100 USD IDR';
                        } else {
                            await sock.sendMessage(from, { text: '⏳ Mengambil data kurs dan analisis AI...\nMohon tunggu 15-20 detik.' });
                            
                            const result = await convertCurrency(fromCur, toCur, amount);
                            reply = result;
                        }
                    }
                    else {
                        reply = '❌ Format salah!\n\nContoh:\n• kurs USD (kurs USD hari ini)\n• kurs USD IDR (rate + analisis AI)\n• kurs 100 USD IDR (konversi)';
                    }
                } catch (error) {
                    console.error('Error with currency:', error);
                    reply = '❌ Gagal mendapatkan data kurs. Coba lagi nanti.';
                }
            }
            
            // Fitur Wikipedia
            else if (pesan.startsWith('wiki ')) {
                const topik = text.substring(5).trim();

                if (!topik) {
                    reply = '❌ Format salah!\n\nContoh: wiki Indonesia';
                } else {
                    try {
                        await sock.sendMessage(from, { text: '⏳ Mencari di Wikipedia...' });

                        const searchResponse = await axios.get('https://id.wikipedia.org/w/api.php', {
                            params: {
                                action: 'query',
                                format: 'json',
                                list: 'search',
                                srsearch: topik,
                                utf8: 1
                            },
                            headers: {
                                'User-Agent': 'WhatsAppBot/1.0'
                            }
                        });

                        if (searchResponse.data.query.search.length > 0) {
                            const pageId = searchResponse.data.query.search[0].pageid;
                            const title = searchResponse.data.query.search[0].title;

                            const contentResponse = await axios.get('https://id.wikipedia.org/w/api.php', {
                                params: {
                                    action: 'query',
                                    format: 'json',
                                    prop: 'extracts',
                                    exintro: true,
                                    explaintext: true,
                                    pageids: pageId
                                },
                                headers: {
                                    'User-Agent': 'WhatsAppBot/1.0'
                                }
                            });

                            const page = contentResponse.data.query.pages[pageId];
                            let extract = page.extract || 'Tidak ada deskripsi tersedia.';

                            if (extract.length > 1000) {
                                extract = extract.substring(0, 1000) + '...';
                            }

                            const wikiUrl = `https://id.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;

                            reply = `📚 *${title}*\n\n${extract}\n\n🔗 ${wikiUrl}\n\nSumber: Wikipedia`;
                        } else {
                            reply = `❌ Topik "${topik}" tidak ditemukan di Wikipedia.`;
                        }

                    } catch (error) {
                        console.error('Error fetching Wikipedia:', error);
                        reply = '❌ Gagal mengambil data dari Wikipedia.';
                    }
                }
            }
            
            else {
                reply = '❓ Ketik *menu* untuk lihat perintah yang tersedia.';
            }
            
            // Send reply
            if (reply) {
                await sock.sendMessage(from, { text: reply });
                console.log('✅ Reply sent successfully!');
            }
            
        } catch (error) {
            console.error('❌ Error processing message:', error);
            try {
                await sock.sendMessage(from, { text: '❌ Terjadi kesalahan. Coba lagi nanti.' });
            } catch (sendError) {
                console.error('❌ Error sending error message:', sendError);
            }
        }
    });
}

// Start the bot
startBot().catch(err => {
    console.error('❌ Error starting bot:', err);
});