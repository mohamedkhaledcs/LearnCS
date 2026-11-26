import { AssessmentQuestion } from '@/lib/assessment/schema';

export const ipv6_questions: AssessmentQuestion[] = [
{
  "id": "NW-IPV6-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Network Layer",
  "subtopic": "IPv6",
  "specialization": "128-bit Notation",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the bit length of an IPv6 address and in what notation is it commonly written?",
    "ar": "كم يبلغ طول عنوان IPv6 بالبتات وبأي نظام عددي يُكتب؟"
  },
  "options": [
    {
      "id": "128",
      "text": {
        "en": "128 bits written as eight colon-separated 16-bit hex groups",
        "ar": "128 بت في 8 مجموعات ست عشرية مفصولة بنقطتين رأسيتين"
      }
    },
    {
      "id": "32",
      "text": {
        "en": "32 bits written cleanly as four dot-separated decimal octets from 0 to 255",
        "ar": "32 بت مكتوبة في أربع خانات عشرية مفصولة بنقاط كما في عناوين الشبكات المحلية"
      }
    },
    {
      "id": "64",
      "text": {
        "en": "64 bits written in octal",
        "ar": "64 بت تُكتب بالنظام الثماني لتعريف كل من عنوان الشبكة وعنوان المضيف بالتساوي"
      }
    },
    {
      "id": "48",
      "text": {
        "en": "48 bits written as six hyphen-separated manufacturer hardware bytes",
        "ar": "48 بت"
      }
    }
  ],
  "correctAnswer": "128",
  "explanation": {
    "en": "IPv6 quadruples IPv4's 32-bit length to 128 bits (`::1` is localhost loopback), simplifying headers and removing NAT scarcity.",
    "ar": "يوفر 128 بت تريليونات من العناوين لكل شبكة مع تبسيط ترويسة التوجيه مقارنة بـ IPv4 ذي الـ 32 بت."
  },
  "tags": [
    "networking"
  ]
} as AssessmentQuestion
];
