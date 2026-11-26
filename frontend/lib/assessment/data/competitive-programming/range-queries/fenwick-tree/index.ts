import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fenwick_tree_questions: AssessmentQuestion[] = [
{
  "id": "CP-BIT-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Range Queries",
  "subtopic": "Fenwick Tree (BIT)",
  "specialization": "Lowbit Trick",
  "difficulty": "medium",
  "type": "code-trace",
  "codeLanguage": "cpp",
  "codeSnippet": "for (; idx <= n; idx += idx & -idx) bit[idx] += delta;",
  "question": {
    "en": "In a Fenwick Tree (Binary Indexed Tree), what does the bitwise expression (idx & -idx) compute?",
    "ar": "في بنية Fenwick Tree (BIT)، ماذا يحسب التعبير الثنائي (idx & -idx)؟"
  },
  "options": [
    {
      "id": "msb",
      "text": {
        "en": "The highest power of 2 greater than idx",
        "ar": "أكبر قوة للعدد 2 تفوق idx"
      }
    },
    {
      "id": "zero",
      "text": {
        "en": "Always evaluates to 0 in two's complement",
        "ar": "يعطي القيمة 0 دائماً"
      }
    },
    {
      "id": "div2",
      "text": {
        "en": "idx divided by 2 rounded up",
        "ar": "نصف idx مقرباً للأعلى"
      }
    },
    {
      "id": "lsb",
      "text": {
        "en": "The value of the lowest set bit (LSB) of idx in two's complement",
        "ar": "قيمة أصغر بت مضاء (LSB) في التمثيل الثنائي للرقم idx"
      }
    }
  ],
  "correctAnswer": "lsb",
  "explanation": {
    "en": "In two's complement, -idx = ~idx + 1, so bitwise AND keeps only the rightmost set bit of idx, jumping across BIT intervals in O(log N).",
    "ar": "في متمم الاثنين، يحافظ (idx & -idx) على البت الأيمن الوحيد المضاء في idx، مما يمكّن من القفز عبر شجرة الفهرسة في O(log N)."
  },
  "tags": [
    "cp",
    "fenwick-tree",
    "range-queries",
    "bitwise"
  ]
} as AssessmentQuestion,
{
  "id": "CP-RNG-E-002",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Advanced Data Structures",
  "subtopic": "Fenwick Tree",
  "specialization": "Bit Formula",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "int lsb = idx & (-idx);",
  "codeLanguage": "cpp",
  "question": {
    "en": "In a Fenwick Tree (Binary Indexed Tree), what value does the two's-complement bit expression `idx & (-idx)` isolate from `idx = 12` (`1100` binary)?",
    "ar": "في شجرة فينويك (BIT)، ما القيمة التي يستخلصها التعبير `idx & (-idx)` للعدد `12` (`1100` بالثنائي)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "8 (most significant set bit)",
        "ar": "8 (أكبر بت مضاء)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "0 always for even inputs",
        "ar": "0 للأعداد الزوجية"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "4 (lowest set bit power `2^2 = 4`)",
        "ar": "4 (أدنى بت مضاء `100` في الثنائي)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "1 (parity bit)",
        "ar": "1"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Negating in two's complement flips higher bits and keeps only the rightmost `1`-bit matching original `idx`: `1100 & 0100 = 0100 (4)`.",
    "ar": "حساب `-idx` بالمتمم الثنائي يحافظ على أدنى بت يساوي `1` فقط، والنتيجة لـ `12` هي `4`."
  },
  "tags": [
    "fenwick-tree",
    "bit",
    "bitwise"
  ]
} as AssessmentQuestion
];
