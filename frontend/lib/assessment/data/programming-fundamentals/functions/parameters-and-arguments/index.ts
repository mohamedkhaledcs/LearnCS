import { AssessmentQuestion } from '@/lib/assessment/schema';

export const parameters_and_arguments_questions: AssessmentQuestion[] = [
{
  "id": "PF-FUNC-M-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Functions",
  "subtopic": "Parameters & Arguments",
  "specialization": "Pass by Value",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What happens when a primitive variable is passed by value to a function and modified inside that function?",
    "ar": "ماذا يحدث عند تمرير متغير بدائي (primitive variable) بالقيمة (by value) إلى دالة وتعديله داخل تلك الدالة؟"
  },
  "options": [
    {
      "id": "original",
      "text": {
        "en": "The original variable is modified.",
        "ar": "يتم تعديل المتغير الأصلي."
      }
    },
    {
      "id": "copy",
      "text": {
        "en": "Only the local copy inside the function is modified.",
        "ar": "يتم تعديل النسخة المحلية فقط داخل الدالة."
      }
    },
    {
      "id": "error",
      "text": {
        "en": "A compilation error occurs.",
        "ar": "يحدث خطأ أثناء الترجمة (compilation error)."
      }
    },
    {
      "id": "reference",
      "text": {
        "en": "It creates a pointer to the original variable.",
        "ar": "يتم إنشاء مؤشر (pointer) للمتغير الأصلي."
      }
    }
  ],
  "correctAnswer": "copy",
  "explanation": {
    "en": "Pass-by-value copies the argument's value into the function parameter's local variable in its stack frame; modifying that copy leaves the caller's variable untouched.",
    "ar": "ينسخ التمرير بالقيمة (Pass-by-value) قيمة المعامل إلى متغير محلي داخل الدالة، لذا لا يتأثر المتغير الأصلي في الدالة المستدعية."
  }
} as AssessmentQuestion,
{
  "id": "PF-FNC-E-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Functions",
  "subtopic": "Parameters",
  "specialization": "Value vs Reference",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "void doubleIt(int n) { n *= 2; }\nint main() { int score = 15; doubleIt(score); }",
  "codeLanguage": "cpp",
  "question": {
    "en": "After `doubleIt(score);` returns in C++ (pass-by-value), what remains inside `score` in `main`?",
    "ar": "بعد تنفيذ `doubleIt(score);` بالتمرير بالقيمة (Pass-by-Value) في C++، ما قيمة `score` داخل `main`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "15 because `n` modified an independent local parameter copy only",
        "ar": "15 لأن المعامل `n` تلقى نسخة مستقلة من القيمة ولم يمس المتغير الأصلي"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "30 because functions always mutate caller integers",
        "ar": "30 لأن الدالة تعدل الأصل دائماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "0 after parameter frame destruction",
        "ar": "0 بعد انتهاء إطار الدالة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Undefined memory garbage",
        "ar": "قيمة عشوائية غير معرّفة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Pass-by-value copies the scalar value into parameter `n`; updating caller `score` requires passing by reference (`int& n`) or returning a value.",
    "ar": "التمرير بالقيمة ينشئ نسخة محلية؛ ولتعديل الأصل يلزم التمرير بالمرجع `int& n` أو إرجاع القيمة."
  },
  "tags": [
    "functions",
    "pass-by-value",
    "parameters"
  ]
} as AssessmentQuestion,
{
  "id": "PF-FNC-M-005",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Functions",
  "subtopic": "Parameters",
  "specialization": "Const Reference",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "When passing a 1-million-element array into a C++ read-only search function, which parameter signature avoids O(N) copying?",
    "ar": "عند تمرير مصفوفة بمليون عنصر إلى دالة بحث للقراءة فقط في C++، أي توقيع يتفادى نسخ العناصر بتكلفة `O(N)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "int search(vector<int> a, int key)",
        "ar": "int search(vector<int> a, int key)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "int search(const int a, int key)",
        "ar": "int search(const int a, int key)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "void search(vector<int>&& a, int key)",
        "ar": "void search(vector<int>&& a, int key)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "int search",
        "ar": "int search"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`const vector<int>&` passes a lightweight constant reference (O(1)) while preventing accidental array modification.",
    "ar": "المرجع الثابت `& const` ينقل العنوان في `O(1)` مع حماية المصفوفة من التعديل."
  },
  "tags": [
    "cpp",
    "const-ref",
    "performance"
  ]
} as AssessmentQuestion
];
