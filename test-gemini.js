const { analyzeStock } = require('./stock-analysis');

async function test() {
    console.log('🧪 Testing Stock Analysis with Gemini AI...\n');

    // Test dengan Gemini AI
    console.log('📊 Analyzing AAPL with Gemini AI...\n');
    const result = await analyzeStock('AAPL');
    console.log(result);
}

test().catch(err => {
    console.error('Error:', err);
    console.error('Stack:', err.stack);
});
