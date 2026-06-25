@echo off
title Iniciando Sistema de Financas e Investimentos
chcp 65001 > nul
cls

echo ======================================================
echo       SISTEMA DE FINANÇAS E INVESTIMENTOS
echo ======================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] O Node.js não foi encontrado no seu sistema!
    echo Por favor, faça o download e instale o Node.js em: https://nodejs.org/
    echo Depois de instalar, feche este terminal e execute este arquivo novamente.
    echo.
    pause
    exit
)

:: Check if node_modules exists
if not exist node_modules (
    echo Instalando dependências do projeto. Isso pode levar um minuto...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar as dependências. Verifique sua conexão.
        pause
        exit
    )
    echo Dependências instaladas com sucesso!
    echo.
)

:: Run build if dist doesn't exist
if not exist dist (
    echo Compilando arquivos de produção...
    call npm run build
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao compilar o projeto.
        pause
        exit
    )
    echo Compilação concluída!
    echo.
)

:: Start the application
echo Iniciando o aplicativo localmente...
node start-desktop.js
pause
