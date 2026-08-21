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
  interestsLabel: string;
  interests: string[];
}

export interface CaseStudyCard {
  label?: string;
  title: string;
  body: string;
}

export interface CaseStudyExternalLink {
  label: string;
  href: string;
}

export interface CaseStudyMedia {
  src: string;
  alt: string;
  caption: string;
  presentation?: "standard" | "poster" | "portrait";
  source?: CaseStudyExternalLink;
}

export interface CaseStudyMatrix {
  caption: string;
  hint: string;
  columns: {
    pressure: string;
    strategicRole: string;
    fit: string;
    confidence: string;
  };
  rows: Array<{
    pressure: string;
    strategicRole: string;
    fit: string;
    confidence: string;
  }>;
}

export interface CaseStudyNarrativeSection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  cards?: CaseStudyCard[];
  afterword?: string[];
  matrix?: CaseStudyMatrix;
  media?: CaseStudyMedia;
  link?: CaseStudyExternalLink;
  status?: EvidenceStatus;
}

export interface CaseStudyPerson {
  name: string;
  role: string;
  body: string;
}

export interface CaseStudyArtifact {
  kind: "video" | "link";
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface CaseStudyNarrative {
  brandMark?: {
    src: string;
    alt: string;
  };
  heroEyebrow: string;
  heroStatement: string;
  heroQuote?: string;
  heroBody: string;
  heroImageAlt: string;
  heroImageCaption: string;
  sections: CaseStudyNarrativeSection[];
  teamEyebrow: string;
  teamTitle: string;
  teamIntro: string;
  team: CaseStudyPerson[];
  artifactsEyebrow: string;
  artifactsTitle: string;
  artifactsIntro: string;
  artifacts: CaseStudyArtifact[];
  closing: string;
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
  narrative?: CaseStudyNarrative;
  order: number;
}

export interface SkillCategory {
  name: string;
  description?: string;
  evidenceSlugs?: string[];
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
  evidence?: string;
  nextQuestion?: string;
  links?: {
    label: string;
    url: string;
    external?: boolean;
  }[];
}

export type EvidenceStatus =
  | "observed"
  | "built"
  | "demonstrated"
  | "derived"
  | "hypothesis"
  | "direction"
  | "historical";

export type PublicationState = "public" | "historical" | "draft" | "excluded";
export type ArtifactKind =
  | "venture"
  | "research"
  | "writing"
  | "code"
  | "video"
  | "field-note"
  | "life"
  | "source";
export type ArtifactTheme = "models" | "agents" | "world" | "design" | "life";

export interface PublicArtifact {
  slug: string;
  title: string;
  kind: ArtifactKind;
  theme: ArtifactTheme;
  date: string;
  summary: string;
  href: string;
  external?: boolean;
  featured: boolean;
  publicationState: PublicationState;
  evidenceStatus?: EvidenceStatus;
  image?: string;
  caption?: string;
  annotation?: string;
}

export interface ResearchCluster {
  slug: string;
  title: string;
  question: string;
  position: string;
  uncertainty: string;
  artifactSlugs: string[];
}

export interface ResearchPageData {
  eyebrow: string;
  title: string;
  introduction: string;
  metadata: {
    description: string;
    openGraphDescription: string;
  };
  threadLabel: string;
  thread: Array<{ label: string; href: string }>;
  questionLabel: string;
  positionLabel: string;
  uncertaintyLabel: string;
  writingLabel: string;
  artifactsLabel: string;
  emptyWriting: string;
}

export interface ExperiencePageData {
  eyebrow: string;
  title: string;
  introduction: string;
  metadata: {
    description: string;
    openGraphDescription: string;
  };
  chronologyLabel: string;
  evidenceLabel: string;
  nextQuestionLabel: string;
  linksLabel: string;
}

export interface CompassPrinciple {
  title: string;
  body: string;
  artifactSlugs: string[];
}

export interface PersonalInfluence {
  slug: string;
  title: string;
  kind: "origin" | "place" | "community" | "book" | "film" | "anime" | "design";
  summary: string;
  href?: string;
  image?: string;
  publicationState: PublicationState;
}

export type ReadingKind =
  | "book"
  | "paper"
  | "essay"
  | "blog"
  | "film"
  | "anime"
  | "design"
  | "place";

export interface ReadingEntry {
  slug: string;
  title: string;
  creator: string;
  kind: ReadingKind;
  annotation: string;
  lastingQuestion: string;
  connection?: string;
  externalUrl?: string;
  date?: string;
  publicationState: PublicationState;
  image?: string;
  imageAlt?: string;
}

export interface ReadingPageData {
  eyebrow: "Reading";
  title: string;
  introduction: string;
  metadata: { description: string; openGraphDescription: string };
}

export interface ResearchWaypoint {
  label: "Models" | "Agents" | "World";
  role: "capability" | "agency" | "consequence";
  question: string;
  evidence: string;
}

export interface HomepageData {
  writing: {
    eyebrow: string;
    title: string;
    introduction: string;
    cta: { label: string; href: "/writing" };
  };
  reading: {
    eyebrow: "Reading";
    title: string;
    introduction: string;
    cta: { label: string; href: "/reading" };
  };
  chapters: {
    eyebrow: string;
    title: string;
    organizationNames: readonly string[];
    nextQuestionLabel: string;
    cta: { label: string; href: "/experience" };
  };
  personal: {
    eyebrow: string;
    title: string;
    livedDetailLabel: string;
    influenceSlug: string;
    principleLabel: string;
    principleIndex: number;
    cta: { label: string; href: "/about" };
  };
  contact: {
    eyebrow: "Contact";
    title: string;
    invitation: string;
    externalLinkLabel: string;
  };
}

export interface AboutPageData {
  eyebrow: string;
  title: string;
  metadata: {
    description: string;
    openGraphDescription: string;
  };
  headerIntroduction: string;
  introduction: string[];
  introductionLabel: string;
  learningArtifactSlugs: string[];
  learningArtifactsLabel: string;
  influencesHeading: string;
  influencesKicker: string;
  principlesHeading: string;
  principlesKicker: string;
  longerHorizonHeading: string;
  longerHorizonKicker: string;
  longerHorizon: string[];
  longerHorizonArtifactSlugs: string[];
  nowHeading: string;
  nowKicker: string;
  connectHeading: string;
  connectKicker: string;
  relatedArtifactsLabel: string;
  now: { date: string; body: string };
}

export interface PublicArtifactFilter {
  theme?: ArtifactTheme;
  kind?: ArtifactKind;
  featured?: boolean;
}

export interface EvidenceLink {
  label: string;
  href: string;
  kind: "artifact" | "source" | "case-study" | "writing";
  external?: boolean;
}

export interface EvidenceRecord {
  slug: string;
  title: string;
  phase: "models" | "agents" | "world" | "field-building";
  status: EvidenceStatus[];
  role: string;
  summary: string;
  contribution: string;
  observableResult: string;
  questions: string[];
  links: EvidenceLink[];
  image?: string;
  featured: boolean;
}

export interface TrajectoryPhase {
  id: "models" | "agents" | "waldo" | "world";
  number: string;
  title: string;
  context: string;
  summary: string;
}

export interface ResearchArea {
  title: string;
  maturity: "practice" | "investigating" | "long-term";
  summary: string;
  questions: string[];
  evidenceSlugs: string[];
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
  title: "Shivansh Fulper — Founder & AI Systems Researcher",
  description:
    "Shivansh Fulper is the founder of Waldo and an AI systems researcher working on persistent agents, memory and state, long-horizon execution, monitoring, control, and evaluation, with a longer-term interest in physical AI.",
  author: "Shivansh Fulper",
  keywords:
    "Shivansh Fulper, Founder, AI Systems Researcher, Waldo, Kennel, Atlan, Persistent Agents, Agent Harnesses, Agent Memory, Long-Horizon Agents, Agent Evaluation, Physical AI, Project EKA, IIITDM Jabalpur",
  url: "https://shivanshfulper.com",
  ogImage: "/images/og-image.png",
};

// ==================== NAVIGATION ====================

export const navItems: NavItem[] = [
  { label: "Venture", href: "/work/waldo" },
  { label: "Research + Writing", href: "/research" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

// ==================== HERO ====================

export const heroData: HeroData = {
  name: "Shivansh Fulper",
  tagline: "I’m building the agent that stays on your side.",
  subtitle:
    "Waldo + Kennel · AI systems researcher · B.Tech, IIITDM Jabalpur ’26",
  socials: [
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/shivansh-fulper/",
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

export const nowSectionData = {
  eyebrow: "Now",
  title: "Waldo",
  status:
    "Working internal foundations; external product and market validation remain open.",
  imageAlt: "Waldo product system",
  links: {
    caseStudy: { label: "Explore Waldo" },
    product: { label: "Visit Waldo", href: "https://www.heywaldo.in/" },
  },
} as const;

export const researchDirectionData = {
  eyebrow: "Research direction",
  title: "From capability to consequence.",
  introduction:
    "I began by asking how models acquire capability. Building agents shifted the question toward memory, judgment, and control. Waldo—and my interest in physical AI—asks what happens when those decisions persist and touch the world.",
  waypoints: [
    {
      label: "Models",
      role: "capability",
      question: "How is capability made?",
      evidence: "Project EKA · Qwen3 MoE",
    },
    {
      label: "Agents",
      role: "agency",
      question: "What happens when capability can act?",
      evidence: "Atlan · Waldo · harness research",
    },
    {
      label: "World",
      role: "consequence",
      question: "What changes when decisions touch physical systems?",
      evidence: "Smart Manufacturing · physical AI direction",
    },
  ] satisfies ResearchWaypoint[],
  cta: { label: "Explore the research", href: "/research" },
} as const;

export const homepageData = {
  writing: {
    eyebrow: "Research + Writing",
    title: "Notes from the work.",
    introduction:
      "Research questions usually arrive after something breaks, surprises me, or refuses to fit the model I had in my head.",
    cta: { label: "View all writing", href: "/writing" },
  },
  reading: {
    eyebrow: "Reading",
    title: "Things I keep returning to.",
    introduction:
      "Places, communities, and design questions that continue to change how I see and build.",
    cta: { label: "Open the reading record", href: "/reading" },
  },
  chapters: {
    eyebrow: "Selected chapters",
    title: "The work that changed the next question.",
    organizationNames: [
      "Atlan",
      "Soket AI Labs",
      "MIRAI-Setu",
      "HackByte",
      "IIITDM Jabalpur",
    ],
    nextQuestionLabel: "Next question",
    cta: { label: "See the full experience", href: "/experience" },
  },
  personal: {
    eyebrow: "Personal compass",
    title: "What keeps the work personal.",
    livedDetailLabel: "A lived detail",
    influenceSlug: "pokedex-origin",
    principleLabel: "A working principle",
    principleIndex: 0,
    cta: { label: "More about me", href: "/about" },
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s compare notes.",
    invitation:
      "Have a question, a disagreement, or a thread worth following? Write to me.",
    externalLinkLabel: "Opens in a new tab",
  },
} as const satisfies HomepageData;

// ==================== ABOUT ====================

export const aboutData: AboutData = {
  bio: `I’m building Waldo and Kennel: a user-owned personal agent and its first home on the Mac. I care about what happens after an agent says “done” — whether the outcome is real, what still needs human judgment, and how one agent can remain on the person’s side across models, tools, work, and life.

At Atlan, I helped build and operate more than 30 production agent instances through AtlanClaw. That work made one gap impossible to ignore: an agent finishing a task and the task actually being done are two different things. It shaped how I think about continuity, permission, evidence, and personal agency.

I started coding at 12 to build a Pokédex, then spent years jailbreaking phones and tracing systems past their intended limits. At IIITDM Jabalpur, I grew HackByte from an internal college event to 5,154 registrations as a lead organiser across three years. Project EKA, Code for GovTech, and rebuilding Qwen3 MoE took that instinct into models and real-world systems. MIRAI-Setu took me across Japan in 2025 and deepened my interest in craft, manufacturing, infrastructure, and long time horizons.`,
  photo: "/Shivansh.jpg",
  facts: [
    { label: "Location", value: "Nagpur, India" },
    {
      label: "Education",
      value: "B.Tech, Smart Manufacturing · Branch topper · 8.5 CPI · 2026",
    },
    {
      label: "Focus",
      value: "Personal Agents · Orchestration · Infrastructure",
    },
    {
      label: "Currently",
      value: "Building Waldo + Kennel full-time",
    },
  ],
  interestsLabel: "Current interests",
  interests: ["Agent systems", "Physical AI", "Industry 4.0"],
};

// ==================== TRAJECTORY ====================

export const trajectoryPhases: TrajectoryPhase[] = [
  {
    id: "models",
    number: "01",
    title: "Models",
    context: "Project EKA",
    summary:
      "I started below the interface, working on multilingual data and model infrastructure.",
  },
  {
    id: "agents",
    number: "02",
    title: "Agents",
    context: "Atlan",
    summary:
      "Then I watched models become systems with tools, permissions, failures, and real users.",
  },
  {
    id: "waldo",
    number: "03",
    title: "Waldo",
    context: "Now",
    summary:
      "Now I’m building a personal agent that can carry context and unfinished work without taking control away from the person.",
  },
  {
    id: "world",
    number: "04",
    title: "World",
    context: "Longer term",
    summary:
      "I want to understand what changes when agents begin to see, move, and act in the physical world.",
  },
];

// ==================== SELECTED EVIDENCE ====================

export const evidenceRecords: EvidenceRecord[] = [
  {
    slug: "waldo",
    title: "Waldo — persistent personal agents",
    phase: "agents",
    status: ["built", "demonstrated", "hypothesis"],
    role: "Founder",
    summary:
      "A user-owned personal agent investigating how intent, evidence, corrections, decisions, and unresolved consequences can remain coherent across agents and time.",
    contribution:
      "Leads agent architecture, infrastructure, product boundaries, and the research program around responsibility continuity.",
    observableResult:
      "Three working internal foundations—Kennel, a durable harness, and Waldo mobile—with bounded Kennel acceptance for attributable sessions, history, live state, continuation, first-message handling, and archive cleanup.",
    questions: [
      "Can more machine execution leave the person with less to carry without weakening meaningful control?",
    ],
    links: [
      { label: "Read the case study", href: "/work/waldo", kind: "case-study" },
      {
        label: "Visit Waldo",
        href: "https://www.heywaldo.in/",
        kind: "artifact",
        external: true,
      },
    ],
    image: "/images/projects/waldo/waldo-ecosystem.webp",
    featured: true,
  },
  {
    slug: "atlan",
    title: "Atlan — production agent systems",
    phase: "agents",
    status: ["built", "observed"],
    role: "FDE & AI Engineer Intern",
    summary:
      "Production experience with the runtime problems that appear after a model receives tools, enterprise context, authentication, and real users.",
    contribution:
      "Helped build and operate more than 30 production agent instances across context, tools, authentication, integrations, deployment, and reliability.",
    observableResult:
      "The work exposed a recurring gap between a run finishing and a person's intended outcome becoming true—without turning confidential company systems into a public case study.",
    questions: [
      "How should a person monitor, correct, and recover agent work that spans many tools and actions?",
    ],
    links: [],
    featured: true,
  },
  {
    slug: "project-eka",
    title: "Project EKA — model and data infrastructure",
    phase: "models",
    status: ["built", "observed"],
    role: "MTS Intern · LLM pre-training",
    summary:
      "Work beneath a national-scale multilingual sparse-MoE program: curation infrastructure and reproducible experimentation under constrained compute.",
    contribution:
      "Built Eka Curator and worked on the COOM framework for Project EKA at Soket AI Labs.",
    observableResult:
      "Public first-party attribution connects the work to Project EKA; the project's current scale belongs to the program, not to my individual contribution.",
    questions: [
      "How do data quality, language imbalance, contamination, and evaluation shape capability before training begins?",
    ],
    links: [
      {
        label: "Explore Project EKA",
        href: "https://soket.ai/project-eka",
        kind: "source",
        external: true,
      },
    ],
    featured: true,
  },
  {
    slug: "physical-systems",
    title: "Agents in the physical world",
    phase: "world",
    status: ["built", "historical", "direction"],
    role: "Smart Manufacturing engineer",
    summary:
      "A foundation in cyber-physical systems, sensing, industrial automation, and invention where mistakes have latency, energy, material, and safety consequences.",
    contribution:
      "Studied Smart Manufacturing; built sensing and edge-inference projects; co-invented published dental-inspection and waste-to-value patent applications.",
    observableResult:
      "The work establishes a physical-systems foundation without claiming current robotics deployment or sole ownership of multi-inventor work.",
    questions: [
      "What changes when an agent must estimate uncertain world state before taking an irreversible action?",
    ],
    links: [],
    featured: true,
  },
  {
    slug: "qwen3-moe",
    title: "Qwen3 MoE — understanding by rebuilding",
    phase: "models",
    status: ["built"],
    role: "Independent implementation",
    summary:
      "A from-scratch PyTorch implementation used to understand sparse routing, grouped-query attention, RoPE, normalization, and KV caching at code level.",
    contribution:
      "Reimplemented the architecture for first-principles learning, adapting educational material rather than claiming original Qwen research.",
    observableResult:
      "The public repository makes the implementation and its provenance inspectable.",
    questions: [
      "Which model-level tradeoffs remain visible—or disappear—once the model is placed inside an agent runtime?",
    ],
    links: [
      {
        label: "View the repository",
        href: "https://github.com/Pin4sf/Qwen3-MoE-Self-Implementation",
        kind: "artifact",
        external: true,
      },
    ],
    featured: true,
  },
  {
    slug: "field-building",
    title: "Research community and field-building",
    phase: "field-building",
    status: ["demonstrated"],
    role: "Lead organiser & mentor",
    summary:
      "Technical work becomes a field when people can enter it, learn together, build artifacts, and feel responsible for the quality of the community.",
    contribution:
      "Helped grow HackByte from an internal event to 5,154 registrations across three years and created structured peer-learning programs in machine learning.",
    observableResult:
      "A public event, registration record, recurring organizing responsibility, and programs that moved learning from talks into projects.",
    questions: [
      "How do you make technical depth legible and inviting without lowering its standard?",
    ],
    links: [
      {
        label: "Visit HackByte",
        href: "https://www.hackbyte.in/",
        kind: "artifact",
        external: true,
      },
    ],
    featured: true,
  },
];

// ==================== RESEARCH AGENDA ====================

export const researchAreas: ResearchArea[] = [
  {
    title: "Agent runtimes and harnesses",
    maturity: "practice",
    summary:
      "A model is only one part of an agent. I study the loops, tools, permissions, and recovery systems around it.",
    questions: [
      "Which runtime boundaries must remain first-party because they encode trust?",
    ],
    evidenceSlugs: ["atlan", "waldo"],
  },
  {
    title: "Production reliability and control",
    maturity: "practice",
    summary:
      "Agents often fail in the handoffs: between tools, credentials, providers, retries, and people.",
    questions: [
      "Where should intervention happen before recovery becomes expensive or unsafe?",
    ],
    evidenceSlugs: ["atlan", "waldo"],
  },
  {
    title: "Persistent memory and current state",
    maturity: "investigating",
    summary:
      "Remembering is easy. Knowing what to keep, trust, correct, or forget is the harder problem.",
    questions: [
      "What should persist, expire, or be reopened when the world changes?",
    ],
    evidenceSlugs: ["waldo"],
  },
  {
    title: "Long-horizon outcome evaluation",
    maturity: "investigating",
    summary:
      "A run can finish while the actual job remains undone. I want better ways to tell the difference.",
    questions: ["What evidence is sufficient to say an outcome became true?"],
    evidenceSlugs: ["atlan", "waldo"],
  },
  {
    title: "User-owned knowledge and authority",
    maturity: "investigating",
    summary:
      "Personal context should make an agent more helpful without quietly giving it more authority.",
    questions: [
      "How can a system become more personal without silently becoming more powerful?",
    ],
    evidenceSlugs: ["waldo"],
  },
  {
    title: "Agents in the world",
    maturity: "long-term",
    summary:
      "Physical action makes uncertainty, timing, and mistakes impossible to hide behind a polished answer.",
    questions: [
      "How should agent state and control change when action crosses into the physical world?",
    ],
    evidenceSlugs: ["physical-systems"],
  },
];

export const researchQuestions = [
  "What should persist when an agent crosses sessions, tools, and models?",
  "How can an agent distinguish producing an artifact from changing the world?",
  "How can autonomy expand without allowing authority to drift?",
  "How should we evaluate an agent across trajectories and days rather than individual prompts?",
  "What changes when an agent begins perceiving and acting in physical environments?",
];

// ==================== CASE STUDIES ====================

export const caseStudies: CaseStudy[] = [
  {
    slug: "waldo",
    name: "Waldo",
    tagline: "A user-owned agent that stays on your side.",
    heroImage: "/images/projects/waldo/waldo-ecosystem.webp",
    role: "Founder",
    timeline: "May 2026 — Present",
    techStack: [
      "Swift",
      "SwiftUI",
      "Codex App Server",
      "SQLite / GRDB",
      "Cloudflare Durable Objects",
      "TypeScript",
      "React Native",
    ],
    liveUrl: "https://www.heywaldo.in/",
    category: "venture",
    featured: true,
    challenge:
      "Machine execution is scaling faster than human understanding and responsibility. Producing plausible artifacts and initiating machine work are becoming cheaper, while the person still has to understand assumptions, reconcile contradictions, judge consequences, and know whether the work changed anything that mattered.",
    approach:
      "Start with the human constraint system, not a fixed interface. Responsibility continuity is our current connective hypothesis: one user-owned relationship should preserve intent, source material, corrections, authority, and what remains across changing agents and surfaces—while compressing routine management rather than creating another agent-management job.",
    solution:
      "Kennel on macOS, Waldo on iOS, and a durable agent harness are working internal foundations for testing continuity, governance, and low-friction presence—not the permanent definition of the company. A surface earns its place only if it reduces reconstruction, review, unsafe action, forgotten follow-through, or attention per accepted outcome without silently expanding authority.",
    solutionImages: [
      "/images/projects/waldo/hero.png",
      "/images/projects/waldo/app-screens.png",
      "/images/projects/waldo/iphone-1.png",
      "/images/projects/waldo/iphone-2.png",
    ],
    impact:
      "The current record is foundation-level. Kennel has recorded live Codex acceptance for multi-session discovery, populated conversation history, real-time state, same-task continuation, first-message handling, and archive cleanup. External product and market validation remain open. The research test is whether Waldo lowers sessions or raw artifacts opened per accepted outcome and interruptions per accepted outcome.",
    reflection:
      "Waldo's center of gravity is epistemic: helping a person know what is true, what changed, what remains, and what machine work actually bought. Orchestration, memory, and interface are means. If Waldo merely adds another surface to manage, it becomes the third loop rather than the break.",
    pullQuote:
      "The product is fluid. The human constraint system is the thesis.",
    narrative: {
      brandMark: {
        src: "/images/projects/waldo/logo.svg",
        alt: "Waldo",
      },
      heroEyebrow: "Waldo · The revised thesis",
      heroStatement:
        "Machine execution is scaling. Human understanding and responsibility are not.",
      heroQuote:
        "Machine execution can scale. Consequences do not automatically transfer with it.",
      heroBody:
        "I’m building Waldo from an emerging pool of interlinked human constraints—not from one fixed workflow. As personal agents reach more people and specialist execution multiplies, Waldo is testing how one user-owned relationship can preserve understanding, authority, continuity, and responsibility across whatever agents and interfaces come next.",
      heroImageAlt:
        "Waldo product system map connecting a person with agents, accounts, and work tools",
      heroImageCaption:
        "One possible system response—not a fixed product boundary: a personal agent relating the person to the tools, models, accounts, and specialist agents they choose.",
      sections: [
        {
          id: "what-changed",
          eyebrow: "01 · The world change",
          title: "Producing got cheap. Understanding did not.",
          body: [
            "For many well-scoped tasks, machines can now produce plausible code, documents, plans, and analyses in minutes. The cost has not disappeared. It has moved into understanding assumptions, reconciling contradictions, reviewing consequences, and knowing whether the work changed anything that mattered.",
            "I first felt this while building and operating more than 30 production agent instances at Atlan. Starting another run was easy. Remembering why it existed, moving context between tools, detecting a waiting decision, and checking whether the original problem was actually resolved remained human work.",
            "Suyash encountered the same structure while running a design studio and training for an Ironman: more tools could produce more information, but no system could reliably decide what mattered now, what could wait, or what no longer deserved to be carried.",
            "The transition is larger than coordination. Capability is becoming abundant while comprehension, attention, legitimate authority, and accountability remain finite. That is the constraint system Waldo is investigating.",
          ],
          cards: [
            {
              title: "The old bottleneck was production",
              body: "Writing the code, document, analysis, plan, or message often constrained how much work could be attempted.",
            },
            {
              title: "The new bottleneck is outcome truth",
              body: "Understanding what changed, checking the result, accepting it, and tracing its consequences remain scarce.",
            },
            {
              label: "Failure mode",
              title: "Activity mistaken for progress",
              body: "More tokens, sessions, commits, and artifacts can increase visible activity while leaving the person with more uncertainty and review.",
            },
          ],
        },
        {
          id: "responsibility",
          eyebrow: "02 · The problem pool",
          title: "Three centers. One accountability floor.",
          body: [
            "AI is not creating one neatly contained problem. It is producing a reinforcing pool: more output raises evaluation load; more agents raise management work; fragmented memory raises reconstruction; easier action raises governance and consequence; cheaper intelligence raises the need to decide what the spend actually bought.",
            "The center of gravity is epistemic. Waldo should help a person know what is true, what changed, what remains, and why—not orchestrate for its own sake. Coordination, memory, and interfaces are candidate means.",
          ],
          cards: [
            {
              label: "Epistemic",
              title: "I cannot cheaply know what is true.",
              body: "Abundance without comprehension. Activity without outcome truth. Memory without coherent continuity. Cheap intelligence without allocation discipline.",
            },
            {
              label: "Attentional",
              title: "I cannot allocate myself.",
              body: "Delegation without management capacity. Adoption without the agent-management literacy most people never asked to acquire.",
            },
            {
              label: "Custodial",
              title: "I cannot keep what I have built.",
              body: "Personalization without durable user agency: context, corrections, permissions, and history become provider-bound or opaque.",
            },
            {
              label: "Accountability floor",
              title: "Consequence stays with me regardless.",
              body: "Agents can act, but legal, social, professional, and moral accountability does not automatically transfer with execution.",
            },
          ],
          afterword: [
            "The problems reinforce one another. More delegation creates more sessions; more sessions create more reconstruction and review; weak review creates false closure and consequence debt; that burden encourages another orchestration layer that can itself create more activity.",
            "Waldo must break that loop. If it raises sessions or raw artifacts opened per accepted outcome, or interruptions per accepted outcome, it has merely relocated the burden.",
          ],
        },
        {
          id: "governance",
          eyebrow: "03 · Current connective hypothesis",
          title: "Responsibility continuity—not another agent-management job.",
          body: [
            "One human intention can span many sessions, specialist agents, tools, people, and days. Provider memory can preserve a transcript; it does not necessarily preserve why the work exists, what changed the plan, what was accepted, or which consequence still remains.",
            "Responsibility continuity is our current hypothesis for that connective tissue. Waldo should retain the desired result, current constraints, authoritative sources, corrections, decisions, unresolved consequences, and the smallest truthful re-entry point—even as the executor changes.",
            "This does not mean giving everyone an operator console. The person should not inherit the skill of managing an agent fleet. Waldo should compress routine discovery, briefing, monitoring, reconciliation, recovery, and re-entry, then surface uncertainty, changed scope, irreversible effects, cost, or permission only when human judgment is truly required.",
            "The hypothesis remains replaceable. If native providers absorb this burden, if people prefer direct control, or if the representation creates more cognitive load than it removes, Waldo must change rather than defend the label.",
          ],
          cards: [
            {
              label: "Preserve",
              title: "Intent, source material, and what remains",
              body: "Carry the causal story across sessions rather than storing an undifferentiated transcript archive.",
            },
            {
              label: "Compress",
              title: "Routine management",
              body: "Absorb coordination work without hiding uncertainty or silently taking authority from the person.",
            },
            {
              label: "Return",
              title: "The smallest decision-complete intervention",
              body: "Bring back the relevant artifact, its consequence, and the exact judgment required—not another feed of machine activity.",
            },
          ],
        },
        {
          id: "kennel",
          eyebrow: "04 · Current system",
          title: "Kennel is the first home. Waldo is the relationship.",
          status: "built",
          body: [
            "Kennel, a durable harness, and Waldo mobile are working internal foundations. Their integration, external product behavior, and market validation remain open work.",
            "Kennel has the strongest internal acceptance record: attributable Codex sessions, conversation history, live processing state, same-task continuation, first-message handling, and archive cleanup.",
            "Kennel is the first home, not the whole vision. It is Waldo’s initial wedge for work already spread across several agents, giving that work one calm place to land—showing what the agent reports, what supports it, what needs judgment, and what remains unresolved without making the transcript the primary unit of value.",
            "The current hypothesis is responsibility continuity. The longer direction is one user-owned Waldo carrying responsibilities across work and life. Production integrations, broad provider coverage, automatic artifact checks, and the complete cross-surface experience remain open work.",
          ],
          cards: [
            {
              label: "Current product",
              title: "Three working foundations",
              body: "Kennel, Waldo mobile, and the harness demonstrate separate parts of the relationship internally.",
            },
            {
              label: "Target product",
              title: "One Waldo across work and life",
              body: "The same user-owned relationship should carry responsibilities across models, tools, services, devices, and contexts.",
            },
            {
              label: "First wedge",
              title: "Kennel on the Mac",
              body: "Start where AI-output overload, review, judgment, and follow-through are already visible and painful.",
            },
          ],
          media: {
            src: "/images/projects/waldo/kennel-overview.png",
            alt: "Kennel on macOS showing attributable agent instances and their current state",
            caption:
              "Kennel today: a native Mac home for seeing agent work, opening the underlying session, and keeping the person in control.",
          },
          link: {
            label: "Read the technical brief for the underlying system design",
            href: "https://waldo-technical-brief.pages.dev/",
          },
        },
        {
          id: "one-system",
          eyebrow: "05 · One relationship",
          title:
            "Many agents may work for you. One should always remain on your side.",
          body: [
            "Your life and your agents should not belong to two different systems. Personal assistants and work orchestrators have evolved as separate products, even though the user is the same person. Calendars, messages, reminders, commitments, and daily administration should not belong to a different identity from the sessions, runtimes, tools, budgets, and policies involved in getting work done.",
            "I don’t believe one model or interface will own our entire digital life. People will use many models, specialist agents, tools, services, and devices. Waldo is being designed to join personal assistance and work orchestration around the same Outcome, authority boundaries, source material, and continuity.",
            "An organization may own some infrastructure. The individual should own the continuing relationship. Models, tools, employers, and surfaces can change; the context a person chooses to share, their permissions, corrections, responsibility history, and unresolved work should remain with them.",
            "The models may be rented and replaceable. What should compound for the person is their context, corrections, permissions, procedures, responsibility history, and accepted outcomes. Waldo is being built to keep that intelligence on the person’s side even as the machinery underneath changes.",
            "Waldo may appear as mobile, a judgment in Kennel, messaging, voice, or eventually a physical form. Those are presences of one user-owned personal agent—not disconnected assistants that make the person rebuild context every time. One agent. Many presences. Still yours.",
          ],
          cards: [
            {
              label: "Context",
              title: "Composed, not copied",
              body: "Each agent or tool should receive the smallest attributable view required for the current Outcome—not an indiscriminate memory dump.",
            },
            {
              label: "Continuity",
              title: "Across every surface",
              body: "Work, life context, corrections, and outcomes should stay connected without being trapped in one provider.",
            },
            {
              label: "Portability",
              title: "The relationship survives the provider",
              body: "The person should be able to change models, tools, or employers without abandoning the context and outcome history they own.",
            },
          ],
        },
        {
          id: "attention",
          eyebrow: "06 · The product constitution",
          title:
            "More capable agents should mean less life held together in your head.",
          body: [
            "An agent waiting five minutes is inexpensive. A person reconstructing context across five agents, reviewing unchecked changes, and finding the correct terminal is expensive. Infinite machine capacity does not create infinite human attention.",
            "Burnout is not a feature category. It is a product constraint: Waldo should not make people supervise more software, monitor more feeds, or remain permanently available. It should carry routine responsibility quietly and return only when timing, consequence, or authority belongs to the person.",
            "Success means less mental reassembly, fewer silently decaying commitments, a realistic next action when capacity changes, and permission to decide that enough is enough.",
          ],
          cards: [
            {
              label: "After interruption",
              title: "Less mental reassembly.",
              body: "Restore the goal, last confirmed state, unresolved decision, artifacts, and smallest next action.",
            },
            {
              label: "Before it decays",
              title: "Keep meaningful commitments alive.",
              body: "Carry forward what still deserves attention without turning every loose end into an alert.",
            },
            {
              label: "When capacity changes",
              title: "Offer an honest next move.",
              body: "Respect what the person says about their capacity and help reduce, defer, or renegotiate the plan.",
            },
            {
              label: "At the end of the day",
              title: "Enough is a valid state.",
              body: "Reconcile what became true and carry forward only what still deserves the person’s attention.",
            },
          ],
        },
        {
          id: "philosophy",
          eyebrow: "07 · What I believe",
          title: "An agent should care about the person behind the task.",
          body: [
            "ChatGPT or Claude can answer what you ask. I want Waldo to understand why you need it, when it matters, what it affects, and whether it was actually resolved. The current prompt is only one fragment of a person’s priorities, relationships, boundaries, capacity, corrections, and commitments.",
            "Life is already distributed across calendars, messages, files, health systems, models, tools, and other people. Waldo should help carry it forward without making the person rebuild themselves—or become the integration layer—every time the interface changes.",
            "The chatbox made intelligence available. It cannot be the whole interface for asynchronous work, and ordinary people should not have to become natural-language programmers or agent managers to benefit. The next layer is continuity, timing, permission, and closure: proactive enough to prepare what matters, but never presumptive about consequential action.",
          ],
          cards: [
            {
              label: "Person before prompt",
              title: "Care about the why",
              body: "The request is only one fragment of the person’s intent and circumstances.",
            },
            {
              label: "Action over dashboards",
              title: "Insight must help",
              body: "A feed, chart, or score that hands the coordination burden back to the user is not enough.",
            },
            {
              label: "Agency over lock-in",
              title: "The layer belongs to you",
              body: "The person should be able to inspect it, correct it, change providers, and release what no longer matters.",
            },
          ],
          media: {
            src: "/images/projects/waldo/death-of-chatbox.png",
            alt: "Waldo mascot stepping away from an empty prompt box",
            caption:
              "The “death of the chatbox” idea: a personal agent should carry context and notice what matters instead of waiting behind an empty prompt.",
          },
        },
        {
          id: "boundaries",
          eyebrow: "08 · Principles I won’t trade away",
          title: "A personal agent is a relationship with clear boundaries.",
          body: [
            "More execution should never mean less agency. We are building Waldo’s working foundations and target architecture around a human rule: continuity must be inspectable, correction easy, and authority fail closed.",
            "Waldo should learn from what a person says, the corrections they make, and outcomes they confirm. Explicit self-knowledge should outrank behavioral inference; activity should never become a hidden personality score.",
          ],
          cards: [
            {
              label: "Human closure",
              title: "Completion is evidence. Closure belongs to the person.",
              body: "A green check, stopped process, commit, or final message can describe the run. Only the user can close the real obligation.",
            },
            {
              label: "Proactivity",
              title: "Suggest before execute",
              body: "Low-risk assistance may be proactive; consequential action must stay within visible permission.",
            },
            {
              label: "Durable responsibility",
              title: "Interfaces may disappear. Responsibility cannot.",
              body: "Replaceable models and temporary screens still need an inspectable record of intent, action, result, and consequence.",
            },
            {
              label: "Personal memory",
              title: "Memory can be corrected and released",
              body: "The user must be able to inspect, correct, export, delete, and revoke what Waldo carries. Memory must never silently become permission.",
            },
          ],
        },
        {
          id: "three-pressures",
          eyebrow: "09 · The strategic map",
          title:
            "Judgment now. Sustainable agency throughout. Physical authority later.",
          body: [
            "I see three connected pressures, but I do not treat them as three equal markets. AI-output overload is the customer problem we can attack now through Kennel. Burnout and finite human capacity are the constitution for how Waldo should behave. Physical AI is the expansion horizon where the same questions of permission, interruption, and recovery become more consequential.",
            "The confidence is different too: the overload and burnout problems are already visible; the physical-world tailwind is strong, but Waldo has not yet validated a hardware product or customer wedge there. The wider curve is consumer: capable intelligence is becoming cheap enough to move agents from specialist tools into everyday products.",
            "Notion’s 2026 workplace survey offers a useful directional signal: 88% of respondents placed themselves or their organizations in its thought-partner or assistant stages, while 71% of AI Users said they would use AI more if they trusted it not to make mistakes on important work. Among more advanced users, automation and cross-tool routing rose—but so did tool sprawl, difficulty seeing real impact, and inconsistent model performance. For surveyed decision-makers, the largest implementation gaps between early and advanced groups were integration, governance, and defined measurement. That is the opportunity Waldo is building toward: not more access to AI, but a person-owned layer that makes distributed AI work coherent, governable, and easier to inspect.",
          ],
          matrix: {
            caption:
              "The three pressures shaping Waldo and Kennel, their strategic role, product fit, and current confidence",
            hint: "Swipe or use the arrow keys to compare all four columns.",
            columns: {
              pressure: "Pressure",
              strategicRole: "Strategic role",
              fit: "Waldo / Kennel fit",
              confidence: "Confidence",
            },
            rows: [
              {
                pressure: "AI-output overload",
                strategicRole: "Immediate customer problem",
                fit: "Kennel’s current wedge",
                confidence: "High",
              },
              {
                pressure: "Burnout economy",
                strategicRole: "Product constitution",
                fit: "How Waldo should behave",
                confidence: "High problem · medium market",
              },
              {
                pressure: "Physical world",
                strategicRole: "Expansion horizon",
                fit: "Bodies for AI pathway",
                confidence: "High tailwind · low current validation",
              },
            ],
          },
        },
        {
          id: "personal-computing",
          eyebrow: "10 · The interface lesson",
          title: "Agents exist. I want to make them personal.",
          body: [
            "Steve Jobs and Steve Wozniak helped turn computers from something hobbyists operated into something ordinary people could make part of their lives. I see agents at the same interface transition: the capability exists, but using it still asks people to think like operators.",
            "Today, the personal-agent stack still asks people to assemble models, repositories, memory systems, skills, scheduled jobs, credentials, and agent harnesses. This is the Apple I moment. Waldo’s job is to turn that machinery into one understandable relationship: give it a responsibility, and return only when judgment or permission belongs to you.",
            "A line Jobs wrote about the Macintosh stays with me: “It’s our job to make complex technology easy to use and fun to use.” Waldo is my attempt to do that for agents without hiding intent, consequence, control, or who remains responsible.",
          ],
          media: {
            src: "/images/projects/waldo/steve-jobs-macintosh-1984.jpg",
            alt: "Portrait of Steve Jobs seated against a red background in January 1984",
            caption:
              "Steve Jobs, January 1984. Photograph by Bernard Gotfryd, Library of Congress; no known copyright restrictions.",
            presentation: "portrait",
            source: {
              label: "Image source and rights",
              href: "https://commons.wikimedia.org/wiki/File:Steve_Jobs_January_1984.jpg",
            },
          },
        },
        {
          id: "long-horizon",
          eyebrow: "11 · The expansion horizon",
          title: "Software earns the right to become physical.",
          body: [
            "I keep returning to bodies for AI: physical forms people would actually welcome into daily life—a desk object, wearable, home device, vehicle, or small robot. The same Waldo should inhabit each of them, carrying one identity and permission system instead of making every object another disconnected assistant.",
            "The physical-AI tailwind is strong, but this is not a current Waldo hardware program and we have low current customer validation for it. Software comes first because identity, correction, permission, interruption, revocation, and recovery must work before a personal agent is trusted with sensors, movement, or physical authority.",
            "Health and body context is optional and permissioned: a person may choose to share it, but it is neither Waldo’s product category nor a prerequisite. The form may change. The person it works for should not.",
          ],
          cards: [
            {
              label: "A desk",
              title: "A calm presence",
              body: "An object that can speak, listen, and carry context without demanding another screen.",
            },
            {
              label: "A body",
              title: "Wearable or home device",
              body: "New senses and forms for the same user-owned agent, under the same personal policy.",
            },
            {
              label: "Eventually",
              title: "Consumer bodies for AI",
              body: "Physical forms made for ordinary life—not only factories, warehouses, and industrial autonomy.",
            },
          ],
          media: {
            src: "/images/projects/waldo/waldo-mascot-orange.png",
            alt: "Waldo mascot centered on a vivid orange field",
            caption:
              "A familiar character across surfaces: the physical form can change while the agent’s identity, memory, and permissions remain continuous.",
            presentation: "poster",
          },
        },
      ],
      teamEyebrow: "12 · Who I’m building with",
      teamTitle: "Waldo is the first company the three of us are building.",
      teamIntro:
        "Ashish and I became friends at school over a shared obsession with iOS jailbreaking. Years later, I met Suyash in the Computer Center at IIITDM Jabalpur and showed him how to build a website by describing it to an AI coding tool. Waldo is the first company the three of us are building together.",
      team: [
        {
          name: "Shivansh Fulper",
          role: "Founder · AI systems & engineering",
          body: "Leads agent architecture, infrastructure, and engineering. Previously built and operated 30+ production agents at Atlan; also worked on Indic language-model data, open-source GovTech, and a from-scratch Qwen3 MoE implementation.",
        },
        {
          name: "Suyash Pingale",
          role: "Founder · Product, experience & brand",
          body: "Leads product, experience, brand, and design. His experience running a design studio while training for an Ironman helped expose how much work and life context still had to be coordinated in a person’s head.",
        },
        {
          name: "Ashish Tembhekar",
          role: "Founding Engineer",
          body: "Spent nine months working as an AI engineer before joining Waldo. He built much of the first app, including its permissioned health-context pipeline, and now works across native iOS, Supabase, and agent infrastructure.",
        },
      ],
      artifactsEyebrow: "13 · Public artifacts",
      artifactsTitle: "Inspect the thesis, research, and working foundations.",
      artifactsIntro:
        "The founder video, technical brief, website, product imagery, and essays are demonstrated public artifacts. They make the thesis and current foundations inspectable; they are not proof of integrated external product behavior or market validation. External sources support the direction, not Waldo product-market fit.",
      artifacts: [
        {
          kind: "link",
          eyebrow: "Research · Outcome truth",
          title: "When an agent says done, what is actually true?",
          description:
            "The distinction between a session, artifact, evidence, accepted outcome, and unresolved human responsibility.",
          href: "/writing/agent-done-outcome-truth",
          cta: "Read the essay",
        },
        {
          kind: "link",
          eyebrow: "Research · Memory",
          title: "Memory is governed state, not storage",
          description:
            "A design position on provenance, scope, contradiction, correction, authority, and forgetting in a persistent personal agent.",
          href: "/writing/memory-is-not-storage",
          cta: "Read the essay",
        },
        {
          kind: "link",
          eyebrow: "Research · Harnesses",
          title: "The harness is part of the agent",
          description:
            "A synthesis from studying more than 40 public agent harnesses, with the production-versus-research boundary kept explicit.",
          href: "/writing/harness-is-part-of-the-agent",
          cta: "Read the essay",
        },
        {
          kind: "video",
          eyebrow: "Founder video · 01:13",
          title: "Why we started Waldo",
          description:
            "Shivansh and Suyash on the problem, the personal-agent thesis, and why this team is building it.",
          href: "https://waldo-technical-brief.pages.dev/founder-video.mp4",
          cta: "Open founder video",
        },
        {
          kind: "video",
          eyebrow: "Product video · Earlier chapter",
          title: "An earlier Waldo mobile chapter",
          description:
            "An earlier mobile product chapter preserved as product history. Kennel and user-owned continuity are the current wedge.",
          href: "https://waldo-technical-brief.pages.dev/product-video.mp4",
          cta: "Open product video",
        },
        {
          kind: "link",
          eyebrow: "Technical & vision brief",
          title: "How Waldo works",
          description:
            "The system model, current foundations, permission boundaries, architecture, and longer physical-AI direction.",
          href: "https://waldo-technical-brief.pages.dev/",
          cta: "Read the technical brief",
        },
        {
          kind: "link",
          eyebrow: "Product site",
          title: "Meet Waldo",
          description:
            "The public product story and the earlier interaction system that led to today’s Kennel-first direction.",
          href: "https://www.heywaldo.in/",
          cta: "Visit heywaldo.in",
        },
        {
          kind: "link",
          eyebrow: "External signal · Paras Chopra",
          title: "The delegation tax is the product problem",
          description:
            "Paras Chopra frames agent use as learned delegation: discovering what to hand off, briefing it, supervising it, recovering from failure, and absorbing risk. His conclusion sharpens Waldo’s product test—the agent must reduce that cognitive cost behind interfaces ordinary people already know how to use.",
          href: "https://x.com/paraschopra/status/2084946385619845182",
          cta: "Read Paras Chopra’s post",
        },
        {
          kind: "link",
          eyebrow: "External research · Notion",
          title: "The gap is governed follow-through.",
          description:
            "Notion’s 2026 survey of 6,118 AI decision-makers and active workplace AI users found 88% still in its thought-partner or assistant stages. Among decision-makers, the largest advanced-versus-early gaps were integration, governance, and measurement. It supports Waldo’s problem framing—not consumer product-market fit.",
          href: "https://downloads.ctfassets.net/spoqsaf9291f/4C7Y2LaCO2rMJJEYzfPXPy/1370b80db4bab1b615fecd051843e811/ResearchReport_TheGreatRenovation.pdf",
          cta: "Read The Great Renovation",
        },
        {
          kind: "link",
          eyebrow: "External framework · Notion",
          title: "The assistant-to-system jump needs a governing layer.",
          description:
            "Notion’s companion model traces the move from ad-hoc prompting to recurring cross-tool agents and multi-agent systems. At the higher levels, checkpoints, permissions, monitoring, policy, incident handling, orchestration, and governance become part of the product—not back-office details.",
          href: "https://notion.notion.site/official-the-ai-transformation-model",
          cta: "Explore the AI Transformation Model",
        },
        {
          kind: "link",
          eyebrow: "External signal · Andrew Chen",
          title: "More outcomes, fewer copilots",
          description:
            "Andrew Chen describes the shift from AI that assists to agents that act—and the frustration of receiving more work to review. Waldo’s answer is not action alone: acceptance tied to visible artifacts, human judgment, and continuity the user owns.",
          href: "https://www.linkedin.com/posts/andrewchen_last-years-startup-trend-copilot-for-x-share-7488472791541985280-2t0X",
          cta: "Read Andrew Chen’s post",
        },
        {
          kind: "link",
          eyebrow: "External signal · Y Combinator",
          title: "Fifty personal agents later, coordination became the problem",
          description:
            "YC gave individual employees personal agents, then built QM when managing the fleet became difficult. QM is the organizational answer. Waldo asks the personal question: as agents multiply across work and life, what keeps your context, permissions, judgment, and accepted outcomes coherent—and on your side?",
          href: "https://qm.ycombinator.com/",
          cta: "Read YC’s QM notes",
        },
        {
          kind: "link",
          eyebrow: "External signal · Garry Tan / YC",
          title:
            "The model is replaceable. The intelligence that compounds should be yours.",
          description:
            "At Startup School 2026, Garry Tan described personal AGI as a person-controlled combination of context, memory, reusable skills, and a replaceable agent harness. It is a strong external articulation of Waldo’s ownership curve. Waldo is being designed to extend that thesis through purpose-bound context, exact authority, Outcomes tied to visible artifacts, and an interface that does not require people to operate the underlying agent stack.",
          href: "https://www.youtube.com/watch?v=eRrc1pUY5oU",
          cta: "Watch Own Your Intelligence",
        },
        {
          kind: "link",
          eyebrow: "External signal · YC RFS",
          title: "The consumer moment follows the cost curve",
          description:
            "YC’s Fall 2026 RFS argues that intelligence is becoming capable and cheap enough for everyday products across how people get things done, learn, stay healthy, and connect. Waldo is being built into that curve as one user-owned agent across work and life.",
          href: "https://www.ycombinator.com/rfs#ai-powered-consumer-products-for-1-billion-people",
          cta: "Read YC’s consumer AI request",
        },
        {
          kind: "link",
          eyebrow: "Historical reference · Steve Jobs Archive",
          title: "Make complex technology personal",
          description:
            "In his 1999 Macintosh anniversary email, Jobs described Apple’s role as bridging sophisticated technology and ordinary people. That interface lesson shapes how I think about making agents useful beyond today’s hobbyists and operators.",
          href: "https://book.stevejobsarchive.com/#email-apple-macintosh-fifteen",
          cta: "Read Steve in his own words",
        },
      ],
      closing:
        "Many agents may work for you. One should always remain on your side.",
    },
    order: 1,
  },
  {
    slug: "ecofresh",
    name: "EcoFresh Greensync",
    tagline: "Waste-to-value infrastructure. No segregation required.",
    heroImage: "/images/projects/ecofresh.png",
    role: "Co-Founder",
    timeline: "Nov 2025 — Present",
    techStack: [
      "AI/ML",
      "Polymer Modeling",
      "Bio-processing",
      "Catalytic Systems",
    ],
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
    name: "Agent systems",
    description:
      "The runtime around a model: context, tools, authority, durable execution, recovery, observability, and evaluation.",
    evidenceSlugs: ["atlan", "waldo"],
    skills: [
      { name: "Harness Architecture" },
      { name: "Context Composition" },
      { name: "Tool & Permission Design" },
      { name: "Durable Execution" },
      { name: "Recovery & Observability" },
      { name: "Outcome Evaluation" },
    ],
  },
  {
    name: "Models and data",
    description:
      "Work beneath model interfaces: multilingual data, curation, sparse-MoE architecture, experiments, and evaluation.",
    evidenceSlugs: ["project-eka", "qwen3-moe"],
    skills: [
      { name: "Pretraining Data" },
      { name: "Dataset Curation" },
      { name: "Multilingual Systems" },
      { name: "Mixture-of-Experts" },
      { name: "PyTorch" },
      { name: "Model Evaluation" },
    ],
  },
  {
    name: "Physical and cyber-physical systems",
    description:
      "Intelligence meeting sensors, machines, industrial operations, and consequences outside software.",
    evidenceSlugs: ["physical-systems"],
    skills: [
      { name: "Industrial IoT" },
      { name: "Sensing" },
      { name: "Edge Inference" },
      { name: "Automation" },
      { name: "Control Systems" },
      { name: "Manufacturing Systems" },
    ],
  },
];

export const currentlyExploring =
  "Persistent agents, long-horizon evaluation, user-owned memory, and physical AI";

// ==================== TIMELINE ====================

export const experiencePageData: ExperiencePageData = {
  eyebrow: "Experience",
  title: "A chronology of work, questions, and returns.",
  introduction:
    "The work makes more sense to me as a sequence of encounters—not a master plan.",
  metadata: {
    description:
      "A public chronology of Shivansh Fulper's work across agent systems, model infrastructure, physical systems, and technical community.",
    openGraphDescription:
      "A public chronology of work, evidence, and questions carried forward across models, agents, and the physical world.",
  },
  chronologyLabel: "Chronology",
  evidenceLabel: "Bounded evidence",
  nextQuestionLabel: "Question carried forward",
  linksLabel: "Public links",
};

export const timelineData: TimelineEntry[] = [
  {
    year: "2026",
    title: "Founder",
    organization: "Waldo",
    description:
      "Building a user-owned personal agent and its first Mac home, while keeping product claims separate from the deeper research questions the work exposes.",
    type: "startup",
    tags: ["Persistent Agents", "Memory", "Control", "Evaluation"],
    dateRange: "May 2026 — Present",
    evidence:
      "Kennel, a durable harness, and Waldo mobile are working internal foundations; Kennel has bounded live Codex acceptance.",
    nextQuestion:
      "Can one personal relationship preserve intent and evidence across agents while reducing what the person must carry?",
  },
  {
    year: "2026",
    title: "FDE & AI Engineer Intern",
    organization: "Atlan",
    description:
      "Worked where models became production systems with context, tools, credentials, integrations, deployment, and real failure modes.",
    type: "work",
    tags: ["Production Agents", "Agent Infrastructure", "Reliability"],
    dateRange: "Jan — Jun 2026",
    evidence:
      "Helped build and operate more than 30 production agent instances across teams and workflows.",
    nextQuestion:
      "What does it take to know that an agent's finished run actually resolved the human outcome?",
  },
  {
    year: "2025",
    title: "MTS Intern · LLM Pre-training",
    organization: "Soket AI Labs · Project EKA",
    description:
      "Worked below the model interface on multilingual curation and reproducible experimentation for an IndiaAI Mission-backed sparse-MoE program.",
    type: "work",
    tags: ["Multilingual Data", "Sparse MoE", "Experiments"],
    dateRange: "Jul — Sep 2025",
    evidence:
      "Built Eka Curator and worked on the COOM framework; the program's full scale remains attributed to Project EKA.",
    nextQuestion:
      "How much of model capability is decided by data and evaluation before architecture receives the credit?",
    links: [
      {
        label: "Explore Project EKA",
        url: "https://soket.ai/project-eka",
        external: true,
      },
    ],
  },
  {
    year: "2025",
    title: "MIRAI-Setu Participant",
    organization: "India–Japan Exchange",
    description:
      "Selected among 40 students from India by Japan’s Ministry of Foreign Affairs for a month-long India–Japan exchange, including a 15-day technology internship and meetings with public and technology leaders in Fukuoka.",
    type: "achievement",
    tags: ["Japan", "Technology Exchange", "Kaizen"],
    dateRange: "Oct 2025",
    evidence:
      "Selected for the month-long 2025 program and company-internship exchange; the published yearbook records the cohort.",
    nextQuestion:
      "What makes a technical system worthy of trust over decades rather than impressive for a launch?",
    links: [
      {
        label: "2025 Yearbook",
        url: "https://issuu.com/afsindia/docs/mirai-setu_2025?fr=sNWZlZTgzNTM2NzQ",
        external: true,
      },
      {
        label: "Read my reflection",
        url: "/writing/mirai-setu-japan",
      },
    ],
  },
  {
    year: "2024",
    title: "AI Engineer Intern",
    organization: "OpenFn (C4GT)",
    description:
      "NLP-to-workflow pipeline for government-tech data integrations. Selected under the Code for GovTech national open-source program.",
    type: "work",
    tags: ["NLP", "Open Source", "GovTech"],
    dateRange: "Jun — Sep 2024",
    evidence:
      "Built an NLP-to-workflow contribution through the national Code for GovTech open-source program.",
    nextQuestion:
      "How do language models become dependable components inside systems with explicit schemas and consequences?",
  },
  {
    year: "2023–25",
    title: "HackByte Lead Organiser",
    organization: "The Programming Club · IIITDM Jabalpur",
    description:
      "Helped grow HackByte from an internal college event to 5,154 registrations across three years. As a Programming Club core member and mentor, I also started ML Summer School and Winter of ML for structured projects and peer learning.",
    type: "achievement",
    tags: ["Community", "Hackathon", "Lead Organiser"],
    dateRange: "2023 — 2025",
    evidence:
      "Helped grow HackByte from an internal event to 5,154 registrations and started project-led ML learning programs.",
    nextQuestion:
      "How do you make technical depth inviting without lowering the standard?",
    links: [
      {
        label: "Visit HackByte",
        url: "https://www.hackbyte.in/",
        external: true,
      },
    ],
  },
  {
    year: "2022",
    title: "B.Tech — Smart Manufacturing",
    organization: "IIITDM Jabalpur",
    description:
      "Completed a B.Tech in Smart Manufacturing as branch topper with an 8.5 CPI, studying AI/ML, mechatronics, industrial systems, and design at the boundary between software intelligence and the physical world.",
    type: "education",
    tags: ["AI/ML", "Mechatronics", "Systems Design"],
    dateRange: "Oct 2022 — Jun 2026",
    evidence:
      "Completed the degree as branch topper with an 8.5 CPI; co-invented published dental-inspection and waste-to-value patent applications.",
    nextQuestion:
      "What changes when intelligent software must perceive and act in a noisy physical world?",
  },
];

// ==================== LIVING NOTEBOOK ====================

export const publicArtifacts: PublicArtifact[] = [
  {
    slug: "waldo",
    title: "Waldo",
    kind: "venture",
    theme: "agents",
    date: "2026-05",
    summary:
      "A user-owned personal agent exploring how intent, evidence, correction, and unfinished work can remain coherent across agents and time.",
    href: "/work/waldo",
    featured: true,
    publicationState: "public",
    evidenceStatus: "built",
    image: "/images/projects/waldo/waldo-ecosystem.webp",
    caption: "A current venture and an active research question.",
  },
  {
    slug: "atlan",
    title: "Atlan — production agent systems",
    kind: "research",
    theme: "agents",
    date: "2026-01",
    summary:
      "Production work across context, tools, authentication, integrations, deployment, and reliability made the gap between a finished run and a completed outcome impossible to ignore.",
    href: "/experience",
    featured: true,
    publicationState: "public",
    evidenceStatus: "observed",
  },
  {
    slug: "project-eka",
    title: "Project EKA — model and data infrastructure",
    kind: "research",
    theme: "models",
    date: "2025-07",
    summary:
      "Multilingual curation infrastructure and reproducible experimentation for a sparse-MoE program, with the program's scale kept distinct from an individual contribution.",
    href: "https://soket.ai/project-eka",
    external: true,
    featured: true,
    publicationState: "public",
    evidenceStatus: "built",
  },
  {
    slug: "qwen3-moe",
    title: "Qwen3 MoE — understanding by rebuilding",
    kind: "code",
    theme: "models",
    date: "2025",
    summary:
      "A from-scratch PyTorch implementation for understanding sparse routing, grouped-query attention, RoPE, normalization, and KV caching at code level.",
    href: "https://github.com/Pin4sf/Qwen3-MoE-Self-Implementation",
    external: true,
    featured: true,
    publicationState: "public",
    evidenceStatus: "built",
  },
  {
    slug: "agent-done-outcome-truth",
    title: "When an Agent Says Done, What Is Actually True?",
    kind: "writing",
    theme: "agents",
    date: "2026-08-13",
    summary:
      "A practical distinction between a run, an artifact, evidence, an accepted outcome, and the open loop that remains.",
    href: "/writing/agent-done-outcome-truth",
    featured: true,
    publicationState: "public",
    evidenceStatus: "derived",
  },
  {
    slug: "memory-is-not-storage",
    title: "Memory Is Not Storage",
    kind: "writing",
    theme: "agents",
    date: "2026-08-12",
    summary:
      "Why useful personal memory needs source, time, scope, correction, expiry, revocation, and deletion rather than an endless archive.",
    href: "/writing/memory-is-not-storage",
    featured: true,
    publicationState: "public",
    evidenceStatus: "derived",
  },
  {
    slug: "harness-is-part-of-the-agent",
    title: "The Harness Is Part of the Agent",
    kind: "writing",
    theme: "agents",
    date: "2026-08-11",
    summary:
      "What a comparison of more than 40 public agent harnesses reveals about the systems around a model.",
    href: "/writing/harness-is-part-of-the-agent",
    featured: true,
    publicationState: "public",
    evidenceStatus: "derived",
  },
  {
    slug: "hackbyte",
    title: "HackByte",
    kind: "life",
    theme: "design",
    date: "2023-2025",
    summary:
      "A team effort to grow an internal college event into a public community with 5,154 registrations and project-led machine-learning learning programs.",
    href: "https://www.hackbyte.in/",
    external: true,
    featured: true,
    publicationState: "public",
    evidenceStatus: "demonstrated",
  },
  {
    slug: "mirai-setu",
    title: "MIRAI-Setu — Japan field note",
    kind: "field-note",
    theme: "life",
    date: "2025-10",
    summary:
      "A month across Fukuoka, Nagasaki, and Tokyo that sharpened an interest in infrastructure, safety, craft, and long time horizons.",
    href: "/writing/mirai-setu-japan",
    featured: false,
    publicationState: "public",
    evidenceStatus: "observed",
  },
  {
    slug: "smart-manufacturing",
    title: "Smart Manufacturing",
    kind: "field-note",
    theme: "world",
    date: "2022-2026",
    summary:
      "A physical-systems foundation in sensing, industrial automation, and design, where uncertainty, latency, energy, safety, and irreversibility remain visible.",
    href: "/experience",
    featured: true,
    publicationState: "public",
    evidenceStatus: "historical",
  },
];

export const researchPageData: ResearchPageData = {
  eyebrow: "Research + Writing",
  title: "A living notebook for models, agents, and the world.",
  introduction:
    "I study what happens after a model becomes a system: what it remembers, what it may change, and how we know its work became real.",
  metadata: {
    description:
      "Research questions, working positions, public artifacts, and open uncertainty across models, agents, and physical systems.",
    openGraphDescription:
      "A living research notebook about models, agent systems, outcome truth, and the longer path into the physical world.",
  },
  threadLabel: "Follow the research thread",
  thread: [
    { label: "Models", href: "#models" },
    { label: "Agents", href: "#agents" },
    { label: "World", href: "#world" },
  ],
  questionLabel: "Governing question",
  positionLabel: "Current position",
  uncertaintyLabel: "Still uncertain",
  writingLabel: "Related writing",
  artifactsLabel: "Public artifacts",
  emptyWriting:
    "No published essay yet; the public work below holds the question open.",
};

export const writingPageData = {
  eyebrow: "Writing",
  title: "Notes from the work.",
  introduction:
    "Research essays, field notes, and historical chapters from building and studying agent systems.",
  metadata: {
    description:
      "Research essays and field notes by Shivansh Fulper on agent harnesses, memory and state, outcome evaluation, and agents in the physical world.",
    openGraphDescription:
      "Research essays and field notes on agent harnesses, memory and state, and outcome evaluation.",
  },
} as const;

export const researchClusters: ResearchCluster[] = [
  {
    slug: "models",
    title: "Models and data",
    question:
      "How much of a model's capability is decided by data and evaluation before architecture receives the credit?",
    position:
      "Model behavior starts below the interface: curation, language coverage, contamination, evaluation, and implementation choices shape what a system can become.",
    uncertainty:
      "The relationship between model-level tradeoffs and the behavior of a long-running agent remains an active question.",
    artifactSlugs: ["project-eka", "qwen3-moe"],
  },
  {
    slug: "agents",
    title: "Agents, memory, and authority",
    question:
      "What should persist when an agent crosses sessions, tools, and models—and what authority should never move with it?",
    position:
      "Useful continuity needs correctable context, bounded permission, inspectable action, and a person who can intervene.",
    uncertainty:
      "These are design positions shaped by current work, not a claim that every mechanism is shipped or validated.",
    artifactSlugs: [
      "waldo",
      "atlan",
      "memory-is-not-storage",
      "harness-is-part-of-the-agent",
    ],
  },
  {
    slug: "outcome-truth",
    title: "Outcome truth and evaluation",
    question:
      "When an agent says done, what became true—and what still belongs to the person?",
    position:
      "A completed run, an artifact, evidence, an accepted outcome, and an open loop are different kinds of truth.",
    uncertainty:
      "The proposed measures for accepted outcomes still need repeated testing beyond bounded internal acceptance.",
    artifactSlugs: ["agent-done-outcome-truth", "atlan", "waldo"],
  },
  {
    slug: "world",
    title: "Agents in the world",
    question:
      "How should agent state and control change when action crosses into physical environments?",
    position:
      "Physical systems keep uncertainty, timing, material cost, safety, and irreversible consequences in view.",
    uncertainty:
      "Physical AI is a longer-term research direction, not a current deployment or claim of robotics expertise.",
    artifactSlugs: ["smart-manufacturing", "mirai-setu"],
  },
];

export const compassPrinciples: CompassPrinciple[] = [
  {
    title: "Keep meaningful authority with the person.",
    body: "An agent can prepare, recommend, and act within permission. Remembering more never silently grants it more authority.",
    artifactSlugs: ["waldo", "memory-is-not-storage"],
  },
  {
    title: "Do not confuse a finished run with a completed outcome.",
    body: "An artifact, evidence, acceptance, and the remaining open loop are different kinds of truth.",
    artifactSlugs: ["agent-done-outcome-truth"],
  },
  {
    title: "Make personal context correctable and user-owned.",
    body: "Useful memory needs source, time, scope, correction, expiry, revocation, and deletion.",
    artifactSlugs: ["memory-is-not-storage", "waldo"],
  },
  {
    title: "Make powerful systems inspectable.",
    body: "The more a system can do, the easier it should be to understand what happened and intervene.",
    artifactSlugs: ["harness-is-part-of-the-agent"],
  },
  {
    title: "Let design make complexity quieter.",
    body: "Good defaults, calm feedback, and deliberate motion should reduce the amount a person has to decode.",
    artifactSlugs: ["waldo"],
  },
  {
    title: "Change the system when reality contradicts the story.",
    body: "A neat narrative is not evidence. What the system actually did should be allowed to change the product and the belief behind it.",
    artifactSlugs: ["agent-done-outcome-truth"],
  },
];

export const personalInfluences: PersonalInfluence[] = [
  {
    slug: "pokedex-origin",
    title: "The kid who wanted a Pokédex.",
    kind: "origin",
    summary:
      "I started coding at 12 to build a Pokédex: a first attempt to make a system personal, useful, and worth understanding.",
    publicationState: "public",
  },
  {
    slug: "systems-tinkering",
    title: "Learning the defaults by breaking them",
    kind: "origin",
    summary:
      "Jailbreaking phones, rooting devices, and customizing PCs taught me to trace a system past its intended surface without mistaking tinkering for expertise.",
    publicationState: "public",
  },
  {
    slug: "hackbyte-community",
    title: "Making technical depth inviting",
    kind: "community",
    summary:
      "HackByte made community-building concrete: invite people into serious technical work without lowering the standard.",
    href: "https://www.hackbyte.in/",
    publicationState: "public",
  },
  {
    slug: "mirai-setu-craft",
    title: "Japan, craft, and long horizons",
    kind: "place",
    summary:
      "MIRAI-Setu made infrastructure, safety, patience, and everyday attention to craft feel like engineering values rather than abstractions.",
    href: "/writing/mirai-setu-japan",
    publicationState: "public",
  },
  {
    slug: "design-engineering",
    title: "Design as quieter engineering",
    kind: "design",
    summary:
      "I care about what deserves motion, what should remain quiet, and how defaults can make powerful systems easier to trust.",
    publicationState: "public",
  },
];

export const readingEntries: ReadingEntry[] = [
  {
    slug: "mirai-setu-craft",
    title: "Japan, craft, and long horizons",
    creator: "MIRAI-Setu",
    kind: "place",
    annotation:
      "MIRAI-Setu made infrastructure, safety, patience, and everyday attention to craft feel like engineering values rather than abstractions.",
    lastingQuestion:
      "What makes a technical system worthy of trust over decades rather than impressive for a launch?",
    externalUrl: "/writing/mirai-setu-japan",
    date: "2025-10",
    publicationState: "public",
  },
  {
    slug: "design-engineering",
    title: "Design as quieter engineering",
    creator: "Shivansh Fulper",
    kind: "design",
    annotation:
      "I care about what deserves motion, what should remain quiet, and how defaults can make powerful systems easier to trust.",
    lastingQuestion:
      "How can design make powerful systems easier to trust without hiding their complexity?",
    publicationState: "public",
  },
  {
    slug: "hackbyte-community",
    title: "Making technical depth inviting",
    creator: "HackByte community",
    kind: "design",
    annotation:
      "HackByte made community-building concrete: invite people into serious technical work without lowering the standard.",
    lastingQuestion:
      "How do you make technical depth inviting without lowering the standard?",
    externalUrl: "https://www.hackbyte.in/",
    date: "2023-2025",
    publicationState: "public",
  },
];

export const readingPageData: ReadingPageData = {
  eyebrow: "Reading",
  title: "Notes that keep changing the work.",
  introduction:
    "A small, public record of places, communities, and design questions that continue to shape how I build.",
  metadata: {
    description:
      "A public reading record of the places, communities, and design questions shaping Shivansh Fulper's work.",
    openGraphDescription:
      "Places, communities, and design questions that continue to shape the work.",
  },
};

export const aboutPageData: AboutPageData = {
  eyebrow: "About",
  title: "A life spent following systems past their defaults.",
  metadata: {
    description:
      "A candid account of Shivansh Fulper's path from early systems curiosity to persistent agents and a longer-term interest in physical AI.",
    openGraphDescription:
      "A candid account of systems curiosity, learning by building, and the longer horizon ahead.",
  },
  headerIntroduction:
    "A candid account of the systems that first caught my attention, the work that keeps reshaping the questions, and the direction I am still learning toward.",
  introduction: [
    "The kid who wanted a Pokédex. I started coding at 12 to build one, then spent years jailbreaking phones, rooting devices, and customizing PCs. I was drawn less to novelty than to the question underneath: how does this system work, and how could it become more personal and useful?",
    "Learning by building. Smart Manufacturing gave me a physical-systems foundation; HackByte made technical community a responsibility; Project EKA and Qwen3 MoE took the questions into models; Atlan exposed the reality of agents in production; and Waldo is where I am testing what durable, user-owned agency can mean.",
  ],
  introductionLabel: "Introduction",
  learningArtifactSlugs: [
    "smart-manufacturing",
    "hackbyte",
    "project-eka",
    "atlan",
    "waldo",
  ],
  learningArtifactsLabel: "The public record behind this chapter",
  influencesHeading: "What keeps shaping the work",
  influencesKicker: "01 / Influences",
  principlesHeading: "A working compass",
  principlesKicker: "02 / Principles",
  longerHorizonHeading: "The world I keep moving toward",
  longerHorizonKicker: "03 / Longer horizon",
  longerHorizon: [
    "The world I keep moving toward is one where agents meet physical environments. Smart Manufacturing left me attentive to uncertainty, latency, energy, safety, and irreversibility—the things software can make easy to forget.",
    "MIRAI-Setu deepened that interest through infrastructure, craft, and long time horizons across Japan. Physical AI is a direction I am studying, not a claim of current deployment or robotics expertise.",
  ],
  longerHorizonArtifactSlugs: ["smart-manufacturing", "mirai-setu"],
  nowHeading: "Now",
  nowKicker: "04 /",
  connectHeading: "Find me in public",
  connectKicker: "05 / Contact",
  relatedArtifactsLabel: "Related public artifacts",
  now: {
    date: "August 2026",
    body: "I am building Waldo, studying persistent agents and long-horizon evaluation, and looking to meet thoughtful builders and researchers working on how powerful systems can remain useful, legible, and on a person's side.",
  },
};

// ==================== CONTACT ====================

export const contactData: ContactData = {
  email: "piyushfulper3210@gmail.com",
  formAction: "https://formsubmit.co/piyushfulper3210@gmail.com",
  location: "Nagpur, India",
  socials: [
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/shivansh-fulper/",
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
  return getPublicCaseStudies()
    .filter((cs) => cs.featured)
    .sort((a, b) => a.order - b.order);
}

export function getPublicCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.slug === "waldo");
}

export function getFeaturedEvidence(): EvidenceRecord[] {
  return evidenceRecords.filter((record) => record.featured);
}

export function getEvidenceBySlug(slug: string): EvidenceRecord | undefined {
  return evidenceRecords.find((record) => record.slug === slug);
}

export function getPublicArtifacts(
  filter: PublicArtifactFilter = {},
): PublicArtifact[] {
  // Public collections include entries only when artifact.publicationState === "public".
  return publicArtifacts.filter((artifact) => {
    if (artifact.publicationState !== "public") return false;
    if (filter.theme && artifact.theme !== filter.theme) return false;
    if (filter.kind && artifact.kind !== filter.kind) return false;
    if (
      filter.featured !== undefined &&
      artifact.featured !== filter.featured
    ) {
      return false;
    }
    return true;
  });
}

export function getPublicReadingEntries(limit?: number): ReadingEntry[] {
  const entries = readingEntries.filter(
    (entry) =>
      entry.publicationState === "public" &&
      entry.title.trim().length > 0 &&
      entry.annotation.trim().length > 0,
  );
  return limit === undefined ? entries : entries.slice(0, limit);
}

export function getVentures(): CaseStudy[] {
  return getPublicCaseStudies().filter(
    (cs) => cs.category === "venture" && cs.slug === "waldo",
  );
}

export function getProjects(): CaseStudy[] {
  return caseStudies
    .filter((cs) => cs.category === "project" || cs.category === "experiment")
    .sort((a, b) => a.order - b.order);
}
