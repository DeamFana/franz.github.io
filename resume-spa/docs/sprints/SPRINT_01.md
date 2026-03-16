# Sprint 1: 项目初始化与环境搭建

**项目**: Resume-SPA  
**Sprint**: 1  
**目标**: 搭建 Next.js 项目骨架，配置 SSG 和 GitHub Pages 部署  
**周期**: 第1天

---

## 2.1 任务清单

| 任务ID | 任务 | 类型 | 预估 | 状态 |
|--------|------|------|------|------|
| S1-01 | 初始化 Next.js 项目 (App Router) | 开发 | 30min | ⏳ |
| S1-02 | 安装必要依赖 (Tailwind CSS 等) | 开发 | 30min | ⏳ |
| S1-03 | 配置 `output: 'export'` 输出静态文件 | 开发 | 20min | ⏳ |
| S1-04 | 配置 GitHub Pages 部署参数 | 基础设施 | 20min | ⏳ |
| S1-05 | 创建项目目录结构 | 开发 | 20min | ⏳ |
| S1-06 | 验证开发服务器正常运行 | 开发 | 20min | ⏳ |
| S1-07 | 验证静态构建输出 | 开发 | 30min | ⏳ |

---

## 2.2 交付物

- [ ] 可运行的 Next.js 项目框架
- [ ] 本地开发服务器正常 (`npm run dev`)
- [ ] 静态构建正常 (`npm run build`)
- [ ] GitHub Pages 部署配置就绪

---

## 2.3 验收标准

- `npm run dev` 可正常启动
- `npm run build` 生成 `out/` 目录
- 访问 `http://localhost:3000` 显示默认页面

---

## 2.4 注意事项

- 使用 Next.js 14+ App Router
- 配置 `trailingSlash: true` 适配 GitHub Pages
- 设置 `basePath` 为仓库名（如 `/resume-spa`）

---

**状态**: ⏳ 待开始  
**最后更新**: 2026-03-16
