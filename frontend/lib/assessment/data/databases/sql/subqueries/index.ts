import { AssessmentQuestion } from '@/lib/assessment/schema';

export const subqueries_questions: AssessmentQuestion[] = [
{
  "id": "DB-SUB-M-001",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Subqueries & CTEs",
  "specialization": "Correlated vs Independent",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does a Correlated Subquery differ from a standard independent subquery?",
    "ar": "كيف يختلف الاستعلام الفرعي المرتبط (Correlated Subquery) عن الاستعلام الفرعي المستقل؟"
  },
  "options": [
    {
      "id": "once",
      "text": {
        "en": "Always executes exactly once upfront before any outer table scan phase begins",
        "ar": "يُنفذ دائماً مرة واحدة فقط في البداية ولا يقرأ أي عمود من الجدول الخارجي أبداً"
      }
    },
    {
      "id": "nosql",
      "text": {
        "en": "Works exclusively inside schema-less NoSQL document stores lacking SQL JOIN support",
        "ar": "يعمل في قواعد NoSQL فقط"
      }
    },
    {
      "id": "outer",
      "text": {
        "en": "References outer-query columns and re-evaluates logically per outer row",
        "ar": "يرتبط بأعمدة الاستعلام الخارجي ويُقيّم منطقياً مقابل كل صف خارجي"
      }
    },
    {
      "id": "del",
      "text": {
        "en": "It cannot appear in SELECT or EXISTS clauses",
        "ar": "يُمنع استخدامه إطلاقاً داخل جمل SELECT أو مع المعامل المنطقي EXISTS في SQL"
      }
    }
  ],
  "correctAnswer": "outer",
  "explanation": {
    "en": "A correlated subquery (often paired with EXISTS/NOT EXISTS) links an inner alias to the outer query's current row.",
    "ar": "يعتمد الاستعلام الفرعي المرتبط على قيم كل صف من الاستعلام الخارجي، ويُستخدم بكثرة مع EXISTS و NOT EXISTS."
  },
  "tags": [
    "sql",
    "databases"
  ]
} as AssessmentQuestion,
{
  "id": "DB-JNS-M-004",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "CTEs vs Set Ops",
  "specialization": "UNION vs UNION ALL",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "When combining two ALREADY-disjoint query results (`active_orders` and `archived_orders`), why is `UNION ALL` significantly faster than `UNION`?",
    "ar": "عند دمج نتيجتي استعلامين متفصلين أصلاً، لماذا يكون `UNION ALL` أسرع بكثير من `UNION`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "`UNION ALL` bypasses checking column count alignment across concatenated select sets",
        "ar": "يتجاهل `UNION ALL` التحقق من تطابق عدد الأعمدة وأنواعها بين الاستعلامين المدمجين"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "`UNION` permanently copies secondary B-Tree indexes onto solid-state drives during scans",
        "ar": "ينسخ `UNION` كافة الفهارس الثانوية إلى القرص الصلب في كل مرة يقرأ فيها الجداول"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "`UNION ALL` deletes unmatched NULL rows automatically",
        "ar": "لأنه يحذف القيم NULL"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`UNION ALL` skips global sort/hash duplicate removal passes",
        "ar": "يدمج `UNION ALL` الصفوف مباشرة دون تكلفة الفرز أو التجزئة لإلغاء التكرار"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`UNION` runs `DISTINCT` sorting/hashing across the combined set; prefer `UNION ALL` whenever duplicates are absent or acceptable.",
    "ar": "يقوم `UNION` بفرز وإزالة التكرار من كل الصفوف المجمعة؛ بينما يدمج `UNION ALL` مباشرة."
  },
  "tags": [
    "union-all",
    "sql",
    "performance"
  ]
} as AssessmentQuestion,
{
  "id": "DB-JNS-H-005",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "CTEs",
  "specialization": "NOT IN vs NULL Trap",
  "difficulty": "hard",
  "type": "scenario",
  "codeSnippet": "SELECT id FROM units WHERE id NOT IN (SELECT prereq_id FROM edges);",
  "codeLanguage": "sql",
  "question": {
    "en": "If `edges` contains EVEN ONE row where `prereq_id IS NULL`, why does `NOT IN (SELECT ...)` surprisingly return **0 rows**? What safe alternative fixes it?",
    "ar": "إذا حوى الاستعلام الفرعي في `NOT IN` قيمة `NULL` واحدة فقط، فلماذا يرجع **صفر صفوف**؟ وما البديل الآمن؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "`x != NULL` yields `UNKNOWN` so every check fails; use `NOT EXISTS`",
        "ar": "المقارنة مع `NULL` تعيد `UNKNOWN` فينتج صفر صفوف؛ استخدم `NOT EXISTS`"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "`NOT IN` clears secondary B-Tree indexes before filtering foreign key tables cleanly",
        "ar": "يعطل المعامل `NOT IN` كافة الفهارس تلقائياً فيحول الاستعلام لقراءة صفرية فارغة دائماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Subqueries reject integer keys unless explicitly serialized into text JSON arrays",
        "ar": "ترفض الاستعلامات الفرعية مفاتيح الأعداد الصحيحة ما لم تُحوَّل أولاً إلى نصوص JSON"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Only `CROSS JOIN` avoids nullable foreign key checks safely",
        "ar": "يحلها CROSS JOIN فقط"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Think `(id != 'u1' AND id != NULL)` -> `UNKNOWN` -> empty result! `NOT EXISTS` handles nullable tables safely and often uses fast anti-joins.",
    "ar": "`x != NULL` يفسد شرط `AND` بأكمله؛ بينما `NOT EXISTS` لا يتأثر بوجود NULL."
  },
  "tags": [
    "not-exists",
    "null-trap",
    "subqueries"
  ]
} as AssessmentQuestion
];
