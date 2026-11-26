# LearnCS Curriculum Architecture & Graph Integration

This document defines the complete multi-layer curriculum architecture, learning paths, graph-based prerequisites, unified progress tracking, interactive visualizers, assessment integration, career exploration, and validation engine within the LearnCS learning platform.

---

## 1. Architectural Philosophy

LearnCS avoids monolithic, siloed courses. In traditional systems, "Arrays" or "Binary Search" are taught separately inside an Algorithms course and duplicated inside a Competitive Programming course, leading to duplicated content and redundant work for learners.

In LearnCS:
- **Canonical Concept:** Every Computer Science subject has **ONE** stable canonical identity (`CanonicalConcept`).
- **Reusable Learning Units:** A concept is decomposed into pedagogical depth layers (`ReusableLearningUnit`).
- **Learning Paths & Modules:** Paths do not "own" content; they **reference** reusable units.
- **Unified Progress:** Progress is permanently bound to the global `unitId`. When a student completes a foundational unit in one path, that mastery is instantly recognized across all other paths referencing that same unit.
- **Graph-Driven Prerequisites:** Progression is never determined by artificial UI indexes (e.g., `cardIndex > 3`). Locks and unlocks are computed strictly from the dependency graph.

```
CanonicalConcept (e.g. concept-binary-search)
   ├── ReusableLearningUnit [Foundations] (e.g. unit-binary-search-foundations)
   │     ├── Theory / Code / Visualizer / Practice Quiz
   │     └── Referenced by: Algorithms Path & Competitive Programming Path
   └── ReusableLearningUnit [Advanced CP] (e.g. unit-binary-search-on-answer)
         ├── Advanced Monotonic Feasibility Predicates
         └── Referenced by: Competitive Programming Path (Requires Foundations)
```

---

## 2. Core Entities & Schemas

### 2.1 CanonicalConcept
Represents the umbrella identity of a topic.
- **Definition:** `frontend/lib/curriculum/schema/concept.ts`
- **Registry:** `frontend/lib/curriculum/registries/concept-registry.ts`
- **Fields:**
  - `id`: Globally unique identifier (e.g., `concept-arrays`, `concept-binary-search`, `concept-sql`).
  - `title`: Bilingual localized title (`en`, `ar`).
  - `description`: Conceptual overview.
  - `units`: Array of `ReusableLearningUnit` objects representing the depth layers of this concept.

### 2.2 ReusableLearningUnit
The atomic learning experience card.
- **Fields:**
  - `id`: Globally unique unit identifier (e.g., `unit-arrays-foundations`, `unit-stacks-queues-foundations`).
  - `title` & `description`: Bilingual localized metadata.
  - `difficulty`: `"beginner"` | `"intermediate"` | `"advanced"`.
  - `estimatedMinutes`: Estimated completion time.
  - `tags`: Domain identifiers (e.g., `["arrays", "memory", "cp"]`).
  - `prerequisites`: Optional array of `PrerequisiteRule`s.
  - `interactiveModuleIds`: Registered interactive visualizers (e.g., `["binary-search-visualizer"]`, `["sorting-visualizer"]`).
  - `sections`: Structured array of educational sections (`theory`, `code`, `interactive`, `summary`).
  - `assessmentQuestionIds`: Array of question IDs mapped directly to `QUESTION_BANK`.
  - `externalProblemReferences`: Optional curated references to external platforms (LeetCode, Codeforces, CSES).

### 2.3 LearningPath & LearningModule
Learning paths assemble structured journeys across modules and units.
- **Definition:** `frontend/lib/curriculum/schema/path.ts`
- **Registry:** `frontend/lib/curriculum/registries/path-registry.ts`
- **All 9 Registered Paths:**
  1. `pre-programming`: Hardware architecture, Von Neumann model, bits/bytes, internet basics, and how code executes.
  2. `programming-fundamentals`: Variables, conditionals, loops, functions, stack/heap memory, recursion, and arrays.
  3. `object-oriented-programming`: Classes, constructors, encapsulation, inheritance, polymorphism, and SOLID design principles.
  4. `discrete-mathematics`: Propositional logic, truth tables, sets, relations, proof techniques, counting, and recurrences.
  5. `data-structures`: Contiguous arrays, linked lists, stacks/queues, hash tables, BST/AVL/tries, heaps, and graphs.
  6. `algorithms`: Complexity analysis (Big-O), linear/binary search, sorting, recursion/backtracking, greedy, DP, and BFS/DFS/shortest paths.
  7. `competitive-programming`: Contest rules (10^8 ops/sec), two pointers, prefix sums, binary search on answer, number theory, segment trees, and graph patterns.
  8. `databases`: Relational model, SQL fundamentals, joins & aggregations, normalization (1NF, 2NF, 3NF, BCNF), indexing, and ACID transactions.
  9. `systems-and-engineering`: OS processes, CPU scheduling, virtual memory, TCP/IP & HTTP/DNS protocols, SOLID design, Git, and automated testing.

