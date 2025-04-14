import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: "franz.github.io/docs",
  build: {
    outDir: "../docs"
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  server: {
    //使用IP能访问
    host: '0.0.0.0'
  },
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
