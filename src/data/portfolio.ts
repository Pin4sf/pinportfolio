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
      "AI is not creating one isolated product problem. Producing plausible artifacts and initiating machine work are becoming cheaper, while human comprehension, judgment, verification, attention, authority, accountability, and continuity remain finite. As personal agents reach more people and specialist execution fragments across providers, the person risks becoming the integration layer for everything the machines leave behind.",
    approach:
      "Start with the human problem pool, not a fixed interface or category. We study where AI-mediated responsibilities grow faster than a person's capacity to understand, coordinate, verify, and remember their consequences. Responsibility continuity is our current connective hypothesis: one user-owned personal relationship should absorb routine management across agents and time while keeping consequential judgment, authority, evidence, and correction with the person.",
    solution:
      "The product surface remains deliberately fluid. Kennel on macOS, a durable agent harness, and Waldo on iOS are working foundations for testing continuity, governance, evidence, and low-friction presence—not the permanent definition of the company. A surface earns its place only if it reduces reconstruction, review, unsafe action, forgotten follow-through, or total attention per accepted outcome without silently expanding authority.",
    solutionImages: [
      "/images/projects/waldo/hero.png",
      "/images/projects/waldo/app-screens.png",
      "/images/projects/waldo/iphone-1.png",
      "/images/projects/waldo/iphone-2.png",
    ],
    impact:
      "The current evidence is foundation-level, not market validation. Kennel has recorded live Codex acceptance for bounded multi-session discovery, populated conversation history, real-time state, same-task continuation, first-message handling, and archive cleanup. The research has also produced a clearer company test: Waldo must lower raw artifacts opened and interruptions per accepted outcome. If it merely adds another surface to manage, it becomes the third loop rather than the break.",
    reflection:
      "Waldo's center of gravity is epistemic: helping a person know what is true, what changed, what remains, and what machine work actually bought. Orchestration, memory, and interface are means. The durable obligation is to let machine execution expand while leaving the person with less management and uncertainty—and only the responsibility that genuinely requires them.",
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
        "I’m building Waldo from an emerging pool of interlinked human constraints—not from one fixed workflow. As personal agents reach everyone and specialist execution multiplies, Waldo is testing how one user-owned relationship can preserve understanding, authority, continuity, and responsibility across whatever agents and interfaces come next.",
      status: [
        "Problem pool first",
        "Evidence before category",
        "Product surface stays fluid",
      ],
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
            "For many bounded tasks, machines can now produce plausible code, documents, plans, and analyses in minutes. The total cost has not disappeared. It has moved into understanding assumptions, reconciling contradictions, reviewing consequences, and knowing whether the work changed anything that mattered.",
            "I first felt this while building and operating more than 30 production agent instances at Atlan. Starting another run was easy. Remembering why it existed, moving context between tools, detecting a waiting decision, and checking whether the original problem was actually resolved remained human work.",
            "Suyash encountered the same structure while running a design studio and training for an Ironman: more tools could produce more information, but no system could reliably decide what mattered now, what could wait, or what no longer deserved to be carried.",
            "The transition is larger than coordination. Capability is becoming abundant while comprehension, attention, legitimate authority, and accountability remain finite. That is the constraint system Waldo is investigating.",
          ],
          cards: [
            {
              label: "Old bottleneck",
              title: "Producing the artifact",
              body: "Writing the code, document, analysis, plan, or message often constrained how much work could be attempted.",
            },
            {
              label: "New bottleneck",
              title: "Knowing what is true",
              body: "Understanding, verification, acceptance, consequence, and the causal story behind machine-produced work remain scarce.",
            },
            {
              label: "The failure mode",
              title: "Activity mistaken for progress",
              body: "More tokens, sessions, commits, and artifacts can increase visible activity while leaving the person with more uncertainty and review.",
            },
          ],
        },
        {
          id: "responsibility",
          eyebrow: "02 · The problem pool",
          title: "Eight linked problems. Three centers. One accountability floor.",
          body: [
            "AI is not creating one neatly bounded problem. It is producing a reinforcing pool: more output raises evaluation load; more agents raise management work; fragmented memory raises reconstruction; easier action raises governance and consequence; cheaper intelligence raises the need to decide what the spend actually bought.",
            "Half the analytic clusters are epistemic. That weighting matters: Waldo's center of gravity is helping a person know what is true—not orchestrating for its own sake. Coordination, memory, and interfaces are candidate means.",
          ],
          cards: [
            {
              label: "Epistemic · 01 / 03 / 04 / 06",
              title: "I cannot cheaply know what is true.",
              body: "Abundance without comprehension. Activity without outcome truth. Memory without coherent continuity. Cheap intelligence without allocation discipline.",
            },
            {
              label: "Attentional · 02 / 07",
              title: "I cannot allocate myself.",
              body: "Delegation without management capacity. Adoption without the agent-management literacy most people never asked to acquire.",
            },
            {
              label: "Custodial · 08",
              title: "I cannot keep what I have built.",
              body: "Personalization without durable user agency: context, corrections, permissions, and history become provider-bound or opaque.",
            },
            {
              label: "Accountability floor · 05",
              title: "Consequence stays with me regardless.",
              body: "Agents can act, but legal, social, professional, and moral accountability does not automatically transfer with execution.",
            },
          ],
          afterword: [
            "The problems reinforce one another. More delegation creates more sessions; more sessions create more reconstruction and review; weak review creates false closure and consequence debt; that burden encourages another orchestration layer that can itself create more activity.",
            "Waldo must break that loop. If it raises total activity, raw artifacts opened, or interruptions per accepted outcome, it has merely relocated the burden.",
          ],
        },
        {
          id: "two-curves",
          eyebrow: "03 · Why this pool is emerging",
          title: "Two markets are colliding.",
          body: [
            "Curve A is personal intelligence moving toward everyone: persistent, conversational, proactive agents reaching ordinary work and life as interaction improves and inference costs fall.",
            "Curve B is machine execution fragmenting and multiplying: specialist agents, models, tools, services, and later physical systems completing bounded pieces across providers, sessions, and time.",
            "The first curve increases what people delegate. The second increases the number of executors and artifacts contributing to one intention. Their collision leaves the person as the cross-system manager, verifier, authority, and keeper of what remains.",
            "Primary sources support this direction without proving Waldo demand. YC supports consumer timing; Poke, Cognition, and Folk show persistent personal relationships reaching real and specialist execution; OpenAI includes review, retries, and rework in full task cost; knowledge-centric agent research supports curated evidence that outlives an individual agent.",
          ],
          cards: [
            {
              label: "What the sources support",
              title: "The direction is real.",
              body: "Consumer interaction is widening, execution is becoming more agentic, continuity is moving beyond one session, and dependability has economic cost.",
            },
            {
              label: "What they do not support",
              title: "The category is not validated.",
              body: "They do not prove willingness to pay for responsibility continuity, a provider-neutral layer, or any particular Waldo interface.",
            },
            {
              label: "The honest opportunity",
              title: "The gap grows as execution succeeds.",
              body: "Every additional machine action the person did not witness can increase the need for trustworthy understanding, continuity, and legitimate control.",
            },
          ],
          media: {
            src: "/images/projects/waldo/waldo-revised-thesis-board.png",
            alt: "Waldo revised thesis board showing two market curves, the eight-cluster problem pool, source signals, durable philosophies, and company question",
            caption:
              "The discussion board: two curves, one interlinked human problem pool, and a response hypothesis that remains deliberately falsifiable.",
          },
        },
        {
          id: "fluid-product-surface",
          eyebrow: "04 · The product posture",
          title: "The surface is not the company.",
          body: [
            "Kennel, messaging, mobile, voice, ambient software, and future physical forms are hypotheses about presence. None is Waldo's permanent boundary. We should not defend a dashboard, workflow, memory store, or orchestration console when a simpler response removes more of the human burden.",
            "Today we use three working foundations internally: Kennel on macOS, Waldo on mobile, and a durable backend and agent harness. Kennel has the strongest bounded acceptance evidence: attributable Codex sessions, conversation history, live processing state, same-task continuation, first-message handling, and archive cleanup.",
            "Those foundations are instruments for learning. A surface earns its place only if it reduces reconstruction, correction, unnecessary supervision, unsafe action, forgotten follow-through, or cost per accepted outcome—without asking for more data or authority than the value justifies.",
          ],
          cards: [
            {
              label: "Stable concern",
              title: "Human agency under machine execution",
              body: "Preserve understanding, authority, correction, continuity, and consequence across changing providers and interfaces.",
            },
            {
              label: "Fluid response",
              title: "Whatever removes the most burden",
              body: "Conversation, quiet custody, evidence views, selective escalation, or specialist-agent coordination are candidate mechanisms.",
            },
            {
              label: "Current observatory",
              title: "Kennel on the Mac",
              body: "Frontier agent users make multi-session reconstruction, review, judgment, and follow-through visible earlier—not the final market definition.",
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
          id: "responsibility-continuity",
          eyebrow: "05 · Current connective hypothesis",
          title: "Responsibility continuity—not another agent-management job.",
          body: [
            "One human intention can span many sessions, specialist agents, tools, people, and days. Provider memory can preserve a transcript; it does not necessarily preserve why the work exists, what evidence changed the plan, what was accepted, or which consequence still remains.",
            "Responsibility continuity is our current hypothesis for that connective tissue. Waldo should retain the desired result, current constraints, authoritative evidence, corrections, decisions, unresolved consequences, and the smallest truthful re-entry point—even as the executor changes.",
            "This does not mean giving everyone an operator console. The person should not inherit the skill of managing an agent fleet. Waldo should compress routine discovery, briefing, monitoring, reconciliation, recovery, and re-entry, then surface uncertainty, changed scope, irreversible effects, cost, or permission only when human judgment is truly required.",
            "The hypothesis remains replaceable. If native providers absorb this burden, if people prefer direct control, or if the representation creates more cognitive load than it removes, Waldo must change rather than defend the label.",
            "The company question is: as machine execution becomes abundant and distributed, what must remain with the person so they can understand what is happening, govern what may happen, reuse what was learned, judge what is dependable, and carry only the responsibility that genuinely requires them?",
          ],
          cards: [
            {
              label: "Preserve",
              title: "Intent, evidence, and what remains",
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
              body: "Bring back the evidence, consequence, and exact judgment required—not another feed of machine activity.",
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
            "Burnout is not a feature category. It is a product constraint: Waldo should not make people supervise more software, monitor more feeds, or remain permanently available. It should carry routine coordination and responsibility state quietly, then return only when timing, consequence, or authority belongs to the person.",
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
          eyebrow: "07 · Durable philosophies",
          title: "An assertion about the world is not the world.",
          body: [
            "A stored claim is not truth. A completion claim is not closure. A remembered approval is not permission. Token volume is not value. Waldo's memory, responsibility, verification, and governance principles all follow from keeping the system's assertions distinct from the world they describe.",
            "More machine execution should leave the person with less to carry. Production is not progress. Done belongs to the world and the person, memory should serve future agency, routine management should compress, and consequential judgment should become clearer.",
            "Understanding can move up an abstraction layer; responsibility cannot disappear. People may not need every low-level trace, but they still need the causal story, material trade-offs, uncertainty, and consequential choice required for legitimate judgment.",
            "Personal context may improve interpretation; it must never silently become authority. The user's accumulated operational life—context, corrections, permissions, accepted outcomes, unresolved commitments, and learned procedures—should remain inspectable, correctable, revocable, exportable, and portable.",
            "The interface is contingent. The relationship and these principles are not.",
          ],
          cards: [
            {
              label: "Truth",
              title: "Production is not progress",
              body: "Separate activity, artifact, verification, human acceptance, and the responsibility that still remains.",
            },
            {
              label: "Agency",
              title: "Context is not authority",
              body: "Better understanding of the person cannot silently grant permission, prove a fact, or justify an action.",
            },
            {
              label: "Ownership",
              title: "What compounds should remain yours",
              body: "The person should be able to inspect, correct, export, revoke, and carry their operational intelligence across providers.",
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
              title: "Completion is evidence. Outcome truth belongs to the world.",
              body: "A green check, stopped process, commit, or final message cannot establish the real result alone. Waldo keeps external evidence distinct while the person accepts, repairs, reopens, defers, transfers, changes, or releases what remains theirs.",
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
          id: "evidence-discipline",
          eyebrow: "09 · Evidence discipline",
          title: "Direction is not validation.",
          body: [
            "The source audit separates what we can observe from what we want to believe. Execution supply is expanding. Attempts do not compound without curation. Review, correction, retry, and escalation are part of real outcome cost. Persistent personal-agent relationships and specialist execution are beginning to converge.",
            "The harder claims remain hypotheses: that artifact abundance is causing a broad comprehension crisis; that cross-agent responsibility is painful enough to pay for; that users will trust one personal agent across providers and life domains; and that provider-neutral continuity matters once native products improve.",
            "Waldo should earn stronger language through repeated episodes, measured burden reduction, critical-error detection, retention, and payment. The first commercial question is not whether the product is used. It is whether people convert an unbudgeted friction—knowing whether delegated work landed—into a paid line.",
          ],
          matrix: {
            caption:
              "What the current evidence supports, what remains a hypothesis, and how the response can falsify itself",
            hint: "Swipe or use the arrow keys to compare the evidence layers.",
            columns: {
              pressure: "Layer",
              strategicRole: "Current claim",
              fit: "What Waldo must do",
              confidence: "Status",
            },
            rows: [
              {
                pressure: "Observed direction",
                strategicRole: "More execution, cross-session continuity, and full dependability cost",
                fit: "Preserve evidence and measure real burden",
                confidence: "Supported direction",
              },
              {
                pressure: "Founder hypothesis",
                strategicRole: "A comprehension and responsibility burden becomes a market",
                fit: "Test willingness to trust, retain, and pay",
                confidence: "Unproven",
              },
              {
                pressure: "Self-falsifier",
                strategicRole: "Waldo can become another layer of activity",
                fit: "Lower artifacts opened and interruptions per accepted outcome",
                confidence: "Must be instrumented",
              },
            ],
          },
        },
        {
          id: "personal-computing",
          eyebrow: "10 · The consumer horizon",
          title: "Adoption cannot require agent-management literacy.",
          body: [
            "YC's Fall 2026 consumer RFS argues that better interaction and falling inference cost are reopening ordinary life categories. Poke and Folk show the interaction pattern already forming: one familiar relationship in messaging, persistent context, background work, and proactive return.",
            "But wider adoption cannot depend on every person learning prompting, routing, memory design, permissions, review, and fleet management. People should be able to talk, tap, swipe, or click—and still retain meaningful understanding and control.",
            "The interface lesson from personal computing still matters: hide machinery without hiding consequence. Waldo should make agent systems feel personal and low-friction while keeping evidence, uncertainty, authority, and correction legible when they matter.",
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
      artifactsTitle: "Inspect the thesis, evidence, and working foundations.",
      artifactsIntro:
        "The revised discussion board is the current entry point. The technical brief documents the working system foundations; external sources show which parts of the direction are supported and which remain Waldo hypotheses.",
      artifacts: [
        {
          kind: "link",
          eyebrow: "Revised thesis · Discussion board",
          title: "The emerging AI problem pool at a glance",
          description:
            "One board connecting the two market curves, eight interlinked human problems, primary-source signals, durable philosophies, current responsibility-continuity hypothesis, company question, and self-falsifier.",
          href: "/images/projects/waldo/waldo-revised-thesis-board.png",
          cta: "Open the thesis board",
        },
        {
          kind: "link",
          eyebrow: "Working foundations · Technical brief",
          title: "How the current system is being tested",
          description:
            "The current system model, working foundations, permission boundaries, architecture, and longer physical-AI direction. Product surfaces remain hypotheses derived from the problem pool.",
          href: "https://waldo-technical-brief.pages.dev/",
          cta: "Read the technical brief",
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
        "Let machine execution expand. Leave the person with less to carry—and only the judgment that is truly theirs.",
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
