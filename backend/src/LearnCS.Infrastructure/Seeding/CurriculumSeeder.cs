using System.Text.Json;
using LearnCS.Domain.Curriculum;
using LearnCS.Domain.Knowledge;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Seeding;

public static class CurriculumSeeder
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    private static string? ResolveSeedFile(string fileName)
    {
        var candidates = new[]
        {
            Path.Combine(AppContext.BaseDirectory, "Seeding", fileName),
            Path.Combine(AppContext.BaseDirectory, fileName),
            Path.Combine(Directory.GetCurrentDirectory(), "Seeding", fileName),
            Path.Combine(Directory.GetCurrentDirectory(), "..", "LearnCS.Infrastructure", "Seeding", fileName),
            Path.Combine(Directory.GetCurrentDirectory(), "backend", "src", "LearnCS.Infrastructure", "Seeding", fileName),
            Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "LearnCS.Infrastructure", "Seeding", fileName)),
            Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "..", "backend", "src", "LearnCS.Infrastructure", "Seeding", fileName))
        };

        return candidates.FirstOrDefault(File.Exists);
    }

    public static async Task SeedFromJsonIfPresentAsync(AppDbContext db, CancellationToken cancellationToken = default)
    {
        var curriculumPath = ResolveSeedFile("curriculum-seed.json");
        if (curriculumPath != null)
        {
            var rawJson = await File.ReadAllTextAsync(curriculumPath, cancellationToken);
            var payload = JsonSerializer.Deserialize<CurriculumSeedDocument>(rawJson, JsonOptions);
            if (payload != null)
            {
                await UpsertCurriculumAsync(db, payload, cancellationToken);
            }
        }

        var questionsPath = ResolveSeedFile("question-bank-seed.json");
        if (questionsPath != null)
        {
            var rawJson = await File.ReadAllTextAsync(questionsPath, cancellationToken);
            var payload = JsonSerializer.Deserialize<QuestionBankSeedDocument>(rawJson, JsonOptions);
            if (payload != null)
            {
                await UpsertQuestionBankAsync(db, payload, cancellationToken);
            }
        }
    }

    public static async Task UpsertCurriculumAsync(
        AppDbContext db,
        CurriculumSeedDocument doc,
        CancellationToken cancellationToken = default)
    {
        // 1. Canonical Concepts
        var existingConcepts = await db.CanonicalConcepts.ToDictionaryAsync(c => c.Id, cancellationToken);
        foreach (var c in doc.Concepts)
        {
            var id = c.Id.Trim().ToLowerInvariant();
            if (!existingConcepts.TryGetValue(id, out var entity))
            {
                entity = CanonicalConceptRecord.Create(
                    id, c.TitleEn, c.TitleAr, c.DescriptionEn, c.DescriptionAr, c.Domain);
                db.CanonicalConcepts.Add(entity);
                existingConcepts[id] = entity;
            }
            else
            {
                entity.Update(c.TitleEn, c.TitleAr, c.DescriptionEn, c.DescriptionAr, c.Domain, ContentPublishStatus.Published);
            }
        }
        await db.SaveChangesAsync(cancellationToken);

        // 2. Reusable Units + Sections
        var existingUnits = await db.ReusableUnits.Include(u => u.Sections).ToDictionaryAsync(u => u.Id, cancellationToken);
        foreach (var u in doc.Units)
        {
            var unitId = u.Id.Trim().ToLowerInvariant();
            var conceptId = u.ConceptId.Trim().ToLowerInvariant();
            var tagsJson = JsonSerializer.Serialize(u.Tags ?? []);
            var prereqJson = JsonSerializer.Serialize(u.Prerequisites ?? []);
            var interactiveJson = JsonSerializer.Serialize(u.InteractiveModuleIds ?? []);
            var refsJson = JsonSerializer.Serialize(u.ExternalReferences ?? []);
            var objEnJson = JsonSerializer.Serialize(u.ObjectivesEn ?? []);
            var objArJson = JsonSerializer.Serialize(u.ObjectivesAr ?? []);

            if (!existingUnits.TryGetValue(unitId, out var unitEntity))
            {
                unitEntity = ReusableUnit.Create(
                    unitId,
                    conceptId,
                    u.TitleEn,
                    u.TitleAr,
                    u.DescriptionEn,
                    u.DescriptionAr,
                    u.Difficulty,
                    u.EstimatedMinutes,
                    tagsJson,
                    prereqJson,
                    interactiveJson,
                    refsJson,
                    objEnJson,
                    objArJson,
                    u.IsFreeTier,
                    u.QuizPassPercentage > 0 ? u.QuizPassPercentage : 60,
                    u.QuizQuestionCount > 0 ? u.QuizQuestionCount : 5
                );
                db.ReusableUnits.Add(unitEntity);
                existingUnits[unitId] = unitEntity;
            }
            else
            {
                unitEntity.UpdateMetadata(
                    u.TitleEn,
                    u.TitleAr,
                    u.DescriptionEn,
                    u.DescriptionAr,
                    u.Difficulty,
                    u.EstimatedMinutes,
                    tagsJson,
                    prereqJson,
                    interactiveJson,
                    refsJson,
                    objEnJson,
                    objArJson,
                    u.IsFreeTier,
                    u.QuizPassPercentage > 0 ? u.QuizPassPercentage : 60,
                    u.QuizQuestionCount > 0 ? u.QuizQuestionCount : 5,
                    ContentPublishStatus.Published
                );
            }

            var existingSections = unitEntity.Sections.ToDictionary(s => s.Id);
            var targetSectionIds = new HashSet<string>(StringComparer.Ordinal);
            var orderIdx = 1;
            foreach (var s in u.Sections)
            {
                targetSectionIds.Add(s.Id);
                var inlineJson = s.InlineQuestions != null && s.InlineQuestions.Count > 0
                    ? JsonSerializer.Serialize(s.InlineQuestions)
                    : null;

                if (!existingSections.TryGetValue(s.Id, out var secEntity))
                {
                    secEntity = UnitSection.Create(
                        s.Id,
                        unitId,
                        s.Type,
                        s.TitleEn,
                        s.TitleAr,
                        s.ContentEn,
                        s.ContentAr,
                        s.DisplayOrder > 0 ? s.DisplayOrder : orderIdx,
                        s.IsRequired,
                        s.CodeSnippet,
                        s.CodeLanguage,
                        s.CodeExplanationEn,
                        s.CodeExplanationAr,
                        s.ExpectedOutput,
                        s.InteractiveModuleId,
                        inlineJson
                    );
                    db.UnitSections.Add(secEntity);
                }
                else
                {
                    secEntity.Update(
                        s.Type,
                        s.TitleEn,
                        s.TitleAr,
                        s.ContentEn,
                        s.ContentAr,
                        s.DisplayOrder > 0 ? s.DisplayOrder : orderIdx,
                        s.IsRequired,
                        s.CodeSnippet,
                        s.CodeLanguage,
                        s.CodeExplanationEn,
                        s.CodeExplanationAr,
                        s.ExpectedOutput,
                        s.InteractiveModuleId,
                        inlineJson
                    );
                }
                orderIdx++;
            }

            // Prune obsolete sections removed from canonical unit seed
            foreach (var staleSec in existingSections.Values.Where(x => !targetSectionIds.Contains(x.Id)))
            {
                db.UnitSections.Remove(staleSec);
            }
        }
        await db.SaveChangesAsync(cancellationToken);

        // 3. Paths + Modules + Placements
        var existingPaths = await db.CurriculumPaths
            .Include(p => p.Modules)
                .ThenInclude(m => m.Placements)
            .ToDictionaryAsync(p => p.Id, cancellationToken);

        foreach (var p in doc.Paths)
        {
            var pathId = p.Id.Trim().ToLowerInvariant();
            var prereqJson = JsonSerializer.Serialize(p.Prerequisites ?? []);
            var nextPathsJson = JsonSerializer.Serialize(p.RecommendedNextPaths ?? []);

            if (!existingPaths.TryGetValue(pathId, out var pathEntity))
            {
                pathEntity = CurriculumPath.Create(
                    pathId,
                    p.TitleEn,
                    p.TitleAr,
                    p.DescriptionEn,
                    p.DescriptionAr,
                    p.Category,
                    p.DisplayOrder,
                    p.TargetAudienceEn,
                    p.TargetAudienceAr,
                    prereqJson,
                    nextPathsJson
                );
                db.CurriculumPaths.Add(pathEntity);
                existingPaths[pathId] = pathEntity;
            }
            else
            {
                pathEntity.Update(
                    p.TitleEn,
                    p.TitleAr,
                    p.DescriptionEn,
                    p.DescriptionAr,
                    p.Category,
                    p.DisplayOrder,
                    p.TargetAudienceEn,
                    p.TargetAudienceAr,
                    prereqJson,
                    nextPathsJson,
                    ContentPublishStatus.Published
                );
            }

            var existingModules = pathEntity.Modules.ToDictionary(m => m.Id);
            foreach (var m in p.Modules)
            {
                var modId = m.Id.Trim().ToLowerInvariant();
                if (!existingModules.TryGetValue(modId, out var modEntity))
                {
                    modEntity = CurriculumModule.Create(
                        modId,
                        pathId,
                        m.TitleEn,
                        m.TitleAr,
                        m.DescriptionEn,
                        m.DescriptionAr,
                        m.DisplayOrder
                    );
                    db.CurriculumModules.Add(modEntity);
                    existingModules[modId] = modEntity;
                }
                else
                {
                    modEntity.Update(m.TitleEn, m.TitleAr, m.DescriptionEn, m.DescriptionAr, m.DisplayOrder);
                }

                var existingPlacements = modEntity.Placements.ToDictionary(pl => pl.UnitId);
                var targetUnitIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
                var pos = 1;
                foreach (var unitRef in m.UnitIds)
                {
                    var normalizedUnitId = unitRef.Trim().ToLowerInvariant();
                    if (!existingUnits.ContainsKey(normalizedUnitId)) continue;
                    targetUnitIds.Add(normalizedUnitId);

                    if (!existingPlacements.TryGetValue(normalizedUnitId, out var placement))
                    {
                        db.ModuleUnitPlacements.Add(ModuleUnitPlacement.Create(modId, normalizedUnitId, pos, false));
                    }
                    else
                    {
                        placement.UpdateOrder(pos, placement.IsOptional);
                    }
                    pos++;
                }

                foreach (var stalePlacement in existingPlacements.Values.Where(pl => !targetUnitIds.Contains(pl.UnitId)))
                {
                    db.ModuleUnitPlacements.Remove(stalePlacement);
                }
            }
        }

        await db.SaveChangesAsync(cancellationToken);

        await SyncKnowledgeConceptsAsync(db, doc, cancellationToken);
    }

    private static async Task SyncKnowledgeConceptsAsync(
        AppDbContext db,
        CurriculumSeedDocument doc,
        CancellationToken cancellationToken)
    {
        if (doc.Concepts.Count == 0) return;

        var existingBySlug = await db.Concepts
            .ToDictionaryAsync(c => c.Slug.ToLower(), cancellationToken);
        var changed = false;

        // Archive legacy orphan 'strings-text' only when full 40-concept catalog is synced and it has zero FK references
        if (doc.Concepts.Count >= 20 && existingBySlug.TryGetValue("strings-text", out var legacyStrings)
            && legacyStrings.Status != ConceptStatus.Archived)
        {
            var hasRefs = await db.Lessons.AnyAsync(l => l.ConceptId == legacyStrings.Id, cancellationToken)
                || await db.Questions.AnyAsync(q => q.ConceptId == legacyStrings.Id, cancellationToken)
                || await db.LearningResources.AnyAsync(r => r.ConceptId == legacyStrings.Id, cancellationToken)
                || await db.ConceptMasteries.AnyAsync(m => m.ConceptId == legacyStrings.Id, cancellationToken);
            if (!hasRefs)
            {
                legacyStrings.Archive();
                changed = true;
            }
        }

        foreach (var c in doc.Concepts)
        {
            var slug = ConceptMapping.ResolveSlug(c.Id);
            var difficulty = ConceptMapping.ResolveDifficulty(c.Id);

            if (!existingBySlug.TryGetValue(slug, out var kc))
            {
                kc = Concept.Create(c.TitleEn, slug, c.Domain, difficulty, c.DescriptionEn, 45);
                kc.Publish();
                db.Concepts.Add(kc);
                existingBySlug[slug] = kc;
                changed = true;
            }
            else if (kc.Status == ConceptStatus.Draft)
            {
                kc.Publish();
                changed = true;
            }
        }

        if (changed)
        {
            await db.SaveChangesAsync(cancellationToken);
        }

        if (doc.Concepts.Count >= 20)
        {
            var existingEdges = await db.ConceptRelationships
                .AsNoTracking()
                .Select(e => e.SourceConceptId + "|" + e.TargetConceptId)
                .ToHashSetAsync(cancellationToken);

            var prereqPairs = new (string SourceSlug, string TargetSlug, RelationType Type)[]
            {
                ("computer-basics", "data-representation", RelationType.Prerequisite),
                ("data-representation", "internet-foundations", RelationType.Related),
                ("data-representation", "programming-basics", RelationType.Prerequisite),
                ("functions-methods", "memory-model", RelationType.Prerequisite),
                ("arrays-lists", "stacks-queues", RelationType.Prerequisite),
                ("arrays-lists", "hash-tables", RelationType.Prerequisite),
                ("linked-lists", "trees-heaps", RelationType.Prerequisite),
                ("trees-heaps", "graphs", RelationType.Prerequisite),
                ("searching-algorithms", "binary-search", RelationType.BuildsOn),
                ("sorting-algorithms", "binary-search", RelationType.Related),
                ("recursion", "greedy-algorithms", RelationType.Related),
                ("recursion", "dynamic-programming", RelationType.Prerequisite),
                ("graphs", "graph-algorithms", RelationType.Prerequisite),
                ("propositional-logic", "sets-relations-proofs", RelationType.Prerequisite),
                ("sets-relations-proofs", "counting-combinatorics", RelationType.Prerequisite),
                ("binary-search", "cp-foundations", RelationType.Prerequisite),
                ("cp-foundations", "two-pointers", RelationType.BuildsOn),
                ("counting-combinatorics", "cp-number-theory", RelationType.Prerequisite),
                ("trees-heaps", "cp-range-queries", RelationType.Prerequisite),
                ("databases-intro", "database-design", RelationType.Prerequisite),
                ("sql-fundamentals", "acid-transactions", RelationType.Prerequisite),
                ("computer-basics", "os-processes-threads", RelationType.Prerequisite),
                ("os-processes-threads", "os-cpu-scheduling", RelationType.Prerequisite),
                ("os-processes-threads", "os-virtual-memory", RelationType.Prerequisite),
                ("internet-foundations", "computer-networking", RelationType.Prerequisite),
                ("oop", "software-engineering", RelationType.Prerequisite),
            };

            var addedEdges = false;
            foreach (var (srcSlug, dstSlug, relType) in prereqPairs)
            {
                if (!existingBySlug.TryGetValue(srcSlug, out var src) || !existingBySlug.TryGetValue(dstSlug, out var dst))
                    continue;
                var key = src.Id + "|" + dst.Id;
                if (existingEdges.Contains(key)) continue;
                db.ConceptRelationships.Add(ConceptRelationship.Create(src.Id, dst.Id, relType));
                existingEdges.Add(key);
                addedEdges = true;
            }

            if (addedEdges)
            {
                await db.SaveChangesAsync(cancellationToken);
            }
        }
    }

    public static async Task UpsertQuestionBankAsync(
        AppDbContext db,
        QuestionBankSeedDocument doc,
        CancellationToken cancellationToken = default)
    {
        var existingItems = await db.QuestionBankItems
            .Include(q => q.Options)
            .ToDictionaryAsync(q => q.Id, cancellationToken);

        var existingQuestionIds = new HashSet<string>(existingItems.Keys, StringComparer.Ordinal);
        var newItems = new List<QuestionBankItem>();
        var newOptions = new List<QuestionBankOption>();
        var updatedAny = false;

        foreach (var q in doc.Questions)
        {
            if (existingItems.TryGetValue(q.Id, out var existingItem))
            {
                var tagsJsonSync = JsonSerializer.Serialize(q.Tags ?? []);
                var needsItemUpdate =
                    !string.Equals(existingItem.Domain, q.Domain, StringComparison.Ordinal) ||
                    !string.Equals(existingItem.Topic, q.Topic, StringComparison.Ordinal) ||
                    !string.Equals(existingItem.Subtopic, q.Subtopic, StringComparison.Ordinal) ||
                    !string.Equals(existingItem.Difficulty, q.Difficulty, StringComparison.Ordinal) ||
                    !string.Equals(existingItem.QuestionType, string.IsNullOrWhiteSpace(q.QuestionType) ? "concept" : q.QuestionType, StringComparison.Ordinal) ||
                    !string.Equals(existingItem.QuestionEn, q.QuestionEn, StringComparison.Ordinal) ||
                    !string.Equals(existingItem.QuestionAr, q.QuestionAr, StringComparison.Ordinal) ||
                    !string.Equals(existingItem.ExplanationEn ?? "", q.ExplanationEn ?? "", StringComparison.Ordinal) ||
                    !string.Equals(existingItem.ExplanationAr ?? "", q.ExplanationAr ?? "", StringComparison.Ordinal) ||
                    !string.Equals(existingItem.CodeSnippet ?? "", q.CodeSnippet ?? "", StringComparison.Ordinal);

                var orderedExistingOpts = existingItem.Options.OrderBy(o => o.DisplayOrder).ToList();
                var needsOptionsUpdate =
                    orderedExistingOpts.Count != q.Options.Count ||
                    orderedExistingOpts.Zip(q.Options).Any(pair =>
                        !string.Equals(pair.First.OptionKey, pair.Second.Key, StringComparison.Ordinal) ||
                        !string.Equals(pair.First.TextEn, pair.Second.TextEn, StringComparison.Ordinal) ||
                        !string.Equals(pair.First.TextAr, pair.Second.TextAr, StringComparison.Ordinal) ||
                        pair.First.IsCorrect != pair.Second.IsCorrect);

                if (needsItemUpdate)
                {
                    existingItem.Update(
                        q.Domain,
                        q.Topic,
                        q.Subtopic,
                        q.Difficulty,
                        string.IsNullOrWhiteSpace(q.QuestionType) ? "concept" : q.QuestionType,
                        q.QuestionEn,
                        q.QuestionAr,
                        q.ExplanationEn,
                        q.ExplanationAr,
                        q.CodeSnippet,
                        q.CodeLanguage,
                        q.Specialization,
                        tagsJsonSync,
                        ContentPublishStatus.Published
                    );
                    updatedAny = true;
                }

                if (needsOptionsUpdate)
                {
                    if (existingItem.Options.Count > 0)
                    {
                        db.QuestionBankOptions.RemoveRange(existingItem.Options);
                    }
                    var repIdx = 0;
                    foreach (var opt in q.Options)
                    {
                        newOptions.Add(QuestionBankOption.Create(
                            q.Id,
                            opt.Key,
                            opt.TextEn,
                            opt.TextAr,
                            opt.IsCorrect,
                            repIdx++
                        ));
                    }
                    updatedAny = true;
                }
                continue;
            }
            existingQuestionIds.Add(q.Id);

            var tagsJson = JsonSerializer.Serialize(q.Tags ?? []);
            var entity = QuestionBankItem.Create(
                q.Id,
                q.Domain,
                q.Topic,
                q.Subtopic,
                q.Difficulty,
                string.IsNullOrWhiteSpace(q.QuestionType) ? "concept" : q.QuestionType,
                q.QuestionEn,
                q.QuestionAr,
                q.ExplanationEn,
                q.ExplanationAr,
                q.CodeSnippet,
                q.CodeLanguage,
                q.Specialization,
                tagsJson,
                q.EstimatedTimeSeconds > 0 ? q.EstimatedTimeSeconds : 60,
                ContentPublishStatus.Published
            );
            newItems.Add(entity);

            var idx = 0;
            foreach (var opt in q.Options)
            {
                newOptions.Add(QuestionBankOption.Create(
                    q.Id,
                    opt.Key,
                    opt.TextEn,
                    opt.TextAr,
                    opt.IsCorrect,
                    idx++
                ));
            }
        }

        if (updatedAny)
        {
            await db.SaveChangesAsync(cancellationToken);
        }

        if (newItems.Count > 0 || newOptions.Count > 0)
        {
            const int batchSize = 500;
            for (var i = 0; i < newItems.Count; i += batchSize)
            {
                db.QuestionBankItems.AddRange(newItems.Skip(i).Take(batchSize));
                await db.SaveChangesAsync(cancellationToken);
            }
            for (var i = 0; i < newOptions.Count; i += batchSize)
            {
                db.QuestionBankOptions.AddRange(newOptions.Skip(i).Take(batchSize));
                await db.SaveChangesAsync(cancellationToken);
            }
        }

        // Upsert unit <-> question mappings safely
        if (doc.UnitMappings.Count > 0)
        {
            var validUnits = await db.ReusableUnits.AsNoTracking().Select(u => u.Id).ToHashSetAsync(cancellationToken);
            var existingKeys = await db.UnitQuestionMappings
                .AsNoTracking()
                .Select(m => m.UnitId + "|" + (m.SectionId ?? "") + "|" + m.QuestionId)
                .ToHashSetAsync(cancellationToken);

            var newMappings = new List<UnitQuestionMapping>();
            var order = 1;
            foreach (var map in doc.UnitMappings)
            {
                var uId = map.UnitId.Trim().ToLowerInvariant();
                if (!validUnits.Contains(uId) || !existingQuestionIds.Contains(map.QuestionId)) continue;
                var secKey = map.SectionId ?? "";
                var composite = uId + "|" + secKey + "|" + map.QuestionId;
                if (!existingKeys.Add(composite)) continue;

                newMappings.Add(UnitQuestionMapping.Create(uId, map.QuestionId, map.SectionId, order++));
            }

            if (newMappings.Count > 0)
            {
                const int batchSize = 500;
                for (var i = 0; i < newMappings.Count; i += batchSize)
                {
                    db.UnitQuestionMappings.AddRange(newMappings.Skip(i).Take(batchSize));
                    await db.SaveChangesAsync(cancellationToken);
                }
            }
        }
    }
}

