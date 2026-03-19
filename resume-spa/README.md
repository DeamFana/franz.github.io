# 简历 SPA

一个基于 Next.js 的个人简历网站，支持在线编辑和静态导出。

## 功能特性

- 📄 **在线编辑** - 支持修改所有简历内容
- 🎨 **多页面展示** - 完整的多页面简历网站
- 🔄 **混合模式** - 开发模式用 API，生产模式可导出纯静态 HTML
- 📦 **静态导出** - 可构建为纯静态 HTML，直接双击打开

## 快速开始

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 页面预览

| 路由 | 说明 |
|------|------|
| `/` | 首页（姓名、职位、简介、技能） |
| `/about` | 关于我（简介、奖项、推荐人） |
| `/experience` | 工作与教育经历 |
| `/projects` | 项目展示、语言能力、兴趣爱好 |
| `/contact` | 联系方式 |
| `/edit` | 编辑模式 |

### 构建部署

点击编辑页的「构建并部署」按钮，或手动运行：

```bash
npm run build:static
```

构建产物位于 `out-static/` 目录。

## 文档

- [静态导出功能](./docs/STATIC_EXPORT.md)
- [项目计划](./docs/SPRINT_PLAN.md)
- [架构设计](./docs/ARCHITECTURE.md)
- [实现差异报告](./docs/IMPLEMENTATION_VS_DOC.md)

## 技术栈

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
