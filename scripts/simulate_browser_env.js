// Test script to simulate what happens in the browser
console.log('=== SIMULATING BROWSER ENVIRONMENT ===\n');

// Simulate missing env vars (what might be happening in production)
const env1 = {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: undefined,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: undefined
};

const env2 = {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: 'techsostelemovel.myshopify.com',
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: '4e0667580b9dc1b2cef05eb5c6a365d2'
};

function testEndpoint(env, label) {
    const endpoint = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
        ? `https://${env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2026-01/graphql.json`
        : '';
    const key = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

    console.log(`\n${label}:`);
    console.log(`  Endpoint: "${endpoint}"`);
    console.log(`  Key: "${key}"`);
    console.log(`  Valid: ${endpoint && key ? 'YES' : 'NO'}`);
}

testEndpoint(env1, 'IF ENV VARS ARE MISSING');
testEndpoint(env2, 'IF ENV VARS ARE PRESENT');

console.log('\n=== DIAGNOSIS ===');
console.log('If the page shows loading spinner forever, it means:');
console.log('1. The fetch() call is failing (no endpoint or no key)');
console.log('2. OR the API is returning an error');
console.log('3. OR there\'s a CORS issue');
console.log('\nMost likely: Environment variables are NOT available in the browser');
console.log('because they were not set correctly on Vercel.\n');
