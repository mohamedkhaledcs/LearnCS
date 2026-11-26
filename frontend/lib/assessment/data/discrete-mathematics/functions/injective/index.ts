import { AssessmentQuestion } from '@/lib/assessment/schema';

export const injective_questions: AssessmentQuestion[] = [
{
  "id": "DM-INJ-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Functions",
  "subtopic": "Injective (One-to-One)",
  "specialization": "Collision-Free Mapping",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When is a function f: A -> B Injective (One-to-One)?",
    "ar": "متى تكون الدالة f: A -> B متباينة (Injective / One-to-One)؟"
  },
  "options": [
    {
      "id": "surj",
      "text": {
        "en": "Every element in B is mapped from at least one element in A",
        "ar": "كل عنصر في B له أصل في A"
      }
    },
    {
      "id": "const",
      "text": {
        "en": "All elements in A map to the same constant",
        "ar": "كل العناصر لها نفس الصورة"
      }
    },
    {
      "id": "even",
      "text": {
        "en": "|A| > |B|",
        "ar": "حجم A أكبر من B"
      }
    },
    {
      "id": "inj",
      "text": {
        "en": "Distinct inputs always map to distinct outputs",
        "ar": "كل مدخلين مختلفين ينتجان مخرجين مختلفين حتماً"
      }
    }
  ],
  "correctAnswer": "inj",
  "explanation": {
    "en": "Injectivity means zero collisions: essential for lossless encodings and primary-key unique mappings.",
    "ar": "التباين يعني انعدام التصادمات، وهو أساسي في التمثيلات غير الفاقدة والمفاتيح الفريدة."
  },
  "tags": [
    "discrete-math",
    "functions"
  ]
} as AssessmentQuestion
];
