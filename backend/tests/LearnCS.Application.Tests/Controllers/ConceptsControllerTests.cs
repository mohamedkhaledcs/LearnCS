using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.Knowledge.DTOs;
using LearnCS.Application.Features.Knowledge.Services;
using LearnCS.Domain.Knowledge;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class ConceptsControllerTests
{
    private readonly Mock<IConceptService> _conceptServiceMock = new();
    private readonly ConceptsController _sut;

    public ConceptsControllerTests()
    {
        _sut = new ConceptsController(_conceptServiceMock.Object);
    }

    [Fact]
    public async Task GetPublishedConcepts_Success_ReturnsOkResultWithConceptList()
    {
        // Arrange
        var concepts = new List<ConceptSummaryDto>
        {
            new(Guid.NewGuid(), "Variables & Data Types", "variables-types", "Foundations", "Beginner", "Published", 15),
            new(Guid.NewGuid(), "Arrays & Lists", "arrays-lists", "Data Structures", "Beginner", "Published", 20)
        };

        _conceptServiceMock.Setup(s => s.GetPublishedConceptsAsync(null, null, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<ConceptSummaryDto>>.Success(concepts));

        // Act
        var actionResult = await _sut.GetPublishedConcepts(null, null, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<ConceptSummaryDto>>(okResult.Value);
        Assert.Equal(2, responseValue.Count);
        Assert.Equal("variables-types", responseValue[0].Slug);
    }

    [Fact]
    public async Task GetConceptsByCategory_Success_ReturnsOkResultWithFilteredConcepts()
    {
        // Arrange
        var category = "Data Structures";
        var concepts = new List<ConceptSummaryDto>
        {
            new(Guid.NewGuid(), "Arrays & Lists", "arrays-lists", "Data Structures", "Beginner", "Published", 20)
        };

        _conceptServiceMock.Setup(s => s.GetPublishedConceptsAsync(category, null, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<ConceptSummaryDto>>.Success(concepts));

        // Act
        var actionResult = await _sut.GetConceptsByCategory(category, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<ConceptSummaryDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal("Data Structures", responseValue[0].Category);
    }

    [Fact]
    public async Task GetConceptBySlug_Success_ReturnsOkResultWithConceptDetails()
    {
        // Arrange
        var slug = "variables-types";
        var detailsDto = new ConceptDetailsDto(
            Guid.NewGuid(),
            "Variables & Data Types",
            slug,
            "Description text",
            "Foundations",
            "Beginner",
            "Published",
            15,
            new List<LearningObjectiveDto>(),
            new List<TagDto>(),
            new List<ConceptSummaryDto>()
        );

        _conceptServiceMock.Setup(s => s.GetConceptBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<ConceptDetailsDto>.Success(detailsDto));

        // Act
        var actionResult = await _sut.GetConceptBySlug(slug, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<ConceptDetailsDto>(okResult.Value);
        Assert.Equal(slug, responseValue.Slug);
        Assert.Equal("Variables & Data Types", responseValue.Title);
    }

    [Fact]
    public async Task GetConceptBySlug_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var slug = "non-existent-concept";

        _conceptServiceMock.Setup(s => s.GetConceptBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<ConceptDetailsDto>.Failure("Concept not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetConceptBySlug(slug, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetKnowledgeGraph_Success_ReturnsOkResultWithKnowledgeGraphDto()
    {
        // Arrange
        var nodes = new List<ConceptSummaryDto>
        {
            new(Guid.NewGuid(), "Variables & Data Types", "variables-types", "Foundations", "Beginner", "Published", 15)
        };
        var edges = new List<ConceptRelationshipDto>();
        var graphDto = new KnowledgeGraphDto(nodes, edges);

        _conceptServiceMock.Setup(s => s.GetKnowledgeGraphAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<KnowledgeGraphDto>.Success(graphDto));

        // Act
        var actionResult = await _sut.GetKnowledgeGraph(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<KnowledgeGraphDto>(okResult.Value);
        Assert.Single(responseValue.Nodes);
    }
}
