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

// Event: Disconnected
client.on('disconnected', (reason) => {
    console.log('⚠️ Bot disconnected:', reason);
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
            await message.reply('👋 Halo! Ada yang bisa saya bantu?\n\nKetik *menu* untuk lihat perintah.');
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

            await message.reply(menu);
        }

        else if (pesan === 'ping') {
            await message.reply('✅ Bot aktif! 🟢');
        }

        else if (pesan === 'info') {
            const infoText = `🤖 *BOT WHATSAPP ASSISTANT*\n\n` +
                `Bot otomatis dengan AI untuk analisis saham!\n\n` +
                `✅ Analisis Saham AI (Gemini)\n` +
                `✅ Data Real-time\n` +
                `✅ Cryptocurrency\n` +
                `✅ QR Code Generator\n` +
                `✅ Wikipedia\n\n` +
                `Ketik *menu* untuk mulai! 🚀`;

            await message.reply(infoText);
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

        // Fitur Saham
        else if (pesan.startsWith('saham ')) {
            const symbol = pesan.replace('saham ', '').trim().toUpperCase();
            try {
                await message.reply('⏳ Mengambil data saham...');

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

                    let stockInfo = `📈 *${quote.symbol}*\n`;
                    stockInfo += quote.longName ? `${quote.longName}\n\n` : '\n';
                    stockInfo += `💵 Harga: ${currency} ${price}\n`;
                    stockInfo += `${changeEmoji} Perubahan: ${change} (${changePercent}%)\n\n`;
                    stockInfo += `Data dari Yahoo Finance`;

                    await message.reply(stockInfo);
                } else {
                    await message.reply(`❌ Saham "${symbol}" tidak ditemukan.\n\nContoh: AAPL, BBCA.JK`);
                }

            } catch (error) {
                console.error('Error fetching stock:', error);
                await message.reply(`❌ Gagal mengambil data saham "${symbol}".`);
            }
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

// Initialize client
console.log('🚀 Memulai bot...');
client.initialize();
