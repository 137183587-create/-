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
    { label: '插画', href: 'medical-visualization#comics' },
    { label: '动画', href: 'medical-visualization#motion' },
    { label: '工具', href: '#ai-tools' },
    { label: '优势', href: '#advantages' },
    { label: '联系', href: '#contact' },
  ],
}

export const hero = {
  eyebrow: 'PORTFOLIO · 2026',
  title: ['房子翔', '插画师 & AI 视觉创作者'],
  subtitle: '用兴趣驱动创作，让作品集也会生长。',
  cta: '联系我',
  ctaSecondary: '查看作品',
  footer: {
    note: '目前正在深耕 AI 视觉与 AI 动画方向，',
    noteAccent: '持续生长中。',
    reelLabel: '作品 reel',
    reelDuration: '0:00',
  },
}

export const about = {
  monogram: '房',
  avatar: '/avatar.webp',
  intro: [
    '一名插画师，也是一个会用 AI 造工具的创作者，',
    '从艺术设计专科自学板绘商业插画入行，在医学可视化公司做过插画与 AI 动画',
    '但比起接单，我更想自由地用 AI 把脑子里的画面一个个做出来，',
    '我不喜欢同质化的套路，也不爱半吊子的流程，对自己感兴趣的领域会一直钻下去，用 AI 把脑子里的想法一个个落地，',
    '这个作品集也是其中之一：它会随我一起生长，变形，',
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
    title: '医学可视化插画 & AI 动画',
    tag: '商业项目',
    year: '2024',
    status: '保密',
    card: 'blue',
    link: '/medical-visualization',
    media: '/ai-motion/沙画开头.mp4',
    desc: '在企业项目中负责医学类插画与 AI 动画设计（部分内容受保密限制，仅展示脱敏片段）。',
  },
]

// 视频统一放在 public/ai-motion/，新增动画直接加一条并填 media 即可
export const aiMotion = [
  {
    title: '麻醉科 & 肝胆外科',
    // 关联项目介绍面板（见 aiProjects）
    project: 'lao-tou-chuang-guan',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'gold',
    desc: '用 AI 把麻醉科与肝胆外科的手术流程做成可视化动画，让复杂的术中配合一目了然。',
    media: '/ai-motion/麻醉科和肝胆外科.mp4',
  },
  {
    title: '阿尔茨海默照护',
    // 关联项目介绍面板（见 aiProjects）
    project: 'alzheimer-care',
    tag: 'AI 动画 · 医学可视化',
    year: '2026',
    status: '可演示',
    card: 'warm',
    desc: '把阿尔茨海默的照护日常做成一段温柔的开篇——记忆会模糊，守护不会。',
    media: '/ai-motion/阿尔茨海默照护.mp4',
  },
  {
    title: '贵州眼科 · 眼外伤护理',
    // 关联项目介绍面板（见 aiProjects）
    project: 'eye-trauma-care',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'jade',
    desc: '眼外伤护理流程的动画演示（含真人数字人讲解），把急性期处理与康复要点讲清楚。',
    media: '/ai-motion/贵州眼科护理眼外伤.mp4',
  },
  {
    title: '产后抑郁科普',
    // 关联项目介绍面板（见 aiProjects）
    project: 'postpartum-depression',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'warm',
    desc: '用动画拆解产后抑郁的情绪表现与干预路径，让照护者更早识别、也更容易理解。',
    media: '/ai-motion/产后抑郁.mp4',
  },
  {
    title: 'PICC 置管护理',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'blue',
    desc: 'PICC 导管维护要点动态演示，把护理步骤讲清楚、看得懂。',
    media: '/ai-motion/PICC.mp4',
  },
  {
    title: '妊娠期高血压',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'gold',
    desc: '妊娠期高血压的风险与监测动态讲解，面向孕产妇的科普动画。',
    media: '/ai-motion/妊娠期高血压.mp4',
  },
  {
    title: '放射科检查痛点',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'blue',
    desc: '把放射科就诊中的常见卡点做成动画，提示检查前准备。',
    media: '/ai-motion/放射科检查遇到的痛点.mp4',
  },
  {
    title: '新生儿黄疸 30 秒',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'warm',
    desc: '30 秒讲清新儿黄疸的关键信号，短平快的科普短片。',
    media: '/ai-motion/新生儿黄疸30秒.mp4',
  },
  {
    title: '沙画片头',
    tag: 'AI 动画 · 片头',
    year: '2024',
    status: '可演示',
    card: 'jade',
    desc: '沙画质感的片头动画，给系列科普一个温柔的开场。',
    media: '/ai-motion/沙画开头.mp4',
  },
  {
    title: '海姆立克急救法',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'gold',
    desc: '海姆立克急救手法分步演示，关键时刻能救命的动态教学。',
    media: '/ai-motion/海姆立克.mp4',
  },
  {
    title: 'AI 说医解药 · 推荐选题「太行黄芪」',
    // 关联项目介绍面板（见 aiProjects）
    project: 'huangqi',
    tag: 'AI 动画 · 医学可视化',
    year: '2025',
    status: '可演示',
    card: 'warm',
    desc: '以"说医解药"系列推荐太行黄芪道地药材，用 AI 动画讲清道地药材的种植与功效。',
    media: '/ai-motion/AI说医解药，推荐选题太行黄芪.mp4',
  },
  {
    title: '男性 HPV 科普',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'warm',
    desc: '面向男性的 HPV 认知动画，打破盲区、讲清预防。',
    media: '/ai-motion/男性HPV.mp4',
  },
  {
    title: '糖尿病 AI 动画',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'jade',
    desc: '糖尿病管理要点的 AI 动画演示，把日常控糖讲明白。',
    media: '/ai-motion/糖尿病ai.mp4',
  },
  {
    title: '肺结节科普',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'gold',
    desc: '肺结节的发现与随访动态讲解，缓解焦虑、讲清逻辑。',
    media: '/ai-motion/肺结节.mp4',
  },
  {
    title: '腕管综合征',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'blue',
    desc: '腕管综合征的成因与缓解动作演示，久坐人群的科普。',
    media: '/ai-motion/腕管综合征.mp4',
  },
  {
    title: '骨质疏松',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'warm',
    desc: '骨质疏松的风险与补钙逻辑动画科普。',
    media: '/ai-motion/骨质疏松.mp4',
  },
  {
    title: 'AI 陇原针灸大家 · 皇甫谧',
    // 关联项目介绍面板（见 aiProjects）
    project: 'huangfumi',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'jade',
    desc: '3 分钟讲述皇甫谧与《针灸甲乙经》的 AI 动画，把针灸典籍的来龙去脉讲成故事。',
    media: '/ai-motion/huangfumi-acupuncture.mp4',
  },
  {
    title: '甲减科普',
    tag: 'AI 动画 · 医学可视化',
    year: '2024',
    status: '可演示',
    card: 'blue',
    desc: '甲状腺功能减退的成因与表现动画科普。',
    media: '/ai-motion/甲减.mp4',
  },
  {
    title: 'AI 老年人多重用药科普',
    tag: 'AI 动画 · 医学可视化',
    year: '2025',
    status: '可演示',
    card: 'amber',
    desc: '针对老年人常见的多重用药问题，用 AI 动画讲清药物相互作用与安全用药要点。',
    media: '/ai-motion/AI老年人多重用药3min（开头）.mp4',
  },
  {
    title: '冰箱里的冷藏刺客',
    // 关联项目介绍面板（见 aiProjects）
    project: 'fridge-assassin',
    tag: 'AI 动画 · 食品安全科普',
    year: '2025',
    status: '可演示',
    card: 'blue',
    desc: '把冰箱里的食品安全风险拟人成几个细菌「刺客」，用祖孙日常讲清冷藏食品安全的重点。',
    media: '/ai-motion/冰箱里的冷藏刺客.mp4',
  },
]

