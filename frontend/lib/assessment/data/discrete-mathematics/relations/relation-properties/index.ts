import { AssessmentQuestion } from '@/lib/assessment/schema';

export const relation_properties_questions: AssessmentQuestion[] = [
{
  "id": "DM-RELP-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Relations",
  "subtopic": "Relation Properties",
  "specialization": "Symmetric vs Antisymmetric",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which three properties apply to the `<=` (less-than-or-equal) relation on integers ℤ?",
    "ar": "أي خصائص تنطبق على علاقة `<=` (أصغر من أو يساوي) على مجموعة الأعداد الصحيحة ℤ؟"
  },
  "options": [
    {
      "id": "po",
      "text": {
        "en": "Reflexive, Antisymmetric, and Transitive",
        "ar": "انعكاسية (Reflexive)، ضد متماثلة (Antisymmetric)، ومتعدية"
      }
    },
    {
      "id": "eq",
      "text": {
        "en": "Reflexive, Symmetric, and Transitive",
        "ar": "انعكاسية ومتماثلة ومتعدية"
      }
    },
    {
      "id": "ir",
      "text": {
        "en": "Irreflexive and Symmetric only",
        "ar": "غير انعكاسية ومتماثلة فقط"
      }
    },
    {
      "id": "none",
      "text": {
        "en": "None of the above",
        "ar": "لا شيء مما سبق"
      }
    }
  ],
  "correctAnswer": "po",
  "explanation": {
    "en": "a <= a holds (Reflexive); a <= b and b <= a forces a = b (Antisymmetric); a <= b and b <= c yields a <= c (Transitive).",
    "ar": "لأن a <= a دوماً (انعكاسية)، وإذا كان a <= b و b <= a فلا بد أن a = b (ضد متماثلة)، وإذا a <= b <= c فإن a <= c (متعدية)."
  },
  "tags": [
    "discrete-math",
    "relations"
  ]
} as AssessmentQuestion
];
