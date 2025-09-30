const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DATABASE_PROVIDER || 'not configured',
    redis: process.env.REDIS_ENABLED || 'not configured'
  });
});

// Basic endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Evolution API is running',
    version: '2.3.1',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Health check server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.DATABASE_PROVIDER || 'not configured'}`);
});
