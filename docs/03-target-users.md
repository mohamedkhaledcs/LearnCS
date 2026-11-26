# Target Users

**Project:** LearnCS
**Document:** Target Users
**Phase:** 0, Project Discovery
**Status:** Draft: Pending Founder Approval

---

## Purpose

This document identifies and classifies the groups of people who experience the problems documented in the Problem Statement (02). It does not define personas, features, or user journeys. It establishes who is affected, how severely, and why, creating the foundation for all subsequent product scoping and prioritization decisions.

Users are grouped by similarity of problems, goals, and constraints, not by demographics.

---

## Evaluated and Excluded Groups

The following groups were evaluated and excluded from the target user analysis. Reasoning is provided for transparency.

**High School Students**
Excluded. Students at this stage are exploring CS at an introductory level. The structural problems identified in the Problem Statement, prerequisite misalignment, absent knowledge modeling, broken feedback loops, become acute only when a learner is engaged with CS at a depth where these structures matter. Introductory experiences (Hour of Code, AP CS Principles, beginner tutorials) adequately serve this audience. Including them would dilute product focus without addressing the core problems.

**Competitive Programmers**
Excluded. Their goal is algorithmic competition performance, not comprehensive CS education or career readiness. The problems they face, depth in narrow algorithmic domains, speed optimization, contest strategy, are structurally different from the eight problems identified in the Problem Statement. A product built to solve P1-P8 would not serve their primary needs.

**Interview Preparation Learners**
Excluded as a separate group. Interview preparation is a use case that spans multiple user groups (career switchers, fresh graduates, junior developers), not a distinct population with unique problems. Their needs are addressed within the groups they belong to.

---

## User Group 1: Self-Directed Learners

### Description

Individuals learning Computer Science independently, outside of or alongside formal education. They rely primarily on online resources, books, and self-structured study. They may be students supplementing a weak curriculum, hobbyists exploring CS seriously, or individuals who chose not to pursue formal education but are committed to learning.

### Current Situation

They are actively learning CS using freely available or paid online resources. They have no institutional structure, no advisor, no curriculum designed for them, and no external accountability. Their learning environment is their laptop, an internet connection, and their own discipline.

### Primary Goals

- Acquire genuine CS competence, not just surface familiarity.
- Build a foundation strong enough to pursue professional work or advanced study.
- Understand where they stand in their learning journey at any given time.

### Biggest Problems

- **P5 (Undefined Path)**: No reliable guide for what to learn, in what order, or when they have learned enough. This is their single most acute problem.
- **P2 (No Knowledge Model)**: They cannot accurately assess their own understanding. They frequently overestimate or underestimate what they know.
- **P1 (Linear Delivery)**: Every resource they find is a linear sequence. They cannot navigate CS knowledge according to their actual gaps.
- **P7 (Fragmented Ecosystem)**: Their learning is scattered across platforms with no continuity between them.
- **P3 (Broken Feedback)**: They have no reliable external signal telling them whether they are actually learning.

### Motivation

Varies widely: intellectual curiosity, career aspiration, desire for self-sufficiency, dissatisfaction with formal education options, financial inability to attend university, or geographic inaccessibility of quality institutions.

### Constraints

| Constraint | Detail |
|-----------|--------|
| Structure | None. They must create their own curriculum, schedule, and assessment. |
| Guidance | None. No advisor, mentor, or instructor unless they actively seek one. |
| Feedback | Near-zero. Only binary signals from coding exercises. |
| Time | Varies. Some study full-time, others have a few hours per week. |
| Money | Typically limited. They gravitate toward free resources. |
| Validation | No external credential path. No way to prove what they know. |

### Current Alternatives

- Free platforms: freeCodeCamp, The Odin Project, Khan Academy, YouTube tutorials.
- Paid courses: Udemy, Coursera, edX.
- Community guidance: Reddit (r/learnprogramming), Discord servers, roadmap.sh.
- Practice: LeetCode, HackerRank, Exercism.

### Why Current Alternatives Fail

Free platforms provide content but not structure. Paid courses provide structure but not personalization. Community guidance provides opinions but not reliable, validated paths. Practice platforms provide exercises but not diagnostic feedback.

None of these alternatives model the learner's knowledge, identify their specific gaps, or adapt to their individual state. The learner remains the sole integration point across all resources, performing a knowledge management function they are not equipped for.

### Success Criteria

"I know exactly where I stand. I know what to learn next. I can see my progress in terms of real understanding, not just hours spent. When I say I know something, I actually know it."

