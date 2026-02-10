const https = require('https');

// Check if the LATEST deployment has the products
console.log('=== CHECKING LATEST DEPLOYMENT ===\n');

https.get('https://techsos-loja-oficial.vercel.app/produtos', (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Cache: ${res.headers['x-vercel-cache']}`);

    let data = '';
    res.on('data', (chunk) => { data += chunk; });

    res.on('end', () => {
        // Check what's actually in the page
        const hasSync = data.includes('Página em Sincronização');
        const hasLoading = data.includes('A carregar produtos');
        const hasProducts = data.includes('iPhone') || data.includes('Samsung') || data.includes('PlayStation');

        console.log('\n=== PAGE CONTENT ===');
        console.log(`Sync Message: ${hasSync ? '❌ YES (BAD)' : '✅ NO (GOOD)'}`);
        console.log(`Loading Spinner: ${hasLoading ? '⏳ YES' : '✅ NO'}`);
        console.log(`Products in HTML: ${hasProducts ? '✅ YES' : '❌ NO'}`);

        // Try to find the actual product data in Next.js data
        const scriptMatch = data.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/);
        if (scriptMatch) {
            const nextData = scriptMatch[1];
            if (nextData.includes('iPhone') || nextData.includes('Samsung')) {
                console.log(`Next.js Data: ✅ HAS PRODUCTS`);
            } else {
                console.log(`Next.js Data: ❌ NO PRODUCTS`);
            }
        }

        console.log('\n=== DIAGNOSIS ===');
        if (hasSync) {
            console.log('❌ The page is still showing the sync message.');
            console.log('   This means products.length === 0 in the component.');
        } else if (hasLoading) {
            console.log('⏳ The page is in loading state.');
            console.log('   This means the useEffect is running but not getting products.');
        } else if (hasProducts) {
            console.log('✅ Products ARE in the page!');
            console.log('   The issue might be browser cache on your side.');
        } else {
            console.log('❓ Unknown state. Need to check browser console.');
        }
    });
}).on('error', (e) => {
    console.error('Error:', e.message);
});
