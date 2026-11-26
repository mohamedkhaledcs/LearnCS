import { AssessmentQuestion } from '@/lib/assessment/schema';

export const set_operations_questions: AssessmentQuestion[] = [
{
  "id": "DB-SET-E-001",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Set Operations",
  "specialization": "UNION vs UNION ALL",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why is `UNION ALL` typically faster than `UNION` when combining two compatible SELECT results?",
    "ar": "لماذا يُعد `UNION ALL` أسرع عادةً من `UNION` عند دمج نتيجتي استعلامين متوافقين؟"
  },
  "options": [
    {
      "id": "idx",
      "text": {
        "en": "`UNION` automatically drops all existing B-Tree indexes from both participating database tables",
        "ar": "يقوم `UNION` بتعطيل كافة الفهارس الموجودة على الجدولين تلقائياً قبل القراءة منهما"
      }
    },
    {
      "id": "nulls",
      "text": {
        "en": "UNION ALL drops NULL columns automatically",
        "ar": "يحذف قيم NULL تلقائياً"
      }
    },
    {
      "id": "col",
      "text": {
        "en": "`UNION ALL` allows merging tables that return completely mismatched numbers and types of columns",
        "ar": "يسمح `UNION ALL` بدمج نتائج ذات عدد أعمدة مختلف وأنواع بيانات متباينة دون شروط"
      }
    },
    {
      "id": "nodup",
      "text": {
        "en": "Appends rows directly without sorting or hashing to remove duplicates",
        "ar": "يدمج `UNION ALL` الصفوف مباشرة دون تكلفة الفرز أو التجزئة لإلغاء التكرار"
      }
    }
  ],
  "correctAnswer": "nodup",
  "explanation": {
    "en": "UNION performs a distinct deduplication pass over the combined result set, whereas UNION ALL streams both sets back-to-back in O(N).",
    "ar": "يقوم UNION بإلغاء المكررات مما يتطلب فرزاً أو هاشينج، بينما يسرد UNION ALL النتائج مباشرة إذا كنت متأكداً من عدم التكرار."
  },
  "tags": [
    "sql",
    "databases"
  ]
} as AssessmentQuestion
];
