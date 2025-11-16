// Script untuk cek buku di Google Drive
const fs = require('fs');
const { google } = require('googleapis');

// ID Folder "persediaan buku"
const FOLDER_ID = '1AvdFg9yLWyQg9UL1jKJUNU6KESjd-ugO';

async function checkBook(bookTitle) {
  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync('credentials.json'));
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Load token
    const token = JSON.parse(fs.readFileSync('token.json'));
    oAuth2Client.setCredentials(token);

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    // Search file di folder
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed=false`,
      fields: 'files(id, name)',
      pageSize: 1000
    });

    const files = response.data.files;
    
    console.log(`📁 Total files di folder: ${files.length}`);
    console.log(`🔍 Mencari: "${bookTitle}"`);
    
    // Normalisasi judul buku yang dicari (hapus karakter spesial, lowercase)
    const normalizeText = (text) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Hapus karakter spesial
        .replace(/\s+/g, ' ')     // Normalize spasi
        .trim();
    };
    
    const searchTerm = normalizeText(bookTitle);
    console.log(`🔎 Search term (normalized): "${searchTerm}"`);
    
    // Cari buku yang cocok dengan fuzzy matching
    const foundBook = files.find(file => {
      const fileName = normalizeText(file.name);
      
      // Cek apakah semua kata dari search term ada di filename
      const searchWords = searchTerm.split(' ');
      const allWordsFound = searchWords.every(word => 
        word.length > 0 && fileName.includes(word)
      );
      
      // Debug log
      if (allWordsFound) {
        console.log(`✅ Match found: "${file.name}" → normalized: "${fileName}"`);
      }
      
      return allWordsFound;
    });
    
    if (!foundBook) {
      console.log(`❌ Tidak ditemukan. Menampilkan 5 file pertama untuk referensi:`);
      files.slice(0, 5).forEach(file => {
        console.log(`   - ${file.name}`);
      });
    }

    return {
      found: !!foundBook,
      fileName: foundBook ? foundBook.name : null,
      fileId: foundBook ? foundBook.id : null
    };

  } catch (error) {
    console.error('Error checking book:', error.message);
    return { found: false, error: error.message };
  }
}

module.exports = { checkBook };
