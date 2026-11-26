import { AssessmentQuestion } from '@/lib/assessment/schema';

export const surjective_questions: AssessmentQuestion[] = [
{
  "id": "DM-SURJ-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Functions",
  "subtopic": "Surjective (Onto)",
  "specialization": "Codomain Coverage",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When is a function f: A -> B Surjective (Onto)?",
    "ar": "متى تكون الدالة f: A -> B غامرة (Surjective / Onto)؟"
  },
  "options": [
    {
      "id": "onto",
      "text": {
        "en": "Every codomain b ∈ B equals f(a) for at least one domain element a ∈ A",
        "ar": "كل عنصر b في المجال المقابل B هو صورة لعنصر واحد على الأقل a من A"
      }
    },
    {
      "id": "inj",
      "text": {
        "en": "Every distinct input pair maps cleanly to distinct non-colliding elements in B",
        "ar": "لا يشترك عنصران مختلفان من A أبداً في الارتباط بالصورة نفسها داخل المجموعة B"
      }
    },
    {
      "id": "smaller",
      "text": {
        "en": "Strictly |A| < |B| across finite sets so codomain exceeds total mapped inputs",
        "ar": "يكون عدد عناصر المجال A أصغر قطعاً من عدد عناصر المجال المقابل B في المجموعات المنتهية"
      }
    },
    {
      "id": "zero",
      "text": {
        "en": "f(0) = 0",
        "ar": "f(0) = 0"
      }
    }
  ],
  "correctAnswer": "onto",
  "explanation": {
    "en": "A surjective function leaves no unused elements in codomain B.",
    "ar": "تغطي الدالة الغامرة جميع عناصر المجموعة المستهدفة B بلا استثناء."
  },
  "tags": [
    "discrete-math",
    "functions"
  ]
} as AssessmentQuestion
];
