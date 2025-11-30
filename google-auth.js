const fs = require('fs');
require('dotenv').config();

function getCredentials() {
    if (process.env.GOOGLE_CREDENTIALS) {
        try {
            return JSON.parse(process.env.GOOGLE_CREDENTIALS);
        } catch (error) {
            console.error('❌ Error parsing GOOGLE_CREDENTIALS environment variable:', error.message);
            return null;
        }
    }

    if (fs.existsSync('credentials.json')) {
        return JSON.parse(fs.readFileSync('credentials.json'));
    }

    return null;
}

function getToken() {
    if (process.env.GOOGLE_TOKEN) {
        try {
            return JSON.parse(process.env.GOOGLE_TOKEN);
        } catch (error) {
            console.error('❌ Error parsing GOOGLE_TOKEN environment variable:', error.message);
            return null;
        }
    }

    if (fs.existsSync('token.json')) {
        return JSON.parse(fs.readFileSync('token.json'));
    }

    return null;
}

module.exports = { getCredentials, getToken };
