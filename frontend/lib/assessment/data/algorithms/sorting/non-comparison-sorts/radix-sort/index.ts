import { AssessmentQuestion } from '@/lib/assessment/schema';

export const radix_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-RADIX-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Radix Sort",
  "specialization": "LSD Stability",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In Least-Significant-Digit (LSD) Radix Sort, why must the per-digit subroutine (like Counting Sort) be STABLE?",
    "ar": "في LSD Radix Sort (الفرز من الخانة الأقل أهمية للأعلى)، لماذا يجب أن يكون الفرز الفرعي لكل خانة مستقراً (Stable)؟"
  },
  "options": [
    {
      "id": "preserve",
      "text": {
        "en": "Preserves ordering from less-significant digits when higher digits tie",
        "ar": "للحفاظ على ترتيب الخانات الأقل أهمية عند تساوي قيم الخانة الأعلى"
      }
    },
    {
      "id": "float",
      "text": {
        "en": "To enable arbitrary IEEE-754 floating-point division inside counting arrays cleanly",
        "ar": "للسماح بقسمة الأعداد العشرية الحقيقية بدقة دون فقدان العلامة العشرية أثناء الفرز"
      }
    },
    {
      "id": "neg",
      "text": {
        "en": "To bypass array bounds checking",
        "ar": "لتجاوز فحص حدود المصفوفة"
      }
    },
    {
      "id": "opt",
      "text": {
        "en": "Stability is purely optional; unstable digit subroutines still sort multi-digit integers",
        "ar": "الاستقرار خطوة اختيارية تجميلية ولا يؤثر على صحة ترتيب الأعداد متعددة الخانات أبداً"
      }
    }
  ],
  "correctAnswer": "preserve",
  "explanation": {
    "en": "When moving from ones to tens to hundreds, tying tens must remain ordered by their already-sorted ones digit: stability guarantees this.",
    "ar": "عند فرز خانة العشرات مثلاً، يجب أن تبقى الأعداد المتساوية في العشرات مرتبة حسب خانة الآحاد التي فُرزت قبلها، ولا يتحقق ذلك إلا بالفرز المستقر."
  },
  "tags": [
    "sorting",
    "radix-sort"
  ]
} as AssessmentQuestion
];
