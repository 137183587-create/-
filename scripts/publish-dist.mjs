import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

/**
 * 构建后收尾（post-build）
 *
 * 产物由 vite 直接写在 dist 里（emptyOutDir:false，原地构建），
 * 新 index.html 最后落地 —— 整个构建过程中 dist 都是完整可用的一套产物，
 * 正在跑的 vite preview 全程零中断，浏览器也不会缓存到加载失败的图。
 *
 * 这里做两件事：
 *   1. 校验产物完整性（构建失败要能立刻看出来，别把半成品当成功）；
 *   2. 清掉不再被 index.html 引用的旧哈希产物（dist/assets 下会越积越多）。
 */

const root = process.cwd()
const dist = path.join(root, 'dist')
const assetsDir = path.join(dist, 'assets')

const BASH_CANDIDATES = [
  process.env.WORKBUDDY_BASH,
  'C:/Users/Mayn/.workbuddy/binaries/PortableGit/versions/1.3.0/bin/bash.exe',
  'C:/Program Files/Git/bin/bash.exe',
  'C:/Program Files/Git/usr/bin/bash.exe',
].filter(Boolean)

function sh(cmd) {
  for (const shell of BASH_CANDIDATES) {
    if (fs.existsSync(shell)) {
      return execSync(cmd, { cwd: root, shell, stdio: 'inherit' })
    }
  }
  throw new Error('[publish] 找不到可用的 bash，无法执行文件操作')
}

// 1. 校验产物
const indexHtml = path.join(dist, 'index.html')
if (!fs.existsSync(indexHtml)) {
  console.error('[publish] ✗ dist/index.html 缺失，构建未成功')
  process.exit(1)
}
const html = fs.readFileSync(indexHtml, 'utf8')
const referenced = [...html.matchAll(/assets\/([^"'>]+)/g)].map((m) => m[1])
const missing = referenced.filter((n) => !fs.existsSync(path.join(assetsDir, n)))
if (missing.length) {
  console.error(`[publish] ✗ index.html 引用了不存在的产物: ${missing.join(', ')}`)
  process.exit(1)
}
console.log(`[publish] 产物校验通过（引用 ${referenced.length} 个构建产物，均存在）`)

// 2. 清掉不再被引用的旧哈希产物
if (fs.existsSync(assetsDir)) {
  const stale = fs
    .readdirSync(assetsDir)
    .filter((n) => (n.endsWith('.js') || n.endsWith('.css')) && !referenced.includes(n))
  for (const n of stale) sh(`rm -f "dist/assets/${n}"`)
  if (stale.length) console.log(`[publish] 已清理旧产物: ${stale.join(', ')}`)
}

// 3. 统计
let files = 0
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p)
    else files++
  }
}
if (fs.existsSync(dist)) walk(dist)
console.log(`[publish] 完成：dist 共 ${files} 个文件；dist.bak = 上一版`)
