export interface ResumeData {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  awards: Award[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  avatar?: string;
  location: Location;
  profiles: Profile[];
}

export interface Location {
  city: string;
  region: string;
  countryCode: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Work {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  courses: string[];
}

export interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  url: string;
}

export interface Award {
  title: string;
  date: string;
  awarder: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Interest {
  name: string;
  keywords: string[];
}

export interface Reference {
  name: string;
  reference: string;
  position: string;
}

export const defaultResumeData: ResumeData = {
  basics: {
    name: "张三",
    label: "前端工程师",
    email: "zhangsan@example.com",
    phone: "+86 138-0000-0000",
    url: "https://zhangsan.dev",
    summary: "具有 3 年前端开发经验，擅长 React、Next.js 和 TypeScript。",
    location: {
      city: "深圳",
      region: "广东",
      countryCode: "CN"
    },
    profiles: [
      {
        network: "GitHub",
        username: "zhangsan",
        url: "https://github.com/zhangsan"
      },
      {
        network: "掘金",
        username: "zhangsan",
        url: "https://juejin.cn/user/zhangsan"
      }
    ]
  },
  work: [
    {
      name: "某互联网公司",
      position: "前端工程师",
      url: "https://example.com",
      startDate: "2023-03",
      endDate: "",
      summary: "负责公司核心产品的前端开发",
      highlights: [
        "主导了 React 组件库的建设",
        "优化了页面加载性能，PWA 优化提升 40%",
        "引入自动化测试，代码覆盖率提升至 80%"
      ]
    }
  ],
  education: [
    {
      institution: "某某大学",
      area: "计算机科学与技术",
      studyType: "学士",
      startDate: "2015-09",
      endDate: "2019-06",
      courses: [
        "数据结构与算法",
        "计算机网络",
        "操作系统"
      ]
    }
  ],
  skills: [
    {
      name: "前端开发",
      level: "熟练",
      keywords: ["React", "Next.js", "TypeScript", "Vue", "Tailwind CSS"]
    },
    {
      name: "后端开发",
      level: "了解",
      keywords: ["Node.js", "Python", "PostgreSQL"]
    },
    {
      name: "工具",
      level: "熟练",
      keywords: ["Git", "Docker", "VS Code", "Figma"]
    }
  ],
  projects: [
    {
      name: "个人博客",
      description: "基于 Next.js 开发的个人技术博客",
      highlights: [
        "使用 Next.js App Router",
        "支持浅色/深色主题",
        "SEO 优化完善"
      ],
      keywords: ["Next.js", "TypeScript", "Tailwind CSS"],
      url: "https://blog.example.com"
    }
  ],
  awards: [
    {
      title: "优秀员工",
      date: "2024-01",
      awarder: "某互联网公司"
    }
  ],
  languages: [
    {
      language: "中文",
      fluency: "母语"
    },
    {
      language: "英语",
      fluency: "CET-6"
    }
  ],
  interests: [
    {
      name: "开源贡献",
      keywords: ["React", "Next.js"]
    },
    {
      name: "技术写作",
      keywords: ["博客", "分享"]
    }
  ],
  references: [
    {
      name: "李四",
      reference: "张三是一位出色的前端工程师，代码质量高，团队协作能力强。",
      position: "技术经理"
    }
  ]
};
