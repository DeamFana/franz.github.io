import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 开发模式（不需要 output: export）
  trailingSlash: true,
  // basePath: "/resume-spa", // 本地开发时注释，部署时取消注释
  images: {
    unoptimized: true,
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
