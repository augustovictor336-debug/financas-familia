# Como Executar o Projeto Localmente ou como Aplicativo Desktop (.exe / .app)

Este projeto foi configurado com duas formas extremamente simples de execução local fora do navegador web padrão, incluindo a compilação para um **aplicativo executável standalone (nativo)**.

---

## Método 1: Inicializador Leve de Dois Cliques (Recomendado)
Este método roda o aplicativo em um servidor local ultraleve em segundo plano e abre o navegador automaticamente. É extremamente rápido e não necessita de nenhuma instalação pesada.

### Como rodar:
1. **No Windows:**
   - Dê dois cliques no arquivo `Iniciar.bat` na raiz do projeto.
   - O terminal irá abrir, instalar as dependências automaticamente (se necessário), compilar os arquivos e abrir a aplicação no seu navegador padrão em `http://localhost:3001`.

2. **No macOS ou Linux:**
   - Abra o terminal no diretório do projeto e dê permissão de execução ao script:
     ```bash
     chmod +x iniciar.sh
     ```
   - Dê dois cliques no arquivo `iniciar.sh` ou execute-o pelo terminal:
     ```bash
     ./iniciar.sh
     ```

---

## Método 2: Criando um Executável Nativo (.exe ou .dmg) com Electron
Se você deseja gerar um arquivo executável real (como um arquivo `.exe` para Windows, `.dmg` para Mac ou `.AppImage` para Linux) que funciona de forma 100% independente e abre em sua própria janela nativa de desktop, siga estes passos rápidos no seu computador:

### Passos para gerar o executável nativo:

1. **Abra o terminal** na pasta do projeto no seu computador.
2. **Instale as ferramentas do Electron** rodando o seguinte comando:
   ```bash
   npm install --save-dev electron electron-builder
   ```
3. **Para testar em modo desktop (sem gerar o executável ainda):**
   ```bash
   npm run electron:dev
   ```
   *Isso abrirá uma janela do aplicativo desktop nativo imediatamente para teste.*

4. **Para gerar o arquivo executável final distribuível:**
   ```bash
   npm run electron:make
   ```
   *Este comando compilará o aplicativo e gerará uma pasta chamada `dist-electron/` na raiz do seu projeto contendo o arquivo executável portátil pronto para uso ou distribuição!*

---

## Pré-requisitos
Para rodar qualquer um dos métodos localmente em sua máquina, você só precisa ter o **Node.js** instalado (versão 18 ou superior recomendada).
- Caso não possua, baixe gratuitamente e instale em menos de 1 minuto pelo site oficial: [https://nodejs.org/](https://nodejs.org/)
