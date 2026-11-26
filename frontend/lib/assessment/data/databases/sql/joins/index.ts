import { AssessmentQuestion } from '@/lib/assessment/schema';

export const joins_questions: AssessmentQuestion[] = [
{
  "id": "DB-JOIN-M-003",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Joins",
  "specialization": "Left Join",
  "difficulty": "medium",
  "type": "scenario",
  "question": {
    "en": "A LEFT JOIN returns all records from the left table and the matched records from the right table. What happens if there is no match in the right table?",
    "ar": "الـ LEFT JOIN يُرجع جميع السجلات من الجدول الأيسر والسجلات المطابقة من الجدول الأيمن. ماذا يحدث إذا لم يكن هناك تطابق في الجدول الأيمن؟"
  },
  "options": [
    {
      "id": "null",
      "text": {
        "en": "The result is NULL from the right side.",
        "ar": "النتيجة تكون NULL من الجانب الأيمن."
      }
    },
    {
      "id": "drop",
      "text": {
        "en": "The row from the left table is dropped from the result.",
        "ar": "يتم إسقاط السجل من الجدول الأيسر من النتيجة."
      }
    },
    {
      "id": "error",
      "text": {
        "en": "The Database throws an error.",
        "ar": "تُصدر الـ Database خطأ (error)."
      }
    },
    {
      "id": "duplicate",
      "text": {
        "en": "The row is duplicated.",
        "ar": "يتم تكرار السجل."
      }
    }
  ],
  "correctAnswer": "null",
  "explanation": {
    "en": "A LEFT JOIN always preserves all rows from the left table; when no matching row exists on the right side, the right-table columns are returned as NULL.",
    "ar": "يحفظ LEFT JOIN جميع صفوف الجدول الأيسر؛ وعند عدم وجود صف مطابق في الجدول الأيمن تظهر أعمدته بقيمة NULL."
  }
} as AssessmentQuestion,
{
  "id": "DB-JNS-E-002",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Joins",
  "specialization": "INNER vs LEFT",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "You want EVERY registered learner displayed in an admin export, showing `0` or `NULL` for learners who have completed zero quizzes. Which JOIN type fits?",
    "ar": "تريد عرض **جميع** المتعلمين المسجلين حتى من لم يقدم أي اختبار بعد (ليظهر له `0` أو `NULL`). أي نوع ربط JOIN يناسب؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "INNER JOIN between `users` and `attempts`",
        "ar": "INNER JOIN"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "LEFT JOIN from `users` onto `attempts`",
        "ar": "LEFT JOIN بدءاً من `users` نحو `attempts`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "CROSS JOIN without condition",
        "ar": "CROSS JOIN"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "NATURAL SELF JOIN",
        "ar": "SELF JOIN"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`LEFT JOIN` preserves all rows of the left table (`users`) even when zero matching rows exist in the right table (`attempts`).",
    "ar": "يحافظ `LEFT JOIN` على كامل صفوف الجدول الأيسر مهما غابت التطابقات في الجدول الأيمن."
  },
  "tags": [
    "left-join",
    "sql",
    "joins"
  ]
} as AssessmentQuestion,
{
  "id": "DB-JNS-M-003",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Joins",
  "specialization": "Self Join",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Employees reference their own supervisor inside the SAME table (`employees.manager_id -> employees.id`). What SQL technique pairs every worker with their manager's name?",
    "ar": "يحتفظ جدول `employees` بالمدير عبر `manager_id` المشير إلى `employees.id` داخل الجدول نفسه. كيف نعرض اسم كل موظف مع اسم مديره؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Maintaining a cloned shadow employee table refreshed via background cron jobs",
        "ar": "إنشاء جدول ثانٍ مكرر كنسخة ظل تُحدَّث دورياً كل ساعة عبر مهمة خلفية آلية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Combining columns using `UNION ALL` into delimited comma-separated text strings",
        "ar": "دمج الصفوف عبر `UNION ALL` أو ترتيبها تنازلياً واختيار `LIMIT 1` للعثور على المدير"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Self-Join (aliasing the same table as `e` and `mgr`)",
        "ar": "الربط الذاتي (Self-Join) بإعطاء الجدول اسمين مستعارين `e` و`mgr`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Sorting descending and picking `LIMIT 1` globally",
        "ar": "ترتيب ثم LIMIT 1"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Aliasing the same table twice (`e` and `mgr`) enables hierarchical parent-child queries cleanly inside SQL.",
    "ar": "منح الجدول اسمين مستعارين يتيح ربطه بنفسه لتمثيل العلاقات الهرمية مثل المديرين والأبناء."
  },
  "tags": [
    "self-join",
    "sql",
    "joins"
  ]
} as AssessmentQuestion
];
