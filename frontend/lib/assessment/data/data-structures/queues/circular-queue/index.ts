import { AssessmentQuestion } from '@/lib/assessment/schema';

export const circular_queue_questions: AssessmentQuestion[] = [
{
  "id": "DS-CQ-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Queues",
  "subtopic": "Circular Queue",
  "specialization": "Wrap-Around Modulo",
  "difficulty": "medium",
  "type": "code-trace",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why does an array-backed Ring Buffer (Circular Queue) of capacity K compute the next rear position as `(rear + 1) % K`?",
    "ar": "لماذا يحسب الطابور الدائري (Circular Queue) المبني بمصفوفة سعتها K موضع الإضافة التالي بالصيغة `(rear + 1) % K`؟"
  },
  "options": [
    {
      "id": "sort",
      "text": {
        "en": "Maintains inserted integers in ascending numerical order after every modulo enqueue operation",
        "ar": "للحفاظ على ترتيب عناصر الطابور تصاعدياً تلقائياً بعد كل عملية إدخال جديدة فيه"
      }
    },
    {
      "id": "wrap",
      "text": {
        "en": "Wraps around to index 0 after K - 1, reusing freed front slots in O(1)",
        "ar": "للالتفاف للفهرس 0 بعد K - 1 وإعادة استخدام الخانات الفارغة في O(1)"
      }
    },
    {
      "id": "double",
      "text": {
        "en": "Automatically doubles underlying array capacity each time rear crosses capacity modulo K",
        "ar": "لمضاعفة السعة الإجمالية للمصفوفة تلقائياً كلما تجاوز مؤشر النهاية السعة المحددة K"
      }
    },
    {
      "id": "hash",
      "text": {
        "en": "To avoid hash collisions",
        "ar": "لتجنب تصادم التجزئة"
      }
    }
  ],
  "correctAnswer": "wrap",
  "explanation": {
    "en": "Modulo arithmetic turns a linear array into a conceptual ring so enqueue and dequeue both run in O(1) without O(N) element shifting.",
    "ar": "يجعل باقي القسمة المصفوفة حلقية، فندرج ونُخرج في O(1) دون إزاحة."
  },
  "tags": [
    "queue",
    "fifo"
  ]
} as AssessmentQuestion
];
