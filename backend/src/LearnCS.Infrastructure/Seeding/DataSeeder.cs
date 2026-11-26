using LearnCS.Domain.Assessment;
using LearnCS.Domain.Career;
using LearnCS.Domain.Gamification;
using LearnCS.Domain.Identity;
using LearnCS.Domain.Intelligence;
using LearnCS.Domain.Knowledge;
using LearnCS.Domain.Learning;
using LearnCS.Domain.Platform;
using LearnCS.Domain.Subscriptions;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LearnCS.Infrastructure.Seeding;

/// <summary>
/// Seeds development data demonstrating the complete LearnCS learner journey.
/// Safe to run multiple times (idempotent checks on slugs/names/codes).
/// </summary>
public static class DataSeeder
{
    private static string? GetConfigOrEnv(IConfiguration? configuration, string envVarName, string configKey)
    {
        var envVal = Environment.GetEnvironmentVariable(envVarName);
        if (!string.IsNullOrWhiteSpace(envVal)) return envVal;
        var cfgVal = configuration?[configKey];
        return string.IsNullOrWhiteSpace(cfgVal) ? null : cfgVal;
    }

    public static async Task SeedAsync(AppDbContext db, IConfiguration? configuration = null)
    {
        await SeedRolesAsync(db);
        await SeedSubscriptionPlansAsync(db);
        await SeedConceptsAndGraphAsync(db);
        await SeedTagsAsync(db);
        await SeedLearningPathAsync(db);
        await SeedAssessmentsAsync(db);
        await SeedProjectsAsync(db);
        await SeedCareerAsync(db);
        await SeedGamificationAsync(db);
        await SeedUsersAsync(db, configuration);
        await CurriculumSeeder.SeedFromJsonIfPresentAsync(db);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // IDENTITY
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedRolesAsync(AppDbContext db)
    {
        var requiredRoles = new[]
        {
            ("SuperAdmin", "Platform owner with unrestricted administrative and curriculum governance"),
            ("Admin", "Platform administrator"),
            ("ContentManager", "Curriculum and question bank author"),
            ("User", "Standard learner account"),
            ("Learner", "Standard learner account")
        };

        var existingNames = await db.Roles
            .Select(r => r.Name.ToLower())
            .ToListAsync();

        var existingSet = new HashSet<string>(existingNames);
        var added = false;

        foreach (var (name, desc) in requiredRoles)
        {
            if (!existingSet.Contains(name.ToLowerInvariant()))
            {
                db.Roles.Add(Role.Create(name, desc, isSystemRole: true));
                added = true;
            }
        }

        if (added)
        {
            await db.SaveChangesAsync();
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // KNOWLEDGE GRAPH
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedConceptsAndGraphAsync(AppDbContext db)
    {
        if (await db.Concepts.AnyAsync()) return;

        // Create concepts
        var progBasics = CreateConcept("Programming Basics", "programming-basics", "Programming", ConceptDifficulty.Beginner, "Introduction to programming concepts", 30);
        var variables = CreateConcept("Variables & Data Types", "variables-data-types", "Programming", ConceptDifficulty.Beginner, "Understanding variables, constants, and primitive data types", 45);
        var controlFlow = CreateConcept("Control Flow", "control-flow", "Programming", ConceptDifficulty.Beginner, "If-else, switch statements and conditional logic", 60);
        var loops = CreateConcept("Loops & Iteration", "loops-iteration", "Programming", ConceptDifficulty.Beginner, "for, while, do-while loops and iteration patterns", 60);
        var functions = CreateConcept("Functions & Methods", "functions-methods", "Programming", ConceptDifficulty.Beginner, "Defining and calling functions, parameters, return values", 90);
        var arrays = CreateConcept("Arrays & Lists", "arrays-lists", "Data Structures", ConceptDifficulty.Elementary, "Array operations, indexing, and list data structures", 90);
        var strings = CreateConcept("Strings & Text Processing", "strings-text", "Programming", ConceptDifficulty.Elementary, "String manipulation, pattern matching, and text processing", 60);
        var oop = CreateConcept("Object-Oriented Programming", "oop", "Programming", ConceptDifficulty.Intermediate, "Classes, objects, inheritance, polymorphism, encapsulation", 120);
        var recursion = CreateConcept("Recursion", "recursion", "Programming", ConceptDifficulty.Intermediate, "Recursive thinking, base cases, stack frames", 90);
        var linkedLists = CreateConcept("Linked Lists", "linked-lists", "Data Structures", ConceptDifficulty.Intermediate, "Singly and doubly linked lists, traversal, insertion, deletion", 90);
        var sorting = CreateConcept("Sorting Algorithms", "sorting-algorithms", "Algorithms", ConceptDifficulty.Intermediate, "Bubble, selection, insertion, merge, quick sort", 120);
        var searching = CreateConcept("Searching Algorithms", "searching-algorithms", "Algorithms", ConceptDifficulty.Intermediate, "Linear search, binary search, hash-based lookup", 90);
        var bigO = CreateConcept("Big-O Notation", "big-o-notation", "Algorithms", ConceptDifficulty.Intermediate, "Time and space complexity analysis", 90);
        var databases = CreateConcept("Databases Introduction", "databases-intro", "Databases", ConceptDifficulty.Elementary, "Relational databases, tables, rows, columns", 60);
        var sql = CreateConcept("SQL Fundamentals", "sql-fundamentals", "Databases", ConceptDifficulty.Intermediate, "SELECT, INSERT, UPDATE, DELETE, joins, aggregations", 120);

        var concepts = new[] { progBasics, variables, controlFlow, loops, functions, arrays, strings,
            oop, recursion, linkedLists, sorting, searching, bigO, databases, sql };

        foreach (var c in concepts) { c.Publish(); db.Concepts.Add(c); }
        await db.SaveChangesAsync();

        // Knowledge Graph Edges (prerequisite relationships)
        var edges = new List<ConceptRelationship>
        {
            // Programming chain
            ConceptRelationship.Create(progBasics.Id, variables.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(variables.Id, controlFlow.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(controlFlow.Id, loops.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(loops.Id, functions.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(functions.Id, arrays.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(functions.Id, strings.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(arrays.Id, oop.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(functions.Id, recursion.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(arrays.Id, linkedLists.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(arrays.Id, sorting.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(arrays.Id, searching.Id, RelationType.Prerequisite),
            ConceptRelationship.Create(sorting.Id, bigO.Id, RelationType.BuildsOn),
            ConceptRelationship.Create(searching.Id, bigO.Id, RelationType.BuildsOn),
            // Related
            ConceptRelationship.Create(oop.Id, databases.Id, RelationType.Related),
            ConceptRelationship.Create(databases.Id, sql.Id, RelationType.Prerequisite),
        };

        db.ConceptRelationships.AddRange(edges);
        await db.SaveChangesAsync();

        // Learning Objectives
        var objectives = new[]
        {
            LearningObjective.Create(variables.Id, "Declare variables of different types", BloomLevel.Apply, displayOrder: 1),
            LearningObjective.Create(variables.Id, "Explain the difference between mutable and immutable values", BloomLevel.Understand, displayOrder: 2),
            LearningObjective.Create(functions.Id, "Write reusable functions with parameters and return values", BloomLevel.Apply, displayOrder: 1),
            LearningObjective.Create(recursion.Id, "Identify base cases and recursive cases", BloomLevel.Analyze, displayOrder: 1),
            LearningObjective.Create(sorting.Id, "Implement bubble sort and explain its O(n²) complexity", BloomLevel.Evaluate, displayOrder: 1),
        };

        db.LearningObjectives.AddRange(objectives);
        await db.SaveChangesAsync();
    }

    private static Concept CreateConcept(string title, string slug, string category,
        ConceptDifficulty difficulty, string? desc, int? mins)
        => Concept.Create(title, slug, category, difficulty, desc, mins);

    // ─────────────────────────────────────────────────────────────────────────
    // TAGS
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedTagsAsync(AppDbContext db)
    {
        if (await db.Tags.AnyAsync()) return;

        var tags = new[]
        {
            Tag.Create("Beginner Friendly", "beginner-friendly", "#22c55e"),
            Tag.Create("Core Concept", "core-concept", "#3b82f6"),
            Tag.Create("Practice Heavy", "practice-heavy", "#f59e0b"),
            Tag.Create("Theory", "theory", "#8b5cf6"),
            Tag.Create("Algorithm", "algorithm", "#ef4444"),
        };

        db.Tags.AddRange(tags);
        await db.SaveChangesAsync();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LEARNING PATH
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedLearningPathAsync(AppDbContext db)
    {
        if (await db.LearningPaths.AnyAsync()) return;

        var path = LearningPath.Create(
            "CS Foundations",
            "cs-foundations",
            ConceptDifficulty.Beginner,
            estimatedHours: 40,
            "Build a solid foundation in Computer Science, from basic programming through data structures and algorithms."
        );
        path.Publish();
        db.LearningPaths.Add(path);
        await db.SaveChangesAsync();

        // Track 1: Programming Fundamentals
        var track1 = Track.Create(path.Id, "Programming Fundamentals", 1,
            "Master the core building blocks of programming");
        db.Tracks.Add(track1);
        await db.SaveChangesAsync();

        // Module 1.1: Getting Started
        var mod1 = Module.Create(track1.Id, "Getting Started with Programming", 1, estimatedMinutes: 90);
        db.Modules.Add(mod1);
        await db.SaveChangesAsync();

        var varConcept = await db.Concepts.FirstAsync(c => c.Slug == "variables-data-types");
        var cfConcept = await db.Concepts.FirstAsync(c => c.Slug == "control-flow");
        var loopConcept = await db.Concepts.FirstAsync(c => c.Slug == "loops-iteration");

        var lessons1 = new[]
        {
            Lesson.Create(mod1.Id, "What is Programming?", "what-is-programming", LessonType.Text, 1, 15),
            Lesson.Create(mod1.Id, "Variables and Data Types", "variables-data-types-lesson", LessonType.Text, 2, 30, varConcept.Id),
            Lesson.Create(mod1.Id, "Making Decisions with If-Else", "if-else-decisions", LessonType.Interactive, 3, 30, cfConcept.Id),
            Lesson.Create(mod1.Id, "Loops and Repetition", "loops-repetition", LessonType.Interactive, 4, 30, loopConcept.Id),
        };

        foreach (var l in lessons1) { l.Publish(); db.Lessons.Add(l); }

        // Module 1.2: Functions
        var mod2 = Module.Create(track1.Id, "Functions and Modularity", 2, estimatedMinutes: 120);
        db.Modules.Add(mod2);
        await db.SaveChangesAsync();

        var funcConcept = await db.Concepts.FirstAsync(c => c.Slug == "functions-methods");
        var recConcept = await db.Concepts.FirstAsync(c => c.Slug == "recursion");

        var lessons2 = new[]
        {
            Lesson.Create(mod2.Id, "Defining Functions", "defining-functions", LessonType.Text, 1, 30, funcConcept.Id),
            Lesson.Create(mod2.Id, "Parameters and Return Values", "params-return", LessonType.Interactive, 2, 30, funcConcept.Id),
            Lesson.Create(mod2.Id, "Introduction to Recursion", "intro-recursion", LessonType.Text, 3, 45, recConcept.Id),
        };

        foreach (var l in lessons2) { l.Publish(); db.Lessons.Add(l); }

        // Track 2: Data Structures & Algorithms
        var track2 = Track.Create(path.Id, "Data Structures & Algorithms", 2,
            "Learn essential data structures and algorithm design");
        db.Tracks.Add(track2);
        await db.SaveChangesAsync();

        var mod3 = Module.Create(track2.Id, "Arrays and Lists", 1, estimatedMinutes: 90);
        db.Modules.Add(mod3);
        await db.SaveChangesAsync();

        var arrayConcept = await db.Concepts.FirstAsync(c => c.Slug == "arrays-lists");
        var sortConcept = await db.Concepts.FirstAsync(c => c.Slug == "sorting-algorithms");

        var lessons3 = new[]
        {
            Lesson.Create(mod3.Id, "Working with Arrays", "working-arrays", LessonType.Interactive, 1, 30, arrayConcept.Id),
            Lesson.Create(mod3.Id, "Sorting Algorithms", "sorting-algorithms-lesson", LessonType.Video, 2, 45, sortConcept.Id),
        };

        foreach (var l in lessons3) { l.Publish(); db.Lessons.Add(l); }

        // Add some learning resources
        var resources = new[]
        {
            LearningResource.Create("Python for Beginners - Full Course", "https://www.youtube.com/watch?v=eWRfhZUzrAc", ResourceType.Video, "Complete beginner Python course", varConcept.Id, 270),
            LearningResource.Create("CS50: Introduction to Computer Science", "https://cs50.harvard.edu/x/", ResourceType.Documentation, "Harvard's famous intro CS course", null, null),
            LearningResource.Create("Visualizing Sorting Algorithms", "https://visualgo.net/en/sorting", ResourceType.Article, "Interactive visualizations of sorting algorithms", sortConcept.Id, 20),
        };

        db.LearningResources.AddRange(resources);
        await db.SaveChangesAsync();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ASSESSMENTS
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedAssessmentsAsync(AppDbContext db)
    {
        if (await db.Assessments.AnyAsync()) return;

        var varConcept = await db.Concepts.FirstAsync(c => c.Slug == "variables-data-types");
        var cfConcept = await db.Concepts.FirstAsync(c => c.Slug == "control-flow");
        var loopConcept = await db.Concepts.FirstAsync(c => c.Slug == "loops-iteration");
        var funcConcept = await db.Concepts.FirstAsync(c => c.Slug == "functions-methods");
        var arrayConcept = await db.Concepts.FirstAsync(c => c.Slug == "arrays-lists");

        // ── Initial Assessment ───────────────────────────────────────────────
        var initialAssessment = Domain.Assessment.Assessment.Create(
            "Initial Knowledge Assessment",
            AssessmentType.Initial,
            "Helps us understand your current CS knowledge level to recommend the best starting point.",
            timeLimitMinutes: 20,
            passScore: 60
        );
        initialAssessment.Publish();
        db.Assessments.Add(initialAssessment);
        await db.SaveChangesAsync();

        var questions = new List<Question>
        {
            // Variables
            CreateMCQ("What is a variable?", varConcept.Id, QuestionDifficulty.Easy,
                ("A named memory location that stores a value", true),
                ("A fixed constant that never changes", false),
                ("A type of loop", false),
                ("A function parameter only", false)),
            // Data Types
            CreateMCQ("Which of these is NOT a primitive data type?", varConcept.Id, QuestionDifficulty.Easy,
                ("Array", true),
                ("Integer", false),
                ("Boolean", false),
                ("String", false)),
            // Control flow
            CreateMCQ("What does an if-else statement do?", cfConcept.Id, QuestionDifficulty.Easy,
                ("Executes different code blocks based on a condition", true),
                ("Repeats code multiple times", false),
                ("Defines a reusable block of code", false),
                ("Stores a list of values", false)),
            // Loops
            CreateMCQ("A 'for' loop is best used when:", loopConcept.Id, QuestionDifficulty.Easy,
                ("You know the number of iterations in advance", true),
                ("You want to run code forever", false),
                ("You need to define a function", false),
                ("You want to store multiple values", false)),
            // Functions
            CreateMCQ("What is the purpose of a function's return value?", funcConcept.Id, QuestionDifficulty.Medium,
                ("To send a result back to the caller", true),
                ("To repeat the function automatically", false),
                ("To declare a new variable", false),
                ("To stop the program", false)),
            // Functions TF
            CreateTrueFalse("A function can only have one parameter.", funcConcept.Id, false),
            // Arrays
            CreateMCQ("What is the index of the first element in an array?", arrayConcept.Id, QuestionDifficulty.Easy,
                ("0", true),
                ("1", false),
                ("-1", false),
                ("Depends on the language", false)),
            // Arrays
            CreateMCQ("What happens when you access an array index that doesn't exist?", arrayConcept.Id, QuestionDifficulty.Medium,
                ("An error or exception is thrown", true),
                ("It returns 0", false),
                ("It returns null always", false),
                ("The array grows automatically", false)),
            // Sorting
            CreateMCQ("Which sorting algorithm has an average time complexity of O(n log n)?", null, QuestionDifficulty.Hard,
                ("Merge Sort", true),
                ("Bubble Sort", false),
                ("Selection Sort", false),
                ("Insertion Sort", false)),
            // Recursion TF
            CreateTrueFalse("Every recursive function must have a base case to avoid infinite recursion.", null, true),
        };

        foreach (var q in questions) db.Questions.Add(q);
        await db.SaveChangesAsync();

        // Link questions to assessment
        for (int i = 0; i < questions.Count; i++)
        {
            db.AssessmentQuestions.Add(
                AssessmentQuestion.Create(initialAssessment.Id, questions[i].Id, i + 1, 10));
        }
        await db.SaveChangesAsync();

        // ── Concept Quiz: Functions ──────────────────────────────────────────
        var funcQuiz = Domain.Assessment.Assessment.Create(
            "Functions & Recursion Quiz",
            AssessmentType.ConceptQuiz,
            "Test your understanding of functions and recursion.",
            passScore: 70
        );
        funcQuiz.Publish();
        db.Assessments.Add(funcQuiz);
        await db.SaveChangesAsync();
    }

    private static Question CreateMCQ(string text, Guid? conceptId, QuestionDifficulty difficulty,
        (string text, bool correct) a,
        (string text, bool correct) b,
        (string text, bool correct) c,
        (string text, bool correct) d)
    {
        var q = Question.Create(text, QuestionType.MultipleChoice, difficulty, conceptId, defaultPoints: 10);
        var opts = new[] { a, b, c, d };
        for (int i = 0; i < opts.Length; i++)
            q.Options.Add(QuestionOption.Create(q.Id, opts[i].text, opts[i].correct, i + 1));
        return q;
    }

    private static Question CreateTrueFalse(string text, Guid? conceptId, bool correctIsTrue)
    {
        var q = Question.Create(text, QuestionType.TrueFalse, QuestionDifficulty.Easy, conceptId, defaultPoints: 5);
        q.Options.Add(QuestionOption.Create(q.Id, "True", correctIsTrue, 1));
        q.Options.Add(QuestionOption.Create(q.Id, "False", !correctIsTrue, 2));
        return q;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PROJECTS
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedProjectsAsync(AppDbContext db)
    {
        if (await db.Projects.AnyAsync()) return;

        var projects = new[]
        {
            Project.Create("Build a Simple Calculator", "simple-calculator", ProjectDifficulty.Beginner, 3,
                "Create a calculator that handles basic arithmetic operations (+, -, *, /)."),
            Project.Create("Implement a To-Do List", "todo-list", ProjectDifficulty.Beginner, 5,
                "Build a to-do list application with add, remove, and mark-complete functionality."),
            Project.Create("Sorting Visualizer", "sorting-visualizer", ProjectDifficulty.Intermediate, 10,
                "Create a visual demonstration of sorting algorithms including bubble, merge, and quick sort."),
            Project.Create("Mini Database Engine", "mini-database", ProjectDifficulty.Advanced, 20,
                "Build a simplified in-memory database engine supporting basic SQL operations."),
        };

        foreach (var p in projects) { p.Publish(); db.Projects.Add(p); }
        await db.SaveChangesAsync();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CAREER DISCOVERY
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedCareerAsync(AppDbContext db)
    {
        if (await db.CareerProfiles.AnyAsync()) return;

        // Career profiles
        var backend = CareerProfile.Create("Backend Developer", "backend-developer",
            "Build server-side logic, APIs, databases, and the core systems that power applications.");
        var frontend = CareerProfile.Create("Frontend Developer", "frontend-developer",
            "Create beautiful, interactive user interfaces and web experiences.");
        var data = CareerProfile.Create("Data Scientist", "data-scientist",
            "Extract insights from data using statistics, machine learning, and visualization.");
        var ai = CareerProfile.Create("AI / ML Engineer", "ai-ml-engineer",
            "Build and train machine learning models and AI systems.");
        var mobile = CareerProfile.Create("Mobile Developer", "mobile-developer",
            "Build native or cross-platform mobile applications.");
        var devops = CareerProfile.Create("DevOps Engineer", "devops-engineer",
            "Automate deployment, manage infrastructure, and ensure system reliability.");
        var security = CareerProfile.Create("Cybersecurity Engineer", "cybersecurity-engineer",
            "Protect systems, networks, and data from digital threats.");

        var profiles = new[] { backend, frontend, data, ai, mobile, devops, security };
        db.CareerProfiles.AddRange(profiles);
        await db.SaveChangesAsync();

        // Career questions
        var q1 = CareerQuestion.Create("What type of work excites you most?", 1, categoryTag: "work-style");
        var q1o1 = CareerQuestionOption.Create(q1.Id, "Building APIs and server logic that power applications", 1);
        var q1o2 = CareerQuestionOption.Create(q1.Id, "Designing beautiful and interactive user interfaces", 2);
        var q1o3 = CareerQuestionOption.Create(q1.Id, "Analyzing data to find hidden patterns and insights", 3);
        var q1o4 = CareerQuestionOption.Create(q1.Id, "Training AI models to make intelligent decisions", 4);
        var q1o5 = CareerQuestionOption.Create(q1.Id, "Building apps people use on their phones every day", 5);
        q1.Options.Add(q1o1); q1.Options.Add(q1o2); q1.Options.Add(q1o3);
        q1.Options.Add(q1o4); q1.Options.Add(q1o5);

        var q2 = CareerQuestion.Create("How do you prefer to solve problems?", 2, categoryTag: "problem-solving");
        var q2o1 = CareerQuestionOption.Create(q2.Id, "Writing clean, structured code and system architecture", 1);
        var q2o2 = CareerQuestionOption.Create(q2.Id, "Thinking about how users feel and what looks good", 2);
        var q2o3 = CareerQuestionOption.Create(q2.Id, "Running experiments and analyzing results with data", 3);
        var q2o4 = CareerQuestionOption.Create(q2.Id, "Automating repetitive processes and improving efficiency", 4);
        q2.Options.Add(q2o1); q2.Options.Add(q2o2); q2.Options.Add(q2o3); q2.Options.Add(q2o4);

        var q3 = CareerQuestion.Create("Which of these topics do you enjoy learning about most?", 3, categoryTag: "interests");
        var q3o1 = CareerQuestionOption.Create(q3.Id, "Databases, APIs, and server infrastructure", 1);
        var q3o2 = CareerQuestionOption.Create(q3.Id, "CSS, animations, and user experience design", 2);
        var q3o3 = CareerQuestionOption.Create(q3.Id, "Statistics, probability, and data visualization", 3);
        var q3o4 = CareerQuestionOption.Create(q3.Id, "Neural networks, machine learning algorithms", 4);
        var q3o5 = CareerQuestionOption.Create(q3.Id, "Network security, encryption, and threat analysis", 5);
        q3.Options.Add(q3o1); q3.Options.Add(q3o2); q3.Options.Add(q3o3);
        q3.Options.Add(q3o4); q3.Options.Add(q3o5);

        var questions = new[] { q1, q2, q3 };
        db.CareerQuestions.AddRange(questions);
        await db.SaveChangesAsync();

        // Weighted scores per option to career profile mapping
        // This is the scoring engine, NOT "if A then Backend"
        var scores = new[]
        {
            // Q1 options
            CareerOptionScore.Create(q1o1.Id, backend.Id, 10),
            CareerOptionScore.Create(q1o1.Id, devops.Id, 5),
            CareerOptionScore.Create(q1o2.Id, frontend.Id, 10),
            CareerOptionScore.Create(q1o2.Id, mobile.Id, 5),
            CareerOptionScore.Create(q1o3.Id, data.Id, 10),
            CareerOptionScore.Create(q1o3.Id, ai.Id, 5),
            CareerOptionScore.Create(q1o4.Id, ai.Id, 10),
            CareerOptionScore.Create(q1o4.Id, data.Id, 5),
            CareerOptionScore.Create(q1o5.Id, mobile.Id, 10),
            CareerOptionScore.Create(q1o5.Id, frontend.Id, 3),
            // Q2 options
            CareerOptionScore.Create(q2o1.Id, backend.Id, 10),
            CareerOptionScore.Create(q2o1.Id, devops.Id, 5),
            CareerOptionScore.Create(q2o2.Id, frontend.Id, 10),
            CareerOptionScore.Create(q2o2.Id, mobile.Id, 8),
            CareerOptionScore.Create(q2o3.Id, data.Id, 10),
            CareerOptionScore.Create(q2o3.Id, ai.Id, 7),
            CareerOptionScore.Create(q2o4.Id, devops.Id, 10),
            CareerOptionScore.Create(q2o4.Id, backend.Id, 3),
            // Q3 options
            CareerOptionScore.Create(q3o1.Id, backend.Id, 10),
            CareerOptionScore.Create(q3o1.Id, devops.Id, 7),
            CareerOptionScore.Create(q3o2.Id, frontend.Id, 10),
            CareerOptionScore.Create(q3o2.Id, mobile.Id, 5),
            CareerOptionScore.Create(q3o3.Id, data.Id, 10),
            CareerOptionScore.Create(q3o3.Id, ai.Id, 7),
            CareerOptionScore.Create(q3o4.Id, ai.Id, 10),
            CareerOptionScore.Create(q3o4.Id, data.Id, 5),
            CareerOptionScore.Create(q3o5.Id, security.Id, 10),
            CareerOptionScore.Create(q3o5.Id, devops.Id, 3),
        };

        db.CareerOptionScores.AddRange(scores);
        await db.SaveChangesAsync();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSCRIPTION PLANS
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedSubscriptionPlansAsync(AppDbContext db)
    {
        if (await db.SubscriptionPlans.AnyAsync())
        {
            var readyPlan = await db.SubscriptionPlans.FirstOrDefaultAsync(p => p.Id == "plan-ready");
            if (readyPlan != null && readyPlan.FeaturesEnJson.Contains("All 11 CS Learning Paths", StringComparison.Ordinal))
            {
                readyPlan.Update(
                    readyPlan.Name,
                    readyPlan.Badge,
                    readyPlan.DescriptionEn,
                    readyPlan.DescriptionAr,
                    readyPlan.MonthlyPrice,
                    readyPlan.OriginalMonthlyPrice,
                    readyPlan.AnnualPrice,
                    readyPlan.OriginalAnnualPrice,
                    """["Full Access to All 9 CS Learning Paths","Discrete Math & Competitive Programming Sheets","Expanded Question Bank Analytics & AI Tutor","Verified Track Completion Certificates"]""",
                    """["وصول كامل لجميع المسارات التعليمية الـ 9","شيتات Discrete Math وCompetitive Programming","تحليلات بنك الأسئلة ومساعد AI الموسع","شهادات إتمام المسارات الموثقة"]""",
                    """{"tier":"ready","maxPaths":9,"aiMessagesPerDay":100,"certificates":true,"cpPractice":true}""",
                    readyPlan.IsPopular,
                    readyPlan.IsActive,
                    readyPlan.DisplayOrder
                );
                await db.SaveChangesAsync();
            }
            return;
        }

        var plans = new[]
        {
            SubscriptionPlan.Create(
                id: "plan-free",
                name: "Free",
                descriptionEn: "Open access to core Computer Science foundations, visualizers, and diagnostic testing.",
                descriptionAr: "وصول مجاني إلى الأساسيات الأولى لـ Computer Science والـ Visualizers والاختبار التشخيصي.",
                monthlyPrice: 0m,
                originalMonthlyPrice: null,
                annualPrice: 0m,
                originalAnnualPrice: null,
                featuresEnJson: """["Access to Pre-Programming & Programming Fundamentals","Interactive CS Visualizers","Skill Diagnostic Assessment","Persistent Learning Progress & Streak"]""",
                featuresArJson: """["الوصول إلى مسار ما قبل البرمجة وأساسيات البرمجة","أدوات التمثيل المرئي التفاعلية (Visualizers)","الاختبار التشخيصي لتحديد المستوى","حفظ التقدم وسلاسل التعلم اليومية"]""",
                entitlementsJson: """{"tier":"free","maxPaths":2,"aiMessagesPerDay":5,"certificates":false,"cpPractice":false}""",
                displayOrder: 1,
                badge: "Starter",
                isPopular: false
            ),
            SubscriptionPlan.Create(
                id: "plan-mini",
                name: "Mini",
                descriptionEn: "For learners building strong core Software Engineering & OOP foundations.",
                descriptionAr: "مناسب للمتعلمين لبناء أساس قوي في OOP وData Structures وAlgorithms الأساسية.",
                monthlyPrice: 9m,
                originalMonthlyPrice: 14m,
                annualPrice: 84m,
                originalAnnualPrice: 132m,
                featuresEnJson: """["Access to Core Tracks (Pre-Programming through Algorithms)","All Interactive Lab Visualizers","Structured Section Checkpoints & Quizzes","Email Progress Digests"]""",
                featuresArJson: """["الوصول إلى المسارات الأساسية حتى Algorithms","جميع الـ Visualizers التفاعلية","أسئلة التحقق واختبارات الدروس المنهجية","تقارير التقدم الدورية"]""",
                entitlementsJson: """{"tier":"mini","maxPaths":6,"aiMessagesPerDay":25,"certificates":false,"cpPractice":false}""",
                displayOrder: 2,
                badge: "Value Start",
                isPopular: false
            ),
            SubscriptionPlan.Create(
                id: "plan-ready",
                name: "Ready",
                descriptionEn: "Full CS curriculum mastery across Competitive Programming, Databases, OS & Networks.",
                descriptionAr: "خطة الإتقان الكاملة لجميع المسارات بما فيها Competitive Programming وDatabases وNetworks وOS.",
                monthlyPrice: 19m,
                originalMonthlyPrice: 29m,
                annualPrice: 180m,
                originalAnnualPrice: 288m,
                featuresEnJson: """["Full Access to All 9 CS Learning Paths","Discrete Math & Competitive Programming Sheets","Expanded Question Bank Analytics & AI Tutor","Verified Track Completion Certificates"]""",
                featuresArJson: """["وصول كامل لجميع المسارات التعليمية الـ 9","شيتات Discrete Math وCompetitive Programming","تحليلات بنك الأسئلة ومساعد AI الموسع","شهادات إتمام المسارات الموثقة"]""",
                entitlementsJson: """{"tier":"ready","maxPaths":9,"aiMessagesPerDay":100,"certificates":true,"cpPractice":true}""",
                displayOrder: 3,
                badge: "Most Popular",
                isPopular: true
            ),
            SubscriptionPlan.Create(
                id: "plan-high",
                name: "High",
                descriptionEn: "Intensive mastery tier with unlimited AI guidance, custom practice sets & priority feedback.",
                descriptionAr: "المستوى الاحترافي مع إرشاد AI غير محدود ومجموعات تدريب مخصصة ومتابعة أولوية.",
                monthlyPrice: 34m,
                originalMonthlyPrice: 49m,
                annualPrice: 324m,
                originalAnnualPrice: 490m,
                featuresEnJson: """["Everything in Ready Tier","Unlimited AI Tutor Context & Code Walkthroughs","Full System Design & Architecture Tracks","Priority Support & Portfolio Project Review"]""",
                featuresArJson: """["كل مميزات باقة Ready","مساعد AI غير محدود ومراجعة الكود","مسارات Architecture وSystem Design الكاملة","دعم أولوية ومراجعة المشاريع العملية"]""",
                entitlementsJson: """{"tier":"high","maxPaths":-1,"aiMessagesPerDay":-1,"certificates":true,"cpPractice":true,"priorityReview":true}""",
                displayOrder: 4,
                badge: "Pro Mastery",
                isPopular: false
            )
        };

        db.SubscriptionPlans.AddRange(plans);
        await db.SaveChangesAsync();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GAMIFICATION
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedGamificationAsync(AppDbContext db)
    {
        var specs = new[]
        {
            (Code: "first_unit", Name: "First Steps", TitleAr: "الخطوة الأولى", Desc: "Complete your first learning unit.", DescAr: "أكمل وحدتك التعليمية الأولى.", Trigger: AchievementTrigger.FirstLesson, Xp: 50, Category: "Learning", Threshold: 1),
            (Code: "three_units", Name: "Momentum Builder", TitleAr: "باني الزخم", Desc: "Complete 3 reusable learning units across the curriculum.", DescAr: "أكمل 3 وحدات تعليمية في المنهج.", Trigger: AchievementTrigger.ConceptMastered, Xp: 100, Category: "Learning", Threshold: 3),
            (Code: "ten_units", Name: "Curriculum Explorer", TitleAr: "مستكشف المنهج", Desc: "Complete 10 reusable learning units across paths.", DescAr: "أكمل 10 وحدات تعليمية عبر المسارات.", Trigger: AchievementTrigger.ConceptMastered, Xp: 250, Category: "Learning", Threshold: 10),
            (Code: "quiz_ace", Name: "Precision Master", TitleAr: "إتقان التقييم", Desc: "Score 90% or higher on a lesson mastery quiz.", DescAr: "احصل على 90% فأكثر في اختبار وحدة تعليمية.", Trigger: AchievementTrigger.Custom, Xp: 150, Category: "Mastery", Threshold: 90),
            (Code: "first_assessment", Name: "Quiz Taker", TitleAr: "اجتياز الاختبار", Desc: "Complete your first assessment or diagnostic check.", DescAr: "أكمل أول اختبار تقييمي أو تشخيصي.", Trigger: AchievementTrigger.FirstAssessment, Xp: 100, Category: "Assessment", Threshold: 1),
            (Code: "streak_3", Name: "3-Day Habit", TitleAr: "عادة 3 أيام", Desc: "Study 3 days in a row.", DescAr: "حافظ على التعلم لمدة 3 أيام متتالية.", Trigger: AchievementTrigger.Custom, Xp: 80, Category: "Consistency", Threshold: 3),
            (Code: "streak_7", Name: "On a Roll!", TitleAr: "سلسلة أسبوعية!", Desc: "Study 7 days in a row.", DescAr: "تعلّم لمدة 7 أيام متتالية.", Trigger: AchievementTrigger.StreakDays7, Xp: 200, Category: "Consistency", Threshold: 7),
            (Code: "streak_30", Name: "Dedicated Learner", TitleAr: "المتعلم المثابر", Desc: "Study 30 days in a row.", DescAr: "حافظ على التعلم لمدة 30 يوماً متتالية.", Trigger: AchievementTrigger.StreakDays30, Xp: 500, Category: "Consistency", Threshold: 30),
            (Code: "path_complete", Name: "Path Complete!", TitleAr: "إتمام مسار!", Desc: "Complete an entire learning path.", DescAr: "أكمل مساراً تعليمياً كاملاً.", Trigger: AchievementTrigger.PathCompleted, Xp: 1000, Category: "Mastery", Threshold: 1),
            (Code: "builder", Name: "Builder", TitleAr: "الباني العملي", Desc: "Submit your first project.", DescAr: "قدّم مشروعك العملي الأول.", Trigger: AchievementTrigger.ProjectSubmitted, Xp: 300, Category: "Practice", Threshold: 1),
            (Code: "career_discoverer", Name: "Career Discoverer", TitleAr: "مكتشف المسار المهني", Desc: "Complete the career discovery assessment.", DescAr: "أكمل اختبار اكتشاف المسار المهني.", Trigger: AchievementTrigger.CareerAssessmentCompleted, Xp: 200, Category: "Discovery", Threshold: 1)
        };

        var existing = await db.Achievements.ToListAsync();
        var added = false;

        foreach (var s in specs)
        {
            var match = existing.FirstOrDefault(a =>
                string.Equals(a.Code, s.Code, StringComparison.OrdinalIgnoreCase) ||
                string.Equals(a.Name, s.Name, StringComparison.OrdinalIgnoreCase));

            if (match == null)
            {
                db.Achievements.Add(Achievement.Create(
                    s.Name, s.Desc, s.Trigger, s.Xp,
                    code: s.Code, titleAr: s.TitleAr, descriptionAr: s.DescAr,
                    category: s.Category, threshold: s.Threshold
                ));
                added = true;
            }
            else if (string.IsNullOrWhiteSpace(match.Code))
            {
                // Backfill Code/Arabic metadata via EF change tracker SQL or update helper
                await db.Database.ExecuteSqlInterpolatedAsync($"""
                    UPDATE gamification.achievements
                    SET code = {s.Code},
                        title_ar = COALESCE(title_ar, {s.TitleAr}),
                        description_ar = COALESCE(description_ar, {s.DescAr}),
                        category = COALESCE(category, {s.Category}),
                        threshold = {s.Threshold}
                    WHERE id = {match.Id};
                """);
            }
        }

        if (added)
        {
            await db.SaveChangesAsync();
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SAMPLE USERS & PLATFORM OWNER BOOTSTRAP
    // ─────────────────────────────────────────────────────────────────────────
    private static async Task SeedUsersAsync(AppDbContext db, IConfiguration? configuration)
    {
        var adminRole = await db.Roles.FirstAsync(r => r.Name == "Admin");
        var superAdminRole = await db.Roles.FirstAsync(r => r.Name == "SuperAdmin");
        var userRole = await db.Roles.FirstAsync(r => r.Name == "User");
        var learnerRole = await db.Roles.FirstAsync(r => r.Name == "Learner");

        // Ensure platform owner account (admin@learncs.dev) exists, is active, and holds SuperAdmin + Admin roles
        var admin = await db.Users
            .Include(u => u.UserRoles)
            .FirstOrDefaultAsync(u => u.Email == "admin@learncs.dev");

        if (admin == null)
        {
            var bootstrapPassword = GetConfigOrEnv(configuration, "LEARNCS_DEV_ADMIN_PASSWORD", "Bootstrap:SuperAdminPassword")
                ?? throw new InvalidOperationException(
                    "SuperAdmin bootstrap password is not configured. Set environment variable LEARNCS_DEV_ADMIN_PASSWORD "
                    + "or local secret 'Bootstrap:SuperAdminPassword' (via dotnet user-secrets) before first startup.");
            admin = User.Create("admin", "admin@learncs.dev", BCrypt.Net.BCrypt.HashPassword(bootstrapPassword));
            admin.VerifyEmail();
            db.Users.Add(admin);
            await db.SaveChangesAsync();

            db.UserProfiles.Add(UserProfile.Create(admin.Id, "System", "Admin"));
            db.UserSettings.Add(UserSettings.CreateDefaults(admin.Id));
            db.StudyStreaks.Add(StudyStreak.Create(admin.Id));
        }
        else
        {
            if (admin.AccountStatus != AccountStatus.Active)
            {
                admin.Activate();
            }
            if (!admin.EmailVerified)
            {
                admin.VerifyEmail();
            }
            var resetDevPassword = GetConfigOrEnv(configuration, "LEARNCS_RESET_DEV_ADMIN", "Bootstrap:ResetSuperAdmin");
            if (string.Equals(resetDevPassword, "true", StringComparison.OrdinalIgnoreCase))
            {
                var newPassword = GetConfigOrEnv(configuration, "LEARNCS_DEV_ADMIN_PASSWORD", "Bootstrap:SuperAdminPassword")
                    ?? throw new InvalidOperationException(
                        "SuperAdmin reset is enabled, but LEARNCS_DEV_ADMIN_PASSWORD / Bootstrap:SuperAdminPassword is not set.");
                admin.UpdatePasswordHash(BCrypt.Net.BCrypt.HashPassword(newPassword));
                admin.ClearLockout();
            }
            else if (admin.FailedLoginAttempts > 0 || admin.IsLockedOut())
            {
                admin.ClearLockout();
            }
        }

        if (!await db.UserRoles.AnyAsync(ur => ur.UserId == admin.Id && ur.RoleId == adminRole.Id))
        {
            db.UserRoles.Add(UserRole.Create(admin.Id, adminRole.Id));
        }
        if (!await db.UserRoles.AnyAsync(ur => ur.UserId == admin.Id && ur.RoleId == superAdminRole.Id))
        {
            db.UserRoles.Add(UserRole.Create(admin.Id, superAdminRole.Id));
        }

        // Backfill any existing users that were registered without a persisted UserRole record
        var usersWithoutRoles = await db.Users
            .Where(u => !db.UserRoles.Any(ur => ur.UserId == u.Id))
            .Select(u => u.Id)
            .ToListAsync();

        foreach (var uid in usersWithoutRoles)
        {
            db.UserRoles.Add(UserRole.Create(uid, userRole.Id));
        }

        await db.SaveChangesAsync();

        // Backfill default Free subscription for users without an active UserSubscription record
        var usersWithSub = await db.UserSubscriptions
            .Select(s => s.UserId)
            .ToHashSetAsync();
        var allUserIds = await db.Users.Select(u => u.Id).ToListAsync();
        var subAdded = false;
        foreach (var uid in allUserIds)
        {
            if (!usersWithSub.Contains(uid))
            {
                var isPlatformOwner = uid == admin.Id;
                db.UserSubscriptions.Add(UserSubscription.Create(
                    uid,
                    isPlatformOwner ? "plan-high" : "plan-free",
                    SubscriptionStatus.Active,
                    isPlatformOwner ? "OwnerComplimentary" : "Free",
                    paymentStatus: isPlatformOwner ? "OwnerEntitlement" : "FreeTier"
                ));
                subAdded = true;
            }
        }
        if (subAdded)
        {
            await db.SaveChangesAsync();
        }

        // Seed demo learners only on fresh empty user databases (beyond admin)
        if (await db.Users.CountAsync() > 1) return;

        var devDemoPass1 = GetConfigOrEnv(configuration, "LEARNCS_DEV_LEARNER_PASSWORD", "Bootstrap:DemoLearnerPassword");
        if (string.IsNullOrWhiteSpace(devDemoPass1)) return;
        var ahmed = User.Create("ahmed_learner", "ahmed@learncs.dev", BCrypt.Net.BCrypt.HashPassword(devDemoPass1));
        ahmed.VerifyEmail();
        db.Users.Add(ahmed);
        await db.SaveChangesAsync();

        db.UserRoles.Add(UserRole.Create(ahmed.Id, learnerRole.Id));
        db.UserProfiles.Add(UserProfile.Create(ahmed.Id, "Ahmed", "Mohamed"));
        db.UserSettings.Add(UserSettings.CreateDefaults(ahmed.Id));
        db.UserGoals.Add(UserGoal.Create(ahmed.Id, "Become a Backend Developer", "I want to build REST APIs and work with databases."));
        db.StudyStreaks.Add(StudyStreak.Create(ahmed.Id));
        db.LearnerLevelRecords.Add(LearnerLevelRecord.Create(ahmed.Id));

        var devDemoPass2 = GetConfigOrEnv(configuration, "LEARNCS_DEV_LEARNER2_PASSWORD", "Bootstrap:DemoLearner2Password");
        if (string.IsNullOrWhiteSpace(devDemoPass2))
        {
            await db.SaveChangesAsync();
            return;
        }
        var sara = User.Create("sara_dev", "sara@learncs.dev", BCrypt.Net.BCrypt.HashPassword(devDemoPass2));
        sara.VerifyEmail();
        db.Users.Add(sara);
        await db.SaveChangesAsync();

        db.UserRoles.Add(UserRole.Create(sara.Id, learnerRole.Id));
        db.UserProfiles.Add(UserProfile.Create(sara.Id, "Sara", "Ahmed"));
        db.UserSettings.Add(UserSettings.CreateDefaults(sara.Id));
        db.UserGoals.Add(UserGoal.Create(sara.Id, "Learn Data Science", "I enjoy working with data and want to learn ML."));
        db.StudyStreaks.Add(StudyStreak.Create(sara.Id));
        db.LearnerLevelRecords.Add(LearnerLevelRecord.Create(sara.Id));

        await db.SaveChangesAsync();

        // Enroll Ahmed in CS Foundations
        var path = await db.LearningPaths.FirstOrDefaultAsync(p => p.Slug == "cs-foundations");
        if (path != null)
        {
            db.PathEnrollments.Add(PathEnrollment.Create(ahmed.Id, path.Id));
        }

        // Ahmed has completed first lesson
        var firstLesson = await db.Lessons.OrderBy(l => l.DisplayOrder).FirstOrDefaultAsync();
        if (firstLesson != null)
        {
            var lessonProgress = LessonProgress.Create(ahmed.Id, firstLesson.Id);
            lessonProgress.Start();
            lessonProgress.Complete(900);
            db.LessonProgresses.Add(lessonProgress);

            var varConcept = await db.Concepts.FirstOrDefaultAsync(c => c.Slug == "variables-data-types");
            if (varConcept != null)
            {
                var mastery = ConceptMastery.Create(ahmed.Id, varConcept.Id);
                mastery.UpdateFromEvidence(75, false, "{\"source\":\"lesson\"}");
                db.ConceptMasteries.Add(mastery);
            }

            db.UserXpEvents.Add(UserXpEvent.Create(ahmed.Id, 50, "lesson_completion", firstLesson.Id, "Completed first lesson"));
            db.UserXpEvents.Add(UserXpEvent.Create(ahmed.Id, 10, "daily_login", null, "Daily login bonus"));
        }

        await db.SaveChangesAsync();
    }
}
