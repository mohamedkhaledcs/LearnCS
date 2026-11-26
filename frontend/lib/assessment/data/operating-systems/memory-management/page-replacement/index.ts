import { AssessmentQuestion } from '@/lib/assessment/schema';

export const page_replacement_questions: AssessmentQuestion[] = [
{
  "id": "OS-PAGEREPL-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Memory Management",
  "subtopic": "Page Replacement",
  "specialization": "LRU & Belady's Anomaly",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which page replacement policy approximates Optimal replacement well by exploiting temporal locality, AND avoids Belady's Anomaly (which affects FIFO)?",
    "ar": "أي سياسة استبدال صفحات تستغل القرب الزمني (Temporal Locality) ولا تعاني من شذوذ Belady بعكس FIFO؟"
  },
  "options": [
    {
      "id": "lru",
      "text": {
        "en": "LRU evicts the page untouched longest and avoids Belady's Anomaly",
        "ar": "LRU: يستبدل الصفحة الأقل استخداماً مؤخراً ويتفادى شذوذ بيلادي"
      }
    },
    {
      "id": "fifo",
      "text": {
        "en": "FIFO strictly eliminates Belady's Anomaly regardless of allocated physical RAM frames",
        "ar": "خوارزمية FIFO تمنع شذوذ بيلادي تماماً مهما ازداد عدد الإطارات الفيزيائية المتاحة"
      }
    },
    {
      "id": "rand",
      "text": {
        "en": "Most Frequently Used (MFU) strictly discards recently touched hot cache pages immediately",
        "ar": "الأكثر استخداماً MFU تحذف الصفحات المستعملة مؤخراً لأنها انتهت من دورة حياتها"
      }
    },
    {
      "id": "lifo",
      "text": {
        "en": "LIFO stack eviction",
        "ar": "LIFO دائماً"
      }
    }
  ],
  "correctAnswer": "lru",
  "explanation": {
    "en": "LRU is a stack algorithm so adding more physical frames NEVER increases page faults (no Belady's Anomaly), unlike naive FIFO.",
    "ar": "تُعد LRU خوارزمية متسقة لا يزداد فيها خطأ الصفحات عند زيادة عدد الإطارات، بعكس FIFO التي قد تعاني من شذوذ Belady."
  },
  "tags": [
    "os",
    "virtual-memory",
    "paging"
  ]
} as AssessmentQuestion
];
