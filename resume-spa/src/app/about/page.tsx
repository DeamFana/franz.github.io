'use client';

import { useResumeData } from '@/hooks/useResumeData';

export default function AboutPage() {
  const { data, loading } = useResumeData();

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <p className="text-[var(--muted)]">加载中...</p>
      </div>
    );
  }

  const { basics, awards, references } = data;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-12 text-center">
        关于我
      </h1>

      {/* Basic Info */}
      <section className="mb-12">
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
            个人简介
          </h2>
          <p className="text-[var(--secondary)] leading-relaxed">
            {basics.summary}
          </p>
          
          {basics.url && (
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <a
                href={basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--primary)] hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" x2="22" y1="12" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                个人网站
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Awards */}
      {awards && awards.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
            荣誉奖项
          </h2>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            {awards.map((award, index) => (
              <div key={index} className="card flex items-center gap-4">
                <div className="p-3 rounded-full bg-[var(--accent)]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">{award.title}</h3>
                  <p className="text-sm text-[var(--secondary)]">
                    {award.awarder} · {award.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            推荐人
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            {references.map((ref, index) => (
              <div key={index} className="card">
                <p className="text-[var(--secondary)] italic mb-4">"{ref.reference}"</p>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">{ref.name}</h3>
                  {ref.position && (
                    <p className="text-sm text-[var(--secondary)]">{ref.position}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
