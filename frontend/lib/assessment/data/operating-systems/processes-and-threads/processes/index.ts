import { AssessmentQuestion } from '@/lib/assessment/schema';

export const processes_questions: AssessmentQuestion[] = [
{
  "id": "OS-PROC-E-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Processes & Threads",
  "subtopic": "Processes",
  "specialization": "Process vs Thread",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the primary difference between a Process and a Thread?",
    "ar": "ما هو الفرق الرئيسي بين الـ Process والـ Thread؟"
  },
  "options": [
    {
      "id": "speed",
      "text": {
        "en": "Spinning up separate OS Processes is consistently faster than creating lightweight Threads",
        "ar": "إنشاء العمليات المنفصلة دائماً أسرع وأخف على النظام من إنشاء الخيوط داخلها"
      }
    },
    {
      "id": "multicore",
      "text": {
        "en": "Only processes can run on multi-core processors.",
        "ar": "تقتصر المعالجات متعددة الأنوية على تشغيل العمليات الكاملة ولا تشغل الخيوط"
      }
    },
    {
      "id": "os_level",
      "text": {
        "en": "Threads represent hardware circuits whereas Processes exist solely inside scripts",
        "ar": "الـ Threads على مستوى الهاردوير، والـ Processes على مستوى السوفتوير."
      }
    },
    {
      "id": "memory",
      "text": {
        "en": "Same-process threads share memory; separate processes are isolated",
        "ar": "تتشارك الخيوط ذاكرة عمليتها؛ بينما لكل عملية ذاكرة معزولة"
      }
    }
  ],
  "correctAnswer": "memory",
  "explanation": {
    "en": "Processes run in separate, OS-isolated virtual address spaces, whereas threads within the same process share code, heap, and open files while having private stacks and registers.",
    "ar": "لكل Process مساحة عنوان ذاكرة مستقلة ومعزولة، بينما تتشارك الـ Threads داخل نفس الـ Process الكود والـ Heap وتحتفظ بمكدس وسجلات خاصة بكل خيط."
  }
} as AssessmentQuestion,
{
  "id": "OS-PRC-E-002",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Processes & Threads",
  "subtopic": "Processes vs Threads",
  "specialization": "Memory Isolation",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Suppose one browser tab **Process** crashes due to malformed page memory. Why don't your other open tabs automatically crash too?",
    "ar": "إذا تعطل لسان تبويب في المتصفح (يعمل كـ Process مستقل)، فلماذا لا تنهار بقية الألسنة الأخرى معه؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Browser processes strictly execute a single line per second on single-core CPUs",
        "ar": "تعمل العمليات المستقلة بسرعة سطر واحد في الثانية لحماية المعالج من الانهيار المتزامن"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Separate Processes have isolated virtual address spaces enforced by OS + MMU",
        "ar": "تملك كل عملية فضاء ذاكرة افتراضية معزولاً يحميه نظام التشغيل وMMU"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Independent tabs share one unprotected heap pointer controlled by CSS rules",
        "ar": "تتشارك جميع التبويبات مؤشر Heap واحداً محمياً بقواعد CSS وتحفظ الكود في ROM"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Browsers swap tab code straight to read-only ROM cartridges",
        "ar": "تحفظ الشفرة في ROM"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "OS Process isolation confines segfaults strictly within one virtual address space; inside one process, a faulty thread crash can bring down peer threads.",
    "ar": "العزل الافتراضي للعمليات يمنع انهيار عملية من إفساد ذاكرة عملية أخرى."
  },
  "tags": [
    "processes",
    "isolation",
    "os"
  ]
} as AssessmentQuestion
];
