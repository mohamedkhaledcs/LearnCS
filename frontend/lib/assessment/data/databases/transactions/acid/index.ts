import { AssessmentQuestion } from '@/lib/assessment/schema';

export const acid_questions: AssessmentQuestion[] = [
{
  "id": "DB-ACID-M-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Transactions",
  "subtopic": "ACID Properties",
  "specialization": "Isolation",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In the ACID properties of a Database transaction, what does the 'I' stand for?",
    "ar": "في خصائص ACID لعمليات الـ Database، ماذا يمثل حرف الـ 'I'؟"
  },
  "options": [
    {
      "id": "isolation",
      "text": {
        "en": "Isolation",
        "ar": "Isolation (العزل)"
      }
    },
    {
      "id": "integrity",
      "text": {
        "en": "Integrity",
        "ar": "Integrity (السلامة)"
      }
    },
    {
      "id": "indexing",
      "text": {
        "en": "Indexing",
        "ar": "Indexing (الفهرسة)"
      }
    },
    {
      "id": "idempotency",
      "text": {
        "en": "Idempotency",
        "ar": "Idempotency"
      }
    }
  ],
  "correctAnswer": "isolation",
  "explanation": {
    "en": "In ACID, A=Atomicity, C=Consistency, I=Isolation (concurrent transactions appear to execute independently without corrupting intermediate state), D=Durability.",
    "ar": "في ACID يرمز الحرف I إلى العزل (Isolation)، أي أن المعاملات المتزامنة لا ترى البيانات الوسيطة غير المكتملة لبعضها البعض."
  }
} as AssessmentQuestion,
{
  "id": "DB-ACD-E-002",
  "language": "both",
  "domain": "Databases",
  "topic": "Transactions",
  "subtopic": "ACID",
  "specialization": "Atomicity",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In ACID transactions transferring $100 (`debit A`, `credit B`), which property guarantees either BOTH succeed or NEITHER persists?",
    "ar": "في تحويل بنكي (`سحب من A` ثم `إيداع في B`)، أي خاصية في ACID تضمن نجاح الخطوتين معاً أو إلغاء كلتيهما عند الفشل؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Atomicity",
        "ar": "الذرية Atomicity"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Isolation",
        "ar": "العزل Isolation"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Normal Form 3NF",
        "ar": "التطبيع الثالث"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Index Clustering",
        "ar": "تجميع الفهرس"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Atomicity guarantees partial mid-transaction crashes roll back cleanly leaving balances exact.",
    "ar": "تمنع الذرية تنفيذ نصف العملية المالية في حال انقطاع الخادم أو خطأ التحقق."
  },
  "tags": [
    "acid",
    "atomicity",
    "transactions"
  ]
} as AssessmentQuestion,
{
  "id": "DB-ACD-M-003",
  "language": "both",
  "domain": "Databases",
  "topic": "Transactions",
  "subtopic": "Durability",
  "specialization": "Write-Ahead Logging",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does PostgreSQL ensure a transaction remains **Durable** immediately after `COMMIT` even if electricity cuts before main data pages flush?",
    "ar": "كيف تضمن PostgreSQL **ديمومة (Durability)** المعاملة فور الرد بنجاح `COMMIT` حتى لو انقطع التيار قبل تحديث صفحات الجدول الرئيسية؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Holds dirty pages solely inside volatile L2 SRAM cache ignoring persistent storage",
        "ar": "تحفظ كافة التغييرات مؤقتاً داخل مخبأ L2 السريع للمعالج دون كتابة على القرص الصلب"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Persists changes to disk Write-Ahead Log (`WAL`) before reporting COMMIT success",
        "ar": "تثبت التغييرات تسلسلياً في سجل WAL على القرص قبل تأكيد نجاح COMMIT"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Suspends B-Tree leaf balancing operations for 24 hours across background jobs",
        "ar": "تؤجل موازنة أشجار B-Tree لمدة 24 ساعة ثم تنسخ الجداول بالكامل لملف تعريف العميل"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "By duplicating entire schemas across client browser cookies",
        "ar": "بنسخ البيانات لمتصفح العميل"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Replaying the sequential WAL upon restart reconstructs every committed change fast without data loss.",
    "ar": "إعادة قراءة سجل WAL عند التشغيل تسترجع كافة المعاملات المؤكدة التي لم تفرَّغ لملفات الجداول بعد."
  },
  "tags": [
    "wal",
    "durability",
    "acid"
  ]
} as AssessmentQuestion,
{
  "id": "DB-ACD-M-004",
  "language": "both",
  "domain": "Databases",
  "topic": "Transactions",
  "subtopic": "Isolation Anomalies",
  "specialization": "Phantom vs Non-Repeatable",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Inside Transaction T1, you run `SELECT COUNT(*) WHERE status = 'pending'` twice and see a NEW pending row inserted concurrently by committed T2! What anomaly occurred?",
    "ar": "داخل المعاملة T1 نُفّذ استعلام `COUNT(*)` مرتين وظهرت صفوف جديدة أضافتها معاملة T2 في المرة الثانية! ما اسم هذه الظاهرة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Dirty Read exposing uncommitted temporary rollback rows before completion",
        "ar": "القراءة المتسخة لبيانات لم تُثبت بعد وقد يتراجع عنها النظام قبل إتمام المعاملة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Null Pointer Dereference Overflow triggered across concurrent select counts",
        "ar": "تداخل الربط الديكارتي وفيضان المؤشرات الفارغة أثناء فحص قيود المعاملات"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Phantom Read",
        "ar": "القراءة الوهمية (Phantom Read)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Cartesian Product Cross Join",
        "ar": "ربط ديكارتي"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Phantom Reads reflect newly added rows matching a predicate across repeated range reads inside a weaker transaction level (prevented cleanly by Repeatable Read / Serializable snapshots).",
    "ar": "القراءة الوهمية تصف اختلاف مجموعة الصفوف نفسها عند إعادة الاستعلام، وتمنعها مستويات Repeatable Read/Serializable في PostgreSQL."
  },
  "tags": [
    "phantom-read",
    "isolation",
    "mvcc"
  ]
} as AssessmentQuestion,
{
  "id": "DB-ACD-H-005",
  "language": "both",
  "domain": "Databases",
  "topic": "Transactions",
  "subtopic": "MVCC",
  "specialization": "Non-Blocking Reads",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "How does PostgreSQL **MVCC (Multi-Version Concurrency Control)** allow readers (`SELECT`) to run WITHOUT blocking writers (`UPDATE`) cleanly?",
    "ar": "كيف يتيح محرك **MVCC** في PostgreSQL لعمليات القراءة `SELECT` الاستمرار دون حجبها بواسطة عمليات التحديث `UPDATE` المتزامنة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Read queries directly inspect dirty uncommitted RAM pages without transaction synchronization",
        "ar": "الاستعلامات تقرأ التغييرات غير المثبتة مباشرة من الذاكرة قبل تنفيذ الالتزام نهائياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "PostgreSQL locks entire database schemas exclusively during every concurrent SQL select query",
        "ar": "تقوم قاعدة البيانات بقفل جميع الجداول كلياً ومنع أي قراءة أثناء أي استعلام محدد"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "MVCC deletes old index trees automatically on every commit",
        "ar": "تحذف الفهارس القديمة فوراً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Readers view snapshot tuple versions (`xmin/xmax`) while writers add new versions",
        "ar": "القراء يرون لقطة متسقة لإصدارات الصفوف بينما يضيف الكاتب نسخة جديدة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Snapshot versioning keeps readers and writers completely non-blocking toward each other, leaving `VACUUM` to reclaim obsolete row tuples asynchronously.",
    "ar": "تعدد النسخ يحفظ لقطة زمنية متسقة لكل معاملة، مما يمنح سرعة قراءة فائقة مع عزل قوي."
  },
  "tags": [
    "mvcc",
    "postgresql",
    "concurrency"
  ]
} as AssessmentQuestion,
{
  "id": "DB-ACD-E-006",
  "language": "both",
  "domain": "Databases",
  "topic": "Transactions",
  "subtopic": "Isolation",
  "specialization": "Serializable Subscription Safety",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why should a user plan-upgrade endpoint preventing double active pending requests combine a DB Transaction with a Unique Partial Index?",
    "ar": "لماذا تجمع نقطة نهاية طلب الاشتراك (لمنع طلبين معلقين معاً) بين المعاملة العازلة والفهرس الفريد الجزئي في القاعدة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Prevents concurrent double-click race duplicates in both code and storage",
        "ar": "لمنع تكرار الطلبات المتزامنة منطقياً وبقيد قاعدة بيانات قاطع"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Allows student accounts to bypass manual billing verification approvals automatically",
        "ar": "لتمكين حسابات الطلاب من تجاوز موافقة المشرف وتفعيل الخطط المدفوعة تلقائياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Erases completed quiz mastery progress safely whenever a learner upgrades plans",
        "ar": "لمسح تقدم الاختبارات والدروس السابقة بأمان كلما اختار المستخدم ترقية خطته"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Because PostgreSQL drops primary keys during updates",
        "ar": "لأن المفتاح الأساسي يُحذف"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Transactional checks supersede stale requests safely while PostgreSQL's unique index `WHERE status = 0` enforces zero duplicates physically.",
    "ar": "القيد المزدوج في المنطق والفهرس يحفظ سلامة البيانات حتى لو وصل طلبان في اللحظة نفسها."
  },
  "tags": [
    "transactions",
    "concurrency",
    "subscriptions"
  ]
} as AssessmentQuestion
];
