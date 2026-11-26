import { AssessmentQuestion } from '@/lib/assessment/schema';

export const mac_addressing_questions: AssessmentQuestion[] = [
{
  "id": "NW-MAC-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Data Link Layer",
  "subtopic": "MAC & ARP",
  "specialization": "L2 vs L3 Addressing",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which protocol translates a local subnet's IPv4 address (Layer 3) into a hardware Ethernet MAC address (Layer 2)?",
    "ar": "ما البروتوكول الذي يترجم عنوان IPv4 محلياً (طبقة 3) إلى عنوان MAC الفيزيائي لكرت الشبكة (طبقة 2)؟"
  },
  "options": [
    {
      "id": "dns",
      "text": {
        "en": "DNS",
        "ar": "DNS"
      }
    },
    {
      "id": "smtp",
      "text": {
        "en": "SMTP",
        "ar": "SMTP"
      }
    },
    {
      "id": "http",
      "text": {
        "en": "HTTP",
        "ar": "HTTP"
      }
    },
    {
      "id": "arp",
      "text": {
        "en": "ARP (Address Resolution)",
        "ar": "بروتوكول ARP لحل العناوين"
      }
    }
  ],
  "correctAnswer": "arp",
  "explanation": {
    "en": "While DNS maps domain names -> IP addresses across the internet, ARP broadcasts locally within a LAN to map IP -> 48-bit MAC address.",
    "ar": "بينما يربط DNS الاسم بـ IP، يستعلم ARP في الشبكة المحلية لمعرفة عنوان MAC المقابل لـ IP."
  },
  "tags": [
    "networking",
    "osi"
  ]
} as AssessmentQuestion
];
