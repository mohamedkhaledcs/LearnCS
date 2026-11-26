import { AssessmentQuestion } from '@/lib/assessment/schema';

export const files_and_directories_questions: AssessmentQuestion[] = [
{
  "id": "OS-FS-E-002",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "File Systems",
  "subtopic": "Files & Directories",
  "specialization": "Inodes",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In Unix-like Operating Systems, what data structure stores information about a file, such as permissions and ownership, but not its name or data?",
    "ar": "في أنظمة التشغيل الشبيهة بـ Unix، ما هي الـ Data Structure التي تخزن معلومات حول الملف، مثل الصلاحيات والملكية، ولكن ليس اسمه أو بياناته؟"
  },
  "options": [
    {
      "id": "superblock",
      "text": {
        "en": "Superblock",
        "ar": "Superblock"
      }
    },
    {
      "id": "inode",
      "text": {
        "en": "Inode",
        "ar": "Inode"
      }
    },
    {
      "id": "dentry",
      "text": {
        "en": "Directory Entry (dentry)",
        "ar": "Directory Entry (dentry)"
      }
    },
    {
      "id": "mbr",
      "text": {
        "en": "Master Boot Record (MBR)",
        "ar": "Master Boot Record (MBR)"
      }
    }
  ],
  "correctAnswer": "inode",
  "explanation": {
    "en": "An Inode (index node) tracks file metadata (size, permissions, owner, timestamps, data block pointers), while directory entries map filenames to inode numbers.",
    "ar": "يخزن الـ Inode البيانات الوصفية للملف (الصلاحيات، المالك، الحجم، مؤشرات الكتل)، بينما تربط مدخلات المجلد الاسم برقم الـ Inode."
  }
} as AssessmentQuestion,
{
  "id": "OS-VM-H-005",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "File Systems",
  "subtopic": "Inodes & Permissions",
  "specialization": "chmod Calculation",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "chmod 750 start-api.sh",
  "codeLanguage": "bash",
  "question": {
    "en": "What exact Linux permission triad does `chmod 750 start-api.sh` assign (`Owner | Group | Others`)?",
    "ar": "ما مصفوفة الصلاحيات الدقيقة التي يطبقها الأمر `chmod 750 start-api.sh` في أنظمة Unix/Linux؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "`rw-r--r--` (Owner read/write; everyone else read-only)",
        "ar": "`rw-r--r--`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "`rwxrwxrwx` (Full unrestricted access for all users)",
        "ar": "`rwxrwxrwx`"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`rwxr-x---`",
        "ar": "`rwxr-x---`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "`r-xr-x---` (Read/exec for owner and group, no write anywhere)",
        "ar": "`r-xr-x---`"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`7 = 4+2+1 (rwx)`, `5 = 4+1 (r-x)`, `0 = (---)`.",
    "ar": "`7` تعني `rwx` و`5` تعني `r-x` و`0` تمنع الآخرين تماماً."
  },
  "tags": [
    "chmod",
    "linux",
    "file-systems"
  ]
} as AssessmentQuestion,
{
  "id": "OS-VM-E-006",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "File Systems",
  "subtopic": "Inodes",
  "specialization": "Hard vs Symbolic Link",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In Unix filesystems, what metadata structure stores a file's size, owner, permissions, and disk block pointers (separately from filename strings)?",
    "ar": "في أنظمة ملفات Unix/Linux، ما بنية البيانات التي تحفظ حجم الملف ومالكه وصلاحياته ومؤشرات كتل القرص (بمعزل عن اسم الملف)؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "TLB Cache Line",
        "ar": "مخبأ TLB"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "TCP Socket Buffer",
        "ar": "مخزن TCP"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Process Program Counter",
        "ar": "عداد البرنامج PC"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Inode (Index Node)",
        "ar": "العقدة الفهرسية (Inode)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Directories map readable filenames cleanly to Inode numbers, while Inodes own actual file permissions and disk block addresses.",
    "ar": "المجلدات تربط اسم الملف برقم الـ Inode، بينما يحفظ الـ Inode كل خصائص الملف ومواقع بياناته على القرص."
  },
  "tags": [
    "inode",
    "file-systems",
    "linux"
  ]
} as AssessmentQuestion
];