### Priority

**Critical**

This group experiences the full spectrum of problems identified in the Problem Statement with the highest severity. They have no institutional safety net. If the product cannot serve self-directed learners, it has not solved the core problem.

---

## User Group 2: Career Switchers

### Description

Adults transitioning into software engineering or a related CS field from a non-technical career. They may come from finance, healthcare, education, retail, or any other industry. They have decided to invest significant time and effort into learning CS with the explicit goal of employment in tech.

### Current Situation

They are either actively studying while employed in another field, or they have left their previous job to study full-time. They are under time and financial pressure. Every month spent learning is a month not earning in their target field. They need a clear, efficient path to employability.

### Primary Goals

- Achieve professional competence in the shortest responsible timeframe.
- Get hired as a software engineer or developer.
- Build a credible professional profile that compensates for lack of a CS degree.

### Biggest Problems

- **P5 (Undefined Path)**: They need a clear path more urgently than any other group. Wasted time has direct financial consequences.
- **P8 (Credential-Competence Gap)**: They lack traditional credentials (CS degree) and need an alternative way to demonstrate competence. Current alternatives (bootcamp certs, online course certs) are insufficient.
- **P6 (Theory-Practice Disconnect)**: They need practical skills to get hired but theoretical foundations to grow. Most learning options offer one or the other.
- **P2 (No Knowledge Model)**: They cannot assess whether they are job-ready. No system tells them.
- **P4 (Assessment Misalignment)**: They prepare for interviews by memorizing patterns (LeetCode grinding) rather than building genuine understanding, because that is what existing assessment systems reward.

### Motivation

Career dissatisfaction, higher earning potential, intellectual interest in technology, desire for remote work flexibility, or industry instability in their current field. Motivation is typically high but time-bounded, if progress is not visible, motivation erodes quickly.

### Constraints

| Constraint | Detail |
|-----------|--------|
| Time | Severely limited. Many study part-time alongside a job. Full-time switchers face financial runways. |
| Money | Moderate to high pressure. Every month of learning has an opportunity cost. Bootcamps cost $10K-$20K+. |
| Background | No CS foundation. Must learn fundamentals and practical skills simultaneously. |
| Age Bias | Real or perceived bias in hiring. Pressure to prove competence more rigorously than traditional candidates. |
| Network | Typically no professional network in tech. Less access to referrals, mentorship, and insider knowledge. |

### Current Alternatives

- Coding bootcamps (General Assembly, Flatiron, App Academy).
- Self-study with roadmaps (roadmap.sh, community-sourced paths).
- University second degree or post-graduate conversion programs.
- Paid mentorship programs.

### Why Current Alternatives Fail

Bootcamps provide a compressed path but sacrifice theoretical depth. Graduates can build web applications but often struggle in technical interviews or on-the-job problem-solving that requires CS fundamentals. The credential is also weakening, employer perception of bootcamp graduates varies widely.

Self-study paths lack validation. The career switcher has no way to know when they are ready. They either apply too early (and face rejection that damages confidence) or study too long (and burn through their financial runway).

University programs are too slow and too expensive for most career switchers. A second four-year degree is impractical.

### Success Criteria

"I got hired as a software engineer. I can perform the job. I didn't just get through the interview, I can actually do the work."

### Priority

**Critical**

Career switchers have the highest urgency, the highest willingness to invest, and the clearest success criteria (employment). They are deeply affected by P5, P8, and P6. Their needs align closely with the most severe problems in the Problem Statement.

---

## User Group 3: University CS Students

### Description

Students currently enrolled in a Computer Science or related degree program at a college or university. They have institutional structure, courses, professors, assignments, grades, but the structure itself is part of the problem.

### Current Situation

They attend lectures, complete assignments, and take exams. They are following a fixed curriculum designed by their department. They have access to professors and teaching assistants but the ratio of students to instructors limits personalized attention. They may or may not supplement their studies with external resources.

### Primary Goals

- Actually understand the material, not just pass exams.
- Graduate with sufficient competence to succeed in technical interviews and professional roles.
- Bridge the gap between what their curriculum teaches and what the industry expects.

### Biggest Problems

- **P1 (Linear Delivery)**: Their curriculum is a fixed linear sequence. They cannot adapt it to their individual gaps or strengths.
- **P4 (Assessment Misalignment)**: University exams test reproduction and recall. Students who pass exams discover later that they did not truly understand the material.
- **P6 (Theory-Practice Disconnect)**: Their education is heavily theoretical. Practical skills (version control, deployment, debugging real systems) are often absent or minimal.
- **P3 (Broken Feedback)**: Lecture-based delivery provides no real-time feedback. Assignment feedback arrives days or weeks later.

