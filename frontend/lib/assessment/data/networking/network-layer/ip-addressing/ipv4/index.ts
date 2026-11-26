import { AssessmentQuestion } from '@/lib/assessment/schema';

export const ipv4_questions: AssessmentQuestion[] = [
{
  "id": "NW-IP-M-002",
  "language": "both",
  "domain": "Networking",
  "topic": "Network Layer",
  "subtopic": "IP Addressing",
  "specialization": "IPv4 vs IPv6",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is the main reason for the transition from IPv4 to IPv6?",
    "ar": "ما هو السبب الرئيسي للانتقال من IPv4 إلى IPv6؟"
  },
  "options": [
    {
      "id": "speed",
      "text": {
        "en": "IPv6 packets travel faster on fiber optic cables.",
        "ar": "حزم IPv6 تنتقل بشكل أسرع عبر كابلات الألياف الضوئية."
      }
    },
    {
      "id": "security",
      "text": {
        "en": "IPv4 cannot be encrypted using IPSec.",
        "ar": "لا يمكن تشفير IPv4 باستخدام IPSec."
      }
    },
    {
      "id": "routing",
      "text": {
        "en": "IPv6 eliminates the need for routers.",
        "ar": "الـ IPv6 يلغي الحاجة إلى الـ routers."
      }
    },
    {
      "id": "exhaustion",
      "text": {
        "en": "IPv4 address space exhaustion.",
        "ar": "نفاد مساحة عناوين IPv4."
      }
    }
  ],
  "correctAnswer": "exhaustion",
  "explanation": {
    "en": "IPv4 uses 32-bit addresses (~4.3 billion total), which became exhausted globally; IPv6 expands addresses to 128 bits (~3.4 × 10^38 addresses).",
    "ar": "تستخدم عناوين IPv4 طول 32 بت فقط (~4.3 مليار عنوان) مما أدى لنفادها؛ فوسّع IPv6 العناوين إلى 128 بت."
  }
} as AssessmentQuestion
];
