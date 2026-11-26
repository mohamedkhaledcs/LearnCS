using LearnCS.Domain.Knowledge;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Knowledge;

public class ConceptConfiguration : IEntityTypeConfiguration<Concept>
{
    public void Configure(EntityTypeBuilder<Concept> builder)
    {
        builder.ToTable("concepts", "knowledge");
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(c => c.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(c => c.Slug).HasColumnName("slug").HasMaxLength(200).IsRequired();
        builder.Property(c => c.Description).HasColumnName("description").HasMaxLength(4000);
        builder.Property(c => c.Difficulty).HasColumnName("difficulty").HasConversion<int>();
        builder.Property(c => c.Category).HasColumnName("category").HasMaxLength(100).IsRequired();
        builder.Property(c => c.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(c => c.EstimatedMinutes).HasColumnName("estimated_minutes");
        builder.Property(c => c.IconUrl).HasColumnName("icon_url").HasMaxLength(500);
        builder.Property(c => c.MetadataJson).HasColumnName("metadata_json");
        builder.Property(c => c.CreatedAt).HasColumnName("created_at");
        builder.Property(c => c.UpdatedAt).HasColumnName("updated_at");

        builder.HasIndex(c => c.Slug).IsUnique().HasDatabaseName("ix_concepts_slug");
        builder.HasIndex(c => c.Category).HasDatabaseName("ix_concepts_category");
        builder.HasIndex(c => c.Difficulty).HasDatabaseName("ix_concepts_difficulty");
        builder.HasIndex(c => c.Status).HasDatabaseName("ix_concepts_status");

        builder.HasQueryFilter(c => c.Status != ConceptStatus.Archived);

        builder.HasMany(c => c.OutgoingRelationships)
            .WithOne(r => r.SourceConcept)
            .HasForeignKey(r => r.SourceConceptId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.IncomingRelationships)
            .WithOne(r => r.TargetConcept)
            .HasForeignKey(r => r.TargetConceptId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}

public class ConceptRelationshipConfiguration : IEntityTypeConfiguration<ConceptRelationship>
{
    public void Configure(EntityTypeBuilder<ConceptRelationship> builder)
    {
        builder.ToTable("concept_relationships", "knowledge");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(r => r.SourceConceptId).HasColumnName("source_concept_id");
        builder.Property(r => r.TargetConceptId).HasColumnName("target_concept_id");
        builder.Property(r => r.RelationType).HasColumnName("relation_type").HasConversion<int>();
        builder.Property(r => r.Weight).HasColumnName("weight").HasPrecision(5, 2);
        builder.Property(r => r.CreatedAt).HasColumnName("created_at");

        builder.HasIndex(r => new { r.SourceConceptId, r.TargetConceptId, r.RelationType })
            .IsUnique().HasDatabaseName("ix_concept_relationships_unique");
        builder.HasIndex(r => r.SourceConceptId).HasDatabaseName("ix_concept_relationships_source");
        builder.HasIndex(r => r.TargetConceptId).HasDatabaseName("ix_concept_relationships_target");
        builder.HasIndex(r => r.RelationType).HasDatabaseName("ix_concept_relationships_type");
    }
}

public class LearningObjectiveConfiguration : IEntityTypeConfiguration<LearningObjective>
{
    public void Configure(EntityTypeBuilder<LearningObjective> builder)
    {
        builder.ToTable("learning_objectives", "knowledge");
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(o => o.ConceptId).HasColumnName("concept_id");
        builder.Property(o => o.Title).HasColumnName("title").HasMaxLength(300).IsRequired();
        builder.Property(o => o.Description).HasColumnName("description").HasMaxLength(2000);
        builder.Property(o => o.BloomLevel).HasColumnName("bloom_level").HasConversion<int>();
        builder.Property(o => o.DisplayOrder).HasColumnName("display_order");
        builder.Property(o => o.IsActive).HasColumnName("is_active");
        builder.Property(o => o.CreatedAt).HasColumnName("created_at");
        builder.Property(o => o.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(o => o.Concept).WithMany(c => c.LearningObjectives)
            .HasForeignKey(o => o.ConceptId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(o => o.ConceptId).HasDatabaseName("ix_learning_objectives_concept_id");
    }
}

public class TagConfiguration : IEntityTypeConfiguration<Tag>
{
    public void Configure(EntityTypeBuilder<Tag> builder)
    {
        builder.ToTable("tags", "knowledge");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(t => t.Name).HasColumnName("name").HasMaxLength(100).IsRequired();
        builder.Property(t => t.Slug).HasColumnName("slug").HasMaxLength(100).IsRequired();
        builder.Property(t => t.Color).HasColumnName("color").HasMaxLength(20);
        builder.Property(t => t.CreatedAt).HasColumnName("created_at");
        builder.HasIndex(t => t.Name).IsUnique().HasDatabaseName("ix_tags_name");
        builder.HasIndex(t => t.Slug).IsUnique().HasDatabaseName("ix_tags_slug");
    }
}

public class ConceptTagConfiguration : IEntityTypeConfiguration<ConceptTag>
{
    public void Configure(EntityTypeBuilder<ConceptTag> builder)
    {
        builder.ToTable("concept_tags", "knowledge");
        builder.HasKey(ct => new { ct.ConceptId, ct.TagId });
        builder.Property(ct => ct.ConceptId).HasColumnName("concept_id");
        builder.Property(ct => ct.TagId).HasColumnName("tag_id");
        builder.Property(ct => ct.CreatedAt).HasColumnName("created_at");
        builder.HasOne(ct => ct.Concept).WithMany(c => c.ConceptTags)
            .HasForeignKey(ct => ct.ConceptId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(ct => ct.Tag).WithMany(t => t.ConceptTags)
            .HasForeignKey(ct => ct.TagId).OnDelete(DeleteBehavior.Cascade);
    }
}
