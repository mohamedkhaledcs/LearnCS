import { AssessmentQuestion } from '@/lib/assessment/schema';

export const prefix_sums_questions: AssessmentQuestion[] = [
{
  "id": "CP-PREF-E-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Techniques",
  "subtopic": "Prefix Sums",
  "specialization": "Range Sum Queries",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Using a 1-indexed prefix sum array pref[] where pref[i] = a[1] + ... + a[i], how do you compute sum(L..R) in O(1)?",
    "ar": "باستخدام مصفوفة السوابق pref[] بترقيم يبدأ من 1، كيف تحسب مجموع العناصر من L إلى R في زمن O(1)؟"
  },
  "options": [
    {
      "id": "rl",
      "text": {
        "en": "pref[R] - pref[L]",
        "ar": "pref[R] - pref[L]"
      }
    },
    {
      "id": "lr",
      "text": {
        "en": "pref[R] - pref[L - 1]",
        "ar": "pref[R] - pref[L - 1]"
      }
    },
    {
      "id": "add",
      "text": {
        "en": "pref[R] + pref[L - 1]",
        "ar": "pref[R] + pref[L - 1]"
      }
    },
    {
      "id": "p1",
      "text": {
        "en": "pref[R + 1] - pref[L]",
        "ar": "pref[R + 1] - pref[L]"
      }
    }
  ],
  "correctAnswer": "lr",
  "explanation": {
    "en": "pref[R] sums 1..R, and subtracting pref[L - 1] (which sums 1..L-1) leaves exactly the elements from index L through R inclusive.",
    "ar": "يحتوي pref[R] على المجموع من 1 حتى R، وعند طرح pref[L-1] (وهو ما قبل L) يتبقى مجموع النطاق [L..R] بدقة في O(1)."
  },
  "tags": [
    "cp",
    "prefix-sums",
    "arrays"
  ]
} as AssessmentQuestion,
{
  "id": "CP-ARR-E-002",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Array Techniques",
  "subtopic": "Prefix Sums",
  "specialization": "Zero-Based Formula",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "// pref has size N+1 with pref[0] = 0, pref[i+1] = pref[i] + a[i]\nlong long rangeSum(int L, int R) { return pref[R + 1] - pref[L]; }",
  "codeLanguage": "cpp",
  "question": {
    "en": "With `a = [4, 2, 7, 1]` and `pref = [0, 4, 6, 13, 14]`, what does `rangeSum(1, 3)` return?",
    "ar": "بافتراض `a = [4, 2, 7, 1]` و`pref = [0, 4, 6, 13, 14]`، ماذا تُرجع `rangeSum(1, 3)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "13",
        "ar": "13"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "9",
        "ar": "9"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "14",
        "ar": "14"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "10",
        "ar": "10"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`pref[4] - pref[1] = 14 - 4 = 10`, matching `a[1] + a[2] + a[3] = 2 + 7 + 1 = 10`.",
    "ar": "ناتج `pref[4] - pref[1]` يساوي `14 - 4 = 10` وهو مجموع العناصر من 1 إلى 3 (`2+7+1`)."
  },
  "tags": [
    "prefix-sums",
    "cp",
    "trace"
  ]
} as AssessmentQuestion,
{
  "id": "CP-ARR-M-004",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Array Techniques",
  "subtopic": "Prefix Sums",
  "specialization": "2D Inclusion-Exclusion",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "rect = S[r2][c2] - S[r1 - 1][c2] - S[r2][c1 - 1] + X;",
  "codeLanguage": "cpp",
  "question": {
    "en": "In 2D matrix prefix-sum Inclusion-Exclusion above, what exact term must `X` add back?",
    "ar": "في معادلة المجموع ثنائي البُعد 2D Prefix Sum أعلاه، ما الحد الذي يجب إعادته في الموضع `X` لتصحيح الطرح المزدوج؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "S[r1][c1]",
        "ar": "S[r1][c1]"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "S[r1 - 1][c1 - 1]",
        "ar": "S[r1 - 1][c1 - 1]"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "S[r2 - 1][c2 - 1]",
        "ar": "S[r2 - 1][c2 - 1]"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "S[r1 - 1][c2 - 1]",
        "ar": "S[r1 - 1][c2 - 1]"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Subtracting top strip `[1..r1-1][1..c2]` and left strip `[1..r2][1..c1-1]` subtracts their top-left intersection `[1..r1-1][1..c1-1]` twice, so adding `+ S[r1-1][c1-1]` restores exact balance.",
    "ar": "الزاوية العليا اليسرى `S[r1-1][c1-1]` طُرحت مرتين (مع الصف العلوي والعمود الأيسر) لذا يجب جمعها مرة."
  },
  "tags": [
    "2d-prefix-sum",
    "inclusion-exclusion",
    "cp"
  ]
} as AssessmentQuestion,
{
  "id": "CP-ARR-H-005",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Array Techniques",
  "subtopic": "Prefix Sums",
  "specialization": "Prefix + HashMap",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "How do you count all contiguous subarrays summing to target `K` in `O(N)` when elements MAY be negative?",
    "ar": "كيف نعد كل المقاطع الجزئية المتجاورة التي يساوي مجموعها `K` في `O(N)` حتى مع وجود أعداد سالبة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Shrink sliding left pointer whenever current window sum grows past `K`",
        "ar": "تقليص نافذة الانزلاق اليسرى كلما تجاوز المجموع K"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Sort elements ascending then pair endpoints via Two Pointers",
        "ar": "فرز المصفوفة ثم استخدام المؤشرين"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Store prefix-sum frequencies in a HashMap and count occurrences of `currPref - K`",
        "ar": "تخزين تكرارات المجاميع التراكمية في HashMap وجمع عدد ظهور `currPref - K`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Run binary search on subarray length starting from index 0",
        "ar": "البحث الثنائي على الطول"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Since `sum[L..R] = pref[R] - pref[L-1]`, counting prior prefix occurrences equal to `pref[R] - K` finds every valid subarray cleanly even with negative entries.",
    "ar": "إذا كان الفرق بين مجموعين تراكميين يساوي `K` فالمقطع بينهما يحقق المطلوب، وهو يعمل حتى بوجود السالب والصفر."
  },
  "tags": [
    "prefix-sums",
    "hashmap",
    "subarrays"
  ]
} as AssessmentQuestion,
{
  "id": "CP-INT-E-002",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Contest Techniques",
  "subtopic": "Fast I/O",
  "specialization": "Time Limit Prevention",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "ios::sync_with_stdio(false);\ncin.tie(nullptr);",
  "codeLanguage": "cpp",
  "question": {
    "en": "What exact rule MUST you strictly obey once adding `ios::sync_with_stdio(false);` to a C++ contest template?",
    "ar": "ما القاعدة التي يجب الالتزام بها بصرامة فور كتابة `ios::sync_with_stdio(false);` في قوالب مسابقات C++؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Avoid printing signed integer variables exceeding 32-bit storage precision anywhere",
        "ar": "تجنب طباعة الأعداد الصحيحة الأكبر من 32 بت لأنها تكسر مزامنة المخزن المؤقت"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Flush standard output streams after every printed line via `std::endl` explicitly",
        "ar": "إفراغ تدفق الإخراج تلقائياً في نهاية كل سطر عبر `endl` لضمان عدم تداخل القراءة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Disable vector resizing before taking input counts",
        "ar": "منع توسيع `vector`"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Never mix C I/O (`scanf`, `printf`) with C++ streams (`cin`, `cout`)",
        "ar": "عدم خلط دوال C (`scanf`/`printf`) مع تدفقات C++ (`cin`/`cout`)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Untying stdio allows out-of-order buffering between C and C++ streams if mixed; pick strictly one family and print `'\\n'`!",
    "ar": "فك التزامن يفصل مخازن القراءة والطباعة، فخلط الطريقتين يبعثر المخرجات."
  },
  "tags": [
    "fast-io",
    "cpp",
    "cp"
  ]
} as AssessmentQuestion
];