public sealed class CurriculumSeedDocument
{
    public List<ConceptSeedDto> Concepts { get; set; } = [];
    public List<UnitSeedDto> Units { get; set; } = [];
    public List<PathSeedDto> Paths { get; set; } = [];
}

public sealed class ConceptSeedDto
{
    public string Id { get; set; } = "";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string DescriptionEn { get; set; } = "";
    public string DescriptionAr { get; set; } = "";
    public string Domain { get; set; } = "";
}

public sealed class UnitSeedDto
{
    public string Id { get; set; } = "";
    public string ConceptId { get; set; } = "";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string DescriptionEn { get; set; } = "";
    public string DescriptionAr { get; set; } = "";
    public string Difficulty { get; set; } = "beginner";
    public int EstimatedMinutes { get; set; } = 30;
    public bool IsFreeTier { get; set; } = true;
    public int QuizPassPercentage { get; set; } = 60;
    public int QuizQuestionCount { get; set; } = 5;
    public List<string>? Tags { get; set; }
    public List<object>? Prerequisites { get; set; }
    public List<string>? InteractiveModuleIds { get; set; }
    public List<object>? ExternalReferences { get; set; }
    public List<string>? ObjectivesEn { get; set; }
    public List<string>? ObjectivesAr { get; set; }
    public List<UnitSectionSeedDto> Sections { get; set; } = [];
}

