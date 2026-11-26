import { AssessmentQuestion } from '@/lib/assessment/schema';

export const interpolation_search_questions: AssessmentQuestion[] = [
{
  "id": "AL-INTP-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Interpolation Search",
  "specialization": "Uniform Distribution",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "When does Interpolation Search achieve O(log log N) average time, and when does it degrade to O(N)?",
    "ar": "متى يحقق Interpolation Search تعقيد O(log log N) في المتوسط، ومتى يتدهور إلى O(N)؟"
  },
  "options": [
    {
      "id": "unsorted",
      "text": {
        "en": "Executes consistently in O(1) directly over unsorted alphanumeric text strings",
        "ar": "يعمل بسرعة ثابتة O(1) مباشرة حتى على السلاسل النصية غير المرتبة أبداً"
      }
    },
    {
      "id": "always",
      "text": {
        "en": "Guarantees strict O(log N) lookup bounds regardless of key clustering skew",
        "ar": "يضمن دائماً زمن بحث لوغاريتمي O(log N) مهما تركزت القيم وتفاوتت الفوارق"
      }
    },
    {
      "id": "unif",
      "text": {
        "en": "O(log log N) on uniform sorted data; O(N) on heavily skewed distributions",
        "ar": "O(log log N) للبيانات الموزعة بانتظام، وO(N) مع التوزيع الملتوي"
      }
    },
    {
      "id": "never",
      "text": {
        "en": "Always slower than Linear Search",
        "ar": "دائماً أبطأ من البحث الخطي"
      }
    }
  ],
  "correctAnswer": "unif",
  "explanation": {
    "en": "Interpolation Search probes proportionally to key values; uniform data converges in O(log log N) probes, whereas skewed steps shrink bounds by 1 each time -> O(N).",
    "ar": "يقدّر البحث الاستيفائي الموضع تناسبياً مع القيم؛ في التوزيع المنتظم يصل في O(log log N)، أما في التوزيع المنحاز فقد يتقلص المدى عنصراً واحداً في المرة -> O(N)."
  },
  "tags": [
    "searching",
    "interpolation-search"
  ]
} as AssessmentQuestion
];
