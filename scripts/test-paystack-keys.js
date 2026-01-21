const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local manually
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1]] = match[2];
  }
});

const secretKey = env['PAYSTACK_SECRET_KEY'];

if (!secretKey) {
  console.error('Error: PAYSTACK_SECRET_KEY not found in .env.local');
  process.exit(1);
}

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction?perPage=1',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${secretKey}`
  }
};

const req = https.request(options, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Paystack API connection successful!');
      console.log('Response:', JSON.parse(data).message);
    } else {
      console.error('❌ Paystack API connection failed.');
      console.error('Status Code:', res.statusCode);
      console.error('Response:', data);
    }
  });
});

req.on('error', error => {
  console.error('req error', error);
});

req.end();
