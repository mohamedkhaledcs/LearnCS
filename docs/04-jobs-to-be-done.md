# Jobs To Be Done

**Project:** LearnCS
**Document:** Jobs To Be Done
**Phase:** 0, Project Discovery
**Status:** Draft: Pending Founder Approval

---

## Purpose

This document identifies the fundamental jobs that users are trying to accomplish when they seek out CS learning solutions. It is grounded entirely in the Problem Statement (02) and Target Users (03) documents. Jobs are identified across all user groups, then mapped back to show which groups share each job.

This document does not propose solutions. It describes what users need to accomplish and why current alternatives fail to help them do so.

---

## Functional Jobs

---

### F1: Accurately Assess My Current CS Knowledge

#### Situation

A learner begins a new phase of study, considers switching resources, or wants to evaluate their readiness for something (a course, a job, an advanced topic). They need to know: where do I actually stand right now?

#### Motivation

Every subsequent decision, what to study, what to skip, which path to take, depends on an accurate understanding of current knowledge. Without this, every choice is made blind.

#### Desired Outcome

The learner has a clear, honest picture of which CS concepts they have genuinely internalized, which they have been exposed to but not mastered, and which they have never encountered.

#### Current Alternatives

- Self-assessment based on intuition and memory.
- Taking diagnostic quizzes on scattered platforms.
- Attempting practice problems and inferring gaps from failure.
- Asking peers or mentors for evaluation.

#### Frustrations

Self-assessment is unreliable, learners systematically overestimate understanding of topics they have recently studied and underestimate decay of older knowledge. Diagnostic quizzes test narrow slices. Practice problems reveal gaps only when the gap causes visible failure, leaving invisible gaps undetected. Peer evaluation is inconsistent and unavailable to most learners.

#### Related Problems

P2 (Absence of Knowledge State Modeling), P4 (Assessment-Understanding Misalignment)

#### Importance

**Critical**

This is the foundational job. Without an accurate self-assessment, no other job, gap identification, path selection, progress tracking, can be performed reliably.

#### Frequency

Periodic. Occurs at the beginning of a learning journey, after breaks, when switching contexts, and whenever the learner feels uncertain about their standing. For active learners, this need surfaces weekly to monthly.

#### User Groups

All groups. Most acute for Self-Directed Learners, Career Switchers, and Bootcamp Graduates, groups with no institutional assessment to rely on.

---

### F2: Identify Specific Gaps in My Understanding

#### Situation

A learner is stuck on a concept, failing exercises without understanding why, or encountering material that should make sense but doesn't. They suspect a gap exists somewhere earlier in their knowledge but cannot locate it.

#### Motivation

Gaps in prerequisite knowledge are the most common cause of stalled progress. The learner cannot move forward until the gap is found and addressed. But they don't know where the gap is, they only know the symptom (confusion, failure, frustration).

#### Desired Outcome

The learner knows precisely which concept or set of concepts is weak or missing, how that gap connects to the topic they are struggling with, and where to go to fill it.

#### Current Alternatives

- Reviewing previous material and hoping to find the gap.
- Searching online for explanations of the current topic and working backward.
- Asking in forums or communities: "I don't understand X, what am I missing?"
- Trial and error: attempting related exercises until the gap reveals itself.

#### Frustrations

Reviewing previous material without guidance is inefficient, the learner doesn't know which material to review. Forum answers provide explanations of the current topic but rarely diagnose the underlying prerequisite gap. Trial and error is time-consuming and demoralizing. The learner often concludes that they are "bad at CS" when the real issue is a specific, identifiable gap in a prerequisite concept.

#### Related Problems

P2 (Absence of Knowledge State Modeling), P3 (Broken Feedback Loops)

#### Importance

**Critical**

Unidentified gaps compound over time. A single unresolved gap in a foundational concept creates cascading confusion in every downstream topic that depends on it.

#### Frequency

Frequent. For active learners, this job surfaces multiple times per week during study sessions.

#### User Groups

All groups. Most acute for Self-Directed Learners (no external guidance), Bootcamp Graduates (known gaps in theory), and Junior Developers (gaps revealed by real-world work).

---

### F3: Determine What to Learn Next

#### Situation

