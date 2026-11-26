import { AssessmentQuestion } from '@/lib/assessment/schema';

export const permutations_questions: AssessmentQuestion[] = [
{
  "id": "DM-PERM-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Permutations",
  "specialization": "Ordered Arrangements",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How many distinct ordered 3-letter rankings (gold, silver, bronze) can be formed from 5 distinct contestants (order matters)?",
    "ar": "بكم طريقة يمكن توزيع 3 ميداليات مختلفة (ذهب، فضة، برونز) على 5 متسابقين (الترتيب مهم)؟"
  },
  "options": [
    {
      "id": "10",
      "text": {
        "en": "10 (= C(5, 3))",
        "ar": "10"
      }
    },
    {
      "id": "125",
      "text": {
        "en": "125",
        "ar": "125"
      }
    },
    {
      "id": "120",
      "text": {
        "en": "120",
        "ar": "120"
      }
    },
    {
      "id": "60",
      "text": {
        "en": "60 (= P(5, 3) = 5 × 4 × 3)",
        "ar": "60 (= 5 × 4 × 3)"
      }
    }
  ],
  "correctAnswer": "60",
  "explanation": {
    "en": "When order matters without repetition, permutations P(n, r) = n! / (n - r)! = 5! / 2! = 5 × 4 × 3 = 60.",
    "ar": "بما أن الترتيب مهم ودون تكرار، نستخدم التباديل P(5, 3) = 5 × 4 × 3 = 60."
  },
  "tags": [
    "discrete-math",
    "counting",
    "combinatorics"
  ]
} as AssessmentQuestion
];
