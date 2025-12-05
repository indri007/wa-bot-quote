// Stock Analysis dengan Gemini AI (GRATIS)
const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

/**
 * Analisis Saham dengan Gemini AI
 * Menggunakan data dari Yahoo Finance + Analisis AI
 */
async function analyzeStock(ticker) {
    try {
        console.log(`📊 Menganalisa ${ticker}...`);

        // 1. Ambil data quote dari Yahoo Finance
        const quote = await yahooFinance.quote(ticker);
        
        if (!quote || !quote.regularMarketPrice) {
            return `❌ Ticker "${ticker}" tidak ditemukan.\n\nPastikan kode ticker benar:\n• US: AAPL, TSLA, GOOGL\n• ID: BBCA.JK, TLKM.JK, BBRI.JK`;
        }

        // 2. Ambil data historis
        let historical;
        try {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 3);

            historical = await yahooFinance.historical(ticker, {
                period1: startDate,
                period2: endDate,
                interval: '1d'
            });
        } catch (histError) {
            console.error('Error fetching historical data:', histError.message);
            // Fallback: analisis tanpa data historis
            return await analyzeWithGemini(ticker, quote, null);
        }

        if (!historical || historical.length === 0) {
            return await analyzeWithGemini(ticker, quote, null);
        }

        // 3. Analisis dengan Gemini AI
        return await analyzeWithGemini(ticker, quote, historical);

    } catch (error) {
        console.error('❌ Error analyzing stock:', error.message);
        console.error('Stack:', error.stack);
        return `❌ Gagal menganalisa saham ${ticker}.\n\nKemungkinan:\n• Kode ticker salah\n• API Yahoo Finance sedang sibuk\n• Coba lagi dalam beberapa saat\n\nContoh ticker:\n• US: AAPL, TSLA, MSFT\n• ID: BBCA.JK, TLKM.JK`;
    }
}

/**
 * Analisis menggunakan Gemini AI
 */
async function analyzeWithGemini(ticker, quote, historical) {
    // Cek API key
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === '') {
        console.log('⚠️ GEMINI_API_KEY tidak ditemukan, gunakan analisis manual');
        // Fallback ke analisis manual
        if (historical && historical.length > 0) {
            const analysis = performTechnicalAnalysis(quote, historical);
            return formatAnalysisReport(ticker, quote, analysis);
        } else {
            return formatBasicAnalysis(ticker, quote);
        }
    }

    try {
        console.log('🤖 Menggunakan Gemini AI untuk analisis...');
        
        // Siapkan data untuk analisis
        const stockData = prepareStockData(ticker, quote, historical);

        // Prompt untuk Gemini
        const prompt = `Kamu adalah seorang analis saham profesional. Analisa data saham berikut dan berikan rekomendasi dalam Bahasa Indonesia.

DATA SAHAM ${ticker}:
${stockData}

Berikan analisis dalam format berikut:
1. RINGKASAN HARGA (singkat, 2-3 baris)
2. ANALISIS TREND (bullish/bearish/sideways dengan alasan)
3. ANALISIS TEKNIKAL (support, resistance, volume)
4. REKOMENDASI (BUY/SELL/HOLD dengan alasan jelas)
5. DISCLAIMER (ini bukan saran investasi)

Gunakan emoji yang sesuai. Maksimal 500 kata. Fokus pada insight yang actionable.`;

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
            return `📊 *ANALISIS SAHAM: ${ticker}*\n\n${analysis}\n\n💡 Powered by Gemini AI\n📊 Data dari Yahoo Finance`;
        } else {
            throw new Error('Invalid response from Gemini API');
        }

    } catch (error) {
        console.error('❌ Error with Gemini AI:', error.message);
        if (error.response && error.response.data) {
            console.error('API Error:', JSON.stringify(error.response.data));
        }
        
        // Fallback ke analisis manual jika Gemini gagal
        console.log('⚠️ Fallback ke analisis manual...');
        if (historical && historical.length > 0) {
            const analysis = performTechnicalAnalysis(quote, historical);
            return formatAnalysisReport(ticker, quote, analysis);
        } else {
            return formatBasicAnalysis(ticker, quote);
        }
    }
}

/**
 * Siapkan data saham untuk Gemini
 */
