using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Career.DTOs;
using LearnCS.Application.Features.Career.Services;
using LearnCS.Domain.Career;
using LearnCS.Domain.Identity;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Features.Career;

public class CareerServiceTests
{
    private readonly Mock<ICareerRepository> _careerRepoMock = new();
    private readonly Mock<IUserRepository> _userRepoMock = new();
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    private readonly CareerService _sut;

    public CareerServiceTests()
    {
        _sut = new CareerService(_careerRepoMock.Object, _userRepoMock.Object, _unitOfWorkMock.Object);
    }

    [Fact]
    public async Task GetCareerProfiles_ReturnsActiveCareerProfiles()
    {
        // Arrange
        var backend = CareerProfile.Create("Backend Developer", "backend-developer", "Build web APIs.");
        var ai = CareerProfile.Create("AI / ML Engineer", "ai-ml-engineer", "Build intelligent models.");

        _careerRepoMock.Setup(r => r.GetAllActiveProfilesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<CareerProfile> { backend, ai });

        // Act
        var result = await _sut.GetCareerProfilesAsync();

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(2, result.Value.Count);
        Assert.Equal("Backend Developer", result.Value[0].Name);
        Assert.Equal("AI / ML Engineer", result.Value[1].Name);
    }

    [Fact]
    public async Task GetCareerQuestions_ReturnsActiveQuestionsWithOptions()
    {
        // Arrange
        var q1 = CareerQuestion.Create("Which aspect of programming interests you most?", 1);
        var opt1 = CareerQuestionOption.Create(q1.Id, "Building APIs & database logic", 1);
        var opt2 = CareerQuestionOption.Create(q1.Id, "Training neural networks & machine learning", 2);
        q1.Options.Add(opt1);
        q1.Options.Add(opt2);

        _careerRepoMock.Setup(r => r.GetAllActiveQuestionsWithOptionsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<CareerQuestion> { q1 });

        // Act
        var result = await _sut.GetCareerQuestionsAsync();

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Single(result.Value);
        Assert.Equal(2, result.Value[0].Options.Count);
    }

    [Fact]
    public async Task SubmitCareerAssessment_ValidAnswers_ComputesWeightedRecommendations()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("learner1", "learner1@example.com", "hash");

        var backend = CareerProfile.Create("Backend Developer", "backend-developer");
        var ai = CareerProfile.Create("AI / ML Engineer", "ai-ml-engineer");
        var profiles = new List<CareerProfile> { backend, ai };

        var q1 = CareerQuestion.Create("What do you enjoy?", 1);
        var optBackend = CareerQuestionOption.Create(q1.Id, "APIs & Databases", 1);
        var scoreBackend = CareerOptionScore.Create(optBackend.Id, backend.Id, 10.0m);
        optBackend.Scores.Add(scoreBackend);

        q1.Options.Add(optBackend);
        var questions = new List<CareerQuestion> { q1 };

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _careerRepoMock.Setup(r => r.GetAllActiveQuestionsWithOptionsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(questions);
        _careerRepoMock.Setup(r => r.GetAllActiveProfilesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(profiles);

        var submitReq = new SubmitCareerAssessmentRequest(new List<SubmitCareerAnswerItem>
        {
            new(q1.Id, optBackend.Id)
        });

        // Act
        var result = await _sut.SubmitCareerAssessmentAsync(userId, submitReq);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(2, result.Value.Recommendations.Count);
        Assert.Equal("Backend Developer", result.Value.Recommendations[0].ProfileName);
        Assert.Equal(1, result.Value.Recommendations[0].Rank);
        Assert.Equal(100.0m, result.Value.Recommendations[0].ScorePercent);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task SubmitCareerAssessment_EmptyAnswers_ReturnsInvalidInputFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("learner1", "learner1@example.com", "hash");

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);

        var submitReq = new SubmitCareerAssessmentRequest(new List<SubmitCareerAnswerItem>());

        // Act
        var result = await _sut.SubmitCareerAssessmentAsync(userId, submitReq);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("INVALID_INPUT", result.ErrorCode);
    }

    [Fact]
    public async Task GetResultByAttemptId_IDORCheck_DifferentUserAttempt_ReturnsForbiddenFailure()
    {
        // Arrange
        var ownerUserId = Guid.NewGuid();
        var attackerUserId = Guid.NewGuid();
        var attemptId = Guid.NewGuid();

        var attempt = CareerAssessmentAttempt.Create(ownerUserId);

        _careerRepoMock.Setup(r => r.FindAttemptByIdAsync(attemptId, false, It.IsAny<CancellationToken>()))
            .ReturnsAsync(attempt);

        // Act
        var result = await _sut.GetResultByAttemptIdAsync(attackerUserId, attemptId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("FORBIDDEN", result.ErrorCode);
    }

    [Fact]
    public async Task GetMyLatestResult_UserWithNoAttempt_ReturnsNotFoundFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("learner1", "learner1@example.com", "hash");

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _careerRepoMock.Setup(r => r.GetLatestRecommendationsForUserAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<CareerRecommendation>());

        // Act
        var result = await _sut.GetMyLatestResultAsync(userId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("NOT_FOUND", result.ErrorCode);
    }
}
