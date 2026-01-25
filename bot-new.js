// Bot WhatsApp dengan whatsapp-web.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
const { checkBook } = require('./check-book');
const { analyzeStock } = require('./stock-analysis');
const { convertCurrency, getPopularRates } = require('./currency-converter');

// Inisialisasi client
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
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
        ]
    },
    // webVersionCache: {
    //     type: 'remote',
    //     remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    // }
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

// Event: Disconnected
client.on('disconnected', (reason) => {
    console.log('⚠️ Bot disconnected:', reason);
    console.log('🔄 Attempting to reconnect in 10 seconds...');

    setTimeout(() => {
        console.log('🔄 Reinitializing client...');
        client.initialize();
    }, 10000);
});

// Event: Loading Screen
client.on('loading_screen', (percent, message) => {
    console.log('⏳ Loading:', percent, message);
});

// Event: Change State
client.on('change_state', state => {
    console.log('🔄 Connection state changed:', state);
});

// Auto-reconnect on error
client.on('error', (error) => {
    console.error('❌ Client error:', error);
    console.log('🔄 Will attempt to reconnect...');
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

        // Respon otomatis
        if (pesan === 'halo' || pesan === 'hi' || pesan === 'hai') {
            await client.sendMessage(pengirim, '👋 Halo! Ada yang bisa saya bantu?\n\nKetik *menu* untuk lihat perintah.');
        }

        else if (pesan === 'menu') {
            const menu = `📋 *MENU BOT WHATSAPP*\n\n` +
                `🎯 *PERINTAH DASAR*\n` +
                `• menu - Tampilkan menu\n` +
                `• info - Info bot\n` +
                `• ping - Status bot\n\n` +
                `💰 *CRYPTO*\n` +
                `• crypto bitcoin\n` +
                `• crypto ethereum\n\n` +
                `*KURS*\n` +
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
                `� *KUKRS MATA UANG*\n` +
                `• kurs USD (kurs USD hari ini)\n` +
                `• kurs 100 USD IDR (konversi)\n` +
                `• kurs USD IDR (rate USD ke IDR)\n\n` +
                `📚 *WIKIPEDIA*\n` +
                `• wiki Indonesia\n\n` +
                `💡 Chat PRIBADI, bukan grup!\n` +
                `Selamat menggunakan! 🎉`;

            await client.sendMessage(pengirim, menu);
        }

        else if (pesan === 'ping') {
            await client.sendMessage(pengirim, '✅ Bot aktif! 🟢');
        }

        else if (pesan === 'info') {
            const infoText = `🤖 *BOT WHATSAPP ASSISTANT*\n\n` +
                `Bot otomatis dengan AI untuk analisis saham & kurs!\n\n` +
                `✅ Analisis Saham AI (Gemini)\n` +
                `✅ Kurs Mata Uang + AI Analysis\n` +
                `✅ Data Real-time\n` +
                `✅ Cryptocurrency\n` +
                `✅ QR Code Generator\n` +
                `✅ Wikipedia\n\n` +
                `Ketik *menu* untuk mulai! 🚀`;

            await client.sendMessage(pengirim, infoText);
        }

        // Fitur Analisa Saham AI
        else if (pesan.startsWith('analisa ') || pesan.startsWith('analyze ')) {
            const ticker = pesan.replace(/^(analisa|analyze)\s+/i, '').trim().toUpperCase();

            if (!ticker) {
                await message.reply('❌ Format salah!\n\nContoh:\n• analisa AAPL\n• analisa BBCA.JK');
                return;
            }

            try {
                await message.reply(`⏳ Menganalisa saham ${ticker}...\nMohon tunggu 15-30 detik.`);

                const analysis = await analyzeStock(ticker);
                await message.reply(analysis);

            } catch (error) {
                console.error('Error analyzing stock:', error);
                await message.reply(`❌ Gagal menganalisa ${ticker}.\n\nPastikan kode ticker benar:\n• US: AAPL, TSLA, MSFT\n• ID: BBCA.JK, TLKM.JK`);
            }
        }

        // Fitur Saham dengan Google Finance
        else if (pesan.startsWith('saham ')) {
            const rawTicker = pesan.replace('saham ', '').trim().toUpperCase();

            if (!rawTicker) {
                await message.reply('❌ Format salah!\n\nContoh:\n• saham AAPL\n• saham BBCA.JK');
                return;
            }

            try {
                await message.reply('⏳ Mengambil data saham...');

                // Use the new Google Finance scraper directly here too for simple quotes
                const googleFinance = require('./google-finance-scraper');
                const quote = await googleFinance.getQuote(rawTicker);

                if (quote && quote.price) {
                    let stockInfo = `📈 *${quote.name}* (${quote.symbol})\n\n`;
                    stockInfo += `💵 Harga: ${quote.price}\n`;
                    stockInfo += `📉 Perubahan: ${quote.change} (${quote.changePercent})\n\n`;

                    if (quote.details.Open) stockInfo += `🔓 Open: ${quote.details.Open}\n`;
                    if (quote.details['Market cap']) stockInfo += `📊 Mkt Cap: ${quote.details['Market cap']}\n`;

                    stockInfo += `\nData dari Google Finance`;

                    await message.reply(stockInfo);
                } else {
                    await message.reply(`❌ Saham "${rawTicker}" tidak ditemukan.\n\nContoh: AAPL, BBCA.JK`);
                }

            } catch (error) {
                console.error('Error fetching stock:', error);
                await message.reply(`❌ Gagal mengambil data saham "${rawTicker}".`);
            }
        }
        else if (pesan === 'saham') {
            await message.reply('💻 *FITUR SAHAM*\n\nKetik kode saham untuk cek harga:\n• saham BBCA.JK\n• saham TLKM.JK\n• saham AAPL\n• saham BTC-USD');
        }

        // Fitur Crypto
        else if (pesan.startsWith('crypto ')) {
            const coin = pesan.replace('crypto ', '').trim().toLowerCase();

            try {
                await message.reply('⏳ Mengambil data harga...');

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

                    const cryptoInfo = `💰 *${coin.toUpperCase()}*\n\n` +
                        `💵 Harga USD: $${priceUSD}\n` +
                        `💴 Harga IDR: Rp ${priceIDR}\n` +
                        `${changeEmoji} Perubahan 24h: ${change24h}%\n\n` +
                        `Data dari CoinGecko`;

                    await message.reply(cryptoInfo);
                } else {
                    await message.reply(`❌ Crypto "${coin}" tidak ditemukan.\n\nContoh: bitcoin, ethereum`);
                }
            } catch (error) {
                console.error('Error fetching crypto:', error);
                await message.reply('❌ Gagal mengambil data crypto.');
            }
        }

        // Fitur BMI
        else if (pesan.startsWith('bmi ')) {
            const parts = pesan.split(' ');
            if (parts.length < 3) {
                await message.reply('❌ Format salah!\n\nContoh: bmi 70 170\n(berat kg, tinggi cm)');
                return;
            }

            const berat = parseFloat(parts[1]);
            const tinggiCm = parseFloat(parts[2]);

            if (isNaN(berat) || isNaN(tinggiCm)) {
                await message.reply('❌ Masukkan angka yang valid!');
                return;
            }

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

            const bmiInfo = `💪 *HASIL BMI*\n\n` +
                `Berat: ${berat} kg\n` +
                `Tinggi: ${tinggiCm} cm\n\n` +
                `BMI: ${bmi}\n` +
                `Status: ${emoji} ${kategori}`;

            await message.reply(bmiInfo);
        }

        // Fitur QR Code
        else if (pesan.startsWith('qr ')) {
            const text = message.body.substring(3).trim();

            if (!text) {
                await message.reply('❌ Format salah!\n\nContoh: qr https://google.com');
                return;
            }

            try {
                await message.reply('⏳ Membuat QR Code...');

                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
                const response = await axios.get(qrUrl, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data, 'binary');

                const tempFile = `./temp_qr_${Date.now()}.png`;
                fs.writeFileSync(tempFile, buffer);

                const media = require('whatsapp-web.js').MessageMedia;
                const qrMedia = media.fromFilePath(tempFile);

                await client.sendMessage(pengirim, qrMedia, {
                    caption: `✅ QR Code berhasil dibuat!\n\nIsi: ${text.substring(0, 100)}`
                });

                fs.unlinkSync(tempFile);
            } catch (error) {
                console.error('Error generating QR:', error);
                await message.reply('❌ Gagal membuat QR Code.');
            }
        }

        // Fitur Kurs Mata Uang
        else if (pesan.startsWith('kurs')) {
            const parts = message.body.split(' ').filter(p => p);

            try {
                // Format 1: kurs USD (tampilkan kurs USD hari ini)
                if (parts.length === 2) {
                    const currency = parts[1].toUpperCase();
                    await message.reply('⏳ Mengambil data kurs...');

                    const result = await getPopularRates(currency);
                    await message.reply(result);
                }
                // Format 2: kurs USD IDR (rate USD ke IDR dengan AI analysis)
                else if (parts.length === 3) {
                    const from = parts[1].toUpperCase();
                    const to = parts[2].toUpperCase();

                    await message.reply('⏳ Mengambil data kurs dan analisis AI...\nMohon tunggu 15-20 detik.');

                    const result = await convertCurrency(from, to, 1);
                    await message.reply(result);
                }
                // Format 3: kurs 100 USD IDR (konversi amount)
                else if (parts.length === 4) {
                    const amount = parseFloat(parts[1]);
                    const from = parts[2].toUpperCase();
                    const to = parts[3].toUpperCase();

                    if (isNaN(amount) || amount <= 0) {
                        await message.reply('❌ Jumlah tidak valid!\n\nContoh: kurs 100 USD IDR');
                        return;
                    }

                    await message.reply('⏳ Mengambil data kurs dan analisis AI...\nMohon tunggu 15-20 detik.');

                    const result = await convertCurrency(from, to, amount);
                    await message.reply(result);
                }
                else {
                    await message.reply('❌ Format salah!\n\nContoh:\n• kurs USD (kurs USD hari ini)\n• kurs USD IDR (rate + analisis AI)\n• kurs 100 USD IDR (konversi)');
                }
            } catch (error) {
                console.error('Error with currency:', error);
                await message.reply('❌ Gagal mendapatkan data kurs. Coba lagi nanti.');
            }
        }

        // Fitur Wikipedia
        else if (pesan.startsWith('wiki ')) {
            const topik = message.body.substring(5).trim();

            if (!topik) {
                await message.reply('❌ Format salah!\n\nContoh: wiki Indonesia');
                return;
            }

            try {
                await message.reply('⏳ Mencari di Wikipedia...');

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

                    const wikiInfo = `📚 *${title}*\n\n${extract}\n\n🔗 ${wikiUrl}\n\nSumber: Wikipedia`;

                    await message.reply(wikiInfo);
                } else {
                    await message.reply(`❌ Topik "${topik}" tidak ditemukan di Wikipedia.`);
                }

            } catch (error) {
                console.error('Error fetching Wikipedia:', error);
                await message.reply('❌ Gagal mengambil data dari Wikipedia.');
            }
        }

        else {
            await message.reply('❓ Ketik *menu* untuk lihat perintah.');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
});