function prepareStockData(ticker, quote, historical) {
    let data = `Ticker: ${ticker}\n`;
    
    if (quote.longName) {
        data += `Nama: ${quote.longName}\n`;
    }
    
    data += `Harga Saat Ini: ${quote.currency || 'USD'} ${quote.regularMarketPrice.toFixed(2)}\n`;
    
    if (quote.regularMarketChange) {
        data += `Perubahan: ${quote.regularMarketChange.toFixed(2)} (${quote.regularMarketChangePercent.toFixed(2)}%)\n`;
    }
    
    if (quote.regularMarketOpen) {
        data += `Open: ${quote.regularMarketOpen.toFixed(2)}\n`;
    }
    
    if (quote.regularMarketDayHigh && quote.regularMarketDayLow) {
        data += `High/Low Hari Ini: ${quote.regularMarketDayHigh.toFixed(2)} / ${quote.regularMarketDayLow.toFixed(2)}\n`;
    }
    
    if (quote.fiftyTwoWeekHigh && quote.fiftyTwoWeekLow) {
        data += `52-Week High/Low: ${quote.fiftyTwoWeekHigh.toFixed(2)} / ${quote.fiftyTwoWeekLow.toFixed(2)}\n`;
    }
    
    if (quote.marketCap) {
        data += `Market Cap: ${(quote.marketCap / 1e9).toFixed(2)}B\n`;
    }
    
    if (quote.regularMarketVolume) {
        data += `Volume: ${quote.regularMarketVolume.toLocaleString()}\n`;
    }

    // Tambahkan data historis jika ada
    if (historical && historical.length > 0) {
        const prices = historical.map(h => h.close);
        const sma20 = calculateSMA(prices, 20);
        const sma50 = calculateSMA(prices, 50);
        
        data += `\nDATA TEKNIKAL:\n`;
        data += `SMA 20: ${sma20.toFixed(2)}\n`;
        data += `SMA 50: ${sma50.toFixed(2)}\n`;
        
        const recentPrices = prices.slice(-10);
        data += `Harga 10 Hari Terakhir: ${recentPrices.map(p => p.toFixed(2)).join(', ')}\n`;
    }
    
    return data;
}

/**
 * Melakukan analisis teknikal berdasarkan data
 */
function performTechnicalAnalysis(quote, historical) {
    const currentPrice = quote.regularMarketPrice;
    const prices = historical.map(h => h.close);
    const volumes = historical.map(h => h.volume);

    // 1. Trend Analysis (Simple Moving Average)
    const sma20 = calculateSMA(prices, 20);
    const sma50 = calculateSMA(prices, 50);
    
    let trend = 'SIDEWAYS';
    let trendEmoji = '➡️';
    if (currentPrice > sma20 && sma20 > sma50) {
        trend = 'BULLISH';
        trendEmoji = '📈';
    } else if (currentPrice < sma20 && sma20 < sma50) {
        trend = 'BEARISH';
        trendEmoji = '📉';
    }

    // 2. Price Position
    const high52Week = quote.fiftyTwoWeekHigh || Math.max(...prices);
    const low52Week = quote.fiftyTwoWeekLow || Math.min(...prices);
    const pricePosition = ((currentPrice - low52Week) / (high52Week - low52Week) * 100).toFixed(1);

    // 3. Volume Analysis
    const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    const currentVolume = quote.regularMarketVolume || volumes[volumes.length - 1];
    const volumeRatio = (currentVolume / avgVolume).toFixed(2);
    
    let volumeSignal = 'NORMAL';
    if (volumeRatio > 1.5) volumeSignal = 'TINGGI';
    else if (volumeRatio < 0.5) volumeSignal = 'RENDAH';

    // 4. Volatility (based on price range)
    const volatility = calculateVolatility(prices);

    // 5. Support & Resistance (simplified)
    const support = Math.min(...prices.slice(-20));
    const resistance = Math.max(...prices.slice(-20));

    // 6. Recommendation
    const recommendation = generateRecommendation(trend, pricePosition, volumeSignal, quote);

    return {
        trend,
        trendEmoji,
        sma20: sma20.toFixed(2),
        sma50: sma50.toFixed(2),
        pricePosition,
        high52Week: high52Week.toFixed(2),
        low52Week: low52Week.toFixed(2),
        volumeSignal,
        volumeRatio,
        volatility: volatility.toFixed(2),
        support: support.toFixed(2),
        resistance: resistance.toFixed(2),
        recommendation
    };
}

/**
 * Calculate Simple Moving Average
 */
function calculateSMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1];
    const slice = prices.slice(-period);
    return slice.reduce((a, b) => a + b, 0) / period;
}

/**
 * Calculate Volatility (Standard Deviation)
 */
function calculateVolatility(prices) {
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
        returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    return Math.sqrt(variance) * 100; // as percentage
}

/**
 * Generate trading recommendation
 */
function generateRecommendation(trend, pricePosition, volumeSignal, quote) {
    const change = quote.regularMarketChangePercent || 0;
    
    let signal = 'HOLD';
    let emoji = '⏸️';
    let reason = '';

    // Bullish signals
    if (trend === 'BULLISH' && pricePosition < 70 && volumeSignal !== 'RENDAH') {
        signal = 'BUY';
        emoji = '🟢';
        reason = 'Trend naik dengan volume bagus, harga belum overbought';
    }
    // Bearish signals
    else if (trend === 'BEARISH' && pricePosition > 30) {
        signal = 'SELL';
        emoji = '🔴';
        reason = 'Trend turun, pertimbangkan cut loss atau wait';
    }
    // Overbought
    else if (pricePosition > 85 && change > 5) {
        signal = 'WAIT';
        emoji = '⚠️';
        reason = 'Harga mendekati puncak, tunggu koreksi';
    }
    // Oversold
    else if (pricePosition < 15 && trend !== 'BEARISH') {
        signal = 'BUY';
        emoji = '🟢';
        reason = 'Harga murah, potensi rebound';
    }
    // Default hold
    else {
        signal = 'HOLD';
        emoji = '⏸️';
        reason = 'Tunggu sinyal lebih jelas';
    }

    return { signal, emoji, reason };
}

