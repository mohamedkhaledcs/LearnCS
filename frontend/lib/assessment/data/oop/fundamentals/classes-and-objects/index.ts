import { AssessmentQuestion } from '@/lib/assessment/schema';

export const classes_and_objects_questions: AssessmentQuestion[] = [
{
  "id": "OOP-CLS-E-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Fundamentals",
  "subtopic": "Classes & Objects",
  "specialization": "Blueprint vs Instance",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does a Class relate to an Object in Object-Oriented Programming?",
    "ar": "ما هي العلاقة بين الفئة (Class) والكائن (Object) في البرمجة كائنية التوجه؟"
  },
  "options": [
    {
      "id": "same",
      "text": {
        "en": "They are interchangeable aliases referring strictly to global static variables",
        "ar": "كلاهما مصطلحان مترادفان يدلان على متغير عام ثابت وحيد في الذاكرة"
      }
    },
    {
      "id": "heap",
      "text": {
        "en": "Declaring a Class permanently reserves Heap RAM objects even with zero instantiations",
        "ar": "تعريف الفئة في الكود يحجز مساحة دائمة في Heap حتى لو لم يُنشأ منها أي كائن"
      }
    },
    {
      "id": "inst",
      "text": {
        "en": "A Class is the blueprint; an Object is a live runtime instance",
        "ar": "الفئة هي القالب التصميمي، والكائن نسخة حية منشأة منها"
      }
    },
    {
      "id": "loop",
      "text": {
        "en": "An Object compiles into multiple Classes",
        "ar": "الكائن يترجم لعدة فئات"
      }
    }
  ],
  "correctAnswer": "inst",
  "explanation": {
    "en": "A class specifies structure and behavior once in code; instantiating `new Car()` allocates distinct object state per instance in memory.",
    "ar": "تُعرّف الفئة القالب مرة واحدة، بينما كل عملية إنشاء `new` تنتج كائناً مستقلاً ببياناته الخاصة."
  },
  "tags": [
    "oop",
    "classes"
  ]
} as AssessmentQuestion,
{
  "id": "OOP-ENC-E-002",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "OOP Fundamentals",
  "subtopic": "Classes and Objects",
  "specialization": "Blueprint vs Instance",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In object-oriented systems, what distinguishes a `Class` from an `Object` cleanly?",
    "ar": "في البرمجة كائنية التوجه، ما الفرق الأساسي بين الفئة `Class` والكائن `Object`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Classes compile directly into binary SQL statements while Objects hold raw comments",
        "ar": "تُترجم الفئة مباشرة إلى استعلامات SQL بينما لا يحوي الكائن سوى ثوابت أو تعليقات فقط"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Class is the reusable template; Object is an independent live instance",
        "ar": "الفئة قالب التصميم، والكائن نسخة حية مستقلة في الذاكرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Strict OOP compilers limit every compiled Class definition to creating one live Object",
        "ar": "لا تسمح اللغات الكائنية بإنشاء أكثر من كائن واحد فقط من الفئة الواحدة أثناء التشغيل"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Only one Object can ever exist per Class definition per process",
        "ar": "لا يُنشأ إلا كائن واحد من كل فئة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Each instantiated Object allocates separate field memory following the Class blueprint.",
    "ar": "الفئة تصف البنية، وعند كل إنشاء نحصل على كائن مستقل بقيمه الخاصة."
  },
  "tags": [
    "oop",
    "classes",
    "objects"
  ]
} as AssessmentQuestion
];
