import { AssessmentQuestion } from '@/lib/assessment/schema';

export const segmentation_questions: AssessmentQuestion[] = [
{
  "id": "OS-SEG-E-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Memory Management",
  "subtopic": "Segmentation",
  "specialization": "Logical Program Divisions",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does Memory Segmentation organize a process differently from Paging?",
    "ar": "كيف ينظم تقسيم الذاكرة إلى قطاعات (Segmentation) الذاكرة بشكل مختلف عن الـ Paging؟"
  },
  "options": [
    {
      "id": "4k",
      "text": {
        "en": "Partitions virtual memory strictly into uniform fixed-size 4KB blocks with identical headers",
        "ar": "تقسم الذاكرة الافتراضية دائماً إلى كتل متساوية الحجم بقياس 4 كيلوبايت فقط بلا مرونة"
      }
    },
    {
      "id": "no_bounds",
      "text": {
        "en": "Removes hardware read/write/execute permission checks across process memory segments",
        "ar": "تلغي فحوصات صلاحيات القراءة والكتابة والتنفيذ عتادياً داخل فضاء عناوين العملية"
      }
    },
    {
      "id": "log",
      "text": {
        "en": "Divides memory into variable logical sections (Code, Stack, Heap) with base+limit",
        "ar": "تقسيم الذاكرة لقطاعات منطقية متغيرة الحجم (Code, Stack, Heap) بحدود"
      }
    },
    {
      "id": "ssd",
      "text": {
        "en": "Moves the stack to SSD",
        "ar": "ينقل المكدس للقرص"
      }
    }
  ],
  "correctAnswer": "log",
  "explanation": {
    "en": "Logical segments align cleanly with protection domains (e.g., Code = Read+Exec only, Stack = Read+Write non-exec).",
    "ar": "تتطابق القطاعات مع البنية المنطقية للبرنامج، مما يسهل وضع صلاحيات الحماية لكل قسم."
  },
  "tags": [
    "os",
    "virtual-memory"
  ]
} as AssessmentQuestion
];
