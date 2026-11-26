using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Knowledge.DTOs;
using LearnCS.Application.Features.Knowledge.Services;
using LearnCS.Domain.Knowledge;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Features.Knowledge;

public class ConceptServiceTests
{
    private readonly Mock<IConceptRepository> _conceptRepoMock = new();
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    private readonly ConceptService _sut;

    public ConceptServiceTests()
    {
        _sut = new ConceptService(_conceptRepoMock.Object, _unitOfWorkMock.Object);
    }

    [Fact]
    public async Task GetPublishedConceptsAsync_ReturnsPublishedConceptsList()
    {
        // Arrange
        var c1 = Concept.Create("Variables", "variables", "Fundamentals", ConceptDifficulty.Beginner);
        c1.Publish();

        var c2 = Concept.Create("Loops", "loops", "Fundamentals", ConceptDifficulty.Beginner);
        c2.Publish();

        _conceptRepoMock.Setup(r => r.GetAllPublishedAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Concept> { c1, c2 });

        // Act
        var result = await _sut.GetPublishedConceptsAsync();

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(2, result.Value.Count);
        Assert.Equal("Variables", result.Value[0].Title);
        Assert.Equal("Loops", result.Value[1].Title);
    }

    [Fact]
    public async Task GetConceptBySlugAsync_ExistingSlug_ReturnsDetails()
    {
        // Arrange
        var concept = Concept.Create("Variables", "variables", "Fundamentals", ConceptDifficulty.Beginner, "Learn variables.");
        concept.Publish();

        _conceptRepoMock.Setup(r => r.FindBySlugWithDetailsAsync("variables", It.IsAny<CancellationToken>()))
            .ReturnsAsync(concept);
        _conceptRepoMock.Setup(r => r.GetPrerequisitesForAsync(concept.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<ConceptRelationship>());

        // Act
        var result = await _sut.GetConceptBySlugAsync("variables");

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("Variables", result.Value.Title);
        Assert.Equal("variables", result.Value.Slug);
        Assert.Equal("Fundamentals", result.Value.Category);
    }

    [Fact]
    public async Task GetConceptBySlugAsync_NonExistentSlug_ReturnsNotFoundFailure()
    {
        // Arrange
        _conceptRepoMock.Setup(r => r.FindBySlugWithDetailsAsync("unknown", It.IsAny<CancellationToken>()))
            .ReturnsAsync((Concept?)null);

        // Act
        var result = await _sut.GetConceptBySlugAsync("unknown");

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("NOT_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task GetKnowledgeGraphAsync_ReturnsNodesAndEdges()
    {
        // Arrange
        var c1 = Concept.Create("Variables", "variables", "Fundamentals", ConceptDifficulty.Beginner);
        c1.Publish();
        var c2 = Concept.Create("Loops", "loops", "Fundamentals", ConceptDifficulty.Beginner);
        c2.Publish();

        var rel = ConceptRelationship.Create(c1.Id, c2.Id, RelationType.Prerequisite);

        _conceptRepoMock.Setup(r => r.GetAllPublishedAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Concept> { c1, c2 });
        _conceptRepoMock.Setup(r => r.GetAllRelationshipsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<ConceptRelationship> { rel });

        // Act
        var result = await _sut.GetKnowledgeGraphAsync();

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(2, result.Value.Nodes.Count);
        Assert.Single(result.Value.Edges);
        Assert.Equal(c1.Id, result.Value.Edges[0].SourceConceptId);
        Assert.Equal(c2.Id, result.Value.Edges[0].TargetConceptId);
    }

    [Fact]
    public async Task CreateConceptAsync_LearnerUserRole_ReturnsForbiddenFailure()
    {
        // Arrange
        var req = new CreateConceptRequest("Recursion", "recursion", "Algorithms", ConceptDifficulty.Intermediate);
        var learnerRoles = new[] { "User" };

        // Act
        var result = await _sut.CreateConceptAsync(req, learnerRoles);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("FORBIDDEN", result.ErrorCode);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task CreateConceptAsync_MentorRole_CreatesConceptSuccessfully()
    {
        // Arrange
        var req = new CreateConceptRequest("Recursion", "recursion", "Algorithms", ConceptDifficulty.Intermediate, "Learn recursion.");
        var mentorRoles = new[] { "Mentor" };

        _conceptRepoMock.Setup(r => r.ExistsBySlugAsync("recursion", It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        // Act
        var result = await _sut.CreateConceptAsync(req, mentorRoles);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal("Recursion", result.Value!.Title);
        Assert.Equal("recursion", result.Value.Slug);
        _conceptRepoMock.Verify(r => r.Add(It.IsAny<Concept>()), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateConceptAsync_OwnerRole_CreatesConceptSuccessfully()
    {
        // Arrange
        var req = new CreateConceptRequest("Data Structures", "data-structures", "Fundamentals", ConceptDifficulty.Beginner);
        var ownerRoles = new[] { "Owner" };

        _conceptRepoMock.Setup(r => r.ExistsBySlugAsync("data-structures", It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        // Act
        var result = await _sut.CreateConceptAsync(req, ownerRoles);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal("Data Structures", result.Value!.Title);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateConceptAsync_DuplicateSlug_ReturnsSlugExistsFailure()
    {
        // Arrange
        var req = new CreateConceptRequest("Variables", "variables", "Fundamentals", ConceptDifficulty.Beginner);
        var mentorRoles = new[] { "Mentor" };

        _conceptRepoMock.Setup(r => r.ExistsBySlugAsync("variables", It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        // Act
        var result = await _sut.CreateConceptAsync(req, mentorRoles);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("SLUG_EXISTS", result.ErrorCode);
    }

    [Fact]
    public async Task UpdateConceptAsync_LearnerRole_ReturnsForbiddenFailure()
    {
        // Arrange
        var conceptId = Guid.NewGuid();
        var req = new UpdateConceptRequest("Updated Title", "Fundamentals", ConceptDifficulty.Beginner);
        var learnerRoles = new[] { "User" };

        // Act
        var result = await _sut.UpdateConceptAsync(conceptId, req, learnerRoles);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("FORBIDDEN", result.ErrorCode);
    }

    [Fact]
    public async Task UpdateConceptAsync_MentorRole_UpdatesConceptSuccessfully()
    {
        // Arrange
        var conceptId = Guid.NewGuid();
        var concept = Concept.Create("Old Title", "old-title", "Fundamentals", ConceptDifficulty.Beginner);
        var req = new UpdateConceptRequest("Updated Title", "Advanced Algorithms", ConceptDifficulty.Intermediate, "New description", 45);
        var mentorRoles = new[] { "Mentor" };

        _conceptRepoMock.Setup(r => r.FindByIdAsync(conceptId, true, It.IsAny<CancellationToken>()))
            .ReturnsAsync(concept);

        // Act
        var result = await _sut.UpdateConceptAsync(conceptId, req, mentorRoles);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal("Updated Title", result.Value!.Title);
        Assert.Equal("Advanced Algorithms", result.Value.Category);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
