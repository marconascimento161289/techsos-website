const https = require('https');

// Test the LATEST deployment directly
const latestDeployment = "https://techsos-loja-oficial-q8msnfx6b-marconascimento161289s-projects.vercel.app";

console.log('=== TESTING LATEST DEPLOYMENT ===\n');
console.log(`URL: ${latestDeployment}/produtos\n`);

const req = https.get(`${latestDeployment}/produtos`, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('\n=== CHECKING PAGE CONTENT ===\n');

        // Check for the sync message
        if (data.includes('Página em Sincronização')) {
            console.log('❌ PROBLEM: Still showing "Página em Sincronização"');
            console.log('   This means the page is still not loading products.\n');
        } else {
            console.log('✅ GOOD: No "Página em Sincronização" message found\n');
        }

        // Check for loading state
        if (data.includes('A carregar produtos')) {
            console.log('⏳ Page shows loading spinner');
            console.log('   This is normal on first load (client-side)\n');
        }

        // Check if environment variables are present in the HTML
        if (data.includes('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN')) {
            console.log('✅ Environment variable references found in build\n');
        } else {
            console.log('⚠️  No env var references in HTML (might be normal for production)\n');
        }

        // Check for actual product data in the HTML (if SSR/SSG)
        if (data.includes('iPhone') || data.includes('Samsung') || data.includes('PlayStation')) {
            console.log('✅ EXCELLENT: Product names found in HTML!');
            console.log('   Products are being rendered server-side or statically.\n');
        } else {
            console.log('ℹ️  No product names in HTML');
            console.log('   Products will load client-side via JavaScript\n');
        }

        // Check for JavaScript errors in the page
        if (data.includes('error') || data.includes('Error')) {
            console.log('⚠️  The word "error" appears in the page (might be normal)\n');
        }

        console.log('=== RECOMMENDATION ===\n');
        console.log('1. Open this URL in your browser:');
        console.log(`   ${latestDeployment}/produtos`);
        console.log('2. Press F12 to open Developer Tools');
        console.log('3. Go to the "Console" tab');
        console.log('4. Look for any RED error messages');
        console.log('5. If you see errors, copy them and send to me\n');

        // Try to extract any obvious errors from the HTML
        const errorMatch = data.match(/error[^<]{0,100}/gi);
        if (errorMatch && errorMatch.length > 0) {
            console.log('Potential errors found in HTML:');
            errorMatch.slice(0, 3).forEach(e => console.log(`  - ${e}`));
        }
    });
});

req.on('error', (e) => {
    console.error('❌ REQUEST ERROR:', e.message);
});

req.end();
