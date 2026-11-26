import { AssessmentQuestion } from '@/lib/assessment/schema';

export const floyd_warshall_questions: AssessmentQuestion[] = [
{
  "id": "CP-FWV-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Floyd-Warshall Loop Order",
  "specialization": "Transitive Closure",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In Floyd-Warshall's triple nested loop (k, i, j), why MUST the intermediate vertex variable 'k' be the OUTERMOST loop?",
    "ar": "في حلقات Floyd-Warshall الثلاثية (k, i, j)، لماذا يجب أن يكون الوسيط 'k' هو الحلقة الخارجية الكبرى (Outermost Loop)؟"
  },
  "options": [
    {
      "id": "cache",
      "text": {
        "en": "Placing `k` outer only aligns L1 cache; any loop permutation computes the same exact distances",
        "ar": "لتحسين توافق ذاكرة الكاش فقط؛ فجميع ترتيبات الحلقات الثلاث تعطي المسافات نفسها"
      }
    },
    {
      "id": "neg",
      "text": {
        "en": "Putting `k` as the innermost loop eliminates negative-weight cycles automatically without checks",
        "ar": "وضع المتغير `k` في أعمق حلقة داخلية يمنع الدورات السالبة تلقائياً بدون أي شروط إضافية"
      }
    },
    {
      "id": "sym",
      "text": {
        "en": "Because graphs must be directed",
        "ar": "لأن الرسم موجه"
      }
    },
    {
      "id": "ind",
      "text": {
        "en": "Paths through {1..k-1} must be finalized before allowing intermediate vertex k",
        "ar": "لوجوب اكتمال المسارات عبر {1..k-1} قبل السماح بالمرور عبر الرأس الوسيط k"
      }
    }
  ],
  "correctAnswer": "ind",
  "explanation": {
    "en": "Putting i, j outside and k inside relaxes d[i][j] via intermediate k only once before subpaths (i->k) and (k->j) might have incorporated later vertices, yielding wrong results.",
    "ar": "ترتيب k بالخارج هو قلب الإثبات الاستقرائي للخوارزمية بحيث تتحدث المسارات الوسيطة تدريجياً دون أن تفقد أي مسار مركب."
  },
  "tags": [
    "cp",
    "graphs",
    "floyd-warshall"
  ]
} as AssessmentQuestion
];
