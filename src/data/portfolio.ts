// ==================== TYPES ====================

export interface Social {
  name: string;
  url: string;
  icon: string; // Lucide icon name
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeroData {
  name: string;
  tagline: string;
  subtitle: string;
  socials: Social[];
}

export interface AboutData {
  bio: string;
  photo: string;
  facts: { label: string; value: string }[];
  interests: string[];
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  role: string;
  timeline: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "venture" | "project" | "experiment";
  featured: boolean;
  challenge: string;
  approach: string;
  solution: string;
  solutionImages: string[];
  impact: string;
  reflection: string;
  pullQuote?: string;
  order: number;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; icon?: string }[];
}

export interface ContactData {
  email: string;
  formAction: string;
  location: string;
  socials: Social[];
  resumeUrl?: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education" | "startup" | "achievement";
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  keywords: string;
  url: string;
  ogImage: string;
}

// ==================== SITE CONFIG ====================

export const siteConfig: SiteConfig = {
  title: "Shivansh Fulper — AI Systems, Startups, Infrastructure",
  description:
    "AI engineer and startup founder. CTO at OneSync, building cognitive performance wearables. Co-founder of EcoFresh Greensync, building decentralized waste-to-value infrastructure. Portfolio, case studies, and writing.",
  author: "Shivansh Fulper",
  keywords:
    "Shivansh Fulper, AI Engineer, OneSync, EcoFresh Greensync, Atlan, LLM, RAG, Agentic Systems, Cognitive Wearables, Waste-to-Value, IIITDM Jabalpur",
  url: "https://shivanshfulper.com",
  ogImage: "/images/og-image.png",
};

// ==================== NAVIGATION ====================

export const navItems: NavItem[] = [
  { label: "Ventures", href: "#ventures" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

// ==================== HERO ====================

export const heroData: HeroData = {
  name: "Shivansh Fulper",
  tagline: "I build AI systems that ship.",
  subtitle: "CTO & Co-founder @ OneSync · Co-founder @ EcoFresh Greensync · IIITDM Jabalpur '26",
  socials: [
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/shivanshfulper/",
    },
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/Pin4sf",
    },
    {
      name: "X",
      icon: "twitter",
      url: "https://x.com/shivanshfulper",
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://instagram.com/pin4sf",
    },
  ],
};

// ==================== ABOUT ====================

export const aboutData: AboutData = {
  bio: `I build AI systems at the infrastructure level — not wrappers, not demos, real pipelines that process data at scale and make decisions autonomously.

As CTO of OneSync, I'm building the intelligence layer that turns wearable biosignals into cognitive readiness scores. I also co-founded EcoFresh Greensync — a decentralized waste-to-value infrastructure company with 3 IP discoveries and recognition at the Hult Prize. At Atlan, I build AI-native developer agents. At Soket AI Labs, I built multilingual dataset pipelines for Indic LLM training.

I'm a final-year B.Tech student at IIITDM Jabalpur. I think in systems. I ship fast. And I'd rather fail at 20 than wait until I'm "qualified."`,
  photo: "/Shivansh.jpg",
  facts: [
    { label: "Location", value: "Nagpur, India" },
    { label: "Education", value: "B.Tech '26, IIITDM Jabalpur" },
    { label: "Focus", value: "AI Systems · Startups · Infrastructure" },
    { label: "Currently", value: "CTO @ OneSync · AI Engineer @ Atlan" },
  ],
  interests: ["Anime", "Gaming", "Music", "Systems Thinking"],
};

// ==================== CASE STUDIES ====================

