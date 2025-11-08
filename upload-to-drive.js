// Script Upload File ke Google Drive
const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

// ID Folder Google Drive Anda
const FOLDER_ID = '1AvdFg9yLWyQg9UL1jKJUNU6KESjd-ugO';

// File yang akan diupload
const FILE_PATH = './PANDUAN_LENGKAP_BOT_WHATSAPP.md';

async function uploadFile() {
  try {
    console.log('🚀 Memulai upload ke Google Drive...\n');

    // Load credentials
    const credentials = JSON.parse(fs.readFileSync('credentials.json'));
    
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Load token
    let token;
    try {
      token = JSON.parse(fs.readFileSync('token.json'));
      oAuth2Client.setCredentials(token);
    } catch (err) {
      console.error('❌ Token tidak ditemukan!');
      console.log('📝 Jalankan: node authorize-drive.js untuk mendapatkan token\n');
      return;
    }

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    // Upload file
    const fileMetadata = {
      name: 'PANDUAN_BOT_WHATSAPP.md',
      parents: [FOLDER_ID]
    };

    const media = {
      mimeType: 'text/markdown',
      body: fs.createReadStream(FILE_PATH)
    };

    console.log('📤 Mengupload file...');
    
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink'
    });

    console.log('\n✅ Upload berhasil!');
    console.log('📄 Nama file:', response.data.name);
    console.log('🔗 Link:', response.data.webViewLink);
    console.log('\n🎉 File sudah tersimpan di Google Drive Anda!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.log('\n⚠️ Token expired atau invalid.');
      console.log('📝 Jalankan ulang: node authorize-drive.js\n');
    }
  }
}

uploadFile();
