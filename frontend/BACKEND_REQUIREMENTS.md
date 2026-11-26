# LearnCS Backend Requirements & Future Architecture

This document tracks the backend systems, database schemas, and external API requirements needed to transform LearnCS from its current frontend-only implementation into a fully functional product.

---

## 1. Core Database Entities (Schema Outline)

### User Profile
- `id` (UUID)
- `email` (string, unique)
- `full_name` (string)
- `joined_at` (timestamp)
- `settings` (JSON - preferences, language)

### Progress & Roadmaps
- `user_id` (UUID, foreign key)
- `current_phase` (string/enum)
- `completed_topics` (array of topic IDs)
- `assessment_history` (JSON array of past diagnostic results)
- `roadmap_state` (JSON representing the generated learning path)

### Streaks & Activity
- `user_id` (UUID, foreign key)
- `current_streak` (integer)
- `longest_streak` (integer)
- `last_activity_date` (timestamp)
- `total_learning_time_seconds` (integer)

### Achievements
- `user_id` (UUID, foreign key)
- `achievement_id` (string)
- `unlocked_at` (timestamp)

---

## 2. Event-Driven Email System

To avoid spamming the user and build a premium product feel, the email system should be strictly event-driven. 

### Recommended Events
1. **Account Created:**
   - **Trigger:** User completes `/signup` and roadmap is saved.
   - **Data Required:** User's first name, a high-level summary of their phase 1 roadmap.
   - **Content:** Welcome to LearnCS. Your foundation starts now.

2. **Welcome Back (Re-engagement):**
   - **Trigger:** User logs in after > 14 days of inactivity.
   - **Data Required:** Next recommended topic.
   - **Content:** Pick up where you left off.

3. **Achievement Unlocked:**
   - **Trigger:** Server calculates a new achievement condition is met (e.g., 7-day streak).
   - **Data Required:** Achievement icon URL, name, and description.
   - **Content:** Congratulations on your milestone.

4. **Phase Complete:**
   - **Trigger:** User completes all topics in a major roadmap phase.
   - **Data Required:** Phase name, next phase preview.
   - **Content:** You've mastered Phase X. Here is what comes next.

*Note: Do not implement an SMTP server or fake email API in the frontend. When ready, integrate a service like Resend or SendGrid via Next.js Server Actions.*

---

## 3. Learning System Rules Foundation

Future progression will rely on concrete rules validated by the backend to prevent cheating or inconsistent state.

- **Phase Unlocking:** A phase is unlocked only when all mandatory `topic_id`s in the prerequisite phase have a status of `completed` with a quiz score >= 80%.
- **Streak Calculation:** A streak is incremented if a user submits at least 1 correct answer to an assessment or topic quiz within a 24-hour window (based on the user's local timezone). Missing a 24-hour window resets `current_streak` to 0.
- **Progress Calculation:** Roadmap percentage = `(completed_topics / total_topics_in_roadmap) * 100`.

---

## 4. AI Architecture Preparation

LearnCS will eventually integrate AI models (e.g., Gemini) to provide adaptive experiences. **Do not build fake AI APIs in the frontend.**

### Planned Integration Points
- **Weakness Analysis (`/api/ai/analyze-gaps`):**
  - **Input:** The raw JSON array of the user's diagnostic assessment answers.
  - **Output:** A structured JSON summary explaining the user's specific misconceptions (e.g., "The user consistently struggles with dynamic memory vs static memory").
- **Dynamic Recommendations:**
  - Instead of static topic lists, the AI will re-order the roadmap queue based on recent quiz failures, inserting "Refresher" topics dynamically.
- **AI Mentor Chat:**
  - A persistent sidebar chat context-aware of the user's current topic (e.g., "Explain how this specific algorithm works").

---

## 5. Security & Authentication
- **Current State:** The frontend uses a mock `localStorage.setItem("learncs_auth", "true")` for UI development.
- **Future State:** Implement NextAuth.js or Supabase Auth. Route protection must move to Next.js Middleware (`middleware.ts`) to securely protect the `/dashboard`, `/roadmap`, and `/profile` routes.
