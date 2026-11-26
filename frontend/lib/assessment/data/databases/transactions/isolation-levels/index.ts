import { AssessmentQuestion } from '@/lib/assessment/schema';

export const isolation_levels_questions: AssessmentQuestion[] = [
{
  "id": "DB-ISO-H-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Transactions",
  "subtopic": "Isolation Levels",
  "specialization": "Anomalies",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Which read anomaly occurs when Transaction A reads a committed row twice and gets different values because Transaction B committed an UPDATE in between?",
    "ar": "أي خلل في التزامن يحدث عندما تقرأ المعاملة A نفس الصف مرتين وتجد قيمتين مختلفتين لأن المعاملة B ثبّتت تعديلاً عليه بين القراءتين؟"
  },
  "options": [
    {
      "id": "dirty",
      "text": {
        "en": "Dirty Read (reading uncommitted rollbackable data)",
        "ar": "Dirty Read"
      }
    },
    {
      "id": "lost",
      "text": {
        "en": "Syntax Anomaly",
        "ar": "Syntax Anomaly"
      }
    },
    {
      "id": "nonrep",
      "text": {
        "en": "Non-Repeatable Read",
        "ar": "Non-Repeatable Read"
      }
    },
    {
      "id": "phantom",
      "text": {
        "en": "Buffer Overflow",
        "ar": "Buffer Overflow"
      }
    }
  ],
  "correctAnswer": "nonrep",
  "explanation": {
    "en": "Reading uncommitted changes is a Dirty Read; reading different committed values for the same row across two queries is a Non-Repeatable Read; seeing newly inserted matching rows is a Phantom Read.",
    "ar": "قراءة بيانات غير مثبتة هي Dirty Read، أما تغير قيمة صف مثبت بين قراءتين في نفس المعاملة فهو Non-Repeatable Read."
  },
  "tags": [
    "databases",
    "acid",
    "concurrency"
  ]
} as AssessmentQuestion
];
