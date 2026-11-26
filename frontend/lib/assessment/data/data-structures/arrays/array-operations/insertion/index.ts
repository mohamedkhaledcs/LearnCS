import { AssessmentQuestion } from '@/lib/assessment/schema';

export const insertion_questions: AssessmentQuestion[] = [
{
  "id": "DS-ARRINS-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Insertion",
  "specialization": "Shifting Elements",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "What is the worst-case time complexity to insert an element at index 0 of a contiguous dynamic array of N elements?",
    "ar": "ما هو أسوأ تعقيد زمني لإدراج عنصر جديد في الفهرس 0 داخل مصفوفة متصلة طولها N؟"
  },
  "options": [
    {
      "id": "o1",
      "text": {
        "en": "O(1) constant time unconditionally via direct pointer swap at index zero",
        "ar": "O(1) زمن ثابت دائماً عبر تعديل مؤشر البداية في المصفوفة المتصلة بلا إزاحة"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log N)",
        "ar": "O(log N)"
      }
    },
    {
      "id": "on",
      "text": {
        "en": "O(N) because all N elements must shift one position right",
        "ar": "O(N) بسبب إزاحة كل العناصر الـ N خطوة واحدة لليمين"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(N²) quadratic time because elements sort themselves after every front append",
        "ar": "O(N²) زمن تربيعي لأن النظام يعيد فرز بقية المصفوفة بعد كل إضافة في المقدمة"
      }
    }
  ],
  "correctAnswer": "on",
  "explanation": {
    "en": "Because arrays keep elements contiguous in memory, inserting at the front forces shifting every subsequent element right, requiring N operations.",
    "ar": "بسبب تجاور عناصر المصفوفة في الذاكرة، يتطلب الإدراج في البداية تحريك باقي العناصر لليمين بعملية O(N)."
  },
  "tags": [
    "arrays",
    "data-structures"
  ]
} as AssessmentQuestion,
{
  "id": "DS-ARR-E-002",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Insertion",
  "specialization": "Middle Insert Cost",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "What is the worst-case time complexity of inserting a value at index `0` inside a contiguous array of length `N`?",
    "ar": "ما التعقيد الزمني في أسوأ حالة لإدراج عنصر جديد في الفهرس `0` بمصفوفة طولها `N`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(1) constant index write",
        "ar": "O(1) ثابت دائماً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(log N) midpoint shifts",
        "ar": "O(log N)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N) because all N existing elements shift one slot right",
        "ar": "O(N) بسبب إزاحة كل العناصر الـ N خطوةً لليمين"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(N^2) because dynamic capacity shrinks",
        "ar": "O(N^2)"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Inserting at index 0 displaces every subsequent element forward by one slot (`N` shifts -> `O(N)`).",
    "ar": "الإدراج في البداية يفرض تحريك جميع العناصر اللاحقة بمقدار خانة واحدة بتكلفة `O(N)`."
  },
  "tags": [
    "arrays",
    "insertion",
    "complexity"
  ]
} as AssessmentQuestion,
{
  "id": "DS-ARR-M-003",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Dynamic Arrays",
  "specialization": "Amortized Growth",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "If a dynamic array grows linearly by `+1` slot per resize instead of `2x` doubling, appending `N` elements from empty degrades to:",
    "ar": "إذا زادت المصفوفة الديناميكية سعتها بخانة `+1` فقط عند كل امتلاء بدلاً من المضاعفة `2x`، فما تكلفة إضافة `N` عنصراً؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N log N)",
        "ar": "O(N log N)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(N) amortized",
        "ar": "O(N) متوسطاً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(1) per batch",
        "ar": "O(1)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N^2) total copy operations",
        "ar": "O(N^2) بسبب نسخ المصفوفة بالكامل عند كل عنصر"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Resizing by +1 copies `1 + 2 + ... + N = N(N+1)/2 = O(N^2)` elements, whereas geometric `2x` doubling stays `O(N)` total!",
    "ar": "الزيادة الخطية تكرر النسخ في كل خطوة بمجموع حسابي `O(N^2)` بينما المضاعفة الهندسية تبقيها `O(N)`."
  },
  "tags": [
    "dynamic-array",
    "amortized",
    "complexity"
  ]
} as AssessmentQuestion
];
