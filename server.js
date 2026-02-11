const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const indexPath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  // Serve index.html for all routes (SPA-style)
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Mogul Runner serving on port ${PORT}`);
});
