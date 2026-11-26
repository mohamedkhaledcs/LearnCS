import { AssessmentQuestion } from '@/lib/assessment/schema';

export const inclusion_exclusion_questions: AssessmentQuestion[] = [
{
  "id": "DM-PIE-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Inclusion-Exclusion Principle",
  "specialization": "Divisibility Count",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Using Inclusion-Exclusion, how many integers in {1..100} are divisible by 2 OR 5?",
    "ar": "باستخدام مبدأ التضمين والاستبعاد، كم عدداً صحيحاً بين 1 و 100 يقبل القسمة على 2 أو 5؟"
  },
  "options": [
    {
      "id": "70",
      "text": {
        "en": "70 (= 50 + 20)",
        "ar": "70"
      }
    },
    {
      "id": "50",
      "text": {
        "en": "50",
        "ar": "50"
      }
    },
    {
      "id": "60",
      "text": {
        "en": "60 (= ⌊100/2⌋ + ⌊100/5⌋ - ⌊100/10⌋ = 50 + 20 - 10)",
        "ar": "60 (= 50 + 20 - 10)"
      }
    },
    {
      "id": "80",
      "text": {
        "en": "80",
        "ar": "80"
      }
    }
  ],
  "correctAnswer": "60",
  "explanation": {
    "en": "Multiples of 10 (= lcm(2,5)) were counted twice in |A| + |B|, so we subtract |A ∩ B| = 10 once: 50 + 20 - 10 = 60.",
    "ar": "مضاعفات 10 (عددها 10) حُسبت مرتين مع الـ 2 ومع الـ 5، فنطرح التقاطع مرة واحدة: 50 + 20 - 10 = 60."
  },
  "tags": [
    "discrete-math",
    "counting"
  ]
} as AssessmentQuestion,
{
  "id": "DM-CNT-E-006",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Inclusion-Exclusion",
  "specialization": "Multiple Counting",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In a class, 18 students take Algorithms, 14 take Databases, and 6 take BOTH. How many unique students take at least one course?",
    "ar": "في صف دراسي، يسجل 18 طالباً في الخوارزميات، و14 في قواعد البيانات، و6 في المادتين معاً. كم طالباً فريداً يدرس مادةً واحدةً على الأقل؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "32 students",
        "ar": "32 طالباً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "26 students",
        "ar": "26 طالباً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "38 students",
        "ar": "38 طالباً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "20 students",
        "ar": "20 طالباً"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "By Inclusion-Exclusion: `18 + 14 - 6 = 26` unique students cleanly.",
    "ar": "بمبدأ الشمول والاستبعاد: `18 + 14 - 6 = 26` طالباً دون تكرار المشتركين."
  },
  "tags": [
    "inclusion-exclusion",
    "counting",
    "sets"
  ]
} as AssessmentQuestion
];
