using LearnCS.Domain.Identity;
using LearnCS.Domain.Knowledge;
using LearnCS.Domain.Learning;
using LearnCS.Domain.Assessment;
using LearnCS.Domain.Curriculum;
using LearnCS.Domain.Intelligence;
using LearnCS.Domain.Gamification;
using LearnCS.Domain.Career;
using LearnCS.Domain.Platform;
using LearnCS.Domain.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // ── Identity ───────────────────────────────────────────────────────────────
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    public DbSet<UserSettings> UserSettings => Set<UserSettings>();
    public DbSet<UserGoal> UserGoals => Set<UserGoal>();

    // ── Knowledge Graph ────────────────────────────────────────────────────────
    public DbSet<Concept> Concepts => Set<Concept>();
    public DbSet<ConceptRelationship> ConceptRelationships => Set<ConceptRelationship>();
    public DbSet<LearningObjective> LearningObjectives => Set<LearningObjective>();
    public DbSet<Tag> Tags => Set<Tag>();
    public DbSet<ConceptTag> ConceptTags => Set<ConceptTag>();

    // ── Learning ───────────────────────────────────────────────────────────────
    public DbSet<LearningPath> LearningPaths => Set<LearningPath>();
    public DbSet<Track> Tracks => Set<Track>();
    public DbSet<Module> Modules => Set<Module>();
    public DbSet<Lesson> Lessons => Set<Lesson>();
    public DbSet<LearningResource> LearningResources => Set<LearningResource>();
    public DbSet<LessonResource> LessonResources => Set<LessonResource>();
    public DbSet<PathEnrollment> PathEnrollments => Set<PathEnrollment>();
    public DbSet<LessonProgress> LessonProgresses => Set<LessonProgress>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectConcept> ProjectConcepts => Set<ProjectConcept>();
    public DbSet<ProjectSubmission> ProjectSubmissions => Set<ProjectSubmission>();

    // ── Assessment ─────────────────────────────────────────────────────────────
    public DbSet<Assessment> Assessments => Set<Assessment>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<QuestionOption> QuestionOptions => Set<QuestionOption>();
    public DbSet<AssessmentQuestion> AssessmentQuestions => Set<AssessmentQuestion>();
    public DbSet<AssessmentAttempt> AssessmentAttempts => Set<AssessmentAttempt>();
    public DbSet<AttemptAnswer> AttemptAnswers => Set<AttemptAnswer>();

    // ── Learning Intelligence ─────────────────────────────────────────────────
    public DbSet<ConceptMastery> ConceptMasteries => Set<ConceptMastery>();
    public DbSet<LearnerLevelRecord> LearnerLevelRecords => Set<LearnerLevelRecord>();
    public DbSet<LearningRecommendation> LearningRecommendations => Set<LearningRecommendation>();
    public DbSet<LearningRoadmap> LearningRoadmaps => Set<LearningRoadmap>();
    public DbSet<RoadmapStep> RoadmapSteps => Set<RoadmapStep>();

    // ── Gamification ───────────────────────────────────────────────────────────
    public DbSet<Badge> Badges => Set<Badge>();
    public DbSet<Achievement> Achievements => Set<Achievement>();
    public DbSet<UserAchievement> UserAchievements => Set<UserAchievement>();
    public DbSet<UserXpEvent> UserXpEvents => Set<UserXpEvent>();
    public DbSet<StudyStreak> StudyStreaks => Set<StudyStreak>();

    // ── Career ─────────────────────────────────────────────────────────────────
    public DbSet<CareerProfile> CareerProfiles => Set<CareerProfile>();
    public DbSet<CareerFactor> CareerFactors => Set<CareerFactor>();
    public DbSet<CareerQuestion> CareerQuestions => Set<CareerQuestion>();
    public DbSet<CareerQuestionOption> CareerQuestionOptions => Set<CareerQuestionOption>();
    public DbSet<CareerOptionScore> CareerOptionScores => Set<CareerOptionScore>();
    public DbSet<CareerAssessmentAttempt> CareerAssessmentAttempts => Set<CareerAssessmentAttempt>();
    public DbSet<CareerAnswerResponse> CareerAnswerResponses => Set<CareerAnswerResponse>();
    public DbSet<CareerRecommendation> CareerRecommendations => Set<CareerRecommendation>();

    // ── Platform ───────────────────────────────────────────────────────────────
    public DbSet<AiConversation> AiConversations => Set<AiConversation>();
    public DbSet<AiMessage> AiMessages => Set<AiMessage>();
    public DbSet<AiContextSnapshot> AiContextSnapshots => Set<AiContextSnapshot>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    // ── Canonical Curriculum & Quiz Persistence ──────────────────────────────
    public DbSet<CurriculumPath> CurriculumPaths => Set<CurriculumPath>();
    public DbSet<CurriculumModule> CurriculumModules => Set<CurriculumModule>();
    public DbSet<CanonicalConceptRecord> CanonicalConcepts => Set<CanonicalConceptRecord>();
    public DbSet<ReusableUnit> ReusableUnits => Set<ReusableUnit>();
    public DbSet<ModuleUnitPlacement> ModuleUnitPlacements => Set<ModuleUnitPlacement>();
    public DbSet<UnitSection> UnitSections => Set<UnitSection>();
    public DbSet<QuestionBankItem> QuestionBankItems => Set<QuestionBankItem>();
    public DbSet<QuestionBankOption> QuestionBankOptions => Set<QuestionBankOption>();
    public DbSet<UnitQuestionMapping> UnitQuestionMappings => Set<UnitQuestionMapping>();
    public DbSet<UserUnitProgress> UserUnitProgresses => Set<UserUnitProgress>();
    public DbSet<UserSectionProgress> UserSectionProgresses => Set<UserSectionProgress>();
    public DbSet<UnitQuizAttempt> UnitQuizAttempts => Set<UnitQuizAttempt>();
    public DbSet<UnitQuizAttemptAnswer> UnitQuizAttemptAnswers => Set<UnitQuizAttemptAnswer>();

    // ── Subscriptions ────────────────────────────────────────────────────────
    public DbSet<SubscriptionPlan> SubscriptionPlans => Set<SubscriptionPlan>();
    public DbSet<UserSubscription> UserSubscriptions => Set<UserSubscription>();
    public DbSet<SubscriptionHistory> SubscriptionHistories => Set<SubscriptionHistory>();
    public DbSet<SubscriptionRequest> SubscriptionRequests => Set<SubscriptionRequest>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // Global convention: any property named UpdatedAt must map to snake_case updated_at.
        // This covers entities whose configuration files don't explicitly map this inherited property.
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var updatedAtProp = entityType.FindProperty("UpdatedAt");
            if (updatedAtProp != null && updatedAtProp.GetColumnName() == "UpdatedAt")
            {
                updatedAtProp.SetColumnName("updated_at");
            }
        }
    }
}
