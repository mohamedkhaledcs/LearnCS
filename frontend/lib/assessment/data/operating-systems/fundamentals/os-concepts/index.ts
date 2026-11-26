import { AssessmentQuestion } from '@/lib/assessment/schema';

export const os_concepts_questions: AssessmentQuestion[] = [
{
  "id": "OS-CONC-E-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Fundamentals",
  "subtopic": "OS Role & Kernel",
  "specialization": "User vs Kernel Mode",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why do modern CPUs enforce dual-mode execution (User Mode vs Kernel Mode)?",
    "ar": "لماذا تفرض المعالجات الحديثة وضعين للتنفيذ (User Mode و Kernel Mode)؟"
  },
  "options": [
    {
      "id": "fps",
      "text": {
        "en": "User and Kernel rings exist primarily to double GPU polygon frame rates in 3D applications",
        "ar": "وُضع الوضعان المزدوجان لمضاعفة سرعة رسم إطارات الشاشة ومعالجة رسوميات الألعاب ثلاثية الأبعاد"
      }
    },
    {
      "id": "prot",
      "text": {
        "en": "Isolates privileged hardware and page-table instructions from user apps",
        "ar": "لحماية العتاد والذاكرة بمنع البرامج العادية من تنفيذ تعليمات خطيرة مباشرة"
      }
    },
    {
      "id": "wifi",
      "text": {
        "en": "Kernel Mode hardware rings specifically encrypt wireless Wi-Fi packets at the TCP socket layer",
        "ar": "نطاق النواة Kernel Mode مخصص حصراً لتشفير حزم الشبكة اللاسلكية Wi-Fi في طبقة النقل"
      }
    },
    {
      "id": "css",
      "text": {
        "en": "To compile CSS styles",
        "ar": "لترجمة CSS"
      }
    }
  ],
  "correctAnswer": "prot",
  "explanation": {
    "en": "If user programs had Ring-0 privileges, one buggy or malicious app could overwrite another process's RAM or halt the disk.",
    "ar": "عزل وضع المستخدم يمنع البرامج المخربة أو الخاطئة من تخريب ذاكرة النواة أو بقية البرامج."
  },
  "tags": [
    "os",
    "architecture"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-OS-E-002",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "OS Role",
  "subtopic": "Privilege Modes",
  "specialization": "User vs Kernel",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does a regular User-Mode program safely read a file stored on an SSD without raw disk access?",
    "ar": "كيف يقرأ برنامج عادي في وضع المستخدم ملفاً من القرص بأمان دون السماح له بالوصول المباشر للعتاد؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "By recompiling the operating system kernel dynamically at runtime",
        "ar": "عبر إعادة بناء نواة نظام التشغيل وقت التشغيل"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "By issuing a System Call that lets the Kernel validate permissions and read the sector",
        "ar": "عبر طلب System Call لتتحقق النواة من الصلاحيات وتقرأ البيانات نيابةً عنه"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "By pausing hardware interrupts permanently inside the application thread",
        "ar": "عبر إيقاف المقاطعات البرمجية نهائياً داخل الخيط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "By mapping L1 CPU registers straight onto physical magnetic sectors",
        "ar": "عبر ربط مسجلات المعالج L1 مباشرة بقطاعات القرص"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "System Calls cross from User Mode (Ring 3) into Kernel Mode (Ring 0) cleanly so the OS enforces file permissions and hardware isolation.",
    "ar": "استدعاء النظام ينقل الطلب لنواة التشغيل لفحص الأذونات وإتمام القراءة بأمان وعزل."
  },
  "tags": [
    "os",
    "syscalls",
    "architecture"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-CPU-E-003",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "OS Role",
  "subtopic": "CPU Registers",
  "specialization": "Program Counter",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which small CPU register holds the memory address of the very next machine instruction to fetch?",
    "ar": "أي مسجل صغير داخل المعالج يحتفظ بعنوان التعليمة الآلية القادمة المطلوب جلبها؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Arithmetic Accumulator (ACC) storing active arithmetic intermediate totals",
        "ar": "مسجل التراكم (ACC) لحفظ نتائج الجمع المؤقتة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Stack Frame Limit holding maximum heap allocation bytes for a thread",
        "ar": "حد إطار المكدس لأقصى مساحة حجز للخيط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Program Counter (PC) or Instruction Pointer (IP)",
        "ar": "عداد البرنامج (Program Counter / PC)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Interrupt Descriptor Vector mapping USB keyboard hardware ports",
        "ar": "جدول المقاطعات لمنافذ لوحة المفاتيح"
      }
    }
  ],
  "correctAnswer": "d",
  "explanation": {
    "en": "The Program Counter tracks the exact memory address fetched during the next Fetch phase before advancing automatically.",
    "ar": "يشير عداد البرنامج PC دائماً إلى عنوان التعليمة التالية في دورة الجلب والتنفيذ."
  },
  "tags": [
    "hardware",
    "cpu",
    "registers"
  ]
} as AssessmentQuestion
];
