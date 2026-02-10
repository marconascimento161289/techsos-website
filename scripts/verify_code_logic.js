
const https = require('https');

// Configuração (Hardcoded para teste rápido ou ler de env se preferir, mas hardcoded elimina variaveis)
// Usando os valores que sabemos que estão corretos
const domain = "techsostelemovel.myshopify.com";
const token = "4e0667580b9dc1b2cef05eb5c6a365d2";
const version = "2026-01"; // A versão que acabamos de corrigir

const url = `https://${domain}/api/${version}/graphql.json`;

const query = `
{
  products(first: 20) {
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

console.log(`Fetching from: ${url}`);

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token
    }
};

const req = https.request(url, options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        try {
            const json = JSON.parse(data);

            // Simular a lógica exata do page.tsx
            if (json.errors) {
                console.error("Shopify returned errors:", json.errors);
                return;
            }

            const edges = json.data?.products?.edges;
            if (!edges) {
                console.error("No 'edges' found in response. Structure might be wrong.");
                console.log("Full Response:", JSON.stringify(json, null, 2));
                return;
            }

            console.log(`Found ${edges.length} products raw.`);

            // Testar o map do page.tsx
            const mappedProducts = edges.map((edge) => {
                try {
                    return {
                        id: edge.node.id,
                        name: edge.node.title,
                        price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
                        image: edge.node.images.edges[0]?.node.url || "PLACEHOLDER",
                    };
                } catch (err) {
                    console.error("Error mapping product:", err, edge);
                    return null;
                }
            });

            console.log("Successfully mapped products:", mappedProducts);

        } catch (e) {
            console.error("Error parsing JSON:", e);
            console.log("Raw body:", data);
        }
    });
});

req.on('error', (e) => {
    console.error("Request error:", e);
});

req.write(JSON.stringify({ query }));
req.end();
