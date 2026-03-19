'use client';

import { EditProvider, useEdit } from '@/contexts/EditContext';
import { EditableField } from '@/components/EditableField';
import { useState, useEffect } from 'react';
import { ResumeData } from '@/data/resume';

// ===== 头像上传组件 =====
const AvatarUpload = ({ value, onChange }: { value?: string; onChange: (v: string) => void }) => {
  const [preview, setPreview] = useState(value || '');
  
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('请选择图片文件'); return; }
    if (file.size > 2 * 1024 * 1024) { alert('图片不能超过2MB'); return; }
    const reader = new FileReader();
    reader.onload = () => { setPreview(reader.result as string); onChange(reader.result as string); };
    reader.readAsDataURL(file);
  };
  
  const handleRemove = () => { setPreview(''); onChange(''); };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">头像</h3>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-[var(--border)] flex items-center justify-center overflow-hidden">
          {preview ? <img src={preview} alt="头像" className="w-full h-full object-cover" /> : <span className="text-2xl">📷</span>}
        </div>
        <div className="flex gap-2">
          <label className="px-4 py-2 bg-[var(--primary)] text-white rounded-md cursor-pointer hover:opacity-90">
            上传图片
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
          {preview && <button onClick={handleRemove} className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50">删除</button>}
        </div>
      </div>
    </div>
  );
};

