import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "AL-GREEDY-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Greedy Algorithms",
  "subtopic": "Fundamentals",
  "specialization": "Characteristics",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "A Greedy Algorithm works by making choices that seem optimal at the moment. Does it always produce the globally optimal solution?",
    "ar": "تعمل الـ Greedy Algorithm باتخاذ الخيارات التي تبدو الأفضل في لحظتها. هل تُنتج دائماً الحل الأمثل الشامل (globally optimal)؟"
  },
  "options": [
    {
      "id": "yes",
      "text": {
        "en": "Yes, greedy algorithms mathematically guarantee the global optimum.",
        "ar": "نعم، تضمن رياضياً الوصول للحل الأمثل الشامل."
      }
    },
    {
      "id": "no",
      "text": {
        "en": "No, they only guarantee global optimums for specific problem structures (like Matroids).",
        "ar": "لا، فهي تضمن الحل الأمثل الشامل فقط لمشاكل بخصائص معينة."
      }
    },
    {
      "id": "depends_time",
      "text": {
        "en": "Only if given enough execution time.",
        "ar": "فقط إذا أُعطيت وقتاً كافياً للتنفيذ."
      }
    },
    {
      "id": "only_graphs",
      "text": {
        "en": "Only when applied to Graph problems.",
        "ar": "فقط عند تطبيقها على مشاكل الـ Graph."
      }
    }
  ],
  "correctAnswer": "no",
  "explanation": {
    "en": "Greedy algorithms find the global optimum only when the problem satisfies both the Greedy Choice Property and Optimal Substructure; otherwise locally optimal choices can miss the global best.",
    "ar": "تضمن الخوارزميات الجشعة الحل الأمثل الشامل فقط عندما تتوفر خاصيتا الاختيار الجشع والبنية المثلى الفرعية؛ وإلا فقد تفوّت الخيارات المحلية الحل الأفضل عالمياً."
  }
} as AssessmentQuestion,
{
  "id": "AL-GRD-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Greedy Algorithms",
  "subtopic": "Fractional Knapsack",
  "specialization": "Sorting Key",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In **Fractional Knapsack** (where items split freely like bulk grain or spices), which greedy item ordering maximizes total knapsack value?",
    "ar": "في مسألة **حقيبة الظهر القابلة للتجزئة (Fractional Knapsack)**، حسب أي مقياس نرتب العناصر لاختيار الأكثر قيمة أولاً؟"
  },
  "options": [
    {
      "id": "c",
      "text": {
        "en": "Descending value-per-unit-weight density",
        "ar": "تنازلياً حسب كثافة القيمة للوحدة الواحدة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Ascending item weight (`lightest` first)",
        "ar": "تصاعدياً حسب الوزن الأخف"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Descending total item value (`highest value` first)",
        "ar": "تنازلياً حسب القيمة الإجمالية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Ascending item index order",
        "ar": "حسب الترتيب الأصلي"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "When items can take fractional portions, filling capacity first with highest value density per kilogram strictly maximizes total profit in O(N log N).",
    "ar": "أخذ الأعلى قيمةً لكل وحدة وزن يضمن أقصى عائد ممكن لكل مساحة في الحقيبة."
  },
  "tags": [
    "fractional-knapsack",
    "greedy",
    "algorithms"
  ]
} as AssessmentQuestion,
{
  "id": "AL-GRD-H-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Greedy Algorithms",
  "subtopic": "Counterexamples",
  "specialization": "Greedy vs DP",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "For coin denominations `{1, 3, 4}`, why does a greedy largest-coin strategy fail to find minimum coins summing to `6`?",
    "ar": "للفئات النقدية `{1, 3, 4}` والمبلغ المطلوب `6`، لماذا تفشل الاستراتيجية الجشعة (اختيار أكبر فئة أولاً) في إيجاد أقل عدد عملات؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Because greedy coin loops halt indefinitely on odd coin denominations cleanly",
        "ar": "لأن الحل الجشع يدخل في حلقة لا نهائية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Minimum coin change is impossible without negative weights",
        "ar": "المسألة مستحيلة دون فئات سالبة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Sorting coins takes O(N^2) time preventing greedy checks",
        "ar": "فرز العملات يأخذ O(N^2)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Greedy selects `4 + 1 + 1` (3 coins), missing the optimal pair `3 + 3`",
        "ar": "يختار الحل الجشع `4 + 1 + 1` (3 قطع) ويفوّت الحل الأمثل `3 + 3` (قطعتان)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Arbitrary coin sets lack the greedy choice property (only canonical systems like `{1, 5, 10, 25}` work greedily); general coin sets require `O(N * S)` DP!",
    "ar": "فئة 4 تغري الخيار الجشع أولاً رغم أن تقسيمها إلى `3+3` يعطي عدد قطع أقل، مما يستلزم البرمجة الديناميكية."
  },
  "tags": [
    "greedy-counterexample",
    "coin-change",
    "dp"
  ]
} as AssessmentQuestion,
{
  "id": "AL-GRD-E-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Greedy Algorithms",
  "subtopic": "Proofs",
  "specialization": "Exchange Argument",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does an **Exchange Argument** mathematically prove a greedy sorting order is optimal?",
    "ar": "كيف يثبت برهان **التبديل (Exchange Argument)** أن القاعدة الجشعة تنتج حلاً أمثل مضموناً؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Swapping an optimal step into the greedy choice never degrades answer quality",
        "ar": "يثبت أن استبدال خطوة الحل الأمثل باختيارنا الجشع لا يخفض الجودة أبداً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Tests algorithmic outputs empirically across three randomized permutations up to N=5",
        "ar": "يختبر صحة الخوارزمية عملياً على ثلاث عينات عشوائية صغيرة الحجم لا تتعدى خمسة عناصر"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Sorts input records first under the assumption O(N log N) sorting forces global optima",
        "ar": "يفترض أن الفرز السريع O(N log N) يضمن وحده الوصول لأفضل حل شامل في كل المسائل"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Exchanges heap allocations sequentially into contiguous recursion stacks",
        "ar": "ينقل الذاكرة إلى المكدس"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Repeatedly swapping differences between an assumed optimum O and greedy G without worsening the objective proves G matches optimum cleanly.",
    "ar": "تحويل الحل الأمثل المفترض خطوة فخطوة ليتطابق مع الحل الجشع دون خسارة يبرهن الصحة المطلقة."
  },
  "tags": [
    "exchange-argument",
    "proofs",
    "greedy"
  ]
} as AssessmentQuestion
];
