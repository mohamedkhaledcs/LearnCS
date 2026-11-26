import { AssessmentQuestion } from '@/lib/assessment/schema';

export const interval_scheduling_questions: AssessmentQuestion[] = [
{
  "id": "AL-INT-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Greedy Algorithms",
  "subtopic": "Interval Scheduling",
  "specialization": "Activity Selection",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "To select the maximum number of non-overlapping intervals (activities), in what order should we sort them?",
    "ar": "لاختيار أكبر عدد من الفترات غير المتداخلة (Activity Selection)، بأي ترتيب يجب فرز الفترات أولاً؟"
  },
  "options": [
    {
      "id": "start",
      "text": {
        "en": "Latest start time descending",
        "ar": "أحدث وقت بداية تنازلياً"
      }
    },
    {
      "id": "dur",
      "text": {
        "en": "Longest duration first",
        "ar": "أطول مدة زمنية أولاً"
      }
    },
    {
      "id": "end",
      "text": {
        "en": "Earliest finish (end) time first",
        "ar": "أقرب وقت انتهاء (Earliest Finish Time) أولاً"
      }
    },
    {
      "id": "id",
      "text": {
        "en": "Input arrival order",
        "ar": "بترتيب الإدخال الأصلي"
      }
    }
  ],
  "correctAnswer": "end",
  "explanation": {
    "en": "Sorting by earliest finish time leaves as much remaining timeline as possible for future intervals, which provably yields the maximum count.",
    "ar": "اختيار النشاط الذي ينتهي أبكر يُبقي أكبر مساحة زمنية متاحة لباقي الأنشطة، وهو ما يثبت الأمثلية الجشعة."
  },
  "tags": [
    "greedy",
    "sorting",
    "intervals"
  ]
} as AssessmentQuestion,
{
  "id": "AL-GRD-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Greedy Algorithms",
  "subtopic": "Interval Scheduling",
  "specialization": "Meeting Rooms",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "You need to schedule ALL overlapping meetings across the MINIMUM number of conference rooms. What greedy sweep works in `O(N log N)`?",
    "ar": "لحجز كل الاجتماعات المتداخلة باستخدام **أقل عدد ممكن من القاعات**، أي خوارزمية جشعة تحلها بزمن `O(N log N)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Discard long meetings exceeding 60 minutes dynamically before starting room scans",
        "ar": "إلغاء الاجتماعات الطويلة التي تتجاوز ساعة تلقائياً وحصر الباقي في غرفة واحدة كل ساعة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Reserve N completely isolated conference rooms unconditionally for N events",
        "ar": "تخصيص قاعة منفصلة لكل اجتماع على حدة دائماً ثم فرز التواريخ دون النظر للتداخل"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Sort by start time, tracking ongoing end times in a Min-Heap",
        "ar": "فرز أوقات البداية ومتابعة أقرب نهاية في Min-Heap لإعادة استخدام القاعات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Allocate N independent rooms unconditionally for N events",
        "ar": "حجز قاعة لكل اجتماع دائماً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Minimum conference rooms required equals maximum simultaneous overlap across the timeline (`Sweep Line` or Min-Heap of active end times).",
    "ar": "أقل عدد قاعات يساوي أقصى عدد اجتماعات متزامنة في نفس اللحظة."
  },
  "tags": [
    "intervals",
    "sweep-line",
    "heap"
  ]
} as AssessmentQuestion
];
