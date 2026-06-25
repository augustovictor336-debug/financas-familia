import fs from 'fs';
import path from 'path';
import http from 'http';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

if (!fs.existsSync(DIST_DIR)) {
  console.log('Compilando o projeto primeiro...');
  try {
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error('Erro ao compilar o projeto:', error);
        process.exit(1);
      }
      console.log('Compilação concluída com sucesso!');
      startServer();
    });
  } catch (err) {
    console.error('Falha ao executar build do projeto:', err);
    process.exit(1);
  }
} else {
  startServer();
}

function startServer() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, decodeURI(req.url || '/'));
    
    if (filePath.endsWith(path.sep) || !path.extname(filePath)) {
      // Direct everything back to index.html for React SPA Router
      filePath = path.join(DIST_DIR, 'index.html');
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Erro interno do servidor: ' + err.code);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(PORT, '127.0.0.1', () => {
    const url = `http://localhost:${PORT}`;
    console.log('\n======================================================');
    console.log('  \x1b[32m%s\x1b[0m', 'SISTEMA DE FINANÇAS E INVESTIMENTOS');
    console.log('======================================================');
    console.log(`\x1b[36mServidor rodando localmente em: ${url}\x1b[0m`);
    console.log('Abrindo o navegador automaticamente...');
    console.log('Pressione Ctrl+C para encerrar o aplicativo.');
    console.log('======================================================\n');

    // Auto-open browser
    const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    exec(`${startCmd} ${url}`);
  });
}
