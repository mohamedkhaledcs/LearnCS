using LearnCS.Domain.Curriculum;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Curriculum;

public class CurriculumPathConfiguration : IEntityTypeConfiguration<CurriculumPath>
{
    public void Configure(EntityTypeBuilder<CurriculumPath> builder)
    {
        builder.ToTable("curriculum_paths", "learning");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).HasColumnName("id").HasMaxLength(100);
        builder.Property(p => p.TitleEn).HasColumnName("title_en").HasMaxLength(200).IsRequired();
        builder.Property(p => p.TitleAr).HasColumnName("title_ar").HasMaxLength(200).IsRequired();
        builder.Property(p => p.DescriptionEn).HasColumnName("description_en").HasMaxLength(2000).IsRequired();
        builder.Property(p => p.DescriptionAr).HasColumnName("description_ar").HasMaxLength(2000).IsRequired();
        builder.Property(p => p.TargetAudienceEn).HasColumnName("target_audience_en").HasMaxLength(500);
        builder.Property(p => p.TargetAudienceAr).HasColumnName("target_audience_ar").HasMaxLength(500);
        builder.Property(p => p.Category).HasColumnName("category").HasMaxLength(100).IsRequired();
        builder.Property(p => p.DisplayOrder).HasColumnName("display_order");
        builder.Property(p => p.PrerequisitesJson).HasColumnName("prerequisites_json");
        builder.Property(p => p.RecommendedNextPathsJson).HasColumnName("recommended_next_paths_json");
        builder.Property(p => p.PublishStatus).HasColumnName("publish_status").HasConversion<int>();
        builder.Property(p => p.CreatedAt).HasColumnName("created_at");
        builder.Property(p => p.UpdatedAt).HasColumnName("updated_at");
    }
}

