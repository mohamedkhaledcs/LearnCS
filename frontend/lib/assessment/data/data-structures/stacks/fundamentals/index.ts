import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "DS-STACK-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Stacks",
  "subtopic": "Applications",
  "specialization": "Stack Uses",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which Data Structure is naturally suited for evaluating postfix mathematical expressions?",
    "ar": "أي Data Structure مناسبة بطبيعتها لتقييم العمليات الحسابية بصيغة الـ postfix؟"
  },
  "options": [
    {
      "id": "queue",
      "text": {
        "en": "Queue",
        "ar": "Queue"
      }
    },
    {
      "id": "graph",
      "text": {
        "en": "Graph",
        "ar": "Graph"
      }
    },
    {
      "id": "tree",
      "text": {
        "en": "Tree",
        "ar": "Tree"
      }
    },
    {
      "id": "stack",
      "text": {
        "en": "Stack",
        "ar": "Stack"
      }
    }
  ],
  "correctAnswer": "stack",
  "explanation": {
    "en": "Postfix (Reverse Polish) evaluation pushes operands onto a Stack and pops the top two whenever an operator is encountered, matching LIFO evaluation order naturally.",
    "ar": "يعتمد تقييم صيغ Postfix على دفع المعاملات إلى المكدس (Stack) وسحب آخر عنصرين عند مصادفة أي عامل حسابي وفق مبدأ LIFO."
  }
} as AssessmentQuestion,
{
  "id": "DS-SQ-E-002",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Stacks",
  "subtopic": "Stack Applications",
  "specialization": "Real Use Cases",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which everyday software mechanism naturally operates using LIFO Stack ordering?",
    "ar": "أي آلية برمجية شائعة تعمل بطبيعتها على مبدأ المكدس Stack (LIFO)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Printer spooler printing oldest submitted jobs in arrival order",
        "ar": "طابور الطباعة حسب أقدمية الإرسال"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "BFS discovering unweighted shortest road hops layer by layer",
        "ar": "بحث BFS طبقةً بطبقة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "PostgreSQL B-Tree range index scan across sorted primary keys",
        "ar": "مسح فهارس B-Tree في PostgreSQL"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Call stack frames, browser Back history, and editor Undo actions",
        "ar": "مكدس استدعاء الدوال، سجل الرجوع Back في المتصفح، وأمر التراجع Undo"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Undo, function calls, and browser Back always unwind the MOST RECENT action first (LIFO).",
    "ar": "التراجع Back وUndo وإغلاق الدوال تفك دائماً آخر حدث تم تنفيذه أولاً."
  },
  "tags": [
    "stack",
    "lifo",
    "applications"
  ]
} as AssessmentQuestion,
{
  "id": "DS-SQ-H-005",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Stacks",
  "subtopic": "Monotonic Stack",
  "specialization": "Next Greater Element",
  "difficulty": "hard",
  "type": "complexity",
  "question": {
    "en": "Finding the Next Greater Element to the right for EVERY array index using a Monotonic Stack runs in what total time?",
    "ar": "ما التعقيد الزمني لإيجاد أول عنصر أكبر على اليمين (Next Greater Element) لجميع عناصر مصفوفة طولها `N` باستخدام Monotonic Stack؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N^2) due to inner while popping loop",
        "ar": "O(N^2) بسبب حلقة while الداخلية"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(N log N) sorting candidate stacks",
        "ar": "O(N log N)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N) amortized because every item is pushed and popped at most once",
        "ar": "O(N) لأن كل عنصر يُدفع ويُخرج من المكدس مرة واحدة على الأكثر"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(log N) total binary stack splits",
        "ar": "O(log N)"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Despite a nested `while`, total push+pop count across the entire scan never exceeds `2N`, yielding O(N).",
    "ar": "مجموع عمليات الإدخال والإخراج لكل عنصر لا يتعدى مرتين، ما يعطي تعقيداً خطياً `O(N)`."
  },
  "tags": [
    "monotonic-stack",
    "complexity",
    "stacks"
  ]
} as AssessmentQuestion,
{
  "id": "DS-SQ-E-006",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Stacks",
  "subtopic": "Bracket Matching",
  "specialization": "Leftover Openers",
  "difficulty": "easy",
  "type": "scenario",
  "codeSnippet": "stack<char> st;\n// input string: \"(()\"\n// loop finishes without mismatch; now what?",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why must a balanced-bracket checker confirm `st.empty()` at the end for inputs like `\"(()\"`?",
    "ar": "لماذا يجب أن يتحقق مدقق توازن الأقواس من شرط `st.empty()` في النهاية لمدخل مثل `\"(()\"`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Stacks return negative values automatically when size equals zero",
        "ar": "لأن المكدس الفارغ يعيد قيماً سالبة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Because closing brackets get inserted before loop execution cleanly",
        "ar": "لأن أقواس الإغلاق تضاف قبل الحلقة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "To allow O(1) duplicate removals on arrays",
        "ar": "لإزالة التكرارات في O(1)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Leftover unmatched opening brackets remain sitting in the stack after loop end",
        "ar": "لأن أقواس الفتح غير المغلقة تبقى متراكمة داخل المكدس بعد انتهاء النص"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Input `\"(()\"` triggers zero mismatched closing symbols yet stays unbalanced because 1 `'('` remained open.",
    "ar": "المدخل `(()` لا يحوي قوس إغلاق خاطئ، لكنه ترك قوس فتح غير مغلق يجب كشفه بـ `st.empty()`."
  },
  "tags": [
    "stack",
    "edge-case",
    "parentheses"
  ]
} as AssessmentQuestion
];
