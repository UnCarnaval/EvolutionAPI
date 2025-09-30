const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  const response = {
    status: 'OK',
    message: 'Evolution API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DATABASE_PROVIDER || 'not configured',
    port: process.env.PORT || 8080
  };
  
  res.end(JSON.stringify(response, null, 2));
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Simple test server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
