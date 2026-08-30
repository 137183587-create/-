import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      // _master-media 是未压缩母版，不参与构建，也不需要被 dev server 监听
      ignored: [
        'node_modules/**',
        'dist/**',
        'dist.bak/**',
        'dist.bak-*/**',
        '.trash/**',
        '_master-media/**',
      ],
    },
  },
})
