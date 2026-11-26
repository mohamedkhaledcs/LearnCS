import { AssessmentQuestion } from '@/lib/assessment/schema';

export const select_questions: AssessmentQuestion[] = [
{
  "id": "DB-SQL-E-001",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Fundamentals",
  "specialization": "Data Retrieval",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which SQL clause is used to filter records before any groupings take place?",
    "ar": "أي أمر SQL يستخدم لتصفية السجلات (filter records) قبل حدوث أي تجميع (groupings)؟"
  },
  "options": [
    {
      "id": "having",
      "text": {
        "en": "HAVING",
        "ar": "HAVING"
      }
    },
    {
      "id": "groupby",
      "text": {
        "en": "GROUP BY",
        "ar": "GROUP BY"
      }
    },
    {
      "id": "where",
      "text": {
        "en": "WHERE",
        "ar": "WHERE"
      }
    },
    {
      "id": "orderby",
      "text": {
        "en": "ORDER BY",
        "ar": "ORDER BY"
      }
    }
  ],
  "correctAnswer": "where",
  "explanation": {
    "en": "WHERE filters individual rows before GROUP BY aggregates them, whereas HAVING filters aggregated groups afterward.",
    "ar": "يقوم شرط WHERE بتصفية الصفوف الفردية قبل التجميع (GROUP BY)، بينما يصفّي HAVING المجموعات بعد التجميع."
  }
} as AssessmentQuestion,
{
  "id": "DB-SQL-E-002",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Queries",
  "specialization": "DISTINCT & LIMIT",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "SELECT DISTINCT domain FROM concepts ORDER BY domain ASC LIMIT 3;",
  "codeLanguage": "sql",
  "question": {
    "en": "What does `SELECT DISTINCT domain ... LIMIT 3` guarantee when returning rows from `concepts`?",
    "ar": "ما وظيفة `SELECT DISTINCT domain ... LIMIT 3` عند استعلام جدول المفاهيم `concepts`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Removes duplicate domain names and caps output strictly to the first 3 alphabetically",
        "ar": "يحذف تكرارات أسماء المجالات ثم يرجع أول 3 مجالات فريدة أبجدياً فقط"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Deletes extra domain rows permanently from PostgreSQL storage",
        "ar": "يحذف الصفوف المكررة نهائياً من القاعدة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Counts NULL domains before sorting descending by ID",
        "ar": "يعد القيم الفارغة تنازلياً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Groups all unit titles into JSON arrays automatically",
        "ar": "يدمج العناوين في JSON"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`DISTINCT` deduplicates identical result values, `ORDER BY` sorts deterministically, and `LIMIT` bounds page size.",
    "ar": "`DISTINCT` يمنع تكرار النتائج و`LIMIT 3` يقتصر على أول ثلاثة صفوف بعد الفرز."
  },
  "tags": [
    "sql",
    "distinct",
    "limit"
  ]
} as AssessmentQuestion,
{
  "id": "DB-SQL-M-004",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "COUNT Semantics",
  "specialization": "COUNT(*) vs COUNT(col)",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Table `reviews` has 100 rows, of which 25 have `comment = NULL`. What integers return from `SELECT COUNT(*), COUNT(comment) FROM reviews;`?",
    "ar": "جدول يحوي 100 صف، منها 25 صفاً قيمة العمود `comment` فيها `NULL`. ما ناتج `COUNT(*)` مقابل `COUNT(comment)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Both equal 100 cleanly",
        "ar": "كلاهما 100"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Both equal 75 cleanly",
        "ar": "كلاهما 75"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "COUNT(*) = 100, COUNT(comment) = 75 (excludes NULLs)",
        "ar": "COUNT(*) = 100 و COUNT(comment) = 75 (يستثني NULL)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "COUNT(*) = 75, COUNT(comment) = 25",
        "ar": "75 و 25"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`COUNT(*)` counts every row in the group, whereas `COUNT(expr)` ignores rows where `expr` evaluates to `NULL`.",
    "ar": "`COUNT(*)` يحسب جميع الصفوف بينما `COUNT(column)` يتجاهل القيم الفارغة `NULL`."
  },
  "tags": [
    "count",
    "null",
    "aggregation"
  ]
} as AssessmentQuestion,
{
  "id": "DB-SQL-E-006",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Execution Order",
  "specialization": "GROUP BY vs SELECT",
  "difficulty": "easy",
  "type": "debugging",
  "question": {
    "en": "Why can `ORDER BY total_xp` sort by an alias created in `SELECT ... AS total_xp` while `WHERE total_xp > 50` fails?",
    "ar": "لماذا تقبل عبارة `ORDER BY total_xp` الاسم المستعار المنشأ في `SELECT ... AS total_xp` بينما ترفضه عبارة `WHERE`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "`WHERE` evaluates logically BEFORE `SELECT`, while `ORDER BY` runs AFTER it",
        "ar": "`WHERE` تُنفذ منطقياً قبل `SELECT`، بينما تأتي `ORDER BY` بعد حساب الأسماء المستعارة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "SQL syntax strictly prohibits filtering computed integer counts inside numeric tables",
        "ar": "معايير SQL تمنع منعاً باتاً تصفية المجاميع والأرقام المحسوبة في الجداول الرقمية كلها"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "PostgreSQL engine optimization evaluates `WHERE` strictly last after offset pagination",
        "ar": "تُنفذ جملة `WHERE` منطقياً كآخر خطوة تماماً بعد تطبيق فرز النتائج وتحديد LIMIT"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "`WHERE` evaluates strictly last after pagination limits execute",
        "ar": "تُنفَّذ WHERE في النهاية"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Logical evaluation order: `FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT`.",
    "ar": "ترتيب المعالجة المنطقي يضع `SELECT` قبل `ORDER BY` وبعد `WHERE` و`HAVING`."
  },
  "tags": [
    "sql",
    "execution-order",
    "aliases"
  ]
} as AssessmentQuestion
];
