import { AssessmentQuestion } from '@/lib/assessment/schema';

export const _3nf_questions: AssessmentQuestion[] = [
{
  "id": "DB-NORM-H-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "Normalization",
  "specialization": "3NF",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "To achieve Third Normal Form (3NF), a table must be in 2NF and must also remove...",
    "ar": "لتحقيق الـ Third Normal Form (3NF)، يجب أن يكون الجدول في الـ 2NF ويجب أيضاً إزالة..."
  },
  "options": [
    {
      "id": "transitive",
      "text": {
        "en": "Transitive dependencies.",
        "ar": "الاعتماديات المتعدية (Transitive dependencies)."
      }
    },
    {
      "id": "partial",
      "text": {
        "en": "Partial dependencies.",
        "ar": "الاعتماديات الجزئية (Partial dependencies)."
      }
    },
    {
      "id": "multivalued",
      "text": {
        "en": "Multi-valued dependencies.",
        "ar": "الاعتماديات متعددة القيم (Multi-valued dependencies)."
      }
    },
    {
      "id": "composite",
      "text": {
        "en": "Composite primary keys.",
        "ar": "المفاتيح الأساسية المركبة (Composite primary keys)."
      }
    }
  ],
  "correctAnswer": "transitive",
  "explanation": {
    "en": "3NF builds upon 2NF by eliminating transitive dependencies, ensuring every non-key column depends ONLY on the primary key and not indirectly through another non-key column.",
    "ar": "تتطلب 3NF أن يكون الجدول في 2NF مع إزالة الاعتماديات المتعدية بحيث يعتمد كل عمود غير مفتاحي على المفتاح الأساسي مباشرة فقط."
  }
} as AssessmentQuestion,
{
  "id": "DB-NRM-E-002",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "Normalization",
  "specialization": "1NF Atomicity",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Putting multiple phone numbers (`\"010111, 012222\"`) inside ONE single `phone` column violates which Normal Form?",
    "ar": "وضع عدة أرقام هواتف (`\"010111, 012222\"`) داخل عمود واحد في صف المستخدم ينتهك أي مستوى تطبيع؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Boyce-Codd Normal Form (BCNF) only",
        "ar": "BCNF فقط"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "ACID Isolation Level 4",
        "ar": "مستوى عزل ACID"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "First Normal Form",
        "ar": "التطبيع الأول (1NF) الذي يشترط قيمة ذرية واحدة في كل خلية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Hash Buckets Partitioning",
        "ar": "تجزئة القاعدة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "1NF enforces atomic cell values and forbids multi-valued repeating groups within one field; split phones into a child `user_phones` table.",
    "ar": "1NF يمنع القوائم المتكررة داخل خلية واحدة، ويُعالج بجدول فرعي لأرقام الهواتف."
  },
  "tags": [
    "1nf",
    "normalization",
    "databases"
  ]
} as AssessmentQuestion,
{
  "id": "DB-NRM-M-003",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "Normalization",
  "specialization": "2NF Partial Dependency",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Table `order_items(order_id, product_id, product_name, qty)` uses composite Primary Key `(order_id, product_id)`. Why does `product_name` violate **2NF**?",
    "ar": "جدول `order_items` مفتاحه المركب `(order_id, product_id)` ويضم العمود `product_name`. لماذا يكسر `product_name` التطبيع الثاني **2NF**؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "String VARCHAR fields are disallowed inside composite numeric primary key tables",
        "ar": "الحقول النصية ممنوعة تماماً في الجداول التي تستخدم مفاتيح أساسية مركبة من رقمين"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "PostgreSQL strictly caps normalized relational rows to storing at most three columns",
        "ar": "قواعد PostgreSQL تحظر إضافة أكثر من ثلاثة أعمدة أو قيم صفرية للكمية في جدول واحد"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "PostgreSQL bans storing more than 3 columns cleanly",
        "ar": "لأن القاعدة تمنع فوق 3 أعمدة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`product_name` partially depends only on half of the key (`product_id`)",
        "ar": "يعتمد `product_name` جزئياً على نصف المفتاح المركب (`product_id`) فقط"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "In 2NF, non-key columns must depend on the WHOLE composite primary key (`order_id + product_id`), whereas `product_name` belongs cleanly inside `products`!",
    "ar": "التبعية الجزئية على أحد طرفي المفتاح المركب تكرر اسم المنتج آلاف المرات؛ ينتقل `product_name` إلى جدول `products`."
  },
  "tags": [
    "2nf",
    "normalization",
    "composite-key"
  ]
} as AssessmentQuestion,
{
  "id": "DB-NRM-M-004",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "Normalization",
  "specialization": "Delete Anomaly",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In an unnormalized `students(id, name, advisor_id, advisor_office)` table, deleting the last remaining student advised by Dr. Omar erases Dr. Omar's office address permanently! Which anomaly is this?",
    "ar": "في جدول غير مطبّع يدمج الطلاب مع مكتب المشرف الأكاديمي، حذف آخر طالب عند د. عمر يمحو رقم مكتب د. عمر من النظام كله! ما اسم هذه المشكلة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Deletion Anomaly (resolved by extracting `advisors` into its own table)",
        "ar": "شذوذ الحذف (يُحل بفصل `advisors` في جدول مستقل)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Serializable Isolation Deadlock triggered by single-row cleanup locks",
        "ar": "جمود العزل التسلسلي الناتج عن حذف آخر صف في جدول المشرفين المتصل"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Dirty Read Exception erasing committed advisor profiles on transaction rollback",
        "ar": "اهتزاز صفحات شجرة B-Tree وفقدان الفهارس عند إزالة السجل الأخير من الجدول"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Dirty Read Exception",
        "ar": "قراءة متسخة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Separating independent entities ensures deleting a student row leaves the advisor entity completely intact.",
    "ar": "فصل الكيانات المستقلة في جداولها يضمن عدم ضياع بيانات المشرف عند مغادرة طلابه."
  },
  "tags": [
    "anomalies",
    "3nf",
    "normalization"
  ]
} as AssessmentQuestion,
{
  "id": "DB-NRM-H-005",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "BCNF",
  "specialization": "BCNF vs 3NF",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "What stricter rule does **BCNF (Boyce-Codd Normal Form)** add beyond 3NF?",
    "ar": "ما الشرط الأكثر صرامة الذي يضيفه **BCNF** مقارنةً بالتطبيع الثالث 3NF؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "BCNF eliminates all foreign key integrity links across relational tables completely",
        "ar": "صيغة BCNF تحذف كافة المفاتيح الأجنبية والعلاقات المرجعية بين الجداول العلائقية"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Every determinant `X` in a non-trivial `X -> Y` must be a Superkey",
        "ar": "كل محدد `X` في تبعية غير بديهية `X -> Y` يجب أن يكون مفتاحاً فائقاً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Tables normalized to BCNF must duplicate high-traffic read aggregate columns twice",
        "ar": "تسمح صيغة BCNF بتخزين قوائم مفصولة بفواصل في الخلايا مع مضاعفة المجاميع المكررة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Requires every table to duplicate read-heavy totals twice",
        "ar": "يشترط تكرار المجاميع مرتين"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "3NF permits dependencies onto prime key parts (`non-superkey -> key attribute`); BCNF eliminates even those overlapping candidate-key anomalies.",
    "ar": "يعالج BCNF الحالات النادرة التي يعتمد فيها جزء من مفتاح مرشح على عمود غير فائق."
  },
  "tags": [
    "bcnf",
    "normalization",
    "theory"
  ]
} as AssessmentQuestion,
{
  "id": "DB-NRM-E-006",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "Denormalization",
  "specialization": "Historical Snapshots",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When storing a historical `subscription_payments` invoice, why save `charged_amount` directly alongside `plan_id` instead of joining current `plans.price`?",
    "ar": "عند حفظ سجل دفع تاريخي للاشتراك، لماذا نسجل `charged_amount` مباشرة داخل الفاتورة بدلاً من الاكتفاء بربطه بسعر الخطة الحالي؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "PostgreSQL numeric decimal columns forbid foreign key joins across billing tables",
        "ar": "تمنع القاعدة ربط الأعمدة العشرية بمفاتيح أجنبية وتضطر لتخطي سجل WAL أثناء الدفع"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Storing charged totals bypasses WAL crash logs cleanly on every checkout write",
        "ar": "لتوفير فهرس وحيد على القرص وتقليص استهلاك الذاكرة أثناء قراءة سجل الاشتراكات"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Future plan price hikes must not rewrite historical user receipts",
        "ar": "كي لا تغير تعديلات الأسعار مستقبلاً مبالغ الفواتير التاريخية المدفوعة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Forces database transactions to bypass WAL crash logging",
        "ar": "لتخطي سجل WAL"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Price paid at purchase is an immutable event fact, not duplicate mutable state: preserving accurate audit history.",
    "ar": "المبلغ المدفوع لحظة السداد واقعة تاريخية ثابتة يجب تجميدها في السجل نفسه."
  },
  "tags": [
    "denormalization",
    "auditing",
    "databases"
  ]
} as AssessmentQuestion
];