/* ======================================================================
   AI 动画项目详情：点开卡片后的「项目介绍面板」
   ----------------------------------------------------------------------
   一个 AI 动画项目的完整生产流程（我作为 agent 参与其中）：
     脚本 → 分镜描述 → LibTV 画布 → 角色/场景/道具设定 → 分镜节点
     → 人工校验 → 生成开篇视频 → 提取角色音色 → 循环 → 剪映剪辑 → BGM
   设定图放public/project-settings/（WebP，q82）。
   要给新项目加面板：在此追加一条，并确保对应 aiMotion 条目带 project: '<项目 id>'。
   ====================================================================== */
export const aiProjects = [
  {
    id: 'lao-tou-chuang-guan',
    name: '倔老头闯关记',
    subtitle: '胆囊结石手术麻醉大揭秘',
    summary:
      '以"倔老头"与医生的对手戏，把胆囊结石手术的麻醉过程讲成一场生死关卡。' +
      '角色先定妆送审，再逐镜生成分镜节点，角色音色在开篇视频产出后提取固定下来。',
    /* 生产流程步骤：title 是环节，desc 是这一步实际做什么，tag 标注是我(agent)还是本人操作 */
    pipeline: [
      {
        title: '脚本拆解',
        tag: 'agent + 本人',
        desc: '拿到编辑给的 Word 脚本后通读一遍，同时让 agent 逐段生成分镜描述；本人同步过一遍原文确认无误。',
      },
      {
        title: '建LibTV 画布',
        tag: 'agent',
        desc: '分析完成后，由 agent 在 LibTV 创建对应的项目画布。',
      },
      {
        title: '设定搭建',
        tag: 'agent',
        desc: '在画布中建立角色设定、场景设定、道具设定三类节点。',
      },
      {
        title: '角色送审',
        tag: '本人',
        desc: '角色定妆图送审，通过后才继续往下推进——角色不通过，后面全白做。',
      },
      {
        title: '分镜节点',
        tag: 'agent',
        desc: '创建分镜图片节点（部分镜头直接建视频节点）。',
      },
      {
        title: '逐镜校验',
        tag: '本人',
        desc: '检查每个节点的画面提示词与参考图连线是否准确、是否符合要求。',
      },
      {
        title: '开篇视频',
        tag: 'agent',
        desc: '先生成开篇部分约 30 秒的视频，作为整片的风格基准。',
      },
      {
        title: '音色锁定',
        tag: '本人',
        desc: '从开篇视频中提取每个角色的配音，作为后续该角色的音色音域参考。',
      },
      {
        title: '循环推进',
        tag: '双方',
        desc: '以上流程循环往复，直到全片分镜完成。',
      },
      {
        title: '剪映剪辑',
        tag: '本人',
        desc: '生成的视频素材汇总到剪映里做最终剪辑。',
      },
      {
        title: '背景音乐',
        tag: 'agent + 本人',
        desc: '用 SonoAI 生成 BGM；提示词由 agent 依据脚本风格与节奏产出，复制丢给 Sono。',
      },
    ],
    /* 三类设定图：role 角色 / prop 道具 / scene 场景 */
    settings: [
      {
        group: 'role',
        label: '角色设定',
        note: '角色先定妆送审，通过后再进入分镜',
        items: [
          { name: '倔老头', img: '/project-settings/char-lao-tou.webp' },
          { name: '医生', img: '/project-settings/char-yi-sheng.webp' },
        ],
      },
      {
        group: 'prop',
        label: '道具设定',
        note: '关键道具需出结构分解图，锁定形制与材质',
        items: [{ name: '破碎伤脑谣言锤', img: '/project-settings/prop-chui.webp' }],
      },
      {
        group: 'scene',
        label: '场景设定',
        note: '同一场景给出多角度参考，保证跨镜头一致',
        items: [
          { name: '卧室', img: '/project-settings/scene-wo-shi.webp' },
          { name: '科幻数据空间', img: '/project-settings/scene-ke-huan.webp' },
        ],
      },
    ],
  },
  {
    id: 'alzheimer-care',
    name: '阿尔茨海默照护',
    subtitle: '山村里的记忆守护 · 开篇 2.5min',
    summary:
      '一部 2.5 分钟的阿尔茨海默照护科普开篇。山村的黄昏、照护奶奶的女儿、一位护士，' +
      '还有一只橘猫与一团拟人化的「火苗小怪」——把记忆一点点模糊的过程，讲成一段被温柔守护的日常。' +
      '本片只做了人物设定，未单独建场景设定。',
    /* 面板头部的装饰背景图（仅作氛围，不承载信息） */
    heroImage: '/project-settings/alz-hero.webp',
    /* 生产流程步骤：title 是环节，desc 是这一步实际做什么，tag 标注是我(agent)还是本人操作 */
    pipeline: [
      {
        title: '脚本拆解',
        tag: 'agent + 本人',
        desc: '拿到编辑给的 Word 脚本后通读一遍，同时让 agent 逐段生成分镜描述；本人同步过一遍原文确认无误。',
      },
      {
        title: '建 LibTV 画布',
        tag: 'agent',
        desc: '分析完成后，由 agent 在 LibTV 创建对应的项目画布。',
      },
      {
        title: '人物设定',
        tag: 'agent',
        desc: '本片只建人物设定节点，用三视图锁定每个角色的形象（奶奶 / 女儿 / 护士 / 火苗小怪 / 橘猫）。',
      },
      {
        title: '角色送审',
        tag: '本人',
        desc: '角色定妆图送审，通过后才继续往下推进——角色不通过，后面全白做。',
      },
      {
        title: '分镜节点',
        tag: 'agent',
        desc: '创建分镜图片节点（部分镜头直接建视频节点），并以山村黄昏作为统一的场景基调。',
      },
      {
        title: '逐镜校验',
        tag: '本人',
        desc: '检查每个节点的画面提示词与参考图连线是否准确、是否符合要求。',
      },
      {
        title: '开篇视频',
        tag: 'agent',
        desc: '先生成开篇部分约 2.5 分钟的视频，作为整片的风格基准。',
      },
      {
        title: '音色锁定',
        tag: '本人',
        desc: '从开篇视频中提取每个角色的配音，作为后续该角色的音色音域参考。',
      },
      {
        title: '循环推进',
        tag: '双方',
        desc: '以上流程循环往复，直到全片分镜完成。',
      },
      {
        title: '剪映剪辑',
        tag: '本人',
        desc: '生成的视频素材汇总到剪映里做最终剪辑。',
      },
      {
        title: '背景音乐',
        tag: 'agent + 本人',
        desc: '用 SonoAI 生成 BGM；提示词由 agent 依据脚本风格与节奏产出，复制丢给 Sono。',
      },
    ],
    /* 设定图：本片只有人物设定 + 一版过程稿 */
    settings: [
      {
        group: 'role',
        label: '人物设定',
        note: '三视图先锁形，再进分镜',
        items: [
          { name: '奶奶', img: '/project-settings/alz-char-nainai.webp' },
          { name: '女儿', img: '/project-settings/alz-char-nver.webp' },
          { name: '护士', img: '/project-settings/alz-char-hushi.webp' },
          { name: '火苗小怪', img: '/project-settings/alz-char-huomiao.webp' },
          { name: '橘猫', img: '/project-settings/alz-char-jumao.webp' },
        ],
      },
      {
        group: 'process',
        label: '过程稿',
        note: '非最终人设 · 过程中的一版探索',
        items: [{ name: '过程探索稿', img: '/project-settings/alz-process.webp' }],
      },
    ],
  },
  {
    id: 'postpartum-depression',
    name: '产后抑郁科普',
    subtitle: '看见产后情绪的低谷',
    summary:
      '把产后抑郁的情绪表现与干预路径，讲成李靖与殷夫人一家的故事。' +
      '面部三视图锁定表情与角度基准，全身立绘锁定形体与服装，角色定妆送审后再进入分镜。',
    /* 生产流程步骤：title 是环节，desc 是这一步实际做什么，tag 标注是我(agent)还是本人操作 */
    pipeline: [
      {
        title: '脚本拆解',
        tag: 'agent + 本人',
        desc: '拿到编辑给的 Word 脚本后通读一遍，同时让 agent 逐段生成分镜描述；本人同步过一遍原文确认无误。',
      },
      {
        title: '建 LibTV 画布',
        tag: 'agent',
        desc: '分析完成后，由 agent 在 LibTV 创建对应的项目画布。',
      },
      {
        title: '人物设定',
        tag: 'agent',
        desc: '在画布中建立人物设定节点，分「面部三视图」与「全身立绘」两类：前者锁表情与角度，后者锁形体与服装。',
      },
      {
        title: '角色送审',
        tag: '本人',
        desc: '角色定妆图送审，通过后才继续往下推进——角色不通过，后面全白做。',
      },
      {
        title: '分镜节点',
        tag: 'agent',
        desc: '创建分镜图片节点（部分镜头直接建视频节点）。',
      },
      {
        title: '逐镜校验',
        tag: '本人',
        desc: '检查每个节点的画面提示词与参考图连线是否准确、是否符合要求。',
      },
      {
        title: '开篇视频',
        tag: 'agent',
        desc: '先生成开篇部分约 2.5 分钟的视频，作为整片的风格基准。',
      },
      {
        title: '音色锁定',
        tag: '本人',
        desc: '从开篇视频中提取每个角色的配音，作为后续该角色的音色音域参考。',
      },
      {
        title: '循环推进',
        tag: '双方',
        desc: '以上流程循环往复，直到全片分镜完成。',
      },
      {
        title: '剪映剪辑',
        tag: '本人',
        desc: '生成的视频素材汇总到剪映里做最终剪辑。',
      },
      {
        title: '背景音乐',
        tag: 'agent + 本人',
        desc: '用 SonoAI 生成 BGM；提示词由 agent 依据脚本风格与节奏产出，复制丢给 Sono。',
      },
    ],
    /* 设定图：本片按「面部三视图 / 全身立绘」两类呈现（全身立绘为竖版，按真实比例显示） */
    settings: [
      {
        group: 'role-face',
        label: '面部三视图',
        note: '定表情与多角度基准',
        items: [
          { name: '李靖', img: '/project-settings/ppd-face-lijing.webp' },
          { name: '殷夫人', img: '/project-settings/ppd-face-yinfuren.webp' },
        ],
      },
      {
        group: 'role-body',
        label: '全身立绘',
        note: '定形体与服装基准',
        items: [
          { name: '李靖', img: '/project-settings/ppd-body-lijing.webp', aspect: '9 / 16' },
          { name: '殷夫人', img: '/project-settings/ppd-body-yinfuren.webp', aspect: '9 / 16' },
        ],
      },
    ],
  },
  {
    id: 'eye-trauma-care',
    name: '贵州眼科 · 眼外伤护理',
    subtitle: '眼外伤护理流程 · 含真人数字人讲解',
    summary:
      '一段眼外伤护理科普动画，含真人数字人讲解，把急性期处理与康复要点讲清楚。' +
      '先建立「护士」与吉祥物两个角色设定，再给出科幻「控制中心」场景的多角度参考；' +
      '角色与场景定妆送审后，才逐镜推进分镜。',
    /* 面板头部的装饰背景图（仅作氛围，不承载信息） */
    heroImage: '/project-settings/eye-hero.webp',
    /* 生产流程步骤：title 是环节，desc 是这一步实际做什么，tag 标注是我(agent)还是本人操作 */
    pipeline: [
      {
        title: '脚本拆解',
        tag: 'agent + 本人',
        desc: '拿到编辑给的 Word 脚本后通读一遍，同时让 agent 逐段生成分镜描述；本人同步过一遍原文确认无误。',
      },
      {
        title: '建 LibTV 画布',
        tag: 'agent',
        desc: '分析完成后，由 agent 在 LibTV 创建对应的项目画布。',
      },
      {
        title: '设定搭建',
        tag: 'agent',
        desc: '在画布中建立人物设定与场景设定两类节点：前者锁角色形象，后者锁「控制中心」的空间与机位。',
      },
      {
        title: '定妆送审',
        tag: '本人',
        desc: '角色与场景定妆图送审，通过后才继续往下推进——设定不通过，后面全白做。',
      },
      {
        title: '分镜节点',
        tag: 'agent',
        desc: '创建分镜图片节点（部分镜头直接建视频节点）。',
      },
      {
        title: '逐镜校验',
        tag: '本人',
        desc: '检查每个节点的画面提示词与参考图连线是否准确、是否符合要求。',
      },
      {
        title: '开篇视频',
        tag: 'agent',
        desc: '先生成开篇视频，作为整片的风格基准。',
      },
      {
        title: '音色锁定',
        tag: '本人',
        desc: '从开篇视频中提取每个角色的配音，作为后续该角色的音色音域参考。',
      },
      {
        title: '循环推进',
        tag: '双方',
        desc: '以上流程循环往复，直到全片分镜完成。',
      },
      {
        title: '剪映剪辑',
        tag: '本人',
        desc: '生成的视频素材汇总到剪映里做最终剪辑（含 1 分钟真人数字人讲解段）。',
      },
      {
        title: '背景音乐',
        tag: 'agent + 本人',
        desc: '用 SonoAI 生成 BGM；提示词由 agent 依据脚本风格与节奏产出，复制丢给 Sono。',
      },
    ],
    /* 设定图：人物设定（护士 / 吉祥物）+ 场景设定（控制中心） */
    settings: [
      {
        group: 'role',
        label: '人物设定',
        note: '每个角色一版设定，含全身三视图与面部表情',
        items: [
          { name: '护士', img: '/project-settings/eye-nurse.webp' },
          { name: '吉祥物', img: '/project-settings/eye-mascot.webp' },
        ],
      },
      {
        group: 'scene',
        label: '场景设定',
        note: '同一场景给出多角度参考，保证跨镜头一致',
        items: [{ name: '控制中心', img: '/project-settings/eye-scene.webp' }],
      },
    ],
  },
  {
    id: 'huangqi',
    name: 'AI 说医解药 · 太行黄芪',
    subtitle: '道地药材科普 · 天宫与展馆双场景',
    summary:
      '「AI 说医解药」系列的推荐选题之一：一名背着红色书包的小学生，跟着白须仙翁一路游历，' +
      '把道地药材「太行黄芪」的形态、种植与功效讲成一段故事。' +
      '天宫的仙宴与药材展馆两类场景对切，配合黄芪标本、仙丹炉、药材切段与木质拐杖等道具设定。',
    /* 面板头部的装饰背景图（仅作氛围，不承载信息） */
    heroImage: '/project-settings/huangqi-hero.webp',
    /* 生产流程步骤：title 是环节，desc 是这一步实际做什么，tag 标注是我(agent)还是本人操作 */
    pipeline: [
      {
        title: '脚本拆解',
        tag: 'agent + 本人',
        desc: '拿到编辑给的 Word 脚本后通读一遍，同时让 agent 逐段生成分镜描述；本人同步过一遍原文确认无误。',
      },
      {
        title: '建 LibTV 画布',
        tag: 'agent',
        desc: '分析完成后，由 agent 在 LibTV 创建对应的项目画布。',
      },
      {
        title: '设定搭建',
        tag: 'agent',
        desc: '在画布中建立人物、道具、场景三类设定节点：人物锁角色形象，道具出结构分解，场景锁空间与机位。',
      },
      {
        title: '定妆送审',
        tag: '本人',
        desc: '人物与关键道具定妆图送审，通过后才继续往下推进——设定不通过，后面全白做。',
      },
      {
        title: '分镜节点',
        tag: 'agent',
        desc: '创建分镜图片节点（部分镜头直接建视频节点）。',
      },
      {
        title: '逐镜校验',
        tag: '本人',
        desc: '检查每个节点的画面提示词与参考图连线是否准确、是否符合要求。',
      },
      {
        title: '开篇视频',
        tag: 'agent',
        desc: '先生成开篇视频，作为整片的风格基准。',
      },
      {
        title: '音色锁定',
        tag: '本人',
        desc: '从开篇视频中提取每个角色的配音，作为后续该角色的音色音域参考。',
      },
      {
        title: '循环推进',
        tag: '双方',
        desc: '以上流程循环往复，直到全片分镜完成。',
      },
      {
        title: '剪映剪辑',
        tag: '本人',
        desc: '生成的视频素材汇总到剪映里做最终剪辑。',
      },
      {
        title: '背景音乐',
        tag: 'agent + 本人',
        desc: '用 SonoAI 生成 BGM；提示词由 agent 依据脚本风格与节奏产出，复制丢给 Sono。',
      },
    ],
    /* 设定图：人物设定（小学生 / 白须仙翁）+ 道具设定 + 场景设定（黄芪展馆） */
    settings: [
      {
        group: 'role',
        label: '人物设定',
        note: '每个角色一版设定，含全身三视图与面部表情',
        items: [
          { name: '小学生', img: '/project-settings/huangqi-boy.webp' },
          { name: '白须仙翁', img: '/project-settings/huangqi-sage.webp' },
        ],
      },
      {
        group: 'prop',
        label: '道具设定',
        note: '关键道具需出结构分解图，锁定形制与材质',
        items: [
          { name: '黄芪标本', img: '/project-settings/huangqi-specimen.webp' },
          { name: '仙丹炉', img: '/project-settings/huangqi-furnace.webp' },
          { name: '真黄芪', img: '/project-settings/huangqi-wood.webp' },
          { name: '拐杖', img: '/project-settings/huangqi-cane.webp' },
        ],
      },
      {
        group: 'scene',
        label: '场景设定',
        note: '同一场景给出多角度参考，保证跨镜头一致',
        items: [{ name: '黄芪展馆', img: '/project-settings/huangqi-scene.webp' }],
      },
    ],
  },
  {
    id: 'fridge-assassin',
    name: '冰箱里的冷藏刺客',
    subtitle: '食品安全科普 · 细菌拟人 × 祖孙日常',
    summary:
      '一部把冰箱里的食品安全风险拟人化的科普动画：几个细菌「刺客」潜伏在冷藏的瓶罐之间，' +
      '奶奶与孙女在一段生活日常里逐步识别风险。特色菜拟人前后做了两版——第一版送审未采用，' +
      '第二版（腌菜 / 姜母鸭 / 土笋冻）通过；片尾两位主角还换上贵州特色服饰。',
    /* 面板头部的装饰背景图（仅作氛围，不承载信息） */
    heroImage: '/project-settings/fridge-hero.webp',
    /* 生产流程步骤：title 是环节，desc 是这一步实际做什么，tag 标注是我(agent)还是本人操作 */
    pipeline: [
      {
        title: '脚本拆解',
        tag: 'agent + 本人',
        desc: '拿到编辑给的 Word 脚本后通读一遍，同时让 agent 逐段生成分镜描述；本人同步过一遍原文确认无误。',
      },
      {
        title: '建 LibTV 画布',
        tag: 'agent',
        desc: '分析完成后，由 agent 在 LibTV 创建对应的项目画布。',
      },
      {
        title: '设定搭建',
        tag: 'agent',
        desc: '在画布中建立人物、道具、细菌三类设定节点；本片特色菜拟人先后出了两版，第一版送审未采用后整体重做第二版。',
      },
      {
        title: '定妆送审',
        tag: '本人',
        desc: '角色与细菌拟人定妆图送审；特色菜拟人第一版未通过，按反馈重做第二版并通过后才继续。',
      },
      {
        title: '分镜节点',
        tag: 'agent',
        desc: '创建分镜图片节点（部分镜头直接建视频节点）。',
      },
      {
        title: '逐镜校验',
        tag: '本人',
        desc: '检查每个节点的画面提示词与参考图连线是否准确、是否符合要求。',
      },
      {
        title: '开篇视频',
        tag: 'agent',
        desc: '先生成开篇视频，作为整片的风格基准。',
      },
      {
        title: '音色锁定',
        tag: '本人',
        desc: '从开篇视频中提取每个角色的配音，作为后续该角色的音色音域参考。',
      },
      {
        title: '循环推进',
        tag: '双方',
        desc: '以上流程循环往复，直到全片分镜完成。',
      },
      {
        title: '剪映剪辑',
        tag: '本人',
        desc: '生成的视频素材汇总到剪映里做最终剪辑，并补上片尾两位主角的贵州特色换装。',
      },
      {
        title: '背景音乐',
        tag: 'agent + 本人',
        desc: '用 SonoAI 生成 BGM；提示词由 agent 依据脚本风格与节奏产出，复制丢给 Sono。',
      },
    ],
    /* 设定图：特色菜拟人两版 + 细菌拟人 + 主角人设与换装 */
    settings: [
      {
        group: 'v1',
        label: '特色菜拟人 · 第一版',
        note: '送审后未采用，作为迭代对照保留',
        items: [
          { name: '卤味', img: '/project-settings/fridge-v1-luwei.webp' },
          { name: '土笋冻', img: '/project-settings/fridge-v1-tusundong.webp' },
          { name: '姜母鸭', img: '/project-settings/fridge-v1-jiangmuya.webp' },
        ],
      },
      {
        group: 'v2',
        label: '特色菜拟人 · 第二版（通过）',
        note: '在可爱度与实物辨识度之间重新平衡后定稿',
        items: [
          { name: '腌菜', img: '/project-settings/fridge-v2-yancai.webp' },
          { name: '姜母鸭', img: '/project-settings/fridge-v2-jiangmuya.webp' },
          { name: '土笋冻', img: '/project-settings/fridge-v2-tusundong.webp' },
        ],
      },
      {
        group: 'bacteria',
        label: '细菌拟人',
        note: '脚本提到的四种食源性致病菌拟人化同框',
        items: [
          {
            name: '细菌合照（李斯特菌 / 耶尔森菌 / 沙门氏菌 / 志贺菌）',
            img: '/project-settings/fridge-bacteria.webp',
          },
        ],
      },
      {
        group: 'cast',
        label: '主角人设 & 换装',
        note: '正片形象 + 片尾贵州特色变装',
        items: [
          { name: '奶奶', img: '/project-settings/fridge-grandma.webp' },
          { name: '奶奶 · 变装', img: '/project-settings/fridge-grandma-dressed.webp' },
          { name: '孙女', img: '/project-settings/fridge-granddaughter.webp' },
          { name: '孙女 · 变装', img: '/project-settings/fridge-granddaughter-dressed.webp' },
        ],
      },
    ],
  },
  {
    id: 'huangfumi',
    name: 'AI 陇原针灸大家 · 皇甫谧',
    subtitle: '中医典籍科普 · 人物传记叙事',
    summary:
      '一部讲述魏晋针灸大家皇甫谧与《针灸甲乙经》的 AI 动画：从幼年苦读、青年立志，到中年行医、' +
      '晚年著书，跨越幼年 / 青年 / 中年 / 老年四个人生阶段，把这部针灸典籍的成书过程讲成一段传记故事。' +
      '书房、卧室、医馆与大漠戈壁四组场景铺开叙事空间；配角病人与大夫撑起就诊、施治的对手戏，' +
      '核心道具《针灸甲乙经》贯穿全片。',
    /* 面板头部的装饰背景图（仅作氛围，不承载信息） */
    heroImage: '/project-settings/huangfumi-hero.webp',
    /* 生产流程步骤：title 是环节，desc 是这一步实际做什么，tag 标注是我(agent)还是本人操作 */
    pipeline: [
      {
        title: '脚本拆解',
        tag: 'agent + 本人',
        desc: '拿到编辑给的 Word 脚本后通读一遍，同时让 agent 逐段生成分镜描述；本人同步过一遍原文确认无误。',
      },
      {
        title: '建 LibTV 画布',
        tag: 'agent',
        desc: '分析完成后，由 agent 在 LibTV 创建对应的项目画布。',
      },
      {
        title: '设定搭建',
        tag: 'agent',
        desc: '在画布中建立人物、道具、场景三类设定节点；主角皇甫谧按幼年、青年、中年、老年四个年龄段分别出形象，锁各时期的发型、须发与神态。',
      },
      {
        title: '定妆送审',
        tag: '本人',
        desc: '四个年龄段的皇甫谧、病人与大夫、以及核心道具《针灸甲乙经》定妆图送审，通过后才继续推进。',
      },
      {
        title: '分镜节点',
        tag: 'agent',
        desc: '创建分镜图片节点（部分镜头直接建视频节点）。',
      },
      {
        title: '逐镜校验',
        tag: '本人',
        desc: '检查每个节点的画面提示词与参考图连线是否准确、是否符合要求。',
      },
      {
        title: '开篇视频',
        tag: 'agent',
        desc: '先生成开篇视频，作为整片的风格基准。',
      },
      {
        title: '音色锁定',
        tag: '本人',
        desc: '从开篇视频中提取每个角色的配音，作为后续该角色的音色音域参考。',
      },
      {
        title: '循环推进',
        tag: '双方',
        desc: '以上流程循环往复，直到全片分镜完成。',
      },
      {
        title: '剪映剪辑',
        tag: '本人',
        desc: '生成的视频素材汇总到剪映里做最终剪辑，梳理传记叙事的时间线。',
      },
      {
        title: '背景音乐',
        tag: 'agent + 本人',
        desc: '用 SonoAI 生成 BGM；提示词由 agent 依据脚本风格与节奏产出，复制丢给 Sono。',
      },
    ],
    /* 设定图：主角人生四阶段 + 配角人设 + 道具设定 + 场景设定 */
    settings: [
      {
        group: 'hfmi-period',
        label: '主角形象 · 人生四阶段',
        note: '同一角色的四个年龄段定妆，锁定各时期的发型、须发与神态',
        items: [
          { name: '幼年皇甫谧', img: '/project-settings/huangfumi-child.webp' },
          { name: '青年皇甫谧', img: '/project-settings/huangfumi-youth.webp' },
          { name: '中年皇甫谧', img: '/project-settings/huangfumi-mid.webp' },
          { name: '老年皇甫谧', img: '/project-settings/huangfumi-elder.webp' },
        ],
      },
      {
        group: 'hfmi-cast',
        label: '配角人设',
        note: '就诊与施治的对手角色，一版全身三视图 + 面部',
        items: [
          { name: '病人', img: '/project-settings/huangfumi-patient.webp' },
          { name: '大夫', img: '/project-settings/huangfumi-doctor.webp' },
        ],
      },
      {
        group: 'hfmi-prop',
        label: '道具设定',
        note: '核心道具出封面与多角度结构，锁定形制与纸张质感',
        items: [
          { name: '《针灸甲乙经》', img: '/project-settings/huangfumi-book.webp' },
        ],
      },
      {
        group: 'hfmi-scene',
        label: '场景设定',
        note: '四组空间各给多机位参考，保证跨镜头一致',
        items: [
          { name: '书房', img: '/project-settings/huangfumi-study.webp' },
          { name: '卧室', img: '/project-settings/huangfumi-bedroom.webp' },
          { name: '医馆', img: '/project-settings/huangfumi-clinic.webp' },
          { name: '大漠戈壁', img: '/project-settings/huangfumi-gobi.webp' },
        ],
      },
    ],
  },
]

