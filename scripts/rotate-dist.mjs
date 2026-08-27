import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const trashDir = path.join(root, '.trash')

/**
 * 安全移除目录：
 * 1. 优先直接删除（rmSync）。
 * 2. 若被 safe-delete 守卫拦截，则重命名到项目 .trash 目录；
 *    即使跨目录重命名仍被守卫转存到系统回收站，也能保证项目根目录干净。
 */
function safeRemove(dirPath) {
  if (!fs.existsSync(dirPath)) return
  try {
    fs.rmSync(dirPath, { recursive: true, force: true })
    return
  } catch {
    // safe-delete 可能拦截删除，回退到重命名
  }

  // 若 rmSync 被拦截但目录已被移除，直接返回
  if (!fs.existsSync(dirPath)) return

  if (!fs.existsSync(trashDir)) {
    fs.mkdirSync(trashDir, { recursive: true })
  }
  const name = `${path.basename(dirPath)}-${Date.now()}`
  const dest = path.join(trashDir, name)
  try {
    fs.renameSync(dirPath, dest)
  } catch (err) {
    // 重命名时目录已不存在 = 已被安全移除，忽略
    if (err.code === 'ENOENT') {
      console.log(`[rotate-dist] 已移除: ${dirPath}`)
      return
    }
    console.error(`[rotate-dist] 无法移除 ${dirPath}: ${err.message}`)
    process.exit(1)
  }
}

// 1. 清理历史遗留的 dist_bak_* 备份夹，避免继续堆积
for (const name of fs.readdirSync(root)) {
  const full = path.join(root, name)
  if (
    name.startsWith('dist_bak_') &&
    fs.statSync(full).isDirectory()
  ) {
    safeRemove(full)
    console.log(`[rotate-dist] 已清理旧备份: ${name}`)
  }
}

// 2. 单份备份：若已有 dist.bak，先移除；再把 dist 重命名为 dist.bak
const dist = path.join(root, 'dist')
const bak = path.join(root, 'dist.bak')

if (fs.existsSync(bak)) {
  safeRemove(bak)
}

if (fs.existsSync(dist)) {
  fs.renameSync(dist, bak)
  console.log('[rotate-dist] dist -> dist.bak')
}
