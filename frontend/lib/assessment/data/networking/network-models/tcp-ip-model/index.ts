import { AssessmentQuestion } from '@/lib/assessment/schema';

export const tcp_ip_model_questions: AssessmentQuestion[] = [
{
  "id": "NW-TCPIP-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Network Models",
  "subtopic": "TCP/IP Model",
  "specialization": "4-Layer Encapsulation",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What are the 4 layers of the practical TCP/IP (Internet) architecture from top to bottom?",
    "ar": "ما هي الطبقات الأربع لنموذج TCP/IP العملي للإنترنت من الأعلى إلى الأسفل؟"
  },
  "options": [
    {
      "id": "seven",
      "text": {
        "en": "Physical Layer -> Presentation Layer -> DNS Resolver -> SQL Storage",
        "ar": "الطبقة الفيزيائية -> طبقة العرض التقديمي -> خادم DNS -> طبقة قاعدة البيانات"
      }
    },
    {
      "id": "four",
      "text": {
        "en": "Application -> Transport -> Internet -> Network Access",
        "ar": "التطبيقات -> النقل -> الإنترنت -> الوصول للشبكة"
      }
    },
    {
      "id": "two",
      "text": {
        "en": "Browser -> CPU",
        "ar": "متصفح -> معالج"
      }
    },
    {
      "id": "rev",
      "text": {
        "en": "Network Link Layer -> Transport Layer -> Application Layer -> Internet Layer",
        "ar": "طبقة الوصول للشبكة -> طبقة النقل -> طبقة التطبيقات -> طبقة الإنترنت"
      }
    }
  ],
  "correctAnswer": "four",
  "explanation": {
    "en": "TCP/IP condenses OSI's top 3 layers into Application and bottom 2 into Network Access, centering on IP (Internet) and TCP/UDP (Transport).",
    "ar": "يدمج TCP/IP طبقات التفاعل العليا في طبقة التطبيقات، والربط الفيزيائي في طبقة الوصول للشبكة."
  },
  "tags": [
    "networking",
    "osi"
  ]
} as AssessmentQuestion
];