### Motivation

Career preparation (primary for most), intellectual interest, parental expectation, or degree requirement for desired career path. Motivation varies from highly intrinsic to largely extrinsic.

### Constraints

| Constraint | Detail |
|-----------|--------|
| Curriculum | Fixed. They cannot choose the order or pace of topics. |
| Assessment | Determined by the institution. They are evaluated by exams and assignments they do not control. |
| Time | Compressed. Semester-based schedules create artificial deadlines that may not align with learning pace. |
| Cost | University tuition is a significant financial commitment already made. Additional spending is limited. |
| Agency | Low. They are operating within an institutional system that optimizes for throughput, not individual learning. |

### Current Alternatives

- Supplementary online courses (YouTube, Coursera, MIT OpenCourseWare) to fill gaps.
- Study groups and peer learning.
- Office hours and teaching assistants.
- Practice platforms (LeetCode, HackerRank) for interview preparation, typically in later years.

### Why Current Alternatives Fail

Supplementary resources help with content gaps but do not address the structural problems of the curriculum itself. A student who watches a YouTube video on dynamic programming may understand the explanation but still has no way to know whether their overall understanding of algorithms is coherent.

Office hours and TAs provide human feedback but are scarce, inconsistent, and available only during limited windows. They cannot substitute for continuous, personalized feedback.

Interview prep platforms address the symptom (prepare for interviews) without addressing the cause (ensure genuine understanding throughout the degree).

### Success Criteria

"I understand what I studied. When I graduate, I can actually apply what I learned. I don't need to relearn everything from scratch for interviews or my first job."

### Priority

**High**

University students experience several core problems but have partial institutional support. Their path is defined (by the curriculum), their feedback is partially present (through grading), and their credential has value (a degree). The product's unique value for this group is filling the gaps their institution leaves, not replacing the institution.

---

## User Group 4: Bootcamp Graduates

### Description

Individuals who completed a coding bootcamp (typically 3-6 months, full-time) and are either job-seeking or recently employed. They can build functional applications but have significant gaps in CS fundamentals. They are aware of these gaps.

### Current Situation

They can write code. They can build web applications. They can use frameworks. But they struggle with algorithmic thinking, system design, computational complexity, and the theoretical foundations that underpin the tools they use daily. They feel this gap acutely during technical interviews and in the first year of employment.

### Primary Goals

- Fill foundational CS knowledge gaps without repeating what they already know.
- Pass technical interviews that test CS fundamentals.
- Build the deeper understanding required for career advancement beyond junior roles.

### Biggest Problems

- **P6 (Theory-Practice Disconnect)**: They have the practice. They lack the theory. They need to connect the two.
- **P2 (No Knowledge Model)**: They don't know which fundamentals they're missing. Their gaps are invisible to them until they encounter a problem that requires the missing knowledge.
- **P1 (Linear Delivery)**: Existing CS courses start from the beginning and move linearly. They don't need the beginning, they need specific, targeted gap-filling.
- **P4 (Assessment Misalignment)**: They cannot reliably determine whether they've actually filled a gap or just watched a video about it.

### Motivation

Career survival (passing interviews), career growth (advancing beyond junior roles), intellectual integrity (wanting to truly understand the tools they use), and professional confidence (eliminating imposter syndrome rooted in real knowledge gaps).

### Constraints

| Constraint | Detail |
|-----------|--------|
| Time | Limited. They are either job-seeking (urgent) or employed (available time is evenings and weekends). |
| Foundation | Uneven. They have strong practical skills but inconsistent theoretical foundations. |
| Patience | Low for redundant content. They will abandon any resource that forces them through material they already know. |
| Money | Moderate. They already invested in a bootcamp. Additional spending is weighed carefully. |

### Current Alternatives

- Online CS courses (MIT OpenCourseWare, Coursera) for theoretical foundations.
- Interview prep platforms (LeetCode, NeetCode, AlgoExpert).
- Books (Cracking the Coding Interview, Introduction to Algorithms).

### Why Current Alternatives Fail

Traditional CS courses start from the beginning and require commitment to a full sequence. A bootcamp graduate who needs to understand hash tables, graph algorithms, and memory management but already understands HTTP, REST, and databases is forced to sit through introductory material or manually identify which parts to skip, a task that requires the very knowledge assessment capability that doesn't exist (P2).

