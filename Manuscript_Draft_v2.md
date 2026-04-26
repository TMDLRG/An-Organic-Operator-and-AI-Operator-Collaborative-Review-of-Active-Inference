# An Organic Operator and AI Operator Collaborative Review of Active Inference Free Energy Minimization: Reviewable Foundations, Reproducible Tests, and Open Tensions

**Operators**

- **Michael Polzin** — Organic Operator (project initiator; non-credentialed in this mathematics; affiliated with TMDLRG).
- **AI Operators**:
  - **Anthropic Claude (Opus 4.7)** — primary drafting, mathematical organization, stress-test design, adversarial review, audit, and Phase P0–P4 remediation across four documented sessions (see Appendix E.2).
  - **OpenAI GPT**, accessed via two Custom GPTs both built on the **ORCHESTRATE Method** (Polzin, *ORCHESTRATE — Prompting for Professional AI Outputs*, [Amazon](https://www.amazon.com/ORCHESTRATE-Prompting-Professional-AI-Outputs/dp/B0G2BJKDM6)):
    - **Ai Onna** Custom GPT — produced the prior independent peer review captured as SOURCE C, which catalyzed this manuscript's audit chain.
    - **Jules** Custom GPT — collaborator on the ORCHESTRATE prompting workflow.

**Draft date.** 2026-04-25

**Draft status.** Second full draft (v2), with Phase P5 Layer-2-§6 settlement applied 2026-04-26. This is a *reviewable working document*, not a final scientific authority. It has not been peer-reviewed by qualified human experts. Every mathematical conclusion is offered for expert correction. Phases P0–P5 of the [Audit Remediation Plan](Audit_Remediation_Plan.md) have been applied; Phase P5 settled one Layer 2 gate (original-PDF inspection per [Phase_P5_OODA.md](Phase_P5_OODA.md)). Other Layer 2 (human-required) gates remain pending — see [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) and [Pre_Publication_Checklist.md](Pre_Publication_Checklist.md).

---

## Transparency Statement

This manuscript is a collaborative review. It was produced by a non-credentialed organic operator (Michael Polzin) in disciplined collaboration with AI systems used for drafting, mathematical organization, derivation auditing, stress-test design, and adversarial review.

- Michael Polzin has no formal training in variational Bayes, active inference, statistical mechanics, Markov-blanket theory, or the cluster variation method. He makes no claim of authority over the mathematics. His role is curiosity, persistence, ethical posture, and the requirement that AI assistance expose rather than hide uncertainty.
- AI systems contributed text drafting, identity derivations, numerical stress tests, comparison against primary sources, and adversarial red-team review. The contributing AI systems are: **Anthropic Claude (Opus 4.7)** for the primary drafting, audit, and Phase P0–P4 remediation; and **OpenAI GPT** accessed via the **Ai Onna** and **Jules** Custom GPTs (both built on the [ORCHESTRATE Method](https://www.amazon.com/ORCHESTRATE-Prompting-Professional-AI-Outputs/dp/B0G2BJKDM6)) — Ai Onna produced the prior independent peer review (SOURCE C) that catalyzed this audit chain, and Jules is acknowledged as an additional ORCHESTRATE-workflow collaborator. AI outputs may contain errors. AI cannot certify scientific truth.
- Nothing becomes scientifically authoritative merely by appearing in this manuscript. Public release would make this work *testable*; only expert review, replication, and correction can make it *reliable*.
- Where a claim is verified by direct derivation or reproducible test, it is labeled. Where it is sourced, the source is identified. Where it is interpretive, proposal-level, or unverified, it is so labeled.

We invite correction. The errors that an expert reader can name are the errors we most need to hear.

### AI authorship and contribution disclosure (venue-agnostic template)

The substantive drafting, mathematical derivation, numerical stress-test execution, audit, and adversarial review of this manuscript were conducted by Anthropic Claude (Opus 4.7) over four distinct sessions, all initiated and directed by the organic operator Michael Polzin. Claude is acknowledged as an AI co-contributor under whatever venue-specific disclosure standard applies to the publication channel chosen. **This disclosure must be updated to match the specific venue's required form at the time of submission.** A detailed venue-by-venue compliance checklist is in [Pre_Publication_Checklist.md](Pre_Publication_Checklist.md). Summary of venue-specific actions:

- **Amazon KDP**: review the KDP Help page on AI-generated content (current as of submission date); update front-matter AI disclosure as required.
- **arXiv**: complete the AI-tools field on submission; ensure the contributor list reflects Anthropic's recommended attribution for AI-augmented work.
- **Peer-reviewed journal**: follow the journal's AI-authorship policy (most major journals require disclosure but do not allow AI as a listed author).
- **OSF / Zenodo / institutional repository**: typically minimal AI disclosure required, but follow good-citizen norms.

The four AI sessions and their specific contributions are itemized in Appendix E.2. The complete provenance trail — from prior audit through Phase P0 (reproducibility), Phase P1 (provenance + file rename), Phase P2 (mathematical refinements), and Phase P3 (title and framing) — is captured in [Phase_P1_OODA.md](Phase_P1_OODA.md), [Phase_P2_OODA.md](Phase_P2_OODA.md), and [Phase_P3_OODA.md](Phase_P3_OODA.md).

**Conflict of interest.** The organic operator (Michael Polzin) reports no commercial or financial relationships that could be construed as a potential conflict of interest. The AI operator (Anthropic Claude) was used under standard subscription terms; no Anthropic-side review of this manuscript was conducted prior to publication.

---

## Dedication and Acknowledgment

We respectfully acknowledge the work and influence of:

- **Karl J. Friston**, whose body of work on the free energy principle and active inference is the substrate of the project we are reading.
- **Alianna J. Maren**, whose Themesis Technical Report TR-2019-01v6 ("Derivation of the Variational Bayes Equations") is the manuscript whose mathematical structure we have audited and used as one of the central organizing references.
- **Thomas Parr** and **Giovanni Pezzulo**, for their canonical exposition (with Friston) in *Active Inference: The Free Energy Principle in Mind, Brain, and Behavior* (MIT Press, 2022), which served as our principal contemporary anchor for the canonical variational free energy identity and bound direction.
- **Matthew J. Beal**, **David Blei**, **Martin Wainwright**, **Michael Jordan**, and the broader variational-inference community whose foundational results are the deeper substrate of everything that follows.
- **The Active Inference Institute** and its global community of researchers, students, and practitioners who carry this work into open scrutiny.
- The wider community of mathematicians, statisticians, physicists, neuroscientists, AI researchers, and curious students who give this work its meaning.

Acknowledgment is not endorsement. None of the people or institutions named above has reviewed or approved this draft.

---

## Abstract

We present a collaborative review of variational free energy as it is used in active inference, with a focus on the central variational identity, its bound direction, the roles of the variational and exact posterior densities, the distinction between generative model and generative process, the conditional-independence content of the Markov blanket, the limits of the thermodynamic analogy, and the status of cluster-variation-method (CVM) proposals as candidate recognition architectures.

Our central mathematical finding is that the standard variational free energy identity,
$$
F[q] \;=\; \mathbb{E}_q\!\left[-\ln p(y,\eta\mid m)\right] - H[q] \;=\; -\ln p(y\mid m) + D_{\mathrm{KL}}\!\bigl(q(\eta\mid r)\,\big\|\,p(\eta\mid y, m)\bigr),
$$
is mathematically standard and recoverable from definitions under mild assumptions ($p(y\mid m) > 0$, common support, integrability). Consequently, $F[q] \ge -\ln p(y\mid m)$ — the variational free energy upper-bounds surprisal (negative log evidence), and the corresponding ELBO $\mathcal{L}(q) = -F[q]$ lower-bounds log evidence, with equality iff $q = p(\eta\mid y, m)$ almost everywhere, under the assumptions (A1)–(A3) developed in Chapter 2 (model-evidence positivity, common support, expectation-finiteness).

We find that the *core algebra* of the manuscript we audited (Maren TR-2019-01v6) is consistent with this standard identity, but that several interpretive layers around the identity drift from the standard convention in ways that warrant repair: a reversed assignment of the variational and exact posterior roles; a stated bound direction opposite to the canonical one; a conflation of model posterior with external generative process; an under-justified summation expansion; an under-defined measure-space substitution; and a presentation of the CVM bridge as a derivation rather than as a proposal.

These findings are not novel. A prior independent AI peer review (referred to here as SOURCE C) reached substantively the same conclusions; the contemporary canonical reference (Parr, Pezzulo, & Friston 2022) states the bound direction explicitly five times. Our contribution is not new mathematics. It is a transparent, audit-grade, reproducibly tested re-presentation of the standard identities, organized so that the role-discipline, sign-discipline, and process-vs-model discipline are visible, with stress tests that can be re-run by any reader.

The CVM material is treated as a *promising proposal* for an internal recognition architecture. It is not yet a derivation of, or principled approximation to, the active-inference $F[q]$, and we say so explicitly. What would be required to convert proposal into derivation is enumerated.

We are humble about the limits of this work. We do not claim authority. We invite correction. The manuscript is offered as a contribution to open scientific scrutiny, not as a final judgment.

**Overall confidence.** 8 / 10 on the mathematical core. (The prior audit-session deliverable [`Revision Research and Test Notes.txt`](Revision%20Research%20and%20Test%20Notes.txt) reported 8.5 / 10; the half-point reduction in this manuscript reflects the additional uncertainty introduced by the drafting session — a draft can introduce wording that is more confident than the underlying audit, and we want the overall confidence to reflect the *combination* of audit + drafting rather than the audit alone. The audit-of-audit completed in Phase P0 of the [Audit Remediation Plan](Audit_Remediation_Plan.md) re-confirms 8.5/10 on the verification work but identified two reproducibility issues in the original tests, both corrected in this v2 draft.) The 2-point gap reflects: (i) source-extraction artifacts; (ii) un-inspected primary text of Beal (2003), Friston (2013, 2015), Sengupta-Stemmler-Friston (2013), Kikuchi & Brush (1967), and Blei-Kucukelbir-McAuliffe (2017); (iii) NESS / dynamical claims we did not re-derive; (iv) the corrected reproducibility issues in Tests 6 and 8 (now resolved); (v) residual AI-introduced error risk.

---

## Plain-Language Summary

Active inference is a research program that proposes a single mathematical objective — *variational free energy minimization* — as a way to describe perception, learning, and action in adaptive systems. Free energy in this setting is *not* the free energy of a steam engine; it is a borrowed phrase from statistical mechanics that names a particular function of probability distributions.

The mathematics behind free energy minimization is well-established in the variational-inference literature, but the way it is communicated across communities — physicists, neuroscientists, machine-learning researchers, students — is uneven. Different fields use different symbols. Different conventions flip signs. Different prose makes the same equation sound like different equations. A reader who understands one of the conventions can find the others quietly confusing.

This manuscript is a reviewable attempt to lay out the central identity in a single, careful, verifiable form, and to flag specific places where the standard conventions can drift. It is also an attempt to be honest: we are a non-credentialed person and an AI working together, and we want to make our reasoning, our tests, and our limits visible.

We are not claiming to have unified active inference. We are not claiming to have solved any open problem. We are claiming, more modestly:

1. The standard variational free energy identity is recoverable from first principles.
2. Several common ways of stating it — including some in primary documents we audited — risk subtle confusion about which density is the variational one, which way the inequality runs, and whether we are talking about a model or about the world.
3. The cluster variation method (CVM), which has been proposed as an internal computational engine for active inference, is mathematically promising but is not yet derivationally connected to the active-inference free energy. What would be needed to make that connection is specifiable.
4. The thermodynamic analogy is structurally real (energy minus entropy) but mathematically limited; we say where the analogy ends.

We invite expert readers — and skeptical ones — to correct us.

---

## Preface — Why This Manuscript Exists

This work began as a reading project. Michael Polzin, a curious non-specialist, set out to follow the derivation of variational free energy through the active-inference literature and to ask whether AI systems could help organize the reading transparently. The reading produced a question: *if I cannot personally verify the mathematics, can I at least make my own reasoning, and the AI's reasoning, auditable enough that an expert can find the errors fast?*

That is the entire project.

We are not claiming to advance the science. We are claiming to model a particular kind of disciplined collaboration: an organic operator who insists on humility, transparency, and provenance; AI operators that draft, derive, and stress-test; and a community of expert readers who hold the result accountable.

There are three reasons we believe a manuscript of this kind is worth offering for review:

**1. Accessibility.** Free energy minimization is a centerpiece of an influential research program that interfaces with neuroscience, AI, philosophy, and physics. The mathematics should be approachable to advanced students, and the conventions should be visibly disciplined. A clean re-presentation can help.

**2. Audit posture.** Many AI-assisted technical drafts circulate without provenance, without classified evidence, and without reproducible tests. We want to demonstrate an alternative posture: every major claim labeled, every critical equation derived from definitions, every numerical assertion runnable by a reader.

**3. Ethics.** AI-assisted work can sound more authoritative than it is. The way to keep that risk small is not to remove the AI assistance — it is to be loud about what the AI did, what was checked against primary sources, what was tested numerically, and what remains unverified. Humility is a feature of accuracy, not a softening of it.

We are aware that aspects of this manuscript will look unusual. It openly labels its own evidence classes. It includes "unresolved tension" boxes in the body, not buried in footnotes. It carries an explicit invitation for correction at the end. Those choices are deliberate. They are how we believe a non-expert organic operator can collaborate with AI systems on technical material without overclaiming.

If a reader leaves with the impression that we are *less* confident than typical drafts, that is the intended effect.

### A note on the choice of Maren TR-2019-01v6 as a primary subject

We chose Maren's manuscript not because it is uniquely error-prone — most expository manuscripts at the variational-inference / active-inference interface contain similar interpretive layers and similar sign-convention hazards — but because it is recent, ambitious, and explicit about its goal of being a Beal–Friston–Blei Rosetta stone. That ambition makes it a good test case for the kind of audit we are trying to demonstrate.

None of the findings in this manuscript should be read as dismissing Maren's pedagogical contribution. Specifically, several observations in Maren TR-2019-01v6 are pedagogically valuable and have been verified by direct read in our audit (see [Manuscript_Draft_v1_Audit.md](Manuscript_Draft_v1_Audit.md) §C and [Phase_P3_OODA.md](Phase_P3_OODA.md) Survey 3):

- The observation that Friston's notation systematically suppresses summations and integrals (SOURCE A line 162) — accurate and useful for any reader transitioning between Beal and Friston conventions.
- The explicit identification that variational free energy is **not** the Helmholtz free energy, with direct quotation of Sengupta-Stemmler-Friston (2013) (SOURCE A line 68) — a critical caveat against thermodynamic over-identification that Chapter 7 builds on.
- The explicit acknowledgment of the Beal-to-Friston sign-flip when shifting conventions (SOURCE A line 318): *"we reverse the signs on all of the terms on the right-hand-side of Eqn. 34, as well as the direction of the inequality."* (Maren is correct here; the audit's E2 finding is that the very next sentence at line 319 fails to apply this reversal — an internal contradiction, not a missed convention.)
- The two-form presentation of Eqn 2 that exposes both the energy-minus-entropy and the divergence-plus-evidence decompositions — a perspective often missed in Friston's compressed exposition.

Several of our refinements — the four-item CVM bridge checklist; the Markov-blanket trichotomy; the model-vs-process distinction; the Complexity-Accuracy form added in Chapter 2 — build directly on the structure of her exposition. The audit's central findings are interpretive-layer corrections — six items (E1–E10 in Appendix D) repairable by edits of one or two sentences each. The core algebra of Maren's Eqn 2 is recoverable, and the notation crosswalk goal is valuable. We treat the audit posture as one of repair, not dismissal.

---

## Method — Recursive OODA, Evidence Classes, and the Test/Review/Verify/Confirm/Execute/Observe Loop

This section describes the working method. It is short by design.

### M.1 The OODA loop, applied recursively

We use the **Observe–Orient–Decide–Act** discipline at multiple levels of the work:

- **Project level.** Observe the source corpus and audience. Orient toward what posture is ethical and useful. Decide on manuscript structure. Act by drafting, testing, and labeling.
- **Chapter level.** Observe the chapter's purpose and evidence. Orient toward what is derivation, what is interpretation, what is proposal, what is limitation. Decide what belongs in the chapter. Act by drafting with appropriate caveats.
- **Section, paragraph, equation, claim levels.** The same loop, tightened.
- **Final review level.** Observe what could embarrass the project under expert review. Orient toward whether each candidate-embarrassment is unsupported, overstated, unclear, or merely uncomfortable. Decide whether to revise, qualify, move to appendix, or remove. Act.

OODA is not theatrical here. It is a way to make sure no single sentence escapes the question *what evidence supports this exact wording?*

### M.2 Evidence classes

We label major claims with one of the following classes when useful:

- **Class A** — Direct derivation or reproducible test. The claim follows from explicit definitions or symbolic proof, or is corroborated by a numerical stress test that the reader can re-run.
- **Class B** — Primary source support. The claim is supported by a primary reference (e.g., Parr/Pezzulo/Friston 2022, Beal 2003, Wainwright & Jordan 2008, Blei/Kucukelbir/McAuliffe 2017).
- **Class C** — Secondary or interpretive support. Supported by explanatory synthesis or comparison, but not directly proven.
- **Class D** — Proposal or conjecture. Plausible and potentially valuable, but not proven.
- **Class E** — Personal or project framing. Describes the operators, the project posture, or publication intent.
- **Class U** — Unverified or unresolved. Untested or unresolved as of this draft.

A claim with mixed evidence is annotated to expose the mix. A sentence with no assignable evidence class is revised until it has one.

### M.3 The recursive test/review/verify/confirm/execute/observe loop

For every major unit of work we apply, in order:

1. **Test** — what claim is being made, and how could it be tested (symbolic derivation, numerical example, source comparison)?
2. **Review** — what assumptions does the test rely on? What could be wrong?
3. **Verify** — does the derivation, source, or numerical example actually support the claim?
4. **Confirm** — is the support strong enough for the wording used?
5. **Execute** — draft or revise the prose, equations, and labels.
6. **Observe** — re-read as a hostile expert, a sympathetic author, and a confused student. Identify residual risk.

Then repeat. We applied this loop explicitly to the Abstract, the core variational identity (Chapter 2), the bound-direction discussion (Chapter 3), the q/p discussion (Chapter 4), the CVM section (Chapter 8), the limitations section (Chapter 10), and the Conclusion.

### M.4 Internal red team / blue team

For each major disputed point we performed an internal blue-team / red-team / judge cycle:

- **Blue team** preserves the most charitable interpretation of the audited material and the value of the active inference research program.
- **Red team** attacks every overclaim, every hidden authority assertion, every unsupported mathematical statement, and every phrase liable to embarrass the work under expert review.
- **Judge** rewrites the manuscript text to be accurate, transparent, humble, and reviewable.

Only the polished result is included in this draft. The deliberation itself is not.

### M.5 Provenance discipline

The provenance of every section is documented in Appendix E. We name the source files used, the AI systems involved at the drafting and review stages, and what was tested against primary text versus inferred from secondary sources.

---

## Chapter 1 — Orientation to Active Inference and Free Energy Minimization

### 1.1 What active inference is, in one paragraph

Active inference is a research program, articulated principally by Karl Friston and collaborators, that proposes a single objective — *variational free energy minimization* — as a unifying description of perception, learning, and action in adaptive systems. Under this view, an agent maintains a *generative model* of how its observations are caused, uses an *approximate (variational) posterior* over hidden causes to perform inference, and acts on the world to make its observations less surprising under that model. Perception updates beliefs; action changes data; both reduce the same quantity (Class B, Parr/Pezzulo/Friston 2022, Chapter 2).

### 1.2 Why "free energy"?

The phrase is borrowed from statistical mechanics. In thermodynamics, the Helmholtz free energy of a system at temperature $T$ is $F = U - TS$ — internal energy minus the product of temperature and entropy. The *variational* free energy of a probability distribution is $F[q] = \mathbb{E}_q[-\ln p] - H[q]$ — an expected energy-like term minus an entropy. The structural similarity is real; it is what makes the analogy didactically useful. The physical interpretation is *not* automatic, and we discuss the limits of the analogy in Chapter 7.

### 1.3 The minimum vocabulary

We will be careful with the following terms throughout. Brief definitions here; precise ones in Chapter 2.

- **Generative model.** The agent's joint probabilistic model $p(y, \eta \mid m)$ of observations $y$ and hidden states $\eta$, indexed by model parameters $m$. (Class B, Parr/Pezzulo/Friston 2022, §2.5.)
- **Generative process.** The actual causal structure in the world that produces observations. *Distinct* from the generative model. (Class B, Parr/Pezzulo/Friston 2022, Fig. 2.2 caption: "The hidden states of the generative model and the generative process are not the same.")
- **Approximate posterior / variational density / recognition density.** $q(\eta \mid r)$. A density over hidden states that the agent uses *as a proxy* for the exact posterior under the model. Often parameterized by internal states $r$. (Class B.)
- **Exact posterior under the model.** $p(\eta \mid y, m) = p(y, \eta \mid m) / p(y \mid m)$. This is a property of the *model*, not the world. (Class A, basic Bayes.)
- **Surprisal / negative log evidence.** $L(y) := -\ln p(y \mid m)$. (Class B.)
- **Variational free energy.** $F[q] := \mathbb{E}_q[-\ln p(y, \eta \mid m)] - H[q]$ (Class A, definition).
- **Evidence Lower Bound (ELBO).** $\mathcal{L}(q) := \mathbb{E}_q[\ln p(y, \eta \mid m)] + H[q]$. (Class A, definition.)

### 1.4 The active-inference architectural picture

In the Friston / active-inference setting, one frequently partitions variables into:

- *external states* $\eta$ (or $x^*$ in some Friston notations),
- *sensory states* $s$ (the input pathway of the blanket),
- *active states* $a$ (the output pathway of the blanket),
- *internal states* $r$ (or $\mu$, depending on convention) — the substrate of the agent.[^r-mu-footnote]

[^r-mu-footnote]: Some Friston-style treatments distinguish $\tilde r$ (the internal-state variable) from $\mu$ (the sufficient statistic of $q$ — i.e., the parameter that the variational density is parameterized by). For the purposes of this manuscript we use $\tilde r$ in both senses; this is consistent with the simplification in SOURCE A but loses the variable/parameter distinction. A reviewer working from a treatment that maintains the distinction (e.g., the gradient-descent / sufficient-statistics derivation in Friston 2013) should read $\tilde r$ as "internal state, treated as parameter of $q$" throughout this manuscript.

We take $y = (s, a, r)$ as a convenient grouping of the variables that condition the agent's beliefs in this setting; $\eta$ as the hidden/external states whose posterior the agent approximates. The Markov-blanket structure that justifies this partition is treated separately in Chapter 6.

### 1.5 What this chapter is *not*

This chapter is a brief orientation. It is not a textbook treatment. It does not prove the active-inference claim that perception and action minimize the same quantity. That claim, properly argued, requires a treatment of expected free energy, policies, and dynamics that is outside the scope of this draft.

---

## Chapter 2 — The Core Variational Identity

This chapter states and derives the central identity. It is the technical heart of the manuscript.

### 2.1 Setup, definitions, and assumptions

Let $y$ denote observed variables. In active-inference notation it will often be convenient to write $y = (s, a, r)$. Let $\eta$ denote hidden or external states. Let $p(y, \eta \mid m)$ be a generative joint density (or mass function) over $y$ and $\eta$, indexed by model parameters $m$. Let $q(\eta \mid r)$ be a *variational* (or *recognition*) density over $\eta$, possibly parameterized by internal states $r$. Members of the family $\mathcal{Q}$ from which $q$ is drawn need not contain the exact posterior.[^m-index-footnote]

[^m-index-footnote]: Throughout this manuscript, the model index $m$ is suppressed in displayed equations once it has been introduced. Where $m$ appears explicitly, it is to emphasize model dependence; where it is absent, it is implicit. This convention follows Parr-Pezzulo-Friston (2022) Section 3.2 (corpus line 2421), which explicitly contrasts the explicit-$m$ Eqn 3.2 with the implicit-$m$ Eqn 2.5 of the same book.

**Marginal evidence.** $\displaystyle p(y \mid m) := \int p(y, \eta \mid m)\, d\eta.$

**Exact posterior under the model.** $\displaystyle p(\eta \mid y, m) := \frac{p(y, \eta \mid m)}{p(y \mid m)},$ defined wherever $p(y \mid m) > 0$.

**Surprisal.** $L(y) := -\ln p(y \mid m).$

**Shannon entropy of $q$.** $\displaystyle H[q] := -\int q(\eta \mid r)\,\ln q(\eta \mid r)\, d\eta.$

**KL divergence (forward to $p$).** $\displaystyle D_{\mathrm{KL}}(q \,\|\, p) := \int q\,\ln(q/p)\, d\eta,$ defined whenever $q \ll p$.

**Assumptions.**
- (A1) $p(y \mid m) > 0$ (positivity of evidence).
- (A2) $q \ll p(\cdot \mid y, m)$ (common support; absolute continuity).
- (A3) The expectations $\mathbb{E}_q\bigl[\ln p(y, \eta \mid m)\bigr]$, $\mathbb{E}_q\bigl[\ln p(\eta \mid y, m)\bigr]$, $\mathbb{E}_q\bigl[\ln p(\eta \mid m)\bigr]$, $\mathbb{E}_q\bigl[\ln p(y \mid \eta, m)\bigr]$, and $\mathbb{E}_q\bigl[\ln q(\eta \mid r)\bigr]$ are all finite. This restricts the variational family $\mathcal{Q}$ to densities under which all relevant log-likelihoods (joint, posterior, prior, and conditional likelihood) are integrable in absolute value. The five terms cover Form 1 (joint and entropy), Form 2 (posterior and entropy), and Form 3 (prior, conditional likelihood, and entropy) of the master identity.

(A1)–(A3) are sufficient for everything below. Stochastic independence between $q$ and $p$ is not required and is not the right relationship to assert.

### 2.2 The master identity

**Definition of variational free energy.**
$$
F[q] \;:=\; \int q(\eta \mid r)\,\ln \frac{q(\eta \mid r)}{p(y, \eta \mid m)}\, d\eta. \tag{2.1}
$$

**Form 1 (energy minus entropy).** Splitting the logarithm in (2.1),
$$
F[q] \;=\; \int q\,\ln q\, d\eta \;-\; \int q\,\ln p(y, \eta \mid m)\, d\eta \;=\; -H[q] \;+\; \mathbb{E}_q\!\left[-\ln p(y, \eta \mid m)\right].
$$
Rearranging,
$$
\boxed{\;F[q] \;=\; \mathbb{E}_q\!\left[-\ln p(y, \eta \mid m)\right] - H[q].\;} \tag{$\star$}
$$

**Form 2 (surprisal plus KL).** Apply Bayes' rule under (A1):
$$
\ln p(y, \eta \mid m) \;=\; \ln p(\eta \mid y, m) \;+\; \ln p(y \mid m).
$$
Substitute into (2.1):
$$
F[q] \;=\; \int q\,\ln \frac{q}{p(\eta \mid y, m)\, p(y \mid m)}\, d\eta \;=\; \int q\,\ln \frac{q}{p(\eta \mid y, m)}\, d\eta \;-\; \ln p(y \mid m)\,\int q\, d\eta.
$$
Since $\int q\, d\eta = 1$:
$$
\boxed{\;F[q] \;=\; D_{\mathrm{KL}}\!\bigl(q(\eta \mid r) \,\big\|\, p(\eta \mid y, m)\bigr) \;-\; \ln p(y \mid m) \;=\; D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m)) + L(y).\;} \tag{$\star\star$}
$$

**Form 3 (Complexity minus Accuracy).** A second application of Bayes — splitting the joint via the prior-likelihood factorization $\ln p(y, \eta \mid m) = \ln p(y \mid \eta, m) + \ln p(\eta \mid m)$ rather than the posterior-evidence factorization — gives
$$
F[q] \;=\; D_{\mathrm{KL}}\!\bigl(q(\eta\mid r) \,\big\|\, p(\eta\mid m)\bigr) \;-\; \mathbb{E}_q[\ln p(y\mid \eta, m)]. \tag{$\star{\star}{\star}$}
$$
The first term is the *complexity* of $q$ (its KL divergence from the prior over hidden states); the second is the negative *accuracy* (expected log-likelihood) of $q$. This decomposition is the source of the Bayesian-Occam intuition: minimizing $F[q]$ trades complexity for accuracy, with simpler beliefs preferred when the data do not require otherwise. Parr/Pezzulo/Friston 2022 (corpus lines 1316–1317) labels these the "Complexity" and "Accuracy" terms of Eqn 2.5 explicitly. (Class A, derivation; Class B, SOURCE B labels the decomposition.) Numerical verification of Form 3 alongside Forms 1 and 2 is provided as Test 11 in Appendix C.

Identities $(\star)$, $(\star\star)$, and $(\star\star\star)$ together are the three equivalent forms of the variational free energy. Their equivalence is the entire content of the master identity. (Class A, derivation; Class B, matches Parr/Pezzulo/Friston 2022 Eqn. 2.5, all three lines.)

### 2.3 The bound (Lemma 1)

**Lemma 1.** *Under (A1)–(A3), $F[q] \ge L(y) = -\ln p(y \mid m)$, with equality iff $q(\eta \mid r) = p(\eta \mid y, m)$ almost everywhere.*

*Proof.* By Gibbs' inequality, $D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m)) \ge 0$, with equality iff $q = p(\eta \mid y, m)$ a.e. Apply to $(\star\star)$. $\square$

(Class A, derivation.)

### 2.4 The ELBO and the sign convention (Lemma 2)

**Definition (ELBO).** $\mathcal{L}(q) := \mathbb{E}_q[\ln p(y, \eta \mid m)] + H[q].$

**Lemma 2.** *Under (A1)–(A3),*
$$
\mathcal{L}(q) \;=\; \ln p(y \mid m) \;-\; D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m)),
$$
*hence $\mathcal{L}(q) \le \ln p(y \mid m)$, and $F[q] = -\mathcal{L}(q)$.*

*Proof.* From $(\star)$, $F[q] = -\mathbb{E}_q[\ln p(y, \eta \mid m)] - H[q] = -\mathcal{L}(q)$. Combine with $(\star\star)$. The bound on $\mathcal{L}$ follows from $D_{\mathrm{KL}} \ge 0$. $\square$

(Class A, derivation.)

### 2.5 What this chapter establishes

- **(Class A.)** The two-form identity $(\star)$ and $(\star\star)$.
- **(Class A.)** The bound $F[q] \ge -\ln p(y \mid m)$, with equality iff $q$ is the exact posterior under the model.
- **(Class A.)** The ELBO/VFE relation $F[q] = -\mathcal{L}(q)$, hence $\mathcal{L}(q) \le \ln p(y \mid m)$.

These three are the substantive technical content of the chapter. They are derived from definitions under (A1)–(A3) and are independently corroborated by Parr, Pezzulo, & Friston (2022), Eqn. 2.5 (Class B).

### 2.6 What this chapter does *not* establish

- It does not prove the active-inference claim that perception *and action* minimize the same $F[q]$ (Class C, that claim depends on additional assumptions about how data are sampled).
- It does not prove that the external generative process is itself characterizable as a free-energy minimum (Class C/D; this requires NESS / steady-state arguments outside this chapter).
- It does not say anything about the cluster variation method (Chapter 8).
- It does not connect the variational free energy to physical Helmholtz or Gibbs free energy as a literal identification (Chapter 7).
- It does not develop the parameter-learning aspect of variational Bayes — i.e., the joint optimization of $F[q]$ over $q$ *and* over model parameters $\theta$ that is the core use case of Beal (2003). In the active-inference reading we adopt, $m$ (the model) is treated as fixed throughout this manuscript; the agent's task is recognition (optimizing $q$), not parameter estimation. A treatment that develops the EM-style alternation between $q$-optimization and $\theta$-optimization is in Beal (2003) §2.2.2 ff. and Blei et al. (2017) §2.3. (Class C — outside scope; the citations to Beal and Blei are *secondary* — both primary sources await Layer 2 first-hand verification per [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §1 (Beal) and §7 (Blei).)

---

## Chapter 3 — ELBO, VFE, Surprisal, and Bound Direction

This chapter is short. It exists because bound direction is the place where careful exposition most often slips, and a slip there propagates everywhere downstream.

### 3.1 The hierarchy in one table

| Convention | Functional | Bound | Direction |
|------------|------------|-------|-----------|
| ELBO (Beal / Blei / ML literature) | $\mathcal{L}(q) = \mathbb{E}_q[\ln p] + H[q]$ | $\mathcal{L}(q) \le \ln p(y \mid m)$ | LOWER bound on log evidence |
| VFE (Friston / active inference) | $F[q] = \mathbb{E}_q[-\ln p] - H[q]$ | $F[q] \ge -\ln p(y \mid m)$ | UPPER bound on surprisal |
| Identity | $F[q] = -\mathcal{L}(q)$ | — | sign flip |
| Tightness | $D_{\mathrm{KL}} = 0$ | $F[q] = -\ln p(y)$, $\mathcal{L}(q) = \ln p(y)$ | iff $q = p(\eta \mid y, m)$ |

*Footnote: rows 1 and 2 of the table are sign-flipped restatements of one another. Negating both sides of $\mathcal{L}(q) \le \ln p(y \mid m)$ yields $-\mathcal{L}(q) \ge -\ln p(y \mid m)$, and identifying $-\mathcal{L}(q) = F[q]$ (row 3) and $-\ln p(y \mid m) = L(y)$ (definition) gives $F[q] \ge L(y)$ (row 2). The two rows convey the same content in two conventions — Beal/Blei/ML versus Friston/active-inference.*

### 3.2 Why the directions go this way

The two directions are not arbitrary. They follow from a single fact — *KL divergence is non-negative* — applied in two algebraic forms:

- $\mathcal{L}(q) = \ln p(y \mid m) - D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m))$. Since $D_{\mathrm{KL}} \ge 0$, the right-hand side is $\le \ln p(y \mid m)$.
- $F[q] = -\ln p(y \mid m) + D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m))$. Since $D_{\mathrm{KL}} \ge 0$, the right-hand side is $\ge -\ln p(y \mid m)$.

