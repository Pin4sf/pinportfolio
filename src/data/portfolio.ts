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
      "Start with the users who already feel the coordination problem. Kennel is Waldo's native home on the Mac, beginning with attributable Codex sessions, conversation, live state, and same-task continuation. Underneath, Agent Session, Outcome Verification, and the human Open Loop remain different kinds of truth. Waldo is being designed to add only the personal context the user permits — priorities, commitments, boundaries, capacity, health context, and prior corrections — so assistance stays grounded in the person rather than just the prompt.",
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
        "Give Waldo a responsibility. Stop carrying it in your head.",
      heroQuote:
        "An agent finishing a task and the task actually being done are two different things.",
      heroBody:
        "I’m building Waldo to keep hold of the desired result, coordinate the agents and tools working toward it, bring you in when judgment or permission matters, and preserve what remains until the result is verified or consciously changed.",
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
            "Delegation has its own cognitive cost: deciding what to hand off, briefing it, supervising it, recovering from failure, and judging whether the risk was worth it. When that cost exceeds the work avoided, the agent has not really reduced the person’s burden.",
            "The person delegated a problem, not a transcript—and should not inherit a second job stitching every result back into life. AI can do more work than ever. It should not leave you with more to carry.",
            "That is the opportunity I see: access to intelligence is becoming ordinary, but reliable follow-through is not. As AI moves from drafts into recurring workflows, the hard problem shifts to the connective tissue—context, permission, handoffs, recovery, verification, and what returns to the person.",
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
          id: "responsibility",
          eyebrow: "02 · The product promise",
          title:
            "The responsibility is the desired result—not the latest task, run, or failure.",
          body: [
            "Give Waldo what you need to become true—not a checklist of every step it should take. Waldo should keep hold of that desired result, coordinate the agents, tools, services, and people contributing to it, and return when judgment, permission, or a change of plan belongs to you.",
            "A responsibility survives the latest task, agent run, interface, and failed attempt. Routine progress should not become another feed to supervise; what remains should not disappear merely because one agent stopped.",
          ],
          cards: [
            {
              label: "Work",
              title: "Make sure the product update reaches customers this week.",
              body: "Implementation, release, communication, and verification may involve different agents and tools. The responsibility remains the customer-visible result.",
            },
            {
              label: "Life",
              title:
                "Make sure my mother’s appointment is booked and she knows what to bring.",
              body: "Scheduling, confirmation, preparation, and communication are contributing paths. The responsibility remains the real-world arrangement.",
            },
            {
              label: "Relationships",
              title: "Make sure nothing gets dropped after the investor meeting.",
              body: "Commitments, follow-ups, replies, and decisions can unfold over days. The responsibility persists without living in the person’s working memory.",
            },
          ],
          afterword: [
            "A failed deployment is evidence about one attempted path. It is not the responsibility, and the failure itself is not an Open Loop. Waldo must still verify whether customers can access the intended update.",
            "An Open Loop is Waldo’s durable record of what remains unresolved relative to the desired result, why it remains unresolved, and where the work should return. The responsibility stays open until evidence supports the result and the person accepts it—or consciously repairs, reopens, defers, transfers, changes, or releases it.",
          ],
        },
        {
          id: "governance",
          eyebrow: "03 · Agent governance",
          title: "Delegate responsibility without surrendering control.",
          body: [
            "Running many agents taught me that starting them is not the hardest part. The hard part is deciding what they may see, what they may change, whether they acted once or twice, what actually became true, and what still belongs to the person.",
            "Waldo is being designed to absorb that delegation tax: compose the permitted context, brief specialist agents, supervise bounded work, recover when a path fails, verify what became true, and return only the judgment or permission that belongs to the person.",
            "The missing layer is agent governance. Waldo is being designed as the owner-side layer between a person and every model, specialist agent, tool, connector, service, or future machine acting on their behalf. It should make delegation useful without letting the machinery grant itself authority or decide that the person’s responsibility is closed.",
            "Memory and reusable skills make an agent more capable. They do not give it authority, prove that an Outcome became true, or close the person’s responsibility. Waldo is being designed as the governed layer between compounding intelligence and consequential action.",
            "Kennel and the other working foundations let us test parts of this today. End-to-end cross-surface governance is the target architecture, not a capability we claim as shipped. Kennel and other surfaces can propose work; Waldo’s online governed backend will decide what may become canonical or consequential.",
            "The person must remain able to accept, repair, reopen, defer, transfer, change, or release the responsibility. More machine action should expand personal agency, not replace it.",
          ],
          cards: [
            {
              label: "Context",
              title: "Purpose-bound context",
              body: "An agent should receive the smallest attributable context required for the current Outcome—not the person’s complete memory.",
            },
            {
              label: "Authority",
              title: "Exact authority",
              body: "Permission must be bounded to an action, resource, purpose, use, and expiry. Memory, past approval, or inferred preference is never current authority.",
            },
            {
              label: "Execution",
              title: "Constrained execution",
              body: "Capabilities, credentials, budgets, cancellation, containment, and revocation must remain governed outside the model.",
            },
            {
              label: "Truth",
              title: "Governed truth",
              body: "Activity is not completion. Provider reports, receipts, evidence, verification, acceptance, and what remains unresolved must stay separate.",
            },
          ],
        },
        {
          id: "kennel",
          eyebrow: "04 · Current product and target",
          title: "Kennel is the first home. Waldo is the relationship.",
          body: [
            "Today we have three working foundations that we use internally: Kennel on macOS, Waldo on mobile, and the durable backend and agent harness underneath them. Kennel has the strongest bounded acceptance evidence: attributable Codex sessions, conversation history, live processing state, same-task continuation, first-message handling, and archive cleanup.",
            "Kennel is the first home, not the whole vision. It is Waldo’s initial wedge for people already coordinating several agents, giving that work one calm place to land—showing what the agent reports, what evidence supports, what needs judgment, and what remains unresolved without making the transcript the primary unit of value.",
            "The target product is one Waldo carrying responsibilities across work and life. Production integrations, broad provider coverage, automatic artifact verification, and a complete cross-surface responsibility and governance experience are still being built. Today, the evidence is internal and foundation-level rather than proof of the complete integrated experience.",
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
            "I don’t believe one model or interface will own our entire digital life. People will use many models, specialist agents, tools, services, and devices. Waldo is being designed to join personal assistance and work orchestration through the same Outcome, authority, evidence, and continuity contracts.",
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
            "An agent waiting five minutes is inexpensive. A person reconstructing context across five agents, reviewing unverified changes, and finding the correct terminal is expensive. Infinite machine capacity does not create infinite human attention.",
            "Burnout is not a feature category. It is a product constraint: Waldo should not make people supervise more software, monitor more feeds, or remain permanently available. It should carry routine responsibility quietly and return only when timing, consequence, or authority belongs to the person.",
            "Success means less mental reassembly, fewer silently decaying commitments, a realistic next action when capacity changes, and permission to decide that enough is enough.",
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
          id: "philosophy",
          eyebrow: "07 · What I believe",
          title: "An agent should care about the person behind the task.",
          body: [
            "ChatGPT or Claude can answer what you ask. I want Waldo to understand why you need it, when it matters, what it affects, and whether it was actually resolved. The current prompt is only one fragment of a person’s priorities, relationships, boundaries, capacity, corrections, and commitments.",
            "Life is already distributed across calendars, messages, files, health systems, models, tools, and other people. Waldo should help carry it forward without making the person rebuild themselves—or become the integration layer—every time the interface changes.",
            "The chatbox made intelligence available. It cannot be the whole interface for asynchronous work, and ordinary people should not have to become natural-language programmers or agent managers to benefit. The next layer is continuity, timing, permission, evidence, and closure: proactive enough to prepare what matters, but never presumptive about consequential action.",
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
            "Waldo should learn from what a person says, the corrections they make, and outcomes they verify. Explicit self-knowledge should outrank behavioral inference; activity should never become a hidden personality score.",
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
              body: "Low-risk assistance may be proactive; consequential action must stay bounded by visible permission.",
            },
            {
              label: "Durable responsibility",
              title: "Interfaces may disappear. Responsibility cannot.",
              body: "Replaceable models and temporary screens still need an inspectable record of intent, action, evidence, and consequence.",
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
            "I see three connected pressures, but I do not treat them as three equal markets. AI-output overload is the customer problem we can attack now through Kennel. Burnout and finite human capacity are the constitution for how Waldo should behave. Physical AI is the expansion horizon where the same questions of permission, evidence, interruption, and recovery become more consequential.",
            "The confidence is different too: the overload and burnout problems are already visible; the physical-world tailwind is strong, but Waldo has not yet validated a hardware product or customer wedge there. The wider curve is consumer: capable intelligence is becoming cheap enough to move agents from specialist tools into everyday products.",
            "Notion’s 2026 workplace survey offers a useful directional signal: 88% of respondents placed themselves or their organizations in its thought-partner or assistant stages, while 71% of AI Users said they would use AI more if they trusted it not to make mistakes on important work. Among more advanced users, automation and cross-tool routing rose—but so did tool sprawl, difficulty seeing real impact, and inconsistent model performance. For surveyed decision-makers, the largest implementation gaps between early and advanced groups were integration, governance, and defined measurement. That is the opportunity Waldo is building toward: not more access to AI, but a person-owned layer that makes distributed AI work coherent, governable, and verifiable.",
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
      teamEyebrow: "12 · Who I’m building with",
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
      artifactsEyebrow: "13 · Artifacts",
      artifactsTitle: "See the work, then go deeper.",
      artifactsIntro:
        "Start with the work itself: the founders, product, system, company, and site. The outside signals come after.",
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
            "Andrew Chen describes the shift from AI that assists to agents that act—and the frustration of receiving more work to review. Waldo’s answer is not action alone: it is evidence-backed acceptance, visible human judgment, and continuity the user owns.",
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
            "At Startup School 2026, Garry Tan described personal AGI as a person-controlled combination of context, memory, reusable skills, and a replaceable agent harness. It is a strong external articulation of Waldo’s ownership curve. Waldo is being designed to extend that thesis through purpose-bound context, exact authority, evidence-backed Outcomes, and an interface that does not require people to operate the underlying agent stack.",
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
