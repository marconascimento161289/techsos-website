import zipfile
import os

# Pastas a ignorar (muito pesadas ou desnecessárias para deploy)
BLOCKLIST = ['node_modules', '.next', '.git', '__pycache__', '.vscode']

SOURCE_FOLDER = r'C:\Users\Marco\.gemini\antigravity\scratch\TechSOS\meu-site--main\techSOS'
OUTPUT_ZIP = r'C:\Users\Marco\.gemini\antigravity\scratch\TechSOS\TechSOS_Site_V2_Pronto.zip'

def zip_project():
    print(f"A iniciar compressão de: {SOURCE_FOLDER}")
    try:
        with zipfile.ZipFile(OUTPUT_ZIP, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(SOURCE_FOLDER):
                # Filtrar pastas proibidas
                dirs[:] = [d for d in dirs if d not in BLOCKLIST]
                
                for file in files:
                    # Não incluir o próprio zip se estiver lá
                    if file.endswith('.zip'): continue
                    
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, SOURCE_FOLDER)
                    
                    print(f"A adicionar: {arcname}")
                    zipf.write(file_path, arcname)
                    
        print(f"\nSUCESSO! Zip criado em: {OUTPUT_ZIP}")
        
    except Exception as e:
        print(f"\nERRO: {e}")

if __name__ == "__main__":
    zip_project()