A learner has finished a topic, a course, or a study session. They face the question: what should I work on next? They have no reliable way to answer this question because they don't know the full map of what they need to learn, where they currently are on that map, or which next step would be most effective.

#### Motivation

Time is finite. Every hour spent on the wrong topic is an hour not spent on the right one. For career switchers, this waste has direct financial cost. For all learners, choosing the wrong next step can lead to frustration (too advanced), boredom (too basic), or irrelevance (not connected to their goal).

#### Desired Outcome

The learner knows, with confidence, what the single most valuable next step in their learning journey is, and why it is the right step given their current knowledge state and goals.

#### Current Alternatives

- Following a course curriculum (next module in the list).
- Consulting roadmap websites (roadmap.sh).
- Asking in online communities.
- Following advice from articles or influencers.
- Guessing based on intuition.

#### Frustrations

Course curricula provide a fixed sequence that doesn't account for the learner's existing knowledge or goals. Roadmaps show every possible topic but don't indicate which one matters for this specific learner right now. Community advice is contradictory. Influencer recommendations reflect the advisor's path, not the learner's needs. No current alternative provides a personalized, knowledge-state-aware recommendation for what to learn next.

#### Related Problems

P1 (Linear Delivery of Non-Linear Knowledge), P5 (Undefined Path to Professional Competence)

#### Importance

**Critical**

This job occurs at every decision point in the learning journey. Poor decisions here accumulate into wasted months and fractured knowledge.

#### Frequency

Very frequent. Occurs after every completed topic, study session, or course. For active learners, this job surfaces daily.

#### User Groups

Self-Directed Learners (no curriculum to follow), Career Switchers (urgency makes wrong choices costly), Bootcamp Graduates (need targeted gap-filling, not sequential study), Professionals Upskilling (need efficient entry into new domains).

---

### F4: Validate That I Truly Understand a Concept

#### Situation

A learner has studied a topic, watched a video, read an explanation, worked through examples. They feel like they understand it. But they have experienced enough false confidence in the past to distrust the feeling. They need an external signal that distinguishes genuine understanding from familiarity.

#### Motivation

The difference between "I recognize this" and "I can apply this" is the difference between surface learning and real competence. Learners know this distinction matters but have no reliable way to test which side they are on.

#### Desired Outcome

The learner receives a clear, trustworthy signal: either they genuinely understand the concept (and can apply it to unfamiliar problems), or they don't (and the specific aspect of their understanding that is weak is identified).

#### Current Alternatives

- Taking quizzes (multiple-choice, fill-in-the-blank).
- Solving coding exercises on practice platforms.
- Trying to explain the concept to someone else (Feynman technique).
- Attempting to build something using the concept.

#### Frustrations

Quizzes test recognition, not understanding. A learner can select the correct answer without being able to produce it independently. Coding exercises test whether a solution works, not whether the learner's mental model is correct. Explaining to others requires a willing listener and is difficult to self-evaluate. Building projects provides slow, indirect feedback, it may take hours before a conceptual gap manifests as a bug.

#### Related Problems

P3 (Broken Feedback Loops), P4 (Assessment-Understanding Misalignment)

#### Importance

**Critical**

Without validation, learners accumulate false positives, concepts they believe they understand but don't. These become invisible time bombs that detonate when downstream topics require the supposedly understood concept.

#### Frequency

Very frequent. This job occurs after every significant study effort. For active learners, it surfaces multiple times per day.

#### User Groups

All groups. Universally needed. Most acute for Self-Directed Learners (no instructor to validate against) and University Students (whose exams provide misleading validation signals).

---

### F5: Follow a Structured Path Personalized to My State

#### Situation

A learner wants to reach a specific goal (understand algorithms, become job-ready, learn system design) but the path from where they are now to that goal doesn't exist as a coherent, personalized plan. They either follow a generic curriculum that ignores their prior knowledge, or they attempt to construct their own path, which requires exactly the kind of domain expertise they are trying to acquire.

#### Motivation

Learning without structure is chaotic. Learning with structure that ignores individual state is wasteful. The learner needs a path that is both structured (so they don't have to make constant navigation decisions) and personalized (so they don't waste time on material they already know or miss material they need).

#### Desired Outcome

The learner has a clear, step-by-step learning path that accounts for what they already know, what their goal is, and the most efficient route between the two.

