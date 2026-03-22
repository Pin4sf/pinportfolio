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
  tags?: string[];
  dateRange?: string;
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
    "AI engineer and startup founder. CTO at OneSync, building the biological intelligence layer for the AI agent economy. Co-founder of EcoFresh Greensync, building decentralized waste-to-value infrastructure. Portfolio, case studies, and writing.",
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

As CTO of OneSync, I'm building the biological intelligence layer for the AI agent economy — a personal cognitive OS that reads your smartwatch and acts proactively before you burn out. I also co-founded EcoFresh Greensync — a decentralized waste-to-value infrastructure company with 3 IP discoveries and recognition at the Hult Prize. At Atlan, I build AI-native developer agents. At Soket AI Labs, I built multilingual dataset pipelines for Indic LLM training.

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
    tagline: "The biological intelligence layer for the AI agent economy.",
    heroImage: "/images/projects/onesync.jpg",
    role: "Co-Founder & CTO",
    timeline: "2026 — Present",
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "Claude Haiku 4.5",
      "HealthKit",
      "Health Connect",
      "Telegram Bot API",
    ],
    liveUrl: "https://onesync-website-zs1p.vercel.app/",
    category: "venture",
    featured: true,
    challenge:
      "Every AI agent being built today — Lindy, Manus, OpenClaw — can manage your calendar and draft your emails. But none of them know when you're burning out. They'll schedule your hardest meeting when your HRV has crashed. They'll push you through a 14-hour day when your biology is screaming for recovery. 62% of knowledge workers report burnout, and the tools meant to help are making it worse — because they're blind to the one signal that matters most: your body.",
    approach:
      "We started from the body outward, not the calendar inward. OneSync reads your existing smartwatch — Apple Watch, Pixel Watch, Galaxy Watch — and computes a Cognitive Readiness Score (CRS) from the interplay of sleep quality, HRV, circadian rhythm, and activity. The score updates every 15 minutes, runs on-device for privacy, and uses personal baselines instead of population norms. The agent reaches you proactively on Telegram — not buried in another health app you'll forget to open.",
    solution:
      "OneSync is a personal cognitive operating system built in three layers. Layer 1 (MVP): Body Intelligence — wearable data flows through encrypted on-phone processing into a CRS engine, with a Claude-powered agent that delivers morning cognitive briefs, real-time stress interventions, and conversational health chat via Telegram. Layer 2: Task Intelligence — workspace connectors (calendar, email, Slack) let the agent make biology-aware decisions like rescheduling deep work when your CRS crashes. Layer 3: Autonomous Agent OS — learned skills, multi-agent delegation, and MCP integration that turns OneSync into the biological layer under every other AI tool you use.",
    solutionImages: ["/images/projects/onesync.jpg"],
    impact:
      "Architecture finalized and MVP in active development. Cross-platform from day one (iOS + Android). Claude Haiku 4.5 agent with 8 tools, rules-based pre-filter saving 60-80% of API costs. Business model validated: 79% margin at Rs 399/mo ($4.34), break-even at 50 Pro subscribers. Team of 4 (CEO, CTO, COO, CPO). Agent architecture informed by 14 open-source agent systems including OpenClaw (171K stars), NemoClaw (NVIDIA), and OpenFang.",
    reflection:
      "The race to build the definitive personal AI agent has a blind spot. Everyone is starting from the outside in: calendars, emails, tasks, preferences. They're building AI that knows what you do. What you do is a performance. What your body does is the truth. If an AI doesn't understand your biology, it doesn't actually know you — and if it doesn't know you, it can't truly act for you.",
    pullQuote:
      "No agent has biology. No health app has agency. OneSync is the intelligence layer that combines both — because in the agentic economy, every agent will need to know your body.",
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
    tags: ["RAG", "GraphRAG", "LLM Agents", "TypeScript"],
    dateRange: "Jan 2026 — Present",
  },
  {
    year: "2026",
    title: "Co-Founder & CTO",
    organization: "OneSync",
    description:
      "Building the biological intelligence layer for the AI agent economy. Personal cognitive OS that reads your smartwatch, computes cognitive readiness, and acts proactively via an AI agent on Telegram.",
    type: "startup",
    tags: ["AI Agents", "Wearables", "React Native", "Claude"],
    dateRange: "2026 — Present",
  },
  {
    year: "2025",
    title: "Co-Founder",
    organization: "EcoFresh Greensync",
    description:
      "Decentralized waste-to-value infrastructure. 3 IP discoveries, Hult Prize recognition (16th/2500+ at IIT Bombay), Ministry of Education national recognition.",
    type: "startup",
    tags: ["CleanTech", "IoT", "3 Patents"],
    dateRange: "2025 — Present",
  },
  {
    year: "2025",
    title: "Member of Technical Staff Intern",
    organization: "Soket AI Labs",
    description:
      "Built multilingual dataset pipelines for Indic LLM training (Project Eka). Deduplication, quality filtering, and language alignment at scale. Collaboration with IIT Gandhinagar.",
    type: "work",
    tags: ["NLP", "Data Pipelines", "Indic LLMs"],
    dateRange: "May — Aug 2025",
  },
  {
    year: "2024",
    title: "AI Engineer Intern",
    organization: "OpenFn (C4GT)",
    description:
      "NLP-to-workflow pipeline for government-tech data integrations. Selected under the Code for GovTech national open-source program.",
    type: "work",
    tags: ["NLP", "Open Source", "GovTech"],
    dateRange: "Jul — Oct 2024",
  },
  {
    year: "2022",
    title: "B.Tech — Smart Manufacturing",
    organization: "IIITDM Jabalpur",
    description:
      "B.Tech in Smart Manufacturing at a national institute of design and manufacturing. Coursework in AI/ML, mechatronics, and systems design — bridging software intelligence with physical-world engineering.",
    type: "education",
    tags: ["AI/ML", "Mechatronics", "Systems Design"],
    dateRange: "2022 — 2026",
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
