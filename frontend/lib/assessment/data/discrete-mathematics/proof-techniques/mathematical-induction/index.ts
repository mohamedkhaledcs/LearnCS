import { AssessmentQuestion } from '@/lib/assessment/schema';

export const mathematical_induction_questions: AssessmentQuestion[] = [
{
  "id": "DM-IND-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Proof Techniques",
  "subtopic": "Mathematical Induction",
  "specialization": "Weak Induction Steps",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why are BOTH a Base Case AND an Inductive Step (`P(k) -> P(k+1)`) strictly necessary in Mathematical Induction?",
    "ar": "لماذا يُعدّ كل من حالة الأساس (Base Case) وخطوة الاستقراء (`P(k) -> P(k+1)`) ضروريين معاً في الاستقراء الرياضي؟"
  },
  "options": [
    {
      "id": "baseonly",
      "text": {
        "en": "An inductive step alone strictly proves every theorem across all finite integer sets cleanly",
        "ar": "خطوة الاستقراء وحدها تكفي رياضياً لإثبات صحة أي عبارة منطقية على المجموعات المنتهية كلها"
      }
    },
    {
      "id": "float",
      "text": {
        "en": "The base case converts discrete integers cleanly into continuous real numbers on ℝ",
        "ar": "تُضاف حالة الأساس لتعميم البرهان ليشمل جميع الأعداد الحقيقية والكسور العشرية غير المتقطعة"
      }
    },
    {
      "id": "loop",
      "text": {
        "en": "Because induction replaces loops",
        "ar": "لاستبدال الحلقات"
      }
    },
    {
      "id": "both",
      "text": {
        "en": "Without a base case, the inductive step can vacuously 'prove' false claims",
        "ar": "الاستقراء وحده بلا أساس قد يثبت عبارات خاطئة؛ فالأساس يطلق السلسلة"
      }
    }
  ],
  "correctAnswer": "both",
  "explanation": {
    "en": "Like falling dominoes: Base Case pushes domino #1, and Inductive Step ensures any falling domino knocks down the next.",
    "ar": "تماماً كسلسلة الدومينو: الأساس يسقط الحجر الأول، وخطوة الاستقراء تضمن أن سقوط الحجر k يسقط k+1."
  },
  "tags": [
    "discrete-math",
    "proofs",
    "recursion"
  ]
} as AssessmentQuestion,
{
  "id": "DM-SET-H-005",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Proof Techniques",
  "subtopic": "Mathematical Induction",
  "specialization": "Strong Induction",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why does proving tree/DP properties often require **Strong Induction** (`assume P(1)..P(k)`) instead of Weak Induction (`P(k)` alone)?",
    "ar": "لماذا تحتاج براهين الأشجار وتقنيات التقسيم إلى **الاستقراء القوي Strong Induction** (`افتراض صحة كل الحالات من 1 إلى k`) بدلاً من الاكتفاء بـ `P(k)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Weak mathematical induction strictly applies to continuous decimal irrational numbers only",
        "ar": "الاستقراء الضعيف يقتصر رياضياً على الأعداد غير النسبية ولا ينطبق على الأعداد الصحيحة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Strong induction eliminates the obligation to establish any base case around n = 1",
        "ar": "الاستقراء القوي يُسقط الحاجة إلى إثبات أي حالة أساس أولية مثل n = 1 تماماً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Because trees contain cycles needing matrix inversion",
        "ar": "لأن الأشجار تحوي دورات"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Subtrees or halved sizes jump down to arbitrary `m <= k`, not strictly `k`",
        "ar": "حجم الأشجار الفرعية والأنصاف يقع في أي `m <= k` وليس عند `k` مباشر فقط"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Divide-and-conquer split `k + 1` into subproblems around `(k+1)/2` or arbitrary subtree sizes `<= k`, requiring truth across all prior sizes.",
    "ar": "عند تقسيم مسألة حجمها `k+1` لأجزاء أصغر نحتاج استخدام صحة القاعدة لجميع القيم السابقة حتى `k`."
  },
  "tags": [
    "induction",
    "proofs",
    "divide-and-conquer"
  ]
} as AssessmentQuestion
];
