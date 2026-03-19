import { useState, useEffect } from 'react';
import { defaultResumeData, ResumeData } from '@/data/defaultResume';

/**
 * 读取简历数据的 Hook
 * 优先从全局变量读取（静态HTML），fallback 到 API
 */

// 初始化时同步读取全局变量
function getInitialData(): { data: ResumeData; loading: boolean } {
  if (typeof window !== 'undefined') {
    const globalData = (window as any).__RESUME_DATA__;
    if (globalData) {
      return { data: globalData, loading: false };
    }
  }
  return { data: defaultResumeData, loading: true };
}

const initialState = getInitialData();

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(initialState.data);
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    // 如果已经有数据且不需加载，跳过
    if (!loading && typeof window !== 'undefined' && (window as any).__RESUME_DATA__) {
      return;
    }

    async function fetchData() {
      // 1. 尝试从全局变量读取（静态HTML预填充的数据）
      if (typeof window !== 'undefined' && (window as any).__RESUME_DATA__) {
        setData((window as any).__RESUME_DATA__);
        setLoading(false);
        return;
      }

      // 2. 尝试从 API 读取
      try {
        const response = await fetch(`/api/resume?_t=${Date.now()}`, {
          cache: 'no-store',
        });
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error('读取简历数据失败:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [loading]);

  return { data, loading };
}