Both statements collapse to equality when $q = p(\eta \mid y, m)$ — i.e., when the variational density coincides with the exact posterior. (Class A, derivation; Class B, Parr/Pezzulo/Friston 2022 explicitly states "free energy is an upper bound on negative log evidence" five times, in book passages we have located at lines 1397, 1452, 1605, 2284, and 2433 of the corpus file.)

### 3.3 Why sign-convention slips are common, and how to avoid them

The Beal / Blei machine-learning literature typically maximizes the ELBO, which lower-bounds log evidence. The Friston / active-inference literature typically minimizes the VFE, which upper-bounds surprisal. These are *equivalent* under sign reversal — but a reader who is fluent in one convention can read the other and not notice when an inequality has flipped. Common slips:

- Saying "free energy is a lower bound" without specifying *on what*. (It is *not* a lower bound on log evidence; it can be described as a lower bound on a thermodynamic-like reference, but this is not the canonical bound and is liable to confuse.)
- Saying "free energy approaches the free energy of the external system" — language that, taken at face value, suggests the external system has its own free energy in the same sense, which is a separate (Class D) claim.
- Conflating "$F$ equals $L + D_{\mathrm{KL}}$" (a quantity that *upper-bounds* $L$) with "$F$ is bounded by $L$" (the wrong direction).

