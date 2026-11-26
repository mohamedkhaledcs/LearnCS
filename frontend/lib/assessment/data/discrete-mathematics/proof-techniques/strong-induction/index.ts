import { AssessmentQuestion } from '@/lib/assessment/schema';

export const strong_induction_questions: AssessmentQuestion[] = [
{
  "id": "DM-SIND-H-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Proof Techniques",
  "subtopic": "Strong Induction",
  "specialization": "Divide-and-Conquer Proofs",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "When proving correctness of Merge Sort or Prime Factorization (where an integer factors into smaller arbitrary pieces < n, not just n - 1), which induction hypothesis is used?",
    "ar": "عند إثبات صحة خوارزميات مثل Merge Sort أو التحليل لعوامل أولية (حيث ينقسم الحجم n إلى أحجام أصغر لا مجرد n - 1)، أي نوع من الاستقراء نستخدم؟"
  },
  "options": [
    {
      "id": "strong",
      "text": {
        "en": "Strong Induction assumes P(m) for ALL integers b <= m <= k before proving P(k + 1)",
        "ar": "الاستقراء القوي يفترض صحة P(m) لكل b <= m <= k لإثبات P(k + 1)"
      }
    },
    {
      "id": "contra",
      "text": {
        "en": "Weak induction assuming P(k) alone suffices without smaller subproblem steps",
        "ar": "الاستقراء الضعيف الذي يفترض صحة P(k) فقط دون النظر للقيم الأصغر من k مباشرة"
      }
    },
    {
      "id": "cpos",
      "text": {
        "en": "Exhaustive finite truth table enumeration over small integer samples alone",
        "ar": "سرد جداول الصدق المحدودة لعدة أمثلة رقمية صغيرة لتعميم القاعدة على باقي الأعداد"
      }
    },
    {
      "id": "div",
      "text": {
        "en": "Non-deterministic proof",
        "ar": "برهان احتمالي"
      }
    }
  ],
  "correctAnswer": "strong",
  "explanation": {
    "en": "Strong induction gives access to P(⌊n/2⌋), P(⌈n/2⌉), or any smaller factor P(d) with 2 <= d <= k, which weak induction's single P(k) hypothesis cannot cover directly.",
    "ar": "يمنحك الاستقراء القوي الحق في استخدام فرضية الصحة لأي حجم أصغر (مثل n/2 في Merge Sort)."
  },
  "tags": [
    "discrete-math",
    "proofs",
    "algorithms"
  ]
} as AssessmentQuestion
];
