import { AssessmentQuestion } from '@/lib/assessment/schema';

export const z_algorithm_questions: AssessmentQuestion[] = [
{
  "id": "CP-Z-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Strings",
  "subtopic": "Z-Algorithm",
  "specialization": "LCP with Prefix",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "What does Z[i] represent in the Z-array of string S, and how is a Z-box [L, R] used?",
    "ar": "ماذا تمثل القيمة Z[i] في مصفوفة Z للنص S، وكيف يُستخدم الإطار [L, R]؟"
  },
  "options": [
    {
      "id": "pal",
      "text": {
        "en": "Z[i] records the maximum palindrome radius centered symmetrically around index i in S",
        "ar": "يمثل Z[i] نصف قطر أطول متناظرة (Palindrome) متمركزة عند الفهرس i في السلسلة S"
      }
    },
    {
      "id": "lps",
      "text": {
        "en": "Z[i] counts vowels before index i",
        "ar": "عدد حروف العلة قبل i"
      }
    },
    {
      "id": "lcp",
      "text": {
        "en": "Length of the longest substring at i matching a prefix of S",
        "ar": "طول أطول مقطع يبدأ من i ويطابق بادئة السلسلة S؛ مع [L, R] لتحقيق O(N)"
      }
    },
    {
      "id": "sort",
      "text": {
        "en": "Z[i] holds the lexicographical rank of the i-th suffix inside the sorted Suffix Array",
        "ar": "يخزن Z[i] الرتبة المعجمية للّاحقة التي تبدأ من i داخل مصفوفة اللواحق المرتبة"
      }
    }
  ],
  "correctAnswer": "lcp",
  "explanation": {
    "en": "Running Z on `P + '$' + T` computes exact pattern matches wherever Z[i] == |P| in O(|P| + |T|) time.",
    "ar": "بتطبيق الخوارزمية على النص المدمج P + '$' + T نجد كل تطابقات النمط عند كل فهرس يحقق Z[i] == |P| في زمن خطي O(N)."
  },
  "tags": [
    "cp",
    "strings",
    "z-algorithm"
  ]
} as AssessmentQuestion
];
