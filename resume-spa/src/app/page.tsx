'use client';

import { useResumeData } from '@/hooks/useResumeData';

export default function Home() {
  const { data, loading } = useResumeData();

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <p className="text-[var(--muted)]">加载中...</p>
      </div>
    );
  }

  const { basics, skills } = data;

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
            {basics.name}
          </h1>
          <p className="text-xl text-[var(--primary)] mb-4">
            {basics.label}
          </p>
          <p className="text-[var(--secondary)] max-w-2xl mx-auto mb-6">
            {basics.summary}
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--secondary)]">
            {basics.email && (
              <a href={`mailto:${basics.email}`} className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                {basics.email}
              </a>
            )}
            {basics.phone && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {basics.phone}
              </span>
            )}
            {basics.location && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {basics.location.city} {basics.location.region}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Social Profiles */}
      {basics.profiles && basics.profiles.length > 0 && (
        <section className="mb-12">
          <div className="flex justify-center gap-4">
            {basics.profiles.map((profile) => (
              <a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary)] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                {profile.network}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 text-center">
            技能专长
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="card"
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-3">
                  {skill.name}
                  {skill.level && (
                    <span className="text-sm text-[var(--muted)] ml-2">
                      ({skill.level})
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.keywords?.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 text-sm rounded-full bg-[var(--primary)]/10 text-[var(--primary)]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
