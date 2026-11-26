using LearnCS.Application.Features.Knowledge.DTOs;
using LearnCS.Application.Features.Knowledge.Services;
using LearnCS.Domain.Knowledge;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/concepts")]
public class ConceptsController(IConceptService conceptService) : ApiControllerBase
{
    /// <summary>
    /// Retrieves published concepts, optionally filtered by category or max difficulty.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<ConceptSummaryDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPublishedConcepts(
        [FromQuery] string? category,
        [FromQuery] ConceptDifficulty? maxDifficulty,
        CancellationToken cancellationToken)
    {
        var result = await conceptService.GetPublishedConceptsAsync(category, maxDifficulty, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves the Knowledge Graph structure (nodes and edges) for interactive map rendering.
    /// </summary>
    [HttpGet("graph")]
    [ProducesResponseType(typeof(KnowledgeGraphDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetKnowledgeGraph(CancellationToken cancellationToken)
    {
        var result = await conceptService.GetKnowledgeGraphAsync(cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves published concepts belonging to a specific category.
    /// </summary>
    [HttpGet("category/{category}")]
    [ProducesResponseType(typeof(IReadOnlyList<ConceptSummaryDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetConceptsByCategory(
        [FromRoute] string category,
        CancellationToken cancellationToken)
    {
        var result = await conceptService.GetPublishedConceptsAsync(category, null, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves full details for a concept node by its unique slug.
    /// </summary>
    [HttpGet("{slug}")]
    [ProducesResponseType(typeof(ConceptDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetConceptBySlug(
        [FromRoute] string slug,
        CancellationToken cancellationToken)
    {
        var result = await conceptService.GetConceptBySlugAsync(slug, cancellationToken);
        return HandleResult(result);
    }
}