Interview prep platforms teach problem-solving patterns but not the underlying CS concepts. They optimize for interview performance, not genuine understanding.

### Success Criteria

"I know which CS fundamentals I'm missing. I've filled those specific gaps. I can explain why my code works, not just that it works."

### Priority

**High**

Bootcamp graduates represent a clearly defined population with specific, identifiable gaps. Their needs align strongly with P1, P2, and P6. They are a high-value validation group because their success criteria are concrete and measurable.

---

## User Group 5: Junior Developers

### Description

Software developers with 0-2 years of professional experience. They are employed and working on real codebases. They can perform their daily tasks but encounter regular moments where their CS foundation is insufficient, and they know it.

### Current Situation

They are on the job. They ship code. But they regularly encounter situations where deeper CS knowledge would improve their work: choosing the right data structure, understanding performance implications, debugging complex concurrency issues, or making architectural decisions. They learn on the job through exposure, but the learning is unstructured, reactive, and gap-ridden.

### Primary Goals

- Strengthen CS foundations in the context of their daily work.
- Transition from "I can follow instructions" to "I can reason about systems."
- Advance to mid-level and senior roles, which require deeper technical judgment.

### Biggest Problems

- **P6 (Theory-Practice Disconnect)**: They have practice context but lack the theoretical foundations to make informed decisions. They learn by encountering problems, not by understanding principles.
- **P2 (No Knowledge Model)**: They discover gaps only when they fail. There is no proactive system that identifies what they don't know before it causes a problem.
- **P3 (Broken Feedback)**: Their only feedback mechanism is production incidents, code review comments, and their own trial-and-error. There is no structured learning feedback.

### Motivation

Career advancement (reaching mid/senior level), professional competence (wanting to be genuinely good at their job), and intellectual satisfaction (understanding the systems they work with daily).

### Constraints

| Constraint | Detail |
|-----------|--------|
| Time | Severely limited. Full-time employment leaves minimal dedicated learning time. |
| Relevance | They need learning that connects directly to their work. Abstract theory without practical context feels wasteful. |
| Energy | After a full workday of coding, additional studying requires high motivation and low friction. |
| Continuity | Learning must accommodate irregular schedules. Consistency is difficult to maintain. |

### Current Alternatives

- On-the-job learning through exposure and mentorship.
- Online courses during personal time.
- Technical books and documentation.
- Conference talks and blog posts.
- Internal company training programs (rare and variable quality).

### Why Current Alternatives Fail

On-the-job learning is reactive and haphazard. It fills gaps only when they cause visible problems, leaving systematic blind spots.

Online courses require time commitment that competes with rest and personal life. Without personalization, they force the developer through content they already know to reach the content they need.

Books and documentation require the developer to self-diagnose their gaps, the same knowledge assessment problem (P2) that affects every other group.

### Success Criteria

"I understand the foundations behind the work I do. When I make a technical decision, I know why it's the right one, not just that it's what I've seen others do."

### Priority

**High**

Junior developers are a large, growing, and commercially viable group. Their problems are well-defined and directly connected to P2, P3, and P6. They also represent long-term retention value, a product that helps them grow as professionals earns sustained engagement over years.

---

## User Group 6: Professionals Upskilling

### Description

Experienced software professionals (3+ years) who need to learn new areas of Computer Science outside their current expertise. Examples: a frontend developer learning distributed systems, a web developer learning systems programming, a data analyst learning software engineering, or any professional expanding into adjacent technical domains.

### Current Situation

They are competent in their current domain. They have strong foundations in some areas of CS but gaps in others. They need to efficiently navigate unfamiliar areas of CS without starting from beginner material. They know how to learn, they lack the map of what to learn and the ability to identify where their existing knowledge ends and new knowledge must begin.

### Primary Goals

- Efficiently expand into new CS domains without redundant learning.
- Leverage existing knowledge as a foundation rather than starting from scratch.
- Achieve professional competence in the new domain, not just surface familiarity.

### Biggest Problems

- **P1 (Linear Delivery)**: Courses in the new domain start from the beginning. They need to enter the knowledge graph at the right point, not at the beginning.
- **P5 (Undefined Path)**: There is no reliable path from "I know X" to "I also know Y." Cross-domain learning paths don't exist.
- **P2 (No Knowledge Model)**: No system can recognize what they already know and use that as a starting point.

### Motivation

