export async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
    : '';
  const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 } // Atualiza dados a cada 60 segundos
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return {
      status: 500,
      error: 'Error fetching products'
    };
  }
}

export async function getAllProducts() {
  return shopifyFetch({
    query: `{
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
    }`
  });
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation cartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { lines };
  const response = await shopifyFetch({ query, variables });

  if (response.body?.data?.cartCreate?.userErrors?.length > 0) {
    console.error("Cart create errors:", response.body.data.cartCreate.userErrors);
  }

  return response.body?.data?.cartCreate?.cart?.checkoutUrl;
}
