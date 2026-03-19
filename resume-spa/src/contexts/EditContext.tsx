'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { defaultResumeData, ResumeData } from '@/data/defaultResume';

interface EditContextType {
  data: ResumeData;
  isDirty: boolean;
  isPreview: boolean;
  isSaving: boolean;
  isGenerating: boolean;
  isLoading: boolean;
  lastSaved: Date | null;
  updateData: (newData: Partial<ResumeData>) => void;
  setPreview: (preview: boolean) => void;
  resetData: () => void;
  saveData: () => Promise<void>;
  generateAndDeploy: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

const AUTO_SAVE_INTERVAL = 30000; // 30秒

// 初始化时同步读取全局变量
function getInitialData(): ResumeData | null {
  if (typeof window !== 'undefined') {
    const globalData = (window as any).__RESUME_DATA__;
    if (globalData) {
      return globalData;
    }
  }
  return null; // 表示需要异步加载
}

const initialData = getInitialData();

export function EditProvider({ children }: { children: ReactNode }) {
  // 如果有初始数据，设置为已加载
  const [data, setData] = useState<ResumeData | null>(initialData);
  const [isLoading, setIsLoading] = useState(initialData !== null ? false : true);
  const [isDirty, setIsDirty] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // 初始化时加载数据（优先从全局变量读取，用于静态HTML）
  useEffect(() => {
    // 如果已经有数据，跳过
    if (data !== null) {
      return;
    }

    async function loadData() {
      // 1. 尝试从全局变量读取（静态HTML预填充的数据）
      if (typeof window !== 'undefined' && (window as any).__RESUME_DATA__) {
        console.log('[EditContext] 从全局变量加载数据');
        setData((window as any).__RESUME_DATA__);
        setIsLoading(false);
        return;
      }

      // 2. 尝试从 API 读取
      try {
        const url = `/api/resume?_t=${Date.now()}`;
        console.log('[EditContext] 加载数据:', url);
        const response = await fetch(url, {
          cache: 'no-store',
        });
        if (response.ok) {
          const json = await response.json();
          console.log('[EditContext] 加载到数据:', json.basics?.name);
          setData(json);
        } else {
          console.error('[EditContext] 加载失败:', response.status);
          setData(defaultResumeData);
        }
      } catch (error) {
        console.error('[EditContext] 加载数据失败:', error);
        // 3. 最后尝试从 localStorage 读取
        try {
          const stored = localStorage.getItem('resume-data');
          if (stored) {
            setData(JSON.parse(stored));
          } else {
            setData(defaultResumeData);
          }
        } catch {
          setData(defaultResumeData);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [data]);

  const updateData = (newData: Partial<ResumeData>) => {
    setData(prev => prev ? ({ ...prev, ...newData }) : { ...defaultResumeData, ...newData });
    setIsDirty(true);
  };

  const setPreview = (preview: boolean) => {
    setIsPreview(preview);
  };

  const resetData = () => {
    if (data) {
      setData(defaultResumeData);
      setIsDirty(false);
    }
  };

  // 从 API 刷新数据
  const refreshData = useCallback(async () => {
    try {
      // 加时间戳绕过缓存
      const response = await fetch(`/api/resume?_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const json = await response.json();
        setData(json);
        setIsDirty(false);
      }
    } catch (error) {
      console.error('刷新数据失败:', error);
    }
  }, []);

  // 保存到 API
  const saveData = useCallback(async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setIsDirty(false);
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setIsSaving(false);
    }
  }, [data]);

  // 构建并部署
  const generateAndDeploy = useCallback(async () => {
    if (!confirm('将执行以下操作：\n1. 保存 JSON 数据\n2. 构建静态页面\n3. 部署到目标目录\n\n确定继续吗？')) {
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonData: data }),
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ ' + result.message);
      } else {
        alert('❌ 生成失败: ' + result.error);
      }
    } catch (error) {
      alert('❌ 请求失败: ' + (error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  }, [data]);

  // 自动保存 effect
  useEffect(() => {
    if (!isDirty) return;

    const timer = setInterval(() => {
      saveData();
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(timer);
  }, [isDirty, saveData]);

  // 离开页面时保存
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        saveData();
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, saveData]);

  return (
    <EditContext.Provider value={{ 
      data: data!, // data 在加载完成后一定不为 null
      isDirty, 
      isPreview, 
      isSaving,
      isGenerating,
      lastSaved,
      isLoading, // 新增：加载状态
      updateData, 
      setPreview, 
      resetData, 
      saveData,
      generateAndDeploy,
      refreshData
    }}>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[var(--muted)]">加载中...</p>
        </div>
      ) : children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
}
