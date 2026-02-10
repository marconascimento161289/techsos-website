const https = require('https');

console.log('=== EXTRACTING ACTUAL PAGE CONTENT ===\n');

https.get('https://techsos-loja-oficial.vercel.app/produtos', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });

    res.on('end', () => {
        // Extract the body content
        const bodyMatch = data.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        if (!bodyMatch) {
            console.log('Could not find body tag');
            return;
        }

        const body = bodyMatch[1];

        // Look for specific text
        console.log('Searching for key text in page...\n');

        if (body.includes('Página em Sincronização')) {
            console.log('❌ FOUND: "Página em Sincronização"');
            // Extract the context
            const idx = body.indexOf('Página em Sincronização');
            console.log('Context:', body.substring(idx - 50, idx + 150));
        } else {
            console.log('✅ NOT FOUND: "Página em Sincronização"');
        }

        console.log('\n---\n');

        // Check for product names
        const products = ['iPhone', 'Samsung', 'PlayStation', 'MacBook', 'AirPods'];
        products.forEach(product => {
            if (body.includes(product)) {
                console.log(`✅ FOUND: "${product}"`);
            } else {
                console.log(`❌ NOT FOUND: "${product}"`);
            }
        });

        console.log('\n---\n');

        // Check for the loading state
        if (body.includes('A carregar produtos')) {
            console.log('⏳ FOUND: Loading spinner text');
        }

        // Look for the empty state component
        if (body.includes('products.length === 0')) {
            console.log('⚠️  Empty state code is in the page');
        }

        // Check if there's any __NEXT_DATA__ with products
        const nextDataMatch = body.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/);
        if (nextDataMatch) {
            try {
                const nextData = JSON.parse(nextDataMatch[1]);
                console.log('\n__NEXT_DATA__ found. Checking for products...');
                const dataStr = JSON.stringify(nextData);
                if (dataStr.includes('iPhone') || dataStr.includes('Samsung')) {
                    console.log('✅ Products ARE in Next.js data!');
                } else {
                    console.log('❌ Products NOT in Next.js data');
                }
            } catch (e) {
                console.log('Could not parse __NEXT_DATA__');
            }
        }
    });
}).on('error', (e) => {
    console.error('Error:', e.message);
});
