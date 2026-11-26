import { AssessmentQuestion } from '@/lib/assessment/schema';

export const system_calls_questions: AssessmentQuestion[] = [
{
  "id": "OS-SYSC-E-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Fundamentals",
  "subtopic": "System Calls",
  "specialization": "Trap Transition",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does an application running in User Mode request a privileged OS service like opening a file or allocating memory?",
    "ar": "كيف يطلب برنامج يعمل في وضع المستخدم (User Mode) خدمة مميزة من النظام مثل فتح ملف أو إرسال حزمة شبكة؟"
  },
  "options": [
    {
      "id": "ptr",
      "text": {
        "en": "By reading physical hardware RAM address 0x00 directly using raw application pointers",
        "ar": "عن طريق قراءة عنوان الذاكرة الفيزيائية الصفرية مباشرة بمؤشر عادي داخل التطبيق"
      }
    },
    {
      "id": "http",
      "text": {
        "en": "By sending an external HTTP POST payload over local DNS loopback ports to the BIOS",
        "ar": "بإرسال طلب HTTP محلي عبر منفذ DNS لتنفيذ أوامر الأقراص الصلبة والشبكة مباشرة"
      }
    },
    {
      "id": "sys",
      "text": {
        "en": "By invoking a System Call trap transitioning cleanly into Kernel Mode",
        "ar": "عبر استدعاء نظام (System Call) ينفذ Trap آمن للانتقال إلى Kernel Mode"
      }
    },
    {
      "id": "css",
      "text": {
        "en": "Editing environment variables",
        "ar": "تعديل متغيرات البيئة"
      }
    }
  ],
  "correctAnswer": "sys",
  "explanation": {
    "en": "System calls provide the controlled API boundary between User Space and the OS Kernel.",
    "ar": "تمثل System Calls البوابة الشرعية الآمنة بين تطبيقات المستخدم ونواة نظام التشغيل."
  },
  "tags": [
    "os",
    "processes"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-BUS-H-005",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "OS Role",
  "subtopic": "Buffered I/O",
  "specialization": "Syscall Overhead",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Writing 1 MB cleanly in one 1-MB buffer takes milliseconds while making 1,000,000 1-byte unbuffered writes stalls badly. Why?",
    "ar": "كتابة ميجابايت واحدة دفعةً واحدة تستغرق أجزاءً من الثانية بينما تكلف مليون عملية كتابة منفردة بحجم بايت واحد وقتاً طويلاً. لماذا؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "One million tiny unbuffered calls trigger 1,000,000 costly User->Kernel traps",
        "ar": "تدفع المليون كتابة مليون انتقال مكلف (System Call) بين المستخدم والنواة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Modern disk controllers reject single-byte writes unless aligned strictly to odd addresses",
        "ar": "يرفض متحكم القرص الصلب كتابة بايت مفرد ما لم يتوافق مع عناوين الذاكرة الفردية دائماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Operating system compilers translate single-byte loops automatically into network sockets",
        "ar": "تُقفل خلايا ذاكرة L2 بالكامل مع كل كتابة بايت ويحولها المترجم لاتصال شبكي بطيء"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "RAM cells lock every adjacent L2 cache page whenever a single byte writes twice",
        "ar": "لأن الذاكرة تقفل كامل L2 Cache عند كل كتابة بايت"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Each unbuffered `write()` triggers a trap into the kernel; batching data in a user-space buffer cuts syscall count by orders of magnitude.",
    "ar": "تجميع الكتابة في ذاكرة مؤقتة يقلل عدد استدعاءات النظام ومقاطعات القرص بآلاف المرات."
  },
  "tags": [
    "os",
    "performance",
    "io"
  ]
} as AssessmentQuestion
];
