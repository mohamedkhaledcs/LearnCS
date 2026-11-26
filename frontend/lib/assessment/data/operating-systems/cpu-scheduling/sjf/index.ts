import { AssessmentQuestion } from '@/lib/assessment/schema';

export const sjf_questions: AssessmentQuestion[] = [
{
  "id": "OS-SJF-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "SJF",
  "specialization": "Optimality & Starvation",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Shortest Job First (SJF) provably achieves the MINIMUM average waiting time among non-preemptive schedulers: what are its two practical issues?",
    "ar": "تحقق جدولة أقصر عمل أولاً (SJF) أقل متوسط وقت انتظار رياضياً، فما هما تحدياها العمليان؟"
  },
  "options": [
    {
      "id": "convoy",
      "text": {
        "en": "Long jobs experience guaranteed zero wait time whenever short interactive tasks enter continuously",
        "ar": "المهام الطويلة تحصل دائماً على أولوية فورية وزمن انتظار صفري عند تتابع المهام القصيرة"
      }
    },
    {
      "id": "swap",
      "text": {
        "en": "SJF operates strictly under fixed 1-millisecond Round Robin time quanta inside batch queues",
        "ar": "لا تعمل خوارزمية SJF إلا مع Round Robin بشريحة زمنية ثابتة قدرها 1 مللي ثانية فقط"
      }
    },
    {
      "id": "none",
      "text": {
        "en": "Needs no ready queue",
        "ar": "لا تحتاج طابور جاهزية"
      }
    },
    {
      "id": "pred",
      "text": {
        "en": "Next CPU burst time is unknown in advance, and long jobs risk starvation",
        "ar": "مدة التنفيذ القادمة مجهولة مسبقاً، والعمليات الطويلة مهددة بالتجويع"
      }
    }
  ],
  "correctAnswer": "pred",
  "explanation": {
    "en": "OS kernels approximate future bursts with exponential averaging and mitigate starvation using Priority Aging.",
    "ar": "تُقدَّر المدد إحصائياً بالمتوسط الأسي، ويُعالج التجويع بزيادة أولوية المنتظرين مع الوقت (Aging)."
  },
  "tags": [
    "os",
    "scheduling"
  ]
} as AssessmentQuestion
];