### 2.4 PrerequisiteRule & Unlock Evaluation
Prerequisites are declarative rules evaluated dynamically by `CurriculumService.evaluatePrerequisites()`.
- **Enforcement:**
  - `"hard_lock"`: Unit is strictly locked until prerequisites are satisfied.
  - `"recommended"`: Unit is available, but a warning/recommendation alert is displayed.
- **Conditions:**
  - `{ type: "unit", targetId: "unit-id" }`: Requires completion of a specific unit.
  - `{ type: "path", targetId: "path-id" }`: Requires 100% completion of an entire path.
- **Operators:** `"all"` (AND) or `"any"` (OR).

---

## 3. Shared Content & Cross-Path Reuse Examples

To avoid duplicating content, foundational units are registered once and referenced across multiple learning paths:

| Reusable Learning Unit | Canonical Concept | Referencing Paths |
| :--- | :--- | :--- |
| `unit-arrays-foundations` | `concept-arrays` | **Programming Fundamentals**, **Data Structures**, **Competitive Programming** |
| `unit-complexity-foundations` | `concept-complexity` | **Algorithms**, **Competitive Programming** |
| `unit-binary-search-foundations` | `concept-binary-search` | **Algorithms**, **Competitive Programming** |
| `unit-graphs-foundations` | `concept-graphs` | **Data Structures**, **Algorithms** |

### Cross-Path Progress Flow:
1. Learner enters `/roadmap?path=algorithms`.
2. Learner completes `unit-binary-search-foundations`.
3. Learner switches to `/roadmap?path=competitive-programming`.
4. Result: `unit-binary-search-foundations` is already marked **COMPLETED** (green checkmark).
5. Result: The advanced unit `unit-binary-search-on-answer` (which required `unit-binary-search-foundations`) is now automatically **UNLOCKED**.

---

## 4. Interactive Learning Architecture

Interactive experiences are first-class citizens in LearnCS, governed by `frontend/components/curriculum/interactive-registry.tsx`.

### Implemented Visualizers (19 Modules in `interactive-registry.tsx`):
1. `cpu-cycle-visualizer.tsx`: Von Neumann Fetch-Decode-Execute pipeline & registers.
2. `binary-converter-visualizer.tsx`: Binary, octal, decimal, hexadecimal, and character encoding converter.
3. `truth-table-visualizer.tsx`: Boolean gates, truth tables, and logic simplification.
4. `network-packet-visualizer.tsx`: Encapsulation layers, DNS/HTTP request-response & TCP 3-way handshake.
5. `variables-visualizer.tsx`: RAM variable cells, types, and memory assignments.
6. `loops-visualizer.tsx`: Step-by-step loop execution with condition and iteration logs.
7. `oop-dispatch-visualizer.tsx`: Inheritance & dynamic vtable/polymorphism dispatch lab.
8. `linked-list-visualizer.tsx`: Singly & doubly linked pointer traversal/insertion.
9. `stack-visualizer.tsx`: LIFO `Push`, `Pop`, and `Peek` operations.
10. `queue-visualizer.tsx`: FIFO circular `Enqueue` and `Dequeue` visualization.
11. `hash-table-visualizer.tsx`: Hash bucket distribution and collision resolution.
12. `tree-bst-visualizer.tsx`: Binary Search Tree insertion and DFS/BFS traversals.
13. `graph-traversal-visualizer.tsx`: BFS/DFS graph exploration on weighted/unweighted graphs.
14. `binary-search-visualizer.tsx`: Monotonic binary search and Binary Search on Answer `left/right/mid` tracing.
15. `two-pointers-visualizer.tsx`: Dual-index and sliding-window scanning on arrays.
16. `sorting-visualizer.tsx`: Interactive comparison and element swaps across sorting algorithms.
17. `dp-table-visualizer.tsx`: Bottom-up dynamic programming table state transitions.
18. `sql-query-visualizer.tsx`: Interactive SQL `SELECT/JOIN/GROUP BY` pipeline execution.
19. `os-scheduler-visualizer.tsx`: FCFS, SJF, Priority, and Round Robin Gantt chart simulator.

---

## 5. Lesson Playlist Experience & Completion Flow

LearnCS uses a structured mini-playlist model inside each unit:
`Lesson Content (Objectives -> Theory -> Code -> Interactive Lab -> External Materials) -> Mastery Quiz -> Validation -> Persistence -> Next Unit Unlock`.

