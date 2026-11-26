using LearnCS.Domain.Platform;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Platform;

public class AiConversationConfiguration : IEntityTypeConfiguration<AiConversation>
{
    public void Configure(EntityTypeBuilder<AiConversation> builder)
    {
        builder.ToTable("ai_conversations", "platform");
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(c => c.UserId).HasColumnName("user_id");
        builder.Property(c => c.Mode).HasColumnName("mode").HasConversion<int>();
        builder.Property(c => c.Title).HasColumnName("title").HasMaxLength(200);
        builder.Property(c => c.ConceptId).HasColumnName("concept_id");
        builder.Property(c => c.LessonId).HasColumnName("lesson_id");
        builder.Property(c => c.LearningPathId).HasColumnName("learning_path_id");
        builder.Property(c => c.IsActive).HasColumnName("is_active");
        builder.Property(c => c.CreatedAt).HasColumnName("created_at");
        builder.Property(c => c.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(c => c.UserId).HasDatabaseName("ix_ai_conversations_user_id");
        builder.HasIndex(c => new { c.UserId, c.IsActive }).HasDatabaseName("ix_ai_conversations_user_active");
    }
}

public class AiMessageConfiguration : IEntityTypeConfiguration<AiMessage>
{
    public void Configure(EntityTypeBuilder<AiMessage> builder)
    {
        builder.ToTable("ai_messages", "platform");
        builder.HasKey(m => m.Id);
        builder.Property(m => m.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(m => m.ConversationId).HasColumnName("conversation_id");
        builder.Property(m => m.Role).HasColumnName("role").HasConversion<int>();
        builder.Property(m => m.Content).HasColumnName("content").IsRequired();
        builder.Property(m => m.InputTokens).HasColumnName("input_tokens");
        builder.Property(m => m.OutputTokens).HasColumnName("output_tokens");
        builder.Property(m => m.ModelUsed).HasColumnName("model_used").HasMaxLength(100);
        builder.Property(m => m.CreatedAt).HasColumnName("created_at");
        builder.HasOne(m => m.Conversation).WithMany(c => c.Messages)
            .HasForeignKey(m => m.ConversationId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(m => m.ConversationId).HasDatabaseName("ix_ai_messages_conversation_id");
    }
}

public class AiContextSnapshotConfiguration : IEntityTypeConfiguration<AiContextSnapshot>
{
    public void Configure(EntityTypeBuilder<AiContextSnapshot> builder)
    {
        builder.ToTable("ai_context_snapshots", "platform");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(s => s.ConversationId).HasColumnName("conversation_id");
        builder.Property(s => s.SnapshotJson).HasColumnName("snapshot_json").IsRequired();
        builder.Property(s => s.CreatedAt).HasColumnName("created_at");
        builder.HasIndex(s => s.ConversationId).HasDatabaseName("ix_ai_context_snapshots_conversation_id");
    }
}

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
        builder.ToTable("notifications", "platform");
        builder.HasKey(n => n.Id);
        builder.Property(n => n.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(n => n.UserId).HasColumnName("user_id");
        builder.Property(n => n.Type).HasColumnName("type").HasConversion<int>();
        builder.Property(n => n.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(n => n.Body).HasColumnName("body").HasMaxLength(1000).IsRequired();
        builder.Property(n => n.IsRead).HasColumnName("is_read");
        builder.Property(n => n.ReadAt).HasColumnName("read_at");
        builder.Property(n => n.ActionUrl).HasColumnName("action_url").HasMaxLength(500);
        builder.Property(n => n.CreatedAt).HasColumnName("created_at");
        builder.Property(n => n.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(n => n.UserId).HasDatabaseName("ix_notifications_user_id");
        builder.HasIndex(n => new { n.UserId, n.IsRead }).HasDatabaseName("ix_notifications_user_read");
    }
}

public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
{
    public void Configure(EntityTypeBuilder<AuditLog> builder)
    {
        builder.ToTable("audit_logs", "platform");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(a => a.UserId).HasColumnName("user_id");
        builder.Property(a => a.ActorUserId).HasColumnName("actor_user_id");
        builder.Property(a => a.Action).HasColumnName("action").HasMaxLength(100).IsRequired();
        builder.Property(a => a.EntityType).HasColumnName("entity_type").HasMaxLength(100).IsRequired();
        builder.Property(a => a.EntityId).HasColumnName("entity_id");
        builder.Property(a => a.Details).HasColumnName("details").HasMaxLength(1000);
        builder.Property(a => a.OldValuesJson).HasColumnName("old_values_json");
        builder.Property(a => a.NewValuesJson).HasColumnName("new_values_json");
        builder.Property(a => a.IpAddress).HasColumnName("ip_address").HasMaxLength(45);
        builder.Property(a => a.CreatedAt).HasColumnName("created_at");
        builder.HasIndex(a => a.UserId).HasDatabaseName("ix_audit_logs_user_id");
        builder.HasIndex(a => a.ActorUserId).HasDatabaseName("ix_audit_logs_actor_user_id");
        builder.HasIndex(a => a.EntityType).HasDatabaseName("ix_audit_logs_entity_type");
        builder.HasIndex(a => a.CreatedAt).HasDatabaseName("ix_audit_logs_created_at");
    }
}
