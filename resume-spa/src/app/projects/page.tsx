import { Metadata } from 'next';
import { getProjects, getSkills, getLanguages, getInterests } from '@/lib/resume';

export const metadata: Metadata = {
  title: '项目与技能 | 我的简历',
  description: '展示我的项目经验、技术技能、语言能力和兴趣爱好',
};

export default function ProjectsPage() {
  const projects = getProjects();
  const skills = getSkills();
  const languages = getLanguages();
  const interests = getInterests();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-12 text-center">
        项目与技能
      </h1>

      {/* Projects Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
          项目展示
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {projects.length === 0 ? (
            <p className="text-[var(--secondary)]">暂无项目</p>
          ) : (
            projects.map((project, index) => (
              <div key={index} className="card hover:border-[var(--primary)] transition-colors">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                  {project.name}
                </h3>
                <p className="text-[var(--secondary)] mb-4">{project.description}</p>
                
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-[var(--secondary)]">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
                
                {project.keywords && project.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded bg-[var(--primary)]/10 text-[var(--primary)]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:underline"
                  >
                    查看项目
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" x2="21" y1="14" y2="3"/>
                    </svg>
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Languages Section */}
      {languages.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" x2="22" y1="12" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            语言能力
          </h2>
          
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]"
              >
                <span className="font-medium text-[var(--foreground)]">{lang.language}</span>
                <span className="text-[var(--secondary)] ml-2">- {lang.fluency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests Section */}
      {interests.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            兴趣爱好
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {interests.map((interest, index) => (
              <div key={index} className="card">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{interest.name}</h3>
                {interest.keywords && interest.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {interest.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded bg-[var(--accent)]/10 text-[var(--accent)]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
