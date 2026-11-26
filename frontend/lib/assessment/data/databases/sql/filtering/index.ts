import { AssessmentQuestion } from '@/lib/assessment/schema';

export const filtering_questions: AssessmentQuestion[] = [
{
  "id": "DB-FILT-E-001",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Filtering",
  "specialization": "NULL & LIKE",
  "difficulty": "easy",
  "type": "code-trace",
  "codeLanguage": "sql",
  "codeSnippet": "SELECT * FROM users WHERE deleted_at = NULL;",
  "question": {
    "en": "Why does `WHERE deleted_at = NULL` return ZERO rows in standard SQL?",
    "ar": "لماذا يُرجع الاستعلام `WHERE deleted_at = NULL` صفراً من النتائج في لغة SQL القياسية؟"
  },
  "options": [
    {
      "id": "syntax",
      "text": {
        "en": "Standard SQL rejects NULL inside WHERE filters with a compile syntax failure",
        "ar": "يرفض محرك SQL كلمة NULL داخل شروط WHERE ويطلق خطأ نحوياً يمنع التشغيل"
      }
    },
    {
      "id": "zero",
      "text": {
        "en": "Relational database engines coerce numeric zero cleanly to match NULL values",
        "ar": "القيمة الفارغة NULL تكافئ الصفر الرياضي 0 تماماً في كافة الأعمدة الرقمية والنصية"
      }
    },
    {
      "id": "pk",
      "text": {
        "en": "deleted_at must be a primary key",
        "ar": "يجب أن يكون مفتاحاً أساسياً"
      }
    },
    {
      "id": "isnull",
      "text": {
        "en": "NULL means unknown, so `= NULL` is UNKNOWN; use `IS NULL`",
        "ar": "تعني NULL مجهول و`=` يعطي UNKNOWN، لذا نستخدم `IS NULL`"
      }
    }
  ],
  "correctAnswer": "isnull",
  "explanation": {
    "en": "Three-valued logic in SQL makes `NULL = NULL` evaluate to UNKNOWN (not TRUE). Always use `IS NULL` or `IS NOT NULL`.",
    "ar": "في المنطق ثلاثي القيم بـ SQL، أي مساواة بـ NULL تعطي UNKNOWN وليس TRUE؛ نستخدم IS NULL أو IS NOT NULL دائماً."
  },
  "tags": [
    "sql",
    "databases"
  ]
} as AssessmentQuestion,
{
  "id": "DB-SQL-M-003",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Filtering & NULL",
  "specialization": "Three-Valued Logic",
  "difficulty": "medium",
  "type": "debugging",
  "codeSnippet": "SELECT * FROM users WHERE verified_at = NULL;",
  "codeLanguage": "sql",
  "question": {
    "en": "Even with thousands of unverified users having NULL `verified_at`, this SQL returns **0 rows**! Why?",
    "ar": "رغم وجود آلاف الحسابات التي قيمة `verified_at` فيها NULL، يُرجع الاستعلام أعلاه **صفر صفوف**! لماذا؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "SQL silently coerces missing `NULL` timestamps into blank empty string `''` values",
        "ar": "تحوّل قواعد البيانات القيم الفارغة `NULL` تلقائياً إلى نصوص فارغة `''` عند المقارنة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`= NULL` evaluates to `UNKNOWN`, never true; always check `IS NULL`",
        "ar": "`= NULL` تعطي `UNKNOWN` لا True؛ استخدم `IS NULL` دائماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Using `SELECT *` disables all `WHERE` filtering predicates over timestamp columns",
        "ar": "كتابة `SELECT *` تعطل شروط `WHERE` على التواريخ وتتطلب صلاحية SuperAdmin"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Users tables forbid reading NULL rows without SuperAdmin roles",
        "ar": "يتطلب قراءة NULL صلاحية مشرف"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "SQL three-valued logic (`TRUE / FALSE / UNKNOWN`) treats any arithmetic/equality comparison against `NULL` as `UNKNOWN`; only `IS NULL` / `IS NOT NULL` test nullness!",
    "ar": "منطق القيم الثلاثي في SQL يتعامل مع `= NULL` كحالة غير معروفة ترفضها `WHERE`؛ استخدم `IS NULL`."
  },
  "tags": [
    "sql",
    "null",
    "three-valued-logic"
  ]
} as AssessmentQuestion,
{
  "id": "DB-SQL-H-005",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "SQL Injection",
  "specialization": "Parameterized Queries",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why are parameterized SQL placeholders (`WHERE email = @email` or EF LINQ bindings) immune to classic `' OR '1'='1` SQL Injection attacks?",
    "ar": "لماذا تحمي الاستعلامات ذات المعاملات (Parameterized Queries) من ثغرات حقن SQL مثل `' OR '1'='1`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Database parameter drivers automatically convert SQL keywords into JSON log text",
        "ar": "تحوّل تعريفات المعاملات الكلمات المحجوزة تلقائياً إلى نصوص تعليقات آمنة داخل JSON"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "HTTP GET requests strip single quotes before parameters ever enter TCP sockets",
        "ar": "تحذف طلبات HTTP كافة علامات التنصيص المفردة قبل وصول الطلب لمقابس القاعدة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "HTTP GET strips quote symbols before reaching database TCP sockets",
        "ar": "يحذف HTTP علامات التنصيص"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Query plans compile upfront, binding parameters as literal data rather than SQL",
        "ar": "يُبنى الاستعلام مسبقاً وتُربط المعاملات كبيانات صرفة لا كأوامر SQL تنفيذية"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Data stays cleanly isolated from SQL grammar parsing, eliminating string-concatenation injection vectors structurally.",
    "ar": "الفصل التام بين هيكل جملة SQL وبين قيم المعاملات يمنع تفسير مدخلات المستخدم كأكواد أوامر."
  },
  "tags": [
    "sql-injection",
    "security",
    "parameterized"
  ]
} as AssessmentQuestion
];