- **Strict Quiz Gating:** Learners cannot bypass learning requirements by clicking a premature "Complete" button.
- **Multi-Chapter Playlist & Auto-Resume:** Each of the 48 units delivers sequential structured chapters (`theory`, `code` with interactive `[Copy]` & `[Run Trace]` console, `interactive`, `pitfalls`, `summary`, and curated external study references). Navigation updates `UserUnitProgress.LastSectionId` via `POST /api/curriculum/units/{unitId}/visit`.
- **Quiz Variety & No Early Leaks:** `POST /api/curriculum/units/{unitId}/quiz/start` excludes questions seen across the learner's last 3 unit attempts when pool size permits, shuffles display option order per attempt, and never sends answer keys or explanations prior to submission.
- **Passing Threshold:** Learners must achieve at least 60% on the dynamically selected quiz questions to unlock the unit.
- **Progress Persistence:** Unit completion and diagnostic skill snapshots (`LearnerLevelRecord`) are stored in PostgreSQL with full audit history.
- **SuperAdmin Bypass:** Super Admins and Admins automatically bypass prerequisite hard locks to inspect and audit curriculum content seamlessly.

---

## 6. Bilingual Localization & Keyboard Shortcut

The platform provides an authentic English and Arabic learning experience:
- **Instant Keyboard Shortcut:** Pressing the physical `L` key immediately toggles the active language between English and Arabic without reloading the page.
- **Input Field Protection:** Typing in text inputs, textareas, code editors, or contenteditable elements will never trigger the language switch.
- **Natural Terminology:** Technical terminology (`Hardware & Operating Systems`, `CPU`, `RAM`, `SQL`, `Stack`, `Queue`, `Binary Search`, `API`, `Git`, `HTTP`) remains in standard industry English rather than awkward literal translations (e.g. avoiding "العتاد").
- **Bidirectional Layout:** Document direction (`dir="ltr"` or `dir="rtl"`) synchronizes instantly while preserving LTR syntax highlighting for all code blocks.

---

## 7. Help Center & Guided Platform Knowledge

Located at `/help`:
- Accessible from the platform sidebar with bilingual support and topic categorization.
- Comprehensive guides for:
  - Platform Architecture & Roadmap Navigation
  - Prerequisite Graphs & Hard Locks
  - Interactive Simulations & `[ Run ]` Demonstrations
  - Mastery Quizzes & Scored Unlocks
  - Language Shortcut (`L` Key)
  - Subscription Plans & Student Accounts
  - Technical Issue Reporting

---

## 8. Administrative Operations & Content Management

Located under `/admin`:

### 8.1 User & Role Management (`/admin/users`)
- **Role Elevation:** Promote/demote user roles between `User`, `Admin`, and `SuperAdmin` with confirmation modals and backend permission checks (`PUT /api/admin/users/{id}/role`).
- **Subscription Tier Assignment:** Directly assign subscription plans (`Free`, `Premium`, `Ready`, `High`, `Enterprise`) with real-time audit logging (`PUT /api/admin/users/{id}/subscription`).
- **Account Status Enforcement:** Suspend or reactivate accounts with immediate session invalidation (`PUT /api/admin/users/{id}/status`).
- **User Inspector:** Inspect user profile, streak statistics, completed units, and enrollment timelines.

### 8.2 Curriculum & Content Editor (`/admin/curriculum`)
- **Multi-Level Hierarchy:** Navigate from Learning Path -> Module -> Reusable Unit -> Lesson Pages -> External Materials -> Questions.
- **Unit Metadata Editing:** Edit English and Arabic titles, descriptions, difficulty, and estimated durations.
- **Section Management:** Create, edit, and delete theory markdown sections and code walkthroughs.
- **External Resources Management:** Link documentation, practice problems (LeetCode/Codeforces/CSES), and educational videos with URL validation.
- **Assessment Management:** Query the central `QUESTION_BANK` and attach or remove question IDs to units.
- **Live Preview:** Instant "Preview Unit in Roadmap" button to test modifications immediately.

---

## 9. Subscription & Single-Pending Request Architecture

Located at `/plans` and `/admin/subscriptions`:
- **Transparent Tier Display:** Displays Free, Mini, Ready, and High plans with monthly and annual pricing.
- **Single Active Pending Request Invariant:** Enforced both inside the transactional controller (`SubscriptionsController.SelectPlan`) and by the PostgreSQL partial unique index `ix_subscription_requests_user_active_pending` (`status = 0`). Switching plans supersedes prior pending requests cleanly while preserving audit records and keeping the learner's current active plan intact until admin approval or rejection.

---

## 10. Verification & CLI Commands

```bash
# 1. Run curriculum graph, question bank quality, & punctuation validators (9 paths, 28 modules, 40 concepts, 48 units, 266 sections, 480 questions)
cd frontend && npx tsx scripts/validate-architecture.ts && npx tsx scripts/validate-curriculum.ts && npx tsx scripts/validate-qbank-quality.ts && npx tsx scripts/validate-punctuation.ts

# 2. Run TypeScript compilation & Next.js production build
cd frontend && npx tsc --noEmit && npm run build

# 3. Run backend .NET test suite (144 tests passing)
dotnet test backend/LearnCS.sln --no-restore

# 4. Start full-stack dev servers & check health (PowerShell)
./scripts/dev.ps1
./scripts/health-check.ps1
```