// 公众号医学科普条漫：图片放在 public/images/comics/（长图）与 covers/（封面）
export const comics = [
  {
    id: 'pci-rehab',
    title: '心血管中医护理 · PCI 术后康复',
    tag: '公众号条漫',
    category: '心血管 / 中医护理',
    year: '2024',
    status: '未署名',
    desc: '把 PCI 术后康复的护理要点画成条漫，帮助患者和家属理解术后恢复关键节点。',
    cover: '/images/comics/covers/ZC心血管中医护理类方向选题PCI术后康复(未署名)封面16比9.webp',
    images: ['/images/comics/ZC心血管中医护理类方向选题PCI术后康复无文献.jpg'],
  },
  {
    id: 'diabetes-obesity',
    title: '知糖控重 · 2 型糖尿病合并肥胖',
    tag: '公众号条漫',
    category: '内分泌 / 减重',
    year: '2024',
    status: '未署名',
    desc: '用轻松的可视化语言讲清 2 型糖尿病与肥胖的关系，以及日常控糖减重的核心逻辑。',
    cover: '/images/comics/covers/ZC知糖控重2型糖尿病合并肥胖封面16比9.webp',
    images: ['/images/comics/ZC知糖控重2型糖尿病合并肥胖(未署名).jpg'],
  },
  {
    id: 'knee-joint',
    title: '中医膝关节',
    tag: '公众号条漫',
    category: '中医 / 骨科',
    year: '2024',
    status: '未署名',
    desc: '围绕膝关节养护的中医思路做科普插画，图文结合讲解常见误区与保养方法。',
    cover: '/images/comics/thumbs/knee-joint.webp',
    images: ['/images/comics/中医膝关节（未署名）.jpg'],
  },
  {
    id: 'hip-fracture',
    title: '创伤骨科 · 老年髋关节骨折',
    tag: '公众号条漫',
    category: '创伤骨科 / 老年医学',
    year: '2024',
    status: '未署名',
    desc: '老年髋关节骨折的预防、识别与康复要点，用条漫降低医学信息门槛。',
    cover: '/images/comics/covers/创伤骨科老年髋关节骨折（未署名）封面16比9.webp',
    images: ['/images/comics/创伤骨科老年髋关节骨折（未署名）.jpg'],
  },
  {
    id: 'diabetic-retinopathy',
    title: '别让糖尿病偷走视力 · 警惕糖尿病视网膜',
    tag: '公众号条漫',
    category: '内分泌 / 眼科',
    year: '2024',
    status: '未署名',
    desc: '从糖尿病到视网膜病变的风险链条，用画面提醒患者定期检查、早防早治。',
    cover: '/images/comics/covers/别让糖尿病偷走视力，警惕糖尿病视网膜(未署名)16比9封面.webp',
    images: ['/images/comics/别让糖尿病偷走视力，警惕糖尿病视网膜(未署名).jpg'],
  },
  {
    id: 'salt-bone',
    title: '吃盐太多也会影响骨骼健康',
    tag: '公众号条漫',
    category: '营养 / 骨科',
    year: '2024',
    status: '未署名',
    desc: '拆解高盐饮食与骨密度流失之间的关联，给出简单好记的减盐护骨建议。',
    cover: '/images/comics/covers/吃盐太多也会影响骨骼健康封面16比9.webp',
    images: ['/images/comics/吃盐太多也会影响骨骼健康(未署名).jpg'],
  },
  {
    id: 'early-gi-cancer',
    title: '消化道早癌最新',
    tag: '公众号条漫',
    category: '消化内科',
    year: '2024',
    status: '未署名',
    desc: '梳理消化道早癌筛查的新进展与关键信号，帮助读者建立早筛意识。',
    cover: '/images/comics/thumbs/early-cancer.webp',
    images: ['/images/comics/消化道早癌最新（未署名）.jpg'],
  },
  {
    id: 'elderly-fall',
    title: '老年人跌倒',
    tag: '公众号条漫',
    category: '老年医学 / 骨科',
    year: '2024',
    status: '未署名',
    desc: '老年人跌倒的高发场景、危险因素与居家防跌倒改造，用画面说清重点。',
    cover: '/images/comics/covers/老年人跌倒封面16比9.webp',
    images: ['/images/comics/老年人跌倒（未署名）.jpg'],
  },
  {
    id: 'kidney-blood',
    title: '肾病血液偷袭',
    tag: '公众号条漫',
    category: '肾内科',
    year: '2024',
    status: '未署名',
    desc: '肾脏疾病早期信号隐匿，条漫用直观对比讲清血液指标与肾脏健康的关系。',
    cover: '/images/comics/covers/肾病血液偷袭16比9.webp',
    images: ['/images/comics/肾病血液偷袭（未压缩）.jpg'],
  },
]

