import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "AL-DP-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "Memoization",
  "specialization": "Concept",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which of the following best describes 'Memoization' in Dynamic Programming?",
    "ar": "أي مما يلي يصف الـ Memoization في الـ Dynamic Programming بأفضل شكل؟"
  },
  "options": [
    {
      "id": "caching",
      "text": {
        "en": "A top-down approach that caches the results of expensive function calls.",
        "ar": "نهج من الأعلى للأسفل (top-down) يقوم بتخزين (caching) نتائج الدوال المكلفة."
      }
    },
    {
      "id": "bottom_up",
      "text": {
        "en": "A bottom-up approach that solves all subproblems first.",
        "ar": "نهج من الأسفل للأعلى (bottom-up) يحل جميع المشاكل الفرعية أولاً."
      }
    },
    {
      "id": "greedy",
      "text": {
        "en": "Making the locally optimal choice at each stage.",
        "ar": "اتخاذ الخيار الأفضل محلياً في كل مرحلة."
      }
    },
    {
      "id": "divide",
      "text": {
        "en": "Dividing the problem into independent, non-overlapping subproblems.",
        "ar": "تقسيم المشكلة إلى مشاكل فرعية مستقلة وغير متداخلة."
      }
    }
  ],
  "correctAnswer": "caching",
  "explanation": {
    "en": "Memoization uses a top-down recursive formulation and stores (caches) the result of each subproblem key so repeated subproblems are looked up in O(1) instead of recomputed.",
    "ar": "تستخدم الـ Memoization النهج التنازلي بالعودية مع تخزين نتائج كل مشكلة فرعية في الذاكرة لتجنب إعادة حسابها لاحقاً."
  }
} as AssessmentQuestion,
{
  "id": "AL-DPR-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "Memoization vs Tabulation",
  "specialization": "Approaches",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does **Tabulation (Bottom-Up DP)** build state answers compared to Top-Down Memoization?",
    "ar": "كيف تبني طريقة **الجدولة (Bottom-Up Tabulation)** قيم الجدول مقارنةً بالطريقة العودية Top-Down Memoization؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Uses recursive depth-first calls with uninitialized memo caches first",
        "ar": "تعتمد على استدعاء عودي من القمة للأسفل"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Solves smallest base subproblems first iteratively inside loops moving upward cleanly",
        "ar": "تبدأ بحل الحالات الأساسية الصغرى تكرارياً عبر الحلقات صعوداً نحو الهدف"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Randomizes recurrence transitions to reduce table memory",
        "ar": "تختبر حالات عشوائية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Skips base-case initialization until target calculation terminates",
        "ar": "تؤجل حالات الأساس للنهاية"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Iterative Bottom-Up DP fills tables cleanly in dependency order without recursion stack overhead or risk of deep stack overflow.",
    "ar": "البناء التصاعدي بالحلقات أسرع عملياً ولا يستهلك مكدس النداءات العودي."
  },
  "tags": [
    "dp",
    "tabulation",
    "memoization"
  ]
} as AssessmentQuestion
];
