import { AssessmentQuestion } from '@/lib/assessment/schema';

export const virtual_memory_questions: AssessmentQuestion[] = [
{
  "id": "OS-MEM-H-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Memory Management",
  "subtopic": "Virtual Memory",
  "specialization": "Page Faults",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "What happens when a CPU attempts to access a page that is mapped in the virtual address space but not currently loaded in physical RAM?",
    "ar": "ماذا يحدث عندما يحاول الـ CPU الوصول لصفحة (page) معينة مسجلة في الـ virtual address space ولكنها غير محملة حالياً في الـ RAM؟"
  },
  "options": [
    {
      "id": "crash",
      "text": {
        "en": "The operating system instantly crashes with a Kernel Panic.",
        "ar": "ينهار نظام التشغيل فوراً مسبباً Kernel Panic."
      }
    },
    {
      "id": "segmentation",
      "text": {
        "en": "A Segmentation Fault is sent to the process.",
        "ar": "يتم إرسال Segmentation Fault للـ Process."
      }
    },
    {
      "id": "ignore",
      "text": {
        "en": "The CPU skips the instruction and continues execution.",
        "ar": "يتجاهل الـ CPU التعليمة ويكمل التنفيذ."
      }
    },
    {
      "id": "page_fault",
      "text": {
        "en": "A Page Fault occurs, and the OS fetches the page from disk.",
        "ar": "يحدث Page Fault، ويقوم نظام التشغيل بجلب الصفحة من القرص الصلب."
      }
    }
  ],
  "correctAnswer": "page_fault",
  "explanation": {
    "en": "When the MMU hits a page table entry marked invalid/not-present in RAM, it raises a Page Fault trap so the OS kernel can load the missing page from swap/disk into a frame.",
    "ar": "عند محاولة الوصول إلى صفحة غير محملة في RAM، يطلق المعالج Page Fault فيستدعي نظام التشغيل لجلبها من القرص وتحديث جدول الصفحات."
  }
} as AssessmentQuestion,
{
  "id": "OS-VM-M-003",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Memory Management",
  "subtopic": "Page Replacement",
  "specialization": "Page Fault Flow",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Accessing a valid virtual address whose page currently resides in SSD Swap (present bit = 0) triggers what OS response?",
    "ar": "الوصول لعنوان افتراضي صالح ولكنه منقول مؤقتاً للقرص (Page Swap) يطلق ماذا في نظام التشغيل؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Page Fault loads the 4KB page into RAM, updates mappings, and retries",
        "ar": "ينطلق Page Fault لتحميل الصفحة في RAM وتحديث الجدول وإعادة التنفيذ"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "The MMU triggers an immediate Segmentation Fault signal killing the process permanently",
        "ar": "يرسل العتاد فوراً خطأ Segmentation Fault ليغلق العملية وينهيها من الذاكرة بالكامل"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "The arithmetic unit zeroes out the requested physical frame cache permanently without I/O",
        "ar": "تصفّر وحدة الحساب الإطار الفيزيائي نهائياً دون قراءة أي بيانات من قرص التبديل"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "The OS shrinks process virtual space by half cleanly",
        "ar": "تنكمش الذاكرة للنصف"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Unlike invalid segfaults (`unmapped`), valid Demand Paging faults load missing pages transparently from backing disk.",
    "ar": "على عكس أخطاء الوصول الممنوع، فإن Page Fault الطبيعي يجلب الصفحة من القرص بشفافية دون علم التطبيق."
  },
  "tags": [
    "page-fault",
    "demand-paging",
    "virtual-memory"
  ]
} as AssessmentQuestion
];
