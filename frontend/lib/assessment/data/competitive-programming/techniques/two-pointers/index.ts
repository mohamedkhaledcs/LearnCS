import { AssessmentQuestion } from '@/lib/assessment/schema';

export const two_pointers_questions: AssessmentQuestion[] = [
{
  "id": "CP-TP-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Techniques",
  "subtopic": "Two Pointers",
  "specialization": "Optimization",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why does the Two Pointers technique achieve O(N) time complexity on a sorted array when searching for a target pair sum?",
    "ar": "لماذا تحقق تقنية المؤشرين تعقيداً زمنياً O(N) في مصفوفة مرتبة عند البحث عن زوج مجموعه يساوي قيمة معينة؟"
  },
  "options": [
    {
      "id": "binary",
      "text": {
        "en": "It launches an inner O(log N) binary search probe at every left pointer iteration",
        "ar": "تنفذ الخوارزمية بحثاً ثنائياً داخلياً عند كل خطوة للمؤشر الأيسر على حدة"
      }
    },
    {
      "id": "hash",
      "text": {
        "en": "It indexes every candidate array value inside an auxiliary unordered hash set structure",
        "ar": "تخزن كل عناصر المصفوفة داخل جدول تجزئة مساعد للتحقق من وجود المكمل"
      }
    },
    {
      "id": "recurse",
      "text": {
        "en": "It recursively divides the array into halves.",
        "ar": "لأنها تقسم المصفوفة عودياً إلى نصفين."
      }
    },
    {
      "id": "monotonic",
      "text": {
        "en": "Pointers advance monotonically inward, visiting each element at most once",
        "ar": "يتحرك مؤشر للداخل برتابة كل خطوة فتُزار العناصر مرة واحدة على الأكثر"
      }
    }
  ],
  "correctAnswer": "monotonic",
  "explanation": {
    "en": "Because each step strictly advances the left pointer forward or the right pointer backward, the pointers traverse the N elements at most once total, giving O(N) time complexity.",
    "ar": "لأن كل خطوة تحرك المؤشر الأيسر للأمام أو الأيمن للخلف بشكل رتيب، تمر المؤشرات عبر العناصر الـ N مرة واحدة على الأكثر إجمالاً، مما يحقق زمن O(N)."
  }
} as AssessmentQuestion,
{
  "id": "CP-TWP-E-002",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Two Pointers & Sliding Window",
  "subtopic": "Two Pointers",
  "specialization": "Sorted Pair Search",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "while (L < R) {\n  int s = a[L] + a[R];\n  if (s == target) return {L, R};\n  if (s < target) L++; else R--;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "With sorted `a = [1, 4, 6, 10, 15]` and `target = 16`, why is advancing `L++` safe whenever `a[L] + a[R] < 16`?",
    "ar": "في مصفوفة مرتبة، لماذا يكون تحريك `L++` آمناً دون ضياع أي حل صحيح عندما يكون `a[L] + a[R] < target`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "`R` is the largest valid partner, so `a[L]` fails with anything smaller too",
        "ar": "`a[R]` أكبر شريك متاح؛ فإن قصر مع `a[L]` فلن يكفي أي عنصر أصغر منه"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Advancing the left index `L` doubles the product of all remaining candidate pairs",
        "ar": "زيادة المؤشر الأيسر `L` بمقدار واحد تضاعف مجموع كافة الأزواج المتبقية في المصفوفة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "An internal Binary Search automatically inspects skipped indices left of `L` at once",
        "ar": "يقوم البحث الثنائي المدمج بفحص العناصر المحذوفة يسار `L` بالتوازي في الخطوة نفسها"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Even sums eliminate odd array prefixes automatically",
        "ar": "تُلغى القيم الفردية تلقائياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Every unused element to the left of `R` is `<= a[R]`, proving `a[L] + a[k] <= a[L] + a[R] < target`, so `L` can never form a valid pair!",
    "ar": "بما أن باقي العناصر يسار `R` أصغر أو تساوي `a[R]`، يستحيل أن يكوّن `a[L]` المجموع المطلوب، فيُستبعد بأمان."
  },
  "tags": [
    "two-pointers",
    "proof",
    "sorted"
  ]
} as AssessmentQuestion,
{
  "id": "CP-TWP-M-004",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Two Pointers & Sliding Window",
  "subtopic": "Two Pointers",
  "specialization": "In-Place Deduplication",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "int slow = 0;\nfor (int fast = 1; fast < n; fast++)\n  if (a[fast] != a[slow]) a[++slow] = a[fast];",
  "codeLanguage": "cpp",
  "question": {
    "en": "What does this classic Two-Pointer reader (`fast`) + writer (`slow`) accomplish in `O(N)` time and `O(1)` extra space on a sorted vector?",
    "ar": "ماذا تنجز خوارزمية المؤشر السريع (القارئ) والبطيء (الكاتب) أعلاه في مصفوفة مرتبة بزمن `O(N)` ومساحة `O(1)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Reverses all ascending array values completely backwards in single O(N) pass",
        "ar": "يعكس ترتيب المصفوفة المرتبة بالكامل من الخلف إلى الأمام في تمريرة خطية واحدة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Partitions random unsorted arrays around index zero via linear swap sweeps",
        "ar": "يقسم عناصر المصفوفة عشوائياً حول العنصر الأول ثم يحسب عدد أزواج الانقلاب"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Deduplicates sorted values in-place leaving `slow + 1` unique elements",
        "ar": "يزيل التكرارات في المكان ويبقي العناصر الفريدة في أول `slow + 1` خانة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Counts total inversions via merge sweeps",
        "ar": "تعد أزواج الانقلاب"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`fast` skips duplicates and copies each brand-new value onto `a[++slow]`, compacting unique keys cleanly in-place.",
    "ar": "يتجاوز `fast` القيم المتماثلة ولا يكتب إلا عند مصادفة قيمة جديدة مختلفة."
  },
  "tags": [
    "two-pointers",
    "in-place",
    "deduplication"
  ]
} as AssessmentQuestion
];
