import { AssessmentQuestion } from '@/lib/assessment/schema';

export const counting_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-COUNT-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Counting Sort",
  "specialization": "Linear Sorting",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "Why can Counting Sort break the Ω(N log N) lower bound for comparison sorts, running in O(N + K) time?",
    "ar": "لماذا يستطيع Counting Sort كسر حاجز Ω(N log N) لخوارزميات الفرز بالمقارنة، والعمل في زمن O(N + K)؟"
  },
  "options": [
    {
      "id": "parallel",
      "text": {
        "en": "Requires N physical CPU threads executing simultaneously inside shared L1 cache",
        "ar": "لأنه يتطلب N أنوية معالجة متوازية تنفذ الفرز في دورة ساعة واحدة بالتزامن"
      }
    },
    {
      "id": "tree",
      "text": {
        "en": "Constructs an in-memory balanced AVL tree before emitting duplicate counts",
        "ar": "لأنه يبني شجرة AVL متوازنة أولاً لحفظ الترتيب التصاعدي قبل طباعة التكرارات"
      }
    },
    {
      "id": "rand",
      "text": {
        "en": "It ignores duplicate elements",
        "ar": "لأنه يتجاهل العناصر المكررة"
      }
    },
    {
      "id": "nocomp",
      "text": {
        "en": "Indexes bounded integers directly into frequency buckets without comparisons",
        "ar": "لا يقارن العناصر بل يعدّ المفاتيح الصحيحة مباشرة في مصفوفة تكرار"
      }
    }
  ],
  "correctAnswer": "nocomp",
  "explanation": {
    "en": "The Ω(N log N) lower bound applies only to comparison-based decision trees. Integer sorting over a bounded key range [0..K] uses direct indexing to sort in O(N + K).",
    "ar": "الحد الأدنى Ω(N log N) خاص فقط بالفرز القائم على المقارنات؛ اما Counting Sort فيعتمد على الفهرسة المباشرة لمدى قيم محدود K."
  },
  "tags": [
    "sorting",
    "counting-sort"
  ]
} as AssessmentQuestion,
{
  "id": "AL-SRT-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Counting & Radix Sort",
  "specialization": "Breaking O(N log N)",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does **Counting Sort** achieve `O(N + K)` time faster than the `Omega(N log N)` comparison sorting barrier?",
    "ar": "كيف يتجاوز **Counting Sort** حاجز `O(N log N)` ليفرز في زمن `O(N + K)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Counts integer key frequencies into `[0..K]` buckets without pairwise comparisons",
        "ar": "يعدّ تكرار المفاتيح مباشرة في مصفوفة المدى `[0..K]` دون مقارنة العناصر ببعضها"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Drops identical duplicate keys automatically while partitioning heap array elements",
        "ar": "يتجاهل العناصر المكررة ويحذفها تلقائياً أثناء تقسيم القيم داخل المصفوفة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Evaluates four neighbor pairs concurrently inside one single CPU clock comparison cycle",
        "ar": "يقارن أربعة أزواج من العناصر المتجاورة في دورة معالج واحدة متجاوزاً حاجز القراءة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "By picking two random Quicksort pivots cleanly",
        "ar": "باختيار محورين عشوائيين"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Only comparison-based sorting faces the `Omega(N log N)` information lower bound; integer counting avoids pairwise comparisons altogether when `K` is modest.",
    "ar": "الحد الأدنى `N log N` خاص بفرز المقارنات فقط؛ أما الفرز بالعد فيستغل القيم الرقمية المحصورة."
  },
  "tags": [
    "counting-sort",
    "sorting",
    "complexity"
  ]
} as AssessmentQuestion
];
