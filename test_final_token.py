import urllib.request
import json
import ssl

SHOP_DOMAIN = "techsostelemovel.myshopify.com"
SF_TOKEN = "4e0667580b9dc1b2cef05eb5c6a365d2"

def test_storefront_access():
    print(f"--- Testando Acesso Storefront API ({SHOP_DOMAIN}) ---")
    url = f"https://{SHOP_DOMAIN}/api/2024-01/graphql.json"
    query = "{ products(first: 5) { edges { node { title } } } }"
    data = json.dumps({'query': query}).encode('utf-8')
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/json')
    req.add_header('X-Shopify-Storefront-Access-Token', SF_TOKEN)
    context = ssl._create_unverified_context()
    try:
        with urllib.request.urlopen(req, context=context) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            products = res_data.get('data', {}).get('products', {}).get('edges', [])
            if products:
                print(f"SUCESSO! Encontrados {len(products)} produtos:")
                for p in products: print(f" - {p['node']['title']}")
                return True
            else:
                print("Conectado, mas sem produtos.")
                return True
    except Exception as e:
        print(f"Erro: {e}")
        return False

if __name__ == "__main__":
    test_storefront_access()
