// Script untuk Authorize Google Drive
const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');

// Scopes yang dibutuhkan
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = 'token.json';

async function authorize() {
  try {
    // Load credentials
    if (!fs.existsSync('credentials.json')) {
      console.error('❌ File credentials.json tidak ditemukan!');
      console.log('\n📝 Ikuti langkah di SETUP_GOOGLE_DRIVE.md untuk mendapatkan credentials.json\n');
      return;
    }

    const credentials = JSON.parse(fs.readFileSync('credentials.json'));
    const { client_secret, client_id } = credentials.installed || credentials.web;
    const redirect_uris = credentials.installed?.redirect_uris || credentials.web?.redirect_uris || ['http://localhost'];
    
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Generate auth URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    console.log('🔐 Authorize aplikasi dengan membuka URL ini:\n');
    console.log(authUrl);
    console.log('\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('📝 Masukkan kode authorization dari URL: ', async (code) => {
      rl.close();
      
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Save token
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log('\n✅ Token berhasil disimpan ke', TOKEN_PATH);
        console.log('🎉 Authorization berhasil!');
        console.log('\n📤 Sekarang jalankan: node upload-to-drive.js\n');
      } catch (error) {
        console.error('❌ Error mendapatkan token:', error.message);
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

authorize();
