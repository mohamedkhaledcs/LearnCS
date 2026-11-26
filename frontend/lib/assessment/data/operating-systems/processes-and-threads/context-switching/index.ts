import { AssessmentQuestion } from '@/lib/assessment/schema';

export const context_switching_questions: AssessmentQuestion[] = [
{
  "id": "OS-CTX-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Processes & Threads",
  "subtopic": "Context Switching",
  "specialization": "PCB State Save",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why is switching between two Processes more expensive than switching between two Threads of the SAME Process?",
    "ar": "لماذا يعد تبديل السياق (Context Switch) بين عمليتين (Processes) أكثر تكلفة من التبديل بين خيطين (Threads) في نفس العملية؟"
  },
  "options": [
    {
      "id": "cpu",
      "text": {
        "en": "Process switches permanently reset all general-purpose CPU registers across cores",
        "ar": "تبديل العملية يمسح كل السجلات العامة للمعالج ويعيد تهيئة الذاكرة المخفية دائماً"
      }
    },
    {
      "id": "tlb",
      "text": {
        "en": "Process switches swap page tables (CR3), flushing the TLB",
        "ar": "تبديل العملية يغير جدول الصفحات (CR3) فيُفرغ ذاكرة TLB"
      }
    },
    {
      "id": "disk",
      "text": {
        "en": "User-level threads share one stack pointer while processes must dump stacks to SSD",
        "ar": "الخيوط تفتقر لمكدس نداء خاص بها بينما تنسخ العمليات مكدسها إلى القرص الصلب"
      }
    },
    {
      "id": "cost",
      "text": {
        "en": "Context switching is zero cost",
        "ar": "التبديل مجاني تماماً"
      }
    }
  ],
  "correctAnswer": "tlb",
  "explanation": {
    "en": "Switching address spaces invalidates/flushes TLB translation entries and cold-misses CPU caches, whereas switching sibling threads preserves the same virtual address mapping.",
    "ar": "تغيير جدول الصفحات يفقد تسريع TLB الكاش، مما يجعل تبديل الخيوط أخف وزناً بكثير."
  },
  "tags": [
    "os",
    "processes",
    "threads",
    "virtual-memory"
  ]
} as AssessmentQuestion
];
