import requests

url = "https://techsostelemovel.myshopify.com/api/2026-01/graphql.json"
# Token atual que estamos a usar
token = "4e0667580b9dc1b2cef05eb5c6a365d2"

query = """
{
  products(first: 3) {
    edges {
      node {
        title
        handle
      }
    }
  }
}
"""

headers = {
    "X-Shopify-Storefront-Access-Token": token,
    "Content-Type": "application/json"
}

try:
    print(f"A testar token contra: {url}")
    r = requests.post(url, json={"query": query}, headers=headers)
    print(f"Status Code: {r.status_code}")
    print(f"Response Body: {r.text}")
except Exception as e:
    print(f"Erro de rede: {e}")
