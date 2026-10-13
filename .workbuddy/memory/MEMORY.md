# 房子翔作品集网站 · 长期约定

## 定位
- 个人作品集，React+Vite，PC 优先，版心 1700px。暗色、高级、克制、科技感，反感同质化模板（国潮风 / 粗糙弥散方框）。
- 终极差异化诉求：一键切换整站风格/动效/排版（换肤 token 已预留，未实现）。

## 工程约定
- 全站文案/数据：`src/data/content.js`（唯一数据源）。【注意】数据是共享的：`aiMotion`（首页精选 limit=5 + 医学页共用）、`comics` 等；只改某处展示请在展示层 `.map()` 覆盖，勿改 content.js（2026-10-12 误改踩坑，导致医学页跟着变）。
- 样式 token：`src/styles/global.css` 的 `:root`，为换肤预留。
- 视频：WebM(VP9) + H.264 MP4 双源（webm 在前）；背景静音视频剥离音频转 webm；有配音的 AI 卡视频保留音频转 webm + mp4 兜底；自动播放走 `LazyVideo`（进视口才加载、派生同名 .webm），content.js 零改动。中文文件名正常。
- 本地预览：`start-dev.bat`（双击 `npm run dev` → :5173）。会话内 AI 起的 preview 进程会被沙箱回收，要常驻用 bat。

## 路由速查
首页 `/`、全部作品 `/works`、医学可视化 `/medical-visualization`（非 /medical）、AI 动画 `/ai-motion`、医学插画 `/illustrations`。

## 关键区块现状
- Hero：BridgeAI 风（全屏沉浸 + 居中超大标题 + 底部信息带），幕布揭幕开场。
- 优势区：GradientCarousel（自写，复刻 React Bits Pro；构建期 sharp 预提取主色存 `tint`，零运行时开销）。Three.js 已移除。
- 首页 AI 动画：伪 3D 球面环视 AiMotion（`ai-ring`，滚轮聚焦切换 + 纵深视差，到首/尾释放页面滚动）。
- /medical AI 动画区：MasonryCards（CSS `columns:2` 真瀑布流；contain 前景 + 模糊背景填黑边）。
- 已集成手写 React Bits：Particles(About) / SpotlightCard(精选项目)。

## 动效架构（GSAP + ScrollTrigger）
- 中枢 `src/animations/useSiteAnimations.js`（gsap.context + ScrollTrigger，含 reduced-motion 兜底/cleanup）。
- 标记：`data-anim="heading|stagger|reveal|parallax"`、`scroll-fade`(scrub 淡出)、`[data-reveal]`(通用上浮)。
- 所有进场动效统一 `toggleActions:'play none none reverse'`(REPLAY)，二次划过可重播；优势卡入场自定义同款 REPLAY 且不可 clearProps。
- Hero 时间线：幕布揭 → 导航沉 → 标题遮罩内上移 → 副标/底栏上浮。缓动 power3/4.out；只动 transform/opacity/clipPath。

## 交付验收（TDD/BDD）
- 每功能先 Given/When/Then；交付附 checklist；构建通过 + 浏览器实测（点击/滚动/跳转）+ agent-browser 截图（`C:\Users\Mayn\.workbuddy\shots\`，eval 用 `var` 不 `const`）。

## 项目卫生
- 自动生成物每 ~5 轮扫描清理；安装包/备份/临时文件统一放 `E:\wangzhan\作品集网站开发过程残留备份\`，勿散放项目根/`.workbuddy`；`dist.bak/` 保留作回滚。
- 图片压缩：comics 超长图只压 JPEG（WebP 单边 16383px 上限会报错），封面/背景/头像用 WebP；产物落地走「脚本输出到备份临时目录 + bash mv」（safe-delete 钩子拦 Node write/unlink）。
- CSS 铁律：删/换 CSS 块必连带收尾 `}`，否则 postcss 只报「配平错误」；每次改完跑大括号计数核对。InfiniteGallery(3D 无限图像场) 已归档 `_archive/`，勿复活那套滚轮预算制方案。

## AI 动画「项目介绍面板」（2026-10-13）
视频卡点开 → 悬浮面板，**左视频 / 右项目详情**（CSS grid `ms__focus-shell--split` 1.25fr|0.75fr）；无 `project` 的卡片仍走原单栏，两者共用一套结构。数据在 `content.js` 的 `aiProjects`（`pipeline` 生产流程 + `role`/`prop`/`scene` 三组设定图），`aiMotion` 条目用 `project: '<id>'` 关联。流程步骤的 `tag` 区分 `agent`（我）/ `本人`（送审校验）/ `双方`。设定图放 `public/project-settings/*.webp`——**用户明确要求设定图一律转 WebP**（sharp q82，约省 50%）。
- ⚠️ **页面的 `galleryImages` 是 `.map()` 派生的，必须透传 `project` 字段**，否则面板静默不渲染、**无任何报错**（`focusItem?.project` 为 undefined → null → 跳过）。给组件传派生对象时，新增字段要同步加进 map。
- ⚠️ `node -e` 里 `fs.readFileSync('/tmp/x')` 会被解析成 `F:\tmp\x`；用 `$(cd /tmp && pwd -W)` 取 Windows 绝对路径。
- **`aiProjects` 可选字段 `heroImage`**：面板头部装饰背景（仅氛围，双层 background = 遮罩渐变 + `var(--panel-hero)`，负 margin 出血到面板边缘）。不写则无背景。
- **设定图网格**：`grp.items.length===1` 时自动整幅铺满（`ms__setgrid--single`，双类名提特异性防 ≤1180px 媒体查询盖回两列）。`.ms__set img` 固定 `aspect-ratio:16/9` + cover（设定图一律 16:9，零裁切）。
- **新项目命名**：`public/project-settings/<项目缩写>-*`（如 `alz-char-*` / `alz-process` / `alz-hero`），避免多项目撞名。
- **新增 AI 动画视频规格**（720p 起）：MP4 `libx264 crf26 preset slow +aac 96k +faststart`（≤7MB）；WebM `libvpx-vp9 crf34 cpu-used 3 +libopus 80k`；缩略图抽帧 1280 宽 webp q82。工具走 `node_modules/ffmpeg-static/ffmpeg.exe`（PATH 里没有 ffmpeg）。
- ⚠️ **dev server 的 CSS 模块缓存会只吃到部分并行编辑**（同批 4 处改动 served 3 处）。现象：浏览器里属性 computed 为 `none` 但源文件是对的。**解法：`touch src/styles/global.css` 强制 mtime 变化再重新请求**。另：Vite 把 CSS 包成 JS 字符串且**规则内有真实换行**，用 `indexOf('selector{')` 判断存在性，别把换行后的属性拼进匹配串。


## 个人信息（详见 个人资料.md）
24 岁，艺术设计专科，自学板绘商业插画；医学可视化公司经历（谋生）；自研手作素材库(700+ 图)；兴趣编绳/AI 造工具/羽毛球；想画治愈系。
