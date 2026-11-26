import { AssessmentQuestion } from '@/lib/assessment/schema';

export const dns_questions: AssessmentQuestion[] = [
{
  "id": "NW-DNS-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "DNS",
  "specialization": "Purpose",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the primary purpose of the Domain Name System (DNS)?",
    "ar": "ما هو الغرض الأساسي من نظام أسماء النطاقات (DNS)؟"
  },
  "options": [
    {
      "id": "resolve",
      "text": {
        "en": "To translate human-readable domain names into IP addresses.",
        "ar": "ترجمة أسماء النطاقات المقروءة بشرياً إلى عناوين IP."
      }
    },
    {
      "id": "encrypt",
      "text": {
        "en": "To encrypt network traffic.",
        "ar": "تشفير حركة مرور الشبكة."
      }
    },
    {
      "id": "route",
      "text": {
        "en": "To route packets securely across the internet.",
        "ar": "توجيه الحزم بأمان عبر الإنترنت."
      }
    },
    {
      "id": "mac",
      "text": {
        "en": "To resolve IP addresses to MAC addresses.",
        "ar": "ترجمة عناوين IP إلى عناوين MAC."
      }
    }
  ],
  "correctAnswer": "resolve",
  "explanation": {
    "en": "DNS acts as the internet's directory by resolving human-friendly domain names (e.g., example.com) into numeric IPv4/IPv6 addresses.",
    "ar": "يعمل نظام DNS كدليل الإنترنت لترجمة أسماء النطاقات المفهومة للبشر إلى عناوين IP رقمية."
  }
} as AssessmentQuestion,
{
  "id": "PRE-WEB-E-002",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "DNS Resolution",
  "specialization": "Purpose",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which core Internet service resolves a human domain such as `api.learncs.org` into its numeric IP address?",
    "ar": "ما الخدمة الأساسية على الإنترنت التي تترجم اسم النطاق `api.learncs.org` إلى عنوان IP رقمي؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "SMTP (Simple Mail Transfer)",
        "ar": "بروتوكول البريد SMTP"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "CSSOM (Style Object Model)",
        "ar": "نموذج تنسيق الصفحات CSS"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "SQL Query Planner",
        "ar": "مخطط استعلامات SQL"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "DNS (Domain Name System)",
        "ar": "نظام أسماء النطاقات (DNS)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "DNS translates human hostnames to routable IPv4/IPv6 endpoints before browsers open TCP/TLS connections.",
    "ar": "يربط DNS أسماء المواقع بعناوين IP لتتمكن المتصفحات من بدء اتصال الشبكة."
  },
  "tags": [
    "dns",
    "web",
    "networking"
  ]
} as AssessmentQuestion,
{
  "id": "NW-APP-M-003",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "DNS Records",
  "specialization": "A vs CNAME vs TTL",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "You update a server IP behind `api.learncs.com`, yet some users still hit the old IP for 20 minutes. What DNS setting explains this delay?",
    "ar": "غيّرتَ عنوان IP لخادم `api.learncs.com`، ومع ذلك استمر بعض المستخدمين في الاتصال بالعنوان القديم لـ 20 دقيقة. ما السبب؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "HTTPS TLS server certificates reject numeric IP address changes permanently after issue",
        "ar": "شهادات TLS المشفرة ترفض تحديث عنوان IP الرقمي وتجمّد السجل القديم إلى الأبد"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "HTTP 301 responses overwrite local OS `hosts` resolution tables irreversibly on clients",
        "ar": "توجيه HTTP 301 يعيد كتابة ملفات النظام `hosts` لدى المتصفحين بشكل غير قابل للعكس"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Resolvers honor the old record's cached TTL until expiration",
        "ar": "الالتزام بمهلة ذاكرة DNS المؤقتة (**TTL**) حتى انتهائها"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "TCP checksums permanently store stale DNS addresses inside routers",
        "ar": "الموجهات تحفظها للأبد"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Lowering DNS TTL ahead of server migrations ensures resolvers refresh changed A/AAAA records rapidly instead of holding long stale caches.",
    "ar": "خفض قيمة TTL قبل الترحيل يسرّع التحديث العالمي عبر السماح بانقضاء النسخ المخبأة بسرعة."
  },
  "tags": [
    "dns",
    "ttl",
    "caching"
  ]
} as AssessmentQuestion
];
