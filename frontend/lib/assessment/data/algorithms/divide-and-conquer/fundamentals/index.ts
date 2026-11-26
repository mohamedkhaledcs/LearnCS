import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "AL-DC-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Divide and Conquer",
  "subtopic": "Fundamentals",
  "specialization": "Three Phases",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What are the three canonical steps of a Divide-and-Conquer algorithm?",
    "ar": "ما هي الخطوات الثلاث القياسية في خوارزميات فرق تسد (Divide-and-Conquer)؟"
  },
  "options": [
    {
      "id": "d_c_c",
      "text": {
        "en": "Divide the problem, Conquer subproblems recursively, Combine subproblem results",
        "ar": "تقسيم المشكلة (Divide)، حل المشاكل الفرعية (Conquer)، دمج النتائج"
      }
    },
    {
      "id": "sort_h_m",
      "text": {
        "en": "Sort input, Hash keys, Memoize output",
        "ar": "ترتيب المدخلات، تجزئة المفاتيح، وحفظ النتائج"
      }
    },
    {
      "id": "push_p_b",
      "text": {
        "en": "Push to stack, Peek top, Backtrack all branches",
        "ar": "الدفع للمكدس، القراءة من الأعلى، التراجع عبر جميع الفروع"
      }
    },
    {
      "id": "greed_i_r",
      "text": {
        "en": "Pick local best, Iterate linearly, Return first match",
        "ar": "اختيار الأفضل محلياً، التكرار الخطي، إرجاع أول تطابق"
      }
    }
  ],
  "correctAnswer": "d_c_c",
  "explanation": {
    "en": "Divide-and-Conquer splits an instance into smaller independent subproblems (Divide), solves them recursively (Conquer), and merges the answers (Combine).",
    "ar": "تقوم الاستراتيجية بتقسيم المشكلة إلى أجزاء أصغر مستقلة، ثم حلها عودياً، وأخيراً دمج الحلول الفرعية للوصول للحل الكامل."
  },
  "tags": [
    "divide-and-conquer",
    "recursion",
    "algorithms"
  ]
} as AssessmentQuestion,
{
  "id": "AL-REC-H-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Divide and Conquer",
  "subtopic": "Binary Exponentiation",
  "specialization": "O(log N) Power",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "long long pwr(long long a, long long b) {\n  if (b == 0) return 1;\n  long long half = pwr(a, b / 2);\n  return (b % 2) ? half * half * a : half * half;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why must `half = pwr(a, b / 2)` be stored in a variable instead of writing `pwr(a, b / 2) * pwr(a, b / 2)` directly?",
    "ar": "لماذا نحفظ نتيجة `pwr(a, b / 2)` في المتغير `half` بدلاً من كتابة `pwr(a, b / 2) * pwr(a, b / 2)` مرتين؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Calling twice turns O(log B) divide-and-conquer into O(B) redundant work",
        "ar": "لأن استدعاءها مرتين يضاعف التفرع ويُهدر ميزة القسمة ليصبح الزمن `O(B)` بدل `O(log B)`"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Multiplying two recursive calls directly forces overflow on base-1 inputs cleanly",
        "ar": "لأن ضرب استدعاءين يفيض دائماً عند الصفر"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Compilers ban calling the same recursive function twice on one return line",
        "ar": "لأن المترجم يمنع استدعاءين في سطر واحد"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Bit shifts inside division fail without temporary stack storage",
        "ar": "لأن القسمة تتعطل بدون متغير"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Two identical subcalls branch `2^(log2 B) = B` times cleanly degrading to linear O(B)! Saving `half` evaluates only 1 subcall per depth level -> `O(log B)`.",
    "ar": "تكرار الاستدعاء مرتين يلغي الاستفادة من التنصيف؛ حفظ `half` يبقي شجرة الاستدعاء خطاً واحداً بطول `log B`."
  },
  "tags": [
    "divide-and-conquer",
    "recursion",
    "complexity"
  ]
} as AssessmentQuestion
];
