import { AssessmentQuestion } from '@/lib/assessment/schema';

export const product_rule_questions: AssessmentQuestion[] = [
{
  "id": "DM-PRODR-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Product Rule",
  "specialization": "Sequential Choices",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How many 4-bit binary strings exist, where each bit position independently chooses `0` or `1`?",
    "ar": "كم سلسلة ثنائية مكونة من 4 بتات (4-bit binary strings) يمكن تشكيلها بحيث يأخذ كل بت القيمة `0` أو `1`؟"
  },
  "options": [
    {
      "id": "8",
      "text": {
        "en": "8 (= 2 + 2 + 2 + 2)",
        "ar": "8"
      }
    },
    {
      "id": "4",
      "text": {
        "en": "4",
        "ar": "4"
      }
    },
    {
      "id": "16",
      "text": {
        "en": "16 (= 2 × 2 × 2 × 2)",
        "ar": "16 (= 2⁴)"
      }
    },
    {
      "id": "24",
      "text": {
        "en": "24",
        "ar": "24"
      }
    }
  ],
  "correctAnswer": "16",
  "explanation": {
    "en": "Four sequential tasks with 2 choices each multiply via the Product Rule: 2⁴ = 16.",
    "ar": "بقانون الضرب، نضرب عدد خيارات كل خانة (2 × 2 × 2 × 2 = 16)."
  },
  "tags": [
    "discrete-math",
    "counting",
    "binary"
  ]
} as AssessmentQuestion,
{
  "id": "DM-CNT-E-002",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Product Rule",
  "specialization": "Passcodes",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How many distinct 3-character access codes exist if the first slot picks from 26 uppercase letters and the next two each pick from digits `0..9`?",
    "ar": "كم رمز مرور مختلف من 3 خانات يمكن تكوينه إذا كانت الخانة الأولى حرفاً إنجليزياً كبيراً (26) والخانتان التاليتان رقماً (0..9)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "46",
        "ar": "46"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "2,600",
        "ar": "2,600"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "260",
        "ar": "260"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "17,576",
        "ar": "17,576"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "By Product Rule for sequential independent choices: `26 * 10 * 10 = 2,600` codes.",
    "ar": "بحسب قاعدة الضرب للخيارات المتتالية المستقلة: `26 * 10 * 10 = 2,600`."
  },
  "tags": [
    "counting",
    "product-rule",
    "combinatorics"
  ]
} as AssessmentQuestion
];
