import { AssessmentQuestion } from '@/lib/assessment/schema';

export const equivalence_relations_questions: AssessmentQuestion[] = [
{
  "id": "DM-EQREL-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Relations",
  "subtopic": "Equivalence Relations",
  "specialization": "Modulo Congruence",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What three properties define an Equivalence Relation (like `a ≡ b (mod m)`), and what structure do its equivalence classes form?",
    "ar": "ما الخصائص الثلاث لعلاقة التكافؤ (مثل التطابق الحسابي mod m)، وماذا تشكل صفوف التكافؤ؟"
  },
  "options": [
    {
      "id": "rat",
      "text": {
        "en": "Reflexive, Antisymmetric, Transitive: forming a strictly directed linear order chain",
        "ar": "انعكاسية وضد متماثلة ومتعدية كما في علاقات الترتيب الجزئي الموجهة الخطية"
      }
    },
    {
      "id": "rst",
      "text": {
        "en": "Reflexive, Symmetric, Transitive: partitioning S into disjoint classes",
        "ar": "انعكاسية ومتماثلة ومتعدية، وتجزئ المجموعة إلى صفوف تكافؤ منفصلة"
      }
    },
    {
      "id": "dag",
      "text": {
        "en": "Asymmetric and Non-reflexive: arranging nodes into an unrooted directed acyclic tree",
        "ar": "غير انعكاسية وغير متماثلة بحيث تشكل شجرة موجهة مفتوحة الجوانب بلا تقسيم متساوٍ"
      }
    },
    {
      "id": "empty",
      "text": {
        "en": "Must contain empty pairs only",
        "ar": "تكون خالية دائماً"
      }
    }
  ],
  "correctAnswer": "rst",
  "explanation": {
    "en": "Reflexive + Symmetric + Transitive relations partition the ground set into disjoint subsets (exact mathematical foundation of DSU connected components!).",
    "ar": "علاقة التكافؤ تقسم المجموعة إلى أجزاء غير متداخلة، وهي الأساس النظري لبنية Disjoint Set Union."
  },
  "tags": [
    "discrete-math",
    "relations"
  ]
} as AssessmentQuestion,
{
  "id": "DM-SET-E-006",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Relations",
  "subtopic": "Equivalence Relations",
  "specialization": "Modular Congruence",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Does integer congruence modulo 5 (`a ~ b` iff `a % 5 == b % 5`) form a valid Equivalence Relation partitioning all integers into 5 residue classes?",
    "ar": "هل علاقة التطابق المعياري (`a % 5 == b % 5`) تشكّل علاقة تكافؤ صالحة تقسّم الأعداد الصحيحة إلى 5 فئات متفصلة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Yes: it satisfies reflexivity, symmetry, and transitivity cleanly",
        "ar": "نعم: لأنها تحقق الانعكاس والتماثل والتعدي تماماً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "No: negative integers fail transitivity under modulo",
        "ar": "لا: الأعداد السالبة تكسر التعدي"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "No: zero cannot relate to itself cleanly",
        "ar": "لا: الصفر لا يطابق نفسه"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Only true when modulus is strictly even",
        "ar": "تصح فقط عندما يكون المعيار زوجياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Equal remainders satisfy `a~a`, `a~b => b~a`, and `a~b && b~c => a~c`, dividing integers cleanly into remainders `0..4`.",
    "ar": "تساوي البواقي علاقة تكافؤ نموذجية تقسم الأعداد حسب البواقي من 0 إلى 4."
  },
  "tags": [
    "equivalence",
    "modulo",
    "relations"
  ]
} as AssessmentQuestion
];