export const caseStudies: CaseStudy[] = [
  {
    slug: "onesync",
    name: "OneSync",
    tagline: "Beyond vital signs. Into the mind.",
    heroImage: "/images/projects/onesync.jpg",
    role: "Co-Founder & CTO",
    timeline: "2026 — Present",
    techStack: ["AI/ML", "Biosignal Processing", "Edge Computing", "React", "TypeScript"],
    liveUrl: "https://onesync-website-zs1p.vercel.app/",
    category: "venture",
    featured: true,
    challenge:
      "A pilot sleeps seven hours, clears a medical check, and still makes a bad call — three days of accumulated stress have worn him down. In high-pressure jobs like aviation, defense, sports, and emergency medicine, people make serious decisions constantly, but there's no practical way to tell if they're cognitively ready. What exists today is guesswork: self-reporting, gut feelings, or a fitness tracker showing heart rate at 72 and a good sleep score. None of that tells you whether someone can think clearly under pressure right now.",
    approach:
      "We built OneBand — a wristband that reads multiple body signals (heart rhythm, skin response, motion, muscle tension) and cross-checks them to produce a cognitive readiness index. The system stays quiet when it's not confident — in environments where a bad call has real consequences, showing nothing is better than a false green light. Built for institutions from day one: training academies, defense units, elite sports teams. Dashboards designed around how teams actually operate, not just how individuals track personal fitness.",
    solution:
      "OneSync is a cognitive performance platform. OneBand captures biosignals 24/7 and an AI interpretation layer translates raw data into readiness scores, recovery trends, and actionable guidance. Think of it as a fuel gauge for the brain — not a diagnosis, not a mood ring, just a reliable indicator that a coach, training officer, or team lead can glance at and act on. The system builds a personal digital twin that learns individual baselines and adapts over time.",
    solutionImages: ["/images/projects/onesync.jpg"],
    impact:
      "Active development with hardware prototyping underway. Early concept testing with athletes. Team of 4 (CEO, CTO, COO, CPO) with backgrounds spanning biosensing, AI systems, manufacturing, and product hardware. Pursuing HIPAA and FDA compliance pathways.",
    reflection:
      "Consumer wearables track fitness. Medical systems work in labs. Nothing practical sits in the middle. That's the gap — and closing it requires building trust before building features. The hardest part isn't the AI. It's earning confidence from institutions that can't afford false signals.",
    pullQuote:
      "The hardest engineering decision was building a system that stays silent when it isn't confident — because in environments where a bad call has real consequences, showing nothing is better than a false green light.",
    order: 1,
  },
  {
    slug: "ecofresh",
    name: "EcoFresh Greensync",
    tagline: "Waste-to-value infrastructure. No segregation required.",
    heroImage: "/images/projects/ecofresh.png",
    role: "Co-Founder",
    timeline: "Nov 2025 — Present",
    techStack: ["AI/ML", "Polymer Modeling", "Bio-processing", "Catalytic Systems"],
    liveUrl: "https://www.ecofreshgreensync.com/",
    category: "venture",
    featured: true,
    challenge:
      "India's municipal waste system assumes perfect segregation. It never happens. Mixed waste ends up in landfills, and existing solutions — composters, recycling gadgets, dashboard companies — all break down when they encounter the messy reality of unsorted waste at scale. The fundamental problem isn't motivation. It's infrastructure that can't handle the input it actually receives.",
    approach:
      "We designed modular Eco-Converter units that accept mixed municipal solid waste as-is and process it through staged biological and catalytic pathways. No dependency on perfect segregation, no reliance on continuous skilled manpower, no silent failure modes. The first high-value output pathway is PHA-class biodegradable polymers, with secondary streams like bio-fertilizer and eco-composites.",
    solution:
      "EcoFresh Greensync is a decentralized waste-to-value infrastructure company. Eco-Converters deploy at the point of waste generation — institutions, municipal zones, campuses, hospitals — and convert mixed waste into standardized, recoverable outputs. AI modeling is used to explore biodegradable material design and bridge computational discovery with real-world processing constraints.",
    solutionImages: ["/images/projects/ecofresh.png"],
    impact:
      "Registered as EcoFresh Greensync LLP. MSME (Udyam) registered as Micro Enterprise. Incubated at IIITDM Jabalpur under the Institution's Innovation Council (Ministry of Education). 16th among 2,500+ teams at Hult Prize, IIT Bombay. National recognition from Ministry of Education. 3 IP discoveries with patent filing procedures documented for Indian Patent Office and international PCT routes.",
    reflection:
      "Deep-tech without a clear go-to-market path becomes a science project. Distribution beats brilliance. Vision must be matched with execution speed. That lesson directly shapes how I approach everything I build — earn trust before building scale.",
    pullQuote:
      "We ran 47 polymer simulations before finding a PHA pathway that worked with unsorted municipal waste — the kind of iteration that separates research from real infrastructure.",
    order: 2,
  },
];

