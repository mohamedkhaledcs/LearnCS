import { AssessmentQuestion } from '@/lib/assessment/schema';

export const quick_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-SORT-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Quick Sort",
  "specialization": "General",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which of the following sorting algorithms is generally considered the fastest for large, random datasets in practice?",
    "ar": "أي من Algorithms الترتيب التالية تعتبر عموماً الأسرع للمجموعات الكبيرة والعشوائية من البيانات في الواقع العملي؟"
  },
  "options": [
    {
      "id": "bubble",
      "text": {
        "en": "Bubble Sort",
        "ar": "Bubble Sort"
      }
    },
    {
      "id": "quick",
      "text": {
        "en": "Quick Sort",
        "ar": "Quick Sort"
      }
    },
    {
      "id": "insertion",
      "text": {
        "en": "Insertion Sort",
        "ar": "Insertion Sort"
      }
    },
    {
      "id": "selection",
      "text": {
        "en": "Selection Sort",
        "ar": "Selection Sort"
      }
    }
  ],
  "correctAnswer": "quick",
  "explanation": {
    "en": "Quick Sort has O(n log n) average complexity, small constant factors, and strong CPU cache locality, making it faster in practice than quadratic sorts and often faster than Merge Sort on random arrays.",
    "ar": "يمتلك Quick Sort تعقيداً متوسطاً O(n log n) مع ثوابت صغيرة واستغلال ممتاز لذاكرة الكاش (cache locality)، مما يجعله الأسرع عملياً على المصفوفات العشوائية الكبيرة."
  }
} as AssessmentQuestion,
{
  "id": "AL-SRT-H-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Quick Sort",
  "specialization": "Comparator Bug",
  "difficulty": "hard",
  "type": "debugging",
  "codeSnippet": "// Custom C++ sort comparator BUG:\nbool cmp(int a, int b) { return a <= b; }",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why can passing `a <= b` (instead of `a < b`) into `std::sort` crash on arrays containing repeated equal elements?",
    "ar": "لماذا قد يتسبب تمرير دالة مقارنة `return a <= b;` إلى `std::sort` بانهيار عند وجود عناصر متكررة متساوية؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Compiled boolean comparators cannot compare equal elements inside STL vector memory",
        "ar": "دوال المقارنة البولينية في C++ تمنع قراءة العناصر المتساوية وتوقف البرنامج تلقائياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "`std::sort` immediately switches downward into slow quadratic Selection Sort loops",
        "ar": "تتحول دالة `std::sort` فوراً إلى خوارزمية Selection Sort ذات الزمن التربيعي O(N²)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`<=` violates Strict Weak Ordering (`cmp(x, x) == false`), risking out-of-bounds scans",
        "ar": "`<=` يكسر الترتيب الصارم (`cmp(x, x) == false`) وقد يدفع المؤشرات خارج المصفوفة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Equal keys invert sort direction randomly on 64-bit CPUs",
        "ar": "تنعكس الإشارة عشوائياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Strict Weak Ordering requires irreflexivity (`cmp(x, x) == false`); always write `<` or `>`, never `<=` / `>=`!",
    "ar": "عقد `Strict Weak Ordering` يلزم أن تكون `cmp(x, x) == false`؛ لذا استخدم `<` أو `>` فقط."
  },
  "tags": [
    "comparator",
    "strict-weak-ordering",
    "cpp"
  ]
} as AssessmentQuestion
];