The discipline that prevents all three: every time a bound is stated, write the inequality with the variable name on each side. *"$F[q] \ge L(y)$"* is unambiguous. *"$F$ is a bound on $L$"* is ambiguous.

### 3.4 What follows from the bound

The bound has practical content. It tells us:

- *Optimization makes sense.* Because $F[q] \ge L(y)$ with equality only at $q = p(\eta \mid y, m)$, minimizing $F[q]$ over $q \in \mathcal{Q}$ moves $q$ closer to the exact posterior whenever $\mathcal{Q}$ contains a closer member. (Class A.)
- *Evidence approximation is a corollary.* Because $\mathcal{L}(q) = -F[q] \le \ln p(y \mid m)$, the maximized ELBO is a tractable lower estimate of log evidence. (Class A.)
- *Tightness has structural meaning.* The gap between $F[q]$ and $L(y)$ is exactly $D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m))$. There is no slack from any other source. (Class A.)

### 3.5 Numerical anchor

In Appendix C (Test 1) we work a discrete two-state example: $\eta \in \{0, 1\}$, $p(\eta=1) = 0.7$, $p(y=1 \mid \eta=1) = 0.9$, $p(y=1 \mid \eta=0) = 0.2$. With $y = 1$ observed, the surprisal is $-\ln p(y=1) = 0.371$ nats and the exact posterior is $p(\eta=1 \mid y=1) = 0.913$. For uniform $q$, $F[q] = 0.945$ nats, ELBO = $-0.945$, KL = $0.574$. The bound holds; the identity holds; equality holds at $q$ = exact posterior. (Class A; reproducible.)

---

## Chapter 4 — q/p Role Discipline and Why It Matters

The variational identity is symmetric-looking on paper. It is not symmetric in *role*. This chapter is about that asymmetry.

### 4.1 The roles, in one sentence each

- **$q(\eta \mid r)$** is the *approximate* (variational, recognition) posterior. It is a member of the variational family $\mathcal{Q}$. It is what the agent has access to and optimizes.
- **$p(\eta \mid y, m)$** is the *exact* posterior under the generative model. It is a property of the model. It is generally not available in closed form; if it were, variational inference would not be needed.

These are not interchangeable.

### 4.2 What can go wrong if the roles are swapped

If a manuscript calls $q$ the "true posterior" and $p(\eta \mid y, m)$ the "variational density," several things break, even when the algebra survives:

1. The bound direction inverts in interpretation. ($F$ now appears to upper-bound the variational density's evidence, which is meaningless.)
2. The optimization story collapses. (You cannot optimize the "true posterior" — it is not the moving part.)
3. The discussion of equality at $q = p(\eta \mid y, m)$ becomes uninterpretable.
4. The thermodynamic analogy gets attached to the wrong distribution.

The cleanest way to prevent this is to define $q$ and $p(\eta \mid y, m)$ *once* at the top of the derivation, with their roles named, and to never let the labels drift.

### 4.3 The "recognition density" usage

In active-inference literature, $q(\eta \mid r)$ is sometimes called the *recognition density*. The name reflects the active-inference reading: internal states $r$ encode (parameterize) the agent's recognition of the external causes $\eta$. This is the same object as the variational posterior in machine-learning literature. Different name, same role.

It is occasionally tempting — and we have observed this in the manuscript we audited — to gloss the recognition density as "the (true) distribution of the external system itself." That gloss is incorrect. The recognition density is the *agent's approximation*, not the external system. Conflating it with the external system also collides with the model-vs-process distinction we treat in Chapter 5.

### 4.4 Numerical anchor

In Appendix C (Test 2), we compute $F[q]$ for a sweep of $q(\eta=1)$ values in the same toy model used in §3.5. The KL divergence $D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m))$ is monotone in distance from the exact posterior; $F[q]$ tracks KL exactly; the bound holds throughout. (Class A.) This is a direct, reproducible illustration that $q$ is the moving part and $p(\eta \mid y, m)$ is the fixed target.

### 4.5 Respectful reading

We note for the record that role reversals in mathematical prose are a common, often inadvertent slip — not a sign of careless work. They are particularly easy when one is moving between communities (Beal, Friston, Blei) whose conventions vary. The manuscript we audited (Maren TR-2019-01v6) makes this slip in a parenthetical near its central equation; the surrounding algebra is intact, and the *local* slip is repairable in one sentence. However, the role-reversal *propagates*: through Section 6.2's bound-direction misnomer (E2), Section 4.3's posterior/process conflation (E6), and Section 8.1's "each separately come to free energy minima" wording (E13). A complete repair therefore touches the parenthetical at line 34 of SOURCE A, the introductory wording of Section 6.2, the "actual distribution of the external system" phrasing at line 132, and Section 8.1's NESS-licensed claim. Each is locally one sentence; collectively, four sentences. We treat these as wording issues at the interpretive layer, not failures of the underlying mathematics.

---

## Chapter 5 — Generative Model versus Generative Process

The single most consequential distinction in active-inference exposition is, in our reading, the distinction between the *generative model* (a property of the agent) and the *generative process* (a property of the world). When this distinction is preserved, the mathematics has clear scope. When it is collapsed, sentences acquire weight they cannot bear.

### 5.1 The distinction stated

- **Generative process.** The actual causal mechanism in the world by which observations are produced. Variables in the process may be inaccessible to the agent, may take values outside the agent's hypothesis space, and may live in spaces of different dimension or type than what the agent's model supposes. (Class B, Parr/Pezzulo/Friston 2022 Fig. 2.2 caption.)
- **Generative model.** A joint probabilistic structure $p(y, \eta \mid m)$ that the agent uses to *interpret* observations $y$ in terms of hypothesized hidden states $\eta$. The model is a construct, not the world. The model may include hidden states that do not exist in the world; the world may include hidden states the model does not represent.

The exact posterior $p(\eta \mid y, m)$ is a property of the *model*. It tells us, *under the model*, how the hypothesized hidden states are distributed given observed $y$. It is *not* a description of "the actual external system."

### 5.2 Why the conflation is tempting, and why we resist it

It is grammatically natural to read $p(\eta \mid y)$ as "the distribution of $\eta$ given $y$." If $\eta$ has been informally introduced as "the external state of the world," the expression starts to read as "the distribution of the world's external state given my observation." In a single sentence the distinction has dissolved.

The careful reading is: $p(\eta \mid y, m)$ is the model's *inferred* distribution over its own *hypothesis variable* given the observation. The world's actual external state $\eta^*$ may live in a different space and may not correspond to any specific hypothesis $\eta$ at all. (Class B; this is exactly the reading made explicit in Parr/Pezzulo/Friston 2022 §2.3.)

### 5.3 Consequences for the rest of the manuscript

This distinction quietly disciplines several downstream statements:

- **Bound interpretations.** $F[q]$ upper-bounds the *model's* surprisal $-\ln p(y \mid m)$, not "the surprisal of the world." There is no general assertion that the world has a well-defined surprisal under the agent's model.
- **"Both systems minimize free energy."** Statements that the external generative process *itself* minimizes some free energy require a separate argument (NESS / steady-state) that is not implied by the variational identity. We treat them as Class D until that argument is supplied.
- **Markov-blanket statements.** A blanket factorization can be stated about the model and about the process; the two are distinct claims and should be labeled accordingly. (See Chapter 6.)
- **CVM.** The CVM, if used to parameterize $q$, parameterizes the agent's recognition density — not the external generative process. (See Chapter 8.)

### 5.4 The respectful repair

Where a manuscript writes "$p(\eta \mid s, a, r)$ is the actual distribution of the external system itself," the repair is one phrase: replace "actual distribution of the external system itself" with "exact posterior over external states under the generative model." That single substitution preserves the algebra and removes the conflation. We do not believe such conflations are signs of authorial confusion about the science; they are signs that English does less work here than the mathematics asks. The mathematics asks for a specific reading and the prose has to support it.

**Unresolved tension.** Some active-inference treatments do propose that, at non-equilibrium steady state, the generative *process* admits a free-energy-like characterization that the agent's model approximates. **Why it matters.** If true and properly argued, it would license stronger language about the external system. **Current status.** Class D for the purposes of this manuscript; we have not re-derived the NESS arguments. **What would resolve it.** A direct treatment of the steady-state arguments in Friston (2013, 2015) and a derivation showing, under specific assumptions, when the model posterior is a controlled approximation to a process-level steady-state distribution.

