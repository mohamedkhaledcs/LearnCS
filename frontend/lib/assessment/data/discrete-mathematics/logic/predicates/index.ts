import { AssessmentQuestion } from '@/lib/assessment/schema';

export const predicates_questions: AssessmentQuestion[] = [
{
  "id": "DM-PRED-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Predicates",
  "specialization": "Predicate Evaluation",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Given predicate P(x, y): `x² = y` over integers, what are the truth values of P(3, 9) and P(-3, 6)?",
    "ar": "بالنظر للمحمول المنطقي P(x, y): `x² = y` على الأعداد الصحيحة، ما قيمة الصدق لـ P(3, 9) و P(-3, 6)؟"
  },
  "options": [
    {
      "id": "tf",
      "text": {
        "en": "P(3, 9) is True; P(-3, 6) is False",
        "ar": "P(3, 9) صائبة (True)، و P(-3, 6) خاطئة (False)"
      }
    },
    {
      "id": "tt",
      "text": {
        "en": "Both True",
        "ar": "كلاهما صائب"
      }
    },
    {
      "id": "ff",
      "text": {
        "en": "Both False",
        "ar": "كلاهما خاطئ"
      }
    },
    {
      "id": "ft",
      "text": {
        "en": "P(3, 9) is False; P(-3, 6) is True",
        "ar": "الأولى خاطئة والثانية صائبة"
      }
    }
  ],
  "correctAnswer": "tf",
  "explanation": {
    "en": "Substituting concrete arguments turns a predicate into a proposition: 3² = 9 (True), whereas (-3)² = 9 ≠ 6 (False).",
    "ar": "التعويض بقيم محددة يحول المحمول لقضية: 3² = 9 صائبة، أما (-3)² = 9 وليس 6 فهي خاطئة."
  },
  "tags": [
    "discrete-math",
    "logic",
    "predicates"
  ]
} as AssessmentQuestion,
{
  "id": "DM-LOG-E-006",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Predicates",
  "specialization": "Order of Quantifiers",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Does swapping nested quantifier order (`For all x, Exists y` vs `Exists y, For all x`) preserve identical meaning?",
    "ar": "هل تبديل ترتيب المكممات المتداخلة (`لكل x يوجد y` مقابل `يوجد y لكل x`) يعطي نفس المعنى دائماً؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Yes: nested universal and existential quantifiers commute identically like sums",
        "ar": "نعم: تتبادل المكممات الكلية والوجودية دائماً تماماً كعملية الجمع دون تغير بالمعنى"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Only differs on finite domains containing two or fewer elements strictly",
        "ar": "يظهر الفرق فقط في المجموعات المنتهية الصغيرة بينما لا تغير المكممات قيمة الصدق عامة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Quantifiers never alter predicate truth scope",
        "ar": "المكممات لا تغير قيمة الصدق"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "No: `Exists y, All x` demands one fixed `y`; `All x, Exists y` lets `y` vary",
        "ar": "لا: الثانية تلزم `y` واحداً ثابتاً للجميع، والأولى تجيز تغير `y` لكل `x`"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "'Everyone has a birthday' (`For all x, Exists d`) is true, whereas 'There is one birthday everyone shares' (`Exists d, For all x`) is false!",
    "ar": "مثال بسيط: لكل إنسان أمّ (صحيح)، بينما توجد أمّ واحدة لكل الناس جميعاً (خطأ)."
  },
  "tags": [
    "quantifiers",
    "predicates",
    "discrete-math"
  ]
} as AssessmentQuestion
];
