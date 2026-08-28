import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      ignored: ['node_modules/**', 'dist/**', 'dist.bak/**', 'dist.bak-*/**', '.trash/**'],
    },
  },
})