---

## Chapter 6 — Markov Blankets: Conditional Independence, Causal Diagrams, and Inference Architecture

"Markov blanket" is one of the most-used phrases in active inference and one of the most ambiguous in casual usage. It names at least three different things that are usually correlated in practice but are logically distinct.

### 6.1 The three meanings

**(a) Conditional-independence partition.** The original definition. A set of variables $b$ is a *Markov blanket* for variables $\mu$ relative to a set $x$ when $\mu \perp\!\!\!\perp x \mid b$, i.e.,
$$
p(\mu, x \mid b) = p(\mu \mid b)\, p(x \mid b).
$$
This is purely a statement about the joint density. It says nothing about causation, time, or dynamics. (Class B, Parr/Pezzulo/Friston 2022 Box 3.1.)

**(b) Causal / process diagram.** A pattern of *influence* arrows in a dynamic / causal graph: external states influence sensory states but not internal states directly; internal states influence active states but not external states directly; etc. This is a claim about the structure of the dynamics (often the Jacobian of a stochastic differential equation), and it is a separate claim from (a). (Class B, Parr/Pezzulo/Friston 2022 Fig. 3.1.)

**(c) Inference architecture.** A modeling choice in which the agent uses the blanket structure to organize its inference: internal states $r$ are used to *parameterize* a recognition density $q(\eta \mid r)$. This is a third thing: a commitment to use the partition for a specific computational purpose.

### 6.2 Why keeping these separate matters

A statement like "the Markov blanket separates the external system from the internal system" can mean (a), (b), or (c) — each with different mathematical and philosophical weight. Common slips:

- Inferring (a) from a process diagram (b) without checking the conditional-independence factorization.
- Inferring (b) from a CI statement (a) without dynamical structure.
- Treating (c) as if it were a consequence of (a) or (b), when it is in fact a modeling decision.

The discipline: when the phrase "Markov blanket" appears, label which sense is being invoked.

### 6.3 The active-inference partition, named precisely

In the active-inference setting we have hidden/external states $\eta$ (or $x$), sensory states $s$ (or $y$), active states $a$ (or $u$), and internal states $r$ (or $\mu$). Different conventions use different letters for the same role; Parr/Pezzulo/Friston 2022 explicitly note that "different fields use different notations: sometimes sensory states are denoted $s$, external states $\eta$, and active states $a$" (Box 3.1, Fig. 3.1 caption). For this manuscript we adopt the $(s, a, r, \eta)$ convention with $y = (s, a, r)$.

The blanket statement, in the strict CI sense, is then
$$
\eta \;\perp\!\!\!\perp\; r \;\big|\; (s, a),
$$
i.e., the sensory and active states together form the blanket separating external states from internal states. (Class B; CI partition.) This factorization is what justifies treating $q(\eta \mid r)$ as a recognition density and is what licenses the inference-architecture choice (c).

*Footnote on notation: We use the standard probability-theory notation $\perp\!\!\!\perp$ ("double tack") for conditional independence. SOURCE B Box 3.1 (corpus line 1938) writes the same relation with a single tack $\perp$; the meaning is identical. We adopt the double-tack convention for its broader recognition in the variational-inference and statistics literature.*

### 6.4 Numerical anchor

In Appendix C (Test 8), we construct a small chain in which $\eta \to s \to r$, $r \to a$, with $a$ deterministically determined by $r$ alone. We check the CI factorization $p(\eta, r \mid s, a) \stackrel{?}{=} p(\eta \mid s, a)\, p(r \mid s, a)$ across all blanket settings; the residual is of order machine epsilon ($\sim 10^{-16}$ in IEEE 754 double precision), confirming the conditional independence factorization to floating-point precision. (Class A; reproducible. Acceptance bound used in the test suite is $< 5 \times 10^{-16}$, a 4-epsilon safety margin.)

### 6.5 What this chapter does *not* establish

- We do not derive the dynamical-systems / Langevin-equation form of the Markov-blanket flows used in some active-inference papers. That belongs to a separate treatment.
- We do not claim that *every* coupled system has a Markov blanket. The existence of a blanket is a structural property; some systems have one, some do not.
- We do not address the "blanket of blankets" / nested-blanket constructions used in multiscale active-inference treatments. Those are well-defined but outside scope.

---

## Chapter 7 — Thermodynamic Analogy: Useful, Limited, and Worth Naming

The variational free energy has the form $F = \langle E \rangle - H$. So does the Helmholtz free energy. The structural identity is what makes the analogy didactically valuable. It is also what makes it dangerous, because the two quantities are not the same thing.

### 7.1 Where the analogy is genuine

The structural form
$$
F[q] = (\text{expected energy-like term}) - (\text{entropy})
$$
is a real similarity. It is a generalization of the relationship between Helmholtz $F = U - TS$ and the Gibbs equilibrium distribution. With temperature absorbed by reduction (set $\beta = 1/k_B T = 1$), the equilibrium distribution that minimizes $F[q]$ over a constrained family is indeed Gibbs-like in form, and the analogy can be made precise in narrow settings (e.g., maximum-entropy distributions subject to expectation constraints). (Class C/B.)

### 7.2 Where the analogy is not a literal identity

Three places where the analogy ends:

**(a) The "energy" is an information-theoretic quantity, not a physical one.** The expected term $\mathbb{E}_q[-\ln p(y, \eta \mid m)]$ is "expected negative log joint" — an expectation of a log-probability. It is *not* the internal energy of any physical system. (Class B; Sengupta, Stemmler, & Friston 2013, as quoted in the manuscript we audited, are explicit on this point: "*variational free energy is not the Helmholtz free energy* … it is a functional of a probability distribution over hidden (fictive) states encoded by internal states $q(y \mid m)$, not the probability distribution over the (physical) internal states.")

**(b) The "enthalpy" label.** Calling $\mathbb{E}_q[-\ln p]$ "expected enthalpy" is too aggressive. Enthalpy in classical thermodynamics is $H = U + pV$; there is no $pV$ analog in the variational setting. We prefer "expected energy," "expected negative log joint," or "energy-like term." (Class A; this is a terminological repair, not a mathematical one.)

**(c) Helmholtz vs. Gibbs.** Helmholtz $A = U - TS$ and Gibbs $G = H - TS = U + pV - TS$ are different state functions in different ensembles (canonical vs. isothermal-isobaric). When variational free energy is taken purely structurally (energy minus entropy with no $pV$ work), the *distinction* is not engaged — but the distinction has not "disappeared." Saying so invites later readers to fold the two together in unprincipled ways. The careful phrasing: *"because we operate purely structurally and not at constant pressure or volume, the Helmholtz / Gibbs distinction is not engaged here. The analogy extends only to the energy-minus-entropy structure."*

### 7.3 The Appendix B / sign-convention hazard

In the manuscript we audited, an appendix-level expression of the form
$$
H \;=\; \sum_i \int dx_i\, q(x_i)\, \ln p(x_i, y_i \mid \theta)
$$
appears. If $H$ is intended as the energy-like term in $F = (\text{energy}) - H[q]$, the standard expected-energy form requires a negative sign:
$$
U[q] \;=\; -\sum_i \int dx_i\, q(x_i)\, \ln p(x_i, y_i \mid \theta).
$$
We verify numerically (Appendix C, Test 9) that the published form differs from the standard expected-energy term by a single sign. This is repairable by inserting one minus sign and renaming the symbol (we suggest $U[q]$ to avoid clashing with $H[q]$ as Shannon entropy). (Class A; reproducible.)

### 7.4 The bottom line on the analogy

- *Use* the analogy as didactic motivation: yes.
- *Identify* variational free energy with physical Helmholtz or Gibbs free energy: no, unless a specific physical mapping is constructed and justified.
- *Speak* of "enthalpy," "internal energy," "Helmholtz," "Gibbs" interchangeably: no.
- *Preserve* the distinction between structural similarity and physical identity: yes.

This is conservative. It costs almost nothing in expressive power and prevents a class of avoidable misunderstandings.

---

## Chapter 8 — CVM as a Proposed Computational Engine

The cluster variation method (CVM), developed in the statistical-mechanics literature by Kikuchi and others, is a way to approximate the free energy of a Markov random field by combining cluster-level entropies with degeneracy weights. It is more expressive than mean-field while remaining tractable. It has been proposed (most directly by Maren 2016 and the manuscript we audited) as an *internal recognition architecture* for active inference: a way to give the recognition density $q$ an explicit computable free-energy landscape on a grid of representational units.

We treat CVM here as a *promising proposal*. We are explicit about what would be needed to convert the proposal into a derivation.

### 8.1 What is attractive about the proposal

- It supplies an *internal* free-energy landscape that representational units can be brought to equilibrium over — not just an abstract recognition density.
- It uses configuration variables (single-site, nearest-neighbor pair, next-nearest-neighbor pair, triplet) and degeneracy weights with a clear combinatorial interpretation. (Class B; Kikuchi & Brush 1967.)
- It admits analytic equilibrium expressions in tractable cases (e.g., zero activation enthalpy $\epsilon_0 = 0$).
- It is intellectually substantive in a way that matters for active inference: it gives the recognition density something to *compute over*, not just something to be.

### 8.2 What is missing for a derivation

To present the CVM as *part of* the active-inference variational framework — rather than as a structurally similar but separate principle — the following would need to be specified:

1. **Generative model.** What exactly is $p(y, \eta \mid m)$ in CVM-compatible form? What are the random variables, the joint, and the role of $m$?
2. **Variational family.** What family $\mathcal{Q}$ of densities $q_\phi(\eta)$ is being used, parameterized by configuration variables $\phi = (x_1, x_2, y_i, w_i, z_i)$ and enthalpy parameters $(\epsilon_0, \epsilon_1)$? Is it a maximum-entropy family with cluster-expectation constraints? An exponential family? Something else?
3. **Objective relationship.** How does the CVM free energy $F_{\mathrm{CVM}}(\phi)$ relate to the active-inference free energy $F[q_\phi]$? Are they equal exactly? Is one an upper bound on the other? Is the gap controlled by some approximation parameter? Or are they *different* free-energy functionals that happen to share the energy-minus-entropy structure?
4. **Assumptions.** Under what conditions does the proposed bridge hold? What is required of the generative model, the variational family, the cluster structure, and the parameter regime?

### 8.3 What a clean bridge would look like

A future paper might, for example, prove a proposition of the form:

> **Proposition (proposed; not yet proved).** Let $q_\phi(\eta)$ be the maximum-entropy density on the CVM grid with configuration-variable expectations $\phi$. Let $F_{\mathrm{CVM}}(\phi)$ be the CVM free energy. Under [explicit assumptions], $F_{\mathrm{CVM}}(\phi) = F[q_\phi] + R(\phi)$, where the residual $R$ is bounded by [explicit function of cluster size and grid topology].

Such a proposition would convert the CVM section from association into derivation. Until then, the right language is "we propose," "we conjecture," "future work will establish."

### 8.4 Numerical anchor

In Appendix C (Test 10) we observe that, computed independently, $F_{\mathrm{CVM}}$ on a small Ising-like grid and $F[q]$ for an active-inference toy give different numerical values for the "same" configuration — which is precisely what we should expect, because they are two distinct variational principles applied to two distinct objects until a bridge is constructed. The structural similarity (energy minus entropy) is not, by itself, derivational.

### 8.5 Verdict

The CVM material is **promising but incomplete** as a contribution to active-inference theory. It is a serious proposal worth pursuing. The four-item bridge checklist in §8.2 is the research agenda we would suggest. We do not regard the CVM as a flawed contribution; we regard the *bridge* to active-inference $F[q]$ as not yet supplied.

**Unresolved tension.** Whether a clean bridge exists at all is itself an open question. **Why it matters.** If $F_{\mathrm{CVM}}$ and $F[q]$ cannot be made principled approximations to each other, the active-inference framing of CVM may have to be relaxed to "structurally analogous" rather than "within the same framework." **Current status.** Class D / U. **What would resolve it.** A theorem of the form sketched in §8.3, or a proof that no such theorem can hold under reasonable assumptions.

---

## Chapter 9 — Recursive Stress Tests and Reproducible Evidence

This chapter is a high-level summary of the numerical tests. Full setups and code are in Appendix C. Each test is independently re-runnable.

### 9.1 Test 1 — Discrete two-state model: identity and bound

*Discrete $\eta \in \{0,1\}$, $p(\eta=1) = 0.7$, $p(y=1 \mid \eta) = (0.2, 0.9)$, $y=1$ observed.* We compute $F[q]$, KL, ELBO, and the bound margin for several $q(\eta=1)$ values. **Result.** Both forms of the master identity coincide; $F[q] \ge -\ln p(y)$ holds at every $q$; equality at $q$ = exact posterior. (Class A.)

### 9.2 Test 2 — Bad approximate posterior

Sweep $q(\eta=1) \in \{0.05, 0.20, 0.50, 0.70, 0.913, 0.99\}$ in the same model. **Result.** $F[q]$ tracks $D_{\mathrm{KL}}(q \| p(\eta \mid y, m))$ exactly; the bound margin equals KL; the bound holds throughout. (Class A.)

### 9.3 Test 3 — Support mismatch

Set $p(y=1 \mid \eta=0) = 0$, $p(y=1 \mid \eta=1) = 1$. The exact posterior is degenerate. Any $q$ with $q(\eta=0) > 0$ produces $D_{\mathrm{KL}} = +\infty$. **Conclusion.** Assumption (A2) (common support / absolute continuity) is essential, not cosmetic. (Class A.)

### 9.4 Test 4 — Gaussian conjugate

$\eta \sim \mathcal{N}(0, 4)$, $y \mid \eta \sim \mathcal{N}(\eta, 1)$, $y = 1.5$ observed. Exact posterior $\eta \mid y \sim \mathcal{N}(1.2, 0.8)$. Surprisal $-\ln p(y) = 1.949$ nats. **Result.** Monte-Carlo evaluation of $F[q]$ at three candidate $q$'s confirms the bound and equality at $q$ = exact posterior. (Class A.)

### 9.5 Test 5 — Sign-convention trap

For uniform $q$ in the discrete model, $F_{\mathrm{Friston}} = 0.945$ and $\mathrm{ELBO}_{\mathrm{Beal}} = -0.945$. The wording "$F$ is a lower bound on $-\ln p(y)$" would require $0.945 \le 0.371$, which is false. **Result.** Direct numerical falsification of any wording that reverses the bound direction. (Class A.)

### 9.6 Test 6 — $L(s, a, r)$ expansion

