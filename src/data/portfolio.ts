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

export interface CaseStudyMedia {
  src: string;
  alt: string;
  caption: string;
  presentation?: "standard" | "poster";
}

export interface CaseStudyNarrativeSection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  cards?: CaseStudyCard[];
  media?: CaseStudyMedia;
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
  heroBody: string;
  status: string[];
  heroImageAlt: string;
  heroImageCaption: string;
  sections: CaseStudyNarrativeSection[];
  teamIntro: string;
  team: CaseStudyPerson[];
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
  links?: {
    label: string;
    url: string;
    external?: boolean;
  }[];
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
  title: "Shivansh Fulper — AI Agents, Systems, Startups",
  description:
    "Founder and AI systems engineer building Waldo and Kennel: a user-owned agent and its first Mac home. Previously built production agent systems at Atlan; B.Tech, IIITDM Jabalpur, 2026.",
  author: "Shivansh Fulper",
  keywords:
    "Shivansh Fulper, AI Engineer, Waldo, Kennel, EcoFresh Greensync, Atlan, AI Agents, Agent Orchestration, Human-Agent Systems, LLM, RAG, Codex, Cloudflare Durable Objects, IIITDM Jabalpur",
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
  tagline: "I’m building the agent that stays on your side.",
  subtitle:
    "Waldo + Kennel · Co-founder, EcoFresh Greensync · B.Tech, IIITDM Jabalpur ’26",
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

// ==================== ABOUT ====================

export const aboutData: AboutData = {
  bio: `I’m building Waldo and Kennel: a user-owned personal agent and its first home on the Mac. I care about what happens after an agent says “done” — whether the outcome is real, what still needs human judgment, and how one agent can remain on the person’s side across models, tools, work, life, and eventually physical devices.

At Atlan, I helped build and operate more than 30 production agent instances through AtlanClaw. That work made one gap impossible to ignore: an agent finishing a task and the task actually being done are two different things. It shaped how I think about continuity, permission, evidence, and personal agency.

I started coding at 12 to build a Pokédex, then spent years jailbreaking phones and tracing systems past their intended limits. At IIITDM Jabalpur, I grew HackByte from an internal college event to 5,154 registrations as a lead organiser across three years, placed third at Qualcomm VisionX, co-invented a granted AI dental-inspection patent and a published EcoFresh waste-to-value patent application, and graduated branch topper with an 8.5 CPI. Project EKA, Code for GovTech, EcoFresh, and implementing Qwen3 MoE from scratch took that instinct into frontier models and real-world systems. MIRAI-Setu took me across Japan in 2025 and deepened my interest in craft, manufacturing, infrastructure, and long time horizons.`,
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
  interests: ["Physical AI", "Industry 4.0", "Quantum + AI"],
};

// ==================== CASE STUDIES ====================

