using LearnCS.Domain.Intelligence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Intelligence;

public class ConceptMasteryConfiguration : IEntityTypeConfiguration<ConceptMastery>
{
    public void Configure(EntityTypeBuilder<ConceptMastery> builder)
    {
        builder.ToTable("concept_masteries", "intelligence");
        builder.HasKey(cm => cm.Id);
        builder.Property(cm => cm.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(cm => cm.UserId).HasColumnName("user_id");
        builder.Property(cm => cm.ConceptId).HasColumnName("concept_id");
        builder.Property(cm => cm.MasteryScore).HasColumnName("mastery_score").HasPrecision(5, 2);
        builder.Property(cm => cm.Confidence).HasColumnName("confidence").HasPrecision(4, 3);
        builder.Property(cm => cm.LastEvaluatedAt).HasColumnName("last_evaluated_at");
        builder.Property(cm => cm.EvidenceJson).HasColumnName("evidence_json");
        builder.Property(cm => cm.TotalAttempts).HasColumnName("total_attempts");
        builder.Property(cm => cm.CorrectAnswers).HasColumnName("correct_answers");
        builder.Property(cm => cm.CreatedAt).HasColumnName("created_at");
        builder.Property(cm => cm.UpdatedAt).HasColumnName("updated_at");
        builder.Ignore(cm => cm.IsMastered);
        builder.Ignore(cm => cm.IsWeak);
        builder.HasIndex(cm => new { cm.UserId, cm.ConceptId }).IsUnique()
            .HasDatabaseName("ix_concept_masteries_user_concept");
        builder.HasIndex(cm => cm.UserId).HasDatabaseName("ix_concept_masteries_user_id");
        builder.HasIndex(cm => cm.MasteryScore).HasDatabaseName("ix_concept_masteries_score");
    }
}

public class LearnerLevelRecordConfiguration : IEntityTypeConfiguration<LearnerLevelRecord>
{
    public void Configure(EntityTypeBuilder<LearnerLevelRecord> builder)
    {
        builder.ToTable("learner_level_records", "intelligence");
        builder.HasKey(l => l.Id);
        builder.Property(l => l.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(l => l.UserId).HasColumnName("user_id");
        builder.Property(l => l.Level).HasColumnName("level").HasConversion<int>();
        builder.Property(l => l.XpTotal).HasColumnName("xp_total");
        builder.Property(l => l.OverallMasteryScore).HasColumnName("overall_mastery_score").HasPrecision(5, 2);
        builder.Property(l => l.EvaluatedAt).HasColumnName("evaluated_at");
        builder.Property(l => l.SummaryJson).HasColumnName("summary_json");
        builder.Property(l => l.CreatedAt).HasColumnName("created_at");
        builder.Property(l => l.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(l => l.UserId).HasDatabaseName("ix_learner_level_records_user_id");
    }
}

public class LearningRecommendationConfiguration : IEntityTypeConfiguration<LearningRecommendation>
{
    public void Configure(EntityTypeBuilder<LearningRecommendation> builder)
    {
        builder.ToTable("learning_recommendations", "intelligence");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(r => r.UserId).HasColumnName("user_id");
        builder.Property(r => r.Type).HasColumnName("type").HasConversion<int>();
        builder.Property(r => r.ConceptId).HasColumnName("concept_id");
        builder.Property(r => r.LessonId).HasColumnName("lesson_id");
        builder.Property(r => r.ProjectId).HasColumnName("project_id");
        builder.Property(r => r.Reason).HasColumnName("reason").HasMaxLength(500);
        builder.Property(r => r.Score).HasColumnName("score").HasPrecision(5, 2);
        builder.Property(r => r.IsActed).HasColumnName("is_acted");
        builder.Property(r => r.ActedAt).HasColumnName("acted_at");
        builder.Property(r => r.IsActive).HasColumnName("is_active");
        builder.Property(r => r.CreatedAt).HasColumnName("created_at");
        builder.Property(r => r.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(r => r.UserId).HasDatabaseName("ix_learning_recommendations_user_id");
        builder.HasIndex(r => new { r.UserId, r.IsActive }).HasDatabaseName("ix_learning_recommendations_user_active");
    }
}

public class LearningRoadmapConfiguration : IEntityTypeConfiguration<LearningRoadmap>
{
    public void Configure(EntityTypeBuilder<LearningRoadmap> builder)
    {
        builder.ToTable("learning_roadmaps", "intelligence");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(r => r.UserId).HasColumnName("user_id");
        builder.Property(r => r.Title).HasColumnName("title").HasMaxLength(200);
        builder.Property(r => r.IsActive).HasColumnName("is_active");
        builder.Property(r => r.BasedOnAttemptId).HasColumnName("based_on_attempt_id");
        builder.Property(r => r.GenerationContextJson).HasColumnName("generation_context_json");
        builder.Property(r => r.CreatedAt).HasColumnName("created_at");
        builder.Property(r => r.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(r => r.UserId).HasDatabaseName("ix_learning_roadmaps_user_id");
        builder.HasIndex(r => new { r.UserId, r.IsActive }).HasDatabaseName("ix_learning_roadmaps_user_active");
    }
}

public class RoadmapStepConfiguration : IEntityTypeConfiguration<RoadmapStep>
{
    public void Configure(EntityTypeBuilder<RoadmapStep> builder)
    {
        builder.ToTable("roadmap_steps", "intelligence");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(s => s.RoadmapId).HasColumnName("roadmap_id");
        builder.Property(s => s.ConceptId).HasColumnName("concept_id");
        builder.Property(s => s.LessonId).HasColumnName("lesson_id");
        builder.Property(s => s.DisplayOrder).HasColumnName("display_order");
        builder.Property(s => s.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(s => s.Reason).HasColumnName("reason").HasMaxLength(500);
        builder.Property(s => s.CompletedAt).HasColumnName("completed_at");
        builder.Property(s => s.CreatedAt).HasColumnName("created_at");
        builder.Property(s => s.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(s => s.Roadmap).WithMany(r => r.Steps)
            .HasForeignKey(s => s.RoadmapId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(s => s.RoadmapId).HasDatabaseName("ix_roadmap_steps_roadmap_id");
    }
}
