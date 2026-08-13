# Editorial patterns for a quieter founder-researcher portfolio

**Research date:** 2026-08-13  
**Scope:** First-party sources only. This note studies editorial form, not the authors' substantive AI forecasts or positions. Observations are separated from recommendations.

## Short answer

The strongest writing in this set does not keep explaining why it deserves to exist. It gives the reader one clear question, starts with something concrete, and moves forward in a visible order.

For this portfolio, the implication is simple:

- let the hero say one memorable thing;
- turn `Models -> Agents -> Waldo` into a small visual sequence of curiosity, not a retrospective master plan;
- put proof next to the work it supports rather than repeatedly announcing an "evidence-led" posture;
- make each essay answer one question through examples, a compact model, and an honest ending.

Research rigor should remain underneath the prose. It should be felt as precision, not presented as self-justification.

## Resolving “AI 2040”

The user paired “AI 2040” with AI 2027. On that evidence, the reference almost certainly means [**AI 2040: Plan A**](https://ai-2040.com/) by the AI Futures Project, released on **2026-07-09**, not a generic report about AI in 2040.

The identification is high-confidence because:

1. the official [AI 2027](https://ai-2027.com/) site links directly to AI 2040;
2. AI 2040 explicitly describes itself in relation to AI 2027;
3. the project’s [dated launch note](https://blog.aifutures.org/p/ai-2040-plan-a) calls it the team's next large scenario.

The official credits name Thomas Larsen, Romeo Dean, Brendan Halstead, Eli Lifland, Ryan Greenblatt, and Daniel Kokotajlo. The authors call it a **scenario and policy recommendation**, not a prediction or conventional research report.

There is a real naming ambiguity in isolation: Elon University’s Imagining the Digital Future Center published [**The Impact of Artificial Intelligence by 2040**](https://imaginingthedigitalfuture.org/reports-and-publications/the-impact-of-artificial-intelligence-by-2040/) on **2024-02-29**. It is an expert canvass and public-opinion study by Lee Rainie and Janna Anderson. Because the user mentioned AI 2027 in the same sentence, this is a much less likely reference.

## Sources reviewed

| Source | Date | Why it is useful here |
| --- | --- | --- |
| [AI 2027](https://ai-2027.com/) — Daniel Kokotajlo, Scott Alexander, Thomas Larsen, Eli Lifland, Romeo Dean | 2025-04-03 | Scenario structure, chronological movement, claim specificity, uncertainty |
| [AI 2040: Plan A](https://ai-2040.com/) — AI Futures Project | 2026-07-09 | Recommendation versus prediction, step-by-step scenario, compact timeline |
| [Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) — Lilian Weng | 2026-07-04 | Technical synthesis, definitions, diagrams, explicit scope and references |
| [The Big LLM Architecture Comparison](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison) — Sebastian Raschka | Living article, reviewed 2026-08-13 | Repeated comparison structure, original diagrams, conversational caveats |
| [Agents](https://huyenchip.com/2025/01/07/agents.html) — Chip Huyen | 2025-01-07 | Definition-to-example flow, progressive depth, failure-led evaluation |
| [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) — Simon Willison | 2025-06-16 | Immediate stakes, memorable three-part diagram, plain-language security writing |
| [A Recipe for Training Neural Networks](https://karpathy.github.io/2019/04/25/recipe/) — Andrej Karpathy | 2019-04-25 | Lived opening, numbered procedure, sentence rhythm, practical judgment |

## Observed editorial patterns

### 1. The opening gives the reader a reason to continue

The sources use different forms, but none opens with a long identity statement or a defense of the document.

- **AI 2027** gives its forecast, explains that the authors wrote a concrete scenario, and states the epistemic boundary near the top. The reader understands the proposition before encountering the research apparatus.
- **AI 2040** says what Plan A is, how it differs from the authors' earlier scenario, and whether it is a recommendation or prediction. It does not spend a full section establishing institutional credibility first.
- **Simon Willison** begins with the consequence, then names the three conditions that create it.
- **Andrej Karpathy** begins with a small lived event—a tweet about recurring mistakes—and the gap he saw practitioners repeatedly encounter.
- **Sebastian Raschka** starts with one comparison question, acknowledges why comparison is difficult, and narrows the article to architecture rather than benchmarks or training.

**Observed pattern:** a concrete problem, proposition, or event comes before taxonomy and credentials.

### 2. Each piece has one governing question

Even the long pieces remain coherent because the reader can name their central job:

- What might rapid progress toward superhuman AI look like? — AI 2027
- What would a specific safer policy path look like in detail? — AI 2040
- What belongs to the harness, and how might that layer improve? — Lilian Weng
- What changed across current open-model architectures? — Sebastian Raschka
- What makes an agent work, fail, and remain evaluable? — Chip Huyen
- Why is this particular combination of agent capabilities dangerous? — Simon Willison
- What practical process makes neural-network training less fragile? — Andrej Karpathy

The pieces may branch, but the branches continue serving the same question.

**Observed pattern:** coherence comes from one question, not from transitions that repeatedly announce the narrative.

### 3. Sentence rhythm alternates between claim and explanation

These writers generally make a short assertion and then earn it with a slightly longer explanation or example. They do not maintain a uniformly polished, abstract register.

Typical movement:

1. plain claim;
2. concrete example;
3. technical name, if needed;
4. qualification or consequence.

Karpathy and Willison use contractions, asides, and occasional humor. Huyen and Weng are more systematic, but still use direct verbs and ordinary examples before formal detail. Raschka frequently pauses to recap or say what he is deliberately leaving out.

**Observed pattern:** naturalness comes partly from varied sentence length and visible human judgment. It is not the same as making every sentence casual.

### 4. Structure carries complexity so prose does not have to

- **AI 2027** uses dated sections. Time itself supplies the narrative spine.
- **AI 2040** presents a short timeline before the full scenario and keeps policy supplements separable from the narrative.
- **Weng** uses a table of contents, named patterns, case studies, figures, equations, and a full reference list.
- **Raschka** repeats the same comparison grammar across models: what changed, how it works, why it may matter, and what remains uncertain.
- **Huyen** moves from overview to tools, planning, failures, and evaluation. Examples act as bridges between layers.
- **Karpathy** turns accumulated judgment into a numbered recipe.

**Observed pattern:** a strong external structure reduces the need for throat-clearing sentences such as “this section exists to show…”

### 5. Diagrams compress one relationship at a time

The most memorable example is Willison's three-circle security diagram. Its labels are the argument. The prose then explains the mechanism and consequences.

Huyen uses diagrams to show an agent in an environment, tool sequences, reflection, and tool transitions. Raschka places architecture diagrams beside the exact comparison being discussed. Weng uses workflow diagrams when a process or system boundary would be cumbersome to describe linearly. AI 2027 uses charts and key-metric blocks to make the scenario's assumed scale visible.

The diagrams are not decorative summaries of the whole article. Each carries a specific relationship:

- three conditions combining into one risk;
- one model component versus another;
- one loop through tools and feedback;
- one change over time.

**Observed pattern:** the diagram should remove prose, not create more prose that explains the diagram's existence.

### 6. Strong claim posture is explicit but light

The sources distinguish different kinds of statements without turning every paragraph into a compliance form.

- AI 2027 calls itself a best-guess scenario, explains its methods, publishes supplements, offers alternative endings, and later adds a dated clarification.
- AI 2040 clearly separates what the authors recommend from what they predict would follow.
- Huyen says the field lacks an established theoretical framework and calls the piece a best-effort framework that may evolve.
- Raschka identifies confounders in model comparison, narrows the scope, and uses tentative language when inferring a design rationale.
- Willison says when he is not confident that a term will be widely understood and when a mitigation is incomplete.
- Karpathy grounds much of the recipe in personal practice rather than presenting every heuristic as universal law.

**Observed pattern:** uncertainty is attached to the specific claim that needs it. A single early scope note plus local qualifications is usually enough.

### 7. Technical detail is introduced after a felt or visible problem

Willison starts with data theft before explaining prompt injection. Karpathy starts with silent training failures before giving a training recipe. Huyen defines an agent and walks through an ordinary tool sequence before discussing compound accuracy and evaluation. Raschka motivates an architectural component by the resource or modeling constraint it addresses.

**Observed pattern:** technical terminology is more persuasive after the reader understands what it helps explain.

### 8. Long pieces stay readable by offering exits and recaps

Weng and Huyen provide detailed tables of contents. Raschka explicitly tells readers that the article is comprehensive and offers navigation, while periodically summarizing a component before moving on. AI 2027 separates the main scenario from methodology supplements and lets readers choose between endings. AI 2040 separates the narrative from policy and economic analysis.

**Observed pattern:** depth can live in layers. The main reading path does not need to carry every caveat, reference, or derivation inline.

## Recommendations for this portfolio

### Homepage: make the identity felt through sequence

The hero should have at most three pieces of copy:

1. a short identity line;
2. one sentence describing the work in human terms;
3. a quiet directional cue, only if navigation needs it.

It does not need an “Explore the Evidence” button. The work appearing immediately below is already the invitation.

The language should say what Shivansh is doing, not describe the portfolio's positioning strategy. A useful test: if a sentence could appear in a grant rubric or brand-strategy deck but not in a conversation, remove or rewrite it.

### Replace “Trajectory” with an order of curiosity

Avoid presenting the past as a predetermined master plan. A compact infographic can show the real progression without justifying it:

```text
MODELS                    AGENTS                    WALDO
How do they learn?   ->   How do they act?    ->   How can one stay useful over time?
```

An even more personal version could use three short sentences:

```text
I started by learning how models work.
Then I built agents that could act.
Now I am learning what it takes for one to stay useful over time.
```

This is an order of thought, not a claim that every previous project inevitably led to Waldo. The visual should carry the sequence; no defensive subtitle is required.

### Let evidence sit beside the claim

Keep evidence statuses in the data model, but reduce their prominence in the reader-facing language. Use them where a distinction materially protects truth:

- working system versus proposed direction;
- studied corpus versus production deployment;
- personal contribution versus team or project outcome;
- technical progress versus user or market validation.

Elsewhere, let a date, link, artifact, or specific result do the work. Repeating words such as “evidence,” “verified,” “bounded,” and “falsifiable” can sound defensive even when the underlying practice is right.

### Give each homepage section one sentence of purpose—or none

Do not explain why the section deserves to exist. Prefer direct labels and content:

- `Selected work`
- `What I am thinking about`
- `Writing`
- `About`

If a section needs introductory copy, one natural sentence should be enough. The cards, diagram, or essays should carry the remainder.

### Use a quieter flow

A coherent first read could be:

```text
One-line hero
    ↓
Models -> Agents -> Waldo
    ↓
Waldo and selected work
    ↓
Current questions
    ↓
Writing
    ↓
About / chronology / contact
```

This moves from who I am, to how I arrived here, to what I am building, to what I am learning. It does not ask the reader to decode an evidence architecture before meeting the person.

## Recommendations for the essays

### Default article shape

Use the following as a default, not a rigid template:

1. **A concrete opening (60–120 words).** Start with a build, failure, observation, or decision.
2. **The question.** State the one thing the essay is trying to understand.
3. **A simple model.** One diagram, list, or distinction that helps the reader think.
4. **What the work showed.** Two or three concrete examples, including where the idea breaks.
5. **What I think now.** Separate observation from current judgment in ordinary language.
6. **What remains open.** End with the next experiment or unresolved question, not a ceremonial conclusion.

For the portfolio, a strong core essay will often be **900–1,500 words**. If the research demands more, keep the main argument readable and move exhaustive comparisons, methods, or references into an appendix or later atlas entry.

### Rewrite from events outward

Prefer:

> We shipped an agent that could finish the code change. The harder question came afterward: who knew whether the release actually worked?

over an abstract opening about the ontology of outcome verification.

Prefer:

> I compared more than 40 harnesses expecting to find a dominant architecture. I found recurring parts, but no single recipe.

over opening with a taxonomy of harness layers.

These are examples of direction, not final copy.

### Keep the vocabulary human

Use the simplest accurate word on first mention:

- “what happened” before “observability”;
- “what the agent remembers” before “memory substrate”;
- “who can change what” before “authority boundary”;
- “how we know it worked” before “verification contract.”

Introduce the technical term later when it helps the reader compress an idea they already understand.

### Use one visual per central relationship

Good candidates for the current essays:

- **Agent says done:** request -> action -> visible result -> human acceptance.
- **Memory:** event -> proposed memory -> correction/confirmation -> future use -> forgetting.
- **Harness:** model at the center, surrounded by context, tools, permissions, memory, evaluation, and recovery.

Each diagram should be readable without a paragraph explaining why it is present. Avoid an all-in-one systems map unless the article is specifically a reference atlas.

### Keep rigor, remove bureaucratic surface language

The research note can hold the full claim ledger. The public essay needs only:

- an early sentence explaining what the piece is based on;
- links beside important factual claims;
- explicit “I observed,” “I think,” and “I do not know yet” distinctions where they matter;
- a brief sources/method note at the end.

Avoid recurring public labels such as “evidence posture,” “self-falsifier,” or “claim class.” Translate them into direct prose:

- “This is what the prototype can do today.”
- “We have not shown that people return to use it.”
- “I would change my mind if…”

### Cut transitions that narrate the writing

Remove phrases that merely announce structure or justify inclusion:

- “This section will explore…”
- “It is important to note that…”
- “The reason this matters is…” when the next example can show why;
- “This is not a master plan…” when the visual can simply avoid implying one.

Transitions should advance the thought. A useful edit is to delete the first sentence of every section and see whether anything is lost.

## A compact editorial test

Before publishing a homepage section or essay, ask:

1. Can a reader name the central question after the first screen?
2. Does the opening begin with something that happened, something being built, or a precise claim?
3. Is there any sentence explaining the portfolio's strategy rather than telling Shivansh's story?
4. Can one diagram replace a paragraph?
5. Does every technical term earn its place?
6. Are uncertainty and missing evidence stated once, exactly where they matter?
7. Can the main path be read without opening every footnote or appendix?
8. Does the ending leave the reader with a real question, decision, or next experiment?

## Confidence and limitations

- **High confidence:** the patterns described above are directly visible in the reviewed first-party texts.
- **High confidence:** AI 2040: Plan A is the intended companion reference to AI 2027, given the direct pairing and official cross-linking.
- **Moderate confidence:** the recommended target length will fit every portfolio essay. Harness comparisons may need a shorter essay plus a separate living atlas.
- **Not evaluated here:** visual styling, motion, accessibility, or the factual accuracy of the authors' AI forecasts. This is an editorial-pattern review only.

