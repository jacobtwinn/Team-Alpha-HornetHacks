const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Set up proxy for TensorFlow Hub
app.use('/tfhub', createProxyMiddleware({
  target: 'https://tfhub.dev',
  changeOrigin: true,
  pathRewrite: {
    '^/tfhub': ''
  }
}));

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Proxy server is running');
});

// Start the server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access TensorFlow Hub models via: http://localhost:${PORT}/tfhub/...`);
});