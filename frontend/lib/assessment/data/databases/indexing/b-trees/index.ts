import { AssessmentQuestion } from '@/lib/assessment/schema';

export const b_trees_questions: AssessmentQuestion[] = [
{
  "id": "DB-INDEX-M-002",
  "language": "both",
  "domain": "Databases",
  "topic": "Indexing",
  "subtopic": "B-Trees",
  "specialization": "Internal Structure",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Most Relational Databases use which Data Structure internally to implement indexes?",
    "ar": "معظم الـ Relational Databases تستخدم أي Data Structure داخلياً لتنفيذ الفهارس (indexes)؟"
  },
  "options": [
    {
      "id": "linkedlist",
      "text": {
        "en": "Linked List",
        "ar": "Linked List"
      }
    },
    {
      "id": "hash",
      "text": {
        "en": "Hash Table",
        "ar": "Hash Table"
      }
    },
    {
      "id": "graph",
      "text": {
        "en": "Graph",
        "ar": "Graph"
      }
    },
    {
      "id": "btree",
      "text": {
        "en": "B-Tree",
        "ar": "B-Tree"
      }
    }
  ],
  "correctAnswer": "btree",
  "explanation": {
    "en": "B-Trees / B+ Trees keep keys sorted in shallow balanced disk pages, supporting both O(log N) point lookups and fast sequential range scans (>=, <=, BETWEEN).",
    "ar": "تحافظ أشجار B-Tree / B+ Tree على المفاتيح مرتبة داخل صفحات متوازنة، مما يتيح البحث السريع O(log N) واستعلامات المدى بكفاءة."
  }
} as AssessmentQuestion
];
