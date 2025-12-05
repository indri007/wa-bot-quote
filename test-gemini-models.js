require('dotenv').config();
const axios = require('axios');

async function listModels() {
    try {
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
        );
        
        console.log('✅ Available Gemini Models:\n');
        response.data.models.forEach(model => {
            console.log(`- ${model.name}`);
            console.log(`  Display Name: ${model.displayName}`);
            console.log(`  Supported: ${model.supportedGenerationMethods.join(', ')}\n`);
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
}

listModels();
