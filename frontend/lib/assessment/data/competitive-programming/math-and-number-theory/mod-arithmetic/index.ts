import { AssessmentQuestion } from '@/lib/assessment/schema';

export const mod_arithmetic_questions: AssessmentQuestion[] = [
{
  "id": "CP-MOD-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Modular Arithmetic",
  "specialization": "Modular Inverse",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "When M is a prime modulus (e.g., 10⁹ + 7) and gcd(a, M) = 1, how does Fermat's Little Theorem compute the modular inverse of a mod M?",
    "ar": "عندما يكون M عدداً أولياً مثل (10⁹ + 7) و a لا يقبل القسمة على M، كيف نحسب المعكوس الضربي لـ a باقي قسمة M باستخدام مبرهنة فيرما الصغرى؟"
  },
  "options": [
    {
      "id": "powm1",
      "text": {
        "en": "Compute a^(M - 1) mod M sequentially across all positive bases",
        "ar": "حساب a^(M - 1) mod M عبر الضرب المتكرر المباشر لجميع الأسس الموجبة"
      }
    },
    {
      "id": "powm2",
      "text": {
        "en": "a^(M - 2) mod M via binary exponentiation in O(log M)",
        "ar": "حساب a^(M - 2) mod M بالرفع الثنائي في O(log M)"
      }
    },
    {
      "id": "div",
      "text": {
        "en": "Evaluate `(1 / a) % M` directly using standard IEEE-754 floating-point division",
        "ar": "تنفيذ القسمة العشرية الاعتيادية `(1 / a) % M` على متغيرات الأعداد الحقيقية"
      }
    },
    {
      "id": "sub",
      "text": {
        "en": "(M - a) mod M",
        "ar": "(M - a) mod M"
      }
    }
  ],
  "correctAnswer": "powm2",
  "explanation": {
    "en": "Fermat's Little Theorem states a^(M-1) ≡ 1 (mod M) for prime M, so multiplying both sides by a⁻¹ shows a⁻¹ ≡ a^(M-2) (mod M).",
    "ar": "تنص مبرهنة فيرما على أن a^(M-1) ≡ 1 (mod M) عندما يكون M أولياً، ومنه يكون معكوس a هو a^(M-2) mod M."
  },
  "tags": [
    "cp",
    "number-theory",
    "modular-arithmetic"
  ]
} as AssessmentQuestion,
{
  "id": "CP-INT-M-003",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Modular Arithmetic",
  "specialization": "Subtraction Modulo",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "const long long MOD = 1e9 + 7;\nlong long diff = (a % MOD - b % MOD + MOD) % MOD;",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why add `+ MOD` before taking final `% MOD` when subtracting `(a - b)` in C++?",
    "ar": "لماذا نضيف `+ MOD` قبل أخذ باقي القسمة الأخير `% MOD` عند طرح عددين في الحساب المعياري بـ C++؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "C++ `%` can return a negative value; `+ MOD` shifts it cleanly non-negative",
        "ar": "يعطي `%` في C++ باقياً سالباً أحياناً، فتضيف `MOD` لإبقائه موجباً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "C++ compilers forbid subtracting signed integers sharing identical prime MOD bounds",
        "ar": "تمنع لغة C++ طرح متغيرين يحملان القيمة المعيارية نفسها إلا بعد إضافة MOD يدوياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Adding MOD automatically computes the Fermat modular inverse without exponentiation",
        "ar": "إضافة MOD تحسب المعكوس الضربي لفيرما تلقائياً وتقرّب الأعداد الصحيحة للمالانهاية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "To force integer products to round toward infinity",
        "ar": "لتقريب الأعداد"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "In C++, `-3 % 7` yields `-3` instead of mathematical canonical residue `4`; `(-3 + 7) % 7` yields `4` cleanly.",
    "ar": "في C++ تعطي `-3 % 7` القيمة `-3`، وبإضافة `7` ثم `% 7` نعود للباقي القياسي `4`."
  },
  "tags": [
    "modulo",
    "subtraction",
    "cp"
  ]
} as AssessmentQuestion,
{
  "id": "CP-NTH-M-004",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Binary Exponentiation",
  "specialization": "Modular Power",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "How fast can Modular Binary Exponentiation compute `3^(10^18) mod (10^9 + 7)` cleanly?",
    "ar": "بكم تعقيد زمني يحسب الرفع السريع للأس (Binary Exponentiation) المقدار `3^(10^18) mod 10^9+7`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "O(sqrt(E)) (~10^9 steps)",
        "ar": "O(sqrt(E))"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(E) linear loop",
        "ar": "O(E)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(10^9) modular steps",
        "ar": "O(10^9)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "O(log E)",
        "ar": "O(log E)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Repeated squaring halves the exponent binary bit by bit, finishing `10^18` in roughly 60 multiplications!",
    "ar": "تربيع الأساس وتنصيف الأس ثنائياً يحل أساً بقيمة كوينتيليون في ~60 عملية فقط."
  },
  "tags": [
    "binary-exponentiation",
    "modulo",
    "number-theory"
  ]
} as AssessmentQuestion,
{
  "id": "CP-NTH-H-005",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Modular Inverse",
  "specialization": "Prime Condition",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "Fermat's Little Theorem computes `inv(a) = a^(M-2) mod M` ONLY when which two requirements hold cleanly?",
    "ar": "لا تصلح قاعدة فيرما لحساب المعكوس الضربي `a^(M-2) mod M` إلا بتحقق أي شرطين أساسيين؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "`M` must be PRIME and `a` must NOT be divisible by `M`",
        "ar": "أن يكون `M` عدداً **أولياً** وألا يقبل `a` القسمة على `M`"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "`M` must be strictly a power of 2 and `a` must be odd",
        "ar": "أن يكون `M` من قوى 2 دائماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "`a` must exceed `M^2` strictly before exponentiation",
        "ar": "أن يتجاوز `a` مربع `M`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Works unconditionally for EVERY composite integer modulus `M`",
        "ar": "تعمل لجميع الأعداد المركبة بدون شروط"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "For composite `M` like `10^9`, Fermat's formula fails (`Euler's Totient` or `Extended Euclid` is needed instead whenever `gcd(a, M) == 1`).",
    "ar": "مع المعيار غير الأولي تفشل صيغة فيرما ونحتاج إقليدس الموسّعة (Extended Euclidean Algorithm) بشرط أن يكون `gcd(a, M) = 1`."
  },
  "tags": [
    "modular-inverse",
    "fermat",
    "number-theory"
  ]
} as AssessmentQuestion
];
