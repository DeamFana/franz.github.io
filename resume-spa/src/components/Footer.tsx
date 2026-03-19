import Link from 'next/link';
import { getBasics } from '@/lib/resume';

export function Footer() {
  const basics = getBasics();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--card-bg)]">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-[var(--secondary)]">
              © {currentYear} {basics?.name || 'Resume'}. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            {basics?.profiles?.map((profile) => (
              <Link
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors"
              >
                {profile.network}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-[var(--muted)]">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
