import { AssessmentQuestion } from '@/lib/assessment/schema';

export const priority_questions: AssessmentQuestion[] = [
{
  "id": "OS-PRIO-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "Priority Scheduling",
  "specialization": "Aging Solution",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does an OS scheduler prevent indefinite Starvation of low-priority processes under Priority Scheduling?",
    "ar": "كيف يمنع مُجدول نظام التشغيل تجويع (Starvation) العمليات منخفضة الأولوية في جدولة الأولويات؟"
  },
  "options": [
    {
      "id": "kill",
      "text": {
        "en": "Terminates every low-priority ready queue process automatically after 100 milliseconds",
        "ar": "إنهاء جميع العمليات ذات الأولوية المنخفضة تلقائياً وحذفها من الذاكرة كل مئة مللي ثانية"
      }
    },
    {
      "id": "aging",
      "text": {
        "en": "Aging gradually raises the priority of ready waiting processes over time",
        "ar": "التعتيق (Aging): رفع أولوية العملية تدريجياً كلما طال انتظارها"
      }
    },
    {
      "id": "fcfs",
      "text": {
        "en": "Disables all hardware timer interrupts permanently so the active process owns CPU forever",
        "ar": "تعطيل مقاطعات المؤقت العتادية تماماً حتى تحتكر العملية الحالية المعالج بلا توقف"
      }
    },
    {
      "id": "swap",
      "text": {
        "en": "Deleting virtual memory",
        "ar": "مسح الذاكرة الافتراضية"
      }
    }
  ],
  "correctAnswer": "aging",
  "explanation": {
    "en": "Aging guarantees that even the lowest-priority process eventually attains top priority and gets scheduled.",
    "ar": "يضمن أسلوب التعتيق أن تصل أي عملية منتظرة لأعلى أولوية بمرور الوقت فتنال نصيبها من المعالج."
  },
  "tags": [
    "os",
    "scheduling"
  ]
} as AssessmentQuestion,
{
  "id": "OS-SCH-M-004",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "Priority Scheduling",
  "specialization": "Starvation & Aging",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What risk threatens background priority-1 processes during steady floods of high priority-10 arrivals, and how does **Aging** prevent it?",
    "ar": "ما الخطر الذي يهدد العمليات ذات الأولوية المنخفضة عند تدفق مهام عالية الأولوية باستمرار، وكيف يحله أسلوب **Aging**؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Starvation blocks low jobs forever; Aging gradually raises waiting priority",
        "ar": "التجويع يحرم المنخفضة للأبد؛ وAging يرفع أولويتها تدريجياً مع الانتظار"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Deadlock halts idle background threads while Aging shrinks time slices to 1ns",
        "ar": "يتسبب في جمود فوري يغلق مهام الخلفية وتقوم Aging بتقليص شريحة الزمن إلى 1 نانوثانية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Thrashing swaps thread stacks to SSD while Aging clears CPU L3 hardware caches",
        "ar": "تُنقل إطارات المكدس للقرص وتقوم Aging بتثبيت جميع المهام على النواة الصفرية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Convoy overflow cancels I/O; Aging pins jobs solely to core zero",
        "ar": "يثبت المهام على النواة صفر"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Gradual priority promotion guarantees even the lowest-priority runnable job eventually outranks newcomers and executes.",
    "ar": "التدرج الزمني لأولوية الانتظار يضمن عدالة التنفيذ وعدم إهمال أي عملية صالحة."
  },
  "tags": [
    "starvation",
    "aging",
    "priority-scheduling"
  ]
} as AssessmentQuestion,
{
  "id": "OS-SCH-E-006",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "Preemptive vs Non-Preemptive",
  "specialization": "Responsiveness",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why MUST desktop and mobile OS schedulers use **Preemptive** scheduling instead of pure cooperative non-preemptive runs?",
    "ar": "لماذا يعتمد مجدول أنظمة سطح المكتب والهواتف على **الجدولة الاستباقية/الانتزاعية (Preemptive)** بدلاً من انتظار تنازل العملية طوعاً؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Allows user-mode processes to rewrite kernel page tables directly in RAM",
        "ar": "يسمح للبرامج في وضع المستخدم بتعديل جداول صفحات النواة مباشرة لتحقيق السرعة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Eliminates all saved CPU register context switches permanently at kernel boot",
        "ar": "يعوّض غياب المؤقتات العتادية في المعالجات المحمولة ويلغي الحاجة لتبديل السياق"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Stops one buggy infinite loop from freezing the entire OS UI",
        "ar": "يمنع تجميد النظام والواجهة بالكامل بسبب خطأ حلقة لا نهائية في تطبيق واحد"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "To bypass all context switching state snapshots permanently",
        "ar": "لإلغاء تبديل السياق"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Periodic hardware timer interrupts allow the OS kernel to take back control deterministically even from buggy infinite loops.",
    "ar": "مقاطعة المؤقت الدورية تمكّن النظام من انتزاع المعالج وتوزيعه بعدل حتى لو علق أحد التطبيقات."
  },
  "tags": [
    "preemptive",
    "os",
    "scheduling"
  ]
} as AssessmentQuestion
];
