// Script untuk cek buku di Google Drive
const fs = require('fs');
const { google } = require('googleapis');

// ID Folder "persediaan buku"
const FOLDER_ID = '1AvdFg9yLWyQg9UL1jKJUNU6KESjd-ugO';

async function checkBook(bookTitle) {
  try {
    // Load credentials
    const credentials = require('./google-auth').getCredentials();
    if (!credentials) throw new Error('Credentials not found');

    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Load token
    const token = require('./google-auth').getToken();
    if (!token) throw new Error('Token not found');

    oAuth2Client.setCredentials(token);

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    // Search file di folder
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed=false`,
      fields: 'files(id, name)',
      pageSize: 1000
    });

    const files = response.data.files;

    // Cari buku yang cocok
    const bookTitleLower = bookTitle.toLowerCase();
    const foundBook = files.find(file =>
      file.name.toLowerCase().includes(bookTitleLower)
    );

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
