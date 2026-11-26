import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bitmask_dp_questions: AssessmentQuestion[] = [
{
  "id": "AL-DPBIT-H-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "Bitmask DP",
  "specialization": "TSP Subset States",
  "difficulty": "hard",
  "type": "complexity",
  "question": {
    "en": "For a graph of N vertices (N <= 20), what is the state-space complexity of standard Bitmask DP for Traveling Salesperson Problem (TSP)?",
    "ar": "لرسم بياني من N عقد (حيث N <= 20)، ما هو تعقيد عدد الحالات والانتقالات لخوارزمية Bitmask DP في مسألة TSP؟"
  },
  "options": [
    {
      "id": "fact",
      "text": {
        "en": "O(N!) time",
        "ar": "O(N!) للزمن"
      }
    },
    {
      "id": "nlogn",
      "text": {
        "en": "O(N log N · 2^N)",
        "ar": "O(N log N · 2^N)"
      }
    },
    {
      "id": "n2_2n",
      "text": {
        "en": "O(N² · 2^N) time and O(N · 2^N) space",
        "ar": "O(N² · 2^N) للزمن و O(N · 2^N) للمساحة"
      }
    },
    {
      "id": "n3",
      "text": {
        "en": "O(N³)",
        "ar": "O(N³)"
      }
    }
  ],
  "correctAnswer": "n2_2n",
  "explanation": {
    "en": "There are 2^N visited subsets × N last-node choices = O(N · 2^N) states, and each state transitions over up to N next nodes -> O(N² · 2^N) time.",
    "ar": "عدد الحالات هو 2^N مجموعة × N عقدة حالية، وكل حالة تجرب الانتقال إلى N عقدة، فيصبح الزمن O(N² · 2^N)."
  },
  "tags": [
    "dp",
    "bitmask",
    "cp"
  ]
} as AssessmentQuestion
];
