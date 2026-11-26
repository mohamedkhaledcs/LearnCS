import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bucket_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-BUCK-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Bucket Sort",
  "specialization": "Distribution Sensitivity",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "When sorting N floating-point numbers uniformly distributed over [0, 1), what is Bucket Sort's expected time complexity, and what happens if all inputs cluster into 1 bucket?",
    "ar": "عند فرز N رقماً موزعين بانتظام في [0, 1) باستخدام Bucket Sort، ما الزمن المتوقع وماذا يحدث لو تجمعت كل القيم في دلو (Bucket) واحد؟"
  },
  "options": [
    {
      "id": "olog",
      "text": {
        "en": "Guaranteed O(N) worst-case runtime across all adversarial skewed numeric inputs",
        "ar": "تضمن زمن O(N) في أسوأ الحالات دائماً مهما تركزت القيم في مدى ضيق واحد"
      }
    },
    {
      "id": "ev",
      "text": {
        "en": "Expected O(N); degrades to O(N²) if all items cluster into one bucket",
        "ar": "المتوقع O(N)، ويسوء إلى O(N²) إذا تجمعت العناصر كلها في دلو واحد"
      }
    },
    {
      "id": "o1",
      "text": {
        "en": "Strict O(1) memory and O(log N) worst-case comparison throughput across uneven buckets",
        "ar": "مساحة O(1) وزمن O(log N)"
      }
    },
    {
      "id": "on3",
      "text": {
        "en": "O(N³) expected time",
        "ar": "زمنها المتوقع O(N³) للبيانات الموزعة بانتظام بسبب إعادة تقسيم الصناديق مراراً"
      }
    }
  ],
  "correctAnswer": "ev",
  "explanation": {
    "en": "Uniform inputs yield O(1) elements per bucket on average -> O(N) total. Severe skew places everything in one bucket, falling back to that bucket's sort complexity.",
    "ar": "في التوزيع المنتظم يحتوي كل bucket عدداً ثابتاً من العناصر فينتهي في O(N)، أما التكتل الشديد فيسقطه لزمن الفرز الداخلي."
  },
  "tags": [
    "sorting",
    "bucket-sort"
  ]
} as AssessmentQuestion
];
