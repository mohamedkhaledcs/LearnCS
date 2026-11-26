import { AssessmentQuestion } from '@/lib/assessment/schema';

export const ports_questions: AssessmentQuestion[] = [
{
  "id": "NW-PORT-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Transport Layer",
  "subtopic": "Ports & Multiplexing",
  "specialization": "Well-Known Ports",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What role do Transport Layer Port Numbers (e.g., 80 HTTP, 443 HTTPS, 5432 PostgreSQL) play on a host with one IP address?",
    "ar": "ما وظيفة أرقام المنافذ (Ports مثل 80 لـ HTTP و 443 لـ HTTPS و 5432 لـ PostgreSQL) على جهاز يملك عنوان IP واحد؟"
  },
  "options": [
    {
      "id": "mac",
      "text": {
        "en": "Ports replace hardware Ethernet MAC addresses inside wireless routers across local subnets",
        "ar": "تستبدل أرقام المنافذ عناوين MAC الفيزيائية الخاصة ببطاقات الشبكة داخل الموجهات المنزلية"
      }
    },
    {
      "id": "mux",
      "text": {
        "en": "Routes incoming transport segments to the matching listening socket/process",
        "ar": "توجيه الحزم المستلمة إلى العملية أو المقبس (Socket) المستمع المحدد"
      }
    },
    {
      "id": "dns",
      "text": {
        "en": "Port numbers translate human website domains directly into 128-bit IPv6 network prefixes",
        "ar": "تُستخدم المنافذ لترجمة أسماء النطاقات النصية مباشرة إلى عناوين IPv6 داخل المتصفح"
      }
    },
    {
      "id": "comp",
      "text": {
        "en": "Compressing HTML files",
        "ar": "ضغط الملفات"
      }
    }
  ],
  "correctAnswer": "mux",
  "explanation": {
    "en": "IP identifies the host machine, while a 16-bit Port Number (0-65535) identifies the specific application endpoint on that host.",
    "ar": "يحدد عنوان IP الجهاز، بينما يحدد المنفذ (Port) البرنامج المستهدف داخل هذا الجهاز."
  },
  "tags": [
    "networking",
    "http",
    "dns"
  ]
} as AssessmentQuestion
];
