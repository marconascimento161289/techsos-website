// Advanced debug script to test the exact flow
const https = require('https');

const domain = "techsostelemovel.myshopify.com";
const token = "4e0667580b9dc1b2cef05eb5c6a365d2";
const version = "2026-01";

const query = `
{
  products(first: 3) {
    edges {
      node {
        id
        title
        handle
        description
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}`;

console.log('=== SHOPIFY API DEBUG ===\n');
console.log(`Domain: ${domain}`);
console.log(`API Version: ${version}`);
console.log(`Token: ${token.substring(0, 10)}...`);
console.log(`\nTesting endpoint: https://${domain}/api/${version}/graphql.json\n`);

const postData = JSON.stringify({ query });

const options = {
    hostname: domain,
    path: `/api/${version}/graphql.json`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'X-Shopify-Storefront-Access-Token': token
    }
};

const req = https.request(options, (res) => {
    console.log(`✓ Status Code: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);

            if (json.errors) {
                console.log('\n❌ ERRORS FOUND:');
                console.log(JSON.stringify(json.errors, null, 2));
                return;
            }

            if (!json.data) {
                console.log('\n❌ NO DATA IN RESPONSE');
                console.log('Full response:', JSON.stringify(json, null, 2));
                return;
            }

            const products = json.data.products?.edges || [];
            console.log(`\n✓ Found ${products.length} products\n`);

            products.forEach((edge, i) => {
                const p = edge.node;
                console.log(`${i + 1}. ${p.title}`);
                console.log(`   ID: ${p.id}`);
                console.log(`   Price: ${p.priceRange.minVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode}`);
                console.log(`   Image: ${p.images.edges[0]?.node.url || 'NO IMAGE'}`);
                console.log(`   Variant ID: ${p.variants.edges[0]?.node.id || 'NO VARIANT'}`);
                console.log('');
            });

            console.log('=== CONCLUSION ===');
            console.log('✅ API is working correctly');
            console.log('✅ Products are being returned');
            console.log('\nIf the site still shows "Página em Sincronização", the issue is:');
            console.log('1. Environment variables not set on Vercel (we already fixed this)');
            console.log('2. Vercel cache (we are fixing this now)');
            console.log('3. Client-side JavaScript error (check browser console)');

        } catch (e) {
            console.log('\n❌ JSON PARSE ERROR:', e.message);
            console.log('Raw response:', data);
        }
    });
});

req.on('error', (e) => {
    console.error('\n❌ REQUEST ERROR:', e.message);
});

req.write(postData);
req.end();
