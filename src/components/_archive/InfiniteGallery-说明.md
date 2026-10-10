# InfiniteGallery 组件存档

> 存档时间：2026-10-10 19:44
> 状态：**已从 `/medical-visualization` 页面卸载**，替换为「流式卡片展示」。
> 源码：`src/components/_archive/InfiniteGallery.jsx.bak`（项目内）
> 　　　`E:\wangzhan\作品集网站开发过程残留备份\InfiniteGallery-存档-2026-10-10.jsx`（外部）
> 如需恢复：把 `.bak` 改回 `.jsx` 放回 `src/components/`，并还原 `MedicalVisualizationPage.jsx` 中该区块。

---

## 一、这是什么

复刻 React Bits Pro「Infinite Gallery」的**3D 无限图像场**——卡片在透视空间里沿 Z 轴纵深排布，
滚动/拖拽时相机在空间中穿行，形成无尽走廊的沉浸感。

---

## 二、最终参数（页面实测调优后的值）

| 参数 | 值 | 说明 |
|---|---|---|
| `COLS` | 5 | 横向列数 |
| `ROWS` | 3 | 纵向层数 |
| `viewRange` | 2 |纵深每侧层数 → 共 5 层，75 张卡 |
| `imageSize` | 6 | 图高 = 6 × UNIT(15) = **90px**（宽 160px） |
| `density` | 1 | 每格 1 张 |
| `cellSize` | 110 | 世界单位基准 |
| `cell`（横向格距） | `cellSize × UNIT × 0.30` | = **495px** |
| `cellY`（纵向层距） | `cellSize × UNIT × 0.24` | = **396px**（须 > 图高，否则同列重叠） |
| 位置抖动 | 格距的 **0.32** | ±158px，限制在格内微移 |
| 随机缩放 | **0.72~ 1.34** | 卡片大小不一 |
| `perspective` | `cellSize × UNIT × 1.6` | = **2640px** |
| `imageRadius` | 0.14 | 圆角 ≈ 13px |
| 抖动收窄后的圆角 | — | `--image-radius = imgH × 0.14 × scale` |

### 运动与交互参数

| 参数 | 值 | 作用 |
|---|---|---|
| `scrollBudget` | 4 | 滚轮可独占的"预算"格数，超出即交还页面滚动 |
| `wheelToBudget` | 0.8 | 每 1px deltaY 扣多少预算（决定滚几次交还） |
| `wheelPulse` | 0.22 | 每 1px deltaY 给多少冲量（决定滚一次滑多远） |
| `wheelFriction` | 0.92 | 施力每帧保持率（越小尾巴越长） |
| `smoothing` | 0.045 | 相机位置每帧向目标逼近的比例 |
| `dragSpeed` / `friction` | 0.9 / 0.9 | 拖拽速度与惯性衰减 |
| `showExit` | true | 显示底部「继续浏览」退出按钮 |

---

## 三、核心架构

### 1. 双层平滑（施力模型）

```
滚轮 ──施加冲量──> velZ ──积分──> targetZ ──指数缓动──> camZ
（输入连续）      （衰减）      （目标）    （按 dt 归一化）
```

- `k = 1 - (1 - smoothing)^(dt/16.67)` —— **必须按 dt 归一化**，否则 60Hz 与 120Hz 屏速度不一致
- `dt` 夹在 64ms 内，防止切回标签页时一帧跳完
- 实测：一次滚轮滑行约 330px，**2.3 秒才完全停稳**

### 2. 卡片自流动 + 出界回收（不是整体平移）

```
z = p.z + camTotal
if (z > recycleZ || z < -recycleZ) {
  z += (z > recycleZ ? -span : span)
  p.z = z// ★ 写回基准值
  recyclePlane(p, i)
}
```

- `recycleZ = Math.max((viewRange + 1) × cell, fogFar × 0.55)` = **1485px**
- `cycleSpan = recycleZ × 2` = **2970px**（= 6 格，恰好格距整数倍）
- `fadeFrom = recycleZ - cell` → **淡出带宽一整格**，保证回收点opacity 恒为 0

### 3. 长廊循环：绝对格号取模

```js
const absIdx = gz * (COLS * ROWS) + gy * COLS + cIdx
const imgIdx = ((absIdx % total) + total) % total   // 负数要 +total 两次
```

