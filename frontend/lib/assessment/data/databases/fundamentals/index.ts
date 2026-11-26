import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "DB-FUND-E-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Fundamentals",
  "subtopic": "Relational Keys",
  "specialization": "PK & FK",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What two properties define a Primary Key (PK) in a relational database table?",
    "ar": "ما الصفتان الأساسيتان للمفتاح الأساسي (Primary Key) في جداول قواعد البيانات العلائقية؟"
  },
  "options": [
    {
      "id": "unq_nn",
      "text": {
        "en": "Uniquely identifies each row (UNIQUE) and forbids NULL",
        "ar": "يميز كل صف بفردية (UNIQUE) ولا يقبل القيمة الفارغة NULL"
      }
    },
    {
      "id": "auto",
      "text": {
        "en": "Must store variable-length text strings and explicitly permit NULL defaults",
        "ar": "يشترط تخزين نصوص متغيرة الطول مع السماح بقيمة NULL للخانات غير المدخلة"
      }
    },
    {
      "id": "dup",
      "text": {
        "en": "Values may freely duplicate across multiple unrelated rows in the same table",
        "ar": "يُسمح بتكرار القيمة نفسها عبر عدة صفوف مختلفة داخل الجدول الأساسي الواحد"
      }
    },
    {
      "id": "no_idx",
      "text": {
        "en": "Never has an index",
        "ar": "لا يمتلك فهرساً أبداً"
      }
    }
  ],
  "correctAnswer": "unq_nn",
  "explanation": {
    "en": "Entity integrity guarantees every tuple has a non-null unique identifier (Primary Key) so relationships via Foreign Keys resolve unambiguously.",
    "ar": "يضمن تكامل الكيانات أن يكون لكل صف معرف فريد غير خالٍ (UNIQUE + NOT NULL) حتى ترتبط به المفاتيح الأجنبية بدقة."
  },
  "tags": [
    "databases",
    "relational",
    "sql"
  ]
} as AssessmentQuestion,
{
  "id": "DB-REL-E-002",
  "language": "both",
  "domain": "Databases",
  "topic": "Relational Model",
  "subtopic": "Primary Keys",
  "specialization": "Key Guarantees",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which two strict database invariants MUST every table's Primary Key satisfy?",
    "ar": "ما القيدان الإلزاميان اللذان يجب أن يضمنهما المفتاح الأساسي (Primary Key) في كل جدول علائقي؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Must contain alphabetic ASCII strings and exceed 8 bytes",
        "ar": "أن يكون نصاً أبجدياً فوق 8 بايت"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Must auto-increment sequentially without any gaps across transactions",
        "ar": "أن يتسلسل رقمياً بدون فجوات أبداً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Must match foreign columns in every sibling table inside the schema",
        "ar": "أن يتطابق مع بقية الجداول"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Every row key is strictly Unique AND cannot be NULL",
        "ar": "أن يكون فريداً لا يتكرر لكل صف (Unique) وألا يقبل قيمة فارغة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Entity Integrity demands a non-null unique identifier per row so foreign keys and lookups always pinpoint exactly one tuple.",
    "ar": "التفراد وعدم قابلية NULL هما ركيزتا تمييز كل سجل بدقة وربطه بالجداول الأخرى."
  },
  "tags": [
    "primary-key",
    "relational-model",
    "databases"
  ]
} as AssessmentQuestion,
{
  "id": "DB-REL-M-004",
  "language": "both",
  "domain": "Databases",
  "topic": "Relational Model",
  "subtopic": "Foreign Keys",
  "specialization": "ON DELETE Actions",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Deleting a `CurriculumPath` fails cleanly with a Foreign Key violation when child modules reference it via `ON DELETE RESTRICT`. Why is `RESTRICT` often safer than `CASCADE` for critical records?",
    "ar": "يرفض محرك القاعدة حذف مسار تعليمي عند وجود وحدات مرتبطة به بسياسة `ON DELETE RESTRICT`. متى تكون `RESTRICT` أكثر أماناً من `CASCADE`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "`CASCADE` leaves broken orphan foreign keys pointing to deleted parent primary rows",
        "ar": "لأن `CASCADE` يترك صفوفاً يتيمة تشير إلى معرفات آباء غير موجودة في قاعدة البيانات"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`RESTRICT` guards history (invoices, logs) from silent accidental cascade deletion",
        "ar": "يحمي السجلات الحساسة كالفواتير من الحذف المتسلسل الجماعي غير المقصود"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "PostgreSQL strictly blocks `CASCADE` delete constraints whenever tables use UUID keys",
        "ar": "لأن PostgreSQL يمنع استخدام قيود الحذف المتسلسل `CASCADE` مع مفاتيح UUID كلياً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "PostgreSQL refuses `CASCADE` constraints across UUID primary keys",
        "ar": "لأن القاعدة تمنع CASCADE مع UUID"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`CASCADE` silently wipes downstream audit/billing children automatically; `RESTRICT` forces explicit archival or intentional cleanup first.",
    "ar": "`CASCADE` تحذف كل السجلات التابعة بصمت، بينما `RESTRICT` توقف العملية لتحافظ على التاريخ المحاسبي والأرشيفي."
  },
  "tags": [
    "foreign-keys",
    "on-delete",
    "integrity"
  ]
} as AssessmentQuestion
];