#### Current Alternatives

- Following a fixed curriculum (university, bootcamp, online course).
- Assembling their own path from multiple resources.
- Following community-curated roadmaps.

#### Frustrations

Fixed curricula force all learners through the same sequence regardless of starting point. Self-assembled paths require meta-knowledge the learner doesn't have. Community roadmaps are generic, they show the territory but not the route for this specific traveler.

#### Related Problems

P1 (Linear Delivery of Non-Linear Knowledge), P5 (Undefined Path to Professional Competence), P7 (Fragmented Learning Ecosystem)

#### Importance

**High**

This job is a composite of F1 (assessment), F2 (gap identification), and F3 (next step determination). It is the sustained, ongoing version of those jobs applied across an entire learning journey.

#### Frequency

Ongoing. This is not a one-time job, the path should evolve as the learner progresses, as goals change, and as new gaps are discovered.

#### User Groups

Self-Directed Learners (no existing structure), Career Switchers (need efficient path with clear endpoint), Professionals Upskilling (need targeted path into a new domain).

---

### F6: Track My Progress in Terms of Actual Understanding

#### Situation

A learner has been studying for weeks or months. They want to know: am I actually making progress? Not "how many hours have I spent" or "how many modules have I completed", but has my real understanding of Computer Science grown, and by how much?

#### Motivation

Progress visibility sustains motivation. But false progress signals (completion percentages, badges, streaks) are worse than no signal at all, they create an illusion of growth that collapses when the learner encounters a real challenge. The learner needs honest progress measurement.

#### Desired Outcome

The learner can see, at any point, a truthful representation of how their actual CS understanding has evolved over time, what they've genuinely mastered, what's improving, and what has decayed.

#### Current Alternatives

- Course completion percentages.
- Streak counts and engagement metrics.
- Certificate accumulation.
- Self-reflection and journaling.

#### Frustrations

Completion metrics measure consumption. Streaks measure consistency of activity, not consistency of learning. Certificates measure course completion, not understanding. Self-reflection is subjective and unreliable. No existing system provides progress tracking that correlates with real knowledge growth.

#### Related Problems

P2 (Absence of Knowledge State Modeling), P3 (Broken Feedback Loops)

#### Importance

**Critical**

Long-term learning journeys (months to years) require sustained motivation. Without truthful progress signals, learners either lose motivation (because they can't see growth) or develop false confidence (because they see growth metrics that don't reflect reality).

#### Frequency

Ongoing. This job is always active during the learning journey. Explicit check-ins occur weekly to monthly, but the underlying need for honest progress data is continuous.

#### User Groups

All groups. Most acute for Self-Directed Learners and Career Switchers, who lack any institutional progress framework.

---

### F7: Connect Theoretical Concepts to Practical Application

#### Situation

A learner understands a concept in theory, they can define it, recognize it, and perhaps solve textbook problems about it. But when faced with a real-world task that requires the concept, they cannot bridge the gap. They know what a binary search tree is, but they don't know when to use one, why it matters in a real system, or how to implement one in production code.

#### Motivation

Theory without application is inert knowledge. Application without theory is fragile skill. Learners need both, connected. The gap between "I know what this is" and "I know when and how to use this" is where professional competence lives.

#### Desired Outcome

The learner can, for any concept they have studied, articulate when it applies, why it applies, and how to apply it in a context they have not previously encountered.

#### Current Alternatives

- University capstone projects and internships (end of degree only).
- Building personal projects.
- On-the-job learning.
- Project-based tutorials ("Build X with Y").

#### Frustrations

Capstone projects arrive too late, after years of disconnected theory. Personal projects are undirected, the learner may not choose projects that exercise the right concepts. On-the-job learning is reactive and unstructured. Project tutorials teach procedure (follow these steps) without teaching judgment (understand why these steps are appropriate).

#### Related Problems

P6 (Theory-Practice Disconnect)

#### Importance

**High**

This job is essential for professional readiness but is downstream of the core assessment and path jobs. A learner must first be able to identify what they know (F1) and what to learn (F3) before the theory-practice connection becomes the binding constraint.

#### Frequency

Ongoing. This job becomes increasingly important as the learner advances from fundamentals to application-level knowledge.

