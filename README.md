# LearnCS: Canonical Computer Science Learning Platform

LearnCS is a full-stack, bilingual (**English / Arabic**, LTR & RTL with LTR code blocks) Computer Science educational platform built with **Next.js 16 (App Router + TypeScript)**, **ASP.NET Core (.NET 10)**, and **PostgreSQL 18 (EF Core)**.

## Core Architecture Highlights

- **Canonical Concept & Reusable Learning Unit Graph**:
  - `CanonicalConcept` -> `ReusableLearningUnit` -> `UnitSection` (`theory`, `code`, `interactive`, `pitfalls`, `summary`, plus curated external documentation references).
  - Shared foundational units (such as `unit-arrays-foundations`, `unit-recursion-foundations`, `unit-complexity-foundations`, `unit-binary-search-foundations`, `unit-graphs-foundations`, `unit-dm-counting-recurrences`, `unit-se-design-principles`) are referenced across multiple paths without content duplication; completing a unit once automatically counts across every path referencing it.
  - Graph prerequisites (`hard_lock` and `recommended`) are evaluated on the backend, with elevated preview access for `SuperAdmin`, `Admin`, and `ContentManager`.
- **Full Curriculum Scale (DB-Seeded & Validated)**:
  - **9 Learning Paths** organized across 5 thematic roadmap track areas (`Foundations`, `CS Core`, `Problem Solving & CP`, `Systems & SE`, `Data & Databases`) plus an interactive **Curriculum Tree Overview** modal.
  - **28 Modules**, **40 Canonical Concepts**, **48 Reusable Learning Units**, **266 Structured Lesson Sections**, and **7 Shared Cross-Path Units**.
  - **Auto-Resume & Code Walkthrough Trace**: Persists `LastSectionId` via `POST /api/curriculum/units/{unitId}/visit`, with `[Copy]` and `[Run Trace]` panels inside lesson code sections.
  - **19 Interactive Lab Visualizers** localized in EN and AR with speed (`0.5x | 1x | 2x`) and playback controls on animated labs.
- **Balanced Assessment Question Bank & Retry Variety**:
  - **480** balanced bilingual questions across **10 CS domains** with **553** unit-to-question mappings (`backend/src/LearnCS.Infrastructure/Seeding/question-bank-seed.json`), balanced across answer slot positions (`25%` per slot) and without length bias.
  - Section checkpoints (`POST /api/curriculum/sections/{sectionId}/complete`) and randomized unit mastery quizzes (`POST /api/curriculum/units/{unitId}/quiz/start` & `submit`) exclude questions seen in the last 3 attempts while pool variety permits, shuffle option display order per attempt, never leak answer keys early, and grade securely server-side.
  - Diagnostic skill baseline (`POST /api/progress/diagnostic`) syncs personalized strong/weak domain breakdowns and path recommendations into PostgreSQL and surfaces them on `/dashboard`.
- **Subscriptions, Gamification & Admin Portal**:
  - 4 subscription tiers (`plan-free`, `plan-mini`, `plan-ready`, `plan-high`) enforcing **at most one active pending plan-change request per user** (`ix_subscription_requests_user_active_pending`), superseding prior pending requests automatically while keeping existing active subscriptions intact if rejected.
  - Live XP, Study Streaks, and 11 database-evaluated Achievements (`GamificationEvaluator`).
  - Dedicated Admin Portal (`/admin`, `/admin/users`, `/admin/curriculum`, `/admin/subscriptions`) with metrics telemetry, user & RBAC role management, unit/section/question editing, curriculum coverage reporting, and audit logs.

---

## Project Structure

- `backend/`: ASP.NET Core Web API (`LearnCS.API`), Domain, Application, Infrastructure (EF Core Migrations + `DataSeeder` + `CurriculumSeeder`), and `LearnCS.Application.Tests` (xUnit).
- `frontend/`: Next.js App Router frontend, Tailwind CSS UI components, bilingual i18n, interactive curriculum visualizers, and curriculum/question-bank TypeScript sources & validation scripts.
- `scripts/`: Windows PowerShell helpers: `dev.ps1`, `health-check.ps1`, and `stop-dev.ps1`.
- `docs/` & `ARCHITECTURE.md`: System specifications, database design, and architectural documentation.

---

## Local Setup & Running

### 1. Prerequisites
- .NET 10 SDK
- Node.js 20+ & npm
- PostgreSQL 18 running locally on `127.0.0.1:5432`

### 2. Environment Configuration
1. Copy `backend/src/LearnCS.API/appsettings.Development.Example.json` to `backend/src/LearnCS.API/appsettings.Development.json` and configure your local PostgreSQL connection string (`learncs_dev`) and local development JWT key. *(Never commit real secrets; `.gitignore` excludes local dev secret files and `.env*`.)*
2. Copy `frontend/.env.example` to `frontend/.env.local` (or let `scripts/dev.ps1` create it automatically), pointing `API_PROXY_URL` to `http://127.0.0.1:5058`.

### 3. Database Migration & Seeding
```powershell
dotnet ef database update --project backend/src/LearnCS.Infrastructure --startup-project backend/src/LearnCS.API
```
On API startup in Development, `DataSeeder` and `CurriculumSeeder` automatically seed roles, 4 subscription plans, 11 achievements, development accounts, all 9 learning paths / 48 units / 266 sections, and all 480 balanced question-bank items idempotently.

**Required environment variables for seeding development accounts:**

| Variable | Purpose |
|---|---|
| `LEARNCS_DEV_ADMIN_PASSWORD` | Password for the SuperAdmin bootstrap account (`admin@learncs.dev`). |
| `LEARNCS_DEV_LEARNER_PASSWORD` | Password for the first demo learner (`ahmed@learncs.dev`). |
| `LEARNCS_DEV_LEARNER2_PASSWORD` | Password for the second demo learner (`sara@learncs.dev`). |
| `LEARNCS_RESET_DEV_ADMIN` | *(Optional)* Set to `true` to force-reset the admin password on next startup. |

If any required password variable is missing, the application will throw a clear `InvalidOperationException` at startup rather than falling back to a default password. Set them in your shell, a `.env` file loaded by your process manager, or via `dotnet user-secrets`.

### 4. Start Development Servers
```powershell
./scripts/dev.ps1
./scripts/health-check.ps1
# Stop servers cleanly when done:
./scripts/stop-dev.ps1
```

---

## Verification & Validation Commands

```powershell
# Backend unit & controller test suite (144 tests)
dotnet test backend/LearnCS.sln --no-restore

# Curriculum graph, question bank quality, punctuation guard, & assessment engine validators
cd frontend
npx tsx scripts/validate-architecture.ts
npx tsx scripts/validate-curriculum.ts
npx tsx scripts/validate-qbank-quality.ts
npx tsx scripts/validate-punctuation.ts
npx tsx scripts/test-engine.ts

# Frontend TypeScript check & production build
npx tsc --noEmit
npm run build
```
