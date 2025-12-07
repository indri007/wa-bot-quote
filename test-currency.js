const { convertCurrency, getPopularRates } = require('./currency-converter');

async function test() {
    console.log('🧪 Testing Currency Converter...\n');

    // Test 1: Get popular rates
    console.log('📊 Test 1: Get USD rates...\n');
    const rates = await getPopularRates('USD');
    console.log(rates);
    console.log('\n' + '='.repeat(60) + '\n');

    // Test 2: Convert with AI analysis
    console.log('💱 Test 2: Convert USD to IDR with AI...\n');
    const result1 = await convertCurrency('USD', 'IDR', 100);
    console.log(result1);
    console.log('\n' + '='.repeat(60) + '\n');

    // Test 3: Convert EUR to USD
    console.log('💱 Test 3: Convert EUR to USD...\n');
    const result2 = await convertCurrency('EUR', 'USD', 50);
    console.log(result2);
}

test().catch(err => {
    console.error('Error:', err);
});
