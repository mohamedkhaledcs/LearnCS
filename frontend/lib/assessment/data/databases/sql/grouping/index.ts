import { AssessmentQuestion } from '@/lib/assessment/schema';

export const grouping_questions: AssessmentQuestion[] = [
{
  "id": "DB-GRP-M-001",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "Grouping & Aggregations",
  "specialization": "WHERE vs HAVING",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which query correctly returns departments whose average salary exceeds 5000, considering only active employees?",
    "ar": "أي استعلام يُرجع الأقسام التي يتجاوز متوسط رواتب الموظفين النشطين فيها 5000 بشكل صحيح؟"
  },
  "options": [
    {
      "id": "wavg",
      "text": {
        "en": "SELECT dept FROM emp WHERE AVG(salary) > 5000 AND active = true GROUP BY dept;",
        "ar": "SELECT dept FROM emp WHERE AVG(salary) > 5000 GROUP BY dept ثم تصفية المجموعة"
      }
    },
    {
      "id": "both",
      "text": {
        "en": "SELECT dept FROM emp WHERE active = true GROUP BY dept HAVING AVG(salary) > 5000;",
        "ar": "WHERE active = true قبل GROUP BY ثم HAVING AVG(salary) > 5000"
      }
    },
    {
      "id": "onlyg",
      "text": {
        "en": "SELECT dept FROM emp GROUP BY dept HAVING AVG(salary) > 5000 WHERE active = true;",
        "ar": "وضع جملة GROUP BY dept أولاً ثم اتباعها بشرط WHERE active = true في النهاية"
      }
    },
    {
      "id": "order",
      "text": {
        "en": "SELECT dept FROM emp ORDER BY AVG(salary) > 5000;",
        "ar": "ORDER BY AVG(salary) > 5000"
      }
    }
  ],
  "correctAnswer": "both",
  "explanation": {
    "en": "Aggregate functions (COUNT, AVG, SUM) cannot appear in WHERE because WHERE executes before GROUP BY; HAVING filters grouped aggregates afterward.",
    "ar": "لا تقبل جملة WHERE دوال التجميع مثل AVG؛ لذا تصفّي WHERE الصفوف أولاً ثم يُجمع GROUP BY وأخيراً يصفّي HAVING المجموعات."
  },
  "tags": [
    "sql",
    "databases"
  ]
} as AssessmentQuestion,
{
  "id": "DB-JNS-E-006",
  "language": "both",
  "domain": "Databases",
  "topic": "SQL",
  "subtopic": "GROUP BY",
  "specialization": "HAVING Filter",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "SELECT domain, COUNT(*) AS cnt\nFROM concepts\nGROUP BY domain\nHAVING COUNT(*) >= 4;",
  "codeLanguage": "sql",
  "question": {
    "en": "What role does `HAVING COUNT(*) >= 4` play in this grouped query?",
    "ar": "ما وظيفة الجملة `HAVING COUNT(*) >= 4` في استعلام التجميع أعلاه؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Caps individual ungrouped database table rows prior to GROUP BY aggregation",
        "ar": "يحدد عدد الصفوف الفردية المقروءة من الجدول الأصلي قبل بدء عملية التجميع كلياً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Filters grouped domains AFTER aggregation to keep `>= 4` concepts",
        "ar": "يصفّي المجموعات بعد التجميع لإبقاء المجالات التي تضم 4 مفاهيم فأكثر"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Attaches default B-Tree descending sort hints across domain index structures",
        "ar": "يضيف تلميح فهرسة تلقائياً ويرتب مقاييس المجالات تنازلياً حسب عدد الكلمات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Sorts domain metrics descending cleanly",
        "ar": "ترتب النتائج تنازلياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`WHERE` filters rows BEFORE `GROUP BY`; `HAVING` filters computed groups AFTER `GROUP BY` aggregates finish.",
    "ar": "`WHERE` تعمل قبل التجميع على كل صف، و`HAVING` تعمل بعده على المجموعات."
  },
  "tags": [
    "group-by",
    "having",
    "sql"
  ]
} as AssessmentQuestion
];
