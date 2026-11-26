import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bitwise_questions: AssessmentQuestion[] = [
{
  "id": "PF-BIT-M-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators & Expressions",
  "subtopic": "Binary & Bitwise Operations",
  "specialization": "Power of 2 & Binary Representation",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is the 8-bit binary representation of decimal number 42, and what does `42 >> 1` produce?",
    "ar": "ما التمثيل الثنائي (8-bit) للرقم العشري 42، وما ناتج الإزاحة `42 >> 1`؟"
  },
  "options": [
    {
      "id": "b42",
      "text": {
        "en": "00101010 (32 + 8 + 2), and right-shift gives 21",
        "ar": "00101010 (أي 32 + 8 + 2)، والإزاحة لليمين تعطي 21"
      }
    },
    {
      "id": "b40",
      "text": {
        "en": "00101000, and shift gives 84",
        "ar": "00101000 وتعطي 84"
      }
    },
    {
      "id": "b50",
      "text": {
        "en": "11001010, and shift gives 10",
        "ar": "11001010 وتعطي 10"
      }
    },
    {
      "id": "b21",
      "text": {
        "en": "00010101, and shift gives 42",
        "ar": "00010101 وتعطي 42"
      }
    }
  ],
  "correctAnswer": "b42",
  "explanation": {
    "en": "42 = 2⁵ + 2³ + 2¹ = 32 + 8 + 2 = 00101010₂. Shifting bits right by 1 (>> 1) divides unsigned/non-negative integers by 2 -> 21.",
    "ar": "42 تساوي 32 + 8 + 2 = 00101010، والإزاحة بتاً واحداً لليمين تقسم العدد الصحيح الموجب على 2 فينتج 21."
  },
  "tags": [
    "binary",
    "bits",
    "encoding",
    "bitwise"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-BIN-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Data Representation",
  "subtopic": "Bits, Bytes & Hexadecimal",
  "specialization": "Number Systems",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How many bits make 1 Byte, and how many hexadecimal digits represent 1 Byte cleanly?",
    "ar": "كم بت (Bit) يتكون منه البايت الواحد (1 Byte)، وكم خانة ست عشرية (Hex) تمثّل البايت بدقة؟"
  },
  "options": [
    {
      "id": "4_1",
      "text": {
        "en": "4 bits = 1 Byte; 1 Hex digit",
        "ar": "4 بتات وخانة واحدة"
      }
    },
    {
      "id": "8_2",
      "text": {
        "en": "8 bits = 1 Byte; represented cleanly by 2 Hex digits",
        "ar": "8 بتات = 1 بايت؛ ويُمثَّل بخانتين في النظام الست عشري"
      }
    },
    {
      "id": "16_4",
      "text": {
        "en": "16 bits = 1 Byte; 4 Hex digits",
        "ar": "16 بت و 4 خانات"
      }
    },
    {
      "id": "10_2",
      "text": {
        "en": "10 bits = 1 Byte; 3 Hex digits",
        "ar": "10 بتات و 3 خانات"
      }
    }
  ],
  "correctAnswer": "8_2",
  "explanation": {
    "en": "Because 16 = 2⁴, one hexadecimal digit (0-F) maps cleanly to a 4-bit nibble, so two hex digits represent one 8-bit byte (256 possible values: 0..255).",
    "ar": "كل رقم ست عشري يعادل 4 بتات (2⁴ = 16)، لذا فخانتا Hex تمثلان بايتاً واحداً من 8 بتات تماماً."
  },
  "tags": [
    "binary",
    "bits",
    "encoding"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-CPU-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Computer Basics",
  "subtopic": "CPU Execution & RAM",
  "specialization": "Von Neumann Architecture",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What are the three repeating hardware stages of the CPU instruction cycle, and what distinguishes RAM from SSD storage?",
    "ar": "ما المراحل الثلاث المتكررة لدورة تنفيذ المعالج (CPU Cycle)، وما الفرق بين الـ RAM والتخزين الدائم SSD؟"
  },
  "options": [
    {
      "id": "comp",
      "text": {
        "en": "Compile-Link-Boot cycles; volatile RAM stores data significantly slower than NVMe SSD drives",
        "ar": "Compile-Link-Boot؛ وذاكرة RAM أبطأ من قرص SSD ولا تنفذ التعليمات مباشرة"
      }
    },
    {
      "id": "dns",
      "text": {
        "en": "Resolve-Connect-Render steps; both RAM and SSD retain files after power disconnection",
        "ar": "Resolve-Connect-Render؛ وكلاهما يحتفظ بالملفات والبرامج دائماً بعد فصل الكهرباء"
      }
    },
    {
      "id": "fde",
      "text": {
        "en": "Fetch-Decode-Execute; volatile RAM clears on power loss unlike SSD",
        "ar": "Fetch-Decode-Execute؛ وRAM متطايرة تفقد بياناتها بالانقطاع بخلاف SSD"
      }
    },
    {
      "id": "push",
      "text": {
        "en": "Push-Pop-Flush; RAM stores BIOS only",
        "ar": "Push-Pop-Flush"
      }
    }
  ],
  "correctAnswer": "fde",
  "explanation": {
    "en": "The Control Unit fetches the next instruction from RAM using the Program Counter, decodes its opcode, and executes it in the ALU/registers.",
    "ar": "تجلب وحدة التحكم التعليمة من الـ RAM ثم تفك تشفيرها وتنفذها في وحدة الحساب والمنطق ثم تزيد عداد البرنامج."
  },
  "tags": [
    "hardware",
    "os",
    "architecture",
    "intro",
    "compilation"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-BIT-E-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators",
  "subtopic": "Bitwise Masking",
  "specialization": "Even Odd Bit",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "int x = 37;\nbool flag = (x & 1) == 1;",
  "codeLanguage": "cpp",
  "question": {
    "en": "What does `(x & 1) == 1` evaluate cleanly in 1 hardware instruction?",
    "ar": "ماذا يفحص التعبير `(x & 1) == 1` في تعليمة معالج واحدة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Tests whether integer `x` exceeds signed 32-bit maximum bounds",
        "ar": "يفحص تجاوز الحد الأقصى 32-بت"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Doubles `x` in place before shifting the sign flag right",
        "ar": "يضاعف قيمة المتغير مع إزاحة الإشارة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Tests whether integer `x` is strictly odd",
        "ar": "يتحقق مما إذا كان العدد `x` فردياً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Flips all 32 binary bits of `x` except bit 0",
        "ar": "يعكس جميع بتات العدد ما عدا البت الأول"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Bitwise AND with `1` isolates bit 0; odd integers always end in `1` in binary.",
    "ar": "القناع `1` يعزل أقل بت قيمةً؛ الأعداد الفردية تنتهي دائماً بـ `1` في النظام الثنائي."
  },
  "tags": [
    "bitwise",
    "mask",
    "parity"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-BIT-M-003",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators",
  "subtopic": "Bit Shifts",
  "specialization": "Power of Two",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which bitwise check cleanly detects whether a strictly positive integer `n > 0` is an exact power of 2?",
    "ar": "أي تعبير ثنائي يكشف بدقة ما إذا كان العدد الصحيح الموجب `n > 0` يساوي إحدى قوى العدد 2؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "(n | (n - 1)) == 0",
        "ar": "(n | (n - 1)) == 0"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "(n ^ n) == 1",
        "ar": "(n ^ n) == 1"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "(n << 1) == n",
        "ar": "(n << 1) == n"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "(n & (n - 1)) == 0",
        "ar": "(n & (n - 1)) == 0"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Subtracting 1 turns `1000` into `0111`; AND-ing clears all bits ONLY when `n` contained a single `1` bit.",
    "ar": "طرح 1 يحول `1000` إلى `0111`، وبإجراء AND بينهما يكون الناتج صفراً فقط إذا امتلك العدد بتاً واحداً مضاءً."
  },
  "tags": [
    "bitwise",
    "power-of-two",
    "tricks"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-BIT-M-004",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators",
  "subtopic": "Bitwise Precedence",
  "specialization": "Bug Fix",
  "difficulty": "medium",
  "type": "debugging",
  "codeSnippet": "if (flags & READ_MASK == READ_MASK) { ... }",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why does `if (flags & READ_MASK == READ_MASK)` silently misbehave in C++ unless parentheses are added?",
    "ar": "لماذا يخطئ الشرط `if (flags & READ_MASK == READ_MASK)` في C++ أو JavaScript إذا غابت الأقواس؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "`==` has higher precedence than `&`, comparing masks BEFORE masking flags",
        "ar": "لأن `==` يسبق `&` في الأولوية، فيقارن القناعين أولاً قبل إجراء الضرب المنطقي"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`&` overflows integers larger than byte width unless cast explicitly",
        "ar": "لأن `&` يفيض مع الأعداد الكبيرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "C++ disables `&` inside conditional headers unless preceded by `bool`",
        "ar": "لأن C++ تمنع `&` داخل الشروط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Bitwise AND mutates `READ_MASK` in read-only segments",
        "ar": "لأنه يعدل الثابت في الذاكرة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Writing `(flags & READ_MASK) == READ_MASK` forces masking before equality comparison cleanly.",
    "ar": "إحاطة `(flags & READ_MASK)` بالأقواس يفرض تنفيذ القناع قبل المقارنة بـ `==`."
  },
  "tags": [
    "bitwise",
    "precedence",
    "debugging"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-BIT-H-006",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators",
  "subtopic": "XOR Canceling",
  "specialization": "Unique Finder",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "int ans = 0;\nfor (int v : {7, 3, 9, 7, 3}) ans ^= v;",
  "codeLanguage": "cpp",
  "question": {
    "en": "What final integer remains in `ans` after XOR-folding all numbers in `{7, 3, 9, 7, 3}`?",
    "ar": "ما القيمة النهائية المخزنة في `ans` بعد تنفيذ XOR على المصفوفة `{7, 3, 9, 7, 3}`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "0 (because XORing any five signed array integers always cancels together cleanly)",
        "ar": "0 لاختفاء جميع العناصر المزدوجة والفردية معاً بعد تطبيق XOR التراكمي"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "10 (summing unique elements after combining paired duplicate values together)",
        "ar": "10 وهو ناتج جمع المكررات بعد تحويل البتات الفريدة عبر بوابة OR المنطقية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "9 (since `7^7 = 0` and `3^3 = 0` cancel)",
        "ar": "9 لأن القيم المتماثلة `7^7` و`3^3` تلغي بعضها"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "19 (bitwise OR accumulation)",
        "ar": "19 نتيجة التجميع"
      }
    }
  ],
  "correctAnswer": "d",
  "explanation": {
    "en": "Commutativity and self-inverse (`x ^ x = 0`, `0 ^ y = y`) isolate the single odd-occurring number in O(N) time and O(1) space.",
    "ar": "خاصية التبديل و`x ^ x = 0` تعزل الرقم الفريد دون جدول تجزئة أو فرز."
  },
  "tags": [
    "xor",
    "algorithms",
    "bitwise"
  ]
} as AssessmentQuestion
];
