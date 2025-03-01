import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; 
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [react(), tailwindcss()], 
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