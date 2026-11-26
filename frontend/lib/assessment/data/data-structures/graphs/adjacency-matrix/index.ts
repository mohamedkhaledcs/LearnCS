import { AssessmentQuestion } from '@/lib/assessment/schema';

export const adjacency_matrix_questions: AssessmentQuestion[] = [
{
  "id": "DS-ADJM-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Graphs",
  "subtopic": "Adjacency Matrix",
  "specialization": "Edge Lookup Tradeoff",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the main advantage AND main drawback of an Adjacency Matrix compared to an Adjacency List?",
    "ar": "ما هي الميزة الرئيسية والعيب الرئيسي لمصفوفة المجاورة (Adjacency Matrix) مقارنةً بقائمة المجاورة؟"
  },
  "options": [
    {
      "id": "slow",
      "text": {
        "en": "Consumes minimal O(V + E) linear storage while sacrificing O(V) per edge lookup",
        "ar": "توفر مساحة ذاكرة خطية O(V + E) على حساب استغراق O(V) عند فحص وجود حافة"
      }
    },
    {
      "id": "dag",
      "text": {
        "en": "Cannot represent directed graphs",
        "ar": "تقتصر على الرسوم غير الموجهة ولا تستطيع تمثيل الحواف ذات الاتجاه الواحد"
      }
    },
    {
      "id": "trade",
      "text": {
        "en": "O(1) edge check adj[u][v], but consumes O(V²) memory even on sparse graphs",
        "ar": "فحص الحافة في O(1)، لكنها تستهلك مساحة O(V²) حتى مع قلة الحواف"
      }
    },
    {
      "id": "weight",
      "text": {
        "en": "Cannot store numeric positive or negative edge weights inside matrix entries",
        "ar": "لا يمكنها تخزين أوزان الحواف"
      }
    }
  ],
  "correctAnswer": "trade",
  "explanation": {
    "en": "Adjacency matrices give instant O(1) checks for whether edge (u, v) exists, making them great for dense small graphs (V <= 500), at the cost of O(V²) memory.",
    "ar": "تعطي المصفوفة فحصاً فورياً O(1) لوجود أي حافة وتصلح للرسوم الكثيفة الصغيرة، لكنها تستهلك O(V²) ذاكرة."
  },
  "tags": [
    "graphs",
    "adjacency-matrix"
  ]
} as AssessmentQuestion
];
