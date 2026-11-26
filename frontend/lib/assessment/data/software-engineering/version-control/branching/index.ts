import { AssessmentQuestion } from '@/lib/assessment/schema';

export const branching_questions: AssessmentQuestion[] = [
{
  "id": "SE-BR-M-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Version Control",
  "subtopic": "Branching & Merging",
  "specialization": "Merge vs Rebase",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why should you NEVER `git rebase` (and force-push) a shared public branch like `main` that teammates are actively basing work on?",
    "ar": "لماذا يُمنع تنفيذ `git rebase` مع دفع قسري (force-push) على فرع عام مشترك مثل `main` يعتمد عليه زملاؤك؟"
  },
  "options": [
    {
      "id": "rew",
      "text": {
        "en": "Rewriting commit hashes causes diverging histories and conflicts for teammates",
        "ar": "تغيير معرّفات الالتزامات يخلق تشعباً وتعارضات قاسية لبقية الفريق"
      }
    },
    {
      "id": "del",
      "text": {
        "en": "Executing `git rebase` permanently erases `.gitignore` and deletes untracked build configs",
        "ar": "أمر `git rebase` يمسح ملف `.gitignore` ويحذف جميع إعدادات البناء غير المتعقبة نهائياً"
      }
    },
    {
      "id": "slow",
      "text": {
        "en": "`git rebase` recompresses every tracked PNG asset across all remote branches slowly",
        "ar": "يعيد `git rebase` ضغط جميع الصور والملفات الثنائية في الخادم البعيد ببطء شديد"
      }
    },
    {
      "id": "comp",
      "text": {
        "en": "Git forbids committing inside feature branches",
        "ar": "يمنع التعديل في الفروع"
      }
    }
  ],
  "correctAnswer": "rew",
  "explanation": {
    "en": "Rebasing local unpushed feature branches onto latest `main` keeps history clean, whereas rewriting shared published commits breaks teammates' commit graphs.",
    "ar": "التزم بالقاعدة الذهبية: لا تُعد كتابة تاريخ فروع قد سحبها غيرك؛ استخدم merge للفروع المشتركة و rebase فقط لفروعك المحلية."
  },
  "tags": [
    "git",
    "version-control"
  ]
} as AssessmentQuestion,
{
  "id": "SE-TST-M-004",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Version Control",
  "subtopic": "Git Branching",
  "specialization": "Feature Branches",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why should teams develop bugfixes and features on short-lived **feature branches** instead of pushing broken WIP commits directly onto `main`?",
    "ar": "لماذا يطوّر الفريق الميزات والإصلاحات على **فروع مستقلة** بدلاً من رفع تجارب غير مكتملة مباشرة على الفرع الرئيسي `main`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Git drops source comments unless committed first onto remote feature branches cleanly",
        "ar": "لأن نظام Git يحذف التعليقات التوضيحية إذا لم تكتب داخل فرع جانبي قبل الدفع"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Keeps `main` buildable while enabling code review and CI before merge",
        "ar": "للحفاظ على استقرار `main` وإتاحة المراجعة واختبارات CI قبل الدمج"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Feature branches automatically double PostgreSQL storage quotas on local developer machines",
        "ar": "لأن الفروع المخصصة للميزات تضاعف سعة قاعدة البيانات وتحظر ملفات TypeScript في main"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Main branches strictly forbid committing TypeScript files cleanly",
        "ar": "main يرفض ملفات TS"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Isolated branches prevent broken incomplete edits from blocking teammates cleanly.",
    "ar": "عزل العمل يحمي بقية الفريق من تعطّل البيئة المشتركة ويضمن مرور كل تغيير بفحص الجودة."
  },
  "tags": [
    "git",
    "branching",
    "workflow"
  ]
} as AssessmentQuestion
];
