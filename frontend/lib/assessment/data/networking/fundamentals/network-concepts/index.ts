import { AssessmentQuestion } from '@/lib/assessment/schema';

export const network_concepts_questions: AssessmentQuestion[] = [
{
  "id": "NW-CONC-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Fundamentals",
  "subtopic": "Client-Server & URLs",
  "specialization": "Web Architecture",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In the Client-Server model over the internet, what happens when you enter `https://learncs.dev/roadmap` into a web browser?",
    "ar": "في نموذج العميل والخادم (Client-Server) عبر الإنترنت، ماذا يحدث عند إدخال رابط مثل `https://learncs.dev/roadmap` في المتصفح؟"
  },
  "options": [
    {
      "id": "all",
      "text": {
        "en": "Every public website on the internet sits pre-compiled inside the local browser installer",
        "ar": "جميع مواقع الإنترنت العامة مخزنة محلياً مسبقاً داخل ملفات المتصفح المثبّتة على قرصك"
      }
    },
    {
      "id": "mac",
      "text": {
        "en": "The browser emails your router's local hard drive directly without resolving remote domains",
        "ar": "يتواصل المتصفح مع القرص الصلب للراوتر مباشرة عبر البريد ولا يستخدم عناوين IP أو خوادم"
      }
    },
    {
      "id": "req",
      "text": {
        "en": "Client resolves DNS, opens TCP/TLS, and sends HTTP to fetch server content",
        "ar": "يترجم المتصفح العنوان عبر DNS ويفتح اتصال TCP/TLS ثم يطلب الصفحة عبر HTTP"
      }
    },
    {
      "id": "noip",
      "text": {
        "en": "No IP address or server is involved",
        "ar": "لا يستخدم عنوان IP"
      }
    }
  ],
  "correctAnswer": "req",
  "explanation": {
    "en": "Browsers act as clients requesting pages/APIs across the internet via DNS + TCP/IP + TLS + HTTP.",
    "ar": "يتكامل DNS و TCP/IP و TLS و HTTP لجلب الموارد من الخادم وعرضها في المتصفح."
  },
  "tags": [
    "networking",
    "http",
    "dns",
    "web"
  ]
} as AssessmentQuestion
];
