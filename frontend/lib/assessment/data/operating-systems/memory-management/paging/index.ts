import { AssessmentQuestion } from '@/lib/assessment/schema';

export const paging_questions: AssessmentQuestion[] = [
{
  "id": "OS-PAGE-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Memory Management",
  "subtopic": "Paging & TLB",
  "specialization": "No External Fragmentation",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What major problem of contiguous memory allocation does Paging completely eliminate, and what hardware speeds up page-table lookups?",
    "ar": "أي مشكلة رئيسية يزيلها نظام الصفحات (Paging) تماماً، وما القطعة المادية التي تسرّع ترجمة جدول الصفحات؟"
  },
  "options": [
    {
      "id": "int",
      "text": {
        "en": "Completely removes all Internal Fragmentation even across partially used last pages",
        "ar": "يقضي على التجزئة الداخلية كلياً حتى في الصفحة الأخيرة غير الممتلئة بالكامل"
      }
    },
    {
      "id": "ext",
      "text": {
        "en": "Eliminates External Fragmentation via fixed frames; TLB caches lookups",
        "ar": "يلغي التجزئة الخارجية عبر إطارات ثابتة، ويسرّع TLB الترجمة"
      }
    },
    {
      "id": "hdd",
      "text": {
        "en": "Writes hardware process page tables onto external optical drives to free RAM",
        "ar": "يخزن الجدول على القرص"
      }
    },
    {
      "id": "mmu",
      "text": {
        "en": "Removes the MMU hardware",
        "ar": "يلغي وجود وحدة إدارة الذاكرة MMU داخل المعالج ويستبدلها ببحث نصي في القرص"
      }
    }
  ],
  "correctAnswer": "ext",
  "explanation": {
    "en": "Because any free physical frame (e.g. 4KB) fits any virtual page, non-contiguous physical frames prevent external fragmentation, while the associative TLB cache avoids extra RAM reads on 99%+ of accesses.",
    "ar": "تقسيم الذاكرة لإطارات متساوية (مثل 4KB) يلغي التجزئة الخارجية، بينما يحفظ الـ TLB آخر الترجمات لتسريع الوصول."
  },
  "tags": [
    "os",
    "virtual-memory",
    "paging"
  ]
} as AssessmentQuestion,
{
  "id": "OS-VM-E-002",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Memory Management",
  "subtopic": "Paging",
  "specialization": "TLB Role",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What exact performance acceleration role does the **TLB (Translation Lookaside Buffer)** play inside the CPU's MMU?",
    "ar": "ما الدور التسريعي الذي تؤديه ذاكرة **TLB** داخل وحدة إدارة الذاكرة MMU في المعالج؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Stores entire secondary SSD swap partitions directly inside GPU video SRAM caches",
        "ar": "تخزّن كامل قسم التبديل الموجود على القرص الصلب داخل مخبأ المعالج الرسومي مباشرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Encrypts filesystem `chmod` permissions rapidly into 128-bit MD5 validation tags",
        "ar": "تشفّر أذونات الملفات ونصوص الوصول على القرص تلقائياً إلى توقيعات MD5 سريعة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Allocates dynamic Python lists without heap fragmentation",
        "ar": "تحجز قوائم بايثون"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Caches hot virtual-to-physical translations to skip slow RAM page-table walks",
        "ar": "تخزّن ترجمات الصفحات الأكثر استخداماً عتادياً لتفادي مراجعة RAM كل مرة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "With >99% TLB hit rates, virtual address translation adds near-zero latency overhead.",
    "ar": "تتجاوز نسبة إصابة TLB عادةً 99% فتتحول ترجمة العنوان الافتراضي إلى عملية فورية."
  },
  "tags": [
    "tlb",
    "virtual-memory",
    "paging"
  ]
} as AssessmentQuestion,
{
  "id": "OS-VM-M-004",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Memory Management",
  "subtopic": "Paging Arithmetic",
  "specialization": "Offset Preservation",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "With 4KB pages (`12-bit offset`), translating a Virtual Address to Physical Address updates which bits vs keeps which bits unchanged?",
    "ar": "مع صفحات بحجم 4KB (إزاحة 12 بت)، ما الجزء الذي يتغير في الترجمة مقابل الجزء الذي يبقى ثابتاً كما هو؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Lower offset bits reverse bit ordering while upper virtual page numbers stay unchanged",
        "ar": "تنعكس بتات الإزاحة الاثنتا عشرة فقط بينما يظل رقم الصفحة الافتراضية العلوي ثابتاً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Page number maps to Physical Frame; 12-bit offset stays unchanged",
        "ar": "يتبدل رقم الصفحة لإطار فيزيائي وتبقى بتات الإزاحة الـ 12 ثابتة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Both upper virtual page number and byte offset multiply cleanly by sixteen per read",
        "ar": "يُضرب كل من رقم الصفحة العلوي وقيمة الإزاحة السفلية في 16 وتُصفّر الإزاحة خارج النواة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Offset bits become zero everywhere outside Kernel Ring 0",
        "ar": "تصبح الإزاحة صفراً دائماً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Because virtual pages and physical frames share exact 4KB layout, byte position inside the page (`offset`) transfers verbatim!",
    "ar": "موضع البايت داخل الصفحة ذات الـ 4KB لا يتغير؛ الترجمة تستبدل رقم الصفحة برقم الإطار الفعلي فقط."
  },
  "tags": [
    "paging",
    "address-translation",
    "mmu"
  ]
} as AssessmentQuestion
];
