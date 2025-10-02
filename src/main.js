const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Basic info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Evolution API',
    version: '2.3.1',
    status: 'running',
    database: process.env.DATABASE_PROVIDER || 'not configured'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Evolution API running on port ${port}`);
});
