const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  // Only serve known files
  const safePath = path.join(__dirname, path.basename(filePath));
  const ext = path.extname(safePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(safePath, (err, data) => {
    if (err) {
      // Fallback to index.html for SPA routing
      fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
        if (err2) { res.writeHead(500); res.end('Server Error'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`MainTagRunner serving on port ${PORT}`);
});
