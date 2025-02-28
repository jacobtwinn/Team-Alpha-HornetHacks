import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // If you're using React

export default defineConfig({
  plugins: [react()], // Include if using React
  server: {
    proxy: {
      '/tfhub': {
        target: 'https://tfhub.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tfhub/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
});