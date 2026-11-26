import { AssessmentQuestion } from '@/lib/assessment/schema';

export const proof_by_contradiction_questions: AssessmentQuestion[] = [
{
  "id": "DM-CONTRA-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Proof Techniques",
  "subtopic": "Proof by Contradiction",
  "specialization": "Classic Irrationality / Primes",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In Euclid's proof by contradiction that infinitely many primes exist, what assumption begins the proof?",
    "ar": "في برهان إقليدس بالتناقض (Contradiction) على وجود عدد لا نهائي من الأعداد الأولية، بأي افتراض يبدأ البرهان؟"
  },
  "options": [
    {
      "id": "even",
      "text": {
        "en": "Assume integer 2 is composite and cannot divide any even product larger than four",
        "ar": "نفترض أن العدد 2 عدد مركب يقبل القسمة على قواسم أخرى غير الواحد ونفسه"
      }
    },
    {
      "id": "fin",
      "text": {
        "en": "Assume only a finite prime list p₁..pₙ exists, then form N = (p₁···pₙ) + 1",
        "ar": "نفترض أن الأعداد الأولية محدودة p₁..pₙ ثم نكوّن N = (p₁···pₙ) + 1"
      }
    },
    {
      "id": "ind",
      "text": {
        "en": "Test the first 100 odd integers numerically to prove no larger prime factors remain",
        "ar": "فحص أول 100 رقم"
      }
    },
    {
      "id": "comp",
      "text": {
        "en": "Assume all numbers are prime",
        "ar": "نفترض أن جميع الأعداد الصحيحة الأكبر من مئة أعداد أولية لا تقبل التحليل أبداً"
      }
    }
  ],
  "correctAnswer": "fin",
  "explanation": {
    "en": "N leaves remainder 1 upon dividing by every prime pᵢ, meaning N is either prime itself or has a prime factor outside the finite list: contradicting completeness!",
    "ar": "العدد N يترك باقي 1 عند القسمة على أي أولي في القائمة، لذا لا بد من وجود أولي جديد خارجها مما يناقض الفرضية."
  },
  "tags": [
    "discrete-math",
    "proofs",
    "primes"
  ]
} as AssessmentQuestion
];
