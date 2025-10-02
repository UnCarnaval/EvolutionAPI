const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Manager endpoint
app.get('/manager', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/manager/index.html'));
});

app.use('/manager/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/manager/index.html'));
});

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_PROVIDER || 'not configured',
    version: '2.3.1'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Evolution API',
    version: '2.3.1',
    status: 'running',
    database: {
      provider: process.env.DATABASE_PROVIDER || 'not configured',
      connected: true
    },
    endpoints: {
      manager: '/manager',
      health: '/api/health',
      docs: '/docs'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: err.message
  });
});

// Start server
app.listen(port, () => {
  console.log(`
🚀 Evolution API is running!
📡 Server: http://localhost:${port}
📊 Manager: http://localhost:${port}/manager
🔍 Health: http://localhost:${port}/api/health
  `);
});