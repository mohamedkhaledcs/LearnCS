import { AssessmentQuestion } from '@/lib/assessment/schema';

export const ethernet_questions: AssessmentQuestion[] = [
{
  "id": "NW-ETH-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Data Link Layer",
  "subtopic": "Ethernet Frames",
  "specialization": "Error Detection FCS",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does an Ethernet switch/NIC detect physical-wire bit corruption inside an incoming Data Link Frame?",
    "ar": "كيف يكتشف كرت الشبكة أو الـ Switch وجود أخطاء في البتات داخل إطار Ethernet المستقبَل؟"
  },
  "options": [
    {
      "id": "crc",
      "text": {
        "en": "Verifies the FCS trailer via a CRC-32 error-detection checksum",
        "ar": "يفحص تذييل FCS في نهاية الإطار عبر خوارزمية CRC-32"
      }
    },
    {
      "id": "tls",
      "text": {
        "en": "Decrypts incoming asymmetric TLS server certificates inside physical copper wiring",
        "ar": "يفك تشفير شهادات TLS غير المتماثلة للتحقق من سلامة كل بايت على الأسلاك النحاسية"
      }
    },
    {
      "id": "dns",
      "text": {
        "en": "Queries root DNS servers immediately before forwarding every Ethernet frame outward",
        "ar": "يستعلم من خوادم DNS الجذرية عند كل إطار Ethernet للتأكد من عدم تلف العنوان"
      }
    },
    {
      "id": "ping",
      "text": {
        "en": "Sends an HTTP 200 OK back",
        "ar": "إرجاع HTTP 200"
      }
    }
  ],
  "correctAnswer": "crc",
  "explanation": {
    "en": "Ethernet appends a 4-byte CRC checksum (FCS); corrupted frames fail CRC verification and are silently dropped at Layer 2.",
    "ar": "يتضمن إطار الإيثرنت خوارزمية CRC في الذيل لكشف التشويش الكهربائي وإسقاط الإطارات التالفة."
  },
  "tags": [
    "networking"
  ]
} as AssessmentQuestion
];
