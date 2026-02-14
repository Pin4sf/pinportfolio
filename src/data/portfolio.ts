// ==================== HERO ====================
export const heroData = {
  greeting: "Hi, My name is",
  name: "SHIVANSH FULPER",
  taglines: [
    "Full Stack Developer",
    "ML Enthusiast",
    "Startup Founder",
    "Have a Zeal for tech",
    "Building the Future",
  ],
  subtitle: "Founder @ OneSync | IIITDM Jabalpur",
  socials: [
    { name: "LinkedIn", icon: "uil-linkedin-alt", url: "https://www.linkedin.com/in/shivansh-fulper-463968223/" },
    { name: "Instagram", icon: "uil-instagram", url: "https://instagram.com/pin4sf" },
    { name: "GitHub", icon: "uil-github", url: "https://github.com/Pin4sf" },
    { name: "Twitter", icon: "uil-twitter-alt", url: "https://twitter.com/FulperShivansh" },
    { name: "Telegram", icon: "uil-telegram-alt", url: "https://telegram.me/Pin4sf" },
  ],
};

// ==================== SKILLS ====================
export const skillsData = {
  categories: [
    "Frontend", "Backend", "Data Science",
    "Machine Learning", "Data Analytics", "UI/UX",
    "Web Design", "3D Modeling", "Motion Graphics",
    "Prompt Engineering", "DevOps",
  ],
  tools: [
    { name: "GSAP", icon: "" },
    { name: "WebGL", icon: "" },
    { name: "Three.js", icon: "" },
    { name: "Next.js", icon: "devicon-nextjs-original" },
    { name: "Sci-kit Learn", icon: "" },
    { name: "Data Visualization", icon: "" },
    { name: "Blender", icon: "devicon-blender-original" },
    { name: "Figma", icon: "devicon-figma-plain" },
    { name: "Adobe Premiere Pro", icon: "devicon-premierepro-plain" },
    { name: "Git", icon: "devicon-git-plain" },
    { name: "Github", icon: "devicon-github-original" },
    { name: "SQL", icon: "devicon-mysql-plain" },
    { name: "Pandas", icon: "devicon-pandas-plain" },
    { name: "Numpy", icon: "devicon-numpy-original" },
    { name: "Matplotlib", icon: "devicon-matlab-plain" },
    { name: "Tensorflow", icon: "devicon-tensorflow-original" },
    { name: "Python", icon: "devicon-python-plain" },
    { name: "TypeScript", icon: "devicon-typescript-plain" },
    { name: "CSS", icon: "devicon-css3-plain" },
    { name: "JavaScript", icon: "devicon-javascript-plain" },
    { name: "Node.js", icon: "devicon-nodejs-plain" },
    { name: "React", icon: "devicon-react-original" },
    { name: "Express", icon: "devicon-express-original" },
    { name: "MongoDB", icon: "devicon-mongodb-plain" },
    { name: "Docker", icon: "devicon-docker-plain" },
    { name: "Linux", icon: "devicon-linux-plain" },
  ],
};

// ==================== ABOUT ====================
export const aboutData = {
  profile: {
    image: "/images/expme/me1.png",
    tags: ["Explorer", "Gamer & Anime lover", "Jamming Music in free time"],
  },
  slides: [
    {
      title: "About Me",
      content: `When I'm not geeking on code, you'll find me watching Anime or playing Video Games.
I'm a student at IIITDM Jabalpur, pursuing my B.Tech in Smart Manufacturing. I'm a Full Stack Developer, ML Enthusiast, and the founder of OneSync — building tools that make collaboration seamless. I'm a quick learner and a team player, always ready to explore new technologies. I also co-founded EcoFresh, a sustainability-focused startup. You'll find me working on technologies I've seen in a cool project or any movie/show I've watched recently. Always ready to take up new challenges.`,
    },
    {
      title: "Current Technologies I'm Exploring",
      techLists: [
        ["Next.js | React | TypeScript", "Node.js | Express | Python", "Git | GitHub | Open Source", "SQL | MongoDB | Redis"],
        ["Pandas | Numpy | Sci-kit Learn", "Matplotlib | Plotly", "Three.js | WebGL | GSAP", "Docker | DevOps"],
      ],
      exploring: "DevOps, Web3, Deep Learning, AI Agents, and System Design...",
    },
  ],
};

