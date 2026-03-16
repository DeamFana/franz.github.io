# 个人简历 SPA - 项目计划方案

## 1. 项目概述

| 项目 | 个人简历 SPA |
|------|-------------|
| 类型 | React 单页应用 + 后端 API |
| 目标 | 展示个人简历，支持密码进入编辑模式进行模块化内容管理 |
| 目录 | `projects/resume-spa` |

---

## 2. 功能清单

### 2.1 展示模式（公开）

| 模块 | 功能 |
|------|------|
| **Header** | 姓名、职位、头像、社交链接 |
| **关于我** | 个人简介 |
| **教育经历** | 学校、学历、时间、专业 |
| **工作经历** | 公司、职位、时间、职责 |
| **项目经验** | 项目名、描述、技术栈、链接 |
| **技能** | 技能标签/进度条展示 |
| **联系方式** | 邮箱、电话、GitHub 等 |
| **深色/浅色切换** | 主题切换 |

### 2.2 编辑模式（密码保护）

| 功能 | 说明 |
|------|------|
| **密码验证** | 后端 API 验证，返回 JWT token |
| **模块化编辑** | 每个模块独立编辑、添加、删除 |
| **实时预览** | 编辑时可预览效果 |
| **保存发布** | 写回 JSON 文件 |

### 2.3 后端 API

| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/auth` | POST | 密码验证，返回 token |
| `/api/resume` | GET | 获取简历 JSON |
| `/api/resume` | PATCH | 更新简历（需 token） |

---

## 3. 技术栈

| 层 | 技术 |
|----|------|
| 前端 | React + Vite |
| 样式 | Tailwind CSS |
| 数据 | JSON 文件存储 |
| 后端 | Express.js（与前端同目录） |
| 认证 | JWT |

---

## 4. 目录结构

```
projects/resume-spa/
├── client/                 # React 前端
│   ├── src/
│   │   ├── components/    # 组件
│   │   ├── data/          # resume.json
│   │   ├── hooks/         # 自定义 hooks
│   │   ├── pages/         # 页面
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                # Express 后端
│   ├── routes/
│   ├── index.js
│   └── package.json
├── data/                  # 简历数据
│   └── resume.json
├── .env                   # 密码、JWT_SECRET
└── README.md
```

---

## 5. 开发流程

### Phase 1：基础搭建
- [ ] 初始化项目目录
- [ ] 搭建 React + Vite 环境
- [ ] 搭建 Express 后端
- [ ] 配置代理（前端访问后端）

### Phase 2：展示模式
- [ ] 编写 `resume.json` 数据结构
- [ ] 开发各模块展示组件
- [ ] 实现主题切换（浅色/深色）
- [ ] 基础样式美化

### Phase 3：编辑模式
- [ ] 后端密码验证 API
- [ ] 前端登录页面
- [ ] JWT 验证中间件
- [ ] 模块化编辑界面
- [ ] 保存 API

### Phase 4：优化
- [ ] 响应式适配
- [ ] 动画/过渡效果
- [ ] 编辑器体验优化

---

## 6. 数据结构 (resume.json)

```json
{
  "profile": {
    "name": "",
    "title": "",
    "avatar": "",
    "bio": "",
    "social": []
  },
  "education": [],
  "experience": [],
  "projects": [],
  "skills": [],
  "contact": {}
}
```

---

## 7. 后续待讨论

- [ ] 部署方案
- [ ] 数据存储方案（JSON vs 数据库）

---

## 8. 预计时间

| Phase | 预计 |
|-------|------|
| Phase 1 | 30 min |
| Phase 2 | 1-2 h |
| Phase 3 | 1-2 h |
| Phase 4 | 30 min |

**总计约 3-5 小时**

---

*方案版本: 2026-03-16*
