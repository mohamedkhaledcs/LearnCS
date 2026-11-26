# LearnCS Project Rules & Documentation

This file is the permanent source of truth for the LearnCS project architecture, decisions, and constraints. Update this file whenever major architectural or UX decisions are made.

## 1. Project Overview
LearnCS is a premium, adaptive learning platform for Computer Science. It is not a basic coding bootcamp; it is a cinematic, deeply educational experience that helps students discover their career path, assess their current baseline, and eventually generate a personalized CS roadmap.

## 2. Architecture
- **Frontend:** Next.js (App Router), React, TailwindCSS, TypeScript.
- **Backend:** ASP.NET Core (.NET 10) Clean Architecture API + Entity Framework Core + PostgreSQL 18 (`learncs_dev`), handling authentication (JWT), canonical curriculum delivery, diagnostic persistence, unit quiz grading, XP/streaks/achievements, and subscription requests.

## 3. Assessment Engine & Punctuation Rules
- **Security:** The client must NEVER receive `correctAnswer` or `IsCorrect` prior to quiz submission. Both `getDiagnosticAssessment` and `POST /api/curriculum/units/{unitId}/quiz/start` strip answer keys and explanations cleanly.
- **Fairness & Variety:** Unit quiz retries exclude questions seen across the learner's last 3 attempts when pool size permits and shuffle displayed option order per attempt. Question bank options must balance correct answer slot positions (~25% per slot) and keep length bias strictly controlled (`< 35%` strictly longest).
- **Randomization:** Assessments sample deterministically across domains and difficulties without repeating static hardcoded exams.
- **Zero Forbidden Dashes:** NEVER use the Unicode em dash (`U+2014`) or en dash (`U+2013`) in any content, UI, code comments, seed JSON, or documentation. Enforce continuously with `npx tsx scripts/validate-punctuation.ts`.
- **Single Active Pending Subscription Request:** A learner may have at most ONE pending plan-change request at any time (enforced via backend transaction + PostgreSQL partial unique index); switching plans supersedes the previous pending request while preserving active paid/free access until approval or rejection.
- **Hierarchical Question Bank:** Questions are organized cleanly in `lib/assessment/data/[domain]/[topic].ts` and synced into `question-bank-seed.json`.
- **Code Questions:** Code blocks must ALWAYS enforce `dir="ltr"` and `text-left` even when the UI is in Arabic. Code is never translated.

## 4. UI / UX Rules
- **Aesthetic:** Premium, technical, cinematic, elegant, and dark (dark/neon aesthetic). 
- **Restraint:** Avoid neon overload. Use subtle gradients, sophisticated borders, and low visual noise. Avoid childish emojis.
- **Interactive States:** Hover, focus, and active states should feel smooth and responsive, not jumpy.
- **Animations:** Use GSAP for complex scroll choreographies (e.g., the landing page). Use Framer Motion for simple component-level transitions (e.g., flipping questions in the Assessment). Do not break keyboard accessibility with animations.
- **Three.js:** Used sparingly for premium backgrounds (e.g., a subtle node network). Must be highly performant, low-poly, and never distract from readable text.

## 5. Localization & Terminology Rules
- The application supports English (`en`) and Arabic (`ar`).
- Arabic mode uses full RTL layout switching.
- English mode uses standard LTR.
- Text must feel natural, not mechanically translated.
- **Technical Terminology:** Do NOT blindly translate every Computer Science term into Arabic. Many technical terms must remain in English because this is a Computer Science learning platform.
  - Correct examples: Array, Algorithm, Algorithms, Database, Databases, Node, Nodes, Binary Search, Linked List, Stack, Queue, Tree, Graph, Pointer, API, Function, Class, Object.
  - Incorrect translations to avoid: مصفوفة, خوارزمية, قاعدة بيانات, عقدة.
- General UI language and broad topic names can still be Arabic (e.g., Operating Systems -> أنظمة التشغيل, Networking -> الشبكات).
- Code questions: Code blocks must ALWAYS enforce `dir="ltr"` and `text-left` even when the UI is in Arabic. Code is never translated.
- **Keyboard Shortcut:** Users can toggle languages globally using `L`, `l`, or `م`. The UI shortcut hint must strictly show `L` without showing the Arabic mapping (`م`), to represent the physical key conceptually.

## 6. Authentication & Routing Rules
- The `Maybe Later` CTA on the landing page routes to `/discovery`, not `/dashboard`, as it means "I don't want the technical assessment yet", not "I am fully onboarded".
- On the Assessment page, the "Back to Discovery" contextual routing must respect authentication state:
  - Logged In -> Route to `/dashboard`
  - Logged Out -> Route to `/discovery`

## 7. Branding Rules
- **No Green Dot:** There must NEVER be a green status-like dot (or circle) next to the "LearnCS" or "LearnCS Diagnostic" branding. The text/logo must remain clean.

## 8. Things We Want
- Thousands-ready data architecture.
- Real CS depth (not just trivia).
- Keyboard accessibility on desktop (Arrows, Enter, Backspace).

## 8. Things We Avoid
- Exposing answer keys to the browser.
- "All/None of the above" causing multiple-selection bugs.
- Artificial delays between questions.
- Overusing Tailwind `!important` or unstructured CSS.
