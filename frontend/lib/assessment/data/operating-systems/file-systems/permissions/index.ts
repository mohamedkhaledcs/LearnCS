import { AssessmentQuestion } from '@/lib/assessment/schema';

export const permissions_questions: AssessmentQuestion[] = [
{
  "id": "OS-PERM-E-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "File Systems",
  "subtopic": "Permissions",
  "specialization": "Unix chmod Bits",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In Unix/Linux file permissions, what access does `chmod 750 script.sh` grant?",
    "ar": "في صلاحيات أنظمة Unix/Linux، ماذا يمنح الأمر `chmod 750 script.sh`؟"
  },
  "options": [
    {
      "id": "all",
      "text": {
        "en": "Grants every logged-in local system user full read, write, and execute permissions",
        "ar": "يمنح كل مستخدم على الخادم كامل صلاحيات القراءة والتعديل والتشغيل بدون استثناء"
      }
    },
    {
      "id": "owner0",
      "text": {
        "en": "Restricts the file owner solely to read-only inspection while blocking script runs",
        "ar": "يقتصر دور المالك على القراءة فقط مع منعه من تعديل السكربت أو تشغيله كلياً"
      }
    },
    {
      "id": "750",
      "text": {
        "en": "Owner: rwx (7), Group: r-x (5), Others: none (0)",
        "ar": "المالك rwx (7)، المجموعة r-x (5)، والآخرون ممنوع (0)"
      }
    },
    {
      "id": "oct",
      "text": {
        "en": "Allows network port 750 access",
        "ar": "يفتح المنفذ 750"
      }
    }
  ],
  "correctAnswer": "750",
  "explanation": {
    "en": "Octal permission bits encode r=4, w=2, x=1 across (Owner, Group, Others). 7=rwx, 5=r-x, 0=---.",
    "ar": "القيمة الثمانية تجمع (القراءة=4، الكتابة=2، التنفيذ=1) لكل من المالك والمجموعة والبقية."
  },
  "tags": [
    "os",
    "file-systems"
  ]
} as AssessmentQuestion
];