// ==================== STARTUPS ====================
export interface Project {
  slug: string;
  index: number;
  subtitle: string;
  name: string;
  abbreviation: string;
  image: string;
  github: string;
  live: string;
  tags: string[];
  description?: string;
}

export const projectsData: Project[] = [
  {
    slug: "onesync",
    index: 1,
    subtitle: "Real-time collaboration platform for teams",
    name: "OneSync",
    abbreviation: "Startup",
    image: "/images/projects/4.png",
    github: "https://github.com/Pin4sf",
    live: "https://onesync-website-zs1p.vercel.app/",
    tags: ["Next.js", "TypeScript", "Real-time", "WebSockets", "MongoDB"],
    description: "OneSync is a real-time collaboration platform designed to make teamwork seamless. Built with Next.js and WebSocket technology for instant synchronization.",
  },
  {
    slug: "ecofresh",
    index: 2,
    subtitle: "Sustainability-focused food delivery startup",
    name: "EcoFresh",
    abbreviation: "Startup",
    image: "/images/projects/6.png",
    github: "https://github.com/Pin4sf",
    live: "https://www.ecofreshgreensync.com/",
    tags: ["React", "Node.js", "Sustainability", "Full Stack"],
    description: "EcoFresh is a sustainability-focused startup aiming to reduce food waste and promote eco-friendly delivery solutions.",
  },
];

// ==================== FAQ ====================
export const faqData = [
  {
    question: "What am I currently working on?",
    answer: "I'm building OneSync, a real-time collaboration platform, and EcoFresh, a sustainability-focused startup. Alongside, I keep exploring new tech, building side projects, and contributing to open source.",
  },
  {
    question: "What's my tech stack?",
    answer: "Primarily Next.js, TypeScript, React for frontend. Node.js, Express, MongoDB for backend. Python, Pandas, Sci-kit Learn for data science. Three.js, GSAP, WebGL for creative dev. Currently diving deeper into DevOps and AI.",
  },
  {
    question: "Will you collaborate on any project?",
    answer: "Absolutely! Ping me on my socials and I'll get back to you as soon as possible. Always excited about interesting collaborations.",
  },
  {
    question: "Is there any charge to work with me?",
    answer: "That depends on the size and complexity of the project. I'm open to work on any project. I can work for free if the project is interesting and I can learn something new from it.",
  },
  {
    question: "What are your Anime, Movies, Games and Manga recommendations?",
    answer: "Well, if you want my currently ongoing watch list and my recommendations — reach out to me! Always happy to discuss.",
  },
];

// ==================== CONTACT ====================
export const contactData = {
  formAction: "https://formsubmit.co/shivanshfulper690@gmail.com",
  profile: {
    image: "/images/expme/me2.jpeg",
    name: "SHIVANSH FULPER",
    title: "Developer & Founder",
    emails: ["shivanshfulper690@gmail.com", "22bsm054@iiitdmj.ac.in"],
    location: { city: "Nagpur, Maharashtra", country: "INDIA" },
  },
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shivansh-fulper-463968223/" },
    { name: "Github", url: "https://github.com/Pin4sf" },
    { name: "Twitter", url: "https://twitter.com/FulperShivansh" },
    { name: "Instagram", url: "https://instagram.com/pin4sf" },
  ],
};

// ==================== NAV ====================
export const navItems = [
  { label: "Home", href: "#Home" },
  { label: "Explore", href: "#explore", hideOnMobile: true },
  { label: "Startups", href: "#startups" },
  { label: "FAQ", href: "#FAQ", hideOnMobile: true },
];

// ==================== META ====================
export const siteConfig = {
  title: "SHIVANSH FULPER - Pin4sf",
  description: "Full Stack Developer, ML Enthusiast, and Startup Founder. Building OneSync & EcoFresh. IIITDM Jabalpur.",
  author: "Shivansh Fulper",
  keywords: "Shivansh Fulper, pin4sf, IIITDM Jabalpur, OneSync, EcoFresh, Full Stack Developer",
};
