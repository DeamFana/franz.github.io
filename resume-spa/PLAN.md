# 简历 SPA - 项目计划方案

## 1. 项目概述

| 项目 | 个人简历 SPA |
|------|-------------|
| 类型 | Next.js 16 多页面应用 |
| 目标 | 展示个人简历，支持在线编辑，构建后可直接打开 HTML 使用 |
| 目录 | `projects/resume-spa` |

---

## 2. 功能清单

### 2.1 展示模式（多页面）

| 模块 | 路由 | 功能 | 状态 |
|------|------|------|------|
| **首页** | `/` | 姓名、职位、简介、联系方式、技能展示 | ✅ |
| **关于我** | `/about` | 个人简介、奖项、推荐人 | ✅ |
| **经历** | `/experience` | 工作经历、教育经历 | ✅ |
| **项目** | `/projects` | 项目展示、语言能力、兴趣爱好 | ✅ |
| **联系** | `/contact` | 详细联系方式、社交媒体 | ✅ |

> ⚠️ 头像展示功能尚未实现

### 2.2 编辑模式

| 功能 | 说明 | 状态 |
|------|------|------|
| **编辑入口** | `/edit` 路由 | ✅ |
| **模块化编辑** | 每个模块独立编辑、添加、删除 | ✅ |
| **实时预览** | 编辑时可预览效果 | ✅ |
| **保存 JSON** | 写入 `src/data/resume.json` + API | ✅ |
| **构建部署** | 生成静态页面到 `out-static/` | ✅ |
| **自动刷新** | 进入编辑页面自动获取最新数据 | ✅ |

#### 编辑模块清单
- 关于我（简介）
- 荣誉奖项
- 推荐人
- 语言能力
- 兴趣爱好
- 工作经历
- 教育经历
- 项目经验
- 技能
- 联系方式
- 社交媒体

### 2.3 混合部署模式（2026-03-18）

| 模式 | 说明 | 状态 |
|------|------|------|
| **开发模式** | Next.js 开发服务器 + API | ✅ |
| **静态导出** | 纯静态 HTML，可双击打开 | ✅ |

#### 数据获取优先级
1. **静态 HTML**: 嵌入在 `window.__RESUME_DATA__` 中的数据
2. **API**: `/api/resume` 接口
3. **默认数据**: `src/data/defaultResume.ts`

---

## 3. 技术栈

| 层 | 技术 |
|----|------|
| 框架 | Next.js 16 (App Router) |
| React | 19 |
| 样式 | Tailwind CSS 4 |
| 数据 | JSON 文件 + API |
| 构建 | Next.js 自定义脚本 |

---

## 4. 目录结构

```
projects/resume-spa/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   ├── about/             # 关于我
│   │   ├── experience/        # 经历
│   │   ├── projects/          # 项目
│   │   ├── contact/           # 联系
│   │   ├── edit/              # 编辑页面
│   │   └── api/               # API 路由
│   │       ├── resume/        # 读写简历数据
│   │       └── generate/      # 构建部署
│   ├── components/            # 组件
│   ├── contexts/              # React Context
│   ├── data/                  # 静态数据
│   │   └── resume.json        # 简历数据
│   ├── hooks/                 # 自定义 Hooks
│   │   └── useResumeData.ts   # 数据获取
│   └── lib/                   # 工具函数
├── out-static/                 # 构建输出目录
├── scripts/
│   └── generate-static.js     # 静态生成脚本
├── next.config.ts             # 开发配置
├── next.config.export.ts     # 静态导出配置
└── README.md
```

---

## 5. API 接口

### 5.1 简历数据

| 方法 | 路由 | 说明 |
|------|------|------|
| GET | `/api/resume` | 获取简历数据 |
| POST | `/api/resume` | 保存简历数据 |

### 5.2 构建部署

| 方法 | 路由 | 说明 |
|------|------|------|
| POST | `/api/generate` | 构建并部署静态页面 |

---

## 6. 构建说明

### 开发模式
```bash
npm run dev
```

### 静态导出
```bash
npm run build:static
```

构建产物位于 `out-static/` 目录，可直接双击打开。

---

## 7. 数据结构 (resume.json)

```json
{
  "basics": {
    "name": "",
    "label": "",
    "email": "",
    "phone": "",
    "url": "",
    "summary": "",
    "location": {},
    "profiles": []
  },
  "work": [],
  "education": [],
  "skills": [],
  "projects": [],
  "awards": [],
  "languages": [],
  "interests": [],
  "references": []
}
```

---

*方案版本: 2026-03-18 (更新版)*
