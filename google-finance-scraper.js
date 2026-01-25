const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Scrape data saham dari Google Finance
 * @param {string} ticker - Contoh: BBCA.JK, AAPL, BTC-USD
 */
async function getQuote(ticker) {
    try {
        // Normalisasi Ticker untuk Google Finance
        let googleTicker = ticker;
        let exchange = '';

        // Handle Indonesia Stock Exchange
        if (ticker.endsWith('.JK')) {
            googleTicker = ticker.replace('.JK', ':IDX');
            exchange = 'IDX';
        }
        // Handle Crypto (biasanya format USD-BTC di Google, tapi BTC-USD juga bisa redirect)
        else if (ticker.includes('-USD')) {
            // Biarkan default, Google pintar menebak
        }
        // Handle US Stocks (Default)
        else if (!ticker.includes(':')) {
            // Google usually defaults to NASDAQ or NYSE
        }

        const url = `https://www.google.com/finance/quote/${googleTicker}`;
        console.log(`🔍 Fetching data from: ${url}`);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8'
            },
            timeout: 10000
        });

        const $ = cheerio.load(response.data);

        // Selectors (Updated Jan 2026 based on inspection)
        // Price class: .YMlKec.fxKbKc
        const priceText = $('.YMlKec.fxKbKc').first().text();

        // Name class: .zzDege
        const name = $('.zzDege').first().text() || ticker;

        // Change class: .P2Luy (for +/- amount) and percentage might be adjacent
        // Note: Google Finance structure varies. usually .P2Luy contains "+1.23%"
        // We might need to look for specific structure.

        // Try getting the main header section
        const changeValues = [];
        $('.P2Luy').each((i, el) => {
            changeValues.push($(el).text());
        });

        const change = changeValues[0] || '0'; // Amount
        const changePercent = changeValues[1] || '0%'; // Percentage (sometimes combined)

        // Previous Close / Open / Market Cap often in table .gyFHrc
        const details = {};
        $('.gyFHrc').each((i, el) => {
            const label = $(el).find('.mfs7Fc').text();
            const value = $(el).find('.P6K39c').text();
            if (label && value) {
                details[label] = value;
            }
        });

        if (!priceText) {
            console.error('❌ Failed to parse price.');
            return null;
        }

        // Clean up price (remove currency symbols for raw number if needed, but keeping string is safer for display)
        const currency = priceText.includes('Rp') ? 'IDR' : (priceText.includes('$') ? 'USD' : '');

        return {
            symbol: ticker,
            googleSymbol: googleTicker,
            name: name,
            price: priceText,
            currency: currency,
            change: change,
            changePercent: changePercent,
            details: details, // Contains Open, High, Low, Mkt Cap, etc.
            url: url
        };

    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`❌ Ticker ${ticker} not found.`);
            return null;
        }
        console.error('❌ Error scraping Google Finance:', error.message);
        throw error;
    }
}

module.exports = { getQuote };
