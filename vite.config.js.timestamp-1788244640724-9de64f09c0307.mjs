// vite.config.js
import { defineConfig } from "file:///F:/wangzhan/%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99/node_modules/vite/dist/node/index.js";
import react from "file:///F:/wangzhan/%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      // _master-media 是未压缩母版，不参与构建，也不需要被 dev server 监听
      ignored: [
        "node_modules/**",
        "dist/**",
        "dist.bak/**",
        "dist.bak-*/**",
        ".trash/**",
        "_master-media/**"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx3YW5nemhhblxcXFxcdTRGNUNcdTU0QzFcdTk2QzZcdTdGNTFcdTdBRDlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHdhbmd6aGFuXFxcXFx1NEY1Q1x1NTRDMVx1OTZDNlx1N0Y1MVx1N0FEOVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovd2FuZ3poYW4vJUU0JUJEJTlDJUU1JTkzJTgxJUU5JTlCJTg2JUU3JUJEJTkxJUU3JUFCJTk5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiB0cnVlLFxuICAgIHBvcnQ6IDUxNzMsXG4gICAgd2F0Y2g6IHtcbiAgICAgIC8vIF9tYXN0ZXItbWVkaWEgXHU2NjJGXHU2NzJBXHU1MzhCXHU3RjI5XHU2QkNEXHU3MjQ4XHVGRjBDXHU0RTBEXHU1M0MyXHU0RTBFXHU2Nzg0XHU1RUZBXHVGRjBDXHU0RTVGXHU0RTBEXHU5NzAwXHU4OTgxXHU4OEFCIGRldiBzZXJ2ZXIgXHU3NkQxXHU1NDJDXG4gICAgICBpZ25vcmVkOiBbXG4gICAgICAgICdub2RlX21vZHVsZXMvKionLFxuICAgICAgICAnZGlzdC8qKicsXG4gICAgICAgICdkaXN0LmJhay8qKicsXG4gICAgICAgICdkaXN0LmJhay0qLyoqJyxcbiAgICAgICAgJy50cmFzaC8qKicsXG4gICAgICAgICdfbWFzdGVyLW1lZGlhLyoqJyxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1SLFNBQVMsb0JBQW9CO0FBQ2hULE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBO0FBQUEsTUFFTCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
