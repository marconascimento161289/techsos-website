const https = require('https');

// Test the PRODUCTION Vercel site
const productionUrl = "https://techsos-loja-oficial.vercel.app";

console.log(`Testing production site: ${productionUrl}/produtos`);
console.log("This will check if the page can fetch products from Shopify...\n");

// We'll make a simple request to see if the page loads
const req = https.get(`${productionUrl}/produtos`, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        // Check if the page contains the "Página em Sincronização" message
        if (data.includes('Página em Sincronização')) {
            console.log('\n❌ PROBLEM FOUND: Page still shows "Página em Sincronização"');
            console.log('This means the products are not loading on production.');
        } else if (data.includes('A carregar produtos')) {
            console.log('\n⏳ Page is in loading state');
        } else {
            console.log('\n✅ Page appears to be working (no sync message found)');
        }

        // Check for environment variable references
        if (data.includes('NEXT_PUBLIC_SHOPIFY')) {
            console.log('✅ Environment variables are being referenced in the build');
        }
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
});

req.end();
