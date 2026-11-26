import { AssessmentQuestion } from '@/lib/assessment/schema';

export const hash_indexes_questions: AssessmentQuestion[] = [
{
  "id": "DB-HIDX-M-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Indexing",
  "subtopic": "Hash Indexes",
  "specialization": "Equality vs Range",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why are B-Tree indexes preferred over Hash indexes for queries like `WHERE created_at >= '2026-01-01'`?",
    "ar": "لماذا تُفضل فهارس B-Tree على فهارس Hash للاستعلامات التي تستخدم مدى مثل `WHERE created_at >= '2026-01-01'`؟"
  },
  "options": [
    {
      "id": "range",
      "text": {
        "en": "Hash indexes support only '=' lookups; B-Trees keep sorted order for range scans",
        "ar": "فهارس Hash تدعم المساواة '=' فقط؛ أما B-Tree فتحفظ الترتيب للمدى"
      }
    },
    {
      "id": "ram",
      "text": {
        "en": "B-Trees store all keys strictly in uncompressed CPU L1 cache without touching disk or RAM pages",
        "ar": "أشجار B-Tree لا تستهلك أي مساحة في RAM بل تعمل كلياً داخل مسجلات المعالج السريعة فقط"
      }
    },
    {
      "id": "str",
      "text": {
        "en": "Hash indexes cannot hash strings",
        "ar": "لا تقبل النصوص"
      }
    },
    {
      "id": "slow",
      "text": {
        "en": "Hash equality `=` lookups degrade to O(N²) full table scans whenever strings exceed 16 bytes",
        "ar": "البحث بالمساواة '=' في فهرس Hash يكلف O(N²) مع الأعمدة النصية التي تتجاوز 16 حرفاً"
      }
    }
  ],
  "correctAnswer": "range",
  "explanation": {
    "en": "Hashing destroys key ordering, so range predicates (<, >, BETWEEN, prefix LIKE 'abc%') cannot scan adjacent keys on a Hash index.",
    "ar": "تُفقد دوال التجزئة الترتيب التسلسلي للقيم، لذا لا تفيد مع > و < و BETWEEN، بعكس B-Tree المرتبة."
  },
  "tags": [
    "databases",
    "indexing",
    "b-trees"
  ]
} as AssessmentQuestion
];
