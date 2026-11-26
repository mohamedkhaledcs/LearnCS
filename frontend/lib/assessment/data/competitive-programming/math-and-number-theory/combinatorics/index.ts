import { AssessmentQuestion } from '@/lib/assessment/schema';

export const combinatorics_questions: AssessmentQuestion[] = [
{
  "id": "CP-COMB-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Combinatorics",
  "specialization": "Stars and Bars",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In how many ways can N identical candies be distributed among K children where children may receive 0 candies?",
    "ar": "بكم طريقة يمكن توزيع N قطعة حلوى متماثلة على K طفلاً إذا سُمح بأن يأخذ بعضهم 0 قطعة؟"
  },
  "options": [
    {
      "id": "sb",
      "text": {
        "en": "C(N + K - 1, K - 1)",
        "ar": "C(N + K - 1, K - 1)"
      }
    },
    {
      "id": "cnk",
      "text": {
        "en": "C(N, K)",
        "ar": "C(N, K)"
      }
    },
    {
      "id": "kn",
      "text": {
        "en": "K^N",
        "ar": "K^N"
      }
    },
    {
      "id": "nk",
      "text": {
        "en": "N! / K!",
        "ar": "N! / K!"
      }
    }
  ],
  "correctAnswer": "sb",
  "explanation": {
    "en": "By Stars and Bars, placing K-1 dividers among N stars produces N + K - 1 slots from which K - 1 divider slots are chosen: C(N + K - 1, K - 1).",
    "ar": "بقانون النجوم والفواصل (Stars and Bars)، نرتب N نجمة مع K-1 فاصلاً ليصبح عدد التوافيق C(N + K - 1, K - 1)."
  },
  "tags": [
    "cp",
    "combinatorics",
    "discrete-math"
  ]
} as AssessmentQuestion
];
