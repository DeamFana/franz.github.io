@echo off
echo ========================================
echo   简历 SPA - 一键部署脚本
echo ========================================
echo.

echo [1/3] 清理旧构建...
if exist out rmdir /s /q out
if exist .next rmdir /s /q .next

echo [2/3] 安装依赖...
call npm install

echo [3/3] 生产构建...
call npm run build

echo.
echo ========================================
echo   构建完成！
echo   静态文件输出目录: out
echo ========================================
echo.
echo 启动本地服务器预览...
echo 按 Ctrl+C 停止服务器
echo.
npx serve out -p 3000
