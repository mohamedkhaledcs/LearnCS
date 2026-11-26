import { AssessmentQuestion } from '@/lib/assessment/schema';

export const concurrency_control_questions: AssessmentQuestion[] = [
{
  "id": "DB-CONC-H-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Transactions",
  "subtopic": "Concurrency Control",
  "specialization": "MVCC vs 2PL",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "How does MVCC (Multi-Version Concurrency Control, used in PostgreSQL) allow readers to read without blocking writers?",
    "ar": "كيف تسمح آلية MVCC (المستخدمة في PostgreSQL) للقراء بالاستعلام دون حجب من الكُتّاب (Readers don't block Writers)؟"
  },
  "options": [
    {
      "id": "lock",
      "text": {
        "en": "PostgreSQL places a single global exclusive table lock across the entire database on read",
        "ar": "تفرض قفلاً حصرياً شاملاً على قاعدة البيانات كلها عند أي عملية قراءة متزامنة"
      }
    },
    {
      "id": "snap",
      "text": {
        "en": "Readers inspect a consistent row-version snapshot while writers create new versions",
        "ar": "يقرأ كل استعلام لقطة متسقة من إصدارات الصفوف دون عرقلة إنشاء إصدارات جديدة"
      }
    },
    {
      "id": "mem",
      "text": {
        "en": "It discards historical row versions immediately and disables transaction rollbacks completely",
        "ar": "تحذف النسخ القديمة فوراً من القرص وتمنع التراجع (Rollback) عن أي معاملة مفتوحة"
      }
    },
    {
      "id": "nosql",
      "text": {
        "en": "It skips ACID Isolation completely",
        "ar": "تُلغي العزل تماماً"
      }
    }
  ],
  "correctAnswer": "snap",
  "explanation": {
    "en": "MVCC maintains multiple row versions stamped with transaction IDs so concurrent SELECT queries see an isolated snapshot without waiting on row write locks.",
    "ar": "يحتفظ محرك MVCC بنسخ متعددة للصفوف برقم المعاملة، فيقرأ القارئ نسخته المتسقة فوراً دون انتظار فك أقفال التعديل."
  },
  "tags": [
    "databases",
    "acid",
    "concurrency"
  ]
} as AssessmentQuestion
];
