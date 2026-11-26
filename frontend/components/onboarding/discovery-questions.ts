export type QuestionOption = {
  id: string;
  en: string;
  ar: string;
  exclusive?: boolean;
};

export type Question = {
  id: string;
  type: "single" | "multiple";
  title: { en: string; ar: string };
  options: QuestionOption[];
  condition?: (answers: Record<string, string[]>) => boolean;
};

export const QUESTIONS: Question[] = [
  {
    id: "status",
    type: "single",
    title: {
      en: "Where are you right now?",
      ar: "أين أنت الآن من الناحية الأكاديمية أو المهنية؟"
    },
    options: [
      { id: "high_school", en: "High school student", ar: "طالب في المرحلة الثانوية" },
      { id: "university", en: "University student", ar: "طالب جامعي" },
      { id: "graduate", en: "Recent graduate", ar: "حديث التخرج" },
      { id: "professional", en: "Working professional", ar: "موظف محترف" },
      { id: "self_taught", en: "Self-taught learner", ar: "أتعلم ذاتياً" },
      { id: "career_changer", en: "Career changer", ar: "أرغب في تغيير مساري المهني" },
      { id: "exploring", en: "Just exploring", ar: "أستكشف فقط" }
    ]
  },
  {
    id: "field",
    type: "single",
    title: {
      en: "What are you currently studying or working in?",
      ar: "ما هو مجال دراستك أو عملك الحالي؟"
    },
    options: [
      { id: "cs", en: "Computer Science", ar: "علوم الحاسوب" },
      { id: "swe", en: "Software Engineering", ar: "هندسة البرمجيات" },
      { id: "ce", en: "Computer Engineering", ar: "هندسة الحاسوب" },
      { id: "it", en: "Information Technology", ar: "تقنية المعلومات" },
      { id: "is", en: "Information Systems", ar: "نظم المعلومات" },
      { id: "math", en: "Mathematics", ar: "الرياضيات" },
      { id: "eng", en: "Engineering", ar: "هندسة (أخرى)" },
      { id: "other_tech", en: "Another technical field", ar: "مجال تقني آخر" },
      { id: "non_tech", en: "Non-technical field", ar: "مجال غير تقني" },
      { id: "none", en: "Nothing specific yet", ar: "لا شيء محدد بعد" }
    ]
  },
  {
    id: "uni_year",
    type: "single",
    condition: (answers) => answers.status?.includes("university"),
    title: {
      en: "What stage of university are you in?",
      ar: "في أي مرحلة جامعية أنت؟"
    },
    options: [
      { id: "year1", en: "1st year", ar: "السنة الأولى" },
      { id: "year2", en: "2nd year", ar: "السنة الثانية" },
      { id: "year3", en: "3rd year", ar: "السنة الثالثة" },
      { id: "year4", en: "4th year", ar: "السنة الرابعة" },
      { id: "year5", en: "5th year+", ar: "السنة الخامسة أو أكثر" },
      { id: "postgrad", en: "Postgraduate", ar: "دراسات عليا" }
    ]
  },
  {
    id: "experience",
    type: "single",
    title: {
      en: "How would you describe your programming experience?",
      ar: "كيف تصف خبرتك في البرمجة؟"
    },
    options: [
      { id: "beginner", en: "Complete beginner", ar: "مبتدئ تماماً" },
      { id: "tried", en: "I've tried programming a little", ar: "جربت البرمجة قليلاً" },
      { id: "basics", en: "Comfortable with the basics", ar: "مرتاح مع الأساسيات" },
      { id: "projects", en: "I've built several projects", ar: "بنيت عدة مشاريع" },
      { id: "experienced", en: "Experienced", ar: "ذو خبرة" },
      { id: "advanced", en: "Advanced", ar: "متقدم" }
    ]
  },
  {
    id: "languages",
    type: "multiple",
    title: {
      en: "Which programming languages do you currently use?",
      ar: "ما هي لغات البرمجة التي تستخدمها حالياً؟"
    },
    options: [
      { id: "c", en: "C", ar: "C" },
      { id: "cpp", en: "C++", ar: "C++" },
      { id: "csharp", en: "C#", ar: "C#" },
      { id: "java", en: "Java", ar: "Java" },
      { id: "python", en: "Python", ar: "Python" },
      { id: "javascript", en: "JavaScript", ar: "JavaScript" },
      { id: "typescript", en: "TypeScript", ar: "TypeScript" },
      { id: "go", en: "Go", ar: "Go" },
      { id: "rust", en: "Rust", ar: "Rust" },
      { id: "other", en: "Other", ar: "غير ذلك" },
      { id: "none", en: "None yet", ar: "لا شيء بعد", exclusive: true }
    ]
  },
  {
    id: "learn_language",
    type: "multiple",
    title: {
      en: "Is there a language you specifically want to learn or get better at?",
      ar: "هل هناك لغة معينة تريد تعلمها أو تحسين مستواك فيها؟"
    },
    options: [
      { id: "c", en: "C", ar: "C" },
      { id: "cpp", en: "C++", ar: "C++" },
      { id: "csharp", en: "C#", ar: "C#" },
      { id: "java", en: "Java", ar: "Java" },
      { id: "python", en: "Python", ar: "Python" },
      { id: "javascript", en: "JavaScript", ar: "JavaScript" },
      { id: "typescript", en: "TypeScript", ar: "TypeScript" },
      { id: "go", en: "Go", ar: "Go" },
      { id: "rust", en: "Rust", ar: "Rust" },
      { id: "not_sure", en: "I'm not sure yet", ar: "لست متأكداً بعد", exclusive: true }
    ]
  },
  {
    id: "interests",
    type: "multiple",
    title: {
      en: "Which areas of Computer Science interest you?",
      ar: "ما هي مجالات علوم الحاسوب التي تثير اهتمامك؟"
    },
    options: [
      { id: "fundamentals", en: "Programming Fundamentals", ar: "أساسيات البرمجة" },
      { id: "ds", en: "Data Structures", ar: "هياكل البيانات" },
      { id: "algo", en: "Algorithms", ar: "الAlgorithms" },
      { id: "cp", en: "Competitive Programming", ar: "البرمجة التنافسية" },
      { id: "web", en: "Web Development", ar: "تطوير الويب" },
      { id: "backend", en: "Backend Development", ar: "تطوير الواجهات الخلفية" },
      { id: "ai", en: "AI & Machine Learning", ar: "الذكاء الاصطناعي وتعلم الآلة" },
      { id: "security", en: "Cybersecurity", ar: "الأمن السيبراني" },
      { id: "systems", en: "System Design", ar: "تصميم النظم" },
      { id: "exploring", en: "I'm still exploring", ar: "ما زلت أستكشف" }
    ]
  },
  {
    id: "goal",
    type: "multiple",
    title: {
      en: "What are you working toward?",
      ar: "ما هو هدفك الرئيسي؟"
    },
    options: [
      { id: "fundamentals", en: "Build strong CS fundamentals", ar: "بناء أساس قوي في علوم الحاسوب" },
      { id: "better_dev", en: "Become a better programmer", ar: "أن أصبح مبرمجاً أفضل" },
      { id: "projects", en: "Build real projects", ar: "بناء مشاريع حقيقية" },
      { id: "internship", en: "Get an internship", ar: "الحصول على تدريب مهني" },
      { id: "job", en: "Get a job", ar: "الحصول على وظيفة" },
      { id: "interviews", en: "Prepare for technical interviews", ar: "الاستعداد للمقابلات الفنية" },
      { id: "uni_success", en: "University success", ar: "التفوق الجامعي" },
      { id: "explore", en: "Explore Computer Science", ar: "استكشاف علوم الحاسوب" }
    ]
  },
  {
    id: "biggest_problem",
    type: "single",
    title: {
      en: "What feels hardest about learning Computer Science right now?",
      ar: "ما هو أصعب شيء تواجهه في تعلم علوم الحاسوب حالياً؟"
    },
    options: [
      { id: "where_to_start", en: "I don't know where to start", ar: "لا أعرف من أين أبدأ" },
      { id: "what_next", en: "I don't know what to learn next", ar: "لا أعرف ماذا أتعلم بعد ذلك" },
      { id: "apply", en: "I understand concepts but struggle to apply them", ar: "أفهم المفاهيم ولكن أجد صعوبة في تطبيقها" },
      { id: "problem_solving", en: "Problem solving is difficult", ar: "حل المشكلات صعب" },
      { id: "forgetting", en: "I forget what I learn", ar: "أنسى ما أتعلمه" },
      { id: "consistency", en: "I struggle with consistency", ar: "أواجه صعوبة في الاستمرارية" },
      { id: "fundamentals", en: "I know syntax but lack fundamentals", ar: "أعرف القواعد البرمجية ولكن تنقصني الأساسيات" },
      { id: "other", en: "Something else", ar: "شيء آخر" }
    ]
  },
  {
    id: "learning_style",
    type: "multiple",
    title: {
      en: "How do you learn best?",
      ar: "ما هي أفضل طريقة للتعلم بالنسبة لك؟"
    },
    options: [
      { id: "step_by_step", en: "Step-by-step explanations", ar: "الشرح خطوة بخطوة" },
      { id: "problems", en: "Solving problems", ar: "حل المشكلات" },
      { id: "projects", en: "Building projects", ar: "بناء المشاريع" },
      { id: "videos", en: "Watching videos", ar: "مشاهدة الفيديوهات" },
      { id: "reading", en: "Reading", ar: "القراءة" },
      { id: "interactive", en: "Interactive practice", ar: "الممارسة التفاعلية" },
      { id: "mix", en: "A mix of everything", ar: "مزيج من كل شيء" }
    ]
  },
  {
    id: "time_available",
    type: "single",
    title: {
      en: "How much time can you realistically dedicate to learning?",
      ar: "كم من الوقت يمكنك تخصيصه للتعلم بانتظام؟"
    },
    options: [
      { id: "less_2h", en: "Less than 2 hours/week", ar: "أقل من ساعتين أسبوعياً" },
      { id: "2_5h", en: "2-5 hours/week", ar: "2-5 ساعات أسبوعياً" },
      { id: "5_10h", en: "5-10 hours/week", ar: "5-10 ساعات أسبوعياً" },
      { id: "10_15h", en: "10-15 hours/week", ar: "10-15 ساعة أسبوعياً" },
      { id: "15_plus", en: "15+ hours/week", ar: "15+ ساعة أسبوعياً" },
      { id: "changes", en: "It changes from week to week", ar: "يتغير من أسبوع لآخر" }
    ]
  },
  {
    id: "start_date",
    type: "single",
    title: {
      en: "When do you think you'll actually have time to start?",
      ar: "متى تعتقد أنه سيكون لديك الوقت للبدء فعلياً؟"
    },
    options: [
      { id: "now", en: "I'm ready now", ar: "أنا مستعد الآن" },
      { id: "this_week", en: "This week", ar: "هذا الأسبوع" },
      { id: "next_month", en: "Within the next month", ar: "خلال الشهر القادم" },
      { id: "after_exams", en: "After my exams", ar: "بعد انتهاء امتحاناتي" },
      { id: "exploring", en: "I'm just exploring for now", ar: "أنا أستكشف فقط في الوقت الحالي" },
      { id: "not_sure", en: "I'm not sure yet", ar: "لست متأكداً بعد" }
    ]
  },
  {
    id: "consistency",
    type: "single",
    title: {
      en: "How consistent are you with learning right now?",
      ar: "ما مدى استمراريتك في التعلم حالياً؟"
    },
    options: [
      { id: "very_consistent", en: "Very consistent", ar: "مستمر جداً" },
      { id: "usually", en: "Usually consistent", ar: "مستمر في الغالب" },
      { id: "lose_momentum", en: "I start strong but lose momentum", ar: "أبدأ بقوة ثم أفقد الحماس" },
      { id: "when_time", en: "I study only when I have time", ar: "أدرس فقط عندما أجد وقتاً" },
      { id: "inconsistent", en: "Very inconsistent", ar: "غير مستمر أبداً" }
    ]
  },
  {
    id: "motivation",
    type: "single",
    title: {
      en: "What would make you feel like your learning is actually working?",
      ar: "ما الذي يجعلك تشعر أنك تتعلم بفعالية حقاً؟"
    },
    options: [
      { id: "solve", en: "I can solve problems I couldn't solve before", ar: "أستطيع حل مشكلات لم أكن قادراً على حلها من قبل" },
      { id: "build", en: "I can build projects independently", ar: "أستطيع بناء مشاريع بشكل مستقل" },
      { id: "deep", en: "I understand CS concepts deeply", ar: "أفهم مفاهيم علوم الحاسوب بعمق" },
      { id: "roadmap", en: "I can follow a clear roadmap", ar: "أستطيع اتباع مسار تعليمي واضح" },
      { id: "job_ready", en: "I can become job-ready", ar: "أستطيع أن أصبح جاهزاً للعمل" },
      { id: "stop_lost", en: "I can finally stop feeling lost", ar: "أستطيع التوقف عن الشعور بالضياع أخيراً" }
    ]
  },
  {
    id: "learncs_help",
    type: "multiple",
    title: {
      en: "What would you want LearnCS to help you with?",
      ar: "كيف ترغب أن يساعدك LearnCS؟"
    },
    options: [
      { id: "roadmap", en: "Build my roadmap", ar: "بناء مساري التعليمي" },
      { id: "practice", en: "Give me practice", ar: "توفير الممارسة والتدريب" },
      { id: "explain", en: "Explain difficult concepts", ar: "شرح المفاهيم الصعبة" },
      { id: "track", en: "Track my progress", ar: "تتبع تقدمي" },
      { id: "consistent", en: "Help me stay consistent", ar: "مساعدتي على الاستمرارية" },
      { id: "interviews", en: "Prepare me for interviews", ar: "تجهيزي للمقابلات" },
      { id: "all", en: "All of the above", ar: "كل ما سبق", exclusive: true }
    ]
  },
  {
    id: "confidence",
    type: "single",
    title: {
      en: "How confident do you currently feel about your Computer Science knowledge?",
      ar: "ما مدى ثقتك الحالية بمعرفتك في علوم الحاسوب؟"
    },
    options: [
      { id: "1", en: "1: Very unsure", ar: "1: غير واثق أبداً" },
      { id: "2", en: "2", ar: "2" },
      { id: "3", en: "3: Somewhere in the middle", ar: "3: في المنتصف" },
      { id: "4", en: "4", ar: "4" },
      { id: "5", en: "5: Very confident", ar: "5: واثق جداً" }
    ]
  },
  {
    id: "assessment_readiness",
    type: "single",
    title: {
      en: "How do you feel about taking a technical assessment?",
      ar: "ما هو شعورك تجاه إجراء تقييم فني لمعرفة مستواك؟"
    },
    options: [
      { id: "now", en: "I'm ready now", ar: "أنا مستعد الآن" },
      { id: "soon", en: "I'd like to try it soon", ar: "أود تجربته قريباً" },
      { id: "prepare", en: "I want to prepare first", ar: "أريد التحضير أولاً" },
      { id: "understand", en: "I want to understand LearnCS first", ar: "أريد فهم LearnCS أولاً" },
      { id: "not_ready", en: "I'm not ready yet", ar: "لست مستعداً بعد" },
      { id: "exploring", en: "I'm just exploring", ar: "أنا أستكشف فقط" }
    ]
  }
];
