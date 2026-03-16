# Sprint 2: 数据层设计与基础布局

**项目**: Resume-SPA  
**Sprint**: 2  
**目标**: 定义 resume.json 数据结构，创建示例数据，实现页面整体框架  
**周期**: 第2天

---

## 3.1 任务清单

| 任务ID | 任务 | 类型 | 预估 | 状态 |
|--------|------|------|------|------|
| S2-01 | 设计 resume.json 数据结构 | 设计 | 30min | ⏳ |
| S2-02 | 创建示例 resume.json 数据 | 开发 | 30min | ⏳ |
| S2-03 | 封装数据读取工具函数 | 开发 | 20min | ⏳ |
| S2-04 | 创建全局布局组件 (Layout) | 开发 | 30min | ⏳ |
| S2-05 | 实现 Header 导航组件 | 开发 | 30min | ⏳ |
| S2-06 | 实现 Footer 组件 | 开发 | 20min | ⏳ |
| S2-07 | 配置全局 CSS 变量 (颜色/字体) | 开发 | 30min | ⏳ |
| S2-08 | 实现浅色/深色主题基础 | 开发 | 30min | ⏳ |

---

## 3.2 交付物

- [ ] 完整的 resume.json 数据结构文档
- [ ] 示例数据文件
- [ ] 页面基础布局 (Header + Footer)
- [ ] 主题切换基础架构

---

## 3.3 验收标准

- JSON 数据结构覆盖所有展示模块
- 页面可显示 Header 和 Footer
- 主题切换可在控制台验证切换状态

---

## 3.4 数据结构预览

```json
{
  "profile": {
    "name": "string",
    "title": "string",
    "avatar": "string (URL)",
    "bio": "string",
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

**状态**: ⏳ 待开始  
**最后更新**: 2026-03-16