public sealed class UnitSectionSeedDto
{
    public string Id { get; set; } = "";
    public string Type { get; set; } = "theory";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string ContentEn { get; set; } = "";
    public string ContentAr { get; set; } = "";
    public int DisplayOrder { get; set; }
    public bool IsRequired { get; set; } = true;
    public string? CodeSnippet { get; set; }
    public string? CodeLanguage { get; set; }
    public string? CodeExplanationEn { get; set; }
    public string? CodeExplanationAr { get; set; }
    public string? ExpectedOutput { get; set; }
    public string? InteractiveModuleId { get; set; }
    public List<object>? InlineQuestions { get; set; }
}

public sealed class PathSeedDto
{
    public string Id { get; set; } = "";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string DescriptionEn { get; set; } = "";
    public string DescriptionAr { get; set; } = "";
    public string? TargetAudienceEn { get; set; }
    public string? TargetAudienceAr { get; set; }
    public string Category { get; set; } = "Core Computer Science";
    public int DisplayOrder { get; set; }
    public List<object>? Prerequisites { get; set; }
    public List<string>? RecommendedNextPaths { get; set; }
    public List<ModuleSeedDto> Modules { get; set; } = [];
}

public sealed class ModuleSeedDto
{
    public string Id { get; set; } = "";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string DescriptionEn { get; set; } = "";
    public string DescriptionAr { get; set; } = "";
    public int DisplayOrder { get; set; }
    public List<string> UnitIds { get; set; } = [];
}

