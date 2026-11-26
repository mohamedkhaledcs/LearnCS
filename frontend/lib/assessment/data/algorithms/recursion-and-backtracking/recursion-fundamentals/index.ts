import { AssessmentQuestion } from '@/lib/assessment/schema';

export const recursion_fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "AL-REC-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Recursion & Backtracking",
  "subtopic": "Recursion Fundamentals",
  "specialization": "Base Cases",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What happens if a recursive function lacks a reachable Base Case?",
    "ar": "ماذا يحدث إذا افتقرت الدالة العودية (Recursive Function) إلى حالة أساس (Base Case) يمكن الوصول إليها؟"
  },
  "options": [
    {
      "id": "ret0",
      "text": {
        "en": "The compiler quietly intercepts endless calls and substitutes a zero return value",
        "ar": "يتدخل المترجم بصمت ويُرجع القيمة 0 تلقائياً عند تجاوز مئة استدعاء متداخل"
      }
    },
    {
      "id": "loop",
      "text": {
        "en": "It runs in O(1) constant time",
        "ar": "تعمل بزمن O(1) ثابت"
      }
    },
    {
      "id": "sof",
      "text": {
        "en": "Infinite recursion runs until the call stack overflows",
        "ar": "تستمر العودية بلا توقف حتى يفيض المكدس (Stack Overflow)"
      }
    },
    {
      "id": "heap",
      "text": {
        "en": "The runtime automatically garbage-collects all stack frames without interruption",
        "ar": "يُحرر المكدس تلقائياً كافة المتغيرات المحلية بعد كل جولة دون انهيار البرنامج"
      }
    }
  ],
  "correctAnswer": "sof",
  "explanation": {
    "en": "Every recursive call allocates another frame on the fixed-size call stack; without a terminating base case, memory exhausts and crashes with a Stack Overflow.",
    "ar": "كل استدعاء عودي يضيف إطاراً جديداً إلى مكدس الاستدعاءات ذي الحجم المحدود؛ وبدون نقطة توقف ينفد المكدس ويحدث Stack Overflow."
  },
  "tags": [
    "recursion",
    "call-stack"
  ]
} as AssessmentQuestion,
{
  "id": "AL-REC-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Recursion & Backtracking",
  "subtopic": "Base Cases",
  "specialization": "Termination",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What immediate failure occurs when a recursive function forgets to narrow inputs toward a reachable Base Case?",
    "ar": "ما العطل المباشر الذي يحدث عندما تستدعي دالة نفسها عودياً دون تقليص المدخل نحو حالة أساس (Base Case)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Infinite recursion fills the thread Call Stack until Stack Overflow crash",
        "ar": "تستمر الاستدعاءات بلا توقف حتى يمتلئ مكدس النداءات وينهار البرنامج"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "The CPU skips self-calls after 5 steps and returns zero automatically",
        "ar": "يتجاهل المعالج الاستدعاءات بعد 5 خطوات"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "The OS moves parameters automatically to permanent SSD Swap space cleanly",
        "ar": "ينقل النظام الإطارات إلى SSD بسلاسة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Compilers rewrite missing base cases into O(1) bit-shift formulas",
        "ar": "يحول المترجم الدالة لصيغة ثابتة O(1)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Every self-call pushes a new Stack Frame; without a guaranteed decreasing path to a Base Case, Stack memory exhausts cleanly.",
    "ar": "كل استدعاء عودي يضيف إطاراً للـ Stack؛ ودون وصول لحالة الأساس ينهار البرنامج بنفاد المكدس."
  },
  "tags": [
    "recursion",
    "base-case",
    "stack-overflow"
  ]
} as AssessmentQuestion,
{
  "id": "AL-REC-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Recursion & Backtracking",
  "subtopic": "Recursion Trees",
  "specialization": "Space Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "A naive recursive function makes 2 recursive branches (`f(n-1)`) down to `n = 0` without memoization. What is its Time vs Space complexity?",
    "ar": "دالة عودية تتفرع لفرعين (`f(n-1)`) حتى عمق `n` بدون حفظ نتائج. ما التعقيد الزمني مقابل التعقيد المكاني؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Time O(N) and Space O(2^N)",
        "ar": "زمن O(N) ومساحة O(2^N)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Both Time and Space O(log N)",
        "ar": "كلاهما O(log N)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Time O(2^N) total nodes, Space O(N) max stack depth",
        "ar": "زمن O(2^N) لعدد العقد الكلي، ومساحة O(N) لأقصى عمق مكدس نشط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Both Time and Space O(N^2)",
        "ar": "كلاهما O(N^2)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Binary branching explores `~2^N` tree calls sequentially, while only ONE root-to-leaf path of length `N` lives on the stack simultaneously.",
    "ar": "يُستكشف التفرع الأسي `2^N` زمنياً، بينما لا يشغل الـ Stack في لحظة واحدة أكثر من مسار واحد عمقه `N`."
  },
  "tags": [
    "recursion-tree",
    "space-complexity",
    "big-o"
  ]
} as AssessmentQuestion,
{
  "id": "AL-REC-E-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Recursion & Backtracking",
  "subtopic": "Recursion Trees",
  "specialization": "Execution Trace",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "void countdown(int n) {\n  if (n == 0) return;\n  countdown(n - 1);\n  cout << n << \" \";\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Look carefully at line placement: `cout` runs AFTER the recursive call! What does `countdown(3)` print?",
    "ar": "لاحظ موضع الطباعة بعد الاستدعاء العودي! ماذا يطبع استدعاء `countdown(3)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "3 2 1",
        "ar": "3 2 1"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "0 1 2 3",
        "ar": "0 1 2 3"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "3 2 1 0",
        "ar": "3 2 1 0"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "1 2 3",
        "ar": "1 2 3"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Each frame waits for its child call first, so `n = 1` finishes and prints first during stack unwinding -> `1 2 3`.",
    "ar": "الطباعة بعد العودية تنفَّذ أثناء فك المكدس من أعمق إطار (`1`) عائداً للأعلى (`3`) فتطبع `1 2 3`."
  },
  "tags": [
    "recursion",
    "call-stack",
    "trace"
  ]
} as AssessmentQuestion
];
