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

        // STRATEGY 1: Parse from Data Scripts (Most Robust)
        const scriptData = parseFromScript(response.data, ticker);
        if (scriptData) {
            const isIDR = scriptData.currency === 'IDR';
            const locale = isIDR ? 'id-ID' : 'en-US';
            const priceFormatted = scriptData.price.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const currencySymbol = isIDR ? 'Rp' : (scriptData.currency === 'USD' ? '$' : scriptData.currency);

            return {
                symbol: ticker,
                googleSymbol: googleTicker,
                name: scriptData.name,
                price: `${currencySymbol} ${priceFormatted}`,
                currency: scriptData.currency,
                change: (scriptData.change > 0 ? '+' : '') + scriptData.change.toFixed(2),
                changePercent: (scriptData.changePercent > 0 ? '+' : '') + scriptData.changePercent.toFixed(2) + '%',
                details: {}, // Detailed parsing from JSON is possible but complex, skipping for now
                url: url
            };
        }

        // STRATEGY 2: Fallback to DOM Scraping
        console.log('⚠️ Script parsing failed. Falling back to DOM selectors...');
        const $ = cheerio.load(response.data);

        // Selectors (Updated Jan 2026 based on inspection)
        // Price class: .YMlKec.fxKbKc
        const priceText = $('.YMlKec.fxKbKc').first().text();

        // Name class: .zzDege
        const name = $('.zzDege').first().text() || ticker;

        // Try to find change strictly related to the main price header
        const changeValues = [];
        $('.P2Luy, .gQBj0d').each((i, el) => {
            changeValues.push($(el).text());
        });

        const change = changeValues[0] || '0';
        const changePercent = changeValues[1] || '0%';

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
            console.error('❌ Failed to parse price from DOM and Scripts.');
            return null;
        }

        // Clean up price
        const currency = priceText.includes('Rp') ? 'IDR' : (priceText.includes('$') ? 'USD' : '');

        return {
            symbol: ticker,
            googleSymbol: googleTicker,
            name: name,
            price: priceText,
            currency: currency,
            change: change,
            changePercent: changePercent,
            details: details,
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

function parseFromScript(html, ticker) {
    try {
        // Find all AF_initDataCallback blocks
        const regex = /AF_initDataCallback\({key: 'ds:1', hash: '[^']+', data:([\s\S]*?), sideChannel: {}}\);/gm;
        let match;

        // Clean ticker for matching (generic)
        // e.g. BBCA.JK -> BBCA
        const cleanTicker = ticker.split('.')[0];

        while ((match = regex.exec(html)) !== null) {
            const dataStr = match[1];
            try {
                const data = JSON.parse(dataStr);

                // Helper to recursive search
                function findStockData(obj) {
                    if (!obj || typeof obj !== 'object') return null;

                    if (Array.isArray(obj)) {
                        // Check if this array looks like a stock quote
                        // Format: ["/m/...", ["AAPL", "NASDAQ"], "Apple Inc", 0, "USD", [248.04, ...], ...]
                        // Check for ticker match in the identifiers array (obj[1])
                        // obj[1] is usually ["AAPL", "NASDAQ"]
                        if (obj.length > 5 &&
                            Array.isArray(obj[1]) &&
                            (obj[1].includes(cleanTicker) || obj[1].includes(ticker))) {
                            return obj;
                        }

                        for (let item of obj) {
                            const found = findStockData(item);
                            if (found) return found;
                        }
                    }
                    return null;
                }

                const stockData = findStockData(data);

                if (stockData) {
                    const name = stockData[2];
                    const currency = stockData[4];
                    const priceInfo = stockData[5];

                    if (priceInfo && priceInfo.length >= 3) {
                        return {
                            name,
                            price: priceInfo[0], // Number
                            currency,
                            change: priceInfo[1], // Number
                            changePercent: priceInfo[2] // Number
                        };
                    }
                }

            } catch (e) {
                // Ignore parse errors for individual blocks
            }
        }
    } catch (e) {
        console.error("Error in regex parsing", e);
    }
    return null;
}

module.exports = { getQuote };
