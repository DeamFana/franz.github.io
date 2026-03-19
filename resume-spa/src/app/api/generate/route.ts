import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'resume.json');
const OUT_STATIC_DIR = path.join(process.cwd(), 'out-static');

export async function POST(request: NextRequest) {
  try {
    // 读取最新数据
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ error: 'Resume data not found' }, { status: 404 });
    }

    // 生成纯静态 HTML
    console.log('[API/generate] Generating static HTML...');
    execSync('npm run build:static', { cwd: process.cwd(), stdio: 'inherit' });

    // 检查是否配置了 DEPLOY_PATH
    const deployPath = process.env.DEPLOY_PATH;
    if (deployPath) {
      if (fs.existsSync(OUT_STATIC_DIR)) {
        // 复制到部署路径
        console.log(`[API/generate] Deploying to ${deployPath}...`);
        // 先清空目标目录
        if (fs.existsSync(deployPath)) {
          fs.rmSync(deployPath, { recursive: true, force: true });
        }
        execSync(`xcopy /E /I /Y "${OUT_STATIC_DIR}\\*" "${deployPath}"`, { stdio: 'inherit' });
      }
    }

    return NextResponse.json({ success: true, message: 'Build completed', output: OUT_STATIC_DIR });
  } catch (error) {
    console.error('[API/generate] Error:', error);
    return NextResponse.json({ error: 'Build failed' }, { status: 500 });
  }
}
