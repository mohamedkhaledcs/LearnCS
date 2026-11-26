using LearnCS.Domain.Learning;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Learning;

public class LearningPathConfiguration : IEntityTypeConfiguration<LearningPath>
{
    public void Configure(EntityTypeBuilder<LearningPath> builder)
    {
        builder.ToTable("learning_paths", "learning");
        builder.HasKey(lp => lp.Id);
        builder.Property(lp => lp.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(lp => lp.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(lp => lp.Slug).HasColumnName("slug").HasMaxLength(200).IsRequired();
        builder.Property(lp => lp.Description).HasColumnName("description").HasMaxLength(2000);
        builder.Property(lp => lp.ThumbnailUrl).HasColumnName("thumbnail_url").HasMaxLength(500);
        builder.Property(lp => lp.Difficulty).HasColumnName("difficulty").HasConversion<int>();
        builder.Property(lp => lp.EstimatedHours).HasColumnName("estimated_hours");
        builder.Property(lp => lp.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(lp => lp.IsFeatured).HasColumnName("is_featured");
        builder.Property(lp => lp.CreatedAt).HasColumnName("created_at");
        builder.Property(lp => lp.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(lp => lp.Slug).IsUnique().HasDatabaseName("ix_learning_paths_slug");
        builder.HasIndex(lp => lp.Status).HasDatabaseName("ix_learning_paths_status");
    }
}

public class TrackConfiguration : IEntityTypeConfiguration<Track>
{
    public void Configure(EntityTypeBuilder<Track> builder)
    {
        builder.ToTable("tracks", "learning");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(t => t.LearningPathId).HasColumnName("learning_path_id");
        builder.Property(t => t.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(t => t.Description).HasColumnName("description").HasMaxLength(1000);
        builder.Property(t => t.DisplayOrder).HasColumnName("display_order");
        builder.Property(t => t.CreatedAt).HasColumnName("created_at");
        builder.Property(t => t.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(t => t.LearningPath).WithMany(lp => lp.Tracks)
            .HasForeignKey(t => t.LearningPathId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(t => t.LearningPathId).HasDatabaseName("ix_tracks_path_id");
    }
}

public class ModuleConfiguration : IEntityTypeConfiguration<Module>
{
    public void Configure(EntityTypeBuilder<Module> builder)
    {
        builder.ToTable("modules", "learning");
        builder.HasKey(m => m.Id);
        builder.Property(m => m.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(m => m.TrackId).HasColumnName("track_id");
        builder.Property(m => m.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(m => m.Description).HasColumnName("description").HasMaxLength(1000);
        builder.Property(m => m.DisplayOrder).HasColumnName("display_order");
        builder.Property(m => m.EstimatedMinutes).HasColumnName("estimated_minutes");
        builder.Property(m => m.CreatedAt).HasColumnName("created_at");
        builder.Property(m => m.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(m => m.Track).WithMany(t => t.Modules)
            .HasForeignKey(m => m.TrackId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(m => m.TrackId).HasDatabaseName("ix_modules_track_id");
    }
}

public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
{
    public void Configure(EntityTypeBuilder<Lesson> builder)
    {
        builder.ToTable("lessons", "learning");
        builder.HasKey(l => l.Id);
        builder.Property(l => l.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(l => l.ModuleId).HasColumnName("module_id");
        builder.Property(l => l.ConceptId).HasColumnName("concept_id");
        builder.Property(l => l.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(l => l.Slug).HasColumnName("slug").HasMaxLength(200).IsRequired();
        builder.Property(l => l.ContentMarkdown).HasColumnName("content_markdown");
        builder.Property(l => l.ExternalUrl).HasColumnName("external_url").HasMaxLength(1000);
        builder.Property(l => l.Type).HasColumnName("type").HasConversion<int>();
        builder.Property(l => l.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(l => l.DisplayOrder).HasColumnName("display_order");
        builder.Property(l => l.EstimatedMinutes).HasColumnName("estimated_minutes");
        builder.Property(l => l.IsFree).HasColumnName("is_free");
        builder.Property(l => l.CreatedAt).HasColumnName("created_at");
        builder.Property(l => l.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(l => l.Module).WithMany(m => m.Lessons)
            .HasForeignKey(l => l.ModuleId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(l => l.Slug).IsUnique().HasDatabaseName("ix_lessons_slug");
        builder.HasIndex(l => l.ModuleId).HasDatabaseName("ix_lessons_module_id");
        builder.HasIndex(l => l.ConceptId).HasDatabaseName("ix_lessons_concept_id");
    }
}

public class LearningResourceConfiguration : IEntityTypeConfiguration<LearningResource>
{
    public void Configure(EntityTypeBuilder<LearningResource> builder)
    {
        builder.ToTable("learning_resources", "learning");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(r => r.Title).HasColumnName("title").HasMaxLength(300).IsRequired();
        builder.Property(r => r.Url).HasColumnName("url").HasMaxLength(1000).IsRequired();
        builder.Property(r => r.Type).HasColumnName("type").HasConversion<int>();
        builder.Property(r => r.Description).HasColumnName("description").HasMaxLength(2000);
        builder.Property(r => r.ConceptId).HasColumnName("concept_id");
        builder.Property(r => r.DurationMinutes).HasColumnName("duration_minutes");
        builder.Property(r => r.IsFree).HasColumnName("is_free");
        builder.Property(r => r.CreatedAt).HasColumnName("created_at");
        builder.Property(r => r.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(r => r.Type).HasDatabaseName("ix_learning_resources_type");
        builder.HasIndex(r => r.ConceptId).HasDatabaseName("ix_learning_resources_concept_id");
    }
}

public class LessonResourceConfiguration : IEntityTypeConfiguration<LessonResource>
{
    public void Configure(EntityTypeBuilder<LessonResource> builder)
    {
        builder.ToTable("lesson_resources", "learning");
        builder.HasKey(lr => new { lr.LessonId, lr.ResourceId });
        builder.Property(lr => lr.LessonId).HasColumnName("lesson_id");
        builder.Property(lr => lr.ResourceId).HasColumnName("resource_id");
        builder.Property(lr => lr.DisplayOrder).HasColumnName("display_order");
        builder.Property(lr => lr.CreatedAt).HasColumnName("created_at");
        builder.HasOne(lr => lr.Lesson).WithMany(l => l.LessonResources)
            .HasForeignKey(lr => lr.LessonId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(lr => lr.Resource).WithMany(r => r.LessonResources)
            .HasForeignKey(lr => lr.ResourceId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class PathEnrollmentConfiguration : IEntityTypeConfiguration<PathEnrollment>
{
    public void Configure(EntityTypeBuilder<PathEnrollment> builder)
    {
        builder.ToTable("path_enrollments", "learning");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(e => e.UserId).HasColumnName("user_id");
        builder.Property(e => e.LearningPathId).HasColumnName("learning_path_id");
        builder.Property(e => e.EnrolledAt).HasColumnName("enrolled_at");
        builder.Property(e => e.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(e => e.CompletedAt).HasColumnName("completed_at");
        builder.Property(e => e.ProgressPercent).HasColumnName("progress_percent").HasPrecision(5, 2);
        builder.Property(e => e.CreatedAt).HasColumnName("created_at");
        builder.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(e => e.LearningPath).WithMany(lp => lp.Enrollments)
            .HasForeignKey(e => e.LearningPathId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(e => new { e.UserId, e.LearningPathId }).IsUnique()
            .HasDatabaseName("ix_path_enrollments_user_path");
        builder.HasIndex(e => e.UserId).HasDatabaseName("ix_path_enrollments_user_id");
    }
}

public class LessonProgressConfiguration : IEntityTypeConfiguration<LessonProgress>
{
    public void Configure(EntityTypeBuilder<LessonProgress> builder)
    {
        builder.ToTable("lesson_progress", "learning");
        builder.HasKey(lp => lp.Id);
        builder.Property(lp => lp.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(lp => lp.UserId).HasColumnName("user_id");
        builder.Property(lp => lp.LessonId).HasColumnName("lesson_id");
        builder.Property(lp => lp.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(lp => lp.StartedAt).HasColumnName("started_at");
        builder.Property(lp => lp.CompletedAt).HasColumnName("completed_at");
        builder.Property(lp => lp.TimeSpentSeconds).HasColumnName("time_spent_seconds");
        builder.Property(lp => lp.CreatedAt).HasColumnName("created_at");
        builder.Property(lp => lp.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(lp => lp.Lesson).WithMany(l => l.Progress)
            .HasForeignKey(lp => lp.LessonId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(lp => new { lp.UserId, lp.LessonId }).IsUnique()
            .HasDatabaseName("ix_lesson_progress_user_lesson");
        builder.HasIndex(lp => lp.UserId).HasDatabaseName("ix_lesson_progress_user_id");
    }
}

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.ToTable("projects", "learning");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(p => p.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(p => p.Slug).HasColumnName("slug").HasMaxLength(200).IsRequired();
        builder.Property(p => p.Description).HasColumnName("description").HasMaxLength(2000);
        builder.Property(p => p.Difficulty).HasColumnName("difficulty").HasConversion<int>();
        builder.Property(p => p.Instructions).HasColumnName("instructions");
        builder.Property(p => p.EstimatedHours).HasColumnName("estimated_hours");
        builder.Property(p => p.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(p => p.RequiredSkillsJson).HasColumnName("required_skills_json");
        builder.Property(p => p.CreatedAt).HasColumnName("created_at");
        builder.Property(p => p.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(p => p.Slug).IsUnique().HasDatabaseName("ix_projects_slug");
    }
}

public class ProjectConceptConfiguration : IEntityTypeConfiguration<ProjectConcept>
{
    public void Configure(EntityTypeBuilder<ProjectConcept> builder)
    {
        builder.ToTable("project_concepts", "learning");
        builder.HasKey(pc => new { pc.ProjectId, pc.ConceptId });
        builder.Property(pc => pc.ProjectId).HasColumnName("project_id");
        builder.Property(pc => pc.ConceptId).HasColumnName("concept_id");
        builder.Property(pc => pc.IsRequired).HasColumnName("is_required");
        builder.Property(pc => pc.CreatedAt).HasColumnName("created_at");
        builder.HasOne(pc => pc.Project).WithMany(p => p.ProjectConcepts)
            .HasForeignKey(pc => pc.ProjectId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class ProjectSubmissionConfiguration : IEntityTypeConfiguration<ProjectSubmission>
{
    public void Configure(EntityTypeBuilder<ProjectSubmission> builder)
    {
        builder.ToTable("project_submissions", "learning");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(s => s.UserId).HasColumnName("user_id");
        builder.Property(s => s.ProjectId).HasColumnName("project_id");
        builder.Property(s => s.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(s => s.RepositoryUrl).HasColumnName("repository_url").HasMaxLength(500);
        builder.Property(s => s.LiveUrl).HasColumnName("live_url").HasMaxLength(500);
        builder.Property(s => s.Notes).HasColumnName("notes").HasMaxLength(2000);
        builder.Property(s => s.FeedbackNotes).HasColumnName("feedback_notes").HasMaxLength(2000);
        builder.Property(s => s.SubmittedAt).HasColumnName("submitted_at");
        builder.Property(s => s.ReviewedAt).HasColumnName("reviewed_at");
        builder.Property(s => s.CreatedAt).HasColumnName("created_at");
        builder.Property(s => s.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(s => s.Project).WithMany(p => p.Submissions)
            .HasForeignKey(s => s.ProjectId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(s => new { s.UserId, s.ProjectId }).HasDatabaseName("ix_project_submissions_user_project");
    }
}