// ==================== SKILLS ====================

export const skillCategories: SkillCategory[] = [
  {
    name: "AI & ML Systems",
    skills: [
      { name: "Large Language Models" },
      { name: "RAG & GraphRAG" },
      { name: "Agentic Systems" },
      { name: "Biosignal Processing" },
      { name: "NER & NLP Pipelines" },
      { name: "Dataset Curation" },
      { name: "Memory-Augmented AI" },
    ],
  },
  {
    name: "Engineering",
    skills: [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "Next.js", icon: "devicon-nextjs-original" },
      { name: "React", icon: "devicon-react-original" },
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "Redis" },
    ],
  },
  {
    name: "Infrastructure",
    skills: [
      { name: "Distributed Systems" },
      { name: "Data Pipeline Design" },
      { name: "Edge Computing" },
      { name: "API Architecture" },
      { name: "Docker", icon: "devicon-docker-plain" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "Linux", icon: "devicon-linux-plain" },
      { name: "Figma", icon: "devicon-figma-plain" },
      { name: "PyTorch" },
      { name: "TensorFlow", icon: "devicon-tensorflow-original" },
    ],
  },
];

export const currentlyExploring =
  "MoE Architectures, AI-Native Development Environments, and Cognitive Computing";

// ==================== TIMELINE ====================

export const timelineData: TimelineEntry[] = [
  {
    year: "2026",
    title: "AI Engineer Intern",
    organization: "Atlan",
    description:
      "Building AI-native SDLC agents — autonomous debugging, GraphRAG retrieval, and long-term agent memory systems for developer workflows.",
    type: "work",
  },
  {
    year: "2026",
    title: "Co-Founder & CTO",
    organization: "OneSync",
    description:
      "Building cognitive performance wearables. AI interpretation layer that turns biosignals into readiness scores for high-pressure environments.",
    type: "startup",
  },
  {
    year: "2025",
    title: "Co-Founder",
    organization: "EcoFresh Greensync",
    description:
      "Decentralized waste-to-value infrastructure. 3 IP discoveries, Hult Prize recognition (16th/2500+ at IIT Bombay), Ministry of Education national recognition.",
    type: "startup",
  },
  {
    year: "2025",
    title: "Member of Technical Staff Intern",
    organization: "Soket AI Labs",
    description:
      "Built multilingual dataset pipelines for Indic LLM training (Project Eka). Deduplication, quality filtering, and language alignment at scale. Collaboration with IIT Gandhinagar.",
    type: "work",
  },
  {
    year: "2024",
    title: "AI Engineer Intern",
    organization: "OpenFn (C4GT)",
    description:
      "NLP-to-workflow pipeline for government-tech data integrations. Selected under the Code for GovTech national open-source program.",
    type: "work",
  },
  {
    year: "2022",
    title: "B.Tech — Smart Manufacturing",
    organization: "IIITDM Jabalpur",
    description:
      "B.Tech in Smart Manufacturing at a national institute of design and manufacturing. Coursework in AI/ML, mechatronics, and systems design — bridging software intelligence with physical-world engineering.",
    type: "education",
  },
];

// ==================== CONTACT ====================

export const contactData: ContactData = {
  email: "piyushfulper3210@gmail.com",
  formAction: "https://formsubmit.co/piyushfulper3210@gmail.com",
  location: "Nagpur, India",
  socials: [
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/shivanshfulper/",
    },
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/Pin4sf",
    },
    {
      name: "X",
      icon: "twitter",
      url: "https://x.com/shivanshfulper",
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://instagram.com/pin4sf",
    },
  ],
};

// ==================== HELPERS ====================

export function getFeaturedWork(): CaseStudy[] {
  return caseStudies
    .filter((cs) => cs.featured)
    .sort((a, b) => a.order - b.order);
}

export function getVentures(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.category === "venture");
}

export function getProjects(): CaseStudy[] {
  return caseStudies
    .filter((cs) => cs.category === "project" || cs.category === "experiment")
    .sort((a, b) => a.order - b.order);
}
