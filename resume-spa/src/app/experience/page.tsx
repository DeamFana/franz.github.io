'use client';

import { useResumeData } from '@/hooks/useResumeData';

export default function ExperiencePage() {
  const { data, loading } = useResumeData();

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <p className="text-[var(--muted)]">加载中...</p>
      </div>
    );
  }

  const { work, education } = data;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-12 text-center">
        工作与教育经历
      </h1>

      {/* Work Experience */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          工作经历
        </h2>
        
        <div className="space-y-8">
          {!work || work.length === 0 ? (
            <p className="text-[var(--secondary)]">暂无工作经历</p>
          ) : (
            work.map((job, index) => (
              <div key={index} className="card relative">
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-[var(--primary)] -translate-x-1/2" />
                
                <div className="pl-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      {job.position}
                    </h3>
                    <span className="text-sm text-[var(--secondary)]">
                      {job.startDate} - {job.endDate || '至今'}
                    </span>
                  </div>
                  
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline mb-3 block"
                    >
                      {job.name}
                    </a>
                  ) : (
                    <p className="text-[var(--primary)] mb-3">{job.name}</p>
                  )}
                  
                  {job.summary && (
                    <p className="text-[var(--secondary)] mb-4">{job.summary}</p>
                  )}
                  
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1">
                      {job.highlights.map((highlight, i) => (
                        <li key={i} className="text-[var(--secondary)]">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m4 6 8-4 8 4"/>
            <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/>
            <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/>
            <path d="M18 5v17"/>
            <path d="M6 5v17"/>
            <circle cx="12" cy="9" r="2"/>
          </svg>
          教育经历
        </h2>
        
        <div className="space-y-8">
          {!education || education.length === 0 ? (
            <p className="text-[var(--secondary)]">暂无教育经历</p>
          ) : (
            education.map((edu, index) => (
              <div key={index} className="card relative">
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-[var(--accent)] -translate-x-1/2" />
                
                <div className="pl-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      {edu.studyType} - {edu.area}
                    </h3>
                    <span className="text-sm text-[var(--secondary)]">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  
                  <p className="text-[var(--primary)] mb-3">{edu.institution}</p>
                  
                  {edu.courses && edu.courses.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded bg-[var(--accent)]/10 text-[var(--accent)]"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
