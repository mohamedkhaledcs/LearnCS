import { AssessmentQuestion } from '@/lib/assessment/schema';

export const sparse_table_questions: AssessmentQuestion[] = [
{
  "id": "CP-SPARSE-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Range Queries",
  "subtopic": "Sparse Table",
  "specialization": "RMQ O(1)",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why can a Sparse Table answer static Range Minimum Queries (RMQ) in O(1), whereas Range Sum Queries take O(log N)?",
    "ar": "لماذا يجيب Sparse Table على استعلامات أصغر قيمة في النطاق (RMQ) في O(1)، بينما تحتاج مجاميع النطاق إلى O(log N)؟"
  },
  "options": [
    {
      "id": "idemp",
      "text": {
        "en": "min/max/gcd are idempotent, so overlapping power-of-2 ranges never double-count",
        "ar": "عمليات min/max/gcd تتحمل التداخل دون مضاعفة النتيجة، بخلاف الجمع"
      }
    },
    {
      "id": "neg",
      "text": {
        "en": "Range sums fail mathematically on arrays mixing negative and positive 64-bit numbers",
        "ar": "عملية الجمع لا تعمل رياضياً داخل جداول القوى الثنائية عندما تتضمن المصفوفة قيماً سالبة"
      }
    },
    {
      "id": "log2",
      "text": {
        "en": "min takes less RAM than integers",
        "ar": "لأن min تستهلك ذاكرة أقل"
      }
    },
    {
      "id": "dyn",
      "text": {
        "en": "Standard Sparse Tables natively support O(1) arbitrary point mutations for range sums",
        "ar": "يدعم جدول Sparse Table القياسي تعديل قيم العناصر المفردة في O(1) لجمع النطاقات"
      }
    }
  ],
  "correctAnswer": "idemp",
  "explanation": {
    "en": "Since min(A, A) = A, overlapping [L, L + 2^k - 1] and [R - 2^k + 1, R] yields the exact range minimum in O(1); sum requires disjoint power-of-2 blocks -> O(log N).",
    "ar": "بما أن min(x, x) = x، يكفي فترتان متداخلتان بطول 2^k لتغطية [L, R] في O(1)، أما الجمع فيتطلب فواصل غير متداخلة بزمن O(log N)."
  },
  "tags": [
    "cp",
    "sparse-table",
    "range-queries"
  ]
} as AssessmentQuestion
];
