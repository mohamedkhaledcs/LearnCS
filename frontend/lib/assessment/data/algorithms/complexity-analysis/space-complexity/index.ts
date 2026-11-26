import { AssessmentQuestion } from '@/lib/assessment/schema';

export const space_complexity_questions: AssessmentQuestion[] = [
{
  "id": "AL-SPACE-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Space Complexity",
  "specialization": "Call Stack Depth",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "What is the auxiliary space complexity of standard recursive factorial(n) without tail-call optimization?",
    "ar": "ما هو تعقيد المساحة المساعدة (Auxiliary Space Complexity) لدالة المضروب العودية factorial(n) دون تحسين الاستدعاء الذيل؟"
  },
  "options": [
    {
      "id": "o1",
      "text": {
        "en": "O(1) because no arrays are allocated",
        "ar": "O(1) لأنه لا يتم حجز أي مصفوفات"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log n)",
        "ar": "O(log n)"
      }
    },
    {
      "id": "on",
      "text": {
        "en": "O(n) due to n active stack frames",
        "ar": "O(n) بسبب وجود n إطارات نشطة في مكدس الاستدعاءات"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(n²)",
        "ar": "O(n²)"
      }
    }
  ],
  "correctAnswer": "on",
  "explanation": {
    "en": "Each recursive step factorial(k) pushes a stack frame before reaching the base case factorial(0), creating maximum call-stack depth n.",
    "ar": "يدفع كل استدعاء عودي إطاراً جديداً إلى الـ Call Stack حتى حالة الأساس، ليصل عمق المكدس إلى n في وقت واحد."
  },
  "tags": [
    "complexity",
    "space-complexity",
    "recursion"
  ]
} as AssessmentQuestion,
{
  "id": "AL-CMP-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Space Complexity",
  "specialization": "Auxiliary vs Total",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "An in-place array partition swaps elements using 3 integer variables on a 10-million-element vector. What is its Auxiliary Space Complexity?",
    "ar": "تقوم خوارزمية فرز في الموضع بتبديل عناصر مصفوفة ضخمة (10 ملايين عنصر) باستخدام 3 متغيرات فقط. ما التعقيد المكاني الإضافي (Auxiliary Space)؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "O(N) for reading input",
        "ar": "O(N)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "O(1) constant auxiliary space",
        "ar": "O(1) مساحة إضافية ثابتة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N log N) pointer space",
        "ar": "O(N log N)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(log N) temporary registers",
        "ar": "O(log N)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Auxiliary space measures extra working memory beyond input storage; 3 scalars consume constant O(1) extra space.",
    "ar": "التعقيد المكاني الإضافي يحسب الذاكرة المضافة فوق المدخل نفسه، وثلاثة متغيرات تعد `O(1)`."
  },
  "tags": [
    "space-complexity",
    "in-place",
    "big-o"
  ]
} as AssessmentQuestion
];
