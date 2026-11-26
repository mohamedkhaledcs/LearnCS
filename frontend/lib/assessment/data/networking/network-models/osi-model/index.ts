import { AssessmentQuestion } from '@/lib/assessment/schema';

export const osi_model_questions: AssessmentQuestion[] = [
{
  "id": "NW-OSI-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Fundamentals",
  "subtopic": "OSI Model",
  "specialization": "Layers",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which layer of the OSI model is responsible for routing packets between different networks?",
    "ar": "أي طبقة من طبقات نموذج OSI مسؤولة عن توجيه الحزم (routing packets) بين الشبكات المختلفة؟"
  },
  "options": [
    {
      "id": "network",
      "text": {
        "en": "Network Layer",
        "ar": "طبقة الشبكة (Network Layer)"
      }
    },
    {
      "id": "physical",
      "text": {
        "en": "Physical Layer",
        "ar": "الطبقة الفيزيائية (Physical Layer)"
      }
    },
    {
      "id": "datalink",
      "text": {
        "en": "Data Link Layer",
        "ar": "طبقة ربط البيانات (Data Link Layer)"
      }
    },
    {
      "id": "transport",
      "text": {
        "en": "Transport Layer",
        "ar": "طبقة النقل (Transport Layer)"
      }
    }
  ],
  "correctAnswer": "network",
  "explanation": {
    "en": "The OSI Network Layer (Layer 3) manages logical addressing (IP) and routes packets across interconnected networks from source to destination.",
    "ar": "طبقة الشبكة (Layer 3 - Network Layer) مسؤولة عن العنونة المنطقية IP وتوجيه الحزم بين الشبكات المختلفة."
  }
} as AssessmentQuestion,
{
  "id": "NW-PRT-M-004",
  "language": "both",
  "domain": "Networking",
  "topic": "OSI & TCP/IP",
  "subtopic": "Layer Responsibilities",
  "specialization": "MAC vs IP",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "As an HTTP packet travels across 8 Internet routers from Cairo to Frankfurt, how do its **IP Header** vs **MAC Header** change per hop?",
    "ar": "عند انتقال حزمة عبر 8 موجهات (Routers) من القاهرة إلى فرانكفورت، كيف يتغير عنوان **IP** مقارنةً بعنوان **MAC** في كل قفزة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Hardware MAC stays constant end-to-end while routers overwrite destination IP each hop",
        "ar": "يبقى عنوان MAC ثابتاً طوال الرحلة عبر القارات بينما تعيد الموجهات كتابة IP الوجهة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Both IP and MAC addresses remain strictly constant from Cairo to Frankfurt untouched",
        "ar": "يبقى كل من عنواني IP وMAC ثابتين بلا أي تغيير عبر جميع القفزات والمحولات الثمانية"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "IPs stay end-to-end constant (modulo NAT); MACs swap per link hop",
        "ar": "يثبت عنوانا IP من البداية للنهاية (عدا NAT)، ويتبدل MAC في كل وصلة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Application ports swap positions dynamically inside OSI Physical voltages",
        "ar": "تبدّل المنافذ في الطبقة الفيزيائية"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "IP routes globally end-to-end across networks, while Layer-2 Ethernet MACs move each frame strictly across the next immediate wire/hop.",
    "ar": "عناوين IP تحدد الوجهة النهائية عبر الشبكات، بينما ينقل MAC الإطار من قفزة سلكية/لاسلكية للقفزة التالية فقط."
  },
  "tags": [
    "osi-model",
    "ip-vs-mac",
    "routing"
  ]
} as AssessmentQuestion
];
