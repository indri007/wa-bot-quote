const googleFinance = require('./google-finance-scraper');

async function test() {
    console.log('Testing AAPL...');
    const quote = await googleFinance.getQuote('AAPL');
    console.log('Result AAPL:', quote);

    console.log('\nTesting BBCA.JK...');
    const quote2 = await googleFinance.getQuote('BBCA.JK');
    console.log('Result BBCA.JK:', quote2);
}

test();
