# Product Scope

**Project:** LearnCS  
**Document:** Product Scope  
**Phase:** 0, Project Discovery  
**Status:** Draft: Pending Founder Approval

---

# 1. Purpose

This document defines the official scope of LearnCS.

Its purpose is to establish clear boundaries around what the product is expected to do, what it deliberately does not attempt to solve, and what capabilities belong to future phases.

Without explicit scope definition, every future feature request becomes difficult to evaluate, increasing product complexity, implementation cost, and strategic drift.

This document serves as the primary scope reference for Product Management, UX Design, System Architecture, Engineering, and future roadmap planning.

---

# 2. Scope Philosophy

The scope of LearnCS is driven by problems, not ideas.

Every capability included in the product must satisfy all of the following conditions:

- Solves at least one documented problem.
- Supports at least one documented Job To Be Done.
- Aligns with every Product Principle.
- Produces measurable learning value.
- Contributes toward the core vision of LearnCS.

Ideas that do not satisfy these conditions are considered out of scope regardless of their popularity or technical feasibility.

---

# 3. Scope Definition

LearnCS exists to manage and improve the complete learning journey of Computer Science learners through continuous understanding assessment, structured knowledge progression, and long-term learning guidance.

The product scope includes everything required to help learners:

- Understand their current knowledge state.
- Discover gaps in understanding.
- Determine what should be learned next.
- Navigate Computer Science knowledge correctly.
- Measure genuine progress over time.
- Build confidence through evidence rather than completion.
- Connect learning progress with long-term professional growth.

The product does not attempt to replace universities, instructors, books, or educational content providers.

Instead, LearnCS focuses on orchestrating the learning process itself.

---

# 4. Scope Boundaries

The following table defines what belongs inside and outside LearnCS.

| Area | In Scope | Out of Scope |
|-------|----------|--------------|
| Knowledge Modeling | ✅ | |
| Learning Progress Tracking | ✅ | |
| Knowledge Gap Detection | ✅ | |
| Learning Guidance | ✅ | |
| Personalized Progression | ✅ | |
| Competency Measurement | ✅ | |
| Learning Analytics | ✅ | |
| Career Readiness Evaluation | ✅ | |
| Course Marketplace | | ❌ |
| Selling Courses | | ❌ |
| Video Hosting Platform | | ❌ |
| Social Media Platform | | ❌ |
| Freelancing Marketplace | | ❌ |
| Job Board | | ❌ |
| University Management System | | ❌ |
| Learning Management System (LMS) | | ❌ |
| General Productivity Tool | | ❌ |

---

# 5. Core Product Capabilities

The following capabilities define the core responsibilities of LearnCS.

These are product capabilities rather than implementation features.

## 5.1 Knowledge Understanding

The system maintains an accurate representation of what the learner currently understands.

Primary Objectives:

- Identify current understanding.
- Represent knowledge accurately.
- Continuously update learner state.

Supports:

- P2
- P3

Related JTBD:

- Know what I actually understand.
- Validate my understanding.

---

## 5.2 Knowledge Gap Identification

The product identifies missing prerequisite knowledge and conceptual weaknesses.

Primary Objectives:

- Detect missing concepts.
- Reveal hidden dependencies.
- Explain why a gap exists.

Supports:

- P1
- P2
- P5

Related JTBD:

- Find knowledge gaps.
- Discover what to learn next.

---

## 5.3 Learning Navigation

The product guides learners through Computer Science knowledge in an appropriate order based on their current understanding.

Primary Objectives:

- Recommend logical progression.
- Reduce uncertainty.
- Prevent fragmented learning.

Supports:

- P1
- P5
- P7

Related JTBD:

- Know what to learn next.
- Follow an effective learning journey.

---

## 5.4 Continuous Progress Measurement

Progress is measured by demonstrated understanding rather than completed activities.

Primary Objectives:

- Measure competence.
- Track improvement.
- Detect regression.

Supports:

- P2
- P3
- P4

Related JTBD:

- Track real progress.
- Know I'm improving.

---

## 5.5 Career Alignment

Learning progress should ultimately connect with professional readiness.

Primary Objectives:

- Evaluate readiness.
- Reveal missing competencies.
- Support long-term professional growth.

Supports:

- P6
- P8

Related JTBD:

- Prepare for professional work.
- Demonstrate competence.

---

# 6. Explicit Non-Scope

The following items are intentionally excluded from LearnCS Version 1 and should not influence architectural or product decisions unless explicitly approved in future roadmap phases.

## Educational Content Creation

LearnCS is not responsible for creating or owning educational content.

The platform may reference learning resources in the future, but content production itself is outside the product scope.

---

## Course Marketplace

LearnCS is not a marketplace where instructors sell courses.

No instructor economy is included within the current scope.

---

## Learning Management

LearnCS is not an LMS.

Responsibilities such as:

- Course administration
- Assignment distribution
- Classroom management
- Attendance
- Instructor grading

are outside the product scope.

---

## Recruitment Platform

