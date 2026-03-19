'use client';

import { useResumeData } from '@/hooks/useResumeData';

export default function ContactPage() {
  const { data, loading } = useResumeData();

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <p className="text-[var(--muted)]">加载中...</p>
      </div>
    );
  }

  const { basics } = data;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-12 text-center">
        联系我
      </h1>

      <div className="max-w-xl mx-auto">
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
            联系方式
          </h2>
          
          <div className="space-y-4">
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--border)] transition-colors"
              >
                <div className="p-2 rounded-full bg-[var(--primary)]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--secondary)]">邮箱</p>
                  <p className="text-[var(--foreground)]">{basics.email}</p>
                </div>
              </a>
            )}
            
            {basics.phone && (
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <div className="p-2 rounded-full bg-[var(--primary)]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--secondary)]">电话</p>
                  <p className="text-[var(--foreground)]">{basics.phone}</p>
                </div>
              </div>
            )}
            
            {basics.location && (
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <div className="p-2 rounded-full bg-[var(--primary)]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--secondary)]">所在地</p>
                  <p className="text-[var(--foreground)]">
                    {basics.location.city} {basics.location.region}
                  </p>
                </div>
              </div>
            )}
            
            {basics.url && (
              <a
                href={basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--border)] transition-colors"
              >
                <div className="p-2 rounded-full bg-[var(--primary)]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" x2="22" y1="12" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--secondary)]">个人网站</p>
                  <p className="text-[var(--foreground)]">{basics.url}</p>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Social Links */}
        {basics.profiles && basics.profiles.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
              社交媒体
            </h2>
            
            <div className="grid gap-3">
              {basics.profiles.map((profile) => (
                <a
                  key={profile.network}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--border)] transition-colors"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {profile.network}
                  </span>
                  <span className="text-sm text-[var(--secondary)]">
                    @{profile.username}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