Career growth (expanding into higher-demand roles), professional necessity (their job now requires skills they don't have), or intellectual ambition (genuine interest in a new domain).

### Constraints

| Constraint | Detail |
|-----------|--------|
| Time | Limited. They are employed full-time in demanding roles. |
| Patience | Very low for redundant content. They will abandon a resource immediately if it covers ground they already know. |
| Expectations | High. They know what good learning looks like because they've done it before in their own domain. |
| Specificity | They need targeted learning, not comprehensive coverage. |

### Current Alternatives

- Documentation and official guides for new technologies.
- Advanced online courses (targeted at specific domains).
- Books (e.g., Designing Data-Intensive Applications for distributed systems).
- Peer learning from colleagues in the target domain.
- Conference talks and industry blog posts.

### Why Current Alternatives Fail

Advanced resources assume prerequisites that the professional may or may not have. There is no diagnostic step that identifies which prerequisites are met and which are not. The professional must self-assess, which is unreliable for domains they don't yet understand.

Courses designed for beginners waste their time. Courses designed for advanced learners may assume knowledge they lack. There is no adaptive middle path.

### Success Criteria

"I entered a new domain efficiently. The system recognized what I already knew, identified what I was missing, and took me directly to what I needed. I didn't waste time on material I'd already mastered."

### Priority

**Medium**

This group has real problems aligned with P1, P2, and P5. However, they are less severely affected than the Critical and High priority groups because they have existing competence, professional networks, and developed learning skills. They represent a strong long-term expansion audience but are not the right group to validate the core product.

---

## Comparison Matrix

| User Group | Main Goal | Urgency | Learning Difficulty | Market Size | Business Value | Priority |
|-----------|-----------|---------|-------------------|-------------|---------------|----------|
| Self-Directed Learners | Acquire genuine CS competence independently | High | Very High | Very Large | Medium | **Critical** |
| Career Switchers | Become employable in tech | Very High | High | Large | High | **Critical** |
| University CS Students | Truly understand their curriculum | Medium | Medium | Very Large | Medium | **High** |
| Bootcamp Graduates | Fill foundational CS gaps | High | Medium | Medium | High | **High** |
| Junior Developers | Strengthen foundations for career growth | Medium | Medium | Large | High | **High** |
| Professionals Upskilling | Expand into new CS domains | Low-Medium | Low-Medium | Large | High | **Medium** |

---

## Primary Target User Recommendation: Self-Directed Learners

### Recommendation

The primary target user for Version 1 should be **Self-Directed Learners**.

### Justification

**Problem Severity.** Self-directed learners experience the full spectrum of problems (P1-P8) with the highest cumulative severity. They have no institutional structure, no guided path, no feedback mechanism, and no knowledge model. Every structural failure in CS education hits them without any buffer.

**Product Fit.** The core problems that justify this product, absent knowledge modeling, linear delivery of non-linear knowledge, broken feedback, undefined paths, are precisely the problems that self-directed learners face most acutely. If the product solves these problems for self-directed learners, it solves them for everyone. The reverse is not true.

**Ease of Validation.** Self-directed learners are highly accessible through online communities (Reddit, Discord, Twitter, dev.to). They are actively seeking solutions, willing to try new products, and articulate about their pain points. Feedback cycles can be fast.

**Ability to Collect Feedback.** This group is self-selected for engagement. They chose to learn on their own, which means they are motivated enough to provide detailed feedback about what works and what doesn't.

**Long-Term Strategic Value.** If the product earns trust with self-directed learners, it builds credibility that extends to every other group. Self-directed learners become career switchers, junior developers, and eventually professionals who upskill. They are the entry point to a lifelong relationship.

**Why not Career Switchers first?** Career switchers have the highest urgency and willingness to pay, making them an attractive first market. However, their needs are heavily oriented toward career outcomes (P5, P8), which are downstream of the foundational problems (P1, P2, P3). Building for career switchers first risks optimizing for job placement before the core learning infrastructure (knowledge modeling, feedback, adaptive delivery) is validated. Self-directed learners validate the foundation. Career switchers validate the career layer built on top of it.

> *Requires Founder Decision: This recommendation prioritizes foundational validation over near-term monetization. If the business requires revenue validation earlier, Career Switchers may be the better initial target. This is a strategic trade-off that only the Founder can resolve.*


## Future Stakeholders (Out of MVP Scope)
- Universities
- Instructors
- Mentors
- Hiring Managers
- Companies
- Training Centers

These are not primary users of Version 1 but may become important stakeholders in future product phases.

---

*End of Document*
