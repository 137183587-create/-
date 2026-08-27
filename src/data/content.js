// ============================================================
//  全站文案集中在这里 —— 后续给我截图 / 参考站，直接改这个文件即可
// ============================================================

export const site = {
  name: '房子翔',
  mark: '房',
  // 视频背景：把视频放 public/hero.mp4 后填 '/hero.mp4' 即生效
  heroVideo: '/hero.mp4',
  nav: [
    { label: '首页', href: '#hero' },
    { label: '关于', href: '#about' },
    { label: '作品', href: '#projects' },
    { label: '优势', href: '#advantages' },
    { label: '联系', href: '#contact' },
  ],
}

export const hero = {
  eyebrow: 'PORTFOLIO · 2026',
  title: ['房子翔', '插画师 &', 'AI 视觉创作者'],
  subtitle: '用兴趣驱动创作，让作品集也会生长。',
  cta: '联系我',
  ctaSecondary: '查看作品',
  footer: {
    note: '目前正在探索 AI 视觉与治愈系插画方向，',
    noteAccent: '持续生长中。',
    reelLabel: '作品 reel',
    reelDuration: '0:00',
  },
}

export const about = {
  monogram: '房',
  avatar: '/avatar.jpg',
  intro: [
    '我是房子翔，一名插画师，也是一个会用 AI 造工具的创作者。',
    '从艺术设计专科自学板绘商业插画入行，在医学可视化公司做过插画与 AI 动画——但比起接单，我更想自由地画点自己相信的东西，比如温暖、安静的治愈系画面。',
    '我不喜欢同质化的套路，也不爱半吊子的流程。对自己感兴趣的领域会一直钻下去，用 AI 把脑子里的想法一个个落地。这个作品集也是其中之一：它会随我一起生长、变形。',
  ],
  contact: {
    wechat: '13370852058',
    phone: '13370852058',
    email: '137183587@qq.com',
    location: '山东青岛',
  },
  stats: [
    { value: '700+', label: '素材库参考图' },
    { value: '2', label: '自研工具 · 网页 / 小程序' },
    { value: '双线', label: '插画 × AI 动画' },
    { value: '24', label: '岁 · 持续生长' },
  ],
}

export const projects = [
  {
    title: '手作素材库',
    tag: '自研工具 · 2025',
    year: '2025',
    status: '可演示',
    card: 'gold',
    featured: true,
    desc: '用 trae 开发的本地素材库，按颜色与款式检索 700+ 张编绳 / 玉石平安扣参考图；另有微信小程序版在测试中。',
  },
  {
    title: '医学可视化插画 & AI 动画',
    tag: '商业项目',
    year: '2024',
    status: '保密',
    card: 'blue',
    desc: '在企业项目中负责医学类插画与 AI 动画设计（部分内容受保密限制，仅展示脱敏片段）。',
  },
  {
    title: '治愈系插画',
    tag: '自由创作 · 构思中',
    year: '2026',
    status: '进行中',
    card: 'warm',
    desc: '想画下雨天窝在窗边的小猫那样安静温暖的画面。正在动手，慢慢填进这里。',
  },
  {
    title: '编绳手作 · 玉石平安扣',
    tag: '个人兴趣',
    year: '—',
    status: '个人',
    card: 'jade',
    desc: '用股线、玉线编绳，搭配平安扣与各类珠子，做手机挂件、钥匙扣。是素材库的灵感来源。',
  },
]

export const advantages = [
  { title: '板绘商业插画', desc: '从报班自学到商业落地，能接住"要好看也要能用"的需求。' },
  { title: 'AI 动画设计', desc: '熟悉医学可视化等方向的 AI 动画流程。' },
  { title: '用 AI 造工具', desc: '不只会用 AI，还会用 trae 自己写网页 / 小程序，把想法变成能跑的产品。' },
  { title: '编绳手作', desc: '把兴趣做成实物，也做成可检索的素材系统。' },
  { title: '兴趣驱动学习', desc: '踏入陌生领域 → 自己做出东西 → 正反馈循环，学得快也学得深。' },
  { title: '克制与审美', desc: '反感烂大街同质化，要干净、高级、有自己脾气。' },
]

export const contact = {
  title: '一起做点东西？',
  sub: '招聘、合作，或者只是想聊聊猫和雨，都欢迎。',
  links: [
    { label: '微信', value: '13370852058' },
    { label: '电话', value: '13370852058' },
    { label: '邮箱', value: '137183587@qq.com' },
    { label: '社交', value: '（待补充）' },
  ],
  copyright: '© 2026 房子翔 · 一个会生长的 portfolio',
}
