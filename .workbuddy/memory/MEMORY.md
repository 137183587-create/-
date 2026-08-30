# 房子翔作品集网站 · 长期约定

## 项目定位
- 子翔（房子翔）个人作品集，React+Vite，PC 优先，版心 1700px。
- 设计基调（用户明确）：暗色系、高级、克制、有科技感、不要像模板网站。反感烂大街同质化（点名国潮风、粗糙弥散方框）。
- 核心差异化诉求：网站要能"善变"——一键切换完全不同风格/动效/排版（尚未实现，为基础版之后的重点）。

## 工程约定
- 全站文案 / 数据集中在 `src/data/content.js`，改内容只动此文件。
- 样式变量集中在 `src/styles/global.css` 的 `:root`，为后续"换肤"预留 token。
- Hero 视频背景位：把 mp4 放 `public/hero.mp4`，在 content.js 的 `heroVideo` 填 `'/hero.mp4'` 即生效。
- 当前为可运行基础版；用户会陆续提供截图与参考站来迭代优化。

## 关键个人信息（详见 个人资料.md）
- 24 岁，日照航海工程职业学院艺术设计专科；自学板绘商业插画入行。
- 医学可视化公司插画/AI 动画经历（不喜欢医学插画，仅为谋生）。
- 自研"手作素材库"（trae，700+ 图，网页版+小程序版在测）。
- 兴趣：编绳手作(玉石平安扣)、AI 造工具、羽毛球、游戏；想画治愈系。
- 学习方式：兴趣驱动→做出东西→正反馈循环。

## 设计参考
- 2026-08-25 用户提供 BridgeAI 风格参考图，偏好：全屏沉浸背景 + 居中超大标题 + 底部左右信息带。Hero 已按此版式重构，保留暗色基调。

## 动效架构（GSAP + ScrollTrigger）
- 中枢：`src/animations/useSiteAnimations.js`（在 App 调用，gsap.context + ScrollTrigger，含 reduced-motion 兜底与 cleanup）。
- 旧 CSS `[data-reveal]` 淡入已废弃，由 GSAP 接管；不要再给元素加会冲突的内联隐藏。
- 标记约定（在组件 JSX 上写）：
  - `data-anim="heading"`：大标题 dramatic 揭幕（clipPath 上揭 + 位移），可标在 `.section__head` 容器或单独的 `.section__title/.contact__title/.section__eyebrow/.contact__eyebrow` 上。
  - `data-anim="stagger"`：标在容器上，其直接子元素依次 stagger 进场（项目卡、优势卡、联系链接）。
  - `data-anim="reveal"`：图片/头像 clip 揭幕（如 `.project__media`、`.avatar`）。
  - `data-anim="parallax"`：滚动轻微视差（scrub）。
  - `data-reveal`（无 data-anim）：通用上浮进场。
- Hero 开场时间线：`.hero__curtain` 幕布从上揭开 → 导航下沉 → 标题每行遮罩内上移 + scaleY 压缩归位 → 副标/底栏上浮。标题每行需包 `.hero__title-mask`(overflow hidden) > `.hero__title-line`。
- 缓动统一 power3/power4.out，慢节奏、无弹性；只动 transform/opacity/clipPath 保性能。
- React Bits 组件已集成：`Particles`（About 背景）、`SpotlightCard`（精选项目卡，光斑跟随鼠标，金/蓝/暖/玉四色）。
- 已做移动端响应式适配：汉堡菜单 + 1080/600/380 断点 + 锚点滚动偏移（scroll-padding-top）+ stat 长标签换行保护。
- Hero↔About 滚动过渡采用 `.hero__fade-edge` 渐变遮罩 + About 负 margin 重叠 + GSAP scrub 浮现，避免两段内容硬切。

## 交付验收（TDD / BDD）
- 用户要求（2026-08-27）：后续交付均按 TDD / BDD 原则检查，不要只"说做了"。
- BDD：每个交互/功能先用 Given/When/Then 明确可验收行为，交付时对照验收标准逐项核对。
- TDD：关键交互（如回到顶部按钮、路由跳转）补单元测试，先写测试再实现或用测试兜底回归。
- 交付前必做：构建通过 + 浏览器（agent-browser）实际验证关键行为（点击/滚动/跳转）+ 回复中附验收清单。

## 项目卫生（自动生成文件清理）
- 2026-08-28 用户要求：约每 5 轮对话粗略扫描项目根目录，不要让自动批量产生的东西堆积。
- 2026-08-30 用户要求：开发过程中产生的安装包、备份、临时文件统一放到 `E:\wangzhan\作品集网站开发过程残留备份\`，不要在项目根目录或 `.workbuddy\` 里散放。
- 已知污染源：`dist.bak-*` 时间戳备份、`vite.config.js.timestamp-*.mjs` 临时配置、`.trash/` 回退目录、压缩/探针/验收脚本。
- 保留项：`dist.bak/` 作为最新构建备份（便于回滚）。
- 已配置：`scripts/rotate-dist.mjs` 会在每次 `npm run build` 后自动清理根目录 `dist.bak-*`、Vite 临时文件，并把旧 `dist.bak` 先移到 `.trash` 再逐条 safeRemove 清空，不再依赖 git（新电脑无 git）。
- 媒体母版（未压缩原片）已整体移出项目到 `E:\wangzhan\作品集网站开发过程残留备份\作品集-母版原片`，项目内 `public/` 只保留压缩后的发布版；`vite.config.js` 忽略 `_master-media/**`。

