
const axios = require('axios');
const cheerio = require('cheerio');

async function getStockGoogle(ticker) {
    try {
        // Handle ID tickers (e.g. BBCA.JK -> BBCA:IDX)
        let googleTicker = ticker;
        if (ticker.endsWith('.JK')) {
            googleTicker = ticker.replace('.JK', ':IDX');
        } else if (!ticker.includes(':')) {
            // Default to NASDAQ/NYSE if no exchange specified? Or let Google Decide?
            // Google often needs exchange for accuracy.
        }

        const url = `https://www.google.com/finance/quote/${googleTicker}`;
        console.log(`Fetching ${url}...`);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);

        // Class names might change, but these are common recent ones
        // Price: .YMlKec.fxKbKc
        const price = $('.YMlKec.fxKbKc').first().text();

        // Name: .zzDege
        const name = $('.zzDege').first().text();

        // Change: .P2Luy (various colors)
        const change = $('.P2Luy').first().text(); // +1.23%

        // Previous Close? Open?
        // These are usually in table cells.

        console.log({
            ticker: googleTicker,
            name,
            price,
            change
        });

        if (!price) {
            console.log('❌ Failed to parse price. Classes might have changed.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Test
getStockGoogle('BBCA.JK');
getStockGoogle('AAPL');
