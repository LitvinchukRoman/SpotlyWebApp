import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],

  server: {
    proxy: {
      // 1. Всі запити, що починаються з /api (наприклад, /api/users/register)
      '/api': {
        // 2. Будуть перенаправлені на URL вашого Java-бекенду
        target: 'http://localhost:80',
        changeOrigin: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        configure: (proxy, _options) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          proxy.on('proxyReq', (proxyReq, _req, _res, _options) => {
            proxyReq.setHeader('X-Forwarded-Host', 'spotly.mylabstep.com');
            proxyReq.setHeader('X-Forwarded-Proto', 'http');
          });
        },
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
