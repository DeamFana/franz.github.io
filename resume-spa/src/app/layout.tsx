import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://franz.github.io/resume-spa'),
  title: {
    default: '我的简历 | Resume',
    template: '%s | 我的简历',
  },
  description: '个人简历网站 - 展示工作经历、项目经验、技能和联系方式',
  keywords: ['简历', '个人简历', '前端工程师', '开发者', 'portfolio'],
  authors: [{ name: 'Franz' }],
  openGraph: {
    title: '我的简历 | Resume',
    description: '个人简历网站 - 展示工作经历、项目经验、技能和联系方式',
    url: 'https://franz.github.io/resume-spa',
    siteName: '我的简历',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
