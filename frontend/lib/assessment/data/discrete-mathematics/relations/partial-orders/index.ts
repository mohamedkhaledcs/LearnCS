import { AssessmentQuestion } from '@/lib/assessment/schema';

export const partial_orders_questions: AssessmentQuestion[] = [
{
  "id": "DM-PART-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Relations",
  "subtopic": "Partial Orders",
  "specialization": "Posets & Topological Sort",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why is a Partial Order (Reflexive, Antisymmetric, Transitive) called 'partial' rather than a 'total' order?",
    "ar": "لماذا يُسمى الترتيب الجزئي (Partial Order) 'جزئياً' وليس 'كلياً' (Total Order)؟"
  },
  "options": [
    {
      "id": "sym",
      "text": {
        "en": "Because it lacks transitivity",
        "ar": "لأنه يفتقر للتعدي"
      }
    },
    {
      "id": "fin",
      "text": {
        "en": "Because it applies only to finite numbers",
        "ar": "لأنه للأرقام المنتهية فقط"
      }
    },
    {
      "id": "incomp",
      "text": {
        "en": "Two distinct elements need not be comparable",
        "ar": "لأنه لا يشترط قابلية مقارنة أي عنصرين عشوائيين ببعضهما"
      }
    },
    {
      "id": "cyc",
      "text": {
        "en": "Because it allows symmetric cycles",
        "ar": "لأنه يسمح بدورات متماثلة"
      }
    }
  ],
  "correctAnswer": "incomp",
  "explanation": {
    "en": "Course prerequisites and subset inclusion are Posets with incomparable pairs; finding a compatible Total Order linearizing a Poset is Topological Sorting!",
    "ar": "علاقة المتطلبات المسبقة للمواد هي ترتيب جزئي لأن مادتين قد لا تعتمد إحداهما على الأخرى، وتحويله لترتيب خطي هو Topological Sort."
  },
  "tags": [
    "discrete-math",
    "relations",
    "topological-sort"
  ]
} as AssessmentQuestion
];
