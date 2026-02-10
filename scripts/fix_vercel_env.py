import subprocess
import time

VARS = {
    "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN": "techsostelemovel.myshopify.com",
    "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN": "4e0667580b9dc1b2cef05eb5c6a365d2"
}

def set_env_safe():
    for key, value in VARS.items():
        print(f"--- Processando {key} ---")
        
        # 1. Remover variável antiga (para limpar lixo)
        print(f"Removendo {key}...")
        subprocess.run(f"vercel env rm {key} production -y", shell=True)
        
        # 2. Adicionar nova variável limpa via STDIN
        print(f"Adicionando {key} limpa...")
        process = subprocess.Popen(
            f"vercel env add {key} production", 
            shell=True,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        # Enviar valor sem newline extra
        stdout, stderr = process.communicate(input=value.encode('utf-8'))
        
        print("Output:", stdout.decode())
        if stderr:
            print("Error:", stderr.decode())
            
        time.sleep(2)

if __name__ == "__main__":
    set_env_safe()
