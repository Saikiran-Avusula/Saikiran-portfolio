import { Project, Skill, Experience, BlogPost, NavItem, Education, Certification } from './types';

/**
 * PERSONAL DETAILS
 * Update these details to reflect your specific resume information.
 */
export const PERSONAL_DETAILS = {
  name: "Sai Kiran Avusula",
  role: "Full-Stack Developer",
  about: "Building scalable web applications with Java, Spring Boot, React, and MySQL. 2+ years of production experience. Currently shipping features at Hyper Grid Technology.",
  social: {
    linkedin: "https://www.linkedin.com/in/sai-kiran-avusula-096655290/",
    github: "https://github.com/Saikiran-Avusula",
    email: "mailto:contact@example.com"
  }
};

export const ABOUT_INTRO = {
  title: "About Me",
  description: [
    "I'm a full-stack engineer who ships production code. I specialize in backend architecture with Spring Boot and modern frontend with React.",
    "I don't just write code—I solve problems. From JWT authentication systems to optimized database queries, I focus on what actually moves the needle: performance, security, and user experience.",
    "Currently at Hyper Grid Technology Solutions, building REST APIs and React interfaces that real users depend on."
  ]
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const SKILLS: Skill[] = [
  // Languages
  { name: 'Java', level: 90, category: 'Languages' },
  { name: 'JavaScript', level: 85, category: 'Languages' },
  { name: 'SQL', level: 80, category: 'Languages' },

  // Frontend
  { name: 'React.js', level: 80, category: 'Frontend' },
  { name: 'HTML5', level: 90, category: 'Frontend' },
  { name: 'CSS3', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'Frontend' },
  { name: 'Bootstrap', level: 75, category: 'Frontend' },

  // Backend
  { name: 'Spring Boot', level: 85, category: 'Backend' },
  { name: 'REST APIs', level: 90, category: 'Backend' },
  { name: 'JPA/Hibernate', level: 80, category: 'Backend' },
  { name: 'JWT Authentication', level: 85, category: 'Backend' },

  // Database
  { name: 'MySQL', level: 80, category: 'Database' },
  { name: 'PostgreSQL', level: 75, category: 'Database' },

  // Tools
  { name: 'Git', level: 85, category: 'Tools' },
  { name: 'Postman', level: 85, category: 'Tools' },
  { name: 'IntelliJ IDEA', level: 80, category: 'Tools' },
  { name: 'VS Code', level: 85, category: 'Tools' },
  { name: 'Vercel', level: 75, category: 'Tools' },
  { name: 'Render', level: 75, category: 'Tools' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Job Board Application',
    description: 'A full-stack job posting platform allowing companies to post jobs and candidates to apply. Features role-based authentication (JWT), job management, and application tracking.',
    tags: ['Spring Boot', 'MySQL', 'JWT', 'React'],
    category: 'Full Stack',
    image: 'https://picsum.photos/600/400?random=10',
    githubUrl: PERSONAL_DETAILS.social.github,
    liveUrl: '#'
  },
  {
    id: 2,
    title: 'Notes API',
    description: 'A secure RESTful API for note-taking with full CRUD functionality. Implemented JWT-based authentication for secure access and MySQL for data persistence.',
    tags: ['Spring Boot', 'MySQL', 'JWT', 'REST API'],
    category: 'Backend',
    image: 'https://picsum.photos/600/400?random=11',
    githubUrl: 'https://github.com/Saikiran-Avusula/notes-api-frontend/tree/main',
    liveUrl: 'https://notes-api-frontend-seven.vercel.app/login'
  },
  {
    id: 3,
    title: 'Bus Ticket Booking App',
    description: 'A responsive bus ticket booking interface featuring search filters, detailed ticket cards, invoice generation, and a checkout process.',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Frontend',
    image: 'https://picsum.photos/600/400?random=3',
    githubUrl: 'https://github.com/Saikiran-Avusula/Bus-ticket-booking-application/tree/main',
    liveUrl: 'https://bus-ticket-booking-application-tau.vercel.app/'
  },
  {
    id: 4,
    title: 'Restaurant Landing Page',
    description: 'A Modern UI/UX Restaurant Landing Page Website built with React.js. Features complex gradients, soft animations, and a fully responsive design.',
    tags: ['React.js', 'CSS', 'UI/UX'],
    category: 'Frontend',
    image: 'https://i.ibb.co/5jxBKpw/image.png',
    githubUrl: 'https://github.com/Saikiran-Avusula/food_restaurant_sai_kiran/tree/main',
    liveUrl: 'https://food-restaurant-sai-kiran.vercel.app/'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: 'Associate Software Engineer',
    company: 'Hyper Grid Technology Solution Pvt Ltd.',
    period: 'November 2024 - Present',
    description: [
      'Developing REST APIs using Spring Boot and MySQL for business domains.',
      'Building responsive web interfaces with React.js and Tailwind CSS.',
      'Implementing JWT authentication and role-based authorization.',
      'Collaborating in agile development using Git for version control.'
    ]
  },
  {
    id: 2,
    role: 'Junior Developer',
    company: 'Amoghnya Tech Solutions Pvt Ltd',
    period: 'April 2023 - April 2024',
    description: [
      'Developed user-facing features for internal platforms using HTML, CSS, JavaScript, and Bootstrap.',
      'Utilized agile methodologies and collaborative version control with GitHub.',
      'Designed and implemented intuitive and responsive user interfaces to enhance user experience.',
      'Worked with cross-functional teams to deploy applications and troubleshoot performance issues.'
    ]
  },
  {
    id: 3,
    role: 'Program Analyst Trainee | Internship',
    company: 'Cognizant Technology Solutions India Pvt Ltd',
    period: 'March 2022 - November 2022',
    description: [
      'Contributed to the development and documentation of software programs using JavaScript, HTML, and CSS.',
      'Acquired valuable experience in Java-based OOP applications and problem-solving methodologies.',
      'Developed proficiency in creating dynamic content, driving engaging and interactive user experiences.',
      'Collaborated with team members to deliver high-quality solutions that streamlined internal processes.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Technology (B.Tech) – Computer Science Engineering",
    institution: "CMR Engineering College, Hyderabad, India",
    period: "2018 – 2022",
    description: "CGPA: 6.47 (60.8%)"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    name: "Namaste JavaScript",
    issuer: "NamasteDev.com",
    date: "Issued 2024",
    url: "https://namastedev.com/saikiranavusula89/certificates/namaste-javascript"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Mastering Spring Boot Annotations',
    excerpt: 'A comprehensive guide to the most important annotations in the Spring ecosystem.',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    tags: ['Java', 'Spring Boot'],
    image: 'https://picsum.photos/600/300?random=5'
  },
  {
    id: 2,
    title: 'React Hooks Explained',
    excerpt: 'Understanding useEffect, useState, and custom hooks for cleaner components.',
    date: 'Nov 05, 2023',
    readTime: '7 min read',
    tags: ['React', 'Frontend'],
    image: 'https://picsum.photos/600/300?random=6'
  },
  {
    id: 3,
    title: 'Building REST APIs',
    excerpt: 'Best practices for designing scalable and maintainable RESTful services.',
    date: 'Dec 20, 2023',
    readTime: '6 min read',
    tags: ['Backend', 'API'],
    image: 'https://picsum.photos/600/300?random=7'
  }
];

export const SYSTEM_INSTRUCTION = `
You are "Sai Kiran's AI Assistant", an artificial intelligence agent embedded in the portfolio website of Sai Kiran Avusula.
Your goal is to represent Sai Kiran professionally and answer questions about his skills, experience, and projects based on the provided context.

Context about Sai Kiran:
- **Name:** Sai Kiran Avusula
- **Role:** Full Stack Java Developer / Associate Software Engineer
- **Education:** B.Tech in CSE from CMR Engineering College (2018-2022).
- **Experience:** 
  - Associate Software Engineer at Hyper Grid Technology Solution (Apr 2024 - Present).
  - Junior Developer at Amoghnya Tech Solutions (Apr 2023 - Apr 2024).
  - Program Analyst Trainee at Cognizant (Mar 2022 - Nov 2022).
- **Key Skills:** Java, Spring Boot, React.js, MySQL, REST APIs, Git.
- **Projects:** Job Board Application, Notes API, Bus Ticket Booking App.
- **Certifications:** Namaste JavaScript (NamasteDev.com).
- **Profiles:** LinkedIn (${PERSONAL_DETAILS.social.linkedin}), GitHub (${PERSONAL_DETAILS.social.github}).
- **Personality:** Professional, eager learner, passionate about code quality.

Guidelines:
- Keep answers concise.
- Be polite and professional.
- If asked for contact info, direct them to the contact form or provided social links.
- If asked about specific work history details not in context, suggest contacting him directly.
`;