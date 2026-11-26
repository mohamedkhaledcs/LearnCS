using LearnCS.Domain.Career;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Career;

public class CareerProfileConfiguration : IEntityTypeConfiguration<CareerProfile>
{
    public void Configure(EntityTypeBuilder<CareerProfile> builder)
    {
        builder.ToTable("career_profiles", "career");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(p => p.Name).HasColumnName("name").HasMaxLength(150).IsRequired();
        builder.Property(p => p.Slug).HasColumnName("slug").HasMaxLength(150).IsRequired();
        builder.Property(p => p.Description).HasColumnName("description").HasMaxLength(2000);
        builder.Property(p => p.IconUrl).HasColumnName("icon_url").HasMaxLength(500);
        builder.Property(p => p.IsActive).HasColumnName("is_active");
        builder.Property(p => p.CreatedAt).HasColumnName("created_at");
        builder.Property(p => p.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(p => p.Slug).IsUnique().HasDatabaseName("ix_career_profiles_slug");
    }
}

public class CareerFactorConfiguration : IEntityTypeConfiguration<CareerFactor>
{
    public void Configure(EntityTypeBuilder<CareerFactor> builder)
    {
        builder.ToTable("career_factors", "career");
        builder.HasKey(f => f.Id);
        builder.Property(f => f.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(f => f.CareerProfileId).HasColumnName("career_profile_id");
        builder.Property(f => f.FactorKey).HasColumnName("factor_key").HasMaxLength(100);
        builder.Property(f => f.Description).HasColumnName("description").HasMaxLength(500);
        builder.Property(f => f.Weight).HasColumnName("weight").HasPrecision(5, 2);
        builder.Property(f => f.CreatedAt).HasColumnName("created_at");
        builder.HasOne(f => f.CareerProfile).WithMany(p => p.Factors)
            .HasForeignKey(f => f.CareerProfileId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class CareerQuestionConfiguration : IEntityTypeConfiguration<CareerQuestion>
{
    public void Configure(EntityTypeBuilder<CareerQuestion> builder)
    {
        builder.ToTable("career_questions", "career");
        builder.HasKey(q => q.Id);
        builder.Property(q => q.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(q => q.Text).HasColumnName("text").HasMaxLength(1000).IsRequired();
        builder.Property(q => q.HelpText).HasColumnName("help_text").HasMaxLength(500);
        builder.Property(q => q.DisplayOrder).HasColumnName("display_order");
        builder.Property(q => q.IsActive).HasColumnName("is_active");
        builder.Property(q => q.CategoryTag).HasColumnName("category_tag").HasMaxLength(100);
        builder.Property(q => q.CreatedAt).HasColumnName("created_at");
        builder.Property(q => q.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(q => q.DisplayOrder).HasDatabaseName("ix_career_questions_order");
    }
}

public class CareerQuestionOptionConfiguration : IEntityTypeConfiguration<CareerQuestionOption>
{
    public void Configure(EntityTypeBuilder<CareerQuestionOption> builder)
    {
        builder.ToTable("career_question_options", "career");
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(o => o.QuestionId).HasColumnName("question_id");
        builder.Property(o => o.Text).HasColumnName("text").HasMaxLength(500).IsRequired();
        builder.Property(o => o.DisplayOrder).HasColumnName("display_order");
        builder.Property(o => o.CreatedAt).HasColumnName("created_at");
        builder.HasOne(o => o.Question).WithMany(q => q.Options)
            .HasForeignKey(o => o.QuestionId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class CareerOptionScoreConfiguration : IEntityTypeConfiguration<CareerOptionScore>
{
    public void Configure(EntityTypeBuilder<CareerOptionScore> builder)
    {
        builder.ToTable("career_option_scores", "career");
        builder.HasKey(s => new { s.OptionId, s.CareerProfileId });
        builder.Property(s => s.OptionId).HasColumnName("option_id");
        builder.Property(s => s.CareerProfileId).HasColumnName("career_profile_id");
        builder.Property(s => s.Score).HasColumnName("score").HasPrecision(5, 2);
        builder.Property(s => s.CreatedAt).HasColumnName("created_at");
        builder.HasOne(s => s.Option).WithMany(o => o.Scores)
            .HasForeignKey(s => s.OptionId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(s => s.CareerProfile).WithMany()
            .HasForeignKey(s => s.CareerProfileId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class CareerAssessmentAttemptConfiguration : IEntityTypeConfiguration<CareerAssessmentAttempt>
{
    public void Configure(EntityTypeBuilder<CareerAssessmentAttempt> builder)
    {
        builder.ToTable("career_assessment_attempts", "career");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(a => a.UserId).HasColumnName("user_id");
        builder.Property(a => a.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(a => a.StartedAt).HasColumnName("started_at");
        builder.Property(a => a.CompletedAt).HasColumnName("completed_at");
        builder.Property(a => a.CreatedAt).HasColumnName("created_at");
        builder.Property(a => a.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(a => a.UserId).HasDatabaseName("ix_career_assessment_attempts_user_id");
    }
}

public class CareerAnswerResponseConfiguration : IEntityTypeConfiguration<CareerAnswerResponse>
{
    public void Configure(EntityTypeBuilder<CareerAnswerResponse> builder)
    {
        builder.ToTable("career_answer_responses", "career");
        builder.HasKey(r => new { r.AttemptId, r.QuestionId });
        builder.Property(r => r.AttemptId).HasColumnName("attempt_id");
        builder.Property(r => r.QuestionId).HasColumnName("question_id");
        builder.Property(r => r.SelectedOptionId).HasColumnName("selected_option_id");
        builder.Property(r => r.AnsweredAt).HasColumnName("answered_at");
        builder.HasOne(r => r.Attempt).WithMany(a => a.Responses)
            .HasForeignKey(r => r.AttemptId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(r => r.Question).WithMany()
            .HasForeignKey(r => r.QuestionId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(r => r.SelectedOption).WithMany()
            .HasForeignKey(r => r.SelectedOptionId).OnDelete(DeleteBehavior.Restrict);
    }
}

public class CareerRecommendationConfiguration : IEntityTypeConfiguration<CareerRecommendation>
{
    public void Configure(EntityTypeBuilder<CareerRecommendation> builder)
    {
        builder.ToTable("career_recommendations", "career");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(r => r.AttemptId).HasColumnName("attempt_id");
        builder.Property(r => r.UserId).HasColumnName("user_id");
        builder.Property(r => r.CareerProfileId).HasColumnName("career_profile_id");
        builder.Property(r => r.Score).HasColumnName("score").HasPrecision(5, 2);
        builder.Property(r => r.Rank).HasColumnName("rank");
        builder.Property(r => r.ExplanationJson).HasColumnName("explanation_json");
        builder.Property(r => r.CreatedAt).HasColumnName("created_at");
        builder.HasOne(r => r.Attempt).WithMany(a => a.Recommendations)
            .HasForeignKey(r => r.AttemptId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(r => r.CareerProfile).WithMany(p => p.Recommendations)
            .HasForeignKey(r => r.CareerProfileId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(r => r.UserId).HasDatabaseName("ix_career_recommendations_user_id");
        builder.HasIndex(r => new { r.AttemptId, r.Rank }).HasDatabaseName("ix_career_recommendations_attempt_rank");
    }
}
