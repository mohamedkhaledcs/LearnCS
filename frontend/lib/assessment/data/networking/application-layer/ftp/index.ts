import { AssessmentQuestion } from '@/lib/assessment/schema';

export const ftp_questions: AssessmentQuestion[] = [
{
  "id": "NW-FTP-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "FTP vs SFTP",
  "specialization": "Security Comparison",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why should SFTP (over SSH) or FTPS replace plain FTP in modern production systems?",
    "ar": "لماذا يجب استخدام SFTP (فوق SSH) أو FTPS بدلاً من FTP التقليدي في بيئات الإنتاج؟"
  },
  "options": [
    {
      "id": "udp",
      "text": {
        "en": "Legacy FTP cannot transfer compiled binary executables without text line distortion",
        "ar": "بروتوكول FTP التقليدي لا يدعم نقل الملفات الثنائية والصور بل يقتصر على النصوص فقط"
      }
    },
    {
      "id": "port",
      "text": {
        "en": "Standard FTP servers do not operate over reliable connection-oriented TCP transport",
        "ar": "لا يستخدم TCP"
      }
    },
    {
      "id": "plain",
      "text": {
        "en": "Plain FTP transmits credentials and file bytes as unencrypted cleartext",
        "ar": "يرسل FTP بيانات الدخول والملفات نصاً مكشوفاً، بينما يشفرها SFTP عبر SSH"
      }
    },
    {
      "id": "mac",
      "text": {
        "en": "SFTP bypasses DNS",
        "ar": "يتجاوز SFTP نظام أسماء النطاقات DNS كلياً ويستخدم عناوين MAC عبر الإنترنت"
      }
    }
  ],
  "correctAnswer": "plain",
  "explanation": {
    "en": "Plain FTP exposes usernames, passwords, and file contents to network sniffing; SFTP encrypts all traffic over a single port (TCP 22).",
    "ar": "البيانات عبر FTP مكشوفة تماماً لأي تنصت على الشبكة، بعكس SFTP المشفر بالكامل."
  },
  "tags": [
    "networking"
  ]
} as AssessmentQuestion
];
