// Currency Converter dengan Gemini AI
const axios = require('axios');
require('dotenv').config();

/**
 * Get currency exchange rate menggunakan API gratis
 */
async function getCurrencyRate(from, to, amount = 1) {
    try {
        // Gunakan API gratis dari exchangerate-api.com
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from.toUpperCase()}`);
        
        if (response.data && response.data.rates) {
            const rate = response.data.rates[to.toUpperCase()];
            
            if (rate) {
                const result = amount * rate;
                return {
                    success: true,
                    from: from.toUpperCase(),
                    to: to.toUpperCase(),
                    amount: amount,
                    rate: rate,
                    result: result,
                    date: response.data.date
                };
            }
        }
        
        return { success: false, error: 'Currency not found' };
        
    } catch (error) {
        console.error('Error fetching currency rate:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Analisis kurs dengan Gemini AI
 */
async function analyzeCurrencyWithAI(from, to, rateData) {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === '') {
        return null; // Return null jika tidak ada API key
    }

    try {
        const prompt = `Kamu adalah seorang analis keuangan dan forex expert. Berikan analisis singkat tentang nilai tukar mata uang berikut:

Pasangan Mata Uang: ${from}/${to}
Nilai Tukar Saat Ini: 1 ${from} = ${rateData.rate.toFixed(4)} ${to}
Tanggal: ${rateData.date}

Berikan analisis dalam format berikut (maksimal 300 kata):
1. KONDISI SAAT INI (2-3 baris)
2. FAKTOR YANG MEMPENGARUHI (3-4 poin singkat)
3. OUTLOOK JANGKA PENDEK (2-3 baris)
4. TIPS UNTUK PENGGUNA (2-3 baris)

Gunakan bahasa Indonesia yang mudah dipahami dan emoji yang sesuai.`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 20000
            }
        );

        if (response.data && response.data.candidates && response.data.candidates[0]) {
            return response.data.candidates[0].content.parts[0].text;
        }

        return null;

    } catch (error) {
        console.error('Error with Gemini AI for currency:', error.message);
        return null;
    }
}

/**
 * Format currency response
 */
function formatCurrencyResponse(rateData, aiAnalysis = null) {
    let response = `💱 *KURS MATA UANG*\n\n`;
    
    response += `📊 *NILAI TUKAR*\n`;
    response += `${rateData.amount} ${rateData.from} = ${rateData.result.toFixed(2)} ${rateData.to}\n\n`;
    
    response += `📈 *RATE*\n`;
    response += `1 ${rateData.from} = ${rateData.rate.toFixed(4)} ${rateData.to}\n`;
    response += `1 ${rateData.to} = ${(1/rateData.rate).toFixed(4)} ${rateData.from}\n\n`;
    
    response += `📅 Update: ${rateData.date}\n`;
    
    if (aiAnalysis) {
        response += `\n${aiAnalysis}\n`;
        response += `\n💡 Powered by Gemini AI`;
    }
    
    response += `\n📊 Data dari ExchangeRate-API`;
    
    return response;
}

/**
 * Main function untuk konversi kurs
 */
async function convertCurrency(from, to, amount = 1) {
    console.log(`💱 Converting ${amount} ${from} to ${to}...`);
    
    // Get rate data
    const rateData = await getCurrencyRate(from, to, amount);
    
    if (!rateData.success) {
        return `❌ Gagal mendapatkan kurs ${from}/${to}.\n\nPastikan kode mata uang benar.\nContoh: USD, EUR, IDR, JPY, GBP`;
    }
    
    // Get AI analysis (optional)
    let aiAnalysis = null;
    if (process.env.GEMINI_API_KEY) {
        console.log('🤖 Getting AI analysis...');
        aiAnalysis = await analyzeCurrencyWithAI(from, to, rateData);
    }
    
    // Format response
    return formatCurrencyResponse(rateData, aiAnalysis);
}

/**
 * Get popular currency rates
 */
async function getPopularRates(baseCurrency = 'USD') {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency.toUpperCase()}`);
        
        if (response.data && response.data.rates) {
            const rates = response.data.rates;
            
            // Popular currencies
            const popular = ['IDR', 'EUR', 'GBP', 'JPY', 'CNY', 'SGD', 'MYR', 'AUD'];
            
            let result = `💱 *KURS ${baseCurrency.toUpperCase()} HARI INI*\n\n`;
            
            popular.forEach(currency => {
                if (rates[currency]) {
                    result += `${currency}: ${rates[currency].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
                }
            });
            
            result += `\n📅 Update: ${response.data.date}`;
            result += `\n📊 Data dari ExchangeRate-API`;
            
            return result;
        }
        
        return '❌ Gagal mendapatkan data kurs.';
        
    } catch (error) {
        console.error('Error fetching popular rates:', error.message);
        return '❌ Gagal mendapatkan data kurs.';
    }
}

module.exports = {
    convertCurrency,
    getPopularRates,
    getCurrencyRate
};
