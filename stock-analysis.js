// Stock Analysis dengan Gemini AI (GRATIS)
const { GoogleGenerativeAI } = require('@google/generative-ai');
const googleFinance = require('./google-finance-scraper');
require('dotenv').config();

/**
 * Analisis Saham dengan Gemini AI
 * Menggunakan data dari Google Finance Scraper + Analisis AI
 */
async function analyzeStock(ticker) {
    try {
        console.log(`📊 Menganalisa ${ticker} dengan Google Finance...`);

        // 1. Ambil data quote dari Google Finance
        const quote = await googleFinance.getQuote(ticker);

        if (!quote) {
            return `❌ Ticker "${ticker}" tidak ditemukan di Google Finance.\n\nPastikan kode ticker benar:\n• US: AAPL, TSLA, GOOGL\n• ID: BBCA.JK, TLKM.JK`;
        }

        // 2. Analisis dengan Gemini AI (Snapshot Analysis)
        return await analyzeWithGemini(ticker, quote);

    } catch (error) {
        console.error('❌ Error analyzing stock:', error.message);
        return `❌ Gagal menganalisa saham ${ticker}.\n\nError: ${error.message}\n\nCoba lagi nanti.`;
    }
}

/**
 * Analisis menggunakan Gemini AI
 */
async function analyzeWithGemini(ticker, quote) {
    // Cek API key
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === '') {
        console.log('⚠️ GEMINI_API_KEY tidak ditemukan, menampilkan data dasar');
        return formatBasicAnalysis(ticker, quote);
    }

    try {
        console.log('🤖 Menggunakan Gemini AI untuk analisis...');

        // Siapkan data untuk analisis
        const stockData = prepareStockData(ticker, quote);

        // Prompt untuk Gemini
        const prompt = `Kamu adalah seorang analis saham profesional. Analisa data saham berikut dan berikan rekomendasi dalam Bahasa Indonesia.

DATA SAHAM ${ticker}:
${stockData}

Berikan analisis dalam format berikut:
1. RINGKASAN HARGA (singkat, 2-3 baris)
2. SENTIMEN PASAR (berdasarkan perubahan harga hari ini)
3. DATA FUNDAMENTAL (jika ada market cap/PE ratio)
4. REKOMENDASI (BUY/SELL/HOLD dengan alasan jelas)
5. DISCLAIMER (ini bukan saran investasi)

Gunakan emoji yang sesuai. Maksimal 300 kata. Fokus pada insight dari data yang tersedia.`;

        // Gunakan REST API langsung (lebih reliable)
        console.log('📡 Mengirim request ke Gemini AI...');
        const axios = require('axios');

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
                timeout: 30000 // 30 seconds
            }
        );

        if (response.data && response.data.candidates && response.data.candidates[0]) {
            const analysis = response.data.candidates[0].content.parts[0].text;
            console.log('✅ Analisis AI berhasil!');
            return `📊 *ANALISIS SAHAM: ${ticker}*\n\n${analysis}\n\n💡 Powered by Gemini AI\n📊 Data dari Google Finance`;
        } else {
            throw new Error('Invalid response from Gemini API');
        }

    } catch (error) {
        console.error('❌ Error with Gemini AI:', error.message);

        // Fallback ke info dasar
        return formatBasicAnalysis(ticker, quote);
    }
}

/**
 * Siapkan data saham untuk Gemini
 */
function prepareStockData(ticker, quote) {
    let data = `Ticker: ${quote.symbol} (Google: ${quote.googleSymbol})\n`;
    data += `Nama: ${quote.name}\n`;
    data += `Harga Saat Ini: ${quote.price}\n`;
    data += `Perubahan: ${quote.change} (${quote.changePercent})\n`;
    data += `URL: ${quote.url}\n\n`;

    data += `DATA TAMBAHAN:\n`;
    for (const [key, value] of Object.entries(quote.details)) {
        data += `${key}: ${value}\n`;
    }

    return data;
}

/**
 * Format basic analysis (fallback)
 */
function formatBasicAnalysis(ticker, quote) {
    let report = `📊 *INFO SAHAM: ${quote.name}* (${quote.symbol})\n\n`;

    report += `💰 Harga: ${quote.price}\n`;
    report += `📈 Perubahan: ${quote.change} (${quote.changePercent})\n\n`;

    if (quote.details['Previous close']) report += `Harian Sebelumnya: ${quote.details['Previous close']}\n`;
    if (quote.details.Open) report += `Buka: ${quote.details.Open}\n`;
    if (quote.details['Day range']) report += `Range Hari Ini: ${quote.details['Day range']}\n`;
    if (quote.details['52-week range']) report += `Range 52M: ${quote.details['52-week range']}\n`;
    if (quote.details['Market cap']) report += `Market Cap: ${quote.details['Market cap']}\n`;

    report += `\n🔗 ${quote.url}\n`;
    report += `\n⚠️ Analisis AI tidak tersedia saat ini.`;

    return report;
}

module.exports = { analyzeStock };

