import { AssessmentQuestion } from '@/lib/assessment/schema';

export const dijkstra_variants_questions: AssessmentQuestion[] = [
{
  "id": "CP-DIJKV-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Dijkstra Variants",
  "specialization": "Multi-Source & State-Space",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "To find the shortest path in a graph where you are allowed to halve ONE edge weight using a 1-time coupon, how do you adapt Dijkstra?",
    "ar": "لإيجاد أقصر مسار مع قسيمة تخفيض تسمح بقسمة وزن حافة واحدة على 2 لمرة واحدة فقط، كيف تكيّف خوارزمية Dijkstra؟"
  },
  "options": [
    {
      "id": "half",
      "text": {
        "en": "Divide the heaviest edge along the original plain shortest path by 2 afterward",
        "ar": "حساب أقصر مسار عادي أولاً ثم قسمة أثقل حافة واقعة عليه على 2 بعد انتهاء البحث"
      }
    },
    {
      "id": "state",
      "text": {
        "en": "Track layered states dist[node][couponUsed ∈ {0, 1}] in one Dijkstra",
        "ar": "تمثيل الحالة dist[node][used ∈ {0, 1}] وتشغيل Dijkstra مرة واحدة"
      }
    },
    {
      "id": "mst",
      "text": {
        "en": "Compute a Minimum Spanning Tree first with Kruskal, then halve its longest branch",
        "ar": "بناء شجرة الامتداد الصغرى أولاً عبر Kruskal ثم تخفيض أكبر أوزانها إلى النصف"
      }
    },
    {
      "id": "greedy",
      "text": {
        "en": "Always halve the first edge leaving the source",
        "ar": "قسمة أول حافة فقط عند البداية"
      }
    }
  ],
  "correctAnswer": "state",
  "explanation": {
    "en": "Simply dividing the heaviest edge of an uncouponed shortest path can miss a slightly longer path containing one huge edge; expanding vertices to (u, 0)/(u, 1) handles both seamlessly in O((V+E) log V).",
    "ar": "تعديل المسار الأقصر بعد الحساب قد يفوت مساراً آخر به حافة ضخمة تصبح أرخص عند تنصيفها؛ الحل الأمثل هو تمثيل الحالة في طبقتين (لم تُستخدم / استُخدمت)."
  },
  "tags": [
    "cp",
    "graphs",
    "dijkstra"
  ]
} as AssessmentQuestion
];