#### User Groups

University CS Students (theory-heavy environment), Bootcamp Graduates (need to connect the theory they're filling in), Junior Developers (encounter the gap daily on the job).

---

### F8: Learn New Material Without Repeating What I Already Know

#### Situation

A learner begins a new course, switches platforms, or starts learning a new domain. The available resources start from the beginning, covering foundational material the learner has already mastered. They cannot skip ahead because they don't know exactly what they can safely skip without missing something, but going through introductory material again wastes their limited time and erodes their patience.

#### Motivation

Redundant learning is demotivating. It signals to the learner that the system does not recognize their existing competence. For time-constrained learners (career switchers, junior developers, professionals), redundancy is not just annoying, it is costly.

#### Desired Outcome

The learner's existing knowledge is recognized, and their learning experience begins at the point where their knowledge ends, not at the point where the content starts.

#### Current Alternatives

- Manually skipping sections that "look familiar."
- Taking placement tests (rare, coarse-grained).
- Skimming content at accelerated speed.

#### Frustrations

Skipping manually risks missing material that appears familiar but contains nuances the learner hasn't mastered. Placement tests, when they exist, are broad and imprecise. Skimming creates a superficial review that doesn't confirm understanding. No existing system can dynamically identify which parts of its content the learner already knows and adjust accordingly.

#### Related Problems

P1 (Linear Delivery of Non-Linear Knowledge), P2 (Absence of Knowledge State Modeling), P7 (Fragmented Learning Ecosystem)

#### Importance

**High**

Redundancy is a direct cause of platform abandonment. Learners who feel their time is being wasted leave. For a product that depends on sustained engagement, eliminating redundancy is essential for retention.

#### Frequency

Periodic. Occurs whenever a learner starts a new topic area, switches resources, or returns after a break.

#### User Groups

Bootcamp Graduates (need targeted gap-filling, not beginner courses), Professionals Upskilling (intolerant of redundancy), Junior Developers (need specific concepts, not full courses).

---

### F9: Determine When I Am Ready for a Specific Professional Role

#### Situation

A learner has been studying with the goal of employment. They believe they may be ready to start applying for jobs, but they have no reliable way to evaluate their readiness. They don't know if their knowledge meets the minimum bar for their target role, which specific gaps would disqualify them, or whether their self-assessment is accurate.

#### Motivation

Applying too early leads to rejection and damaged confidence. Applying too late wastes time that could be spent earning in the target role. The learner needs an accurate readiness signal, not encouragement, not a guess, but a defensible evaluation.

#### Desired Outcome

The learner knows whether their current knowledge state meets the requirements for a specific role, and if not, exactly what gaps remain.

#### Current Alternatives

- Applying for jobs and using interview outcomes as feedback.
- Comparing their knowledge against job postings.
- Asking mentors or peers for readiness evaluation.
- Using mock interview services.

#### Frustrations

Using real job applications as a readiness test is costly (emotionally and in time) and provides poor diagnostic feedback, rejection usually comes without explanation. Job postings list requirements in vague terms ("strong understanding of algorithms") that cannot be self-evaluated. Mentors are scarce and their assessments are subjective. Mock interviews are expensive and infrequent.

#### Related Problems

P5 (Undefined Path to Professional Competence), P8 (Credential-Competence Gap)

#### Importance

**High**

This job has high stakes for career switchers and graduates. However, it is downstream, it requires the assessment (F1), gap identification (F2), and progress tracking (F6) jobs to be solved first. Readiness evaluation is a conclusion drawn from those inputs.

#### Frequency

Periodic. Occurs during job-search preparation, typically over weeks to months.

#### User Groups

Career Switchers (highest urgency), University CS Students (approaching graduation), Bootcamp Graduates (immediately post-bootcamp).

---

## Emotional Jobs

---

### E1: Feel Confident That I'm on the Right Path

#### Situation

A learner is studying but is plagued by doubt: Am I learning the right things? Am I using my time well? Is this path going to lead somewhere? They see conflicting advice online, peers who seem further ahead, and an overwhelming number of options.

#### Motivation

Uncertainty is a motivation killer. Learners can tolerate difficulty, but they cannot sustain effort when they doubt that the effort is aimed in the right direction.

#### Desired Outcome

The learner has an evidence-based reason to believe their current path is well-directed, not motivational platitudes, but demonstrable alignment between their goals, their current state, and the path they are following.

#### Current Alternatives

Seeking validation from communities, mentors, or influencers. Comparing their path to others'. Reading "how I learned to code" success stories.

#### Frustrations

External validation is inconsistent and often contradictory. Comparison to others is demoralizing. Success stories suffer from survivorship bias. None of these provide personalized, evidence-based path confidence.

#### Related Problems

P5 (Undefined Path to Professional Competence)

#### Importance

**High**

Path confidence directly affects retention. Learners who doubt their path abandon it, not because they lack ability, but because they lack certainty.

#### Frequency

Ongoing. This need is always present, with peaks during periods of slow visible progress or when encountering difficulty.

#### User Groups

Self-Directed Learners (no external structure to provide confidence), Career Switchers (high stakes amplify doubt).

---

### E2: Stop Feeling Overwhelmed by Choices

#### Situation

A learner faces the full landscape of CS education: thousands of courses, dozens of languages, conflicting methodologies, competing platforms. The volume of options produces paralysis rather than empowerment. They spend more time researching what to learn than actually learning.

#### Motivation

Decision fatigue is a real cognitive cost. Every hour spent choosing between resources is an hour not spent learning. The learner wants the decision burden removed or dramatically reduced.

#### Desired Outcome

The learner's decision space is narrowed to a manageable, relevant set of options, or a single recommended next step, so they can invest their energy in learning rather than in navigating.

#### Current Alternatives

Adopting a single platform and ignoring alternatives. Following a popular roadmap without customization. Asking a mentor to prescribe a path.

#### Frustrations

Committing to one platform means potentially missing better resources. Generic roadmaps don't account for individual state. Mentors are scarce and their recommendations are limited by their own experience.

#### Related Problems

P5 (Undefined Path to Professional Competence), P7 (Fragmented Learning Ecosystem)

#### Importance

**High**

Overwhelm is one of the primary reasons learners abandon CS education entirely. It disproportionately affects newcomers and career switchers, the groups with the least context for making informed choices.

#### Frequency

Most acute at the beginning of a learning journey and at major transition points (finishing a course, changing goals, entering a new topic area).

#### User Groups

Self-Directed Learners, Career Switchers.

---

### E3: Know That I'm Genuinely Improving

#### Situation

A learner has been studying consistently. Days become weeks. Weeks become months. They feel like they should be better by now, but they have no trustworthy signal of improvement. Completion metrics say they're progressing. Their subjective experience says otherwise. They need to know, objectively, whether their understanding of Computer Science is actually growing.

#### Motivation

Sustained effort without visible payoff leads to burnout. The learner will continue investing time only if they have genuine evidence that the investment is producing results.

#### Desired Outcome

The learner can see honest evidence that their understanding has deepened over a defined period, not activity metrics, not badges, but proof that they comprehend things today that they did not comprehend last month.

#### Current Alternatives

- Comparing current performance on exercises to past performance.
- Reflecting on subjective feelings of confidence.
- Measuring speed of problem-solving.

#### Frustrations

Exercise performance reflects familiarity with exercise formats, not necessarily conceptual growth. Subjective confidence is unreliable. Speed improvements may reflect pattern memorization rather than understanding. No current alternative distinguishes genuine cognitive growth from repeated exposure.

#### Related Problems

P2 (Absence of Knowledge State Modeling), P3 (Broken Feedback Loops)

#### Importance

**Critical**

This is the emotional counterpart of F6 (progress tracking). Without this signal, even the most motivated learners eventually stop. It is the most important emotional job because it directly governs long-term engagement.

#### Frequency

Ongoing. The need is continuous, with explicit awareness surfacing during plateaus, difficult topics, or periods of self-doubt.

#### User Groups

All groups. Universal need across every type of learner.

---

### E4: Eliminate Self-Doubt Through Evidence of Competence

#### Situation

A learner feels uncertain about their abilities. They are about to apply for a job, start a project, or enter an advanced topic. They suspect they might not be good enough. They want to know, not believe, not hope, whether they are competent in the areas they have studied.

#### Motivation

Imposter syndrome in CS is pervasive and documented. It is not primarily a psychological problem, it is an information problem. Learners doubt themselves because no system has ever given them a reliable, evidence-based signal of competence. The doubt is rational in the absence of evidence.

#### Desired Outcome

The learner has concrete evidence, not a certificate of completion, not a motivational message, that they demonstrably understand specific concepts and can apply them. The evidence is specific enough to counter specific doubts.

#### Current Alternatives

- Accumulating certificates.
- Passing interview practice problems.
- Seeking reassurance from peers.

#### Frustrations

Certificates reflect completion, not competence. Interview practice tests a narrow slice. Peer reassurance is social, not evidentiary. None provide the granular, trustworthy evidence of understanding that would resolve the doubt at its source.

#### Related Problems

P2 (Absence of Knowledge State Modeling), P4 (Assessment-Understanding Misalignment), P8 (Credential-Competence Gap)

#### Importance

**High**

Self-doubt driven by lack of evidence leads to underperformance in interviews, delayed job searches, and abandoned learning journeys. Solving this job requires the foundational assessment and knowledge modeling capabilities addressed by F1, F4, and F6.

#### Frequency

Periodic. Peaks before high-stakes moments (job applications, interviews, starting new roles).

#### User Groups

All groups. Most acute for Career Switchers (high stakes, no CS pedigree), Bootcamp Graduates (aware of gaps), and Self-Directed Learners (no institutional validation).

---

## Social Jobs

---

### S1: Demonstrate Competence Credibly to Employers

#### Situation

A learner is applying for jobs. They need to communicate what they know and can do to potential employers. Their available signals, a degree they may not have, certificates with diminishing credibility, a GitHub profile that may or may not reflect their abilities, are insufficient or mistrusted by the market.

#### Motivation

Hiring decisions are made on perceived competence. If a learner has genuine competence but no credible way to demonstrate it, their knowledge has no professional value. The job of demonstrating competence is as important as the job of acquiring it.

#### Desired Outcome

The learner has a credible, granular, and verifiable way to communicate their specific CS competencies to employers, one that employers find trustworthy enough to influence hiring decisions.

#### Current Alternatives

- University degrees.
- Bootcamp certificates.
- Online course certificates.
- Portfolio projects and GitHub profiles.
- Technical interviews (employer-initiated assessment).

#### Frustrations

Degrees are expensive and time-consuming. Bootcamp and online certificates are losing credibility. Portfolio projects are inconsistent and hard for employers to evaluate at scale. Technical interviews exist precisely because none of the above are trusted, the employer must re-evaluate from scratch.

#### Related Problems

P8 (Credential-Competence Gap)

#### Importance

**High**

This job is critical for career-motivated learners but is downstream of the competence itself. It requires knowledge modeling (F1, F6) and valid assessment (F4) to be solved first, a credible credential can only be as good as the measurement behind it.

#### Frequency

Periodic. Concentrated during job search periods.

#### User Groups

Career Switchers (no CS credentials), Bootcamp Graduates (weak credentials), University CS Students (approaching graduation).

---

### S2: Communicate My Specific Knowledge Level to Others

#### Situation

A learner is in a conversation, with a mentor, a team lead, a study group, or a collaborator, where they need to accurately communicate what they know and what they don't. They lack a shared vocabulary and a reliable reference point for their knowledge level. "I'm intermediate" means different things to everyone.

#### Motivation

Effective collaboration, mentorship, and team formation require mutual understanding of each person's knowledge state. Without a shared frame of reference, communication about ability is vague and often misleading.

#### Desired Outcome

The learner can point to a specific, understandable representation of their knowledge state that others can interpret consistently, not a self-reported label, but a structured signal.

#### Current Alternatives

- Self-reported labels ("I'm a beginner in algorithms").
- Listing courses completed or technologies used.
- Demonstrating through conversation or live coding.

#### Frustrations

Self-reported labels are inconsistent. Course lists don't reflect understanding. Live demonstrations are time-consuming and context-dependent. No standardized way exists to communicate CS knowledge at a concept level.

#### Related Problems

P2 (Absence of Knowledge State Modeling), P8 (Credential-Competence Gap)

#### Importance

**Medium**

This job is valuable for collaboration and mentorship but is not the primary reason learners seek solutions. It becomes more important as the learner operates in professional and team contexts.

#### Frequency

Occasional. Surfaces during onboarding, team changes, mentorship initiation, and professional networking.

#### User Groups

Junior Developers (communicating with team leads), Professionals Upskilling (signaling when entering new domains), all groups in mentorship contexts.

---

### S3: Show Readiness for a Specific Role or Responsibility

#### Situation

A professional is being considered for a promotion, a new project assignment, or a role change. They need to demonstrate that their knowledge covers the requirements of the new role, not in general terms, but against specific competency expectations.

#### Motivation

Career advancement depends on demonstrating readiness. Without a trusted mechanism to map personal knowledge to role requirements, advancement decisions rely on perception, tenure, and politics rather than actual competence.

#### Desired Outcome

The learner can show, with specificity, how their verified knowledge maps to the requirements of a target role, and where gaps remain.

#### Current Alternatives

- Performance reviews (subjective, infrequent).
- Technical assessments by managers (inconsistent, often informal).
- Certifications (coarse-grained, not role-specific).

#### Frustrations

Performance reviews assess behavior and output, not underlying knowledge. Manager assessments are inconsistent and biased by visibility. Certifications cover broad domains rather than specific role requirements.

#### Related Problems

P5 (Undefined Path to Professional Competence), P8 (Credential-Competence Gap)

#### Importance

**Medium**

This job is important for career progression but is a later-stage need. It requires mature knowledge modeling and role-requirement mapping, capabilities that build on the core jobs.

#### Frequency

Infrequent. Occurs at career transition points, typically annually or less.

#### User Groups

Junior Developers (seeking mid-level roles), Professionals Upskilling (transitioning into new domains).

---

## Job Hierarchy

### Core Jobs

These are the jobs that define the product's reason to exist. If the product does not accomplish these, nothing else matters.

| Job | Rationale |
|-----|-----------|
| F1: Accurately Assess My Current CS Knowledge | Foundation of all other jobs. Without accurate assessment, gap identification, path generation, and progress tracking are impossible. |
| F2: Identify Specific Gaps in My Understanding | The immediate, actionable consequence of assessment. Learners need to know not just "where they stand" but specifically "what is missing." |
| F3: Determine What to Learn Next | The decision that occurs most frequently in any learning journey. Getting this wrong wastes time and compounds gaps. |
| F4: Validate That I Truly Understand a Concept | The feedback mechanism that converts consumption into learning. Without validation, studying produces false confidence. |
| F6: Track My Progress in Terms of Actual Understanding | The long-term signal that sustains engagement. Without honest progress tracking, learners lose motivation or develop false confidence. |

### Supporting Jobs

These jobs enhance and depend on the core jobs. They cannot be solved independently, they require the infrastructure that core jobs produce.

| Job | Rationale |
|-----|-----------|
| F5: Follow a Structured Path Personalized to My State | Requires F1 (assessment) + F3 (next step) applied continuously. A path is the aggregation of core jobs into a sustained experience. |
| F7: Connect Theoretical Concepts to Practical Application | Requires F4 (validation) and depends on content that bridges theory and practice. Important for professional readiness but secondary to the assessment and navigation core. |
| F8: Learn Without Repeating What I Already Know | Requires F1 (assessment) to identify existing knowledge. A quality-of-experience job that depends on core knowledge modeling. |
| E1: Feel Confident That I'm on the Right Path | Emotional outcome of F3 (knowing what to learn next) and F6 (seeing progress). Not solvable independently: it is produced by the core jobs working well. |
| E2: Stop Feeling Overwhelmed by Choices | Emotional outcome of F3 and F5. Solved by reducing the decision space, which requires assessment and path generation. |
| E3: Know That I'm Genuinely Improving | Emotional counterpart of F6. Produced by honest progress tracking. |

### Future Jobs

These jobs are important for long-term product value but require the core and supporting jobs to be established first. They extend the product from a learning system into a career and credentialing system.

| Job | Rationale |
|-----|-----------|
| F9: Determine When I Am Ready for a Specific Role | Requires F1 + F6 + a mapping between knowledge state and role requirements. Depends on core infrastructure plus domain-specific career data. |
| E4: Eliminate Self-Doubt Through Evidence | Emotional outcome of F1, F4, and F6 working at high fidelity. Requires mature, trustworthy assessment. |
| S1: Demonstrate Competence to Employers | Requires the knowledge model (F1, F6) and validated assessment (F4) to produce a credible, externally shareable signal. |
| S2: Communicate Knowledge Level to Others | Requires a shared representation of knowledge state. Depends on the knowledge modeling core. |
| S3: Show Readiness for a Specific Role | Requires F9 plus an externally communicable format. Most downstream of all jobs. |

---

## Prioritization Matrix

| Job | User Groups | Importance | Frequency | Strategic Value | Priority |
|-----|-------------|------------|-----------|-----------------|----------|
| F1: Assess Current Knowledge | All | Critical | Periodic | Foundation of entire product | **P0** |
| F2: Identify Knowledge Gaps | All | Critical | Frequent | Enables targeted learning | **P0** |
| F3: Determine What to Learn Next | SDL, CS, BG, PU | Critical | Very Frequent | Core navigation capability | **P0** |
| F4: Validate Understanding | All | Critical | Very Frequent | Core feedback mechanism | **P0** |
| F6: Track Real Progress | All | Critical | Ongoing | Sustains long-term engagement | **P0** |
| F5: Personalized Learning Path | SDL, CS, PU | High | Ongoing | Aggregation of core jobs | **P1** |
| F7: Theory-Practice Connection | UCS, BG, JD | High | Ongoing | Professional readiness | **P1** |
| F8: No Redundant Learning | BG, PU, JD | High | Periodic | Retention and efficiency | **P1** |
| E3: Know I'm Improving | All | Critical | Ongoing | Motivation and retention | **P1** |
| E1: Path Confidence | SDL, CS | High | Ongoing | Retention | **P1** |
| E2: Reduce Overwhelm | SDL, CS | High | Periodic | Onboarding and retention | **P1** |
| F9: Role Readiness | CS, UCS, BG | High | Periodic | Career value proposition | **P2** |
| E4: Evidence-Based Confidence | All | High | Periodic | Emotional well-being | **P2** |
| S1: Demonstrate to Employers | CS, BG, UCS | High | Periodic | Market differentiation | **P2** |
| S2: Communicate Knowledge Level | JD, PU | Medium | Occasional | Collaboration value | **P3** |
| S3: Show Role Readiness | JD, PU | Medium | Infrequent | Career advancement | **P3** |

*Key: SDL = Self-Directed Learners, CS = Career Switchers, UCS = University CS Students, BG = Bootcamp Graduates, JD = Junior Developers, PU = Professionals Upskilling*

---

## Success Criteria for Core Jobs

### F1: Accurately Assess My Current CS Knowledge

The job is successfully done when the learner can look at a representation of their knowledge and say: "Yes, this is accurate. The things it says I know, I actually know. The things it says I don't know, I genuinely don't." The assessment must survive confrontation with reality, a learner assessed as strong in recursion should be able to solve unfamiliar recursive problems, and a learner assessed as weak should demonstrably struggle.

### F2: Identify Specific Gaps in My Understanding

The job is successfully done when a stuck learner can discover the specific prerequisite concept causing their confusion, without needing to ask a human. The identified gap must be correct: addressing it should resolve the downstream confusion.

### F3: Determine What to Learn Next

The job is successfully done when the learner's next step is clear, immediately actionable, and, in hindsight, turns out to have been the right choice. The learner should never look back and think "I wish I had learned X before Y."

### F4: Validate That I Truly Understand a Concept

The job is successfully done when the learner can distinguish between familiarity and understanding with the help of an external signal. After validation, the learner's confidence in their knowledge should be calibrated, meaning their self-assessment aligns with their actual performance on novel applications of the concept.

### F6: Track My Progress in Terms of Actual Understanding

The job is successfully done when a learner who has studied for three months can point to specific, verifiable evidence that their CS understanding has grown, and that evidence holds up under scrutiny. The progress signal should reveal both growth and areas of stagnation or decay.


## Traceability Matrix

Problem (P1-P8)
↓

User Groups

↓

Jobs To Be Done

↓

Future Features (Placeholder)

↓

Success Metrics (Placeholder)

---

*End of Document*
