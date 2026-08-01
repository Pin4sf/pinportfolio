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
        "AI can do more work than ever. It should not leave you with more to carry.",
      heroBody:
        "I’m building Waldo: one private, user-owned personal agent that carries the context you permit across work and life, coordinates the agents and tools working for you, returns when your judgment matters, and keeps hold of what remains. Kennel is its first home on the Mac.",
      status: ["What changed", "What needs you", "What can wait"],
      heroImageAlt:
        "Waldo product system map connecting a person with agents, accounts, and work tools",
      heroImageCaption:
        "The wider product idea: one personal agent coordinating the tools, models, accounts, and specialist agents a person chooses.",
      sections: [
        {
          id: "what-changed",
          eyebrow: "01 · Why I am building this",
          title: "More machine work should mean less for you to carry.",
          body: [
            "At Atlan, I built and operated more than 30 production agent instances. The difficult part was rarely getting an agent to produce something. It was carrying the purpose of every session, moving context between tools, catching waiting decisions, and working out whether the original problem was actually solved.",
            "Suyash felt the same pressure from another direction while running a design studio and training for an Ironman. His work, commitments, routines, and health lived in tools that never understood how those things affected one another. The software could show more information. It could not decide what mattered now, what could wait, or what no longer deserved to be carried.",
            "These are not separate problems. Every agent result becomes one more thing to read, trust, choose, integrate, or remember—and it lands in the same life already carrying promises, interruptions, and unfinished work. That is why we started Waldo.",
            "They are also not three equally mature wedges. Judgment is the problem we can prove now, sustainable agency is the rule for everything we build, and physical authority is the longer path that makes the same principles more consequential.",
          ],
          cards: [
            {
              label: "Now · Judgment",
              title: "Turn agent output into accepted outcomes.",
              body: "Generation is cheap. Knowing what deserves trust, acceptance, correction, or rejection is the current wedge.",
            },
            {
              label: "Throughout · Sustainable agency",
              title:
                "Increase capability without increasing what people carry.",
              body: "More possible work should not quietly become more obligation. Capacity, rest, and knowing when to stop are part of the product constitution.",
            },
            {
              label: "Later · Physical authority",
              title:
                "Carry permission and verification into the physical world.",
              body: "As software gains bodies, authority, evidence, interruption, and recovery become higher-stakes versions of the same problem.",
            },
          ],
        },
        {
          id: "scarce-runtime",
          eyebrow: "02 · The scarce runtime",
          title: "Human attention is the scarce runtime of agentic systems.",
          body: [
            "An agent waiting five minutes is inexpensive. A person reconstructing context across five agents, reviewing unverified changes, and finding the correct terminal is expensive.",
            "Agents can run in parallel for longer than a human day. The person still has one stream of attention and one life in which every output must eventually make sense. A system that creates more feeds, approvals, and notifications has automated production while externalizing the coordination cost back to the user.",
            "I want Kennel to become an attention governor, not an activity dashboard: keep routine progress quiet, preserve the exact return point, and bring the person back only when consequence, uncertainty, or authority genuinely needs them.",
          ],
        },
        {
          id: "unit-of-value",
          eyebrow: "03 · The unit of value",
          title: "The session is a work log. The outcome is the product.",
          body: [
            "A session tells us that a provider ran: tokens were spent, tools were called, and the process stopped. Those facts matter for attribution and debugging, but the session ends at the boundary of the agent. The person delegated a problem, not a transcript.",
            "The real unit of value is the accepted outcome: what the user intended, what the agent produced, what evidence shows became true, and what still needs human judgment. An agent finishing a task and the task actually being done are two different things.",
            "Waldo is meant to carry that reconciliation forward so the person’s corrections, permissions, context, and outcome history compound across models and tools—not inside one disposable session.",
          ],
          cards: [
            {
              label: "Agent Session",
              title: "Did the process run?",
              body: "Provider state, messages, tool calls, artifacts, and a reported completion.",
            },
            {
              label: "Outcome Verification",
              title: "Did the intended result become true?",
              body: "Evidence is tested against the person’s original goal, not the agent’s confidence.",
            },
            {
              label: "Open Loop",
              title: "What still needs a human?",
              body: "The remaining decision, follow-through, consequence, or obligation stays visible until the user closes or releases it.",
            },
          ],
        },
        {
          id: "death-of-chatbox",
          eyebrow: "04 · The interface shift",
          title: "The chatbox was the beginning, not the interface.",
          body: [
            "A prompt can start work. It cannot carry a person’s intent, permissions, corrections, and unfinished consequences across every place the work goes. Chat remains useful for asking and clarifying, but it cannot be the entire product boundary once agents work asynchronously across time, tools, and the real world.",
            "The next interface layer is continuity, permission, timing, evidence, and closure. It appears when Waldo returns with the right context and decision—not as an infinite conversation demanding attention.",
            "Proactive does not mean interrupting first. It means preserving what was in motion, noticing when reality changes, and preparing the next useful action before another prompt is required. Observation never silently becomes authority.",
          ],
          cards: [
            {
              label: "Continuity",
              title: "Know where to continue.",
              body: "Return to the goal, last verified state, unresolved decision, artifacts, and smallest honest next action.",
            },
            {
              label: "Timing",
              title: "Arrive when the moment changes.",
              body: "Prepare quietly, batch what can wait, and surface a decision when its consequence or expiry makes it matter.",
            },
            {
              label: "Authority",
              title: "Proactive, never presumptive.",
              body: "The right to observe does not imply the right to act. Consequential action remains purpose-bound and revocable.",
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
          id: "philosophy",
          eyebrow: "05 · What Waldo is",
          title: "Life is already distributed. Your agency should not be.",
          body: [
            "Your work and life already live across calendars, messages, files, health systems, models, tools, and other people. The missing layer is not more context trapped inside every model. It is one user-owned agent that helps carry those threads forward without asking you to become the integration layer.",
            "Many agents may work for you. One agent should remain on your side: carrying the priorities, commitments, boundaries, permissions, corrections, and outcome history you choose across the ecosystem.",
            "I don’t believe one model or interface will own our entire digital life. Specialist agents, tools, and devices can change. Waldo should keep the relationship coherent so the person does not rebuild themselves from zero every time.",
            "The experience should feel like one continuous piece of delegated work, even when it crosses surfaces and specialists.",
          ],
          cards: [
            {
              label: "01 · Intent",
              title: "Begin with the original problem.",
              body: "Waldo preserves what the person meant, the boundaries they set, and what a good result would change.",
            },
            {
              label: "02 · Coordinated work",
              title: "Send purpose, not the whole person.",
              body: "The harness gives the right specialist agent or tool only the context and authority required for that work.",
            },
            {
              label: "03 · Quiet progress",
              title: "Keep routine execution out of the attention stream.",
              body: "Progress stays durable and recoverable without becoming another feed the person must continuously supervise.",
            },
            {
              label: "04 · Human judgment",
              title: "Return at the consequential moment.",
              body: "Kennel shows the decision, the relevant context, and the safest next action when uncertainty or authority needs the person.",
            },
            {
              label: "05 · Verification",
              title: "Show what became true.",
              body: "Evidence is checked against the original intent instead of treating provider completion as proof of success.",
            },
            {
              label: "06 · Surviving Open Loop",
              title: "Carry forward what remains.",
              body: "Any decision, follow-through, or consequence that survives the run stays visible until the user finishes, defers, transfers, or releases it.",
            },
          ],
        },
        {
          id: "kennel",
          eyebrow: "06 · The first proof surface",
          title: "Kennel is where Waldo begins.",
          body: [
            "We are starting on the Mac with people who already use coding agents because the pressure is visible there today. Kennel gives parallel agent work one calm place to land instead of asking the user to open every session and read every update.",
            "Kennel is not another multi-agent activity monitor. It keeps provider completion, evidence-backed outcome verification, and the human’s remaining Open Loop separate so the user can see what changed, where an agent is stuck, which decision genuinely needs them, and what can wait.",
            "The session remains available when detail matters. It is no longer the only way to understand the work. Kennel is the first Mac home and market wedge for Waldo—not the company we are building.",
          ],
          cards: [
            {
              label: "What matters now",
              title: "Order work by consequence.",
              body: "Prioritize timing, dependency, and what the person said matters—not whatever produced the most activity.",
            },
            {
              label: "Needs You",
              title: "Route the judgment, not the noise.",
              body: "Show the recommendation, alternatives, uncertainty, useful evidence, and cost of waiting.",
            },
            {
              label: "What became true",
              title: "Show receipts, not confidence.",
              body: "Use the artifact, change, message, deployment, or other evidence that demonstrates what actually happened.",
            },
            {
              label: "What remains",
              title: "Carry the honest return point.",
              body: "Keep anything waiting, blocked, deferred, transferred, or intentionally released legible across sessions and days.",
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
          id: "current-truth",
          eyebrow: "07 · What is real now",
          title:
            "We have built the foundations. The next proof is continuity across them.",
          body: [
            "Since May 2026, we have built foundations in Kennel on Mac, Waldo on mobile, and the durable agent harness underneath them. We use these foundations internally. We do not have external users or revenue yet.",
            "Kennel has the strongest user-visible proof today. Controlled internal acceptance with Codex covers bounded session discovery, conversation history, processing state, same-task continuation, first-message handling, and archive cleanup. The pieces are not yet one finished Waldo: broader providers, connected-work capabilities, automatic artifact verification, and continuous Mac–mobile–harness outcomes remain the next proofs.",
          ],
          cards: [
            {
              label: "Kennel",
              title: "The strongest visible foundation.",
              body: "A native Mac surface for attributable Codex state, conversation, same-task continuation, and governed inspection.",
            },
            {
              label: "Waldo on mobile",
              title: "The personal-context foundation.",
              body: "Conversation, briefings, permissions, and permissioned life context without making health the product category.",
            },
            {
              label: "Agent harness",
              title: "The durable execution foundation.",
              body: "Resumable work, typed tools, governed actions, scheduling, delivery, recovery, audit, and provider boundaries.",
            },
          ],
        },
        {
          id: "care",
          eyebrow: "08 · Care and attention",
          title:
            "Care is not another notification. It is less to keep mentally open.",
          body: [
            "Waldo should not make people supervise more software, monitor more behavior, or stay permanently available. It should carry routine responsibility quietly, interrupt only when timing, consequence, or authority genuinely belongs to the person, and preserve a clean place to return.",
            "At its core, Waldo is being built to reduce mental reassembly after interruptions, keep important commitments from quietly decaying, prepare for moments that matter, and suggest a realistic next action when capacity or circumstances change. Its memory should remain inspectable, correctable, exportable, deletable, and revocable.",
            "Sometimes the right outcome is done. Sometimes it is deferred, reduced, transferred, superseded, or consciously released. Waldo should help the person know the difference without taking that judgment away from them.",
          ],
          cards: [
            {
              label: "After interruption",
              title: "Less mental reassembly.",
              body: "Restore the goal, last verified state, unresolved decision, artifacts, and smallest next action.",
            },
            {
              label: "When life changes",
              title: "An honest next move.",
              body: "Respect what the person says about their capacity and help reduce, defer, or renegotiate the plan.",
            },
            {
              label: "At the end of the day",
              title: "Enough can be a valid state.",
              body: "Reconcile what became true and carry forward only what still deserves the person’s attention.",
            },
          ],
        },
        {
          id: "internal-compass",
          eyebrow: "09 · My internal compass",
          title: "Capability should compound into human agency.",
          body: [
            "Waldo is not one more assistant competing for attention. It is the user-owned outer loop that keeps intent, permissions, corrections, evidence, and outcomes with the person as models, tools, and machines change.",
            "These are the lines I use to decide what belongs in the product, how it should behave, and what it should never take away from the person using it.",
          ],
          cards: [
            {
              label: "Human closure",
              title: "Completion is evidence. Closure belongs to the person.",
              body: "A green check, stopped process, commit, or final message can describe the run. Only the user can decide whether the real obligation is complete.",
            },
            {
              label: "Proactivity",
              title: "The future of agents is proactive—but never presumptive.",
              body: "Notice, prepare, and stage useful action before another prompt, while keeping consequential authority explicit.",
            },
            {
              label: "Durable responsibility",
              title: "Interfaces may disappear. Responsibility cannot.",
              body: "Temporary screens and replaceable models still need an inspectable record of intent, action, evidence, and consequence.",
            },
            {
              label: "Personal memory",
              title: "Memory is personal only while the person governs it.",
              body: "The user can inspect, correct, export, delete, and revoke what Waldo carries. Memory never silently becomes permission.",
            },
            {
              label: "Agency",
              title: "More execution should never mean less agency.",
              body: "The product succeeds when the person has more authorship, context, and control—not merely more activity performed on their behalf.",
            },
          ],
        },
        {
          id: "personal-computing",
          eyebrow: "10 · The interface lesson",
          title: "They did not invent computing. They helped make it personal.",
          body: [
            "Steve Jobs and Steve Wozniak helped turn computers from something hobbyists operated into something ordinary people could make part of their lives. I see agents at the same interface transition: the capability exists, but using it still asks people to think like operators.",
            "Today the user still chooses models, packages context, supervises sessions, inspects output, and remembers what happens next. Waldo is my attempt to make that power personal without hiding who is responsible.",
            "A line Jobs wrote about the Macintosh stays with me: “It’s our job to make complex technology easy to use and fun to use.” Simplicity here does not mean hiding control. It means making intent, consequence, and the next decision understandable without making the person the integration layer.",
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
          eyebrow: "11 · The physical world",
          title: "When AI gets a body, permission becomes physical.",
          body: [
            "The truth of important work often lives outside the model and outside the screen: a deployment reached production, a message was delivered, a machine was repaired, an inspection passed, an object moved, or a promise was kept. Provider completion is weaker evidence than a verified change in the world.",
            "I keep returning to bodies for AI: a desk object, wearable, home device, vehicle, or small robot through which the same Waldo can sense, communicate, and eventually act. The form may change. The person it works for should not.",
            "This is not a current Waldo hardware program. Software comes first because identity, permission, evidence, interruption, revocation, and recovery must work before a personal agent is trusted with sensors, movement, or physical authority.",
          ],
          cards: [
            {
              label: "Real-world truth",
              title: "The outcome needs a receipt.",
              body: "A sensor, system of record, inspection, delivery, or human acceptance must show what actually changed.",
            },
            {
              label: "Physical authority",
              title: "Every action needs an abort path.",
              body: "Safety class, preconditions, permission, live state, interruption, reversibility, and recovery become part of the contract.",
            },
            {
              label: "Bodies for AI",
              title: "One relationship across forms.",
              body: "Do not give every object another disconnected assistant with its own memory, permissions, and agenda.",
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
      teamTitle:
        "We kept returning to the same question: why does powerful software forget the person using it?",
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
      artifactsEyebrow: "13 · Artifacts",
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
      closing: "More capable machines should leave people with more agency.",
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
