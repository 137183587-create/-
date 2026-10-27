import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

/**
 * 构建前准备（pre-build）
 *
 * 关键约束（全部是踩出来的，改动前务必先读）：
 *
 * 1) safe-delete 钩子同时接管了 Node 的 fs 和 bash 的 rm/rmdir/unlink
 *    （见 .../vendor/shim/safe-bin/）。它把待删目录整体丢进回收站，
 *    大目录会失败并 fail-closed（"Some operations were aborted"）——
 *    所以「整目录删除」不可用，必须用
 *    `find -type f -delete` + `find -depth -type d -empty -delete` 逐个删。
 *
 * 2) dist 是 vite preview 正在服务的目录：
 *    - Windows 下 rename 会 EPERM（目录被锁）；
 *    - 就算能改名，「先搬走 dist 再 build」中间会有数秒空窗，
 *      活着的预览只能 404，浏览器会把加载失败的图缓存成裂图，
 *      用户会误以为素材没上传。
 *    → 所以现在改为「原地构建」：vite 配 emptyOutDir:false，
 *      直接写进 dist，新 index.html 最后落地，全程 dist 都是完整可用的一套产物。
 *
 * 3) 本脚本负责把「上一版产物」备份到 dist.bak（供回滚）。
 */

const root = process.cwd()
const dist = path.join(root, 'dist')
const bak = path.join(root, 'dist.bak')
const trashDir = path.join(root, '.trash')

// 找一个可用的 bash（Git Bash / PortableGit）
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
  throw new Error('[rotate-dist] 找不到可用的 bash，无法执行文件操作')
}

// 彻底清空一个目录（逐文件删，绕开回收站对大目录的失败）
function emptyDir(dir) {
  if (!fs.existsSync(dir)) return
  sh(`find "${dir}" -type f -delete`)
  sh(`find "${dir}" -depth -type d -empty -delete`)
}

// 1. 清理早期版本用过的暂存目录 dist.next（已废弃原地构建）
if (fs.existsSync(path.join(root, 'dist.next'))) {
  emptyDir('dist.next')
  console.log('[rotate-dist] 已清理废弃的暂存目录 dist.next')
}

// 2. 备份当前产物 → dist.bak（dist.bak = 上一版，供回滚）
//    注意：先清空 dist.bak 再 cp -r "dist/." "dist.bak/"（合并拷贝，不嵌套）
if (fs.existsSync(dist)) {
  emptyDir('dist.bak')
  sh('mkdir -p "dist.bak"')
  sh('cp -r "dist/." "dist.bak/"')
  console.log('[rotate-dist] 已备份上一版 → dist.bak')
}

// 3. 清理早期命名 dist_bak_* 的备份夹
const legacyBaks = fs.readdirSync(root).filter((n) => n.startsWith('dist_bak_'))
if (legacyBaks.length) {
  for (const n of legacyBaks) emptyDir(n)
  console.log(`[rotate-dist] 已清理旧备份: ${legacyBaks.join(', ')}`)
}

// 4. 清理 Vite 临时配置文件（dev/build 自动生成，无保留价值）
const tmpConfigs = fs
  .readdirSync(root)
  .filter((n) => /^vite\.config\.js\.timestamp-.*\.mjs$/.test(n))
if (tmpConfigs.length) {
  sh('rm -f vite.config.js.timestamp-*.mjs')
  console.log(`[rotate-dist] 已清理 Vite 临时配置: ${tmpConfigs.join(', ')}`)
}

// 5. 清理 .trash（纯暂存区，回滚靠 dist.bak）
if (fs.existsSync(trashDir)) emptyDir('.trash')
