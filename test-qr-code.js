// Test QR Code Generator
const axios = require('axios');
const fs = require('fs');

async function testQR() {
  try {
    const text = 'https://google.com';
    
    console.log('🔍 Testing QR Code Generator...\n');
    console.log(`Text: ${text}\n`);
    
    // Test API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
    
    console.log('📡 Calling API:', qrUrl);
    console.log('');
    
    const response = await axios.get(qrUrl, { responseType: 'arraybuffer' });
    
    console.log('✅ API Response:');
    console.log('   Status:', response.status);
    console.log('   Content-Type:', response.headers['content-type']);
    console.log('   Size:', response.data.length, 'bytes');
    console.log('');
    
    // Convert to buffer
    const buffer = Buffer.from(response.data, 'binary');
    
    console.log('📦 Buffer:');
    console.log('   Length:', buffer.length);
    console.log('   Type:', typeof buffer);
    console.log('');
    
    // Convert to base64
    const base64 = buffer.toString('base64');
    
    console.log('🔐 Base64:');
    console.log('   Length:', base64.length);
    console.log('   Preview:', base64.substring(0, 50) + '...');
    console.log('');
    
    // Save to file
    const filename = 'test-qr-code.png';
    fs.writeFileSync(filename, buffer);
    
    console.log('💾 Saved to:', filename);
    console.log('');
    
    // Test data URI
    const dataUri = `data:image/png;base64,${base64}`;
    console.log('🔗 Data URI:');
    console.log('   Length:', dataUri.length);
    console.log('   Preview:', dataUri.substring(0, 50) + '...');
    console.log('');
    
    console.log('✅ All tests passed!');
    console.log('');
    console.log('📋 Summary:');
    console.log('   ✅ API accessible');
    console.log('   ✅ Image downloaded');
    console.log('   ✅ Buffer created');
    console.log('   ✅ Base64 encoded');
    console.log('   ✅ File saved');
    console.log('   ✅ Data URI created');
    console.log('');
    console.log('🎉 QR Code feature should work!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

testQR();
