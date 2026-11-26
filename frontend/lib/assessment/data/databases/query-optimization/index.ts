import { AssessmentQuestion } from '@/lib/assessment/schema';

export const query_optimization_questions: AssessmentQuestion[] = [
{
  "id": "DB-OPT-H-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Query Optimization",
  "subtopic": "Execution Plans",
  "specialization": "SARGable Predicates",
  "difficulty": "hard",
  "type": "code-trace",
  "codeLanguage": "sql",
  "codeSnippet": "-- Query A: WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'\n-- Query B: WHERE YEAR(created_at) = 2026",
  "question": {
    "en": "On an indexed column `created_at`, why does Query A execute far faster than Query B on 10M rows?",
    "ar": "عند وجود فهرس على العمود `created_at` في جدول به 10 ملايين صف، لماذا يُنفذ Query A أسرع بكثير من Query B؟"
  },
  "options": [
    {
      "id": "year",
      "text": {
        "en": "PostgreSQL and MySQL deprecated `YEAR()` in favor of client-side string slicing exclusively",
        "ar": "دالة `YEAR()` ملغاة في معايير SQL الحديثة وتمنع تنفيذ الاستعلام عبر محرك الفهارس دائماً"
      }
    },
    {
      "id": "sarg",
      "text": {
        "en": "Wrapping `created_at` in `YEAR()` disables B-Tree use, causing a full scan",
        "ar": "تغليف العمود بدالة `YEAR()` يعطّل فهرس B-Tree ويفرض مسح الجدول كاملاً"
      }
    },
    {
      "id": "ram",
      "text": {
        "en": "Query B uses too many joins",
        "ar": "الاستعلام الثاني أبطأ فقط لأنه ينشئ ربطاً ذاتياً خفياً ويخزن نتائجه في ذاكرة القرص"
      }
    },
    {
      "id": "sort",
      "text": {
        "en": "Query A runs faster solely because PostgreSQL automatically pre-sorts query results in cache",
        "ar": "Query A يرتب الناتج"
      }
    }
  ],
  "correctAnswer": "sarg",
  "explanation": {
    "en": "The B-Tree stores raw `created_at` values, not precomputed `YEAR(created_at)` outputs. Keeping the column raw on one side of the operator lets the planner do an Index Range Scan.",
    "ar": "يخزن الفهرس القيمة الأصلية للتاريخ لا ناتج الدالة؛ كتابة النطاق الصريح (SARGable) تسمح للمخطط بـ Index Range Scan في أجزاء من المللي ثانية."
  },
  "tags": [
    "databases",
    "indexing",
    "performance"
  ]
} as AssessmentQuestion,
{
  "id": "DB-IDX-E-002",
  "language": "both",
  "domain": "Databases",
  "topic": "Query Optimization",
  "subtopic": "Indexes",
  "specialization": "B-Tree Range Support",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why are **B+ Tree** indexes PostgreSQL's default over Hash indexes for most columns?",
    "ar": "لماذا تُعد فهارس **+B-Tree** الخيار الافتراضي في PostgreSQL مقارنةً بفهارس Hash لأغلب الأعمدة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Hash indexes completely refuse equality lookups across string email addresses",
        "ar": "تمنع فهارس Hash البحث بالمساواة على عناوين البريد الإلكتروني والأعمدة النصية كلياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "B+ Trees consume zero extra RAM pages or persistent disk blocks on indexed columns",
        "ar": "لا تستهلك فهارس B+ Tree أي مساحة إضافية في الذاكرة أو على القرص الصلب عند بنائها"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Hash indexes convert queries into O(N^2) sequential sweeps",
        "ar": "فهارس Hash تبطئ لـ O(N^2)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "B+ Trees support `=`, `<`, `BETWEEN`, prefix `LIKE`, and `ORDER BY`",
        "ar": "تدعم `=`، والمجالات `<` و`BETWEEN`، وبداية `LIKE`، والفرز `ORDER BY`"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Hash indexes ONLY answer exact `=` equality, whereas ordered B+ Trees handle ranges, sorting, uniqueness, and prefix patterns in `O(log N)`.",
    "ar": "فهرس Hash يحل المساواة الصرفة فقط بينما يجمع B-Tree بين المساواة والنطاقات والترتيب."
  },
  "tags": [
    "b-tree",
    "indexing",
    "postgresql"
  ]
} as AssessmentQuestion,
{
  "id": "DB-IDX-M-003",
  "language": "both",
  "domain": "Databases",
  "topic": "Query Optimization",
  "subtopic": "Composite Index",
  "specialization": "Column Ordering",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "We add `CREATE INDEX ix_attempts ON unit_quiz_attempts(user_id, scope_id, started_at DESC);`. Which filter matches its leftmost index prefix cleanly?",
    "ar": "أضفنا فهرساً مركباً على `(user_id, scope_id, started_at)` بهذا الترتيب. أي استعلام يستفيد منه بكفاءة عبر البادئة اليسرى؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Filtering `WHERE user_id = $1 AND scope_id = $2 ORDER BY started_at DESC`",
        "ar": "تصفية `user_id` و`scope_id` مع الفرز على `started_at DESC`"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Filtering ONLY `WHERE started_at > NOW() - INTERVAL '7 days'`",
        "ar": "تصفية `started_at` وحدها دون user_id"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Filtering `WHERE scope_id = 'unit-arrays' AND percentage > 80`",
        "ar": "تصفية `scope_id` دون user_id"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Running `WHERE LOWER(scope_id) = 'unit-arrays'` alone",
        "ar": "استدعاء دالة `LOWER(scope_id)` فقط"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Leading with `user_id` and `scope_id` pins the exact contiguous leaf slice already pre-sorted by `started_at DESC`!",
    "ar": "البدء بالعمود القائد `user_id` ثم `scope_id` يستفيد مباشرة من شجرة الفهرس والترتيب."
  },
  "tags": [
    "composite-index",
    "leftmost-prefix",
    "optimization"
  ]
} as AssessmentQuestion,
{
  "id": "DB-IDX-M-004",
  "language": "both",
  "domain": "Databases",
  "topic": "Query Optimization",
  "subtopic": "N+1 Query Problem",
  "specialization": "ORM Batching",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Fetching 100 units first, then running a `for` loop querying sections separately for each unit (`1 + 100` DB round-trips), is known as:",
    "ar": "جلب 100 وحدة باستعلام أول ثم تنفيذ حلقة تستعلم أقسام كل وحدة في استعلام منفصل (`101` رحلة لقاعدة البيانات) يُعرف بمشكلة:"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Write-Ahead Log Overflow Exception inside concurrent EF transactions",
        "ar": "فيضان سجل الكتابة المسبق Write-Ahead Log عند قراءة القوائم المرتبطة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "N+1 Query Problem",
        "ar": "مشكلة الاستعلامات المتكررة N+1 Query"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Two-Phase Lock Commit Deadlock across normalized parent tables",
        "ar": "ضغط جذر شجرة B-Tree وقفل المعاملات الثنائي في الجداول المترابطة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "B-Tree Root Compression",
        "ar": "ضغط جذر الشجرة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Replacing 101 sequential round-trips with 1 batched `WHERE unit_id IN (...)` or JOIN cuts network/query overhead dramatically.",
    "ar": "استبدال مئة استعلام في حلقة باستعلام مجمع واحد أو Include يضاعف سرعة الـ API عشرات المرات."
  },
  "tags": [
    "n-plus-one",
    "ef-core",
    "performance"
  ]
} as AssessmentQuestion,
{
  "id": "DB-IDX-H-005",
  "language": "both",
  "domain": "Databases",
  "topic": "Query Optimization",
  "subtopic": "SARGable Predicates",
  "specialization": "Index Bypassing",
  "difficulty": "hard",
  "type": "debugging",
  "codeSnippet": "-- Index exists on (email)\nSELECT * FROM users WHERE LOWER(email) = 'ali@learncs.dev';",
  "codeLanguage": "sql",
  "question": {
    "en": "Why does `WHERE LOWER(email) = ...` fall back to a slow **Sequential Scan** ignoring the standard index on `email`?",
    "ar": "لماذا يتجاهل المخطط الفهرس العادي على `email` ويجري مسحاً كاملاً بطيئاً عند كتابة `WHERE LOWER(email) = ...`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "PostgreSQL query planners completely refuse string `=` comparisons across email columns",
        "ar": "تمنع قاعدة البيانات إجراء مقارنات المساواة `=` على حقول البريد الإلكتروني النصية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Applying lowercase string functions allocates O(N²) RAM per scanned disk row",
        "ar": "استدعاء دالة تحويل الحروف يستهلك ذاكرة مربعة O(N²) لكل صف مقروء من القرص"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Calling `LOWER(email)` bypasses raw B-Tree keys without an expression index",
        "ar": "تغليف العمود بالدالة يعطّل فهرس B-Tree العادي دون وجود فهرس تعبيري"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Select stars disable every index inside PostgreSQL schemas",
        "ar": "لأن `*` يعطل الفهارس"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Normalize input to lowercase before saving OR create `CREATE INDEX ON users (LOWER(email))` so queries remain SARGable!",
    "ar": "العمود غير المغلّف بدوال يسمح بـ Index Scan، أو ننشئ Expression Index مطابِق لـ `LOWER(email)`."
  },
  "tags": [
    "sargable",
    "postgres",
    "indexing"
  ]
} as AssessmentQuestion,
{
  "id": "DB-IDX-E-006",
  "language": "both",
  "domain": "Databases",
  "topic": "Query Optimization",
  "subtopic": "EXPLAIN ANALYZE",
  "specialization": "Query Plans",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which PostgreSQL diagnostic command actually executes a query and prints real Index/Seq Scan timing and row counts?",
    "ar": "ما الأمر التشخيصي في PostgreSQL الذي ينفذ الاستعلام ويعرض الخطة الفعلية وأزمنة التنفيذ وعدد الصفوف؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "DESCRIBE TABLE",
        "ar": "DESCRIBE TABLE"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "TRUNCATE STATISTICS",
        "ar": "TRUNCATE STATISTICS"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "FLUSH TABLES",
        "ar": "FLUSH TABLES"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "EXPLAIN ANALYZE <query>",
        "ar": "EXPLAIN ANALYZE <query>"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`EXPLAIN ANALYZE` runs the planner AND measures actual step durations and heap fetches vs planner estimates (wrap writes in `BEGIN ... ROLLBACK`!).",
    "ar": "يعرض `EXPLAIN ANALYZE` الفارق بين توقعات المخطط والأرقام الفعلية مع تحديد أماكن Seq Scan البطيئة."
  },
  "tags": [
    "explain-analyze",
    "postgresql",
    "optimization"
  ]
} as AssessmentQuestion
];