*Five iid Bernoulli observations with $p = 0.7$, taken as the explicit data vector $y = (0, 1, 1, 1, 0)$* (no RNG; data supplied directly to remove RNG-version dependencies that surfaced in v1's prior tests). The valid iid surprisal is $-\sum_i \ln p(y_i) = -[2\ln 0.3 + 3\ln 0.7] = 3.4780$ nats; the literal $-I \cdot \ln p(y) = -5\ln(0.69) = 1.8553$ nats coincides only when all $y_i$ are equal. **Result.** A literal $-\sum_{i=1}^I \ln p(s, a, r)$ expansion (repeated identical term) is incoherent without an iid factorization with distinct data indices. (Class A.)

### 9.7 Test 7 — Measure transformation

$\eta \sim \mathcal{N}(0, 1)$, $r = 2\eta + 3$. We compute $\mathbb{E}_\eta[\eta^2]$ vs. $\mathbb{E}_r[r^2]$ without applying a Jacobian: the values differ ($\approx 1.0$ vs. $\approx 13.0$). **Conclusion.** Renaming the integration variable from $\eta$ to $r$ without supplying the map and Jacobian changes the integral. (Class A.)

### 9.8 Test 8 — Markov-blanket conditional independence

A constructed chain ($\eta \to s \to r$, $r \to a$ deterministic). For all blanket settings $b = (s, a)$, the residual of $p(\eta, r \mid b) - p(\eta \mid b)\, p(r \mid b)$ is of order machine epsilon ($\sim 10^{-16}$ in IEEE 754 double precision; acceptance bound $< 5 \times 10^{-16}$). **Result.** CI factorization holds to floating-point machine precision; the formal Markov-blanket statement is verified numerically on a concrete model. (Class A.)

### 9.9 Test 9 — Appendix B sign

For uniform $q$ in the two-state model, the standard expected energy $\mathbb{E}_q[-\ln p] = +1.638$, while a published expression of the form $\sum_i \int q(x_i) \ln p(x_i, y_i \mid \theta) = -1.638$. The sum-with-entropy gives $F = (+1.638) - (0.693) = 0.945$, matching Test 1. The variant without the minus sign gives $-2.331$, which is wrong. **Conclusion.** A single missing minus sign accounts for the discrepancy. (Class A.)

### 9.10 Demonstration 10 — CVM bridge

*(This is a demonstration, not a numerical theorem.)* Computed independently, a generic 2-site Bethe / Kikuchi cluster-expansion free energy on an Ising-like grid and the active-inference $F[q]$ for a toy two-state model give numerically distinct values at analogous "configurations." They are different variational principles on different objects until a bridge is supplied. (Class A as a demonstration that structural similarity is not enough; Class D as a description of what would be needed.) **A formal proof (or refutation) of any $F_\mathrm{CVM} \leftrightarrow F[q]$ bridge requires the four-item checklist of Chapter 8.2 and is not attempted in this manuscript.**

### 9.11 What the tests collectively support

- The master identity (both forms) and the bound direction are reproducibly verified in discrete and continuous toy models.
- The role of the common-support assumption (A2) is essential.
- The interpretation slips we flag in Chapters 4–5 are individually demonstrable on simple examples.
- The CVM bridge is structurally suggestive but not numerically equal as currently formulated.

---

## Chapter 10 — What Appears Safe, What Appears Repairable, What Remains Open

This chapter is a deliberately compact ledger.

### 10.1 What appears safe

- **The master identity.** $F[q] = \mathbb{E}_q[-\ln p(y, \eta \mid m)] - H[q] = -\ln p(y \mid m) + D_{\mathrm{KL}}(q(\eta \mid r) \| p(\eta \mid y, m))$ under (A1)–(A3). (Class A; Class B.)
- **The bound direction.** $F[q] \ge -\ln p(y \mid m)$, with equality iff $q = p(\eta \mid y, m)$. The corresponding ELBO $\mathcal{L}(q) = -F[q] \le \ln p(y \mid m)$. (Class A; Class B.)
- **The role assignment.** $q(\eta \mid r)$ is the variational / recognition density; $p(\eta \mid y, m)$ is the exact posterior under the model. (Class A; Class B.)
- **The CI definition of Markov blanket.** $\mu \perp\!\!\!\perp x \mid b \iff p(\mu, x \mid b) = p(\mu \mid b)\, p(x \mid b)$. (Class B.)
- **The structural form of the thermodynamic analogy.** Energy minus entropy. (Class B; Class A as definition.)

### 10.2 What appears repairable

The interpretive issues identified in the manuscript we audited are individually small in scope, individually local in extent, and collectively important for a reader's understanding. Each can be fixed by a focused edit of one or two sentences:

1. q/p role labeling — one sentence near the central equation.
2. Bound-direction wording — one sentence in the discussion section.
3. Posterior / process conflation — one phrase substitution.
4. $L(s, a, r)$ expansion — choose one definition (single joint surprisal *or* iid sum with explicit indices) and use it consistently.
5. Integration substitution — keep $\int \cdot\, d\eta$, or supply the map and Jacobian.
6. Appendix sign — insert one minus sign and rename the symbol.
7. CVM framing — repository as proposal, with the four-item bridge checklist.
8. "Enthalpy" terminology — substitute "expected energy" or "expected negative log joint."
9. Helmholtz / Gibbs distinction — preserve as analogical, not collapsed.
10. Markov-blanket trichotomy — label which sense is being invoked at each use.

### 10.3 What remains open

- **Whether a CVM ↔ active-inference bridge exists.** (Class D.)
- **Whether the generative process admits a free-energy characterization in a sense that licenses "both systems minimize free energy" language.** (Class C/D; depends on NESS / steady-state arguments not re-derived here.)
- **The dynamical / Langevin-equation form of active-inference flows.** (Class C; explicitly deferred.)
- **The relationship to expected free energy and policy inference.** (Outside scope; Class C if discussed at all.)
- **Source extraction artifacts in the manuscript we audited.** Some equations were garbled in the available text extraction; we audited what could be reconstructed from surrounding prose and marked the rest as partially uncheckable. (Class U for those equations specifically.)

### 10.4 What we are *not* claiming

We are not claiming that the manuscript we audited (Maren TR-2019-01v6) is "wrong" in a global sense. Its core algebraic content — the master identity — is recoverable, and its pedagogical aim (a Beal–Friston–Blei notation crosswalk) is valuable. We are claiming that a focused revision of its interpretive layer would yield a strong technical note. We are also not claiming that the active-inference research program is in trouble. The research program does not depend on any particular exposition; the canonical statement in Parr/Pezzulo/Friston (2022) is, on the points we audited, correct.

---

## Chapter 11 — Humility, Provenance, and the Ethics of AI-Assisted Mathematical Review

This chapter is the manuscript's ethical core. It is short, and it is explicit.

### 11.1 What AI assistance can do here

- Draft text that follows a specified discipline (evidence classes, bound discipline, role discipline).
- Derive standard identities from definitions.
- Construct numerical stress tests.
- Cross-check against primary sources we have *given it access to*.
- Run an internal red-team / blue-team adversarial review.
- Maintain provenance discipline at the level of which source supports which sentence.

### 11.2 What AI assistance cannot do here

- Certify scientific truth.
- Replace expert review.
- Detect errors that depend on specialist intuitions an AI was not trained to develop.
- Verify that primary sources we did not give it access to say what we believe they say.
- Detect its own systematic biases, especially when those biases mirror common errors in the training corpus.

### 11.3 Why provenance matters

A claim of the form *"as derived in this manuscript"* is weaker than *"as stated in Parr/Pezzulo/Friston 2022, Eqn. 2.5,"* which is in turn weaker than *"as derived in the canonical Beal 2003 Sec. 2.2.1 and verified by stress test in Appendix C of this manuscript."* The reader needs to know which kind of claim each sentence is. Provenance is what gives a sentence its weight.

We have made a deliberate choice to surface provenance throughout the body, not bury it in footnotes. Some readers will find this unusual. We believe it is the right choice for an AI-assisted draft offered for expert review.

### 11.4 Why public correction matters

Errors in this manuscript that survive private review can become more dangerous if published — partly because publication imparts apparent authority, and partly because retracted material is harder to clean up than unretracted material. We invite *correction* as a feature of the publishing process, not as an indignity to be avoided. The right way to honor the readers, the prior reviewers, the authors of the audited materials, and the field is to make corrections trivial to find and pleasant to deliver.

### 11.5 Why humility is part of accuracy

A confident wrong sentence is a worse contribution than an uncertain right sentence. Confidence inflation is not free: it converts later correction into "embarrassment" rather than "improvement." We have erred in the other direction — toward marking uncertainty visibly, even at the cost of stylistic uniformity.

### 11.6 The non-credentialed organic operator

Michael Polzin makes no claim to authority over this mathematics. His role is to initiate, coordinate, insist on humility, persist in asking questions, and keep the discipline of public correction in view. None of those is a claim of expertise. All of them are necessary.

The AI operators contributed drafting, derivation, testing, and adversarial review under a discipline (the project CLAUDE.md) that prioritizes audit-grade rigor over impressive prose. The discipline can fail. Where it fails, the failure will appear in this manuscript; we ask readers to find it.

---

## Conclusion

This manuscript is a collaborative review of variational free energy as it is used in active inference, written by a non-credentialed organic operator and AI operators under an explicit discipline of audit-grade rigor, transparency, and humility.

Its central technical content is the standard variational identity
$$
F[q] \;=\; \mathbb{E}_q[-\ln p(y, \eta \mid m)] - H[q] \;=\; -\ln p(y \mid m) + D_{\mathrm{KL}}(q(\eta \mid r) \,\|\, p(\eta \mid y, m)),
$$
with the bound $F[q] \ge -\ln p(y \mid m)$, the ELBO sign-relation $F[q] = -\mathcal{L}(q)$, and the consequence $\mathcal{L}(q) \le \ln p(y \mid m)$. This content is not new. We claim nothing new about it. We claim, more modestly, that it is recoverable, reproducible, and auditable, and that several common interpretive layers around it are repairable rather than fundamental.

We have flagged six specific interpretive issues in the manuscript we audited (q/p reversal, bound direction, posterior/process conflation, $L$ expansion, integration substitution, appendix sign), all of which we believe to be repairable in focused edits. We have separated the three meanings of "Markov blanket." We have bounded the thermodynamic analogy. We have presented the CVM material as a *proposal* with a four-item bridge checklist for converting it into a derivation.

We do not claim authority. We do not claim final judgment. We do not claim that publication of this work would settle anything. We claim that disciplined collaboration between a non-expert organic operator and AI operators can produce a draft that is honest about its provenance, its tests, its limitations, and its evidence class for each claim — and that such a draft can be useful as a starting point for expert correction.

We invite that correction.

**Overall confidence.** 8 / 10 on the mathematical core. The 2-point reduction reflects: (i) source-extraction artifacts in the audited manuscript that prevented full equation-by-equation verification of certain appendix lines; (ii) the absence of direct inspection of Beal (2003) primary text; (iii) un-re-derived NESS / steady-state arguments; (iv) the proposal-level status of the CVM bridge; (v) the residual risk of AI-introduced errors in any AI-assisted draft.

**What we have fully verified.** The master identity, the bound direction, the ELBO/VFE sign relation, the discrete and continuous numerical anchors of Chapters 3–6 and 9, the conditional-independence definition of Markov blanket, the sign discrepancy of the audited manuscript's appendix B equation, and the absence (as currently formulated) of a derivational CVM ↔ active-inference bridge.

**What we have partially verified.** The $L$-expansion issue (verified by counter-example; intent of the audited equation remains ambiguous). The Helmholtz/Gibbs collapse warning (verified as a terminological hazard; not a mathematical error in the algebra). Several appendix-level equations garbled in source extraction.

**What we have not verified.** Direct Beal (2003) text. Friston (2013) NESS / steady-state arguments at the level of original derivation. Active-inference dynamical equations. CVM internal consistency (we treated CVM's Kikuchi structure as given).

**What would increase confidence.** Direct expert review by qualified researchers in active inference and variational inference; researchers whose work is referenced herein (Friston, Maren, Parr, Pezzulo, the Active Inference Institute, and the broader community) would be especially well-positioned to review, but this manuscript explicitly does not claim that any such reviewer has been contacted or has agreed to review. Direct inspection of Beal (2003) Sec. 2.2.1 and Eqns. 2.10–2.16 (per [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §1). Independent re-execution of the stress tests (per [manuscript-v2-reproducibility/](manuscript-v2-reproducibility/)). A proposed CVM ↔ active-inference bridge proposition with proof sketch (per [Audit_Remediation_Plan.md](Audit_Remediation_Plan.md) §1.4 and Chapter 8.2 of this manuscript).

**Suggested next steps before publication.** (1) Solicit at least two independent expert reviews. (2) Have the stress tests re-executed by an independent party. (3) Recheck the audited manuscript against a clean LaTeX source rather than a PDF text extraction. (4) Either supply a CVM bridge proposition or revise the CVM section accordingly. (5) Add a frontmatter section pointing to the public location of the stress-test code so readers can re-run it.

We thank the community in advance for its scrutiny.

---

## Appendix A — Corrected Core Derivation

This appendix is the formal version of Chapter 2.

### A.1 Theorem

**Theorem (Variational free energy identity).** *Let $p(y, \eta \mid m)$ be a generative joint density over observed variables $y$ and hidden variables $\eta$, indexed by parameters $m$, with $p(y \mid m) > 0$. Let $q(\eta \mid r)$ be a variational density absolutely continuous with respect to the model posterior $p(\eta \mid y, m) := p(y, \eta \mid m) / p(y \mid m)$, and assume $\ln p$ and $\ln q$ are $q$-integrable. Define*
$$
F[q] \;:=\; \mathbb{E}_q\!\left[-\ln p(y, \eta \mid m)\right] - H[q],
$$
*where $H[q] := -\int q \ln q\, d\eta$. Then*
$$
F[q] \;=\; D_{\mathrm{KL}}\!\bigl(q(\eta \mid r) \,\big\|\, p(\eta \mid y, m)\bigr) - \ln p(y \mid m).
$$
*Consequently $F[q] \ge -\ln p(y \mid m)$, with equality iff $q(\eta \mid r) = p(\eta \mid y, m)$ a.e.*

### A.2 Proof

From the integral form,
$$
F[q] = \int q \ln \frac{q}{p(y, \eta \mid m)}\, d\eta = \int q \ln q\, d\eta - \int q \ln p(y, \eta \mid m)\, d\eta = -H[q] + \mathbb{E}_q[-\ln p(y, \eta \mid m)],
$$
which is the definition.

By Bayes' rule under positivity of evidence,
$$
\ln p(y, \eta \mid m) = \ln p(\eta \mid y, m) + \ln p(y \mid m),
$$
so
$$
F[q] = \int q \ln \frac{q}{p(\eta \mid y, m)\, p(y \mid m)}\, d\eta = \int q \ln \frac{q}{p(\eta \mid y, m)}\, d\eta - \ln p(y \mid m) \int q\, d\eta.
$$
Since $q$ is normalized, the second term equals $-\ln p(y \mid m)$.

By Gibbs' inequality, $D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m)) \ge 0$, with equality iff $q = p(\eta \mid y, m)$ a.e. Therefore $F[q] \ge -\ln p(y \mid m)$, with equality iff the variational density coincides with the model posterior. $\square$

### A.3 Corollary (Beal–Friston sign convention)

*With $\mathcal{L}(q) := \mathbb{E}_q[\ln p(y, \eta \mid m)] + H[q]$, we have $F[q] = -\mathcal{L}(q)$ and $\mathcal{L}(q) \le \ln p(y \mid m)$.*

*Proof.* Negate the definition of $F$ and combine with the theorem.

### A.4 Equality conditions

Equality in the bound holds iff $q(\eta \mid r) = p(\eta \mid y, m)$ almost everywhere. In the active-inference reading, this corresponds to *exact* perceptual inference: the recognition density coincides with the exact posterior under the generative model. In practice $q$ is constrained to a tractable family $\mathcal{Q}$ that may not contain the exact posterior; the bound margin $D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m))$ is then the KL projection of the exact posterior onto $\mathcal{Q}$.

### A.5 Assumptions audit

(A1) $p(y \mid m) > 0$ is needed for Bayes' rule to define $p(\eta \mid y, m)$.
(A2) $q \ll p(\cdot \mid y, m)$ is needed for KL to be finite. (Test 3 illustrates the consequence of violating this.)
(A3) Expectation-finiteness across all five log-density terms used by the three forms of the master identity: $\mathbb{E}_q[\ln p(y, \eta\mid m)]$ (joint, used by Form 1), $\mathbb{E}_q[\ln p(\eta\mid y, m)]$ (posterior, used by Form 2), $\mathbb{E}_q[\ln p(\eta\mid m)]$ (prior, used by Form 3), $\mathbb{E}_q[\ln p(y\mid \eta, m)]$ (conditional likelihood, used by Form 3), and $\mathbb{E}_q[\ln q(\eta\mid r)]$ (entropy, used by all three). All five must be finite (equivalently, the absolute-value expectations are bounded). This restricts the variational family $\mathcal{Q}$ to densities under which the relevant log-likelihoods are integrable in absolute value.

These assumptions are mild and standard. We do not require iid factorization of $y$ or $\eta$; we do not require finite support; we do not require Gaussianity.

---

## Appendix B — Notation Table (Beal / Friston / Blei Crosswalk, by Role)

The classical mistake in cross-convention notation tables is to align by *symbol*. We align by *role*.

| Role | Friston / active inference (this draft) | Beal (2003) | Blei et al. (2017) |
|------|------------------------------------------|-------------|---------------------|
| Observed data (in conditioning) | $y = (s, a, r)$ | $y = \{y_1, \dots, y_n\}$ | $x = x_{1:n}$ |
| Hidden / external states | $\eta$ | $x = \{x_1, \dots, x_n\}$ | $z = z_{1:m}$ |
| Generative joint density | $p(y, \eta \mid m)$ | $p(x, y \mid \theta)$ | $p(x, z)$ |
| Marginal evidence | $p(y \mid m)$ | $p(y \mid \theta)$ | $p(x)$ |
| Exact posterior under model | $p(\eta \mid y, m)$ | $p(x \mid y, \theta)$ | $p(z \mid x)$ |
| Variational / recognition density | $q(\eta \mid r)$ | $q_x(x)$ | $q(z)$ |
| Internal states / sufficient statistics | $r$ (or $\mu$) | — | — |
| Sensory / active blanket states | $s, a$ | — | — |
| Surprisal | $L(y) := -\ln p(y \mid m)$ | $-\mathcal{L}(\theta)$ when sign-converted | $-\ln p(x)$ |
| Variational free energy | $F[q] := \mathbb{E}_q[-\ln p] - H[q]$ | $-F(q_x, \theta)$ in Beal's sign convention | (uses ELBO instead) |
| ELBO | $\mathcal{L}(q) = -F[q]$ | $F(q_x, \theta)$ | $\mathrm{ELBO}(q)$ |
| Bound | $F[q] \ge -\ln p(y \mid m)$ | $F(q_x, \theta) \le \ln p(y \mid \theta)$ (sign-flipped) | $\mathrm{ELBO}(q) \le \ln p(x)$ |
| KL divergence | $D_{\mathrm{KL}}(q \,\|\, p(\eta \mid y, m))$ | $\mathrm{KL}(q_x \,\|\, p(x \mid y, \theta))$ | $\mathrm{KL}(q \,\|\, p(z \mid x))$ |
| Entropy of variational density | $H[q] = -\int q \ln q$ | analogous | analogous |

**Notes.**
- Beal's $F$ in his 2003 thesis (a maximized lower bound on log evidence) is the *negative* of Friston's $F$ (a minimized upper bound on negative log evidence). The sign flip is a convention difference, not a mathematical disagreement.
- "Internal states $r$" in Friston/active-inference notation play the role of *sufficient statistics* of the variational density. In some treatments they are written $\mu$. They are not "observable" in the same sense as sensory states $s$.
- Blei's notation uses $x$ for *observations* and $z$ for *latents*, opposite to Beal's letter convention. This is a frequent source of confusion.

---

## Appendix C — Stress-Test Details

Each test below is a self-contained computational example. The setups are minimal so that an interested reader can re-execute them by hand or in a few lines of code in any numerical environment (Python with `math` and `numpy` is sufficient). All natural logarithms; results in nats.

### C.0 Reproducibility environment

All numerical results in this Appendix have been re-executed in Phase P0 of the [Audit Remediation Plan](Audit_Remediation_Plan.md) under a pinned environment to guarantee bit-identical output across platforms. The companion repository [`manuscript-v2-reproducibility/`](manuscript-v2-reproducibility/) provides:

- `audit_tests_v2.py` — main test script using only the Python standard library (no external dependencies; no RNG; closed-form analytics where possible).
- `tests/test_*.py` — per-test pytest harness (87 individual assertions across 11 tests).
- `requirements.txt` — pinned dependencies (numpy ≥ 1.26 and pytest ≥ 7.0 only for the pytest harness).
- `Dockerfile` — fully reproducible execution environment based on `python:3.12.10-slim`.
- `.github/workflows/ci.yml` — continuous-integration on a 3-OS × 3-Python matrix (9 cells).
- `reference_output.txt` — bit-identical expected output of `audit_tests_v2.py`.

Acceptance test: `python audit_tests_v2.py > out.txt && diff out.txt reference_output.txt` produces zero output on Python 3.11, 3.12, 3.13 across Linux, Windows, macOS. CI verifies this on every push.

Two reproducibility hygiene issues were corrected from the prior tests:

- **Test 6**: the prior session used `np.random.binomial(1, 0.7, 5)` with seed 42 and reported iid surprisal `3.456`; the value `3.456` was an arithmetic error not caught at the time. v2 uses an explicit data vector $(0,1,1,1,0)$ with no RNG; the correct value is `3.4780`.
- **Test 8**: the prior session reported max residual `<6 \times 10^{-17}`; standard IEEE 754 double-precision yields `1.11 \times 10^{-16} = 2^{-53}` (one machine epsilon). v2 uses the bound `< 5 \times 10^{-16}` (4-eps safety margin).

### C.1 Test 1 — Discrete identity and bound

**Setup.** $\eta \in \{0, 1\}$, $p(\eta = 1) = 0.7$, $p(\eta = 0) = 0.3$. Likelihood: $p(y = 1 \mid \eta = 1) = 0.9$, $p(y = 1 \mid \eta = 0) = 0.2$. Observation: $y = 1$.

**Computed quantities.**
- Marginal: $p(y = 1) = 0.9 \cdot 0.7 + 0.2 \cdot 0.3 = 0.69$.
- Surprisal: $-\ln(0.69) = 0.3711$ nats.
- Exact posterior: $p(\eta = 1 \mid y = 1) = (0.9 \cdot 0.7) / 0.69 = 0.9130$.

**Sweep.**

| $q(\eta = 1)$ | $F[q]$ (Form 1) | $F[q]$ (Form 2) | KL | ELBO | Bound margin |
|---------------|------------------|------------------|-----|------|--------------|
| 0.50 (uniform) | 0.9446 | 0.9446 | 0.5735 | -0.9446 | 0.5735 |
| 0.913 (exact) | 0.3711 | 0.3711 | 0.0000 | -0.3711 | 0.0000 |
| 0.95 (close) | 0.3811 | 0.3811 | 0.0100 | -0.3811 | 0.0100 |

**Conclusion.** Both forms of the master identity coincide. $F[q] \ge -\ln p(y)$ holds at every $q$. Equality at $q = $ exact posterior. (Class A.)

### C.2 Test 2 — Bad approximate posterior

Same model. Sweep $q(\eta = 1) \in \{0.05, 0.20, 0.50, 0.70, 0.913, 0.99\}$.

| $q(\eta=1)$ | $F[q]$ | KL | $F + \ln p(y)$ |
|--------------|--------|-----|----------------|
| 0.05 | 2.497 | 2.126 | 2.126 |
| 0.20 | 1.843 | 1.472 | 1.472 |
| 0.50 | 0.945 | 0.574 | 0.574 |
| 0.70 | 0.557 | 0.186 | 0.186 |
| 0.913 | 0.371 | 0.000 | 0.000 |
| 0.99 | 0.430 | 0.058 | 0.058 |

KL is monotone in distance from the exact posterior; $F[q]$ tracks KL exactly; the bound margin equals KL. (Class A.)

### C.3 Test 3 — Support mismatch

Set $p(y = 1 \mid \eta = 0) = 0$, $p(y = 1 \mid \eta = 1) = 1$. Then $p(\eta = 1 \mid y = 1) = 1$, exact posterior is degenerate at $\eta = 1$. Any $q$ with $q(\eta = 0) > 0$ produces $\ln(q / p) \to \infty$ for the $\eta = 0$ term, i.e., $D_{\mathrm{KL}} = +\infty$. Numerically: a divide-by-zero exception. (Class A; demonstrates necessity of A2.)

### C.4 Test 4 — Gaussian conjugate

**Setup.** Prior $\eta \sim \mathcal{N}(0, 4)$, likelihood $y \mid \eta \sim \mathcal{N}(\eta, 1)$, observed $y = 1.5$.

**Exact posterior.** Precision $\tau = 1/4 + 1 = 1.25$, variance $1/\tau = 0.8$, mean $(1.5)/\tau = 1.2$. So $\eta \mid y = 1.5 \sim \mathcal{N}(1.2, 0.8)$. Marginal: $\eta + \epsilon \sim \mathcal{N}(0, 5)$, so $\ln p(y = 1.5) = -\tfrac{1}{2}\ln(10\pi) - \tfrac{1.5^2}{2 \cdot 5} = -1.949$ nats; surprisal $= 1.949$.

**Monte-Carlo $F[q]$ ($N = 2 \times 10^5$ samples).**

| $q$ | $F[q]$ | $F - $ surprisal |
|-----|--------|---------------------|
| $\mathcal{N}(1.2, 0.894)$ exact | 1.949 | 0.000 |
| $\mathcal{N}(0, 1)$ biased | 2.857 | 0.908 |
| $\mathcal{N}(1.5, 0.3)$ overconfident | 2.656 | 0.707 |

The bound holds; equality at the exact posterior. (Class A.)

### C.5 Test 5 — Sign-convention falsification

Same model as Test 1, uniform $q$. $F_{\mathrm{Friston}} = 0.945$; $\mathrm{ELBO}_{\mathrm{Beal}} = -0.945$; sum is zero. The wording "$F$ is a lower bound on $-\ln p(y)$" would require $0.945 \le 0.371$, which is false. The standard wording $F \ge -\ln p(y)$ holds. (Class A; direct numerical falsification.)

### C.6 Test 6 — $L(s, a, r)$ expansion

Five iid Bernoulli observations with $p = 0.7$, taken as the **explicit data vector** $y = (0, 1, 1, 1, 0)$. (No RNG is used; the data is supplied directly to remove RNG-version dependencies.) Valid iid surprisal:
$$
-\sum_i \ln p(y_i) = -[2\ln 0.3 + 3\ln 0.7] = -[2 \cdot (-1.20397) + 3 \cdot (-0.35667)] = 3.4780 \text{ nats}.
$$
Literal "$-I \cdot \ln p(y)$" expansion treating all observations as the same value: $-5 \ln 0.69 = 1.8553$ nats. The two coincide only when all $y_i$ are equal. (Class A.)

**Reproducibility note.** Earlier audit chains reported iid surprisal `3.456` for this sample. That value was an arithmetic error not caught in the prior session. The correct value is `3.4780` (verified by direct decomposition above and by `audit_tests_v2.py` Test 6). v2 uses the explicit data vector to eliminate any RNG-version dependency.

### C.7 Test 7 — Measure transformation

$\eta \sim \mathcal{N}(0, 1)$, $r = 2\eta + 3$. Sample $N = 2 \times 10^5$. $\mathbb{E}_\eta[\eta^2] \approx 0.996$. $\mathbb{E}_r[r^2] \approx 13.024$. Difference is non-trivial. Correct change of variable: $\eta = (r - 3)/2$, $d\eta = dr / 2$; without applying the Jacobian, renaming the integration variable changes the value of the integral. (Class A.)

### C.8 Test 8 — Markov-blanket conditional independence

Construct a simple chain. Variables: $\eta \in \{0,1\}$, $s \in \{0,1\}$, $r \in \{0,1\}$, $a \in \{0,1\}$. Joint via the chain $\eta \to s \to r \to a$, with $a$ determined deterministically by $r$. Specifically: $p(\eta = 1) = 0.6$; $p(s = 1 \mid \eta) = (0.3, 0.8)$; $p(r = 1 \mid s) = (0.2, 0.7)$; $a = r$.

Compute $p(\eta, r \mid s, a)$, $p(\eta \mid s, a)$, $p(r \mid s, a)$ for all blanket settings $b = (s, a)$. Residual:
$$
\max_{e, m} \bigl| p(\eta = e, r = m \mid b) - p(\eta = e \mid b)\, p(r = m \mid b) \bigr| < 5 \times 10^{-16}.
$$
The actual max residual under standard numpy double-precision is $1.11 \times 10^{-16} = 2^{-53}$, one machine epsilon; the bound `< 5e-16` is a 4-epsilon safety margin. CI factorization holds to floating-point machine precision. (Class A.)

### C.9 Test 9 — Appendix B sign

Same model as Test 1, uniform $q$. Standard expected energy: $\mathbb{E}_q[-\ln p(y, \eta)] = -[0.5 \ln(0.3 \cdot 0.2) + 0.5 \ln(0.7 \cdot 0.9)] = +1.638$. Form *without* minus: $\sum q \ln p(y, \eta) = -1.638$. Master identity $F = U - H$ requires $U = +1.638$, giving $F = 1.638 - 0.693 = 0.945$ ✓ (matches Test 1). Variant without minus: $-1.638 - 0.693 = -2.331$ — wrong sign and magnitude. (Class A; one-character repair.)

### C.10 Demonstration 10 — CVM bridge (illustrative)

A sketch only; full Maren-CVM Ising-grid simulation is outside scope. The structural observation: $F_{\mathrm{CVM}}$ for a 2-D Ising-like grid with configuration variables $(x_1, x_2, y_i, w_i, z_i)$ and enthalpy parameters $(\epsilon_0, \epsilon_1)$ minimizes a Kikuchi cluster-entropy free energy. The active-inference $F[q] = \mathbb{E}_q[-\ln p(y, \eta \mid m)] - H[q]$ minimizes a divergence between an approximate posterior and a generative-model joint. These are two variational principles applied to two different objects.

The companion repository's [`audit_tests_v2.py`](manuscript-v2-reproducibility/audit_tests_v2.py) Test 10 implements a generic 2-site Bethe / Kikuchi cluster-expansion at $h=1.2$ on equiprobable marginals. It computes $F_{\mathrm{Bethe}} = -\ln 2 \approx -0.6931$ alongside the active-inference $F[q] = 0.9446$ for the toy two-state model with uniform $q$. The two values are numerically distinct ($|F_{\mathrm{Bethe}} - F[q]| > 1.6$ nats), confirming that the energy-minus-entropy structural similarity does not by itself derive a bridge.

Identifying $F_\mathrm{CVM}$ with $F[q]$ requires (i) a generative model $p(y, \eta \mid m)$ that *is* the CVM Markov random field; (ii) a variational family $q_\phi$ parameterized by configuration variables; (iii) a proof that $F_{\mathrm{CVM}}(\phi) = F[q_\phi]$ exactly or with controlled approximation. Until such a proof is supplied, structural similarity is suggestive but not derivational. (Class A as a demonstration that structural similarity is not enough; Class D as a description of what would be needed.)

### C.11 Reproducibility note

Each of the above tests can be re-run in 10–30 lines of Python with `math` and `numpy`. We have not bundled executable code with this draft to keep the manuscript self-contained; the test specifications above are sufficient for any reader to reconstruct the computations. A future revision should provide a public reproducibility repository (e.g., a single Jupyter notebook) so that readers do not have to re-derive each setup.

---

## Appendix D — Error Register (Audited Manuscript: Maren TR-2019-01v6)

This appendix compiles the specific findings on the manuscript we audited. It is included here, in this collaborative review, because the findings are the *evidence base* for several claims in the body of this draft (especially Chapters 4, 5, 7, and 8). It is *not* included as a critique of any individual.

**Note on severity ratings.** This register uses the five-level scale of [CLAUDE.md](.claude/CLAUDE.md) (None / Minor / Moderate / Serious / Fatal). 'Serious' is reserved for issues that block publication of the manuscript as a *derivation paper* if uncorrected — i.e., issues that produce mathematical incorrectness in a load-bearing claim. 'Moderate' is reserved for issues that mislead but do not falsify, or issues whose correction is wording rather than mathematics. Reasonable adjudicators may move individual items between Serious and Moderate; we have rated conservatively (favor 'Serious' when in doubt) because the manuscript will be reviewed by experts who set a high bar.

Severity scale: **None** / **Minor** / **Moderate** / **Serious** / **Fatal**. Confidence: 1–5.

| ID | Location | Category | Severity | Description | Why it matters | Proposed repair | Conf |
|----|----------|----------|----------|-------------|----------------|------------------|------|
| E1 | Parenthetical note under Eqn. 2 | role reversal | Serious | $q(\eta \mid r)$ called "true posterior" and $p(\eta \mid s, a, r)$ called "variational density" | Inverts the standard VI assignment at the central equation | One-sentence replacement defining $q$ as variational and $p(\eta \mid y, m)$ as exact posterior under the model | 5/5 |
| E2a | Sec 6.2 (PDF page 38) | bound direction | Serious | "the free energy for the model is a lower bound for the free energy of the external system" reverses the canonical bound direction. **Aggravating context (Phase P5 PDF-verified):** Maren's *own* preceding paragraph (PDF page 37, end of Section 6.1) explicitly states "we reverse the signs on all of the terms on the right-hand-side of Eqn. 34, as well as the direction of the inequality" when shifting from Beal to Friston notation; the very next paragraph (Section 6.2 second paragraph) immediately applies the *un-reversed* (Beal) direction. The error is therefore not a missed convention but a contradiction with the immediately preceding sentence — confirmed verbatim by direct PDF inspection. | Replace with $F[q] \ge -\ln p(y\mid m)$ form, consistent with Maren's own page-37 statement | **5/5** (PDF-verified) |
| E2b | Sec 6.2 (PDF page 38) | misnomer | Moderate | $L(\tilde s, \tilde a, \tilde r) = -\ln p(\tilde s, \tilde a, \tilde r)$ called "the free energy of the external system" — but $L$ is surprisal (Maren's own Eqn 17 at PDF page 22), and the external system has not been shown to have a free-energy characterization in the manuscript | Replace "free energy of the external system" with "surprisal (negative log evidence under the generative model)" | **5/5** (PDF-verified) |
| E3 | Integration discussion (§3.2 and §5.4 of the audited manuscript) | measure-space | Serious | Integration over $\eta$ "interpreted as integrating over $r$" without map, Jacobian, or induced measure | Invalid as a measure-space operation | Either keep $\int \cdot\, d\eta$, or supply explicit map $T : r \mapsto \eta$ and Jacobian | 5/5 |
| E4 | $L(s, a, r)$ expansion | likelihood definition | Serious | $L(s, a, r) = -\sum_{i=1}^I \ln p(s, a, r)$ with $I$ identical terms | Algebraically incoherent unless iid factorization is stated | Either drop the sum (single joint surprisal) or write $-\sum_i \ln p(s_i, a_i, r_i)$ with distinct indices | 4/5 |
| E5 | Independence statement | independence claim | Moderate | "$q$ and $p$ are independent (to a first order)" | Misuses "independent"; not needed and not the right relationship | Replace with explicit (A1)–(A3) conditions | 4/5 |
| E6 | Posterior interpretation | posterior / process conflation | Serious | $p(\eta \mid s, a, r)$ called "the actual distribution of the external system itself" | Conflates model posterior with generative process; contradicts SOURCE B Fig 2.2 caption | Replace with "exact posterior over external states under the generative model"; add explicit model/process distinction | 5/5 |
| E7 | Sec 4.1, 4.3, 5.2 of SOURCE A (lines 134, 141, 195–197) | functional vs. point oscillation | Moderate | Throughout these sections, the variational density $q$ is treated alternately as a *functional* (the standard reading: $q \in \mathcal{Q}$, and operations on $q$ are operations on the full distribution) and as a *distribution-evaluated-at-equilibrium* (a non-standard reading: $q$ becomes a point quantity once at free-energy minimum). Three specific symptoms verified by direct read: (i) SOURCE A:134 — *"q corresponds to the equilibrium free energy of the external system"* conflates $q$ (a distribution), $F[q]$ (a number), and "free energy of the external system" (an undefined quantity in the manuscript); (ii) SOURCE A:141 — *"there will not be a sum over all possible values of some distribution over $i$; there will instead be a single probability distribution"* — removing the sum over states is mathematically muddled; (iii) SOURCE A:195–197 — *"we may take $L(\tilde s, \tilde a, \tilde r)$ to be the actual distribution of the representational system"* is a category error: $L$ is a scalar (surprisal), not a distribution. | Treat $q$ and $p$ as functionals throughout; reserve "value of $F[q]$" or "value at equilibrium" for the scalar quantity; do not apply the word "distribution" to $L$ | 4/5 |
| E8 | Appendix B Eqn. B-1 | sign convention | Serious | "Enthalpy" $H = \sum_i \int q \ln p$ missing minus sign | Standard expected energy is $\mathbb{E}_q[-\ln p]$, not $\mathbb{E}_q[+\ln p]$ | Insert minus sign; rename symbol to $U[q]$ | 4/5 |
| E9 | Notation Table 4 | notation taxonomy | Moderate | Rows mix observable / internal / blanket categories; double-counts $s$ | Misleads readers on the central crosswalk the paper aims to provide | Rebuild table by *role*, not symbol (see Appendix B of this manuscript) | 5/5 |
| E10 | CVM section | extension overclaim | Serious | CVM treated as "within the variational Bayes framework" without formal bridge | Weakens the manuscript's most original contribution by inviting unanswerable questions | Recast as proposal; add four-item bridge checklist (this manuscript Chapter 8) | 4/5 |
| E11 | "Expected enthalpy" | terminology | Moderate | $\mathbb{E}_q[-\ln p]$ called "expected enthalpy" | Enthalpy carries thermodynamic baggage ($H = U + pV$) absent here | Rename "expected energy" or "expected negative log joint" | 4/5 |
| E12 | Helmholtz / Gibbs | thermodynamic conflation | Moderate | "The distinction between Helmholtz and Gibbs free energies disappears under the metaphor" | Rhetorically convenient; mathematically risky | Replace with explicit statement that the two are not engaged here, and the analogy extends only to energy-minus-entropy | 4/5 |
| E13 | Active-inference overreach | overreach | Moderate | Claim that external and internal systems "each separately come to free energy minima" | Goes beyond what the variational identity establishes | Mark as NESS modeling assumption | 4/5 |
| E14 | Markov blanket usage | blanket trichotomy | Moderate | Causal-influence prose blends with conditional-independence claim | Three distinct meanings (CI / causal / inference) collapsed into one | Adopt the (a) / (b) / (c) trichotomy; label which sense at each use | 4/5 |
| E15 | Source typesetting | extraction artifact | Minor | PDF→text extraction garbled several equations | Cannot fully audit garbled forms; assessments rely on surrounding prose | Supply clean LaTeX source in revised version | 3/5 |

**Summary (Phase P5 update).** Seven findings at *Serious* severity (E1, E2a, E3, E4, E6, E8, E10), seven at *Moderate* (E2b, E5, E7, E9, E11, E12, E13, E14), one at *Minor — resolved* (E15: extraction was substantively faithful; only Greek letters and operator symbols were rendered as artifacts). All E1–E14 findings have been verified verbatim by direct inspection of the original PDF in Phase P5 (see [Phase_P5_OODA.md §3](Phase_P5_OODA.md)). All are repairable; none falsify the manuscript's core algebraic content (the master identity).

**Phase P5 also surfaced new findings worth noting** (full detail in [Phase_P5_OODA.md §5](Phase_P5_OODA.md)):

- Maren uses **ψ̃** (psi-tilde) for external states throughout the original PDF, not η̃ (eta-tilde). The text extraction lost Greek letters (they became `?` marks); this audit and v2 silently translated to η̃ for consistency with the Parr/Pezzulo/Friston (2022) convention. ψ̃ and η̃ name the same mathematical object; this is a notation-translation choice rather than a math error, but quoted excerpts in v2 should preserve Maren's actual symbol when quoting her directly.
- The i-indexed-sum-with-no-i-dependence pattern flagged by E4 (Eqn 13) is a structural notation choice that recurs in **Eqns 5, 9, 10, 11, and 13** — five equations rather than one.
- Maren introduces a *second* L symbol at Eqn 33 (PDF page 33): $L(\tilde x) = L(\tilde\psi, \tilde s, \tilde a, \tilde r) = -\ln p(\tilde\psi, \tilde s, \tilde a, \tilde r)$ — a different L from Eqn 12's $L(\tilde s, \tilde a, \tilde r)$. Notation overloading.
- Table 4 Friston-column observable variable is `λ, r̃` (PDF page 17), not `s̃, r̃` as the text extraction (with λ lost) suggested. λ in Friston's later notation is a sufficient-statistic / parameter symbol.

**Important context (Acknowledgments):** the audited TR carries the acknowledgment (PDF page 48): *"I am enormously indebted to Karl Friston for careful, detailed, and thoughtful reviews, together with very useful suggestions for rewording a few explanations."* Maren TR-2019-01v6 was Friston-reviewed before publication. This does not endorse any specific claim, but it does mean the manuscript is *not* an unreviewed first draft — v2's audit is therefore a *second* pass on a Friston-reviewed manuscript. This frames the conciliatory ("test-case, not target") posture even more naturally.

**E8 acceptance gate (Layer 2) — SETTLED in Phase P5.** Direct inspection of the original PDF (2026-04-26; see [Phase_P5_OODA.md](Phase_P5_OODA.md) §4) shows:

- **Eqn B-1 (PDF page 54)** lacks the minus sign — verbatim: $H = \sum_{i=1} \int dx_i\, q_{x_i}(x_i)\, \ln p(x_i, y_i\mid\theta)$
- **Eqn B-8 (PDF page 58)** has the minus sign — verbatim: $H = -\sum_{i=1} \int dx_i\, q_{x_i}(x_i)\, \ln p(x_i, y_i\mid\theta)$
- **PDF page 56 (Maren's own self-flag)** — verbatim: *"We do not have agreement between the formulation given in Eqn. B-1 and that given in Eqn. A-13 together with Eqn. A-14."*

**Verdict.** Per the acceptance-gate spec, the original lacks the minus sign in B-1, so confidence upgrades to **5/5** and Serious is retained. **Refined nuance**: B-1 is the Beal-convention form; B-8 is the Friston-convention form. The repair is to relabel B-1 explicitly as Beal-convention (or remove it, since B-8 is what is used downstream) — *not* simply "insert a minus sign." Maren's prose surrounding B-1 (page 53–54: "the same as used by Friston") is the wording-layer error; B-1 itself is correct *for Beal*. Maren herself notes the ambiguity on page 56 and provides B-8 as the corrected Friston-convention form. The full reviewer report is in [Phase_P5_OODA.md §6](Phase_P5_OODA.md). The other extraction-garbled equations (Eqn 5, 9, 10, 12, 14) were also confirmed to be faithfully extracted in their math content; only Greek letters and operator symbols were rendered as artifacts (E15 resolved → Minor).

---

## Appendix E — Provenance and AI Assistance

This appendix discloses, as fully as practicable, the provenance of every chapter and appendix in this draft.

### E.1 Source materials

**Primary materials directly inspected:**
- **SOURCE A.** Maren, A. J. (2024). *Derivation of the Variational Bayes Equations.* Themesis Technical Report TR-2019-01v6. Also available as **arXiv:1906.08804v6 [cs.NE], 18 Aug 2024**. Read as text-extracted PDF (file `Maren_TR-2019-01v6.txt`, 130,005 bytes, 643 lines, SHA-256 `b68b852985a5b16742a81e6de2bf161e239e6bd761dca5bae22de6160379dae1`). The file was originally named `1906.08804v6.pdf.txt`; **a clean copy under the present name was made in Phase P1 of the [Audit Remediation Plan](Audit_Remediation_Plan.md). The original Phase-P1 rationale ("the prior name implied an arXiv submission that does not correspond to Maren TR-2019-01v6 in the public arXiv index") was reversed in Phase P5 — direct inspection of the original PDF confirms the arXiv watermark `arXiv:1906.08804v6 [cs.NE] 18 Aug 2024` on page 1; the original filename was therefore correct.** The clean-name file remains as a harmless alias. See [FILE_RENAMING_LOG.md](FILE_RENAMING_LOG.md) for the corrected provenance and [Phase_P5_OODA.md](Phase_P5_OODA.md) §2 for the reversal. Phase P5 also confirmed the text extraction was substantively faithful to the PDF — only Greek letters and operator symbols (∑, ∫, ψ, η, λ, ε) were rendered as artifacts in the .txt; the math content was intact (E15 resolved → Minor).
- **SOURCE B.** Parr, T., Pezzulo, G., & Friston, K. J. (2022). *Active Inference: The Free Energy Principle in Mind, Brain, and Behavior.* MIT Press. Read as text-extracted book (`book_9780262369978 (1).txt`, ~683 KB). Specific passages anchored: Eqn. 2.5 around line 1299; bound-direction statements at lines 1397, 1452, 1605, 2284, 2433; generative-model-vs-process Fig. 2.2 caption at lines 1094–1106; Markov-blanket Box 3.1 at lines 1932–1948.
- **SOURCE C.** A prior peer review produced by a GPT-class large language model. The originating file is named `Ai Onna GPT5.4 Pro.docx` (extracted to `source_c_extracted.txt`); the specific model variant is taken on the organic operator's report and was not independently verified by this manuscript's audit chain. Used as a hypothesis-generator and independent verification anchor; not treated as authority.
- **Project audit notes.** A working file `Revision Research and Test Notes.txt` produced in a prior audit session and used here as a record of the verified findings, stress-test outputs, and adjudication anchors.
- **CLAUDE.md.** Project-level binding instructions for audit posture, transparency, confidence, and anti-overclaiming. Treated as governing throughout.

**Materials *not* directly inspected:**
- Beal, M. J. (2003). *Variational Algorithms for Approximate Bayesian Inference.* PhD thesis. Cited indirectly; standard VI identities Beal is cited for were verified from definitions.
- Friston, K. J. (2013, 2015). Original active-inference / NESS papers. Cited via SOURCE B and SOURCE A; the dynamical NESS argument was not re-derived.
- Friston et al. (2024, "renormalization-group active inference"); Hafner et al. (2020/2022, "Action Perception Divergence"); Sengupta, Stemmler, & Friston (2013). Cited via SOURCE A's quotations; not directly inspected.
- Kikuchi & Brush (1967); other primary CVM references. The CVM Kikuchi structure was treated as given; its internal validity was not audited.
- Blei, Kucukelbir, & McAuliffe (2017). Cited indirectly; standard VI conventions were verified from definitions and from Parr/Pezzulo/Friston 2022.

### E.2 AI assistance and roles

This draft was produced by a chain of AI sessions under the discipline specified in CLAUDE.md. The chain is:

1. **Audit Session** (origin session ID `6cb1df80-3db9-4ff5-9325-264571d2b6c7`, prior to v1 draft date). The source corpus was read in full; ten numerical stress tests were specified and executed in Python; the audit deliverable [`Revision Research and Test Notes.txt`](Revision%20Research%20and%20Test%20Notes.txt) was produced. This session is the substantive origin of the audit findings reproduced in Chapters 9–10 and Appendix D of this manuscript.

2. **Drafting Session** (this manuscript's v1 drafting). The audit findings were reorganized into the chapter structure of v1; the front matter and ethical posture were drafted. No new mathematical findings were introduced in this session.

3. **Audit-of-Audit Session** (post-v1, captured in [`Manuscript_Draft_v1_Audit.md`](Manuscript_Draft_v1_Audit.md)). v1 was audited for source-provenance fidelity, equation-by-equation correctness, and numerical reproducibility. Two reproducibility issues were identified in v1's Tests 6 and 8 and have been corrected in this v2 draft.

4. **P0–P4 Remediation Sessions** (captured in [`Audit_Remediation_Plan.md`](Audit_Remediation_Plan.md), [`manuscript-v2-reproducibility/`](manuscript-v2-reproducibility/), [`Phase_P1_OODA.md`](Phase_P1_OODA.md), [`Phase_P2_OODA.md`](Phase_P2_OODA.md), [`Phase_P3_OODA.md`](Phase_P3_OODA.md), [`Provenance_Map.csv`](Provenance_Map.csv), [`v2_patches.md`](v2_patches.md), [`Pre_Publication_Checklist.md`](Pre_Publication_Checklist.md), and the present manuscript). The remediation plan was specified, the reproducibility repository was built and verified end-to-end (87 of 87 pytest tests pass; bit-identical output to the reference under pinned environment), provenance was upgraded to per-sentence traces, Layer 2 (human-required) inspection specs were documented, and v2 was produced by applying 27 documented patches to v1.

All four sessions used Anthropic Claude (Opus 4.7). AI-generated content remains provisional until reviewed by qualified human experts. The Audit-of-Audit session was specifically tasked with not trusting prior outputs and re-verifying them by independent re-execution; that is why two errors in the prior audit-session output (a Test 6 arithmetic error producing 3.456 instead of 3.4780; a Test 8 residual bound `<6e-17` that does not reproduce under standard numpy double-precision) were caught.

In addition to the AI sessions:

- **Drafting.** Section-level prose drafted by an Anthropic Claude model under the Claude Code interface, with the project CLAUDE.md and the ORCHESTRATE prompt as governing instructions. Each section was drafted with explicit role assignments (variational vs. exact posterior), bound-direction discipline, and evidence-class labeling.
- **Mathematical organization.** Identities derived from definitions, with explicit statement of assumptions (A1)–(A3). The corrected core derivation in Appendix A is the canonical statement we converged to after multiple OODA passes against SOURCE B Eqn. 2.5. The Complexity-Accuracy form (Form 3) was added in Phase P2 with full re-derivation and numerical verification (Test 11).
- **Stress-test design and execution.** The ten numerical tests in Appendix C were specified and executed in a prior audit session and re-executed in Phase P0 of the Remediation Plan. The execution environment is documented in Appendix C.0; full reproducibility code is in `manuscript-v2-reproducibility/`.
- **Adversarial review.** An internal red-team / blue-team / judge cycle was applied to: the abstract; the master identity (Chapter 2); the bound-direction discussion (Chapter 3); the q/p discussion (Chapter 4); the model-vs-process discussion (Chapter 5); the CVM section (Chapter 8); the limitations (Chapter 10); the conclusion; and the entire v2 production process.
- **Cross-source comparison.** Each major claim was checked against SOURCE B passages where applicable, and the SOURCE A audited material was treated as the manuscript-under-review rather than as authority.

### E.3 What was tested vs. what was inferred

**Numerically tested (Class A):** the master identity, the bound direction, the support assumption, the role discipline, the sign convention, the $L$-expansion incoherence, the measure-transformation invalidity, the Markov-blanket CI factorization, the Appendix B sign, the structural distinctness of $F_{\mathrm{CVM}}$ and $F[q]$.

**Source-anchored (Class B):** the canonical statement of variational free energy (SOURCE B Eqn. 2.5), the bound-direction statements (SOURCE B five passages), the model-vs-process distinction (SOURCE B Fig. 2.2), the Markov-blanket CI definition (SOURCE B Box 3.1).

**Inferred from secondary text or context (Class C):** the active-inference architectural picture as presented in Chapter 1; the thermodynamic-analogy reading; the historical relationship between Beal and Friston conventions.

**Proposal-level (Class D):** the CVM ↔ $F[q]$ bridge requirements (Chapter 8); some active-inference "both systems minimize" claims (Chapter 5 unresolved tension).

**Personal / project framing (Class E):** the role of Michael Polzin as organic operator; the project's intent and posture; the publication outlook.

**Unverified or unresolved (Class U):** garbled equations in the SOURCE A text extraction; un-re-derived NESS arguments; un-inspected Beal (2003) primary text.

### E.4 Limits of AI assistance, restated

- AI-generated mathematics may contain subtle errors that survive internal review.
- AI-generated prose may sound more authoritative than the underlying evidence warrants. Where it does, the manuscript has been revised to match the evidence.
- AI cannot certify scientific truth. Expert review is required.
- This draft has *not* been peer-reviewed by qualified human experts. Publication, if pursued, must follow such review. Two AI-conducted reviews exist in the corpus: (a) the prior Claude audit captured in [`Revision Research and Test Notes.txt`](Revision%20Research%20and%20Test%20Notes.txt) and the Audit-of-Audit captured in [`Manuscript_Draft_v1_Audit.md`](Manuscript_Draft_v1_Audit.md); and (b) the SOURCE C review by a GPT-class model (file `Ai Onna GPT5.4 Pro.docx`, extracted to `source_c_extracted.txt`). Both AI-review chains substantively concur with this manuscript's central findings, but neither is a substitute for human expert peer review.

---

## Appendix F — Invitation for Expert Review

This appendix is addressed directly to the experts whose review we ask for.

### F.1 We ask for correction, not endorsement

We are not asking any reviewer to certify this manuscript. We are not asking any institution to associate its name with the work. We are asking specifically for *corrections*: places where the prose is loose, where the algebra is wrong, where an interpretive layer overshoots, where a citation is misplaced, where an assumption should be stated.

### F.2 Suggested review questions

If you have time to look at this manuscript and would like a starting point, the questions we most want answered are:

1. *On the core identity.* Is the statement in Chapter 2 / Appendix A correct as written? Are the assumptions (A1)–(A3) sufficient and stated cleanly?
2. *On bound discipline.* Does Chapter 3's table and the surrounding prose state the directions correctly and unambiguously?
3. *On the q/p discipline.* Does Chapter 4 distinguish the variational density from the exact posterior under the model in a way that prevents downstream slippage?
4. *On model vs. process.* Does Chapter 5 preserve the distinction in a way you would teach? If not, where would you change the wording?
5. *On Markov blankets.* Does the (a)/(b)/(c) trichotomy in Chapter 6 correspond to your usage? Are there meanings we have missed?
6. *On the thermodynamic analogy.* Does Chapter 7's statement of the limits go far enough? Not far enough? Different enough?
7. *On CVM.* Is the four-item bridge checklist in Chapter 8 a fair statement of what would be needed? If a bridge already exists in published literature we missed, please point us to it.
8. *On the stress tests.* Are the test setups in Appendix C correct as stated? Would you change a parameter or add a test?
9. *On the error register (Appendix D).* Do you concur with the severity ratings? Are there items we have miscategorized?
10. *On the manuscript's overall posture.* Is the humility / provenance discipline appropriate, excessive, or insufficient? Where should the tone be different?

### F.3 How to deliver corrections

Corrections of any granularity are welcome. The corrections that are most useful to us are:

- *Minor.* "Sentence X on page Y is incorrect; the correct statement is Z."
- *Local.* "Equation E in chapter C has a sign error / wrong index / missing assumption."
- *Structural.* "Chapter K should not exist / should be rewritten / should be moved."
- *Foundational.* "The whole posture of section S is wrong because of W, which you missed."

We commit to incorporating corrections in a revised draft, with attribution if the corrector wishes, and to publishing a changelog.

### F.4 What we cannot promise

- We cannot promise to agree with every correction; some will be matters of judgment.
- We cannot promise to publish this manuscript at all if the corrections suggest we should not.
- We cannot promise to keep up with a high-volume correction stream; we will prioritize corrections by mathematical severity.
- We cannot extend authorship to correctors without their explicit consent.

### F.5 Closing

The community has been generous with us in the form of openly available primary texts, public expositions, and prior reviews. This manuscript is offered as one small return. We expect to be wrong in places we cannot yet see. We will be grateful for the seeing.

---

## End of First Draft

**Confidence and limitations summary.**

- **Mathematical core (Chapter 2 / Appendix A).** Confidence 9/10. The master identity and bound direction are derived from definitions under stated assumptions and corroborated by Parr/Pezzulo/Friston (2022) Eqn. 2.5. The 1-point reduction reflects the standard humility about residual transcription risk.
- **Bound and ELBO discipline (Chapter 3).** Confidence 9/10. Numerically falsified the wrong direction in Test 5; the canonical reference states the correct direction five times.
- **Role and process discipline (Chapters 4–5).** Confidence 8.5/10. Anchored against SOURCE B passages directly.
- **Markov blankets (Chapter 6).** Confidence 8/10. CI definition verified numerically; the trichotomy is a clarification we offer, not novel mathematics.
- **Thermodynamic analogy (Chapter 7).** Confidence 8/10. The structural similarity is real; the limits we draw are conservative.
- **CVM (Chapter 8).** Confidence 7/10 on the verdict (proposal-level; bridge not supplied); confidence Class D on whether such a bridge exists at all.
- **Stress tests (Appendix C).** Confidence 9/10 for the executed tests; reproducibility is the principal residual.
- **Error register (Appendix D).** Confidence 8.5/10; severities are our best judgment and are subject to expert revision.
- **Provenance (Appendix E).** Confidence 9/10.
- **Manuscript as a whole.** Confidence 8/10 on the technical core; confidence E on the posture (it is what we set out to do, with full disclosure of what the AI did and did not do).

**What remains unverified.** Direct Beal (2003) text; Friston (2013) NESS / steady-state arguments at the level of original derivation; active-inference dynamical equations; CVM internal consistency; expert review.

**Invitation for expert correction.** Detailed in Appendix F. Offered without reservation.

**Suggested next steps before publication.**

1. Solicit at least two independent expert reviews (variational inference, active inference).
2. Have the stress tests re-executed by an independent party from the specifications in Appendix C.
3. Recheck the audited manuscript against a clean LaTeX source.
4. Either supply a CVM ↔ $F[q]$ bridge proposition with proof sketch, or revise Chapter 8 accordingly.
5. Provide a public reproducibility repository for the Appendix C tests.
6. Add a frontmatter changelog so corrections are traceable.

— *End of draft.*
