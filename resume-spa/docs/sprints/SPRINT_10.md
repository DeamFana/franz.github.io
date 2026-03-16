# Sprint 10: 构建脚本与部署流水线

**项目**: Resume-SPA  
**Sprint**: 10  
**目标**: 自动化打包部署流程  
**周期**: 第10天

---

## 11.1 任务清单

| 任务ID | 任务 | 类型 | 预估 | 状态 |
|--------|------|------|------|------|
| S10-01 | 编写打包脚本 (build.sh/build.ps1) | 开发 | 30min | ⏳ |
| S10-02 | 配置 GitHub 仓库 | 基础设施 | 20min | ⏳ |
| S10-03 | 创建 GitHub Actions 部署工作流 | 开发 | 40min | ⏳ |
| S10-04 | 配置 GitHub Pages 部署 | 基础设施 | 20min | ⏳ |
| S10-05 | 测试本地构建输出 | 开发 | 20min | ⏳ |
| S10-06 | 测试 GitHub Actions 自动部署 | 部署 | 30min | ⏳ |
| S10-07 | 验证 GitHub Pages 访问 | 测试 | 20min | ⏳ |
| S10-08 | 编写部署文档 | 文档 | 30min | ⏳ |

---

## 11.2 交付物

- [ ] 自动化打包脚本
- [ ] GitHub Actions 工作流
- [ ] GitHub Pages 自动部署完成

---

## 11.3 验收标准

- 本地运行打包脚本生成静态文件
- 推送到 main 分支自动触发部署
- 部署完成后 GitHub Pages 可访问

---

## 11.4 部署流程

```
本地: npm run build → out/ 目录
推送: git push origin main
触发: GitHub Actions 自动部署
结果: GitHub Pages 更新
```

---

## 11.5 GitHub Actions 概览

```yaml
# 触发条件: main 分支 push
# 操作:
# 1. Checkout 代码
# 2. 安装 Node.js
# 3. npm install
# 4. npm run build
# 5. Deploy to GitHub Pages
```

---

**状态**: ⏳ 待开始  
**最后更新**: 2026-03-16
