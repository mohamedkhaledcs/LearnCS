using LearnCS.Domain.Assessment;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Assessment;

public class AssessmentConfiguration : IEntityTypeConfiguration<Domain.Assessment.Assessment>
{
    public void Configure(EntityTypeBuilder<Domain.Assessment.Assessment> builder)
    {
        builder.ToTable("assessments", "assessment");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(a => a.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(a => a.Description).HasColumnName("description").HasMaxLength(2000);
        builder.Property(a => a.Type).HasColumnName("type").HasConversion<int>();
        builder.Property(a => a.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(a => a.TimeLimitMinutes).HasColumnName("time_limit_minutes");
        builder.Property(a => a.PassScore).HasColumnName("pass_score").HasPrecision(5, 2);
        builder.Property(a => a.IsAdaptive).HasColumnName("is_adaptive");
        builder.Property(a => a.MaxQuestions).HasColumnName("max_questions");
        builder.Property(a => a.CreatedAt).HasColumnName("created_at");
        builder.Property(a => a.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(a => a.Type).HasDatabaseName("ix_assessments_type");
        builder.HasIndex(a => a.Status).HasDatabaseName("ix_assessments_status");
    }
}

public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.ToTable("questions", "assessment");
        builder.HasKey(q => q.Id);
        builder.Property(q => q.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(q => q.Text).HasColumnName("text").HasMaxLength(2000).IsRequired();
        builder.Property(q => q.Type).HasColumnName("type").HasConversion<int>();
        builder.Property(q => q.Difficulty).HasColumnName("difficulty").HasConversion<int>();
        builder.Property(q => q.ConceptId).HasColumnName("concept_id");
        builder.Property(q => q.Explanation).HasColumnName("explanation").HasMaxLength(2000);
        builder.Property(q => q.DefaultPoints).HasColumnName("default_points");
        builder.Property(q => q.CodeSnippet).HasColumnName("code_snippet");
        builder.Property(q => q.IsActive).HasColumnName("is_active");
        builder.Property(q => q.CreatedAt).HasColumnName("created_at");
        builder.Property(q => q.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(q => q.ConceptId).HasDatabaseName("ix_questions_concept_id");
        builder.HasIndex(q => q.Type).HasDatabaseName("ix_questions_type");
        builder.HasIndex(q => q.Difficulty).HasDatabaseName("ix_questions_difficulty");
    }
}

public class QuestionOptionConfiguration : IEntityTypeConfiguration<QuestionOption>
{
    public void Configure(EntityTypeBuilder<QuestionOption> builder)
    {
        builder.ToTable("question_options", "assessment");
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(o => o.QuestionId).HasColumnName("question_id");
        builder.Property(o => o.Text).HasColumnName("text").HasMaxLength(1000).IsRequired();
        builder.Property(o => o.IsCorrect).HasColumnName("is_correct");
        builder.Property(o => o.DisplayOrder).HasColumnName("display_order");
        builder.Property(o => o.Explanation).HasColumnName("explanation").HasMaxLength(1000);
        builder.Property(o => o.CreatedAt).HasColumnName("created_at");
        builder.Property(o => o.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(o => o.Question).WithMany(q => q.Options)
            .HasForeignKey(o => o.QuestionId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(o => o.QuestionId).HasDatabaseName("ix_question_options_question_id");
    }
}

public class AssessmentQuestionConfiguration : IEntityTypeConfiguration<AssessmentQuestion>
{
    public void Configure(EntityTypeBuilder<AssessmentQuestion> builder)
    {
        builder.ToTable("assessment_questions", "assessment");
        builder.HasKey(aq => new { aq.AssessmentId, aq.QuestionId });
        builder.Property(aq => aq.AssessmentId).HasColumnName("assessment_id");
        builder.Property(aq => aq.QuestionId).HasColumnName("question_id");
        builder.Property(aq => aq.DisplayOrder).HasColumnName("display_order");
        builder.Property(aq => aq.Points).HasColumnName("points");
        builder.Property(aq => aq.CreatedAt).HasColumnName("created_at");
        builder.HasOne(aq => aq.Assessment).WithMany(a => a.AssessmentQuestions)
            .HasForeignKey(aq => aq.AssessmentId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(aq => aq.Question).WithMany(q => q.AssessmentQuestions)
            .HasForeignKey(aq => aq.QuestionId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class AssessmentAttemptConfiguration : IEntityTypeConfiguration<AssessmentAttempt>
{
    public void Configure(EntityTypeBuilder<AssessmentAttempt> builder)
    {
        builder.ToTable("assessment_attempts", "assessment");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(a => a.UserId).HasColumnName("user_id");
        builder.Property(a => a.AssessmentId).HasColumnName("assessment_id");
        builder.Property(a => a.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(a => a.StartedAt).HasColumnName("started_at");
        builder.Property(a => a.CompletedAt).HasColumnName("completed_at");
        builder.Property(a => a.Score).HasColumnName("score").HasPrecision(8, 2);
        builder.Property(a => a.MaxScore).HasColumnName("max_score").HasPrecision(8, 2);
        builder.Property(a => a.Passed).HasColumnName("passed");
        builder.Property(a => a.CreatedAt).HasColumnName("created_at");
        builder.Property(a => a.UpdatedAt).HasColumnName("updated_at");
        builder.Ignore(a => a.ScorePercent);
        builder.HasOne(a => a.Assessment).WithMany(ast => ast.Attempts)
            .HasForeignKey(a => a.AssessmentId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(a => a.UserId).HasDatabaseName("ix_assessment_attempts_user_id");
        builder.HasIndex(a => a.AssessmentId).HasDatabaseName("ix_assessment_attempts_assessment_id");
        builder.HasIndex(a => new { a.UserId, a.AssessmentId }).HasDatabaseName("ix_assessment_attempts_user_assessment");
    }
}

public class AttemptAnswerConfiguration : IEntityTypeConfiguration<AttemptAnswer>
{
    public void Configure(EntityTypeBuilder<AttemptAnswer> builder)
    {
        builder.ToTable("attempt_answers", "assessment");
        builder.HasKey(aa => aa.Id);
        builder.Property(aa => aa.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(aa => aa.AttemptId).HasColumnName("attempt_id");
        builder.Property(aa => aa.QuestionId).HasColumnName("question_id");
        builder.Property(aa => aa.SelectedOptionId).HasColumnName("selected_option_id");
        builder.Property(aa => aa.TextAnswer).HasColumnName("text_answer").HasMaxLength(5000);
        builder.Property(aa => aa.IsCorrect).HasColumnName("is_correct");
        builder.Property(aa => aa.PointsEarned).HasColumnName("points_earned");
        builder.Property(aa => aa.TimeTakenSeconds).HasColumnName("time_taken_seconds");
        builder.Property(aa => aa.CreatedAt).HasColumnName("created_at");
        builder.Property(aa => aa.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(aa => aa.Attempt).WithMany(a => a.Answers)
            .HasForeignKey(aa => aa.AttemptId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(aa => aa.Question).WithMany()
            .HasForeignKey(aa => aa.QuestionId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(aa => aa.AttemptId).HasDatabaseName("ix_attempt_answers_attempt_id");
        builder.HasIndex(aa => aa.QuestionId).HasDatabaseName("ix_attempt_answers_question_id");
    }
}