// ============================================
// AGGRESSIVE WATCHDOG & HEALTH CHECK SYSTEM
// ============================================

let isReady = false;
let lastMessageTime = Date.now();
let lastHealthCheckSuccess = Date.now();
let healthCheckFailCount = 0;
const MAX_HEALTH_CHECK_FAILS = 3;
const HEALTH_CHECK_INTERVAL = 2 * 60 * 1000; // 2 minutes (more frequent)
const MAX_NO_MESSAGE_TIME = 60 * 60 * 1000; // 1 hour before force restart

// Update ready status
client.on('ready', () => {
    isReady = true;
    lastHealthCheckSuccess = Date.now();
    healthCheckFailCount = 0;
    console.log('✅ Bot is ready and connected!');
});

// Track message activity
client.on('message', (msg) => {
    lastMessageTime = Date.now();
    healthCheckFailCount = 0; // Reset fail count on successful message
});

// Aggressive Health Check - Every 2 minutes
setInterval(async () => {
    if (!isReady) {
        console.log('⚠️ Bot not ready, skipping health check');
        return;
    }

    try {
        // Test 1: Check connection state
        const state = await client.getState();

        // Test 2: Try to get info (more thorough check)
        const info = await client.info;

        // Success - reset counters
        lastHealthCheckSuccess = Date.now();
        healthCheckFailCount = 0;
        console.log(`💚 Health check PASSED | State: ${state} | WID: ${info?.wid?.user || 'N/A'}`);

        // Check message activity
        const timeSinceLastMessage = Date.now() - lastMessageTime;
        const hoursSinceMessage = Math.floor(timeSinceLastMessage / (60 * 60 * 1000));

        if (timeSinceLastMessage > 30 * 60 * 1000) {
            console.log(`⚠️ No messages received in ${hoursSinceMessage} hour(s). Bot might be idle or not receiving messages.`);
        }

        // FORCE RESTART if no messages for too long (might indicate listener died)
        if (timeSinceLastMessage > MAX_NO_MESSAGE_TIME) {
            console.error(`🚨 CRITICAL: No messages for ${hoursSinceMessage} hours! Event listener might be dead.`);
            console.error('🔄 FORCING RESTART to recover...');
            process.exit(1); // PM2 will auto-restart
        }

    } catch (error) {
        healthCheckFailCount++;
        console.error(`❌ Health check FAILED (${healthCheckFailCount}/${MAX_HEALTH_CHECK_FAILS}):`, error.message);

        // FORCE RESTART after multiple consecutive failures
        if (healthCheckFailCount >= MAX_HEALTH_CHECK_FAILS) {
            console.error('🚨 CRITICAL: Multiple health check failures detected!');
            console.error('🔄 Bot is unresponsive. FORCING RESTART...');
            process.exit(1); // PM2 will auto-restart
        }
    }
}, HEALTH_CHECK_INTERVAL);

// Monitor for disconnection
client.on('disconnected', (reason) => {
    console.error('❌ Bot disconnected:', reason);
    isReady = false;

    // Force exit after 30 seconds if not reconnected
    setTimeout(() => {
        if (!isReady) {
            console.error('🚨 Failed to reconnect after 30 seconds. FORCING RESTART...');
            process.exit(1);
        }
    }, 30000);
});

// Graceful shutdown handler
process.on('SIGINT', async () => {
    console.log('⚠️ Received SIGINT. Shutting down gracefully...');
    await client.destroy();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('⚠️ Received SIGTERM. Shutting down gracefully...');
    await client.destroy();
    process.exit(0);
});

// Initialize client
console.log('🚀 Memulai bot...');
console.log('📱 Scan QR code dengan WhatsApp Anda!');
console.log('🔍 Watchdog enabled: Will auto-restart if unresponsive');
client.initialize();
