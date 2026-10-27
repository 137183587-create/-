import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // 关闭 outDir 清空：构建产物先落在 dist.next（构建前用 bash 预清空），
    // 再由 scripts/publish-dist.mjs 覆盖发布进 dist。
    // 原因有二：
    //   1) Vite 的 emptyOutDir 走 Node fs.rmSync，会被 safe-delete 钩子拦成「丢回收站」，
    //      大目录直接失败（dist.next/advantages → trash aborted）导致构建中断；
    //   2) 更关键 —— dist 是预览服务正在服务的目录，任何改名/清空都会让线上预览瞬间 404，
    //      浏览器会把加载失败的图缓存成裂图。
    emptyOutDir: false,
  },
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
