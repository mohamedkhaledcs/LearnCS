import { AssessmentQuestion } from '@/lib/assessment/schema';

export const threads_questions: AssessmentQuestion[] = [
{
  "id": "OS-THR-E-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Processes & Threads",
  "subtopic": "Threads",
  "specialization": "Shared vs Private State",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Among the resources of a single process, which components are PRIVATE to each individual Thread rather than shared?",
    "ar": "داخل الـ Process الواحدة، أي المكونات التالية تكون خاصة ومستقلة لكل Thread على حدة وليست مشتركة؟"
  },
  "options": [
    {
      "id": "priv",
      "text": {
        "en": "Call Stack, CPU Registers, and Program Counter",
        "ar": "مكدس الاستدعاء (Call Stack) والسجلات وعداد البرنامج PC"
      }
    },
    {
      "id": "heap",
      "text": {
        "en": "Dynamically allocated Heap memory buffers and global process variables",
        "ar": "ذاكرة الـ Heap المخصصة ديناميكياً والمتغيرات العامة المشتركة داخل البرنامج"
      }
    },
    {
      "id": "code",
      "text": {
        "en": "Executable program code segment",
        "ar": "كود البرنامج"
      }
    },
    {
      "id": "files",
      "text": {
        "en": "Kernel open file descriptor tables and shared network socket handles",
        "ar": "جداول مؤشرات الملفات المفتوحة ومقابس الشبكة المعرفة على مستوى العملية"
      }
    }
  ],
  "correctAnswer": "priv",
  "explanation": {
    "en": "Threads share the process Heap, Text, Data, and file table, allowing fast communication: while each thread maintains its own execution stack and registers.",
    "ar": "تحتاج كل Thread مكدساً وسجلات خاصة لتتبع تنفيذ دوالها باستقلالية، بينما تتشارك Heap والكود والملفات."
  },
  "tags": [
    "os",
    "processes",
    "threads"
  ]
} as AssessmentQuestion,
{
  "id": "OS-PRC-E-006",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Processes & Threads",
  "subtopic": "Threads",
  "specialization": "Context Switch Cost",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why is switching CPU execution between two Threads of the SAME process noticeably cheaper than switching between two distinct Processes?",
    "ar": "لماذا يكون تبديل السياق بين خيطين (Threads) في العملية نفسها أرخص من التبديل بين عمليتين منفصلتين؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Threads omit program counters and CPU stack registers during context dispatch",
        "ar": "الخيوط لا تمتلك عداد برنامج PC أو سجلات معالج وتعمل حصرياً داخل المتصفح فقط"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Peer threads share one virtual address space, avoiding page-table & TLB flushes",
        "ar": "تتشارك نفس فضاء الذاكرة الافتراضية فلا يتبدل جدول الصفحات أو يفرغ TLB"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Switching processes wipes SSD swap partitions clean on every quantum expiration",
        "ar": "تبديل العمليات الكاملة يمسح أقسام القرص الصلب في كل شريحة زمنية للمعالج"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Threads run exclusively inside user CSS worker pools",
        "ar": "تعمل الخيوط في المتصفح فقط"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Switching processes reloads page-table base registers (flushing warm TLB cache); peer threads only swap lightweight registers and stack pointers.",
    "ar": "تبديل العملية يبدّل خرائط الذاكرة الكاملة بينما يبدّل الخيط السجلات ومؤشر المكدس فقط."
  },
  "tags": [
    "context-switch",
    "threads",
    "processes"
  ]
} as AssessmentQuestion
];
