import resumeData from '@/data/resume.json';
import { Basics, Work, Education, Skill, Project, Award, Language, Interest, Reference } from '@/data/resume';

/**
 * 获取简历数据
 */
export function getResumeData() {
  return resumeData;
}

/**
 * 获取基本信息
 */
export function getBasics(): Basics {
  return resumeData.basics;
}

/**
 * 获取工作经历
 */
export function getWork(): Work[] {
  return resumeData.work || [];
}

/**
 * 获取教育经历
 */
export function getEducation(): Education[] {
  return resumeData.education || [];
}

/**
 * 获取技能列表
 */
export function getSkills(): Skill[] {
  return resumeData.skills || [];
}

/**
 * 获取项目经验
 */
export function getProjects(): Project[] {
  return resumeData.projects || [];
}

/**
 * 获取奖项
 */
export function getAwards(): Award[] {
  return resumeData.awards || [];
}

/**
 * 获取语言能力
 */
export function getLanguages(): Language[] {
  return resumeData.languages || [];
}

/**
 * 获取兴趣爱好
 */
export function getInterests(): Interest[] {
  return resumeData.interests || [];
}

/**
 * 获取推荐人
 */
export function getReferences(): Reference[] {
  return resumeData.references || [];
}
