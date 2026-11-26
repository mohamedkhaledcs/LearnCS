import { AssessmentQuestion } from '@/lib/assessment/schema';

export const backtracking_questions: AssessmentQuestion[] = [
{
  "id": "AL-BACK-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Recursion & Backtracking",
  "subtopic": "Backtracking",
  "specialization": "Pruning & State Undo",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In N-Queens or Sudoku Backtracking, why must the algorithm undo its local choice after the recursive call returns?",
    "ar": "في خوارزميات التراجع (Backtracking) مثل N-Queens، لماذا يجب التراجع عن الاختيار الحالي بعد عودة الاستدعاء العودي؟"
  },
  "options": [
    {
      "id": "sort",
      "text": {
        "en": "Keeps all previously discovered backtracking solutions sorted in output order",
        "ar": "لترتيب جميع الحلول المستكشفة سابقاً تنازلياً قبل إرجاع النتيجة النهائية للمستدعي"
      }
    },
    {
      "id": "cache",
      "text": {
        "en": "To convert recursion into Dynamic Programming",
        "ar": "لتحويل الدالة العودية تلقائياً إلى جدول برمجة ديناميكية دون استهلاك ذاكرة"
      }
    },
    {
      "id": "gc",
      "text": {
        "en": "Because modern compilers prohibit local stack variables inside recursive functions",
        "ar": "لأن اللغات تمنع استخدام المصفوفات المحلية"
      }
    },
    {
      "id": "restore",
      "text": {
        "en": "Restores shared state cleanly before testing sibling branches",
        "ar": "لاستعادة الحالة المشتركة قبل استكشاف الفروع الشقيقة"
      }
    }
  ],
  "correctAnswer": "restore",
  "explanation": {
    "en": "Choose -> Explore -> Unchoose (backtrack) restores the mutable state so subsequent branches evaluate cleanly without leftover mutations.",
    "ar": "نمط (اختر -> استكشف -> تراجع) يعيد المصفوفة أو الحالة لنقطة التفرع حتى لا تتلوث باقي المسارات الممكنة."
  },
  "tags": [
    "backtracking",
    "recursion"
  ]
} as AssessmentQuestion,
{
  "id": "AL-REC-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Recursion & Backtracking",
  "subtopic": "Backtracking",
  "specialization": "State Cleanup",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "void gen(int idx, vector<int>& path) {\n  if (idx == n) { out.push_back(path); return; }\n  gen(idx + 1, path);\n  path.push_back(a[idx]);\n  gen(idx + 1, path);\n  path.pop_back(); // Restore state!\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "In subset Backtracking above, what exact role does `path.pop_back()` play on return?",
    "ar": "في دالة Backtracking أعلاه لتوليد المجموعات الجزئية، ما الدور الحاسم للسطر `path.pop_back()`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Sorts the final generated subsets lexicographically before return",
        "ar": "يرتب المجموعات النهائية أبجدياً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Undoes choosing `a[idx]` so sibling exploration branches see a clean state",
        "ar": "يتراجع عن إضافة `a[idx]` لكي ترى التفرعات الشقيقة الحالة النظيفة الأصلية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Prevents `out` from using Heap allocations dynamically",
        "ar": "يمنع حجز ذاكرة للمتجه out"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Terminates the recursion tree twice as early in O(N)",
        "ar": "ينهي الشجرة مبكراً بزمن O(N)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "All branches reuse the same reference `path`; popping restores state cleanly when backtracking upward.",
    "ar": "مشاركة المتجه `path` بالمرجع يقتضي التراجع عن التعديل بعد انتهاء التفرع الفرعي."
  },
  "tags": [
    "backtracking",
    "subsets",
    "recursion"
  ]
} as AssessmentQuestion
];
