// Manual test untuk QR Code feature
const axios = require('axios');

async function testQRFeature() {
  console.log('🧪 Testing QR Code Feature Manually\n');
  
  // Simulate user input
  const testCases = [
    { command: 'qr https://google.com', text: 'https://google.com' },
    { command: 'qr Halo ini teks', text: 'Halo ini teks' },
    { command: 'qrlogo https://tokosaya.com', text: 'https://tokosaya.com' },
    { command: 'qrwarna https://instagram.com', text: 'https://instagram.com' }
  ];
  
  for (const test of testCases) {
    console.log(`\n📱 Testing: ${test.command}`);
    console.log('─'.repeat(50));
    
    try {
      // Simulate bot logic
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(test.text)}`;
      console.log('📡 API URL:', qrUrl.substring(0, 80) + '...');
      
      const response = await axios.get(qrUrl, { 
        responseType: 'arraybuffer',
        timeout: 10000
      });
      
      console.log('✅ Response Status:', response.status);
      console.log('📦 Data Size:', response.data.length, 'bytes');
      console.log('📄 Content-Type:', response.headers['content-type']);
      
      const buffer = Buffer.from(response.data, 'binary');
      const base64 = buffer.toString('base64');
      
      console.log('🔐 Base64 Length:', base64.length);
      console.log('🔗 Data URI Length:', `data:image/png;base64,${base64}`.length);
      
      // Check if valid PNG
      const isPNG = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
      console.log('🖼️  Valid PNG:', isPNG ? '✅ Yes' : '❌ No');
      
      if (isPNG) {
        console.log('✅ TEST PASSED');
      } else {
        console.log('❌ TEST FAILED - Not a valid PNG');
      }
      
    } catch (error) {
      console.log('❌ TEST FAILED');
      console.log('Error:', error.message);
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🎯 SUMMARY');
  console.log('='.repeat(50));
  console.log('');
  console.log('Jika semua test PASSED, fitur QR Code sudah bekerja!');
  console.log('');
  console.log('📋 Cara test di WhatsApp:');
  console.log('   1. Kirim: qr https://google.com');
  console.log('   2. Bot akan balas dengan QR Code image');
  console.log('   3. Scan QR Code dengan kamera');
  console.log('');
  console.log('🔍 Jika tidak terkirim, cek:');
  console.log('   - Bot sudah tersambung? (scan QR WhatsApp)');
  console.log('   - Cek logs: pm2 logs wa-bot');
  console.log('   - Cek console untuk error message');
  console.log('');
}

testQRFeature();
