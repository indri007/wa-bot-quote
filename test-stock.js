const { getChart } = require('./stock-analysis');

async function test() {
    console.log('🧪 Testing Stock Analysis Feature...');

    console.log('📊 Testing Chart Generation for AAPL...');
    const chartUrl = await getChart('AAPL');

    if (chartUrl) {
        console.log('✅ Chart URL generated:', chartUrl);
    } else {
        console.error('❌ Failed to generate chart URL.');
    }
}

test();
