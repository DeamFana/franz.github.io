# 简历 SPA - 静态导出功能

**更新时间**: 2026-03-18  
**状态**: ✅ 已完成

---

## ⚠️ 重要说明：Next.js 构建方案已弃用

**自 2026-03-18 起，Next.js 构建方案（`npm run build` 输出到 `out` 目录）已明确弃用。**

请使用静态生成器方案：
```bash
npm run build:static
```

输出目录：`out-static/`

---

## 1. 概述

简历 SPA 支持两种模式：

1. **开发模式**：Next.js 服务器 + API，适合开发和动态更新
2. **静态导出**：纯静态 HTML（推荐），适合离线使用和分发

---

## 2. 混合模式架构

### 2.1 模式对比

| 特性 | 开发模式 | 静态导出 |
|------|----------|----------|
| 运行方式 | Next.js 开发服务器 | 纯静态 HTML |
| 数据来源 | API (`/api/resume`) | 嵌入数据 (`window.__RESUME_DATA__`) |
| 需否服务器 | ✅ 需要 | ❌ 不需要 |
| 离线可用 | ❌ 否 | ✅ 是 |
| 适合场景 | 开发调试、在线编辑 | 分发给他人、离线查看 |

### 2.2 数据获取优先级

```
useResumeData Hook
       │
       ▼
┌──────────────────┐
│ 静态HTML嵌入数据 │ ──有──▶ 使用嵌入数据
│ (window.__RESUME_DATA__)
└────────┬─────────┘
         │无
         ▼
┌──────────────────┐
│ 请求 /api/resume │ ──服务器运行──▶ 使用API数据
└────────┬─────────┘
         │服务器未运行
         ▼
┌──────────────────┐
│ 默认数据         │
│ (defaultResume) │
└──────────────────┘
```

---

## 3. 技术实现

### 3.1 构建脚本 (`scripts/generate-static.js`)

功能：
- 读取 `resume.json` 数据
- 生成纯静态 HTML（所有数据直接渲染）
- 内联 CSS 样式

### 3.2 数据嵌入

静态 HTML 生成时，数据被嵌入到：

```html
<script>
  window.__RESUME_DATA__ = {
    "basics": { ... },
    "work": [...],
    ...
  };
</script>
```

前端通过 `useResumeData` Hook 优先读取此全局变量。

### 3.3 API 路由

#### `/api/resume`
- **GET**: 读取 `src/data/resume.json`
- **POST**: 写入数据到 `resume.json` + 清除缓存

#### `/api/generate`
- **POST**: 执行 `npm run build:static`
- 支持 `DEPLOY_PATH` 环境变量自动部署

---

## 4. 使用方式

### 4.1 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

编辑后点击「保存」即可。

### 4.2 静态导出

**方式一：编辑页面按钮**
1. 访问 http://localhost:3000/edit
2. 编辑简历内容
3. 点击「保存」
4. 点击「构建并部署」

**方式二：手动构建**
```bash
npm run build:static
```

### 4.3 构建产物

```
out-static/
├── index.html          # 首页
├── about.html          # 关于页
├── contact.html        # 联系页
├── experience.html     # 经历页
├── projects.html       # 项目页
└── favicon.ico
```

### 4.4 直接使用

双击打开 `out-static/index.html` 即可查看，无需服务器。

---

## 5. 文件变更记录

### 2026-03-18 重大更新

| 操作 | 文件 | 说明 |
|------|------|------|
| 新增 | `src/app/api/resume/route.ts` | 简历数据 API |
| 新增 | `src/app/api/generate/route.ts` | 构建部署 API |
| 新增 | `src/hooks/useResumeData.ts` | 数据获取 Hook |
| 新增 | `src/contexts/EditContext.tsx` | 编辑状态管理 |
| 新增 | `next.config.export.ts` | 静态导出配置 |
| 修改 | `package.json` | 添加 build:static 命令 |

---

## 6. 优缺点

### 优点
- **灵活性**：开发/生产两相宜
- **离线可用**：静态导出无需服务器
- **数据嵌入**：直接打开 HTML 即可查看

### 缺点
- 静态导出需手动构建
- 编辑后需要重新构建才能更新静态页面

---

## 7. 相关文档

- [项目计划](../PLAN.md)
- [架构设计](./ARCHITECTURE.md)
- [实现差异报告](./IMPLEMENTATION_VS_DOC.md)

---

**维护人**: 鸡尾虾 🦐
