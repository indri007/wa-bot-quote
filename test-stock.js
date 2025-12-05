const { analyzeStock } = require('./stock-analysis');

async function test() {
    console.log('🧪 Testing Stock Analysis Feature...\n');

    // Test 1: US Stock
    console.log('📊 Test 1: Analyzing AAPL (Apple)...\n');
    const result1 = await analyzeStock('AAPL');
    console.log(result1);
    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Indonesian Stock
    console.log('📊 Test 2: Analyzing BBCA.JK (Bank BCA)...\n');
    const result2 = await analyzeStock('BBCA.JK');
    console.log(result2);
    console.log('\n' + '='.repeat(50) + '\n');

    // Test 3: Another US Stock
    console.log('📊 Test 3: Analyzing TSLA (Tesla)...\n');
    const result3 = await analyzeStock('TSLA');
    console.log(result3);
}

test().catch(err => console.error('Error:', err));
