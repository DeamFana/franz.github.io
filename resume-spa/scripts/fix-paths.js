const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const outDir = path.join(projectDir, 'out');
const dataFile = path.join(projectDir, 'src', 'data', 'resume.json');

// 读取简历数据
const resumeData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

function processFile(filePath) {
  const relativeToRoot = path.relative(outDir, filePath);
  const depth = relativeToRoot.split(path.sep).length - 1;
  const prefix = depth > 0 ? "../".repeat(depth) : "./";
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // 1. 替换 /_next/ 路径
  if (content.includes("/_next/")) {
    content = content.replace(/(href|src)="\/\_next\//g, `$1="${prefix}_next/`);
    modified = true;
  }
  if (content.includes('src": "')) {
    content = content.replace(/src": "\\\/\_next\//g, `src": "${prefix}_next/`);
    content = content.replace(/src": "\/\_next\//g, `src": "${prefix}_next/`);
    modified = true;
  }
  content = content.replace(/\\\/\_next\//g, `${prefix}_next/`);
  content = content.replace(/\/\_next\//g, `${prefix}_next/`);

  // 2. favicon
  if (content.includes("/favicon.ico")) {
    content = content.replace(/href="\/favicon\.ico[^"]*"/g, `href="${prefix}favicon.ico"`);
    modified = true;
  }

  // 3. 首页链接
  if (content.includes('href="/"')) {
    content = content.replace(/href="\/"(?!\s*">)/g, `href="${prefix}"`);
    modified = true;
  }

  // 4. 页面链接
  if (content.includes('href="/')) {
    content = content.replace(/href="\/([a-zA-Z0-9_-]+)\/"(?!\s*">)/g, `href="${prefix}$1/"`);
    modified = true;
  }

  // 5. 嵌入简历数据到 HTML
  if (filePath.endsWith('.html')) {
    // 将数据嵌入到 window.__RESUME_DATA__
    const dataScript = `<script>window.__RESUME_DATA__ = ${JSON.stringify(resumeData)};</script>`;
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${dataScript}</head>`);
      modified = true;
    } else if (content.includes('<body')) {
      content = content.replace('<body', `<body${dataScript}<body`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${depth > 0 ? "[" + depth + "层] " : ""}处理: ${relativeToRoot}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`📁 目录不存在: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith(".html") || file.endsWith(".txt")) {
      processFile(filePath);
    }
  }
}

console.log("\n🔧 开始处理 out 目录...");
walkDir(outDir);
console.log("✅ 处理完成！\n");
