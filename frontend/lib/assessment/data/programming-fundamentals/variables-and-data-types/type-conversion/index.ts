import { AssessmentQuestion } from '@/lib/assessment/schema';

export const type_conversion_questions: AssessmentQuestion[] = [
{
  "id": "PF-CAST-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Variables & Data Types",
  "subtopic": "Type Conversion",
  "specialization": "Integer Division",
  "difficulty": "easy",
  "type": "code-output",
  "codeLanguage": "cpp",
  "codeSnippet": "int a = 5, b = 2;\ndouble res = a / b;",
  "question": {
    "en": "In C++, C#, and Java, what value is stored in `res` after executing the snippet above?",
    "ar": "في لغات مثل C++ و Java و C#، ما القيمة التي تُخزن في المتغير `res` بعد تنفيذ الكود أعلاه؟"
  },
  "options": [
    {
      "id": "20",
      "text": {
        "en": "2.0 (int division then cast)",
        "ar": "2.0 (قسمة صحيحة ثم تحويل)"
      }
    },
    {
      "id": "25",
      "text": {
        "en": "2.5 (floating-point division promoted before evaluating operands)",
        "ar": "2.5 (قسمة عشرية كاملة قبل التخصيص للمتغير المزدوج)"
      }
    },
    {
      "id": "30",
      "text": {
        "en": "3.0 (implicit ceiling rounding applied during integer cast)",
        "ar": "3.0 (تقريب تلقائي للأعلى عند تحويل النوع العددي)"
      }
    },
    {
      "id": "err",
      "text": {
        "en": "Compile-time type mismatch error blocking assignment",
        "ar": "خطأ ترجمة"
      }
    }
  ],
  "correctAnswer": "20",
  "explanation": {
    "en": "Because both operands `a` and `b` are `int`, `a / b` performs truncating integer division resulting in `2`, which is only then converted to `2.0`. Use `(double)a / b` for `2.5`.",
    "ar": "بما أن طرفي القسمة من نوع int، يُسقط الجزء الكسري وتنتج 2 قبل إسنادها إلى double؛ للحصول على 2.5 يجب تحويل أحد الطرفين إلى double أولاً."
  },
  "tags": [
    "variables",
    "types"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-REP-M-003",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Data Representation",
  "subtopic": "Floating Point",
  "specialization": "IEEE 754 Precision",
  "difficulty": "medium",
  "type": "scenario",
  "question": {
    "en": "Why should monetary cents never be accumulated repeatedly inside IEEE-754 binary `float` variables?",
    "ar": "لماذا يتجنب المهندسون تجميع المبالغ المالية والكسور العشرية الدقيقة داخل متغيرات `float` الثنائية؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Binary floating point only represents positive integers cleanly above 1000",
        "ar": "لأن الفاصلة العائمة الثنائية تدعم الأعداد الموجبة أكبر من 1000 فقط"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "PostgreSQL refuses comparing any float columns during database indexes",
        "ar": "لأن قواعد البيانات ترفض فهرسة أي رقم عشري"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Decimal fractions like 0.1 repeat endlessly in base-2, accumulating tiny rounding errors",
        "ar": "لأن كسوراً عشرية مثل 0.1 تصبح دورية لا نهائية في الأساس 2 فتتراكم فروق تقريب"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "All programming languages crash automatically when adding two decimal variables",
        "ar": "لأن جمع متغيرين عشريين يسبب خطأ تشغيل في كل اللغات"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`1/10` cannot terminate in binary powers `2^-k`; use integer minor units (cents/piasters) or base-10 `decimal` types for exact money.",
    "ar": "الكسر `0.1` لا ينتهي تمثيله في النظام الثنائي؛ لذا نستخدم أعداداً صحيحة بالوحدة الصغرى (قرش/سنت) أو نوع `decimal`."
  },
  "tags": [
    "ieee754",
    "floating-point",
    "precision"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-REP-H-006",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Data Representation",
  "subtopic": "Binary Width",
  "specialization": "Overflow Bounds",
  "difficulty": "hard",
  "type": "debugging",
  "question": {
    "en": "In unsigned 8-bit arithmetic, what exact wrapped byte remains in hardware after adding `250 + 10`?",
    "ar": "في حساب 8-بت غير المؤشر (Unsigned byte)، ما القيمة المتبقية بعد جمع `250 + 10` مع الالتفاف Overflow؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "260 stored automatically in adjacent byte",
        "ar": "260 في الخانة المجاورة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "4 modulo 256 (`260 % 256`)",
        "ar": "4 باقي قسمة 260 على 256"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "255 clamped permanently as maximum ceiling",
        "ar": "255 عند الحد الأعلى"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "0 strictly on any overflow operation",
        "ar": "0 دائماً عند كل فيضان"
      }
    }
  ],
  "correctAnswer": "d",
  "explanation": {
    "en": "Unsigned modular wraparound reduces `260 mod 2^8 = 4`, dropping the 9th carry bit cleanly.",
    "ar": "الحساب غير المؤشر ذو 8 بت يأخذ باقي القسمة على `256` فتبقى القيمة `4`."
  },
  "tags": [
    "overflow",
    "binary",
    "arithmetic"
  ]
} as AssessmentQuestion,
{
  "id": "PF-VAR-M-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Variables & Data Types",
  "subtopic": "Type Conversion",
  "specialization": "Integer Division",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "int a = 9, b = 2;\ndouble avg = a / b;",
  "codeLanguage": "cpp",
  "question": {
    "en": "What exact numerical value gets stored inside `avg` in C++ or C#?",
    "ar": "ما القيمة الفعلية المخزنة داخل المتغير `avg` بعد تنفيذ الكود بلغة C++ أو C#؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "4.5",
        "ar": "4.5"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "4.0",
        "ar": "4.0"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "5.0",
        "ar": "5.0"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "0.5",
        "ar": "0.5"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Since `a` and `b` are both `int`, `9 / 2` performs integer division yielding `4` BEFORE assigning `4.0` to `avg`. Cast `(double)a / b` to get `4.5`.",
    "ar": "قسمة عددين صحيحين تعطي عدداً صحيحاً مبتوراً (`4`) قبل تعيينه إلى `double`، وللحصول على `4.5` يجب تحويل أحد الطرفين إلى `double` أولاً."
  },
  "tags": [
    "casting",
    "integer-division",
    "types"
  ]
} as AssessmentQuestion
];
