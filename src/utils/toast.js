// 轻量全局 Toast：复制成功等提示。命令式调用，不依赖 React 状态。
let root = null

function ensureRoot() {
  if (typeof document === 'undefined') return null
  if (!root || !document.body.contains(root)) {
    root = document.createElement('div')
    root.id = 'toast-root'
    root.setAttribute('aria-live', 'polite')
    document.body.appendChild(root)
  }
  return root
}

export function showToast(message, duration = 1800) {
  const r = ensureRoot()
  if (!r) return
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = message
  r.appendChild(el)

  // 强制 reflow 后再加 show，确保过渡生效
  // eslint-disable-next-line no-unused-expressions
  el.offsetHeight
  requestAnimationFrame(() => el.classList.add('toast--show'))

  setTimeout(() => {
    el.classList.remove('toast--show')
    const remove = () => el.remove()
    el.addEventListener('transitionend', remove, { once: true })
    setTimeout(remove, 400) // 过渡失败时的兜底移除
  }, duration)
}