/**
 * Format analysis report
 */
function formatAnalysisReport(ticker, quote, analysis) {
    const price = quote.regularMarketPrice.toFixed(2);
    const change = quote.regularMarketChange ? quote.regularMarketChange.toFixed(2) : '0';
    const changePercent = quote.regularMarketChangePercent ? quote.regularMarketChangePercent.toFixed(2) : '0';
    const changeEmoji = quote.regularMarketChange > 0 ? '📈' : '📉';
    const currency = quote.currency || 'USD';

    let report = `📊 *ANALISIS TEKNIKAL: ${ticker}*\n\n`;
    
    // Current Price
    report += `💰 *HARGA SAAT INI*\n`;
    report += `${currency} ${price} ${changeEmoji} ${change} (${changePercent}%)\n\n`;

    // Trend Analysis
    report += `📈 *ANALISIS TREND*\n`;
    report += `Trend: ${analysis.trendEmoji} ${analysis.trend}\n`;
    report += `SMA 20: ${currency} ${analysis.sma20}\n`;
    report += `SMA 50: ${currency} ${analysis.sma50}\n\n`;

    // Price Position
    report += `📍 *POSISI HARGA*\n`;
    report += `52W High: ${currency} ${analysis.high52Week}\n`;
    report += `52W Low: ${currency} ${analysis.low52Week}\n`;
    report += `Posisi: ${analysis.pricePosition}% dari range\n\n`;

    // Volume
    report += `📊 *VOLUME*\n`;
    report += `Status: ${analysis.volumeSignal}\n`;
    report += `Ratio: ${analysis.volumeRatio}x rata-rata\n\n`;

    // Support & Resistance
    report += `🎯 *SUPPORT & RESISTANCE*\n`;
    report += `Support: ${currency} ${analysis.support}\n`;
    report += `Resistance: ${currency} ${analysis.resistance}\n\n`;

    // Recommendation
    report += `💡 *REKOMENDASI*\n`;
    report += `${analysis.recommendation.emoji} ${analysis.recommendation.signal}\n`;
    report += `${analysis.recommendation.reason}\n\n`;

    // Disclaimer
    report += `⚠️ *DISCLAIMER*\n`;
    report += `Ini bukan saran investasi. Lakukan riset sendiri sebelum trading.\n\n`;
    report += `Data dari Yahoo Finance`;

    return report;
}

/**
 * Format basic analysis (fallback ketika historical data tidak tersedia)
 */
function formatBasicAnalysis(ticker, quote) {
    const price = quote.regularMarketPrice.toFixed(2);
    const change = quote.regularMarketChange ? quote.regularMarketChange.toFixed(2) : '0';
    const changePercent = quote.regularMarketChangePercent ? quote.regularMarketChangePercent.toFixed(2) : '0';
    const changeEmoji = quote.regularMarketChange > 0 ? '📈' : '📉';
    const currency = quote.currency || 'USD';

    let report = `📊 *ANALISIS SAHAM: ${ticker}*\n\n`;
    
    // Current Price
    report += `💰 *HARGA SAAT INI*\n`;
    report += `${currency} ${price} ${changeEmoji} ${change} (${changePercent}%)\n\n`;

    // Basic Info
    if (quote.longName) {
        report += `📌 ${quote.longName}\n\n`;
    }

    if (quote.marketCap) {
        const marketCap = (quote.marketCap / 1e9).toFixed(2);
        report += `📊 Market Cap: ${currency} ${marketCap}B\n`;
    }

    if (quote.regularMarketOpen) {
        report += `🔓 Open: ${currency} ${quote.regularMarketOpen.toFixed(2)}\n`;
    }

    if (quote.regularMarketDayHigh && quote.regularMarketDayLow) {
        report += `📊 High/Low: ${quote.regularMarketDayHigh.toFixed(2)} / ${quote.regularMarketDayLow.toFixed(2)}\n`;
    }

    if (quote.fiftyTwoWeekHigh && quote.fiftyTwoWeekLow) {
        report += `📈 52W High/Low: ${quote.fiftyTwoWeekHigh.toFixed(2)} / ${quote.fiftyTwoWeekLow.toFixed(2)}\n`;
    }

    report += `\n⚠️ Analisis teknikal lengkap tidak tersedia saat ini.\n`;
    report += `Gunakan command "saham ${ticker}" untuk info harga saja.\n\n`;
    report += `Data dari Yahoo Finance`;

    return report;
}

module.exports = { analyzeStock };
