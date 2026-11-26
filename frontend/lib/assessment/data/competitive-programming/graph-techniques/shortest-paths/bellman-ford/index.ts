import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bellman_ford_questions: AssessmentQuestion[] = [
{
  "id": "CP-BFV-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Bellman-Ford & SPFA",
  "specialization": "Longest Paths / Arbitration",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "Why should standard SPFA be avoided in competitive programming contests like Codeforces unless guaranteed safe?",
    "ar": "لماذا يُتجنب استخدام SPFA كبديل لـ Dijkstra في المسابقات المفتوحة (مثل Codeforces) إذا وجدت اختبارات مضادة؟"
  },
  "options": [
    {
      "id": "mem",
      "text": {
        "en": "SPFA allocates an O(V²) adjacency distance matrix causing immediate Memory Limit Exceeded",
        "ar": "يستهلك SPFA مصفوفة مسافات بمساحة O(V²) فيتجاوز حد الذاكرة المتاح في المسابقات دائماً"
      }
    },
    {
      "id": "neg",
      "text": {
        "en": "SPFA immediately outputs wrong answers on any graph containing negative edge weights",
        "ar": "يفشل SPFA تماماً في إيجاد المسار الصحيح بمجرد وجود أي حافة ذات وزن سالب في الرسم"
      }
    },
    {
      "id": "hack",
      "text": {
        "en": "Adversarial graphs force SPFA worst-case runtime to O(VE), causing TLE",
        "ar": "الرسوم المعدة خصيصاً تدفع SPFA لأسوأ تعقيد O(VE) فتتجاوز حد الوقت (TLE)"
      }
    },
    {
      "id": "dir",
      "text": {
        "en": "SPFA only works on trees",
        "ar": "يعمل على الأشجار فقط"
      }
    }
  ],
  "correctAnswer": "hack",
  "explanation": {
    "en": "Though SPFA averages fast on random graphs, anti-SPFA test cases force O(VE) re-enqueues; use priority-queue Dijkstra whenever weights >= 0.",
    "ar": "رغم سرعة SPFA المتوسطة، يسهل بناء حالات اختبار تجبره على تعقيد O(VE)، لذا نلتزم بـ Dijkstra دائماً عندما تكون الأوزان >= 0."
  },
  "tags": [
    "cp",
    "graphs",
    "bellman-ford"
  ]
} as AssessmentQuestion
];
