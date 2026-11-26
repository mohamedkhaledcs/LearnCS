import { AssessmentQuestion } from '@/lib/assessment/schema';

export const lazy_propagation_questions: AssessmentQuestion[] = [
{
  "id": "CP-LAZY-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Range Queries",
  "subtopic": "Lazy Propagation",
  "specialization": "Deferred Range Updates",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why does adding Lazy Propagation keep range updates on a Segment Tree at O(log N) instead of degrading to O(N)?",
    "ar": "لماذا يحافظ Lazy Propagation على تحديث النطاق في Segment Tree عند O(log N) بدلاً من التدهور إلى O(N)؟"
  },
  "options": [
    {
      "id": "compress",
      "text": {
        "en": "Lazy Propagation compresses an N-element array dynamically into size O(log N) on disk",
        "ar": "تقوم هذه التقنية بضغط المصفوفة الأصلية ديناميكياً ليصبح حجمها الفعلي مساوياً لـ log N"
      }
    },
    {
      "id": "skip",
      "text": {
        "en": "Query calls completely skip overlapping tree subsegments and inspect root tags exclusively",
        "ar": "تتجاهل دالة الاستعلام جميع الأجزاء المتداخلة كلياً وتقرأ قيمة الجذر فقط في كل استدعاء"
      }
    },
    {
      "id": "defer",
      "text": {
        "en": "Stores pending updates on fully covered nodes instead of recursing down",
        "ar": "يؤجل دفع التحديث للأبناء في وسم محلي عندما يتطابق مجال العقدة كلياً"
      }
    },
    {
      "id": "fenwick",
      "text": {
        "en": "It deletes tree leaves dynamically",
        "ar": "يحذف أوراق الشجرة ديناميكياً"
      }
    }
  ],
  "correctAnswer": "defer",
  "explanation": {
    "en": "Any query interval decomposes into at most O(log N) canonical nodes; storing pending tags and pushing them down only when visiting children preserves O(log N) bounds.",
    "ar": "يتفكك أي نطاق إلى عدد O(log N) من العقد؛ فتخزين التغيير المؤجل (lazy tag) وتمريره للأسفل فقط عند الزيارة يبقي التعقيد O(log N)."
  },
  "tags": [
    "cp",
    "segment-tree",
    "lazy-propagation"
  ]
} as AssessmentQuestion
];
