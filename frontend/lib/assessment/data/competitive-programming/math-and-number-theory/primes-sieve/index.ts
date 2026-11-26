import { AssessmentQuestion } from '@/lib/assessment/schema';

export const primes_sieve_questions: AssessmentQuestion[] = [
{
  "id": "CP-SIEVE-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Sieve of Eratosthenes",
  "specialization": "Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "What is the time complexity of the Sieve of Eratosthenes for finding all prime numbers up to N?",
    "ar": "ما هو التعقيد الزمني لغربال إراتوستينس (Sieve of Eratosthenes) لإيجاد جميع الأعداد الأولية حتى N؟"
  },
  "options": [
    {
      "id": "nsqrtn",
      "text": {
        "en": "O(N√N)",
        "ar": "O(N√N)"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(N²)",
        "ar": "O(N²)"
      }
    },
    {
      "id": "nloglogn",
      "text": {
        "en": "O(N log log N)",
        "ar": "O(N log log N)"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log N)",
        "ar": "O(log N)"
      }
    }
  ],
  "correctAnswer": "nloglogn",
  "explanation": {
    "en": "Summing N/p across primes p <= √N equals N · sum(1/p) = O(N log log N), nearly linear even for N = 10⁷.",
    "ar": "مجموع عمليات الشطب N/p للأعداد الأولية يعطي متسلسلة هارمونية أولية تقارب O(N log log N)، وهي شبه خطية عملياً."
  },
  "tags": [
    "cp",
    "number-theory",
    "primes"
  ]
} as AssessmentQuestion,
{
  "id": "CP-NTH-M-003",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Prime Sieve",
  "specialization": "Time Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "What exact asymptotic time complexity does the Sieve of Eratosthenes take to mark ALL primes up to `N`?",
    "ar": "ما التعقيد الزمني الشهير لغربال إراتوستينس (Sieve of Eratosthenes) لاستخراج كل الأعداد الأولية حتى `N`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N * sqrt(N))",
        "ar": "O(N * sqrt(N))"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(N^2)",
        "ar": "O(N^2)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N log log N)",
        "ar": "O(N log log N)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(log N)",
        "ar": "O(log N)"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Summing `N/p` strictly over primes `p <= N` converges mathematically to `N * ln(ln(N))`, virtually linear up to `10^7`!",
    "ar": "مجموع مقلوبات الأعداد الأولية يتناسب مع `log log N` مما يجعل الغربال فائق السرعة حتى الملايين."
  },
  "tags": [
    "sieve",
    "primes",
    "complexity"
  ]
} as AssessmentQuestion,
{
  "id": "CP-NTH-E-006",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Primality & Factorization",
  "specialization": "Sqrt Trial Division",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why does checking divisors only up to `d * d <= N` suffice when testing if a single number `N` is prime?",
    "ar": "لماذا يكفي فحص القواسم حتى `d * d <= N` (الجذر التربيعي) عند اختبار أولية عدد مفرد `N`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "No composite integer can possess any prime factor strictly exceeding 100",
        "ar": "تستحيل وجود أي عوامل أولية تتجاوز 100 لأي عدد مركب مهما كبر حجمه الرياضي"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "If `N = a * b` factors cleanly, at least one divisor satisfies `<= sqrt(N)`",
        "ar": "إن تحلل `N = a * b` فلا بد أن يكون أحد العاملين `<= sqrt(N)`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Multiplying `d * d` transforms trial division loops into O(1) bit lookups",
        "ar": "ضرب المتغير `d * d` يحوّل حلقة القسمة المتكررة تلقائياً إلى جدول بحث ثابت O(1)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Even integers bypass factorization cleanly above 2^16",
        "ar": "الزوجية تتخطى الفحص"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "If both `a > sqrt(N)` and `b > sqrt(N)`, their product would strictly exceed `N`, proving trial division up to `sqrt(N)` complete in `O(sqrt(N))`.",
    "ar": "يستحيل أن يتجاوز كلا العاملين الجذر التربيعي في الوقت نفسه وإلا فاق حاصلهما `N`."
  },
  "tags": [
    "primes",
    "factorization",
    "sqrt"
  ]
} as AssessmentQuestion
];
