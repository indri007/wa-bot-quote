// Script untuk test koneksi Google Drive dan list buku
const fs = require('fs');
const { google } = require('googleapis');

const FOLDER_ID = '1AvdFg9yLWyQg9UL1jKJUNU6KESjd-ugO';

async function testDrive() {
  try {
    console.log('🧪 Testing koneksi Google Drive...\n');

    // Check credentials
    if (!fs.existsSync('credentials.json')) {
      console.error('❌ File credentials.json tidak ditemukan!');
      console.log('📝 Download dari Google Cloud Console\n');
      return;
    }

    // Check token
    if (!fs.existsSync('token.json')) {
      console.error('❌ File token.json tidak ditemukan!');
      console.log('📝 Jalankan: node authorize-drive.js\n');
      return;
    }

    // Load credentials
    const credentials = JSON.parse(fs.readFileSync('credentials.json'));
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Load token
    const token = JSON.parse(fs.readFileSync('token.json'));
    oAuth2Client.setCredentials(token);

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    console.log('✅ Koneksi berhasil!\n');
    console.log('📚 Daftar buku di folder "persediaan buku":\n');

    // List files
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType, size)',
      pageSize: 100,
      orderBy: 'name'
    });

    const files = response.data.files;

    if (files.length === 0) {
      console.log('⚠️ Tidak ada file di folder ini.\n');
      return;
    }

    console.log(`Total: ${files.length} file\n`);
    console.log('─'.repeat(60));

    files.forEach((file, index) => {
      const size = file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'N/A';
      console.log(`${index + 1}. ${file.name}`);
      console.log(`   Size: ${size}`);
      console.log('');
    });

    console.log('─'.repeat(60));
    console.log('\n🎉 Test berhasil!');
    console.log('📱 Bot siap menerima perintah "buku [judul]"\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.log('\n⚠️ Token expired.');
      console.log('📝 Jalankan: node authorize-drive.js\n');
    }
  }
}

testDrive();
