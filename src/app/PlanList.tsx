// app/readme/page.tsx
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export default async function ReadmePage() {
  const filePath = path.join(process.cwd(), 'README.md');
  const content = fs.readFileSync(filePath, 'utf8');
  const html = marked.parse(content); // 同步解析

  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