第 N 格永远显示第 (N mod total) 张图→ 往远滚内容按顺序涌现，走到头自然回到起点。
回收时落到 `nextGz = p.gz ± 1`（按滚动方向 `camDirRef`），用**与初始布局完全相同的公式**重算
gz / imgIdx / x / y / scale → 同格号结果恒定，**天然不跳变**，无需随机种子。

---

## 四、踩过的坑（血泪史，别重犯）

### ① 漏`perspective` → 伪3D 完全失效
`transform-style: preserve-3d` 依赖父元素的 `perspective`。没它，所有卡片被压平成一排。
**做伪 3D 第一件事：确认根元素有 `perspective`。**

### ② world units 当 px 用 → 图只有 22px
官方组件给的数值是"世界单位"，不能直接当 CSS px。需定 `UNIT = 15` 换算基准。
且**空间参数要用 node 算透视缩放比与总跨度**，不要凭感觉调。

### ③ 只有横向网格 → 上下大片空白
纵向必须也分层（`ROWS`）。否则容器 798px 里内容只占中间 440px。
正确做法是**反解**：先定图层数与图尺寸，再解出格距让它恰好铺满。

### ④ `setPointerCapture` 到父容器 → 点击永不触发
在 `onPointerDown` 里捕获指针会把后续 `click` 截走，子元素 `onClick` 永远不触发。
**区分点击/拖拽用「位移阈值」**（`moved` ref，< 6px 算点击），不要用指针捕获。

### ⑤ 被 rAF 每帧改样式的元素加了 CSS transition → 粘滞
`transition: filter .35s, opacity .35s` 让每次写入都带 0.35s 滞后，动画永远追不上。
**每帧改样式的元素绝不能加 transition**，hover 动效要放在内部子元素上。

### ⑥ 图片索引含相机格号 → 整场闪屏
`(camCell + gz) * 31` 会在跨格时瞬间轮换全场图片。
**图片索引只能由空间位置决定，绝不能含相机状态。**

### ⑦ 回收时未写回`p.z` → 每帧重复回收
只改局部变量`z` 不写回基准`p.z`，下一帧重算还是同一个越界值 → **每帧都刷新**（实测 41 次/1500px）。
**凡 `if (越界) { 重置 }`，重置必须写回下一次计算会读的那个变量。**

### ⑧ 引入随机性 →「乱跑」「乱刷」
- 抖动 ≥ 0.9 格距时，每次回收都跨格跳位 = 用户说的「乱跑」
- 随机换图虽有新鲜感，但破坏秩序感 = 「像在乱换」
**「无限」不等于「随机」。** 内容重复要靠加素材解决，不要靠随机。

### ⑨ 滚轮预算制：硬编码 0.004 系数 → 要滚 4125 次
预算换算系数必须实测算。现在拆成两个独立参数：
- `wheelToBudget` 管**何时交还页面**
- `wheelPulse` 管**滚一次滑多远**
（共用一个参数会因位移=扣减，导致 2 次滚轮就"飞"到底）

### ⑩ 删 CSS 块时忘删media query 的收尾 `}`
导致 postcss 报 `Unexpected }`。

### ⑪ 取模小数 → `images[小数]` undefined → 白屏
数组下标来自算式时，任何一环出小数都会得到 undefined。**务必 `Math.round`。**

---

## 五、性能注意

- 相机推进**只写 CSS 变量 / DOM style，不走 React setState**（每帧执行）
- 回收时**直接改 DOM**（`img.src`、`setAttribute`、`style.setProperty`），
  一帧可能有十几张卡同时回收，走 React 重渲染会明显掉帧
- 雾效（opacity/filter）与 zIndex **必须跟随实时 z**，否则远端卡明暗不变很假

---

## 六、可复用要点（换组件后仍适用）

1. **伪 3D 第一步**：`perspective` 挂根元素 + 尺寸按世界单位换算 + node 标定几何
2. **双层平滑**：输入层施力（velZ积分）+ 位置层指数缓动（按 dt 归一化）
3. **滚轮与页面滚动冲突** → 预算制分段接管：预算内独占、耗尽交还、离开视口重置
4. **无限循环** → 绝对格号取模（不是随机、不是整体取模平移）
5. **回收不可察** → 淡出带宽度 ≥ 一个格距 + 写回基准值
6. **几何调参** → 先用 node 反解，再落地；看「横向占位/纵向占位/覆盖率」三个指标
