using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Knowledge.DTOs;
using LearnCS.Domain.Knowledge;

namespace LearnCS.Application.Features.Knowledge.Services;

public class ConceptService(
    IConceptRepository conceptRepository,
    IUnitOfWork unitOfWork) : IConceptService
{
    private static readonly string[] ElevatedRoles = ["Owner", "Mentor", "Admin", "SuperAdmin", "ContentManager"];

    public async Task<Result<IReadOnlyList<ConceptSummaryDto>>> GetPublishedConceptsAsync(
        string? category = null,
        ConceptDifficulty? maxDifficulty = null,
        CancellationToken cancellationToken = default)
    {
        IReadOnlyList<Concept> concepts;

        if (!string.IsNullOrWhiteSpace(category))
        {
            concepts = await conceptRepository.GetByCategoryAsync(category.Trim(), cancellationToken);
        }
        else if (maxDifficulty.HasValue)
        {
            concepts = await conceptRepository.GetByDifficultyRangeAsync(maxDifficulty.Value, cancellationToken);
        }
        else
        {
            concepts = await conceptRepository.GetAllPublishedAsync(cancellationToken);
        }

        var dtos = concepts.Select(MapToSummaryDto).ToList();
        return Result<IReadOnlyList<ConceptSummaryDto>>.Success(dtos);
    }

    public async Task<Result<ConceptDetailsDto>> GetConceptBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return Result<ConceptDetailsDto>.Failure("Invalid concept slug.", "INVALID_INPUT");
        }

        var normalizedSlug = slug.Trim().ToLowerInvariant();
        var concept = await conceptRepository.FindBySlugWithDetailsAsync(normalizedSlug, cancellationToken);

        if (concept == null)
        {
            return Result<ConceptDetailsDto>.Failure($"Concept '{slug}' not found.", "NOT_FOUND");
        }

        // Fetch prerequisites
        var prereqRelationships = await conceptRepository.GetPrerequisitesForAsync(concept.Id, cancellationToken);
        var prereqDtos = new List<ConceptSummaryDto>();

        foreach (var rel in prereqRelationships)
        {
            var sourceConcept = await conceptRepository.FindByIdAsync(rel.SourceConceptId, trackForUpdate: false, cancellationToken);
            if (sourceConcept != null && sourceConcept.Status == ConceptStatus.Published)
            {
                prereqDtos.Add(MapToSummaryDto(sourceConcept));
            }
        }

        var objectiveDtos = concept.LearningObjectives
            .Where(o => o.IsActive)
            .OrderBy(o => o.DisplayOrder)
            .Select(o => new LearningObjectiveDto(o.Id, o.Title, o.Description, o.BloomLevel.ToString(), o.DisplayOrder))
            .ToList();

        var tagDtos = concept.ConceptTags
            .Where(ct => ct.Tag != null)
            .Select(ct => new TagDto(ct.Tag!.Id, ct.Tag.Name, ct.Tag.Slug, ct.Tag.Color))
            .ToList();

        var dto = new ConceptDetailsDto(
            concept.Id,
            concept.Title,
            concept.Slug,
            concept.Description,
            concept.Category,
            concept.Difficulty.ToString(),
            concept.Status.ToString(),
            concept.EstimatedMinutes,
            objectiveDtos,
            tagDtos,
            prereqDtos
        );

        return Result<ConceptDetailsDto>.Success(dto);
    }

    public async Task<Result<KnowledgeGraphDto>> GetKnowledgeGraphAsync(CancellationToken cancellationToken = default)
    {
        var concepts = await conceptRepository.GetAllPublishedAsync(cancellationToken);
        var relationships = await conceptRepository.GetAllRelationshipsAsync(cancellationToken);

        var nodeMap = concepts.ToDictionary(c => c.Id, MapToSummaryDto);

        var edgeDtos = relationships
            .Where(r => nodeMap.ContainsKey(r.SourceConceptId) && nodeMap.ContainsKey(r.TargetConceptId))
            .Select(r => new ConceptRelationshipDto(
                r.Id,
                r.SourceConceptId,
                nodeMap.TryGetValue(r.SourceConceptId, out var src) ? src.Title : string.Empty,
                r.TargetConceptId,
                nodeMap.TryGetValue(r.TargetConceptId, out var tgt) ? tgt.Title : string.Empty,
                r.RelationType.ToString(),
                r.Weight
            ))
            .ToList();

        var graphDto = new KnowledgeGraphDto(
            Nodes: nodeMap.Values.ToList(),
            Edges: edgeDtos
        );

        return Result<KnowledgeGraphDto>.Success(graphDto);
    }

    public async Task<Result<ConceptSummaryDto>> CreateConceptAsync(
        CreateConceptRequest request,
        IEnumerable<string> callerRoles,
        CancellationToken cancellationToken = default)
    {
        // 1. RBAC Check: Only Mentors and Owners can create concepts
        if (!HasElevatedRole(callerRoles))
        {
            return Result<ConceptSummaryDto>.Failure(
                "Forbidden: Only Mentors or Owners are authorized to create learning concepts.",
                "FORBIDDEN"
            );
        }

        // 2. Input validation
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return Result<ConceptSummaryDto>.Failure("Concept title is required.", "INVALID_INPUT");
        }

        if (string.IsNullOrWhiteSpace(request.Slug))
        {
            return Result<ConceptSummaryDto>.Failure("Concept slug is required.", "INVALID_INPUT");
        }

        if (string.IsNullOrWhiteSpace(request.Category))
        {
            return Result<ConceptSummaryDto>.Failure("Concept category is required.", "INVALID_INPUT");
        }

        var normalizedSlug = request.Slug.Trim().ToLowerInvariant();

        // 3. Uniqueness check
        if (await conceptRepository.ExistsBySlugAsync(normalizedSlug, cancellationToken))
        {
            return Result<ConceptSummaryDto>.Failure("A concept with this slug already exists.", "SLUG_EXISTS");
        }

        // 4. Create entity
        var concept = Concept.Create(
            request.Title.Trim(),
            normalizedSlug,
            request.Category.Trim(),
            request.Difficulty,
            request.Description?.Trim(),
            request.EstimatedMinutes
        );

        if (request.Publish)
        {
            concept.Publish();
        }

        conceptRepository.Add(concept);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<ConceptSummaryDto>.Success(MapToSummaryDto(concept));
    }

    public async Task<Result<ConceptSummaryDto>> UpdateConceptAsync(
        Guid conceptId,
        UpdateConceptRequest request,
        IEnumerable<string> callerRoles,
        CancellationToken cancellationToken = default)
    {
        // 1. RBAC Check
        if (!HasElevatedRole(callerRoles))
        {
            return Result<ConceptSummaryDto>.Failure(
                "Forbidden: Only Mentors or Owners are authorized to modify learning concepts.",
                "FORBIDDEN"
            );
        }

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return Result<ConceptSummaryDto>.Failure("Concept title is required.", "INVALID_INPUT");
        }

        var concept = await conceptRepository.FindByIdAsync(conceptId, trackForUpdate: true, cancellationToken);
        if (concept == null)
        {
            return Result<ConceptSummaryDto>.Failure("Concept not found.", "NOT_FOUND");
        }

        concept.Update(
            request.Title.Trim(),
            request.Description?.Trim(),
            request.Difficulty,
            request.Category.Trim(),
            request.EstimatedMinutes
        );

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<ConceptSummaryDto>.Success(MapToSummaryDto(concept));
    }

    public async Task<Result<ConceptSummaryDto>> PublishConceptAsync(
        Guid conceptId,
        IEnumerable<string> callerRoles,
        CancellationToken cancellationToken = default)
    {
        if (!HasElevatedRole(callerRoles))
        {
            return Result<ConceptSummaryDto>.Failure(
                "Forbidden: Only Mentors or Owners are authorized to publish learning concepts.",
                "FORBIDDEN"
            );
        }

        var concept = await conceptRepository.FindByIdAsync(conceptId, trackForUpdate: true, cancellationToken);
        if (concept == null)
        {
            return Result<ConceptSummaryDto>.Failure("Concept not found.", "NOT_FOUND");
        }

        concept.Publish();
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<ConceptSummaryDto>.Success(MapToSummaryDto(concept));
    }

    private static bool HasElevatedRole(IEnumerable<string> roles)
    {
        return roles != null && roles.Any(r => ElevatedRoles.Contains(r, StringComparer.OrdinalIgnoreCase));
    }

    private static ConceptSummaryDto MapToSummaryDto(Concept concept)
    {
        return new ConceptSummaryDto(
            concept.Id,
            concept.Title,
            concept.Slug,
            concept.Category,
            concept.Difficulty.ToString(),
            concept.Status.ToString(),
            concept.EstimatedMinutes
        );
    }
}
