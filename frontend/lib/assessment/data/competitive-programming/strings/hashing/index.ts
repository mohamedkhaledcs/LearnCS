import { AssessmentQuestion } from '@/lib/assessment/schema';

export const hashing_questions: AssessmentQuestion[] = [
{
  "id": "CP-HASH-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Strings",
  "subtopic": "Polynomial Rolling Hash",
  "specialization": "Substring Equality",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Using prefix hashes + modular powers, in what time can Polynomial Rolling Hash check whether two substrings S[l1..r1] and S[l2..r2] match?",
    "ar": "باستخدام تجزئة السوابق (Polynomial Rolling Hash)، في كم زمن يمكن مقارنة مقطعين نصيين S[l1..r1] و S[l2..r2]؟"
  },
  "options": [
    {
      "id": "on",
      "text": {
        "en": "O(N) per comparison",
        "ar": "O(N) لكل مقارنة"
      }
    },
    {
      "id": "onlogn",
      "text": {
        "en": "O(N log N) per comparison",
        "ar": "O(N log N) لكل مقارنة"
      }
    },
    {
      "id": "n2",
      "text": {
        "en": "O(N²)",
        "ar": "O(N²)"
      }
    },
    {
      "id": "o1",
      "text": {
        "en": "O(1) per substring comparison",
        "ar": "O(1) لكل مقارنة مقطع نصي"
      }
    }
  ],
  "correctAnswer": "o1",
  "explanation": {
    "en": "Precomputing prefix hashes allows extracting any substring hash in O(1); using two independent prime bases/moduli avoids birthday-paradox collisions.",
    "ar": "يتيح التحضير المسبق حساب قيمة hash لأي مقطع فرعي في O(1)، ويُفضل استخدام أساسين وموديين مختلفين لتفادي التصادمات."
  },
  "tags": [
    "cp",
    "strings",
    "hashing"
  ]
} as AssessmentQuestion
];