Although career readiness is part of the learning journey, LearnCS is not a hiring platform.

The product does not include:

- Job postings
- Candidate sourcing
- Recruitment workflows
- Applicant tracking

---

## Community Platform

Community interaction is valuable but not essential for validating the core product.

Therefore, the following are excluded:

- Forums
- Public discussions
- Groups
- Social feeds
- Direct messaging

---

## Gamification

Gamification should never become the primary motivation for learning.

The initial product will not depend on:

- Coins
- Daily streaks
- Loot boxes
- Leaderboards
- Artificial engagement mechanics

Progress should be driven by genuine learning value.

---

# 7. MVP Scope

Version 1 exists to validate one hypothesis:

> LearnCS can help learners understand what they know, discover what they need next, and make measurable progress more effectively than traditional learning approaches.

Nothing should be included unless it contributes directly to validating this hypothesis.

---

## MVP Goals

The MVP should enable learners to:

- Determine their current knowledge state.
- Discover knowledge gaps.
- Understand prerequisite relationships.
- Know what to study next.
- Track learning progression.
- Build confidence through measurable understanding.

If a capability does not contribute to these goals, it should not be included in Version 1.

---

## MVP Success Criteria

The MVP is considered successful if users can consistently answer:

- What do I already understand?
- What don't I understand?
- Why don't I understand it?
- What should I learn next?
- Am I actually improving?

without external guidance.

---

# 8. Future Scope

The following capabilities are intentionally postponed.

They may become part of future product phases after validating the MVP.

## Phase 2 Candidates

- AI Mentor
- Mentor Collaboration
- Learning Recommendations from Community
- External Learning Resource Integration
- Advanced Learning Analytics
- Knowledge Sharing

---

## Phase 3 Candidates

- Career Matching
- Employer Dashboard
- Mentor Marketplace
- Certification Framework
- Institutional Dashboard
- Instructor Workspace

---

## Research Candidates

These ideas require validation before entering the roadmap.

- Team Learning
- Study Groups
- Company Learning Paths
- Research Mode
- Offline Learning
- Mobile Native Experience
- Public Knowledge Profiles

---

# 9. Scope Decision Matrix

Every proposed capability should pass the following evaluation before entering the roadmap.

| Question | Required |
|-----------|----------|
| Does it solve a documented problem? | Yes |
| Does it support a JTBD? | Yes |
| Does it align with Product Principles? | Yes |
| Does it increase measurable learning value? | Yes |
| Can it be validated in the MVP? | Preferred |
| Does it introduce unnecessary complexity? | No |
| Can the product succeed without it? | If Yes, postpone it |

If any mandatory condition fails, the capability should remain outside the current scope.

---

# 10. Feature Acceptance Criteria

Before any feature is approved for design or implementation, it must satisfy all of the following conditions.

## Problem Validation

The feature solves at least one documented problem.

---

## JTBD Alignment

The feature directly supports one or more documented Jobs To Be Done.

---

## Product Principle Compliance

The feature must not violate any approved Product Principle.

---

## Learning Value

The feature creates measurable improvement in learning effectiveness.

---

## Strategic Alignment

The feature contributes toward LearnCS becoming a Learning Operating System rather than another content platform.

---

## Complexity Justification

The value introduced by the feature must justify its implementation and maintenance cost.

---

## Founder Approval

If uncertainty exists regarding strategic alignment, implementation must not proceed until Founder approval.

---

# 11. Founder Decisions

The following decisions remain open.

| ID | Decision | Status |
|----|----------|--------|
| F-01 | Final MVP Definition | Pending |
| F-02 | Initial Market Launch Strategy | Pending |
| F-03 | Content Strategy | Pending |
| F-04 | Career Readiness Model | Pending |
| F-05 | AI Integration Scope | Pending |
| F-06 | Business Model | Pending |

---

# 12. Scope Approval Checklist

Before this document is approved, verify the following.

- [ ] Every in-scope capability supports at least one documented problem.
- [ ] Every capability maps to at least one JTBD.
- [ ] Scope boundaries are explicit.
- [ ] Future scope is separated from MVP scope.
- [ ] No implementation details appear in this document.
- [ ] No architectural decisions are included.
- [ ] Product Principles remain unviolated.
- [ ] Scope remains focused on the core LearnCS vision.

---

# 13. Traceability

| Source Document | Dependency |
|-----------------|------------|
| 01 - Project Overview | Product Vision |
| 02 - Problem Statement | Problem Boundaries |
| 03 - Target Users | User Scope |
| 04 - Jobs To Be Done | Product Responsibilities |
| 05 - Product Principles | Decision Framework |
| 06 - User Personas | User Context |
| 07 - User Journey | Journey Coverage |

---

# 14. Approval

**Status:** Draft: Pending Founder Approval

Once approved, this document becomes the official reference for defining:

- MVP Definition
- Feature Inventory
- User Stories
- Functional Requirements
- System Design
- Product Roadmap

No future capability should bypass this document without explicit Founder approval.

