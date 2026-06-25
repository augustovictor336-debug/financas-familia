#!/bin/bash

# Clear terminal screen
clear

echo "======================================================"
echo "      SISTEMA DE FINANÇAS E INVESTIMENTOS"
echo "======================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "[ERRO] O Node.js não foi encontrado no seu sistema!"
    echo "Por favor, faça o download e instale o Node.js em: https://nodejs.org/"
    echo "Depois de instalar, execute este script novamente."
    echo ""
    read -p "Pressione Enter para sair..."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências do projeto. Isso pode levar um minuto..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERRO] Falha ao instalar as dependências. Verifique sua conexão."
        read -p "Pressione Enter para sair..."
        exit 1
    fi
    echo "Dependências instaladas com sucesso!"
    echo ""
fi

# Run build if dist doesn't exist
if [ ! -d "dist" ]; then
    echo "Compilando arquivos de produção..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "[ERRO] Falha ao compilar o projeto."
        read -p "Pressione Enter para sair..."
        exit 1
    fi
    echo "Compilação concluída!"
    echo ""
fi

# Start the application
echo "Iniciando o aplicativo localmente..."
node start-desktop.js
