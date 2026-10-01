import { Project, Skill, Experience, NavItem, Education, Certification } from './types';

/**
 * PERSONAL DETAILS
 * Update these details to reflect your specific resume information.
 */
export const PERSONAL_DETAILS = {
  name: "Sai Kiran Avusula",
  role: "Full-Stack Developer",
  about: "Building full-stack web applications with Java, Spring Boot, React.js, and MySQL. 2 years of experience, including internship.",
  social: {
    linkedin: "https://www.linkedin.com/in/sai-kiran-avusula-096655290/",
    github: "https://github.com/Saikiran-Avusula",
    email: "mailto:contact@example.com"
  }
};

export const ABOUT_INTRO = {
  title: "About Me",
  description: [
    "I'm a full-stack developer with 2 years of experience, including an internship. I work mostly on the backend with Java, Spring Boot, and MySQL, and build the React frontends that sit on top of it.",
    "I care about getting the basics right: secure JWT login, role-based access, and database queries tuned with indexing. I've built and deployed full-stack apps end to end, from schema design to hosting on Render and Vercel.",
    "I worked at Hyper Grid Technology Solutions as an Associate Software Engineer, building REST APIs and improving database performance."

  ]
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
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
    title: 'Papikondalu Tourism — Regional Tourism Platform',
    description: 'A comprehensive tourism website for Papikondalu and East Godavari region. Built with Next.js 15 and TypeScript featuring tour packages, booking system, image gallery with lazy loading, WhatsApp integration, and SEO optimization with Lighthouse scores above 90.',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React', 'Node.js', 'Vercel'],
    category: ['Frontend'],
    image: '/papikondalu.jpg',
    githubUrl: PERSONAL_DETAILS.social.github,
    liveUrl: 'https://papikondalu01-lemon.vercel.app/'
  },
  {
    id: 2,
    title: 'SLSIT Skillup — Educational Platform',
    description: 'A fully responsive educational platform for SLSIT Skillup offering technology courses and career training. Features dynamic course catalog, enrollment system, contact form with Node.js backend, glassmorphism UI, gradient animations, and particle backgrounds built with React 18 and Vite.',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Lucide React', 'Node.js', 'Vite'],
    category: ['Frontend'],
    image: '/slsit.jpg',
    githubUrl: PERSONAL_DETAILS.social.github,
    liveUrl: 'https://slsitskillup-phi.vercel.app/'
  },
  {
    id: 3,
    title: 'Bus Ticket Booking App',
    description: 'A responsive bus ticket booking interface featuring search filters, detailed ticket cards, invoice generation, and a checkout process.',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    category: ['Frontend'],
    image: 'https://picsum.photos/600/400?random=3',
    githubUrl: 'https://github.com/Saikiran-Avusula/Bus-ticket-booking-application/tree/main',
    liveUrl: 'https://bus-ticket-booking-application-tau.vercel.app/'
  },
  {
    id: 4,
    title: 'Restaurant Landing Page',
    description: 'A Modern UI/UX Restaurant Landing Page Website built with React.js. Features complex gradients, soft animations, and a fully responsive design.',
    tags: ['React.js', 'CSS', 'UI/UX'],
    category: ['Frontend'],
    image: 'https://i.ibb.co/5jxBKpw/image.png',
    githubUrl: 'https://github.com/Saikiran-Avusula/food_restaurant_sai_kiran/tree/main',
    liveUrl: 'https://food-restaurant-sai-kiran.vercel.app/'
  },
  {
    id: 5,
    title: 'Stay Finder',
    description: 'A full-stack hotel search and booking platform with paginated search, filters for location, price, rating, and amenities, and JWT login for users and admins.',
    tags: ['Java', 'Spring Boot', 'React.js', 'MySQL'],
    category: ['Backend', 'Frontend', 'Full Stack'],
    image: '/stayfinder.png',
    githubUrl: 'https://github.com/Saikiran-Avusula/Stay_Finder',
    liveUrl: 'https://stay-finder-sage.vercel.app/'
  },
  {
    id: 6,
    title: 'TaskFlow',
    description: 'A task and project tracker with Admin and User roles, priority levels, status workflows (TODO, IN_PROGRESS, DONE), and live dashboard statistics.',
    tags: ['Java', 'Spring Boot', 'React.js', 'MySQL'],
    category: ['Backend', 'Frontend', 'Full Stack'],
    image: '/taskflow.png',
    githubUrl: 'https://github.com/Saikiran-Avusula/Taskflow',
    liveUrl: 'https://taskflow-three-sage-23.vercel.app/'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: 'Associate Software Engineer',
    company: 'Hyper Grid Technology Solution Pvt Ltd',
    period: 'September 2025 - June 2026',
    description: [
      'Built and maintained 15+ REST APIs with Java, Spring Boot, and MySQL, including validations and role-based access control.',
      'Implemented JWT authentication with Spring Security to secure service endpoints.',
      'Tuned JPA queries and added indexes to improve database performance.',
      'Worked with the front-end team to integrate APIs and fix integration issues.'
    ]
  },
  {
    id: 2,
    role: 'Associate UI Developer',
    company: 'Amoghnya Tech Solutions Pvt Ltd',
    period: 'April 2023 - January 2025',
    description: [
      'Built 10+ reusable React.js components with HTML5, CSS3, and JavaScript.',
      'Integrated REST APIs using Axios, with error handling and loading states.',
      'Found and fixed 20+ UI bugs, including cross-browser issues.',
      'Worked with backend engineers to agree on API contracts.'
    ]
  },
  {
    id: 3,
    role: 'Program Analyst Trainee (Internship)',
    company: 'Cognizant Technology Solutions India Pvt Ltd',
    period: 'March 2022 - November 2022',
    description: [
      'Trained in Java, JavaScript, HTML5, and CSS3, with hands-on practice in OOP.',
      'Worked on REST API integration and Git-based version control.',
      'Built small practice applications to apply what I learned.'
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



export const SYSTEM_INSTRUCTION = `
You are "Sai Kiran's AI Assistant", an artificial intelligence agent embedded in the portfolio website of Sai Kiran Avusula.
Your goal is to represent Sai Kiran professionally and answer questions about his skills, experience, and projects based on the provided context.

Context about Sai Kiran:
- **Name:** Sai Kiran Avusula
- **Role:** Full Stack Java Developer / Associate Software Engineer
- **Education:** B.Tech in CSE from CMR Engineering College (2018-2022).
- **Experience:** 
  - Associate Software Engineer at Hyper Grid Technology Solution (September  2025 - June 2026).
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