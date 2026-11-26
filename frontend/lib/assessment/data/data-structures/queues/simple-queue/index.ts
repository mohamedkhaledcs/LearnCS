import { AssessmentQuestion } from '@/lib/assessment/schema';

export const simple_queue_questions: AssessmentQuestion[] = [
{
  "id": "DS-Q-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Queues",
  "subtopic": "Simple Queue",
  "specialization": "FIFO Operations",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "If elements 10, 20, 30 are enqueued in order into a FIFO Queue, followed by one dequeue and enqueue(40), what is now at the front?",
    "ar": "إذا أدرجنا 10 ثم 20 ثم 30 في طابور FIFO، ثم أجرينا عملية dequeue واحدة ثم enqueue(40)، فما العنصر الموجود في المقدمة الآن؟"
  },
  "options": [
    {
      "id": "20",
      "text": {
        "en": "20",
        "ar": "20"
      }
    },
    {
      "id": "10",
      "text": {
        "en": "10",
        "ar": "10"
      }
    },
    {
      "id": "30",
      "text": {
        "en": "30",
        "ar": "30"
      }
    },
    {
      "id": "40",
      "text": {
        "en": "40",
        "ar": "40"
      }
    }
  ],
  "correctAnswer": "20",
  "explanation": {
    "en": "FIFO removes the oldest item (10) on dequeue, leaving [20, 30], and enqueue(40) appends to the back -> [20, 30, 40], so 20 is at the front.",
    "ar": "يُخرج الطابور أقدم عنصر (10)، ويتبقى [20, 30]، ثم يضيف 40 للنهاية [20, 30, 40] فيصبح 20 في المقدمة."
  },
  "tags": [
    "queue",
    "fifo"
  ]
} as AssessmentQuestion,
{
  "id": "DS-SQ-M-003",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Queues",
  "subtopic": "Queue Applications",
  "specialization": "Circular Buffer",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "tail = (tail + 1) % CAP;\nhead = (head + 1) % CAP;",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why does wrapping `head` and `tail` with `% CAP` inside a fixed circular array beat shifting items left on dequeue?",
    "ar": "لماذا يتفوق استخدام الالتفاف الدائري `% CAP` داخل مصفوفة الرتل على إزاحة العناصر نحو اليسار عند كل حذف؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Keeps enqueue and dequeue both O(1), avoiding O(N) array shifts",
        "ar": "يبقي الإدخال والإخراج في O(1) متفادياً إزاحة المصفوفة O(N) كل مرة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Keeps circular integer elements automatically sorted ascending at zero extra cost",
        "ar": "يرتب الأعداد المضافة تصاعدياً داخل المصفوفة الدائرية في زمن O(1) بدون مقارنات"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Transforms FIFO queue eviction dynamically into LIFO stack top popping",
        "ar": "يضاعف سعة الذاكرة تلقائياً عند الامتلاء دون الحاجة لنسخ أي بايتات نحو الكتلة الجديدة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Converts FIFO ordering dynamically into LIFO stack pops",
        "ar": "يحول الرتل إلى LIFO"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Modulo wraparound reuses freed front slots immediately with zero element copies.",
    "ar": "الفهرسة الدائرية تعيد استغلال الأماكن الفارغة دون تحريك أي عنصر."
  },
  "tags": [
    "circular-queue",
    "fifo",
    "o1"
  ]
} as AssessmentQuestion
];
