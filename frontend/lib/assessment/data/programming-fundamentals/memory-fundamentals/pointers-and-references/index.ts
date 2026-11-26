import { AssessmentQuestion } from '@/lib/assessment/schema';

export const pointers_and_references_questions: AssessmentQuestion[] = [
{
  "id": "PF-PTR-H-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Memory Fundamentals",
  "subtopic": "Pointers & References",
  "specialization": "Dangling Pointers",
  "difficulty": "hard",
  "type": "debugging",
  "question": {
    "en": "What causes a 'Dangling Pointer' bug in manual-memory languages like C/C++?",
    "ar": "ما الذي يسبب خطأ المؤشر المتدلي (Dangling Pointer) في لغات مثل C/C++؟"
  },
  "options": [
    {
      "id": "init",
      "text": {
        "en": "Explicitly initializing a newly declared pointer variable to `nullptr` before assignment",
        "ar": "تهيئة المؤشر الجديد صراحةً بالقيمة الصفرية الآمنة `nullptr` قبل تخصيص أي عنوان له"
      }
    },
    {
      "id": "freed",
      "text": {
        "en": "A pointer still holds the address of freed heap memory or an exited stack frame",
        "ar": "احتفاظ المؤشر بعنوان ذاكرة محررة مسبقاً أو لإطار دالة منتهية"
      }
    },
    {
      "id": "const",
      "text": {
        "en": "Passing an immutable read-only `const int&` reference parameter to a helper function",
        "ar": "تمرير مرجع قراءة فقط ثابت `const int&` إلى دالة مساعدة لا تعدل القيمة الأصلية"
      }
    },
    {
      "id": "big",
      "text": {
        "en": "Allocating an array larger than 100 ints",
        "ar": "حجز مصفوفة بحجم أكبر من 100 عنصر"
      }
    }
  ],
  "correctAnswer": "freed",
  "explanation": {
    "en": "Dereferencing a dangling pointer reads/writes reclaimed memory (Undefined Behavior / security vulnerabilities). Setting freed pointers to nullptr or using smart pointers prevents this.",
    "ar": "إلغاء الإشارة (dereference) لمؤشر يشير لذاكرة محررة سلوك غير معرف وخطير؛ يُتجنب بتصفير المؤشر أو استخدام Smart Pointers."
  },
  "tags": [
    "memory",
    "pointers",
    "heap",
    "stack"
  ]
} as AssessmentQuestion,
{
  "id": "PF-MEM-M-003",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Memory Fundamentals",
  "subtopic": "Pointers",
  "specialization": "Null Safety",
  "difficulty": "medium",
  "type": "debugging",
  "codeSnippet": "Node* head = findNode(99); // returns nullptr if missing\ncout << head->val;",
  "codeLanguage": "cpp",
  "question": {
    "en": "What immediate defect happens when key `99` is absent and `head->val` runs unchecked?",
    "ar": "ما المشكلة الفورية عندما لا يوجد العنصر `99` وتنفذ الدالة `head->val` دون فحص؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "`head->val` safely prints negative zero cleanly",
        "ar": "تطبع الدالة قيمة 0 بأمان"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "C++ inserts a dummy sentinel node on heap automatically",
        "ar": "ينشئ المترجم عقدة وهمية تلقائياً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Null pointer dereference causing segmentation fault / crash",
        "ar": "قراءة مؤشر فارغ (Null Pointer Dereference) تؤدي لانهيار البرنامج فوراً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "`nullptr` silently creates a zero-sized array",
        "ar": "ينشئ مصفوفة فارغة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Dereferencing null addresses crashes immediately unless guarded beforehand (`if (head != nullptr)`).",
    "ar": "يجب التحقق دائماً من `head != nullptr` قبل الوصول للحقول."
  },
  "tags": [
    "null-pointer",
    "pointers",
    "debugging"
  ]
} as AssessmentQuestion,
{
  "id": "PF-MEM-H-005",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Memory Fundamentals",
  "subtopic": "Pointers",
  "specialization": "Dangling Local Pointer",
  "difficulty": "hard",
  "type": "debugging",
  "codeSnippet": "int* makeScore() {\n  int s = 42;\n  return &s;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why is `makeScore()` strictly unsafe in C++ even though the code may compile cleanly?",
    "ar": "لماذا تُعد الدالة `makeScore()` خطيرة وتسبب خللاً في الذاكرة رغم أنها قد تترجم بنجاح؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Local `s` pops off Stack at return, leaving `&s` dangling",
        "ar": "يزول `s` من المكدس عند العودة فيصبح `&s` مؤشراً معلقاً فاسداً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Signed integers equal to 42 exceed standard single-pointer addressing width limits",
        "ar": "العدد 42 يتجاوز سعة المؤشر الواحد ويُفعّل ضغط الذاكرة بتعقيد أسي O(N!) عند العودة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "C++ strictly forbids returning non-void pointers from any zero-argument helper call",
        "ar": "تمنع C++ تماماً إرجاع أي مؤشر من الدوال التي لا تستقبل معاملات إدخال واضحة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "C++ refuses returning integer pointers from zero-arg functions",
        "ar": "الدالة بدون معاملات لا ترجع مؤشراً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Returning addresses of stack locals points to reclaimed stack frames later overwritten by future calls.",
    "ar": "إعادة عنوان متغير محلي في الـ Stack يشير لموضع ذاكرة لم يعد صالحاً بعد العودة."
  },
  "tags": [
    "dangling-pointer",
    "stack",
    "cpp"
  ]
} as AssessmentQuestion,
{
  "id": "PF-MEM-E-006",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Memory Fundamentals",
  "subtopic": "RAII",
  "specialization": "Smart Pointers",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What automatic cleanup benefit makes `std::unique_ptr` strongly preferred over raw `new` / `delete` in modern C++?",
    "ar": "ما الميزة التي تجعل `std::unique_ptr` مفضلاً بقوة على `new` و`delete` اليدوية في C++ الحديثة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Lets concurrent worker threads bypass mutex locks safely without race bugs",
        "ar": "يسمح لعدة خيوط بتخطي أقفال المزامنة نهائياً دون حدوث أي تسابق على البيانات"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Releases owned heap memory automatically on scope exit or exception",
        "ar": "يحرر الذاكرة المملوكة تلقائياً عند الخروج من النطاق أو وقوع استثناء"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Compresses heap structs directly inside CPU L1 floating-point registers",
        "ar": "يضغط الكائنات داخل مسجلات L1 السريعة ويعطّل فحوصات تجاوز حدود المصفوفة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Disables runtime bounds errors inside array subscripts",
        "ar": "يعطل أخطاء حدود المصفوفة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Deterministic RAII destructors ensure single-owner heap resources never leak across branches or exceptions.",
    "ar": "نمط RAII يربط التنظيف بنطاق المتغير فلا يُنسى تحرير الذاكرة أبداً."
  },
  "tags": [
    "raii",
    "unique-ptr",
    "cpp"
  ]
} as AssessmentQuestion
];