export const aiTools = [
  {
    name: '手作素材库 · 检索插件',
    tag: '网页 · 自研',
    status: '可演示',
    card: 'gold',
    desc: '在素材库里挂载的检索增强 skill：输入"玉色 + 平安扣"即可召回相似参考图，省去翻库。',
    // 填了就显示"打开"按钮：link: 'https://...',
  },
  {
    name: '插画风格固化 Skill',
    tag: 'AI Skill',
    status: '在用',
    card: 'blue',
    desc: '把常用的插画配色与笔触写成可复用的生成 skill，保证每次出图风格稳定统一。',
  },
  {
    name: '一键排版 Skill',
    tag: 'AI Skill',
    status: '在用',
    card: 'warm',
    desc: '把成图自动套进作品集版式并导出，省掉重复的对齐、留白、标注活。',
  },
  {
    name: '医学插画生成 Workflow',
    tag: '流程 · 自研',
    status: '内部',
    card: 'jade',
    desc: '把医学插画拆成结构 → 上色 → 动态三步，串成可跑的工作流，接得住"要准也要好看"。',
  },
]

// 优势卡牌阵（5 张，GradientCarousel 3D环视 + 卡片染色背景）
// 卡图：public/advantages/cards/card-1..5.webp —— 是"透明底完整卡牌"，卡框/拱顶四芒星/底部标签条都已含在图中，
//       所以卡名直接叠在卡内标签条上，不再用 CSS 画框。
// nameBottom：卡名中心距卡底的距离（%）。各卡标签条高度略有差异，逐张微调过。
// tint：背景染色渐变（from/to）。由 sharp 从卡图聚类提取主色后提亮增饱和得出，
//       对应 React Bits「Gradient Carousel」的"从每张卡提取主色染背景"效果。
// image 留空则回落到发光小球占位。
export const advantages = [
  {
    key: 'alchemy',
    symbol: '星药工坊',
    title: '用 AI 造工具',
    desc: '不只会用 AI，还会用 trae 自己写网页 / 小程序，把想法酿成能运行的药剂。',
    image: '/advantages/cards/card-1.webp',
    nameBottom: 7.6,
    tint: ['hsl(291 21% 28%)', 'hsl(240 61% 31%)'],
  },
  {
    key: 'library',
    symbol: '星辉图书馆',
    title: '兴趣驱动学习',
    desc: '踏入陌生领域 → 自己做出东西 → 正反馈循环，学得快也学得深。',
    image: '/advantages/cards/card-2.webp',
    nameBottom: 7.5,
    tint: ['hsl(326 21% 28%)', 'hsl(228 53% 31%)'],
  },
  {
    key: 'ritual',
    symbol: '星轨仪式',
    title: 'AI 动画设计',
    desc: '熟悉医学可视化等方向的 AI 动画流程，能指引概念从静帧走向运动。',
    image: '/advantages/cards/card-3.webp',
    nameBottom: 7,
    tint: ['hsl(300 25% 28%)', 'hsl(248 59% 30%)'],
  },
  {
    key: 'castle',
    symbol: '云端城堡',
    title: '板绘商业插画',
    desc: '从报班自学到商业落地，能接住"要好看也要能用"的需求。',
    image: '/advantages/cards/card-4.webp',
    nameBottom: 7.5,
    tint: ['hsl(231 57% 31%)', 'hsl(224 95% 29%)'],
  },
  {
    key: 'oath',
    symbol: '誓约之剑',
    title: '审美与视觉判断',
    desc: '能判断什么好看、什么能用，给 AI 的产出做最后一道把关。',
    image: '/advantages/cards/card-5.webp',
    nameBottom: 5,
    tint: ['hsl(317 20% 28%)', 'hsl(355 24% 31%)'],
  },
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
