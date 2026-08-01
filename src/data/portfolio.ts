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
  presentation?: "standard" | "poster" | "portrait";
  source?: {
    label: string;
    href: string;
  };
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
  matrix?: CaseStudyMatrix;
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
      "As people delegate more work to agents, they inherit a new job: reconciling what agents produced, what became true, and what still needs human judgment. Today's agents know the prompt and the current session. The person still carries the real outcome, the surrounding commitments, the follow-ups, and the consequences when work stalls.",
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
      heroEyebrow: "Waldo · Why I am building it",
      heroStatement:
        "An agent finishing a task and the task actually being done are two different things.",
      heroBody:
        "I’m building Waldo: a private, user-owned personal agent that carries the context you permit across models, tools, work, life, and—eventually—physical devices. One agent, many presences, always on your side. Kennel is its first home on the Mac.",
      status: [
        "Judgment now",
        "Sustainable agency throughout",
        "Physical authority later",
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
            "The session is a work log. The outcome is the product. When I was building and operating more than 30 production agent instances at Atlan, the difficult part was rarely getting an agent to produce something. It was remembering why each session existed, moving context between tools, catching a waiting decision, and checking whether the result actually solved the original problem.",
            "Suyash felt the same pressure from another direction while running a design studio and training for an Ironman. His work, commitments, routines, and health lived in tools that never understood how those things affected one another. The software could show more information. It could not decide what mattered now, what could wait, or what no longer deserved to be carried.",
            "The person delegated a problem, not a transcript—and should not inherit a second job stitching every result back into life. AI can do more work than ever. It should not leave you with more to carry.",
          ],
          cards: [
            {
              label: "The session",
              title: "What the agent sees",
              body: "The prompt, available tools, messages, artifacts, and whether its run finished.",
            },
            {
              label: "The outcome",
              title: "What actually changed",
              body: "Whether the person’s original problem was solved, supported by evidence rather than confidence.",
            },
            {
              label: "The person",
              title: "What still matters",
              body: "The judgment, follow-ups, consequences, capacity, and commitments left after the run.",
            },
          ],
        },
        {
          id: "three-pressures",
          eyebrow: "02 · The strategic map",
          title:
            "Judgment now. Sustainable agency throughout. Physical authority later.",
          body: [
            "I see three connected pressures, but I do not treat them as three equal markets. AI-output overload is the customer problem we can attack now through Kennel. Burnout and finite human capacity are the constitution for how Waldo should behave. Physical AI is the expansion horizon where the same questions of permission, evidence, interruption, and recovery become more consequential.",
            "The confidence is different too: the overload and burnout problems are already visible; the physical-world tailwind is strong, but Waldo has not yet validated a hardware product or customer wedge there.",
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
          id: "philosophy",
          eyebrow: "03 · What I believe",
          title: "An agent should care about the person behind the task.",
          body: [
            "ChatGPT or Claude can answer what you ask. I want Waldo to understand why you need it, when it matters, what it affects, and whether it was actually resolved. The current prompt is only one fragment of a person’s priorities, relationships, boundaries, capacity, corrections, and commitments.",
            "Life is already distributed across calendars, messages, files, health systems, models, tools, and other people. Waldo should help carry it forward without making the person rebuild themselves—or become the integration layer—every time the interface changes.",
            "The chatbox made intelligence available. It cannot be the whole interface for asynchronous work. The next layer is continuity, timing, permission, evidence, and closure: proactive enough to prepare what matters, but never presumptive about consequential action.",
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
              body: "The person can inspect it, correct it, change providers, and release what no longer matters.",
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
          eyebrow: "04 · My platform bet",
          title: "One agent. Many presences. Still yours.",
          body: [
            "I don’t believe one model or interface will own our entire digital life. People will use many models, specialist agents, tools, and devices. Waldo should be the continuous layer on the person’s side: remembering the context they choose, briefing each system for the work in front of it, and keeping the resulting decisions and outcomes connected.",
            "The models are replaceable. Your continuity is not. Context, workflow, trust, permission, corrections, and outcome history should stay with the person while the work moves to the best available model or tool.",
            "Many agents may work for you. One agent should remain on your side. Sometimes its presence is mobile, sometimes it is a careful judgment in Kennel, and eventually it may have a physical form—but it should remain the same user-owned relationship.",
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
              body: "Work, life context, corrections, and outcomes stay connected without being trapped in one provider.",
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
          eyebrow: "05 · Why start here",
          title: "Kennel is the first home, not the whole vision.",
          body: [
            "I wanted to begin where the problem is already painful and observable: people running several coding agents on a Mac. Kennel gives that work one calm place to land, showing what finished, what evidence supports, what needs a decision, and what remains open without asking the user to reopen every session.",
            "This is Waldo’s immediate customer problem: output is abundant, but review, judgment, verification, and closure are scarce. Kennel is not another multi-agent activity monitor; the underlying transcript remains available, but it is no longer the only way to understand the work.",
            "With Suyash and Ashish, I’m building Kennel, an earlier mobile foundation, and Waldo’s durable harness as pieces we use internally. The next proof is trustworthy continuity across those foundations—not a claim that the full vision is already shipped.",
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
          id: "attention",
          eyebrow: "06 · The product constitution",
          title:
            "More capable agents should mean less life held together in your head.",
          body: [
            "An agent waiting five minutes is inexpensive. A person reconstructing context across five agents, reviewing unverified changes, and finding the correct terminal is expensive. Infinite machine capacity does not create infinite human attention.",
            "The burnout economy is not a separate feature category for Waldo. It is a constraint on the product: do not make people supervise more software, monitor more feeds, stay permanently available, or optimize every part of life. Carry routine responsibility quietly and return only when timing, consequence, or authority genuinely belongs to the person.",
            "Success can mean less mental reassembly, fewer silently decaying commitments, a more realistic next action when capacity changes, and permission to decide that enough is enough. More machine work should mean less life held together in someone’s head.",
          ],
          cards: [
            {
              label: "After interruption",
              title: "Less mental reassembly.",
              body: "Restore the goal, last verified state, unresolved decision, artifacts, and smallest next action.",
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
          id: "boundaries",
          eyebrow: "07 · Principles I won’t trade away",
          title: "A personal agent is a relationship with clear boundaries.",
          body: [
            "More execution should never mean less agency. I’m building the system underneath Waldo for durable work, tools, scheduling, delivery, memory composition, provider adapters, and security—but those technical choices follow a human philosophy: continuity should be inspectable, correction should be easy, and authority should fail closed.",
            "I want Waldo to learn from what a person explicitly says, the corrections they make, and outcomes they verify. What the person says about themselves should outrank patterns inferred from activity. I do not want behavioral traces turned into a hidden personality score.",
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
              body: "Low-risk assistance can be proactive; consequential action stays bounded by visible permission.",
            },
            {
              label: "Durable responsibility",
              title: "Interfaces may disappear. Responsibility cannot.",
              body: "Replaceable models and temporary screens still need an inspectable record of intent, action, evidence, and consequence.",
            },
            {
              label: "Personal memory",
              title: "Memory can be corrected and released",
              body: "The user can inspect, correct, export, delete, and revoke what Waldo carries. Memory never silently becomes permission.",
            },
          ],
        },
        {
          id: "personal-computing",
          eyebrow: "08 · The interface lesson",
          title: "Agents exist. I want to make them personal.",
          body: [
            "Steve Jobs and Steve Wozniak helped turn computers from something hobbyists operated into something ordinary people could make part of their lives. I see agents at the same interface transition: the capability exists, but using it still asks people to think like operators.",
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
          eyebrow: "09 · The expansion horizon",
          title: "Software earns the right to become physical.",
          body: [
            "I keep returning to bodies for AI: physical forms people would actually welcome into daily life—a desk object, wearable, home device, vehicle, or small robot. The same Waldo should inhabit each of them, carrying one identity and permission system instead of making every object another disconnected assistant.",
            "The physical-AI tailwind is strong, but this is not a current Waldo hardware program and we have low current customer validation for it. Software comes first because identity, correction, permission, evidence, interruption, revocation, and recovery must work before a personal agent is trusted with sensors, movement, or physical authority.",
            "Health and body data matter to me as foundational, permissioned life context; they are not Waldo’s product category. The form may change. The person it works for should not.",
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
      teamEyebrow: "10 · Who I’m building with",
      teamTitle: "Waldo is the first company the three of us are building.",
      teamIntro:
        "Ashish and I became friends at school over a shared obsession with iOS jailbreaking. Years later, I met Suyash in the Computer Center at IIITDM Jabalpur and showed him how to build a website by describing it to an AI coding tool. Waldo is the first company the three of us are building together.",
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
          body: "Spent nine months working as an AI engineer before joining Waldo. He built much of the first app and health-data pipeline and now works across native iOS, Supabase, and agent infrastructure.",
        },
      ],
      artifactsEyebrow: "11 · Artifacts",
      artifactsTitle: "See the work, then go deeper.",
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
          eyebrow: "External signal · Andrew Chen",
          title: "More outcomes, fewer copilots",
          description:
            "Andrew Chen describes the shift from AI that assists to agents that act—and the frustration of receiving more work to review. Waldo’s answer is not action alone: it is evidence-backed acceptance, visible human judgment, and continuity the user owns.",
          href: "https://www.linkedin.com/posts/andrewchen_last-years-startup-trend-copilot-for-x-share-7488472791541985280-2t0X",
          cta: "Read Andrew Chen’s post",
        },
        {
          kind: "link",
          eyebrow: "External signal · Y Combinator",
          title: "YC reached the fleet problem at fifty-plus agents",
          description:
            "YC provisioned more than 50 Hermes agents as personal assistants for individual employees, then found even that fleet difficult to manage. QM combines flexible agents with simpler administration. I see the same signal behind Waldo: personal agents become useful quickly, and the continuity and coordination layer matters just as quickly.",
          href: "https://qm.ycombinator.com/",
          cta: "Read YC’s QM notes",
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
