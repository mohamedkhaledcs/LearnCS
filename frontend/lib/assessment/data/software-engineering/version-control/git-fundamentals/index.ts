import { AssessmentQuestion } from '@/lib/assessment/schema';

export const git_fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "SE-GIT-E-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Version Control",
  "subtopic": "Git Fundamentals",
  "specialization": "Three Trees",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What command records your staged snapshot in the Staging Area (Index) permanently into the local Git repository history?",
    "ar": "ما الأمر الذي يحفظ التغييرات المجهزة في منطقة الانتظار (Staging Area) داخل سجل Git المحلي الدائم؟"
  },
  "options": [
    {
      "id": "status",
      "text": {
        "en": "`git status`",
        "ar": "`git status`"
      }
    },
    {
      "id": "diff",
      "text": {
        "en": "`git diff`",
        "ar": "`git diff`"
      }
    },
    {
      "id": "log",
      "text": {
        "en": "`git log`",
        "ar": "`git log`"
      }
    },
    {
      "id": "commit",
      "text": {
        "en": "`git commit`",
        "ar": "`git commit`"
      }
    }
  ],
  "correctAnswer": "commit",
  "explanation": {
    "en": "`git add` stages modifications from the Working Directory into the Index; `git commit` creates an immutable commit snapshot pointing to its parent(s).",
    "ar": "ينقل `git add` الملفات لمنطقة التجهيز، بينما ينشئ `git commit` لقطة تاريخية دائمة في المستودع المحلي."
  },
  "tags": [
    "git",
    "version-control"
  ]
} as AssessmentQuestion
];
