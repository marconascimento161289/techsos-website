const https = require('https');

console.log('=== TESTING MAIN PRODUCTION DOMAIN ===\n');

const mainDomain = "techsos-loja-oficial.vercel.app";

https.get(`https://${mainDomain}/produtos`, (res) => {
    console.log(`Main Domain Status: ${res.statusCode}`);
    console.log(`Cache Status: ${res.headers['x-vercel-cache'] || 'N/A'}`);
    console.log(`Deployment ID: ${res.headers['x-vercel-id'] || 'N/A'}\n`);

    let data = '';
    res.on('data', (chunk) => { data += chunk; });

    res.on('end', () => {
        if (data.includes('Página em Sincronização')) {
            console.log('❌ Main domain STILL shows sync message\n');
        } else {
            console.log('✅ Main domain does NOT show sync message\n');
        }

        if (data.includes('iPhone') || data.includes('Samsung')) {
            console.log('✅ Products ARE in the HTML!\n');
        } else {
            console.log('ℹ️  Products will load via JavaScript\n');
        }
    });
}).on('error', (e) => {
    console.error('Error:', e.message);
});