public sealed class QuestionBankSeedDocument
{
    public List<QuestionSeedDto> Questions { get; set; } = [];
    public List<UnitMappingSeedDto> UnitMappings { get; set; } = [];
}

public sealed class QuestionSeedDto
{
    public string Id { get; set; } = "";
    public string Domain { get; set; } = "";
    public string Topic { get; set; } = "";
    public string Subtopic { get; set; } = "";
    public string? Specialization { get; set; }
    public string Difficulty { get; set; } = "medium";
    public string QuestionType { get; set; } = "concept";
    public string? CodeSnippet { get; set; }
    public string? CodeLanguage { get; set; }
    public string QuestionEn { get; set; } = "";
    public string QuestionAr { get; set; } = "";
    public string? ExplanationEn { get; set; }
    public string? ExplanationAr { get; set; }
    public List<string>? Tags { get; set; }
    public int EstimatedTimeSeconds { get; set; } = 60;
    public List<QuestionOptionSeedDto> Options { get; set; } = [];
}

public sealed class QuestionOptionSeedDto
{
    public string Key { get; set; } = "";
    public string TextEn { get; set; } = "";
    public string TextAr { get; set; } = "";
    public bool IsCorrect { get; set; }
}

public sealed class UnitMappingSeedDto
{
    public string UnitId { get; set; } = "";
    public string? SectionId { get; set; }
    public string QuestionId { get; set; } = "";
}
