# TODO
## Nuxt
- [ ] 自动定向到对应名称的页面
- [ ] IntersectionObserver
    - [ ] 添加观察对象(`element.classList`)
    - [ ] 元素进入10%触发事件
    - [ ] 仅触发一次事件

## 需要安装的扩展
- [ ] EditorConfig for VS code
- [ ] HTML format
- [ ] Prettier

## TS
- [ ] 声明变量需要见指定类型（避免Never）
- [ ] 声明对象类型时需新见声明接口（`interface`）

## CSS
- [ ] 自适应
- [ ] 样式优先级
- [ ] `scoped`, `module`, 等等
- [ ] `:deep()`
- [ ] Tailwind 快速定义组件（`@Layer xxx { .xxx { @apply ... } }`)

## 其他
- [ ] SEO搜索优化
- [ ] Tracker用户行为监控（mixpanel）
- [ ] i18n基本使用 (`$t, t`)以及变量的使用
- [ ] 搜索框防抖
- [ ] 监听窗口宽度变化 节流
- [ ] 三方API

## 职业目标
- [ ] 测试驱动开发(TDD)、自动化测试
- [ ] 创建/设计系统/组件库
- [ ] Vuex/pinia状态管理
- [ ] Vitest进行组件测试和Cypress进行E2E测试
- [ ] CI/CD管道和Docker容器化
- [ ] 云和部署Vercel AWS

## 架构设计
1. 用户故事 + 流程图
2. 数据建模（设计数据结构）
3. 技术选型（优先选择最适配当前业务的技术栈）
4. 场景设计（优化用户体验，提高性能等）
5. 画架构图（drawio）
6. 接口文档
7. 技术选型表


## 目录结构
```
my-css-components/
├── src/                  # 源码目录
│   ├── components/       # 组件样式（按组件拆分）
│   │   ├── button/       # 按钮组件
│   │   │   ├── _index.scss  # 组件核心样式
│   │   │   └── _variables.scss  # 组件私有变量
│   │   ├── card/         # 卡片组件
│   │   └── ...
│   ├── shared/           # 共享资源
│   │   ├── _variables.scss  # 全局变量（主题色、间距等）
│   │   ├── _mixins.scss     # Sass 混合宏（复用逻辑）
│   │   └── _utilities.scss  # 自定义工具类
│   └── index.scss        # 入口文件（导入所有组件）
├── dist/                 # 打包输出目录（原生 CSS）
│   ├── my-components.css     # 未压缩版
│   └── my-components.min.css # 压缩版
├── postcss.config.js     # PostCSS 配置（处理 Tailwind + 压缩）
├── tailwind.config.js    # Tailwind 配置（主题定制、Purge 规则）
├── package.json          # npm 包配置
└── README.md             # 使用文档
```


## 推荐免费网站列表：
| 网站名称         | 描述                                                                 | 主要特点                                                                 | 链接                                                                 |
|------------------|----------------------------------------------------------------------|--------------------------------------------------------------------------|----------------------------------------------------------------------|
| We Work Remotely | 全球远程职位板，覆盖编程、营销和客服等，100% 远程工作机会。          | 按类别和薪资过滤；适合数字游民。                                         | [weworkremotely.com](https://weworkremotely.com/100-percent-remote-jobs) |
| Indeed           | 综合求职平台，可搜索国际远程或全职职位，支持多语言。                 | 全球职位海量；可设置职位警报。                                           | [indeed.com](https://www.indeed.com/q-international-remote-jobs.html) |
| LinkedIn         | 专业网络平台，搜索国际公司招聘，包含远程选项。                       | 网络连接功能强；免费基本搜索。                                           | [linkedin.com](https://www.linkedin.com/jobs/international-jobs/)     |
| FlexJobs         | 预筛选的远程和国际职位（免费浏览，高级搜索需订阅，但基础免费）。     | 高质量职位，无垃圾广告；全职/兼职。                                     | [flexjobs.com](https://www.flexjobs.com/remote-jobs/international)    |
| Remote OK        | #1 远程职位平台，针对开发者、设计师和销售等。                        | 实时更新，月访问量超80万；支持自由职业。                                 | [remoteok.com](https://remoteok.com/)                                |
| NoDesk           | 顶级远程公司职位，免费浏览，无需注册。                               | 聚焦初创和科技公司；每日更新10,000+职位。                                | [nodesk.co](https://nodesk.co/remote-jobs/)                          |
| Himalayas        | 远程职位板和AI搜索工具，针对全球招聘。                               | 公司品牌展示强；适合初级到高级职位。                                     | [himalayas.app](https://himalayas.app/)                              |
| UN Jobs          | 联合国和国际组织职位，适合非营利和全球角色。                         | 正式国际机会；全职为主。                                                 | [careers.un.org](https://careers.un.org/)                            |
| GoAbroad         | 海外工作和志愿机会，包括国际公司招聘。                               | 结合旅行和工作；适合入门级。                                             | [goabroad.com](https://jobs.goabroad.com/)                           |


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
