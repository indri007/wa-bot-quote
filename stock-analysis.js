const axios = require('axios');
const { OpenAI } = require('openai');
require('dotenv').config();

const CHART_API_URL = 'https://api.chart-img.com/v2/tradingview/advanced-chart/storage';
const CHART_API_KEY = 'JHFZGqM8Ug19bwPRUXbOX2lkiyqvnbqw9CS4TeHN'; // Provided in the request

async function getChart(ticker) {
    try {
        const response = await axios.post(
            CHART_API_URL,
            {
                theme: 'dark',
                interval: '1W',
                symbol: `NASDAQ:${ticker}`, // Defaulting to NASDAQ for now, could be dynamic
                override: {
                    showStudyLastValue: false
                },
                studies: [
                    {
                        name: 'Volume',
                        forceOverlay: true
                    },
                    {
                        name: 'MACD',
                        override: {
                            'Signal.linewidth': 2,
                            'Signal.color': 'rgb(255,65,129)'
                        }
                    }
                ]
            },
            {
                headers: {
                    'x-api-key': CHART_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data.url) {
            return response.data.url;
        }
        return null;
    } catch (error) {
        console.error('❌ Error getting chart:', error.message);
        return null;
    }
}

async function analyzeStock(ticker, chartUrl) {
    if (!process.env.OPENROUTER_API_KEY) {
        return '⚠️ OpenRouter API Key belum diset. Tidak dapat melakukan analisa otomatis.';
    }

    const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: process.env.OPENROUTER_API_KEY,
        defaultHeaders: {
            'HTTP-Referer': 'https://github.com/Edubia/wa-bot-tes', // Optional: for OpenRouter rankings
            'X-Title': 'WA Bot Stock Analyst', // Optional: for OpenRouter rankings
        },
    });

    const prompt = `
Role: You are an expert financial analyst specializing in technical analysis of stock charts.
Task: Analyze the stock ${ticker}.
Context: The user has requested a technical analysis.
Instructions:
1. Candlestick Analysis: Identify patterns, trend (bullish/bearish), breakout/pullback zones.
2. MACD Analysis: Signal line crossovers, histogram momentum, divergences.
3. Volume Analysis: Significant changes, support/contradiction of price.
4. Support/Resistance: Key levels.
5. Actionable Insights: Potential buy/sell/hold strategies (educational only).

Provide a clear, concise, and friendly summary in Indonesian (Bahasa Indonesia).
`;

    try {
        const response = await openai.chat.completions.create({
            model: 'openai/gpt-4o-mini', // OpenRouter model ID
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: prompt },
                        {
                            type: 'image_url',
                            image_url: {
                                "url": chartUrl,
                            },
                        }
                    ],
                },
            ],
            max_tokens: 500,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('❌ Error analyzing stock with OpenRouter:', error.message);
        return '❌ Maaf, terjadi kesalahan saat menganalisa saham.';
    }
}

module.exports = { getChart, analyzeStock };
