import { AssessmentQuestion } from '@/lib/assessment/schema';

export const http_questions: AssessmentQuestion[] = [
{
  "id": "NW-HTTP-H-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Application Layer",
  "subtopic": "HTTP",
  "specialization": "Status Codes",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "If a client sends an HTTP request and the server responds with a 403 status code, what does this indicate?",
    "ar": "إذا أرسل العميل (client) طلب HTTP واستجاب السيرفر برمز 403، ماذا يعني ذلك؟"
  },
  "options": [
    {
      "id": "not_found",
      "text": {
        "en": "The requested resource does not exist.",
        "ar": "المورد المطلوب غير موجود."
      }
    },
    {
      "id": "server_error",
      "text": {
        "en": "The server encountered an internal error.",
        "ar": "واجه السيرفر خطأ داخلياً."
      }
    },
    {
      "id": "forbidden",
      "text": {
        "en": "The client does not have permission to access the resource.",
        "ar": "العميل ليس لديه صلاحية الوصول للمورد (Forbidden)."
      }
    },
    {
      "id": "unauth",
      "text": {
        "en": "The client needs to authenticate (login) first.",
        "ar": "يحتاج العميل إلى تسجيل الدخول أولاً (Unauthorized)."
      }
    }
  ],
  "correctAnswer": "forbidden",
  "explanation": {
    "en": "HTTP 403 Forbidden means the server understands the request and knows who (or whether) the client is, but refuses authorization; 401 specifically requests authentication.",
    "ar": "يعني رمز 403 Forbidden أن الخادم فهم الطلب لكنه يرفض منح الصلاحية للوصول، أما 401 فيطلب المصادقة أولاً."
  }
} as AssessmentQuestion
];
