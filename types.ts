import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: 'Backend' | 'Frontend' | 'Full Stack' | 'AI';
  image: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}