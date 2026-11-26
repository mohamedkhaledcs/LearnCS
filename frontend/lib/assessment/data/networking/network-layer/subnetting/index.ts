import { AssessmentQuestion } from '@/lib/assessment/schema';

export const subnetting_questions: AssessmentQuestion[] = [
{
  "id": "NW-SUB-M-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Network Layer",
  "subtopic": "Subnetting (CIDR)",
  "specialization": "Usable Host Calculation",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How many usable host IPv4 addresses exist in a `/26` subnet (such as `192.168.1.0/26`)?",
    "ar": "كم عنوان جهاز (Usable Host) صالح للاستخدام في شبكة فرعية بمقاس `/26` (مثل `192.168.1.0/26`)؟"
  },
  "options": [
    {
      "id": "64",
      "text": {
        "en": "64 usable hosts",
        "ar": "64 عنواناً"
      }
    },
    {
      "id": "62",
      "text": {
        "en": "62 usable hosts",
        "ar": "62 عنواناً"
      }
    },
    {
      "id": "254",
      "text": {
        "en": "254 usable hosts",
        "ar": "254 عنواناً"
      }
    },
    {
      "id": "30",
      "text": {
        "en": "30 usable hosts",
        "ar": "30 عنواناً"
      }
    }
  ],
  "correctAnswer": "62",
  "explanation": {
    "en": "In a /26 prefix, 6 host bits yield 64 total addresses; subtracting the all-0s Network ID and all-1s Broadcast address leaves 62 hosts.",
    "ar": "الـ /26 تترك 6 بتات للأجهزة (64 عنواناً)، وبخصم أول عنوان (للشبكة) وآخر عنوان (للبث) يتبقى 62 عنواناً متاحاً."
  },
  "tags": [
    "networking"
  ]
} as AssessmentQuestion,
{
  "id": "NW-PRT-M-003",
  "language": "both",
  "domain": "Networking",
  "topic": "Network Layer",
  "subtopic": "Subnetting",
  "specialization": "CIDR Range Match",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Under subnet mask `255.255.255.0` (`/24`), can IP `192.168.10.45` reach `192.168.11.20` directly at Layer 2 WITHOUT passing through a Default Gateway Router?",
    "ar": "بقناع الشبكة `/24` (`255.255.255.0`)، هل يصل الجهاز `192.168.10.45` مباشرة إلى `192.168.11.20` دون المرور بموجّه (Router / Default Gateway)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Yes: both devices share prefix `192.168` inside one unified `/24` Ethernet broadcast subnet",
        "ar": "نعم: يشترك الجهازان في البادئة `192.168` مما يضعهما معاً في نطاق `/24` المحلي نفسه"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "No: 3rd octet differs (`10` vs `11`), so they sit in distinct `/24` subnets",
        "ar": "لا: اختلاف الخانة الثالثة (`10` عن `11`) يضعهما في شبكتين فرعيتين تحت `/24`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Yes: UDP socket discovery resolves remote subnet hosts automatically whenever DNS runs",
        "ar": "نعم بمجرد استخدام منافذ UDP أو مطابقة المنفذ 80 مع خادم DNS المحلي تلقائياً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Yes once DNS resolves localhost back automatically",
        "ar": "نعم عبر DNS المحلي"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`/24` locks the first three octets (`192.168.10` != `192.168.11`), requiring Layer-3 routing across subnet gateways.",
    "ar": "القناع `/24` يطابق البايتات الثلاثة الأولى؛ وعند اختلافها تُرسل الحزمة إلى Default Gateway."
  },
  "tags": [
    "subnetting",
    "cidr",
    "routing"
  ]
} as AssessmentQuestion
];