public class CurriculumModuleConfiguration : IEntityTypeConfiguration<CurriculumModule>
{
    public void Configure(EntityTypeBuilder<CurriculumModule> builder)
    {
        builder.ToTable("curriculum_modules", "learning");
        builder.HasKey(m => m.Id);
        builder.Property(m => m.Id).HasColumnName("id").HasMaxLength(120);
        builder.Property(m => m.PathId).HasColumnName("path_id").HasMaxLength(100).IsRequired();
        builder.Property(m => m.TitleEn).HasColumnName("title_en").HasMaxLength(200).IsRequired();
        builder.Property(m => m.TitleAr).HasColumnName("title_ar").HasMaxLength(200).IsRequired();
        builder.Property(m => m.DescriptionEn).HasColumnName("description_en").HasMaxLength(1000).IsRequired();
        builder.Property(m => m.DescriptionAr).HasColumnName("description_ar").HasMaxLength(1000).IsRequired();
        builder.Property(m => m.DisplayOrder).HasColumnName("display_order");
        builder.Property(m => m.CreatedAt).HasColumnName("created_at");
        builder.Property(m => m.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(m => m.Path).WithMany(p => p.Modules).HasForeignKey(m => m.PathId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(m => m.PathId).HasDatabaseName("ix_curriculum_modules_path_id");
    }
}

public class CanonicalConceptRecordConfiguration : IEntityTypeConfiguration<CanonicalConceptRecord>
{
    public void Configure(EntityTypeBuilder<CanonicalConceptRecord> builder)
    {
        builder.ToTable("canonical_concepts", "knowledge");
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id).HasColumnName("id").HasMaxLength(120);
        builder.Property(c => c.TitleEn).HasColumnName("title_en").HasMaxLength(200).IsRequired();
        builder.Property(c => c.TitleAr).HasColumnName("title_ar").HasMaxLength(200).IsRequired();
        builder.Property(c => c.DescriptionEn).HasColumnName("description_en").HasMaxLength(2000).IsRequired();
        builder.Property(c => c.DescriptionAr).HasColumnName("description_ar").HasMaxLength(2000).IsRequired();
        builder.Property(c => c.Domain).HasColumnName("domain").HasMaxLength(120).IsRequired();
        builder.Property(c => c.PublishStatus).HasColumnName("publish_status").HasConversion<int>();
        builder.Property(c => c.CreatedAt).HasColumnName("created_at");
        builder.Property(c => c.UpdatedAt).HasColumnName("updated_at");
    }
}

public class ReusableUnitConfiguration : IEntityTypeConfiguration<ReusableUnit>
{
    public void Configure(EntityTypeBuilder<ReusableUnit> builder)
    {
        builder.ToTable("reusable_units", "learning");
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id).HasColumnName("id").HasMaxLength(150);
        builder.Property(u => u.ConceptId).HasColumnName("concept_id").HasMaxLength(120).IsRequired();
        builder.Property(u => u.TitleEn).HasColumnName("title_en").HasMaxLength(250).IsRequired();
        builder.Property(u => u.TitleAr).HasColumnName("title_ar").HasMaxLength(250).IsRequired();
        builder.Property(u => u.DescriptionEn).HasColumnName("description_en").HasMaxLength(2000).IsRequired();
        builder.Property(u => u.DescriptionAr).HasColumnName("description_ar").HasMaxLength(2000).IsRequired();
        builder.Property(u => u.Difficulty).HasColumnName("difficulty").HasMaxLength(30).IsRequired();
        builder.Property(u => u.EstimatedMinutes).HasColumnName("estimated_minutes");
        builder.Property(u => u.Version).HasColumnName("version");
        builder.Property(u => u.IsFreeTier).HasColumnName("is_free_tier");
        builder.Property(u => u.TagsJson).HasColumnName("tags_json");
        builder.Property(u => u.PrerequisitesJson).HasColumnName("prerequisites_json");
        builder.Property(u => u.InteractiveModuleIdsJson).HasColumnName("interactive_module_ids_json");
        builder.Property(u => u.ExternalReferencesJson).HasColumnName("external_references_json");
        builder.Property(u => u.ObjectivesEnJson).HasColumnName("objectives_en_json");
        builder.Property(u => u.ObjectivesArJson).HasColumnName("objectives_ar_json");
        builder.Property(u => u.QuizPassPercentage).HasColumnName("quiz_pass_percentage");
        builder.Property(u => u.QuizQuestionCount).HasColumnName("quiz_question_count");
        builder.Property(u => u.PublishStatus).HasColumnName("publish_status").HasConversion<int>();
        builder.Property(u => u.CreatedAt).HasColumnName("created_at");
        builder.Property(u => u.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(u => u.Concept).WithMany(c => c.Units).HasForeignKey(u => u.ConceptId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(u => u.ConceptId).HasDatabaseName("ix_reusable_units_concept_id");
    }
}

public class ModuleUnitPlacementConfiguration : IEntityTypeConfiguration<ModuleUnitPlacement>
{
    public void Configure(EntityTypeBuilder<ModuleUnitPlacement> builder)
    {
        builder.ToTable("module_unit_placements", "learning");
        builder.HasKey(p => new { p.ModuleId, p.UnitId });
        builder.Property(p => p.ModuleId).HasColumnName("module_id").HasMaxLength(120);
        builder.Property(p => p.UnitId).HasColumnName("unit_id").HasMaxLength(150);
        builder.Property(p => p.DisplayOrder).HasColumnName("display_order");
        builder.Property(p => p.IsOptional).HasColumnName("is_optional");
        builder.HasOne(p => p.Module).WithMany(m => m.Placements).HasForeignKey(p => p.ModuleId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(p => p.Unit).WithMany(u => u.Placements).HasForeignKey(p => p.UnitId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class UnitSectionConfiguration : IEntityTypeConfiguration<UnitSection>
{
    public void Configure(EntityTypeBuilder<UnitSection> builder)
    {
        builder.ToTable("unit_sections", "learning");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).HasColumnName("id").HasMaxLength(160);
        builder.Property(s => s.UnitId).HasColumnName("unit_id").HasMaxLength(150).IsRequired();
        builder.Property(s => s.Type).HasColumnName("type").HasMaxLength(50).IsRequired();
        builder.Property(s => s.TitleEn).HasColumnName("title_en").HasMaxLength(250).IsRequired();
        builder.Property(s => s.TitleAr).HasColumnName("title_ar").HasMaxLength(250).IsRequired();
        builder.Property(s => s.ContentEn).HasColumnName("content_en").IsRequired();
        builder.Property(s => s.ContentAr).HasColumnName("content_ar").IsRequired();
        builder.Property(s => s.CodeSnippet).HasColumnName("code_snippet");
        builder.Property(s => s.CodeLanguage).HasColumnName("code_language").HasMaxLength(40);
        builder.Property(s => s.CodeExplanationEn).HasColumnName("code_explanation_en");
        builder.Property(s => s.CodeExplanationAr).HasColumnName("code_explanation_ar");
        builder.Property(s => s.ExpectedOutput).HasColumnName("expected_output");
        builder.Property(s => s.InteractiveModuleId).HasColumnName("interactive_module_id").HasMaxLength(120);
        builder.Property(s => s.InlineQuestionsJson).HasColumnName("inline_questions_json");
        builder.Property(s => s.DisplayOrder).HasColumnName("display_order");
        builder.Property(s => s.IsRequired).HasColumnName("is_required");
        builder.Property(s => s.CreatedAt).HasColumnName("created_at");
        builder.Property(s => s.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(s => s.Unit).WithMany(u => u.Sections).HasForeignKey(s => s.UnitId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(s => s.UnitId).HasDatabaseName("ix_unit_sections_unit_id");
    }
}

public class QuestionBankItemConfiguration : IEntityTypeConfiguration<QuestionBankItem>
{
    public void Configure(EntityTypeBuilder<QuestionBankItem> builder)
    {
        builder.ToTable("question_bank_items", "assessment");
        builder.HasKey(q => q.Id);
        builder.Property(q => q.Id).HasColumnName("id").HasMaxLength(100);
        builder.Property(q => q.Domain).HasColumnName("domain").HasMaxLength(120).IsRequired();
        builder.Property(q => q.Topic).HasColumnName("topic").HasMaxLength(150).IsRequired();
        builder.Property(q => q.Subtopic).HasColumnName("subtopic").HasMaxLength(150).IsRequired();
        builder.Property(q => q.Specialization).HasColumnName("specialization").HasMaxLength(150);
        builder.Property(q => q.Difficulty).HasColumnName("difficulty").HasMaxLength(20).IsRequired();
        builder.Property(q => q.QuestionType).HasColumnName("question_type").HasMaxLength(40).IsRequired();
        builder.Property(q => q.CodeSnippet).HasColumnName("code_snippet");
        builder.Property(q => q.CodeLanguage).HasColumnName("code_language").HasMaxLength(40);
        builder.Property(q => q.QuestionEn).HasColumnName("question_en").IsRequired();
        builder.Property(q => q.QuestionAr).HasColumnName("question_ar").IsRequired();
        builder.Property(q => q.ExplanationEn).HasColumnName("explanation_en");
        builder.Property(q => q.ExplanationAr).HasColumnName("explanation_ar");
        builder.Property(q => q.TagsJson).HasColumnName("tags_json");
        builder.Property(q => q.EstimatedTimeSeconds).HasColumnName("estimated_time_seconds");
        builder.Property(q => q.PublishStatus).HasColumnName("publish_status").HasConversion<int>();
        builder.Property(q => q.CreatedAt).HasColumnName("created_at");
        builder.Property(q => q.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(q => new { q.Domain, q.Topic, q.Subtopic }).HasDatabaseName("ix_qbank_taxonomy");
        builder.HasIndex(q => q.Difficulty).HasDatabaseName("ix_qbank_difficulty");
    }
}

public class QuestionBankOptionConfiguration : IEntityTypeConfiguration<QuestionBankOption>
{
    public void Configure(EntityTypeBuilder<QuestionBankOption> builder)
    {
        builder.ToTable("question_bank_options", "assessment");
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(o => o.QuestionId).HasColumnName("question_id").HasMaxLength(100).IsRequired();
        builder.Property(o => o.OptionKey).HasColumnName("option_key").HasMaxLength(100).IsRequired();
        builder.Property(o => o.TextEn).HasColumnName("text_en").IsRequired();
        builder.Property(o => o.TextAr).HasColumnName("text_ar").IsRequired();
        builder.Property(o => o.IsCorrect).HasColumnName("is_correct");
        builder.Property(o => o.DisplayOrder).HasColumnName("display_order");
        builder.HasOne(o => o.Question).WithMany(q => q.Options).HasForeignKey(o => o.QuestionId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(o => o.QuestionId).HasDatabaseName("ix_qbank_options_question_id");
    }
}

public class UnitQuestionMappingConfiguration : IEntityTypeConfiguration<UnitQuestionMapping>
{
    public void Configure(EntityTypeBuilder<UnitQuestionMapping> builder)
    {
        builder.ToTable("unit_question_mappings", "learning");
        builder.HasKey(m => m.Id);
        builder.Property(m => m.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(m => m.UnitId).HasColumnName("unit_id").HasMaxLength(150).IsRequired();
        builder.Property(m => m.SectionId).HasColumnName("section_id").HasMaxLength(160);
        builder.Property(m => m.QuestionId).HasColumnName("question_id").HasMaxLength(100).IsRequired();
        builder.Property(m => m.DisplayOrder).HasColumnName("display_order");
        builder.HasOne(m => m.Unit).WithMany(u => u.QuestionMappings).HasForeignKey(m => m.UnitId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(m => m.Question).WithMany(q => q.UnitMappings).HasForeignKey(m => m.QuestionId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(m => new { m.UnitId, m.QuestionId, m.SectionId }).IsUnique().HasDatabaseName("ix_unit_question_mapping_unique");
    }
}

public class UserUnitProgressConfiguration : IEntityTypeConfiguration<UserUnitProgress>
{
    public void Configure(EntityTypeBuilder<UserUnitProgress> builder)
    {
        builder.ToTable("user_unit_progress", "learning");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(p => p.UserId).HasColumnName("user_id");
        builder.Property(p => p.UnitId).HasColumnName("unit_id").HasMaxLength(150).IsRequired();
        builder.Property(p => p.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(p => p.MasteryScore).HasColumnName("mastery_score").HasPrecision(5, 2);
        builder.Property(p => p.TimeSpentSeconds).HasColumnName("time_spent_seconds");
        builder.Property(p => p.LastSectionId).HasColumnName("last_section_id").HasMaxLength(160);
        builder.Property(p => p.StartedAt).HasColumnName("started_at");
        builder.Property(p => p.CompletedAt).HasColumnName("completed_at");
        builder.Property(p => p.LastEvaluatedAt).HasColumnName("last_evaluated_at");
        builder.HasIndex(p => new { p.UserId, p.UnitId }).IsUnique().HasDatabaseName("ix_user_unit_progress_user_unit");
    }
}

public class UserSectionProgressConfiguration : IEntityTypeConfiguration<UserSectionProgress>
{
    public void Configure(EntityTypeBuilder<UserSectionProgress> builder)
    {
        builder.ToTable("user_section_progress", "learning");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(p => p.UserId).HasColumnName("user_id");
        builder.Property(p => p.UnitId).HasColumnName("unit_id").HasMaxLength(150).IsRequired();
        builder.Property(p => p.SectionId).HasColumnName("section_id").HasMaxLength(160).IsRequired();
        builder.Property(p => p.IsCompleted).HasColumnName("is_completed");
        builder.Property(p => p.CheckpointPassed).HasColumnName("checkpoint_passed");
        builder.Property(p => p.TimeSpentSeconds).HasColumnName("time_spent_seconds");
        builder.Property(p => p.CompletedAt).HasColumnName("completed_at");
        builder.Property(p => p.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(p => new { p.UserId, p.SectionId }).IsUnique().HasDatabaseName("ix_user_section_progress_user_section");
        builder.HasIndex(p => new { p.UserId, p.UnitId }).HasDatabaseName("ix_user_section_progress_user_unit");
    }
}

public class UnitQuizAttemptConfiguration : IEntityTypeConfiguration<UnitQuizAttempt>
{
    public void Configure(EntityTypeBuilder<UnitQuizAttempt> builder)
    {
        builder.ToTable("unit_quiz_attempts", "assessment");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(a => a.UserId).HasColumnName("user_id");
        builder.Property(a => a.Scope).HasColumnName("scope").HasMaxLength(30).IsRequired();
        builder.Property(a => a.ScopeId).HasColumnName("scope_id").HasMaxLength(160).IsRequired();
        builder.Property(a => a.PathId).HasColumnName("path_id").HasMaxLength(100);
        builder.Property(a => a.Score).HasColumnName("score").HasPrecision(8, 2);
        builder.Property(a => a.MaxScore).HasColumnName("max_score").HasPrecision(8, 2);
        builder.Property(a => a.Percentage).HasColumnName("percentage").HasPrecision(5, 2);
        builder.Property(a => a.PassThreshold).HasColumnName("pass_threshold").HasPrecision(5, 2);
        builder.Property(a => a.Passed).HasColumnName("passed");
        builder.Property(a => a.IsCompleted).HasColumnName("is_completed");
        builder.Property(a => a.QuestionIdsJson).HasColumnName("question_ids_json");
        builder.Property(a => a.StartedAt).HasColumnName("started_at");
        builder.Property(a => a.CompletedAt).HasColumnName("completed_at");
        builder.HasIndex(a => new { a.UserId, a.Scope, a.ScopeId }).HasDatabaseName("ix_unit_quiz_attempts_user_scope");
    }
}

public class UnitQuizAttemptAnswerConfiguration : IEntityTypeConfiguration<UnitQuizAttemptAnswer>
{
    public void Configure(EntityTypeBuilder<UnitQuizAttemptAnswer> builder)
    {
        builder.ToTable("unit_quiz_attempt_answers", "assessment");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(a => a.AttemptId).HasColumnName("attempt_id");
        builder.Property(a => a.QuestionId).HasColumnName("question_id").HasMaxLength(100).IsRequired();
        builder.Property(a => a.SelectedOptionKeysJson).HasColumnName("selected_option_keys_json");
        builder.Property(a => a.IsCorrect).HasColumnName("is_correct");
        builder.Property(a => a.PointsEarned).HasColumnName("points_earned");
        builder.Property(a => a.AnsweredAt).HasColumnName("answered_at");
        builder.HasOne(a => a.Attempt).WithMany(t => t.Answers).HasForeignKey(a => a.AttemptId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(a => a.AttemptId).HasDatabaseName("ix_unit_quiz_attempt_answers_attempt_id");
    }
}
