import { AssessmentQuestion } from '@/lib/assessment/schema';

export const er_modeling_questions: AssessmentQuestion[] = [
{
  "id": "DB-ER-E-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "ER Modeling",
  "specialization": "Many-to-Many",
  "difficulty": "easy",
  "type": "scenario",
  "question": {
    "en": "In relational schema design, how is a Many-to-Many (M:N) relationship between `Students` and `Courses` implemented?",
    "ar": "في تصميم قواعد البيانات العلائقية، كيف تُنفذ علاقة متعدد لمتعدد (M:N) بين `Students` و `Courses`؟"
  },
  "options": [
    {
      "id": "csv",
      "text": {
        "en": "Store a comma-separated string list of course IDs inside one text column on Students",
        "ar": "حفظ قائمة أرقام الدورات مفصولة بفواصل داخل عمود نصي واحد في جدول الطلاب"
      }
    },
    {
      "id": "junc",
      "text": {
        "en": "Create a junction table (e.g., `Enrollments`) holding both Foreign Keys",
        "ar": "إنشاء جدول وسيط (`Enrollments`) يضم مفتاحين أجنبيين لكلا الجدولين"
      }
    },
    {
      "id": "fk",
      "text": {
        "en": "Add ten fixed nullable `course_id` columns straight onto the `Students` table",
        "ar": "إضافة عشرة أعمدة ثابتة للأرقام المرجعية داخل جدول الطلاب مباشرة لتمثيل الارتباط"
      }
    },
    {
      "id": "none",
      "text": {
        "en": "Relational databases cannot represent M:N links",
        "ar": "لا تدعم قواعد البيانات العلائقية علاقة M:N"
      }
    }
  ],
  "correctAnswer": "junc",
  "explanation": {
    "en": "A junction table decomposes an M:N relationship into two 1:N relationships, satisfying 1NF atomicity and enabling attributes like enrollment_date.",
    "ar": "يفكك الجدول الوسيط علاقة M:N إلى علاقتين 1:N، محافظاً على 1NF ويتيح تخزين بيانات إضافية للعلاقة مثل تاريخ التسجيل."
  },
  "tags": [
    "databases",
    "database-design",
    "er-modeling"
  ]
} as AssessmentQuestion,
{
  "id": "DB-REL-M-003",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "ER Modeling",
  "specialization": "Many-to-Many Junction",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How are Many-to-Many (`M:N`) entities like `Students <-> Paths` transformed cleanly into relational PostgreSQL tables?",
    "ar": "كيف نحول علاقة متعدد إلى متعدد (`M:N`) مثل الطلاب والمسارات التعليمية إلى جداول فعلية في PostgreSQL؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Create a Junction Table holding foreign keys to both tables",
        "ar": "إنشاء جدول ربط وسيط يضم مفاتيح أجنبية تشير لكلا الجدولين الأصليين"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Append ten fixed nullable columns (`path1..path10`) onto the main Users table",
        "ar": "إضافة عشرة أعمدة ثابتة قابلة لـ NULL داخل جدول المستخدمين ودمج النصوص بفواصل"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Duplicate entire User rows repeatedly once per enrolled path inside `users`",
        "ar": "تكرار صف المستخدم كاملاً مع كافة بياناته الشخصية مقابل كل مسار يشترك فيه"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Duplicate entire User rows once per path subscription inside `users`",
        "ar": "تكرار صف المستخدم كاملاً مع كل مسار"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "A bridge/junction table (`enrollments`) stores normalized pairs `(user_id, path_id)` cleanly with foreign key enforcement and composite uniqueness.",
    "ar": "جدول الربط الوسيط يحل `M:N` دون تكرار ولا حدود ثابتة للأعمدة ومع فرض القيود المرجعية."
  },
  "tags": [
    "er-modeling",
    "many-to-many",
    "junction-table"
  ]
} as AssessmentQuestion,
{
  "id": "DB-REL-H-005",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "Schema Keys",
  "specialization": "Surrogate vs Natural",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why do systems often use an immutable surrogate ID (`UUID` or `BIGSERIAL`) as Primary Key even when user `email` has a `UNIQUE` index?",
    "ar": "لماذا تعتمد الأنظمة معرّفاً بديلاً ثابتاً (Surrogate Key مثل UUID) كمفتاح أساسي رغم وجود فريد على `email`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Database engines strictly refuse unique B-Tree constraints across VARCHAR columns",
        "ar": "تمنع محركات قواعد البيانات إنشاء فهارس فردية على الأعمدة النصية مثل البريد الإلكتروني"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Random 128-bit UUID identifiers compress comfortably inside 16-bit integer registers",
        "ar": "تضغط معرفات UUID العشوائية نفسها داخل مساحة 16 بت أصغر بكثير من الأرقام العادية"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Emails or usernames change later; immutable IDs prevent cascading FK rewrites",
        "ar": "قد يتغير البريد أو الاسم؛ أما المعرّف الثابت فيحمي المفاتيح الأجنبية التابعة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Natural keys disable B-Tree sorted scans completely",
        "ar": "المفاتيح الطبيعية تعطل B-Tree"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Changing a user's email shouldn't require cascading updates across millions of progress, quiz, and payment rows; immutable IDs decouple identity cleanly.",
    "ar": "تثبيت المفتاح الأساسي يعزل الهوية عن تغيرات البريد أو الاسم في المستقبل."
  },
  "tags": [
    "surrogate-key",
    "schema-design",
    "databases"
  ]
} as AssessmentQuestion,
{
  "id": "DB-REL-E-006",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "One-to-Many",
  "specialization": "Foreign Key Placement",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In a `1:N` relationship (`One Path has Many Modules`), which table stores the Foreign Key reference column?",
    "ar": "في علاقة `1:N` (المسار الواحد يضم عدة وحدات/أبواب)، في أي جدول نضع عمود المفتاح الأجنبي؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Inside the `One` side (`paths`)",
        "ar": "في جدول الواحد (`paths`)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Inside both parent and child equally creating circular foreign keys",
        "ar": "في الجدولين معاً بالتساوي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Must generate a 3rd bridge table strictly even for 1:N",
        "ar": "يتطلب دائماً جدول ربط ثالث"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Inside the `Many` side (`modules.path_id -> paths.id`)",
        "ar": "في جدول المتعدد"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Each child module points cleanly to its single owning path via `path_id`.",
    "ar": "يشير كل صف في جدول المتعدد إلى أبيه الوحيد عبر عمود `path_id`."
  },
  "tags": [
    "one-to-many",
    "foreign-keys",
    "modeling"
  ]
} as AssessmentQuestion
];
