import { AssessmentQuestion } from '@/lib/assessment/schema';

export const smtp_questions: AssessmentQuestion[] = [
{
  "id": "NW-SMTP-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "SMTP",
  "specialization": "Email Push Protocol",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which Application Layer protocol specifically handles sending/relaying outbound email between mail servers?",
    "ar": "ما البروتوكول المسؤول عن إرسال وتمرير رسائل البريد الإلكتروني الصادرة بين خوادم البريد؟"
  },
  "options": [
    {
      "id": "ftp",
      "text": {
        "en": "FTP",
        "ar": "FTP"
      }
    },
    {
      "id": "smtp",
      "text": {
        "en": "SMTP",
        "ar": "بروتوكول SMTP"
      }
    },
    {
      "id": "dhcp",
      "text": {
        "en": "DHCP",
        "ar": "DHCP"
      }
    },
    {
      "id": "arp",
      "text": {
        "en": "ARP",
        "ar": "ARP"
      }
    }
  ],
  "correctAnswer": "smtp",
  "explanation": {
    "en": "SMTP pushes/relays outgoing mail between MTAs, whereas IMAP/POP3 retrieve mail for client mailboxes.",
    "ar": "يتولى SMTP دفع وإرسال الرسائل بين الخوادم، بينما يُستخدم IMAP أو POP3 لقراءة البريد الوارد."
  },
  "tags": [
    "networking"
  ]
} as AssessmentQuestion,
{
  "id": "NW-APP-E-006",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "Protocols",
  "specialization": "Port Matching",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which standard application protocol encrypts remote server shell logins safely on port 22 instead of plaintext Telnet?",
    "ar": "أي بروتوكول قياسي يوفر اتصالاً مشفراً لسطر الأوامر بالخوادم البعيدة على المنفذ 22 بدلاً من Telnet المكشوف؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "HTTP/1.0",
        "ar": "HTTP/1.0"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "SSH",
        "ar": "SSH"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Plain FTP",
        "ar": "FTP غير المشفر"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "ICMP Ping",
        "ar": "ICMP Ping"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "SSH (port 22) encrypts commands, passwords, keys, and SFTP file transfers end-to-end.",
    "ar": "يشفر SSH جميع الأوامر والمفاتيح والملفات المرسلة للخادم عن بُعد."
  },
  "tags": [
    "ssh",
    "ports",
    "security"
  ]
} as AssessmentQuestion
];
