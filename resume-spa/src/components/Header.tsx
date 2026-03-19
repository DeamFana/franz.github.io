'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
  { href: '/experience', label: '经历' },
  { href: '/projects', label: '项目' },
  { href: '/contact', label: '联系' },
  { href: '/edit', label: '编辑', isPrimary: true },
];

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[var(--foreground)]">Resume</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                item.isPrimary 
                  ? 'px-3 py-1.5 rounded-md bg-[var(--primary)] text-white hover:opacity-90'
                  : 'text-[var(--secondary)] hover:text-[var(--foreground)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-[var(--card-bg)] transition-colors"
          aria-label="切换主题"
        >
          {resolvedTheme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2"/>
              <path d="M12 20v2"/>
              <path d="m4.93 4.93 1.41 1.41"/>
              <path d="m17.66 17.66 1.41 1.41"/>
              <path d="M2 12h2"/>
              <path d="M20 12h2"/>
              <path d="m6.34 17.66-1.41 1.41"/>
              <path d="m19.07 4.93-1.41 1.41"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