// 预览组件 - 显示真实简历样式
function PreviewMode() {
  const { data, setPreview } = useEdit();

  return (
    <div className="min-h-screen bg-[var(--bg)] py-8">
      <div className="container max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">简历预览</h1>
          <button
            onClick={() => setPreview(false)}
            className="px-4 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
          >
            返回编辑
          </button>
        </div>

        {/* 简历内容 */}
        <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-8">
          {/* 头部信息 */}
          <header className="text-center mb-8 pb-6 border-b border-[var(--border)]">
            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">{data.basics.name || '姓名'}</h1>
            <p className="text-xl text-[var(--muted)] mb-4">{data.basics.label || '职位'}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--muted)]">
              {data.basics.email && <span>✉ {data.basics.email}</span>}
              {data.basics.phone && <span>📞 {data.basics.phone}</span>}
              {data.basics.url && <span>🔗 {data.basics.url}</span>}
            </div>
            {data.basics.summary && (
              <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">{data.basics.summary}</p>
            )}
          </header>

          {/* 工作经历 */}
          {data.work.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4 pb-2 border-b border-[var(--border)]">
                工作经历
              </h2>
              {data.work.map((work, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[var(--text)]">{work.position || '职位'}</h3>
                      <p className="text-[var(--muted)]">{work.name || '公司'}</p>
                    </div>
                    <span className="text-sm text-[var(--muted)]">
                      {work.startDate} - {work.endDate || '至今'}
                    </span>
                  </div>
                  {work.summary && <p className="mt-2 text-[var(--text-secondary)]">{work.summary}</p>}
                </div>
              ))}
            </section>
          )}

          {/* 教育经历 */}
          {data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4 pb-2 border-b border-[var(--border)]">
                教育经历
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[var(--text)]">{edu.institution || '学校'}</h3>
                      <p className="text-[var(--muted)]">{edu.studyType} - {edu.area}</p>
                    </div>
                    <span className="text-sm text-[var(--muted)]">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* 项目经验 */}
          {data.projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4 pb-2 border-b border-[var(--border)]">
                项目经验
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-[var(--text)]">
                    {project.name || '项目名称'}
                    {project.url && <a href={project.url} className="ml-2 text-[var(--primary)] text-sm">🔗</a>}
                  </h3>
                  {project.description && <p className="mt-1 text-[var(--text-secondary)]">{project.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* 技能 */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4 pb-2 border-b border-[var(--border)]">
                技能
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-[var(--bg)] rounded-full text-sm text-[var(--text-secondary)]">
                    {skill.name} {skill.level && `(${skill.level})`}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function EditContent() {
  const { data, isPreview, setPreview, isDirty, saveData, resetData, updateData, isSaving, lastSaved, generateAndDeploy, isGenerating, refreshData } = useEdit();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSaveTip, setShowSaveTip] = useState(false);

  // 进入页面时刷新最新数据
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // 预览模式
  if (isPreview) {
    return <PreviewMode />;
  }

  const updateBasics = (field: string, value: string) => {
    updateData({
      basics: { ...data.basics, [field]: value }
    });
  };

  // 更新所在地
  const updateLocation = (field: string, value: string) => {
    updateData({
      basics: {
        ...data.basics,
        location: { ...data.basics.location, [field]: value }
      }
    });
  };

  // 更新社交媒体
  const updateProfile = (index: number, field: string, value: string) => {
    const newProfiles = [...(data.basics.profiles || [])];
    newProfiles[index] = { ...newProfiles[index], [field]: value };
    updateData({
      basics: { ...data.basics, profiles: newProfiles }
    });
  };

  const addProfile = () => {
    updateData({
      basics: {
        ...data.basics,
        profiles: [...(data.basics.profiles || []), { network: '', username: '', url: '' }]
      }
    });
  };

  const removeProfile = (index: number) => {
    updateData({
      basics: {
        ...data.basics,
        profiles: (data.basics.profiles || []).filter((_, i) => i !== index)
      }
    });
  };

  const updateWork = (index: number, field: string, value: string | string[]) => {
    const newWork = [...data.work];
    newWork[index] = { ...newWork[index], [field]: value };
    updateData({ work: newWork });
  };

  const addWork = () => {
    updateData({
      work: [...data.work, {
        name: '',
        position: '',
        url: '',
        startDate: '',
        endDate: '',
        summary: '',
        highlights: ['']
      }]
    });
  };

  const removeWork = (index: number) => {
    updateData({
      work: data.work.filter((_, i) => i !== index)
    });
  };

  const updateEducation = (index: number, field: string, value: string | string[]) => {
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    updateData({ education: newEducation });
  };

  const addEducation = () => {
    updateData({
      education: [...data.education, {
        institution: '',
        area: '',
        studyType: '',
        startDate: '',
        endDate: '',
        courses: []
      }]
    });
  };

  const removeEducation = (index: number) => {
    updateData({
      education: data.education.filter((_, i) => i !== index)
    });
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateData({ projects: newProjects });
  };

  const addProject = () => {
    updateData({
      projects: [...data.projects, {
        name: '',
        description: '',
        highlights: [],
        keywords: [],
        url: ''
      }]
    });
  };

  const removeProject = (index: number) => {
    updateData({
      projects: data.projects.filter((_, i) => i !== index)
    });
  };

  const updateSkill = (index: number, field: string, value: string | string[]) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    updateData({ skills: newSkills });
  };

  const addSkill = () => {
    updateData({
      skills: [...data.skills, {
        name: '',
        level: '',
        keywords: []
      }]
    });
  };

  const removeSkill = (index: number) => {
    updateData({
      skills: data.skills.filter((_, i) => i !== index)
    });
  };

  // 奖项
  const updateAward = (index: number, field: string, value: string) => {
    const newAwards = [...(data.awards || [])];
    newAwards[index] = { ...newAwards[index], [field]: value };
    updateData({ awards: newAwards });
  };

  const addAward = () => {
    updateData({
      awards: [...(data.awards || []), { title: '', date: '', awarder: '' }]
    });
  };

  const removeAward = (index: number) => {
    updateData({
      awards: (data.awards || []).filter((_, i) => i !== index)
    });
  };

  // 语言
  const updateLanguage = (index: number, field: string, value: string) => {
    const newLanguages = [...(data.languages || [])];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    updateData({ languages: newLanguages });
  };

  const addLanguage = () => {
    updateData({
      languages: [...(data.languages || []), { language: '', fluency: '' }]
    });
  };

  const removeLanguage = (index: number) => {
    updateData({
      languages: (data.languages || []).filter((_, i) => i !== index)
    });
  };

  // 兴趣爱好
  const updateInterest = (index: number, field: string, value: string | string[]) => {
    const newInterests = [...(data.interests || [])];
    newInterests[index] = { ...newInterests[index], [field]: value };
    updateData({ interests: newInterests });
  };

  const addInterest = () => {
    updateData({
      interests: [...(data.interests || []), { name: '', keywords: [] }]
    });
  };

  const removeInterest = (index: number) => {
    updateData({
      interests: (data.interests || []).filter((_, i) => i !== index)
    });
  };

  // 推荐人
  const updateReference = (index: number, field: string, value: string) => {
    const newReferences = [...(data.references || [])];
    newReferences[index] = { ...newReferences[index], [field]: value };
    updateData({ references: newReferences });
  };

  const addReference = () => {
    updateData({
      references: [...(data.references || []), { name: '', position: '', reference: '' }]
    });
  };

  const removeReference = (index: number) => {
    updateData({
      references: (data.references || []).filter((_, i) => i !== index)
    });
  };

  // 格式化保存时间
  const formatLastSaved = () => {
    if (!lastSaved) return '';
    return lastSaved.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  // 处理保存
  const handleSave = async () => {
    await saveData();
    setShowSaveTip(true);
    setTimeout(() => setShowSaveTip(false), 5000); // 5秒后隐藏提示
  };

  // 导出 JSON
  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 复制到剪贴板
  const copyToClipboard = async () => {
    const jsonStr = JSON.stringify(data, null, 2);
    await navigator.clipboard.writeText(jsonStr);
    alert('已复制到剪贴板！');
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">编辑简历</h1>
        <div className="flex gap-2 items-center">
          {/* 保存状态提示 + 数据同步状态 */}
          <div className="flex flex-col items-end mr-2">
            <span className="text-sm text-[var(--muted)]">
              {isSaving ? '💾 保存中...' : 
               isDirty ? '⏳ 未保存' : 
               lastSaved ? `✅ 已保存 ${formatLastSaved()}` : ''}
            </span>
            {/* 数据同步状态指示器 */}
            {lastSaved && !isDirty && (
              <span className="text-xs text-green-500">✓ 数据已同步到服务器</span>
            )}
          </div>
          <button
            onClick={() => setPreview(true)}
            className="px-4 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
          >
            预览
          </button>
          {/* 复制JSON按钮 */}
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-md bg-[var(--secondary)] text-white hover:opacity-90"
          >
            复制JSON
          </button>
          {/* 生成静态页面按钮 */}
          <button
            onClick={generateAndDeploy}
            disabled={isGenerating}
            className="px-4 py-2 rounded-md bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-50"
          >
            {isGenerating ? '构建中...' : '构建并部署'}
          </button>
          {isDirty && (
            <>
              <button
                onClick={resetData}
                className="px-4 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--card-bg)]"
              >
                重置
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 rounded-md bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-50"
              >
                {isSaving ? '💾 保存中...' : '保存'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* ===== 关于我 ===== */}
        <section className="card">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-[var(--border)]">关于我</h2>
          
          {/* 头像上传 */}
          <AvatarUpload
            value={data.basics.avatar}
            onChange={(v) => updateBasics('avatar', v)}
          />
          
{/* 简介 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">简介</h3>
            <EditableField
              label="个人简介"
              value={data.basics.summary}
              onChange={(v) => updateBasics('summary', v)}
              multiline
            />
          </div>

          {/* 奖项 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">荣誉奖项</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addAward} className="text-sm text-[var(--primary)] hover:underline">+ 添加奖项</button>
            </div>
            {(data.awards || []).map((award, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeAward(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <EditableField
                    label="奖项名称"
                    value={award.title}
                    onChange={(v) => updateAward(index, 'title', v)}
                  />
                  <EditableField
                    label="颁发机构"
                    value={award.awarder}
                    onChange={(v) => updateAward(index, 'awarder', v)}
                  />
                  <EditableField
                    label="日期"
                    value={award.date}
                    onChange={(v) => updateAward(index, 'date', v)}
                  />
                </div>
              </div>
            ))}
            {(data.awards || []).length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无奖项，点击添加</p>
            )}
          </div>

          {/* 推荐人 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">推荐人</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addReference} className="text-sm text-[var(--primary)] hover:underline">+ 添加推荐人</button>
            </div>
            {(data.references || []).map((ref, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeReference(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="姓名"
                    value={ref.name}
                    onChange={(v) => updateReference(index, 'name', v)}
                  />
                  <EditableField
                    label="职位"
                    value={ref.position}
                    onChange={(v) => updateReference(index, 'position', v)}
                  />
                </div>
                <div className="mt-4">
                  <EditableField
                    label="推荐内容"
                    value={ref.reference}
                    onChange={(v) => updateReference(index, 'reference', v)}
                    multiline
                  />
                </div>
              </div>
            ))}
            {(data.references || []).length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无推荐人，点击添加</p>
            )}
          </div>

          {/* 语言能力 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">语言能力</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addLanguage} className="text-sm text-[var(--primary)] hover:underline">+ 添加语言</button>
            </div>
            {(data.languages || []).map((lang, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeLanguage(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="语言"
                    value={lang.language}
                    onChange={(v) => updateLanguage(index, 'language', v)}
                  />
                  <EditableField
                    label="熟练程度"
                    value={lang.fluency}
                    onChange={(v) => updateLanguage(index, 'fluency', v)}
                  />
                </div>
              </div>
            ))}
            {(data.languages || []).length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无语言能力，点击添加</p>
            )}
          </div>

          {/* 兴趣爱好 */}
          <div>
            <h3 className="text-lg font-medium mb-3">兴趣爱好</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addInterest} className="text-sm text-[var(--primary)] hover:underline">+ 添加兴趣</button>
            </div>
            {(data.interests || []).map((interest, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeInterest(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <EditableField
                  label="名称"
                  value={interest.name}
                  onChange={(v) => updateInterest(index, 'name', v)}
                />
                <EditableField
                  label="关键词（逗号分隔）"
                  value={interest.keywords?.join(', ') || ''}
                  onChange={(v) => updateInterest(index, 'keywords', v.split(',').map(k => k.trim()).filter(k => k))}
                />
              </div>
            ))}
            {(data.interests || []).length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无兴趣爱好，点击添加</p>
            )}
          </div>
        </section>

        {/* ===== 经历 ===== */}
        <section className="card">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-[var(--border)]">经历</h2>
          
          {/* 工作经历 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">工作经历</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addWork} className="text-sm text-[var(--primary)] hover:underline">+ 添加工作经历</button>
            </div>
            {data.work.map((work, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeWork(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="公司名称"
                    value={work.name}
                    onChange={(v) => updateWork(index, 'name', v)}
                  />
                  <EditableField
                    label="职位"
                    value={work.position}
                    onChange={(v) => updateWork(index, 'position', v)}
                  />
                  <EditableField
                    label="开始日期"
                    value={work.startDate}
                    onChange={(v) => updateWork(index, 'startDate', v)}
                  />
                  <EditableField
                    label="结束日期"
                    value={work.endDate}
                    onChange={(v) => updateWork(index, 'endDate', v)}
                  />
                  <EditableField
                    label="公司简介"
                    value={work.url}
                    onChange={(v) => updateWork(index, 'url', v)}
                    className="md:col-span-2"
                  />
                </div>
                <div className="mt-4">
                  <EditableField
                    label="工作描述"
                    value={work.summary}
                    onChange={(v) => updateWork(index, 'summary', v)}
                    multiline
                    className="md:col-span-2"
                  />
                </div>
              </div>
            ))}
            {data.work.length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无工作经历，点击添加</p>
            )}
          </div>

          {/* 教育经历 */}
          <div>
            <h3 className="text-lg font-medium mb-3">教育经历</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addEducation} className="text-sm text-[var(--primary)] hover:underline">+ 添加教育经历</button>
            </div>
            {data.education.map((edu, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeEducation(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="学校名称"
                    value={edu.institution}
                    onChange={(v) => updateEducation(index, 'institution', v)}
                  />
                  <EditableField
                    label="专业"
                    value={edu.area}
                    onChange={(v) => updateEducation(index, 'area', v)}
                  />
                  <EditableField
                    label="学位"
                    value={edu.studyType}
                    onChange={(v) => updateEducation(index, 'studyType', v)}
                  />
                  <EditableField
                    label="时间"
                    value={`${edu.startDate} - ${edu.endDate}`}
                    onChange={(v) => {
                      const [start, end] = v.split(' - ');
                      updateEducation(index, 'startDate', start);
                      updateEducation(index, 'endDate', end || '');
                    }}
                  />
                </div>
              </div>
            ))}
            {data.education.length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无教育经历，点击添加</p>
            )}
          </div>
        </section>

        {/* ===== 项目 ===== */}
        <section className="card">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-[var(--border)]">项目</h2>
          
          {/* 项目经验 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">项目经验</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addProject} className="text-sm text-[var(--primary)] hover:underline">+ 添加项目</button>
            </div>
            {data.projects.map((project, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeProject(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="项目名称"
                    value={project.name}
                    onChange={(v) => updateProject(index, 'name', v)}
                  />
                  <EditableField
                    label="项目链接"
                    value={project.url}
                    onChange={(v) => updateProject(index, 'url', v)}
                  />
                </div>
                <div className="mt-4">
                  <EditableField
                    label="项目描述"
                    value={project.description}
                    onChange={(v) => updateProject(index, 'description', v)}
                    multiline
                    className="md:col-span-2"
                  />
                </div>
              </div>
            ))}
            {data.projects.length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无项目经验，点击添加</p>
            )}
          </div>

          {/* 技能 */}
          <div>
            <h3 className="text-lg font-medium mb-3">技能</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addSkill} className="text-sm text-[var(--primary)] hover:underline">+ 添加技能</button>
            </div>
            {data.skills.map((skill, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeSkill(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="技能类别"
                    value={skill.name}
                    onChange={(v) => updateSkill(index, 'name', v)}
                  />
                  <EditableField
                    label="熟练程度"
                    value={skill.level}
                    onChange={(v) => updateSkill(index, 'level', v)}
                  />
                </div>
              </div>
            ))}
            {data.skills.length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无技能，点击添加</p>
            )}
          </div>
        </section>

        {/* ===== 联系方式 ===== */}
        <section className="card">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-[var(--border)]">联系方式</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableField
              label="姓名"
              value={data.basics.name}
              onChange={(v) => updateBasics('name', v)}
            />
            <EditableField
              label="职位"
              value={data.basics.label}
              onChange={(v) => updateBasics('label', v)}
            />
            <EditableField
              label="邮箱"
              value={data.basics.email}
              onChange={(v) => updateBasics('email', v)}
            />
            <EditableField
              label="电话"
              value={data.basics.phone}
              onChange={(v) => updateBasics('phone', v)}
            />
            <EditableField
              label="个人网站"
              value={data.basics.url}
              onChange={(v) => updateBasics('url', v)}
              className="md:col-span-2"
            />
            <EditableField
              label="城市"
              value={data.basics.location?.city || ''}
              onChange={(v) => updateLocation('city', v)}
            />
            <EditableField
              label="地区"
              value={data.basics.location?.region || ''}
              onChange={(v) => updateLocation('region', v)}
            />
          </div>

          {/* 社交媒体 */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">社交媒体</h3>
            <div className="flex justify-between items-center mb-3">
              <button onClick={addProfile} className="text-sm text-[var(--primary)] hover:underline">+ 添加社交媒体</button>
            </div>
            {(data.basics.profiles || []).map((profile, index) => (
              <div key={index} className="border border-[var(--border)] rounded-md p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => removeProfile(index)} className="text-red-500 text-sm hover:underline">删除</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <EditableField
                    label="平台"
                    value={profile.network}
                    onChange={(v) => updateProfile(index, 'network', v)}
                  />
                  <EditableField
                    label="用户名"
                    value={profile.username}
                    onChange={(v) => updateProfile(index, 'username', v)}
                  />
                  <EditableField
                    label="链接"
                    value={profile.url}
                    onChange={(v) => updateProfile(index, 'url', v)}
                  />
                </div>
              </div>
            ))}
            {(data.basics.profiles || []).length === 0 && (
              <p className="text-[var(--muted)] text-center py-4">暂无社交媒体，点击添加</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function EditPage() {
  return (
    <EditProvider>
      <EditContent />
    </EditProvider>
  );
}
