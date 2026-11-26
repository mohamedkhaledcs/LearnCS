import { AssessmentQuestion } from '@/lib/assessment/schema';

export const dsu_questions: AssessmentQuestion[] = [
{
  "id": "CP-DSU-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Disjoint Set Union (DSU)",
  "specialization": "Amortized Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "Combining BOTH Path Compression and Union by Rank/Size gives DSU an amortized time complexity per operation of...",
    "ar": "دمج تقنيتي ضغط المسار (Path Compression) والدمج حسب الرتبة/الحجم يعطي بنية DSU تعقيداً مستهلكاً للعملية يساوي..."
  },
  "options": [
    {
      "id": "on",
      "text": {
        "en": "O(N) worst-case linear traversal per single find/union step after compression",
        "ar": "O(N) تعقيد خطي متكرر في أسوأ حالة عند استدعاء الدمج في الغابات العميقة"
      }
    },
    {
      "id": "olog2",
      "text": {
        "en": "O(log² N) per find operation combining rank trees and eager path compression",
        "ar": "O(log² N) لكل استعلام عن الجذر نتيجة إعادة موازنة الرتب في كل خطوة"
      }
    },
    {
      "id": "alpha",
      "text": {
        "en": "O(α(N)) inverse Ackermann (effectively <= 5 for any realistic N)",
        "ar": "O(α(N)) دالة أكرمان العكسية (أقل من 5 عملياً لكل N)"
      }
    },
    {
      "id": "sqrtn",
      "text": {
        "en": "O(√N)",
        "ar": "O(√N)"
      }
    }
  ],
  "correctAnswer": "alpha",
  "explanation": {
    "en": "Path compression flattens find paths toward the root while union by rank/size keeps trees shallow, yielding nearly constant O(α(N)) amortized complexity.",
    "ar": "يعمل ضغط المسار مع الاتحاد بالرتبة معاً على تسطيح الأشجار بحيث تصبح العملية ثابتة الزمن عملياً O(α(N))."
  },
  "tags": [
    "cp",
    "dsu",
    "graphs"
  ]
} as AssessmentQuestion,
{
  "id": "CP-RNG-M-003",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Disjoint Set Union",
  "specialization": "Combined Optimizations",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "Combining **Path Compression** in `find()` with **Union by Size/Rank** makes `M` DSU operations across `N` vertices run in:",
    "ar": "الجمع بين **ضغط المسار (Path Compression)** و**الاتحاد حسب الحجم/الرتبة** يجعل تعقيد كل عملية في بنية DSU:"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N log N) total",
        "ar": "O(N log N)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(sqrt(N)) amortized",
        "ar": "O(sqrt(N))"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(M * log N) strictly tight",
        "ar": "O(M * log N)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(alpha(N)) amortized per call",
        "ar": "شبه ثابت O(alpha(N)) لكل استعلام"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Tarjan proved `alpha(N) <= 4` even for `N` up to total atoms in the observable universe (`10^80`)!",
    "ar": "دالة أكرمان العكسية لا تتعدى 4 حتى لمدخلات بحجم الكون، فيصبح عمل DSU شبه ثابت."
  },
  "tags": [
    "dsu",
    "union-find",
    "complexity"
  ]
} as AssessmentQuestion
];
