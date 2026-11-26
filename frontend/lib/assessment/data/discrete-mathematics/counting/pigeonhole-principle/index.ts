import { AssessmentQuestion } from '@/lib/assessment/schema';

export const pigeonhole_principle_questions: AssessmentQuestion[] = [
{
  "id": "DM-PHP-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Pigeonhole Principle",
  "specialization": "Guaranteed Collisions",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is the minimum number of students needed in a room to GUARANTEE at least two share the same birth month?",
    "ar": "ما الحد الأدنى لعدد الطلاب في قاعة لنضمن تماماً وجود طالبين على الأقل يجمعهما نفس شهر الميلاد؟"
  },
  "options": [
    {
      "id": "12",
      "text": {
        "en": "12 students",
        "ar": "12 طالباً"
      }
    },
    {
      "id": "13",
      "text": {
        "en": "13 students",
        "ar": "13 طالباً"
      }
    },
    {
      "id": "24",
      "text": {
        "en": "24 students",
        "ar": "24 طالباً"
      }
    },
    {
      "id": "7",
      "text": {
        "en": "7 students",
        "ar": "7 طلاب"
      }
    }
  ],
  "correctAnswer": "13",
  "explanation": {
    "en": "By the Pigeonhole Principle, placing N > K objects into K=12 pigeonholes guarantees at least one month contains >= ⌈13/12⌉ = 2 students (also explaining why hash collisions are inevitable when keys > buckets!).",
    "ar": "وفق مبدأ برج الحمام (Pigeonhole Principle)، توزيع 13 طالباً على 12 خانة يحتم وجود خانة بها أكثر من طالب، وهو سبب حتمية تصادمات التجزئة أيضاً."
  },
  "tags": [
    "discrete-math",
    "counting",
    "hashing"
  ]
} as AssessmentQuestion,
{
  "id": "DM-CNT-H-005",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Pigeonhole Principle",
  "specialization": "Generalized Bound",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "What minimum number of balls guarantees placing at least 3 balls of the SAME color given 4 distinct paint colors?",
    "ar": "ما أقل عدد من الكرات تضمن وجود 3 كرات على الأقل من نفس اللون إذا توفرت 4 ألوان مختلفة؟"
  },
  "options": [
    {
      "id": "c",
      "text": {
        "en": "9 balls",
        "ar": "9 كرات"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "7 balls",
        "ar": "7 كرات"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "8 balls",
        "ar": "8 كرات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "12 balls",
        "ar": "12 كرة"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Worst-case avoidance fits 2 balls per color (`4 * 2 = 8`); the 9th ball forces a 3rd match by Generalized Pigeonhole Principle.",
    "ar": "أسوأ توزيع متساوٍ يضع كرتين من كل لون (`4*2 = 8`) والكرة التاسعة تُلزم بتكرار اللون نفسه 3 مرات."
  },
  "tags": [
    "pigeonhole",
    "combinatorics",
    "discrete-math"
  ]
} as AssessmentQuestion
];