export const caseStudies: CaseStudy[] = [
  {
    slug: "waldo",
    name: "Waldo",
    tagline: "A user-owned agent that stays on your side.",
    heroImage: "/images/projects/waldo/waldo-ecosystem.webp",
    role: "Co-Founder & CEO",
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
      "Today's agents know the prompt and the current session. The person still carries the real outcome, the surrounding commitments, the follow-ups, and the consequences when work stalls. As people run more Codex, Claude Code, and OpenCode sessions in parallel, agent activity becomes harder to coordinate and a confident “done” can still leave the human with an unresolved task.",
    approach:
      "Start with the users who already feel the coordination problem. Kennel is Waldo's native home on the Mac, beginning with attributable Codex sessions, conversation, live state, and same-task continuation. Underneath, Agent Session, Outcome Verification, and the human Open Loop remain different kinds of truth. Waldo adds only the personal context the user permits — priorities, commitments, boundaries, capacity, health context, and prior corrections — so assistance stays grounded in the person rather than just the prompt.",
    solution:
      "We have three working foundations used internally: Kennel on macOS, a durable agent harness, and Waldo on iOS. Kennel provides the governed desktop surface and a local durable event foundation. The harness covers resumable agent work, typed tools, permissions, scheduling, delivery, and audit. The iOS foundation carries personal and health context. The next product proof is integrating those foundations around evidence-linked outcomes, user-confirmed open loops, and low-risk orchestration help — without turning activity into an opaque score or letting insight silently grant authority.",
    solutionImages: [
      "/images/projects/waldo/hero.png",
      "/images/projects/waldo/app-screens.png",
      "/images/projects/waldo/iphone-1.png",
      "/images/projects/waldo/iphone-2.png",
    ],
    impact:
      "Since May 2026, we have built the three foundations and use them internally. Kennel has recorded live Codex acceptance for bounded multi-session discovery, populated conversation history, real-time processing state, same-task continuation, first-message handling, and archive cleanup. Its local contracts deliberately keep provider activity, outcome evidence, and the user's remaining obligation separate. Broader provider coverage, automatic artifact verification, cross-session continuity, and a fully integrated Mac–iOS–harness experience are the next proofs, not claims we present as shipped.",
    reflection:
      "More agent autonomy does not remove the person's coordination burden; it can hide it behind more activity. The personal agent worth building is not the one that produces the most tasks or remembers the most data. It is the one that preserves intent, asks for judgment at the right moment, distinguishes evidence from confidence, and helps the user consciously finish, defer, transfer, or release what remains open.",
    pullQuote:
      "An agent finishing a task and the task actually being done are two different things.",
    narrative: {
      brandMark: {
        src: "/images/projects/waldo/logo.svg",
        alt: "Waldo",
      },
      heroEyebrow: "Waldo · What I believe agents should become",
      heroStatement:
        "An agent finishing a task and the task actually being done are two different things.",
      heroBody:
        "I’m building Waldo: a private, user-owned personal agent that carries the context you permit across models, tools, work, life, and—eventually—physical devices. One agent, many presences, always on your side.",
      status: [
        "User-owned continuity",
        "One agent · many presences",
        "Software → physical AI",
      ],
      heroImageAlt:
        "Waldo product system map connecting a person with agents, accounts, and work tools",
      heroImageCaption:
        "The wider product idea: one personal agent coordinating the tools, models, accounts, and specialist agents a person chooses.",
      sections: [
        {
          id: "what-changed",
          eyebrow: "01 · What I learned",
          title: "Agents got more capable. We inherited the coordination.",
          body: [
            "When I was building and operating more than 30 production agent instances at Atlan, the difficult part was rarely getting an agent to produce something. It was remembering why each session existed, moving context between tools, catching a waiting decision, and checking whether the result actually solved the original problem.",
            "That changed how I measure agent value. A longer session, a confident answer, or a green “done” state is not the outcome. The unit that matters is whether the person’s original problem was solved—and what they still have to carry afterward.",
          ],
          cards: [
            {
              label: "The session",
              title: "What the agent sees",
              body: "The prompt, the available tools, and whether its run finished.",
            },
            {
              label: "The outcome",
              title: "What actually changed",
              body: "Whether the person’s original problem was solved in the real world.",
            },
            {
              label: "The person",
              title: "What still matters",
              body: "The follow-ups, consequences, capacity, and commitments left behind.",
            },
          ],
        },
        {
          id: "philosophy",
          eyebrow: "02 · What I believe",
          title: "An agent should care about the person behind the task.",
          body: [
            "ChatGPT or Claude can answer what you ask. I want Waldo to understand why you need it, when it matters, what it affects, and whether it was actually resolved. That requires continuity across the parts of life that shape a decision: priorities, commitments, boundaries, relationships, capacity, corrections, health context, and outcome history.",
            "Technical users already assemble memory systems, reminders, dashboards, and handoffs around their agents. I don’t think most people should have to. The shift I care about is similar to the move from hobby computers to personal computers: make powerful agents personal, understandable, and useful to ordinary people.",
          ],
          cards: [
            {
              label: "Person before prompt",
              title: "Care about the why",
              body: "The current request is only one fragment of the person’s intent and circumstances.",
            },
            {
              label: "Action over dashboards",
              title: "Insight must help",
              body: "A chart or score that hands the coordination burden back to the user is not enough.",
            },
            {
              label: "Agency over lock-in",
              title: "The layer belongs to you",
              body: "The person can inspect it, correct it, change providers, and consciously release what no longer matters.",
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
          id: "platform",
          eyebrow: "03 · My platform bet",
          title: "One agent. Many presences. Still yours.",
          body: [
            "I don’t believe one model or one interface will own our entire digital life. People will use many models, specialist agents, tools, and devices. Waldo should be the continuous layer on the person’s side: remembering the context they choose, briefing each system for the work in front of it, and keeping the resulting decisions and outcomes connected.",
            "The models are replaceable. Your continuity is not. My bet is that context, workflow, trust, and permission should stay with the person while the work moves to the best available model or tool. This becomes a model-agnostic personal orchestration layer: each surface is another presence of the same agent—not another assistant with its own memory and agenda.",
          ],
          cards: [
            {
              label: "Context",
              title: "Composed, not copied",
              body: "Each tool receives the smallest useful view of what matters now—not an indiscriminate memory dump.",
            },
            {
              label: "Continuity",
              title: "Across every surface",
              body: "Work, life, body context, corrections, and outcomes remain connected without being trapped in one provider.",
            },
            {
              label: "Permission",
              title: "Authority stays explicit",
              body: "Waldo can suggest before it executes, show provenance, and never let insight silently grant itself permission.",
            },
          ],
        },
        {
          id: "kennel",
          eyebrow: "04 · Why start here",
          title: "Kennel is the first home, not the whole vision.",
          body: [
            "I wanted to begin where the problem is already painful and observable: people running several coding agents on a Mac. Kennel runs continuously as their desktop home, showing what finished, what needs a decision, what is still open, and the conversation behind the work. Over time it can reveal where agents repeatedly stall, which corrections recur, and which workflows actually reach the intended outcome.",
            "With Suyash and Ashish, I’m building Kennel, an earlier iOS foundation, and Waldo’s durable harness as working pieces we use internally. There are no external users or revenue yet. Kennel is where we can earn the right to carry more of a person’s context by first proving that the coordination layer is useful and trustworthy.",
          ],
          cards: [
            {
              label: "Finished",
              title: "What the agent reports",
              body: "Live, attributable session state and the original conversation remain visible.",
            },
            {
              label: "Verified",
              title: "What evidence supports",
              body: "The intended outcome is evaluated separately from a provider’s confident done state.",
            },
            {
              label: "Still open",
              title: "What the person carries",
              body: "The user decides whether to finish, defer, transfer, or consciously release the remaining obligation.",
            },
          ],
          media: {
            src: "/images/projects/waldo/kennel-overview.png",
            alt: "Kennel on macOS showing attributable agent instances and their current state",
            caption:
              "Kennel today: a native Mac home for seeing agent work, opening the underlying session, and keeping the person in control.",
          },
        },
        {
          id: "technical-depth",
          eyebrow: "05 · Principles I won’t trade away",
          title: "A personal agent is a relationship with clear boundaries.",
          body: [
            "I’m building the system underneath Waldo as a durable harness for resumable work, typed tools, delivery, scheduling, audit, memory composition, provider adapters, and security boundaries. But those technical choices follow a human philosophy: continuity should be inspectable, correction should be easy, and authority should fail closed.",
            "I want Waldo to learn from what a person explicitly says, the corrections they make, and outcomes they verify. I do not want behavioral traces turned into a hidden personality score. Memory is useful only when the user can see it, change it, and decide what the agent should no longer carry.",
          ],
          cards: [
            {
              label: "Suggest before execute",
              title: "Help without taking over",
              body: "Low-risk assistance can be proactive; consequential action stays bounded by visible permission.",
            },
            {
              label: "Statements before inference",
              title: "The user can correct the model",
              body: "What the person says about themselves outranks patterns inferred from agent activity.",
            },
            {
              label: "Closure over accumulation",
              title: "Memory can be released",
              body: "The goal is not infinite recall; it is conscious continuity, correction, and closure.",
            },
          ],
        },
        {
          id: "long-horizon",
          eyebrow: "06 · Where I think this goes",
          title: "Software earns the right to become physical.",
          body: [
            "I keep returning to bodies for AI: physical forms people would actually welcome into daily life—a desk object, a wearable, a home device, or a small robot. The same Waldo should inhabit each of them, carrying one identity and permission system instead of making every object another disconnected assistant.",
            "That is why I believe software has to come first. Before an agent gets more sensors, motion, or physical authority, memory, correction, permission, and recovery must work for the person. Health and body data matter to me as foundational life context; they are not Waldo’s product category.",
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
      teamIntro:
        "Ashish and I became friends at school over a shared obsession with iOS jailbreaking. Years later, I met Suyash in our university computer centre and showed him how to build a website with AI. Waldo is the first thing the three of us have built together.",
      team: [
        {
          name: "Shivansh Fulper",
          role: "Co-Founder & CEO · AI systems & engineering",
          body: "Leads agent architecture, infrastructure, and engineering. Previously built and operated 30+ production agents at Atlan; also worked on Indic language-model data, open-source GovTech, and a from-scratch Qwen3 MoE implementation.",
        },
        {
          name: "Suyash Pingale",
          role: "Co-Founder · Product, experience & brand",
          body: "Leads product, experience, brand, and design. His experience running a design studio while training for an Ironman helped expose how much work and life context still had to be coordinated in a person’s head.",
        },
        {
          name: "Ashish Tembhekar",
          role: "Founding Engineer",
          body: "Works with Shivansh on technical execution, bringing prior AI engineering experience and a long history of building and experimenting together.",
        },
      ],
      artifactsIntro:
        "The shortest route through the work: meet the founders, see the earlier product foundation, then go deeper into the system and the company.",
      artifacts: [
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
          eyebrow: "Product video · Earlier foundation",
          title: "The path from body context to action",
          description:
            "An earlier mobile product chapter. It shows where Waldo began; Kennel and the user-owned continuity layer are the current wedge.",
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
          eyebrow: "Pitch deck",
          title: "The company in twelve slides",
          description:
            "The problem, wedge, platform, team, and path from personal agents to consumer bodies for AI.",
          href: "https://waldo-technical-brief.pages.dev/waldo-pitchdeck.pdf",
          cta: "Open the pitch deck",
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
      ],
      closing:
        "The goal is not one more assistant competing for attention. It is a user-owned layer that helps people keep their agency as models, tools, and machines become more capable.",
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
  "Physical AI, Industry 4.0, Quantum + AI, and user-owned personal agents";

// ==================== TIMELINE ====================

export const timelineData: TimelineEntry[] = [
  {
    year: "2026",
    title: "FDE & AI Engineer Intern",
    organization: "Atlan",
    description:
      "Helped build and operate more than 30 production agent instances through AtlanClaw, working across context, tools, authentication, integrations, deployment, and the failures that appear once people rely on agents.",
    type: "work",
    tags: [
      "Production Agents",
      "Agent Infrastructure",
      "TypeScript",
      "LLM Systems",
    ],
    dateRange: "Jan — Jun 2026",
  },
  {
    year: "2026",
    title: "Co-Founder & CEO",
    organization: "Waldo",
    description:
      "Building a user-owned personal agent for continuity across models, tools, work, and life. Kennel is its first Mac home for agent activity, human judgment, outcome evidence, and open loops.",
    type: "startup",
    tags: ["AI Agents", "macOS", "Codex", "Cloudflare Durable Objects"],
    dateRange: "May 2026 — Present",
  },
  {
    year: "2025",
    title: "Co-Founder",
    organization: "EcoFresh Greensync",
    description:
      "Decentralized waste-to-value infrastructure. 3 IP discoveries, Hult Prize recognition (16th/2500+ at IIT Bombay), Ministry of Education national recognition.",
    type: "startup",
    tags: ["CleanTech", "IoT", "3 IP Discoveries"],
    dateRange: "2025 — Present",
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
    year: "2025",
    title: "MTS Intern · LLM Pre-training",
    organization: "Soket AI Labs",
    description:
      "Contributed to Project EKA and built Eka Curator for its 120B-parameter Indic Mixture-of-Experts model, plus COOM infrastructure for reproducible LLM experiments under constrained GPU resources.",
    type: "work",
    tags: ["LLM Pre-training", "Data Pipelines", "GPU Infrastructure"],
    dateRange: "Jul — Sep 2025",
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
    title: "Developer Advocate Intern",
    organization: "Ionio AI",
    description:
      "Built AI proof-of-concepts, developer demos, internal tools, sample applications, and technical resources that turned the platform’s capabilities into practical workflows for developers.",
    type: "work",
    tags: ["Developer Experience", "AI Prototypes", "Technical Writing"],
    dateRange: "Feb — May 2025",
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
