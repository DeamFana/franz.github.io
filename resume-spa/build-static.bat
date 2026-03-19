@echo off
chcp 65001 >nul
echo ========================================
echo 简历 SPA - 静态页面构建脚本
echo ========================================
echo.

:: 检查 resume.json 是否存在
if not exist "src\data\resume.json" (
    echo [错误] resume.json 不存在
    pause
    exit /b 1
)

echo [1/3] 清理旧的构建输出...
if exist "out" rmdir /s /q "out"
echo        已清理 out 目录

echo.
echo [2/3] 执行 Next.js 生产构建...
call npm run build
if errorlevel 1 (
    echo [错误] 构建失败
    pause
    exit /b 1
)
echo        构建完成

echo.
echo [3/3] 清理 edit 页面（不包含在最终输出中）...
if exist "out\edit" rmdir /s /q "out\edit"
echo        已删除 edit 页面

echo.
echo ========================================
echo 构建成功！
echo 静态文件位于: out\
echo ========================================
echo.
echo 提示: 可使用 serve out 或其他静态服务器预览
pause
