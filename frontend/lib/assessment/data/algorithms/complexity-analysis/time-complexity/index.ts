import { AssessmentQuestion } from '@/lib/assessment/schema';

export const time_complexity_questions: AssessmentQuestion[] = [
{
  "id": "AL-TIME-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Time Complexity",
  "specialization": "Loop Halving",
  "difficulty": "medium",
  "type": "code-trace",
  "codeLanguage": "cpp",
  "codeSnippet": "for (int i = n; i >= 1; i /= 2) {\n    sum += i;\n}",
  "question": {
    "en": "What is the time complexity of the loop shown above as a function of n?",
    "ar": "ما هو التعقيد الزمني (Time Complexity) للحلقة الموضحة أعلاه بدلالة n؟"
  },
  "options": [
    {
      "id": "on",
      "text": {
        "en": "O(n)",
        "ar": "O(n)"
      }
    },
    {
      "id": "logn",
      "text": {
        "en": "O(log n)",
        "ar": "O(log n)"
      }
    },
    {
      "id": "onlogn",
      "text": {
        "en": "O(n log n)",
        "ar": "O(n log n)"
      }
    },
    {
      "id": "o1",
      "text": {
        "en": "O(1)",
        "ar": "O(1)"
      }
    }
  ],
  "correctAnswer": "logn",
  "explanation": {
    "en": "Because the loop variable i is halved on every iteration, it terminates in approximately log₂(n) + 1 steps.",
    "ar": "لأن المتغير i ينقسم على 2 في كل دورة، تنتهي الحلقة بعد حوالي log₂(n) + 1 خطوة."
  },
  "tags": [
    "complexity",
    "time-complexity",
    "logarithmic"
  ]
} as AssessmentQuestion,
{
  "id": "PF-LOP-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Time Complexity",
  "specialization": "Nested Loops",
  "difficulty": "medium",
  "type": "complexity",
  "codeSnippet": "for (int i = 0; i < n; i++)\n  for (int j = i + 1; j < n; j++)\n    process(a[i], a[j]);",
  "codeLanguage": "cpp",
  "question": {
    "en": "How many total times does `process` execute cleanly across all pairs `(i, j)` in terms of `n`?",
    "ar": "كم مرة تُستدعى الدالة `process` تقريباً بدلالة `n` عبر هذه الحلقة المثلثية؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N log N) due to the `j = i + 1` offset",
        "ar": "O(N log N) بسبب إزاحة البداية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N^2) because `n * (n - 1) / 2` scales quadratically",
        "ar": "O(N^2) لأن المجموع يساوي `n(n-1)/2`"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(N) strictly linear",
        "ar": "O(N) خطي فقط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(1) constant steps",
        "ar": "O(1) ثابت"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Summing `(n-1) + (n-2) + ... + 1 = n(n-1)/2` drops the `1/2` constant factor, landing cleanly in `O(N^2)`.",
    "ar": "المجموع الحسابي `n(n-1)/2` يحافظ على الحد التربيعي `N^2` في تحليل Big-O."
  },
  "tags": [
    "loops",
    "complexity",
    "big-o"
  ]
} as AssessmentQuestion,
{
  "id": "PF-LOP-H-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Time Complexity",
  "specialization": "Logarithmic Loops",
  "difficulty": "hard",
  "type": "complexity",
  "codeSnippet": "for (long long k = 1; k < n; k *= 3) {\n  ops++;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "What exact Big-O time complexity describes multiplying loop counter `k *= 3` per step?",
    "ar": "ما التعقيد الزمني الدقيق لحلقة يتضاعف فيها العداد بثلاثة أضعاف `k *= 3` في كل دورة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N / 3) -> O(N) linear",
        "ar": "O(N / 3) أي خطي O(N)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(N^(1/3)) cube-root scaling",
        "ar": "O(N^(1/3)) جذري"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(3^N) exponential explosion",
        "ar": "O(3^N) أسي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(log N) logarithmic growth",
        "ar": "O(log N) لوغاريتمي"
      }
    }
  ],
  "correctAnswer": "d",
  "explanation": {
    "en": "Solving `3^t = n` yields `t = log_3(n)` iterations, which differs from `log_2(n)` only by constant factor -> `O(log N)`.",
    "ar": "النمو الأسي للعداد `3^t = n` يعني أن عدد الدورات يساوي `log_3(n)` وهو `O(log N)`."
  },
  "tags": [
    "complexity",
    "logarithmic",
    "loops"
  ]
} as AssessmentQuestion,
{
  "id": "AL-CMP-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Time Complexity",
  "specialization": "Harmonic Loops",
  "difficulty": "medium",
  "type": "complexity",
  "codeSnippet": "for (int d = 1; d <= n; d++)\n  for (int m = d; m <= n; m += d)\n    divCount[m]++;",
  "codeLanguage": "cpp",
  "question": {
    "en": "Look closely at this divisor-counting nested loop (`m += d`!). What tight Big-O runtime does it achieve?",
    "ar": "انظر بدقة للحلقة المتداخلة لحساب القواسم (`m += d`)؛ ما تعقيدها الزمني الدقيق؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "O(N log N) via Harmonic Series",
        "ar": "O(N log N) لأن مجموع المتسلسلة التوافقية يساوي `N ln N`"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "O(N^2) strictly quadratic",
        "ar": "O(N^2) تربيعي"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N * sqrt(N))",
        "ar": "O(N * sqrt(N))"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(N log log N)",
        "ar": "O(N log log N)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Summing `n/d` for `d = 1..n` forms `n * H_n ~ n * ln(n)`, fitting cleanly inside 1 second even for `n = 10^6`!",
    "ar": "تكرار القفز بمضاعفات `d` يتبع المتسلسلة التوافقية `N(1 + 1/2 + ... + 1/N) = O(N log N)`."
  },
  "tags": [
    "harmonic-series",
    "complexity",
    "number-theory"
  ]
} as AssessmentQuestion,
{
  "id": "AL-CMP-H-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Time Complexity",
  "specialization": "Constraint Reverse Engineering",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "A problem specifies `N <= 18` items cleanly under a 1-second limit. What algorithmic strategy is `N <= 18` typically hinting?",
    "ar": "عندما يضع سؤال مسابقات قيداً غريباً `N <= 18` فقط ضمن ثانية واحدة، أي تقنية خوارزمية يشير إليها عادةً؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N log N) Quicksort partitioning",
        "ar": "الفرز O(N log N)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(1) constant Euler totient formula",
        "ar": "صيغة ثابتة O(1)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(N^2) Floyd-Warshall matrix multiplication",
        "ar": "ضرب المصفوفات التربيعي"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Exponential O(2^N) or O(N * 2^N) Bitmask DP / Backtracking",
        "ar": "تقنية Bitmask DP أو Backtracking بتعقيد أسي `O(2^N)` أو `O(N * 2^N)`"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`2^18 = 262,144` (and `18 * 2^18 ~ 4.7e6`) runs easily within 1 second, making `N <= 18..20` the hallmark of subset/bitmask search.",
    "ar": "قيمة `2^18` هي ربع مليون فقط، لذا تشير القيود دون العشرين غالباً لحلول المجموعات الجزئية وBitmask DP."
  },
  "tags": [
    "constraints",
    "bitmask-dp",
    "cp"
  ]
} as AssessmentQuestion
];
