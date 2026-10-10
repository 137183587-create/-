/**
 * InfiniteGallery —— 复刻 React Bits Pro「Infinite Gallery」
 * 一片无尽延伸的图像场，在 3D 空间里漂移穿行。
 * 官方文档：https://pro.reactbits.dev/docs/components/infinite-gallery
 *
 * 实现要点：
 * - **透视是根基**：容器必须有 `perspective`，否则 `preserve-3d` 无效、所有卡片压成一张平面
 *   （踩过一次：漏 perspective 导致"伪 3D"完全消失，卡片挤成一排）。
 * - 图像按 cellSize 在 **X（横向）× Z（纵深）** 平面散布，每格带确定性伪随机偏移，
 *   形成"图像场"而非僵硬网格。
 * - **雾效按纵深计算**：每张卡的 opacity / blur / 亮度由它与相机的 z 距离决定
 *   （fogNear→fogFar 线性映射），远处卡片融入背景 —— 这是纵深感的真正来源。
 * - 相机沿 Z 推进并对 cellSize 取模 → 无限循环；跨格时换格、图片索引按格号轮换。
 * - 相机位移只写 CSS 变量，每帧零 React 重渲染。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/** 确定性伪随机：同一 seed 永远返回同一值（0~1） */
const rand = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export default function InfiniteGallery({
  width = '100%',
  // 注意：height 不设默认值。设了会内联到 style 上（优先级高于 CSS 类），
  // 导致 .igal 的 height:84vh 完全失效、高度被父容器撑成 100%。
  height,
  className = '',
  images = [],
  density = 3, // 每格图像数
  imageSize = 15, // 单图基础尺寸（世界单位）
  cellSize = 110, // 网格间距（世界单位）
  viewRange = 2, // 纵深方向每侧渲染格数
  fogNear = 120,
  fogFar = 320,
  dragSpeed = 1,
  driftAmount = 8,
  friction = 0.9,
  autoZoom = false,
  autoZoomSpeed = 0.5,
  imageRadius = 0.06,
  allowImageFocusOnClick = true,
  backgroundColor = 'transparent',
  fogColor = '#070912',
  // 全屏沉浸式：滚轮预算制（独占滚轮穿行 → 预算耗尽交还页面），见下方 useEffect
  scrollBudget = 4, // 滚轮可推进的总格数（预算耗尽即交还页面滚动）
  wheelToBudget = 0.8, // 预算换算：每 1px deltaY 扣多少 px 预算（决定「滚几次交还页面」）
  wheelPulse = 0.22, // 施力换算：每 1px deltaY 给多少 px 冲量（决定「滚一次滑多远」）
  wheelFriction = 0.92, // 施力每帧保持率（越小滑行越久越缓慢；0.92≈滑行 1.2s）
  smoothing = 0.045, // 相机位置每帧向目标逼近的比例（越小越平滑缓慢；1=硬跟随）
  showExit = true, // 是否显示底部「退出」按钮
  onExit, // 自定义退出回调（不传则默认：耗尽预算 + 滚到下一节）
  onFocus,
  onPlay,
}) {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const cellRefs = useRef([]) // 每张卡的 DOM 引用：rAF 里直接写 transform 实现连续流动
  const camZ = useRef(0) // 相机沿 z 的位置（px），由缓动循环平滑追赶 targetZ
  const targetZ = useRef(0) // 相机目标位置（由滚轮施力 velZ 积分推进，并被预算 clamp）
  const budgetRef = useRef(0) // 剩余滚轮预算（px）：>0 才拦截滚轮，耗尽则交还页面
  const velZ = useRef(0) // 滚轮施力产生的速度（px/帧），每帧积分进 targetZ 后按帧率无关地衰减
  const dragZ = useRef(0) // 拖拽叠加偏移（独立于 camZ）
  const dragVel = useRef(0) // 拖拽速度（独立于滚轮，两者互不干扰）
  const [focusIdx, setFocusIdx] = useState(-1)
  const [drift, setDrift] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const moved = useRef(0) // 本次按下累计位移：<6px 视为点击，≥6px 视为拖拽
  const lastY = useRef(0)

  const total = images.length

  /* ---------- 世界单位 → 像素 ---------- */
  const UNIT = 15 // 1 world unit = 15px；官方默认 imageSize 14~18 时图片约 210~270px 高
  // 窄屏整体缩小（JS 侧算，因为内联变量会盖过CSS 媒体查询）
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const fit = vw <= 720 ? 0.56 : vw <= 1080 ? 0.78 : 1
  const imgH = Math.round(imageSize * UNIT * fit)
  const imgW = Math.round(imgH * (16 / 9))
  /* 几何标定（用 node 按 1700×950 视口**反解**，不靠肉眼猜）：
     思路：先定「图层数 + 图尺寸」，再解出cell/cellY 让内容恰好铺满版心与容器。
     - COLS=3 × ROWS=3（纵深 5 层）= 45 张；imageSize=9 → 图 240×135
     - cell=648（系数 .393）→ 横向间距 408px；cellY=298（系数 .181）→ 纵向间距 163px
     - 占位横 1626/1685、纵 871/950 → 铺满但留了文字叠层的呼吸空间
     - 覆盖率 91% → **卡片之间明确有空隙、不重叠**（早期 4 列 + 大图时覆盖率 121%，糊成一片）
     - perspective 2640：5 层缩放 0.74x→1.54x，近大远小清晰
     踩坑记录：① 只 4 列横向、无纵向分层 → 内容只占中间，上下各空 180px；
             ② 4 列×3 层 + 大图 → 覆盖率 121% 又挤成一团；
             ③ 4 列时横向溢出 371px，右侧空一大块 → 减到 3 列。 */
  const cell = Math.round(cellSize * UNIT * 0.3 * fit) // 横向格距=495px（系数 .30）
  const cellY = Math.round(cellSize * UNIT * 0.24 * fit) // 纵向层距=396px（系数 .24；须>图高，否则同列相邻层重叠）
  const perspective = Math.round(cellSize * UNIT * 1.6)

  /* ---------- 图像场：横向 5 列 × 纵向 3 层 × 纵深 (viewRange*2+1) 格 ----------
     每格内做**大抖动 + 随机缩放**，把规则网格打散成随机散落的图像场。 */
  const COLS = 5
  const ROWS = 3
  /* 环形回收参数：卡片飞出 ±recycleZ 就搬到另一端重生，实现连续无限。
     ⚠️ **recycleZ 必须由 fogFar 推导**，不能随手取格距倍数：
     若 recycleZ > fogFar，卡片飞到回收点时 opacity 还 >0（仍可见），
     被搬走的瞬间用户会看到"卡片闪现"——这正是要避免的跳变。
     所以取 fogFar 的 ~55%（该处 opacity 已降到 0.2、blur 2.4px，基本不可辨），
     并要求至少覆盖最远可见层 (viewRange+1)*cell，否则视野内会出现空洞。
     **fadeFrom = 淡出带起点**：从这里开始线性淡到0。
     取「一个格距」——也就是从 dist ≈ recycleZ - cell 开始淡出，
     让整张卡在移动中就逐渐消失，而不是到边界瞬间消失。
     这样回收/换位置的瞬间 dist 必然 > recycleZ（opacity 已为 0），彻底不会「乱跑」。 */
  const recycleZ = Math.max((viewRange + 1) * cell, fogFar * 0.55)
  const cycleSpan = recycleZ * 2
  const fadeFrom = Math.max(0, recycleZ - cell)
  const planes = useMemo(() => {
    if (!total) return []
    const list = []
    for (let r = -viewRange; r <= viewRange; r++) {
      for (let gy = 0; gy < ROWS; gy++) {
        for (let cIdx = 0; cIdx < COLS; cIdx++) {
          for (let j = 0; j < density; j++) {
            const gx = cIdx - (COLS - 1) / 2 // 横向 -1.5..1.5
            const ry = gy - (ROWS - 1) / 2 // 纵向 -1..1
            const gz = r // 纵深
            const seed = (gz + 9) * 131 + (gy + 9) * 71 + (gx + 9) * 17 + j * 7
            // 抖动放到格距 45%：足够打散规则网格，又不会与邻格卡撞在一起
            const jx = (rand(seed) - 0.5) * cell * 0.32
            const jy = (rand(seed + 3) - 0.5) * cellY * 0.32
            // 随机缩放 0.72~1.34 → 卡片大小不一，形成官方那种散落观感
            const scale = 0.72 + rand(seed + 11) * 0.62
            /* 图片索引：**用「绝对格号」取模**，这是长廊循环的关键。
               绝对格号 = gz（纵深层，可为负）+ 每层的固定顺序 offset，
               因此「第N 格永远显示第 (N mod total) 张图」——
               往前滚时远处按顺序涌现新内容，走完一个周期后自然重复。
               这比「随机刷新」更像长廊：内容有规律、不跳不乱。
               注意：Math.round 必须有，否则 gx 为半整数时 imgIdx 是小数
               → images[小数] 为 undefined → 白屏崩溃。 */
            const absIdx = gz * (COLS * ROWS) + gy * COLS + cIdx
            const imgIdx = ((absIdx % total) + total) % total
            list.push({
              key: `${gz}-${gy}-${gx}-${j}`,
              x: gx * cell + jx,
              y: ry * cellY + jy,
              z: gz * cell,
              scale,
              imgIdx,
              // 保留格子的空间坐标：回收时据此推算下一格（见 recyclePlane）
              gx,
              ry,
              gz,
              gy,
              cIdx,
            })
          }
        }
      }
    }
    return list
  }, [viewRange, density, total, cell, cellY])

  /* ---------- 指针漂移 + 拖拽推进 ---------- */
  const onPointerMove = useCallback(
    (e) => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      setDrift({ x: px * driftAmount * 12, y: -py * driftAmount * 8 })
      if (dragging.current) {
        const dy = e.clientY - lastY.current
        // 累计位移超过阈值 → 认定为拖拽（用于抑制 click）
        moved.current += Math.abs(dy)
        // 拖拽给「速度」而非直接给位移 → 同样带惯性平滑，松手后滑行一段再停
        dragVel.current += dy * dragSpeed * 1.4
        lastY.current = e.clientY
      }
    },
    [driftAmount, dragSpeed],
  )

  /* **绝不在这里 setPointerCapture**：
     之前 onPointerDown 把指针捕获到 .igal 根元素，导致 click 被父元素截走，
     卡片上的 onClick 永远不触发（实测点击后聚焦层不出现）。
     改为用「位移阈值」区分点击与拖拽：位移 < 6px 视为点击，让 click 正常发生。 */
  const onPointerDown = (e) => {
    dragging.current = true
    moved.current = 0
    lastY.current = e.clientY
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  /* ======================================================================
     滚轮「预算制」+ 双层平滑 —— 解决「组件内滚动 vs 页面滚动」冲突 + 生硬感
     ======================================================================
     冲突根因：全屏区块有两个滚动消费者 —— ① 页面滚动（区块移出视口）
     ② 相机推进（场内容穿行）。若把两者绑定（区块进度=相机位置），
     滚轮一动页面和画面同时变化 → 眩晕感。

     方案：分段接管。区块在视口内时「独占」滚轮用于穿行，但有**有限预算**
     （scrollBudget 格）。滚到底预算耗尽 → 主动交还页面滚动（滚去下一节）；
     反向滚回来预算回升。区块完全离开视口 → 预算重置满。
     两个滚动**串行而非并行**：同一时刻只有一个在动，天然无冲突。

     平滑（双层）：
     - 第1 层「输入平滑」：滚轮不再直接跳写 targetZ，而是给 velZ **施力**；
       每帧 targetZ += velZ，velZ *= wheelFriction 衰减 → 相机是被「推动」的，
       推完还要滑行一段才停，输入本身连续无跳变。
     - 第 2 层「位置平滑」：camZ 每帧按指数缓动追赶 targetZ（smoothing）。
       两层叠加 → 起步软、持续稳、收尾拖。
     ====================================================================== */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    let raf
    // 区块在视口内的占比：0=完全离开，1=完全进入。用于判断是否该重置预算
    const visibility = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      return clamp((vh - r.top) / (r.height + vh), 0, 1)
    }

    const onWheel = (e) => {
      // 区块几乎不在视口内 → 完全不干预，纯页面滚动
      if (visibility() <= 0.001) {
        budgetRef.current = scrollBudget * cell
        velZ.current = 0
        return
      }
      const dy = e.deltaY
      const max = scrollBudget * cell
      // 向下滚（dy>0）需要预算；向上滚（dy<0）会释放预算
      const need = dy > 0 ? budgetRef.current : max - budgetRef.current
      if (need <= 1) {
        // 预算耗尽 → **不拦截**，把滚轮交还给页面（页面正常滚到下一节）
        // 同时清掉施加速度，避免残余惯性在交还后还在推相机
        budgetRef.current = clamp(budgetRef.current - dy * wheelToBudget, 0, max)
        velZ.current = 0
        return
      }
      e.preventDefault()
      budgetRef.current = clamp(budgetRef.current - dy * wheelToBudget, 0, max)
      // **只施力，不直接写 targetZ** → 输入连续，无跳变。
      // 施力大小与预算扣减解耦（wheelPulse）：预算用于「何时交还页面滚动」，
      // 脉冲用于「相机一次滑多远」。两者分开才能既平滑又不超预算。
      velZ.current += dy * wheelPulse
    }

    const onScroll = () => {
      // 区块滚出视口 → 预算重置满，下次进来又是全新穿行
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        if (visibility() <= 0.001) {
          budgetRef.current = scrollBudget * cell
          velZ.current = 0
        }
      })
    }

    budgetRef.current = scrollBudget * cell
    el.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      el.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [cell, scrollBudget, wheelToBudget, wheelPulse])

  /* ---------- 卡片回收：按「绝对格号」确定性重算（长廊循环的核心） ----------
     回收时**不随机**，而是让卡片进入「下一个格号」，按该格号用与初始布局
     完全相同的公式重算图/位置/缩放。这样：
     - 内容有规律地循环（第 N 格永远是第 N mod total 张图）= 长廊感
     - 同一格号的位置/缩放恒定 → 不会「跳位乱跑」
     - 不需要随机种子，也就不存在「同帧多卡拿到重复内容」的问题
     在卡完全不可见（opacity=0 的远端）时调用，用户看不到变化。
     直接改 DOM 而非 setState —— 每帧可能有十几张卡同时回收。 */
  const camDirRef = useRef(1) // 相机前进方向（+1 前进 / -1 后退），决定回收时落到哪一层
  const recyclePlane = useCallback(
    (p, i) => {
      if (!total) return
      // 前进时落到下一层（gz+1），后退时回上一层（gz-1）
      const nextGz = p.gz + (camDirRef.current >= 0 ? 1 : -1)
      p.gz = nextGz
      p.z = nextGz * cell
      // 与 planes 初始布局完全相同的公式，保证同格号结果一致
      const absIdx = nextGz * (COLS * ROWS) + p.gy * COLS + Math.round(p.gx + (COLS - 1) / 2)
      p.imgIdx = ((absIdx % total) + total) % total
      const seed = (nextGz + 9) * 131 + (p.gy + 9) * 71 + (Math.round(p.gx + (COLS - 1) / 2) + 9) * 17
      p.x = p.gx * cell + (rand(seed) - 0.5) * cell * 0.32
      p.y = p.ry * cellY + (rand(seed + 3) - 0.5) * cellY * 0.32
      p.scale = 0.72 + rand(seed + 11) * 0.62
      const el = cellRefs.current[i]
      if (!el) return
      const item = images[p.imgIdx]
      if (!item) return
      const imgEl = el.querySelector('img')
      if (imgEl && item.url) imgEl.src = item.url
      el.setAttribute('aria-label', item.title || '作品')
      const labelEl = el.querySelector('.igal__label')
      if (labelEl) labelEl.textContent = item.title || ''
      el.style.setProperty('--w', `${Math.round(imgW * p.scale)}px`)
      el.style.setProperty('--h', `${Math.round(imgH * p.scale)}px`)
      el.style.setProperty(
        '--image-radius',
        `${Math.round(imgH * clamp(imageRadius, 0, 0.5) * p.scale)}px`,
      )
    },
    [total, cell, cellY, imgW, imgH, imageRadius, COLS, ROWS],
  )

  /* ---------- 相机推进（施力 + 缓动）+ 卡片自流动 ----------
     每帧 camZ 向 targetZ **按帧率无关的指数缓动** 逼近
     （lerp系数 = 1-(1-smoothing)^(dt/16.67)），滚动停下后画面仍缓慢滑行一小段才停，
     手感顺滑不生硬；smoothing 越小越平滑（0.04≈缓慢优雅，1=完全硬跟随）。 */
  useEffect(() => {
    let raf
    let lastT = performance.now()
    const tick = (now) => {
      const dt = Math.min(64, now - lastT) // 夹住 dt，避免切后台回来时一帧跳完
      lastT = now
      const k = 1 - Math.pow(1 - clamp(smoothing, 0.005, 1), dt / 16.67)

      if (!dragging.current) {
        // 第 1 层「施力推进」：滚轮速度积分成位移，速度按帧率无关地衰减
        // → 输入连续无跳变，推完还滑行一段才停（wheelFriction 越小滑得越久）
        // **不设上限 clamp** —— 相机可以无限前进（真正的"无限滚动"）。
        const fk = 1 - Math.pow(1 - clamp(wheelFriction, 0.5, 0.999), dt / 16.67)
        targetZ.current += velZ.current
        velZ.current *= fk
        if (Math.abs(velZ.current) < 0.02) velZ.current = 0

        // 第 2 层「位置平滑」：相机按指数缓动追赶目标
        camZ.current += (targetZ.current - camZ.current) * k
        if (Math.abs(targetZ.current - camZ.current) < 0.05) {
          camZ.current = targetZ.current // 到位后吸附，避免无限小数的抖动
        }
        // 拖拽惯性：叠加层，松手后衰减回 0
        dragZ.current += dragVel.current
        dragVel.current *= friction
        if (Math.abs(dragVel.current) < 0.01) dragVel.current = 0
      }
      if (autoZoom) targetZ.current -= autoZoomSpeed * 8

      // 相机总位移 = 相机位置 + 拖拽叠加
      const camTotal = camZ.current + dragZ.current

      /* ======================================================================
         卡片自流动 + 出界回收 + 随机换新（真正的「无尽刷新」）
         ----------------------------------------------------------------------
         旧做法：整场平移 `--cam-local = camTotal % cell` —— **对格距取模**，
         相机每走满一格就整体跳回原点，视觉上是「跳一下」（用户反馈"一卡一卡"）。

         现在：每张卡自己在 z 轴流动，飞出 ±recycleZ 的卡**循环到另一端重生**，
         并且**重生时换一张新图 + 新抖动位置 + 新缩放 + 新尺寸**——
         所以往前滚时，远端不断涌现「从未见过的卡」，永不重复、无尽头。
         ---------------------------------------------------------------------- */
      const span = cycleSpan // 环形周期 = 整个 z 范围
      /* 记录相机前进方向：决定回收时卡片落到「下一层(+1)」还是「上一层(-1)」。
         这样长廊循环始终朝滚动方向延伸——往前滚就不断有新层从远端补上。 */
      if (Math.abs(velZ.current) > 0.05) camDirRef.current = velZ.current > 0 ? 1 : -1
      for (let i = 0; i < planes.length; i++) {
        const p = planes[i]
        const el = cellRefs.current[i]
        if (!el) continue
        // 卡的当前 z = 基准 z + 相机位移
        let z = p.z + camTotal
        /* 出界回收（长廊循环）。
           ⚠️⚠️ **必须同步更新 p.z，否则会每帧重复回收（曾反馈「往前推一段后乱刷」）**：
           p.z 是「基准 z」，若只改局部变量 z 而不写回 p.z，下一帧重新计算
           `p.z + camTotal` 得到的还是同一个越界值 → 再次触发回收，
           于是**每一帧都换图换位** = 看起来在乱刷/疯狂跳动。
           recyclePlane 内部会写回 p.z / p.gz，并按新格号重算内容。 */
        if (z > recycleZ || z < -recycleZ) {
          z += z > recycleZ ? -span : span
          p.z = z // ★ 关键：写回基准值，否则每帧重复回收
          recyclePlane(p, i)
        }
        p.liveZ = z
        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, ${z.toFixed(1)}px)`
        // 雾效/zIndex 必须跟随**实时 z**，否则卡片被搬到远端后明暗不变会很假
        const dist = Math.abs(z)
        /* 淡出带：从 dist >= fadeStart 起线性淡到 0。
           关键：fadeStart 必须**远大于**回收点附近的可见范围，
           也就是要在卡片还相当远（视觉上只是一团模糊暗影）时就让它消失，
           这样回收/换位置的操作永远发生在不可见区域。 */
        const fadeStart = fadeFrom
        const fadeOut = clamp((recycleZ - dist) / Math.max(1, recycleZ - fadeStart), 0, 1)
        const ft = clamp((dist - fogNear) / Math.max(1, fogFar - fogNear), 0, 1)
        el.style.opacity = ((1 - ft * 0.8) * fadeOut).toFixed(3)
        el.style.filter = `blur(${(ft * 2.4 + (1 - fadeOut) * 5).toFixed(2)}px) brightness(${(1 - ft * 0.45).toFixed(2)})`
        el.style.zIndex = String(1000 - Math.round(dist / 8))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [friction, autoZoom, autoZoomSpeed, smoothing, wheelFriction, planes, recycleZ, cycleSpan, fogNear, fogFar, fadeFrom, recyclePlane])

  /* ---------- 雾效：纵深 z → fogNear..fogFar 映射 ----------
     注意衰减别太狠：以前 opacity 掉到 0.08、brightness 0.38，整场发灰看不清卡片。
     现在最远层也保留 0.3 透明度和 0.55 亮度，仍有纵深层次但不压抑。 */
  const fogStyle = useCallback(
    (z) => {
      const dist = Math.abs(z)
      const t = clamp((dist - fogNear) / Math.max(1, fogFar - fogNear), 0, 1)
      return {
        opacity: (1 - t * 0.7).toFixed(3),
        filter: `blur(${(t * 2.4).toFixed(2)}px) brightness(${(1 - t * 0.45).toFixed(2)})`,
        zIndex: 1000 - Math.round(dist / 8),
      }
    },
    [fogNear, fogFar],
  )


  const handleClick = (imgIdx) => {
    if (!allowImageFocusOnClick) return
    // 拖拽结束时浏览器仍会派发 click，用位移阈值过滤掉，避免"拖完误触发聚焦"
    if (moved.current > 6) {
      moved.current = 0
      return
    }
    moved.current = 0
    setFocusIdx((prev) => {
      const next = prev === imgIdx ? -1 : imgIdx
      if (next >= 0 && onFocus) onFocus(images[next], next)
      return next
    })
  }

  /* ---------- 「退出」：一键离开沉浸式，回到页面滚动 ----------
     做法：把剩余滚轮预算清零 + 清掉施加速度 → 下一个滚轮事件不再被拦截，
     页面即可正常滚动；再主动滚一屏，让用户直接进入下一节。 */
  const handleExit = () => {
    budgetRef.current = 0
    velZ.current = 0
    dragVel.current = 0
    if (onExit) {
      onExit()
      return
    }
    const el = wrapRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const vh = window.innerHeight || 1
    // 滚到本区块底部之外（进入下一节），behavior smooth 与站内动效一致
    window.scrollTo({
      top: top + el.offsetHeight + vh * 0.25,
      behavior: 'smooth',
    })
  }

  if (!total) return null

  const focusItem = focusIdx >= 0 ? images[focusIdx] : null

  return (
    <div
      ref={wrapRef}
      className={`igal ${className}`}
      style={{
        width,
        ...(height ? { height } : null), // 未传height 时交给 CSS 类控制
        backgroundColor,
        perspective: `${perspective}px`,
      }}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={() => {
        dragging.current = false
        setDrift({ x: 0, y: 0 })
      }}
      role="application"
      aria-label="AI 动画图像场，可拖拽或滚动穿行"
    >
      <div
        ref={stageRef}
        className="igal__stage"
        style={{
          '--cam-x': `${drift.x}px`,
          '--cam-y': `${drift.y}px`,
          '--image-radius': `${Math.round(imgH * clamp(imageRadius, 0, 0.5))}px`,
          '--fog-color': fogColor,
        }}
      >
        {planes.map((p, i) => {
          const img = images[p.imgIdx]
          const fog = fogStyle(p.z)
          // 每张卡有随机缩放（0.72~1.34）→ 大小不一，形成随机散落观感
          const w = Math.round(imgW * p.scale)
          const h = Math.round(imgH * p.scale)
          return (
            <button
              key={p.key}
              ref={(el) => {
                if (el) cellRefs.current[i] = el
              }}
              type="button"
              className={`igal__cell${focusIdx === p.imgIdx ? ' is-focus' : ''}`}
              style={{
                '--w': `${w}px`,
                '--h': `${h}px`,
                // 圆角随卡片缩放变化，保持视觉一致的圆角比例
                '--image-radius': `${Math.round(imgH * clamp(imageRadius, 0, 0.5) * p.scale)}px`,
                transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`,
                opacity: fog.opacity,
                filter: fog.filter,
                zIndex: fog.zIndex,
              }}
              onClick={() => handleClick(p.imgIdx)}
              aria-label={img.title || '作品'}
            >
              <img className="igal__img" src={img.url} alt={img.alt || ''} loading="lazy" />
              <span className="igal__label" aria-hidden="true">
                {img.title}
              </span>
            </button>
          )
        })}
      </div>

      {focusItem && (
        <div className="igal__focus" onClick={() => setFocusIdx(-1)}>
          <img
            className="igal__focus-img"
            src={focusItem.url}
            alt={focusItem.alt || ''}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="igal__focus-bar" onClick={(e) => e.stopPropagation()}>
            <strong>{focusItem.title}</strong>
            <span>{focusItem.subtitle}</span>
            {focusItem.media && (
              <button
                type="button"
                className="igal__focus-play"
                onClick={(e) => {
                  e.stopPropagation()
                  setFocusIdx(-1)
                  if (onPlay) onPlay(focusItem)
                }}
              >
                ▶ 播放视频
              </button>
            )}
          </div>
        </div>
      )}

      <span className="igal__hint" aria-hidden="true">
        滚轮 / 拖拽穿行 · 点击放大
      </span>

      {/* 底部「退出」按钮：半透明倒三角，点击立即耗尽滚轮预算并把滚轮交还页面，
          用户可一键离开沉浸式图像场（替代「一直滚到底」的隐式退出）。
          showExit 关闭时隐藏；onExit 可传入自定义回调（如直接滚到下一节）。 */}
      {showExit && (
        <button
          type="button"
          className="igal__exit"
          onClick={handleExit}
          aria-label="退出图像场，继续浏览页面"
          title="退出并继续向下浏览"
        >
          <span className="igal__exit-tri" aria-hidden="true" />
          <span className="igal__exit-txt" aria-hidden="true">
            继续浏览
          </span>
        </button>
      )}
    </div>
  )
}