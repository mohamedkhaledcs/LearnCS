import { AssessmentQuestion } from '@/lib/assessment/schema';

export const topologies_questions: AssessmentQuestion[] = [
{
  "id": "NW-TOP-E-001",
  "language": "both",
  "domain": "Networking",
  "topic": "Fundamentals",
  "subtopic": "Network Topologies",
  "specialization": "Star vs Mesh",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which physical/logical topology isolates cable faults best per end-device in modern Ethernet LANs, though its central switch is a shared focal point?",
    "ar": "أي طوبولوجيا شبكية (Topology) تعزل أعطال الكابلات الفردية في شبكات LAN الحديثة بفضل وصل الأجهزة بمحوّل مركزي (Switch)؟"
  },
  "options": [
    {
      "id": "bus",
      "text": {
        "en": "Single Coaxial Bus Topology",
        "ar": "الناقل Bus"
      }
    },
    {
      "id": "ring",
      "text": {
        "en": "Unidirectional Token Ring",
        "ar": "الحلقة Ring"
      }
    },
    {
      "id": "simplex",
      "text": {
        "en": "Point-to-Point disconnected links",
        "ar": "روابط منفصلة"
      }
    },
    {
      "id": "star",
      "text": {
        "en": "Star Topology",
        "ar": "طوبولوجيا النجمة"
      }
    }
  ],
  "correctAnswer": "star",
  "explanation": {
    "en": "In a Star topology, a severed cable affects only that single host rather than taking down a shared Bus or Ring.",
    "ar": "في طوبولوجيا النجمة، قطع سلك جهاز واحد لا يعطل باقي أجهزة الشبكة بعكس Bus."
  },
  "tags": [
    "networking"
  ]
} as AssessmentQuestion
];
