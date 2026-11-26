import { AssessmentQuestion } from '@/lib/assessment/schema';

export const loops_questions: AssessmentQuestion[] = [
{
  "id": "PF-LOOP-M-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Control Structures",
  "subtopic": "Loops",
  "specialization": "While vs Do-While",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is the primary difference between a 'while' loop and a 'do-while' loop?",
    "ar": "ما هو الفرق الرئيسي بين حلقة 'while' وحلقة 'do-while'؟"
  },
  "options": [
    {
      "id": "execution",
      "text": {
        "en": "A do-while loop guarantees the body executes at least once.",
        "ar": "تضمن حلقة do-while تنفيذ الكود بداخلها مرة واحدة على الأقل."
      }
    },
    {
      "id": "syntax",
      "text": {
        "en": "A do-while loop cannot use a break statement.",
        "ar": "لا يمكن لحلقة do-while استخدام تعليمة break."
      }
    },
    {
      "id": "performance",
      "text": {
        "en": "A while loop is always faster.",
        "ar": "حلقة while دائماً أسرع."
      }
    },
    {
      "id": "condition",
      "text": {
        "en": "A while loop can only evaluate boolean variables, not expressions.",
        "ar": "حلقة while يمكنها فقط تقييم المتغيرات المنطقية، وليس التعبيرات."
      }
    }
  ],
  "correctAnswer": "execution",
  "explanation": {
    "en": "While checks the condition BEFORE the first iteration (so it may run 0 times); do-while executes the body first and evaluates the condition afterward, guaranteeing >= 1 iteration.",
    "ar": "تفحص حلقة while الشرط قبل الدخول فتعمل 0 مرة إذا كان خطأ، بينما تنفذ do-while الجسم أولاً ثم تفحص الشرط فتعمل مرة واحدة على الأقل."
  }
} as AssessmentQuestion,
{
  "id": "PF-LOP-E-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Control Structures",
  "subtopic": "Loops",
  "specialization": "Break vs Continue",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n  if (i == 3) continue;\n  if (i == 5) break;\n  sum += i;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "What final total is accumulated inside `sum`?",
    "ar": "ما قيمة المجموع النهائي المخزنة في `sum` بعد انتهاء الحلقة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "3",
        "ar": "3"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "12",
        "ar": "12"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "15",
        "ar": "15"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "7",
        "ar": "7"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`i = 1` (+1), `2` (+2), `3` skipped via `continue`, `4` (+4), and `5` exits loop via `break`. Total `1 + 2 + 4 = 7`.",
    "ar": "تُجمع 1 و2 ثم تتخطى `continue` القيمة 3 وتُجمع 4 ثم توقف `break` عند 5، فيكون المجموع `1 + 2 + 4 = 7`."
  },
  "tags": [
    "loops",
    "continue",
    "break"
  ]
} as AssessmentQuestion,
{
  "id": "PF-LOP-M-003",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Control Structures",
  "subtopic": "Loops",
  "specialization": "Do-While",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does a `do { ... } while (cond);` loop differ structurally from `while (cond) { ... }`?",
    "ar": "ما الفرق الهيكلي الدقيق بين حلقة `do-while` وحلقة `while` الاعتيادية؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "`do-while` executes body statements once BEFORE evaluating the loop condition",
        "ar": "تنفذ `do-while` جسم الحلقة مرة واحدة على الأقل قبل فحص الشرط"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "`do-while` runs backward from array length down to index zero automatically",
        "ar": "تدور `do-while` عكسياً من النهاية تلقائياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "`while` evaluates its condition strictly after executing ten iterations",
        "ar": "تفحص `while` الشرط بعد عشر دورات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "`do-while` forbids using local counter variables inside the body",
        "ar": "تمنع `do-while` المتغيرات المحلية"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Post-condition checking makes `do-while` natural for interactive menus that must prompt at least once.",
    "ar": "فحص الشرط في النهاية يجعل `do-while` مناسبة للقوائم والمدخلات التي تتطلب تشغيلها مرة مبدئياً."
  },
  "tags": [
    "do-while",
    "loops",
    "control-flow"
  ]
} as AssessmentQuestion,
{
  "id": "PF-LOP-E-005",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Control Structures",
  "subtopic": "Loops",
  "specialization": "Off-by-One",
  "difficulty": "easy",
  "type": "debugging",
  "codeSnippet": "for (int i = 0; i <= vec.size(); i++) {\n  total += vec[i];\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Identify the defect inside this 0-indexed vector summation loop:",
    "ar": "حدّد الخطأ الكامن في حلقة الجمع أعلاه على مصفوفة تبدأ بالفهرس 0:"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "`i = 0` skips the positive head integer unintentionally",
        "ar": "البدء من الصفر يتجاهل أول عنصر"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "`total +=` overwrites elements in read-only segments",
        "ar": "الجمع يعدل المصفوفة الأصلية"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`i <= vec.size()` reads 1 slot past valid last index",
        "ar": "الشرط `i <= vec.size()` يقرأ خانة زائدة خارج نهاية المصفوفة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "`vec.size()` takes O(N) inside `vector`",
        "ar": "استدعاء `size()` يكلف O(N)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Zero-based indexing occupies `[0 .. n - 1]`; `i < vec.size()` prevents out-of-bounds access at index `n`.",
    "ar": "الفهارس الصالحة من `0` إلى `size() - 1`، لذا يجب استخدام `<` وليس `<=`."
  },
  "tags": [
    "off-by-one",
    "loops",
    "debugging"
  ]
} as AssessmentQuestion
];
