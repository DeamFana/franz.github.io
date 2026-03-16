# 简历 SPA - 需求文档

**项目代号**: Resume-SPA  
**版本**: 1.0.0  
**创建日期**: 2026-03-16

---

## 1. 项目背景

### 1.1 目标

构建一个部署到 GitHub Pages 的个人简历网站，作为个人品牌展示主页。

### 1.2 部署平台

- **GitHub Pages**：免费静态网站托管
- **部署方式**：GitHub Actions 自动部署

---

## 2. 功能需求

### 2.1 展示模式

| 模块 | 功能 | 优先级 |
|------|------|--------|
| Header | 姓名、职位、导航 | P0 |
| 个人简介 | 头像、姓名、简介、社交链接 | P0 |
| 教育经历 | 学校、学历、时间、专业 | P0 |
| 工作经历 | 公司、职位、时间、职责 | P0 |
| 项目经验 | 项目名、描述、技术栈、链接 | P0 |
| 技能展示 | 技能标签或进度条 | P0 |
| 联系方式 | 邮箱、电话、GitHub 等 | P0 |
| 主题切换 | 浅色/深色模式切换 | P1 |
| 响应式 | 移动端/平板/桌面适配 | P0 |

### 2.2 编辑模式（本地开发用）

| 功能 | 说明 | 优先级 |
|------|------|--------|
| 密码验证 | 保护编辑入口 | P0 |
| 模块化编辑 | 各模块独立编辑 | P0 |
| 添加/删除 | 支持增删数据项 | P0 |
| 实时预览 | 编辑时预览效果 | P1 |
| 数据保存 | 保存到 JSON 文件 | P0 |

### 2.3 后端 API（预留）

| 接口 | 方法 | 功能 | 优先级 |
|------|------|------|--------|
| `/api/auth` | POST | 密码验证 | P2 |
| `/api/resume` | GET | 获取简历 | P2 |
| `/api/resume` | PATCH | 更新简历 | P2 |

---

## 3. 非功能需求

### 3.1 性能

- 首次加载 < 2s
- Lighthouse 性能评分 > 90

### 3.2 兼容性

- Chrome / Firefox / Safari / Edge 最新版
- 移动端响应式适配

### 3.3 SEO

- Meta 标签完整
- 语义化 HTML
- Sitemap 生成

### 3.4 安全

- 编辑模式仅本地可用
- 密码不暴露在客户端
- 生产构建不含编辑代码

---

## 4. 数据结构

### 4.1 resume.json

```json
{
  "profile": {
    "name": "string",
    "title": "string",
    "avatar": "string",
    "bio": "string",
    "social": [
      { "platform": "github", "url": "string" }
    ]
  },
  "education": [
    {
      "school": "string",
      "degree": "string",
      "major": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "experience": [
    {
      "company": "string",
      "position": "string",
      "duration": "string",
      "highlights": ["string"]
    }
  ],
  "projects": [
    {
      "title": "string",
      "description": "string",
      "techStack": ["string"],
      "image": "string",
      "demoUrl": "string",
      "sourceUrl": "string"
    }
  ],
  "skills": [
    {
      "name": "string",
      "level": "number",
      "category": "string"
    }
  ],
  "contact": {
    "email": "string",
    "phone": "string",
    "location": "string",
    "github": "string",
    "linkedin": "string",
    "website": "string"
  }
}
```

---

## 5. 里程碑

| 阶段 | 目标 | 预期 |
|------|------|------|
| Phase 1 | 项目初始化 | 可运行的 Next.js 项目 |
| Phase 2 | 展示模式 | 所有模块正常展示 |
| Phase 3 | 编辑模式 | 本地可编辑数据 |
| Phase 4 | 自动部署 | GitHub Pages 自动部署 |
| Phase 5 | 优化上线 | 性能优化，正式发布 |

---

**文档状态**: 进行中  
**最后更新**: 2026-03-16
