import { AssessmentQuestion } from '@/lib/assessment/schema';

export const round_robin_questions: AssessmentQuestion[] = [
{
  "id": "OS-SCHED-M-003",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "Round Robin",
  "specialization": "Algorithms",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which CPU scheduling algorithm gives each process an equal time slice in a circular order?",
    "ar": "أي Algorithm لجدولة الـ CPU (Scheduling) يعطي كل Process حصة زمنية متساوية (time slice) بترتيب دائري؟"
  },
  "options": [
    {
      "id": "rr",
      "text": {
        "en": "Round Robin",
        "ar": "Round Robin"
      }
    },
    {
      "id": "fcfs",
      "text": {
        "en": "First Come First Serve (FCFS)",
        "ar": "First Come First Serve (FCFS)"
      }
    },
    {
      "id": "sjf",
      "text": {
        "en": "Shortest Job First (SJF)",
        "ar": "Shortest Job First (SJF)"
      }
    },
    {
      "id": "priority",
      "text": {
        "en": "Priority Scheduling",
        "ar": "Priority Scheduling"
      }
    }
  ],
  "correctAnswer": "rr",
  "explanation": {
    "en": "Round Robin (RR) preemptively assigns each ready process a fixed time quantum in FIFO circular rotation, ensuring fair CPU sharing in time-sharing systems.",
    "ar": "يمنح Round Robin كل عملية جاهزة شريحة زمنية متساوية (time quantum) بالتناوب الدائري، مما يضمن عدالة الاستجابة."
  }
} as AssessmentQuestion
];
