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
        target: 'http://10.0.1.252:8080', 
        
        changeOrigin: true,
        
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})
