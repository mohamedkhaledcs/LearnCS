using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Assessments.DTOs;
using LearnCS.Application.Features.Assessments.Services;
using LearnCS.Domain.Assessment;
using LearnCS.Domain.Identity;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Features.Assessments;

public class AssessmentServiceTests
{
    private readonly Mock<IAssessmentRepository> _assessmentRepoMock = new();
    private readonly Mock<IUserRepository> _userRepoMock = new();
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    private readonly AssessmentService _sut;

    public AssessmentServiceTests()
    {
        _sut = new AssessmentService(_assessmentRepoMock.Object, _userRepoMock.Object, _unitOfWorkMock.Object);
    }

    [Fact]
    public async Task GetAvailableAssessments_ReturnsPublishedAssessments()
    {
        // Arrange
        var quiz = Assessment.Create("CS Basics Quiz", AssessmentType.ConceptQuiz);
        quiz.Publish();

        _assessmentRepoMock.Setup(r => r.GetAllPublishedAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Assessment> { quiz });

        // Act
        var result = await _sut.GetAvailableAssessmentsAsync();

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Single(result.Value);
        Assert.Equal("CS Basics Quiz", result.Value[0].Title);
    }

    [Fact]
    public async Task StartAttempt_ValidLearnerAndPublishedAssessment_StartsAttemptWithoutLeakingAnswers()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var assessmentId = Guid.NewGuid();

        var user = User.Create("learner1", "learner1@example.com", "hash");
        var quiz = Assessment.Create("CS Basics Quiz", AssessmentType.ConceptQuiz);
        quiz.Publish();

        var question = Question.Create("What is a variable?", QuestionType.MultipleChoice, QuestionDifficulty.Easy);
        var option1 = QuestionOption.Create(question.Id, "A named memory location", isCorrect: true, displayOrder: 1);
        var option2 = QuestionOption.Create(question.Id, "A fixed constant", isCorrect: false, displayOrder: 2);
        question.Options.Add(option1);
        question.Options.Add(option2);

        var aq = AssessmentQuestion.Create(quiz.Id, question.Id, order: 1, points: 10);
        typeof(AssessmentQuestion).GetProperty("Question")!.SetValue(aq, question);
        quiz.AssessmentQuestions.Add(aq);

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _assessmentRepoMock.Setup(r => r.FindByIdWithQuestionsAsync(assessmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(quiz);
        _assessmentRepoMock.Setup(r => r.GetLatestAttemptAsync(userId, assessmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((AssessmentAttempt?)null);

        // Act
        var result = await _sut.StartAttemptAsync(userId, assessmentId);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("CS Basics Quiz", result.Value.AssessmentTitle);
        Assert.Equal("InProgress", result.Value.Status);
        Assert.Single(result.Value.Questions);
        Assert.Equal(2, result.Value.Questions[0].Options.Count);

        // Security Check: QuestionOptionForTakingDto properties check
        var optionProperties = typeof(QuestionOptionForTakingDto).GetProperties().Select(p => p.Name).ToList();
        Assert.DoesNotContain("IsCorrect", optionProperties);
        Assert.DoesNotContain("Explanation", optionProperties);
    }

    [Fact]
    public async Task StartAttempt_UnpublishedAssessment_ReturnsNotFoundFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var assessmentId = Guid.NewGuid();

        var user = User.Create("learner1", "learner1@example.com", "hash");
        var draftQuiz = Assessment.Create("Draft Quiz", AssessmentType.ConceptQuiz); // Draft status

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _assessmentRepoMock.Setup(r => r.FindByIdWithQuestionsAsync(assessmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((Assessment?)null);

        // Act
        var result = await _sut.StartAttemptAsync(userId, assessmentId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("NOT_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task GetActiveAttempt_IDORCheck_DifferentUserAttempt_ReturnsForbiddenFailure()
    {
        // Arrange
        var ownerUserId = Guid.NewGuid();
        var attackerUserId = Guid.NewGuid();
        var attemptId = Guid.NewGuid();
        var assessmentId = Guid.NewGuid();

        var attempt = AssessmentAttempt.Create(ownerUserId, assessmentId);

        _assessmentRepoMock.Setup(r => r.FindAttemptByIdAsync(attemptId, false, It.IsAny<CancellationToken>()))
            .ReturnsAsync(attempt);

        // Act - Attacker trying to access owner's attempt
        var result = await _sut.GetActiveAttemptAsync(attackerUserId, attemptId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("FORBIDDEN", result.ErrorCode);
    }

    [Fact]
    public async Task SubmitAttempt_CorrectAnswers_CalculatesScoreAndPasses()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var assessmentId = Guid.NewGuid();
        var attemptId = Guid.NewGuid();

        var quiz = Assessment.Create("Variables Quiz", AssessmentType.ConceptQuiz, passScore: 70);
        quiz.Publish();

        var question = Question.Create("What is a variable?", QuestionType.MultipleChoice, QuestionDifficulty.Easy);
        var correctOpt = QuestionOption.Create(question.Id, "Named memory container", isCorrect: true, displayOrder: 1);
        var wrongOpt = QuestionOption.Create(question.Id, "Static keyword", isCorrect: false, displayOrder: 2);
        question.Options.Add(correctOpt);
        question.Options.Add(wrongOpt);

        var aq = AssessmentQuestion.Create(quiz.Id, question.Id, order: 1, points: 10);
        typeof(AssessmentQuestion).GetProperty("Question")!.SetValue(aq, question);
        quiz.AssessmentQuestions.Add(aq);

        var attempt = AssessmentAttempt.Create(userId, assessmentId);
        typeof(AssessmentAttempt).GetProperty("Assessment")!.SetValue(attempt, quiz);

        _assessmentRepoMock.Setup(r => r.FindAttemptByIdWithDetailsAsync(attemptId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(attempt);
        _assessmentRepoMock.Setup(r => r.FindByIdWithQuestionsAsync(assessmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(quiz);

        var submitReq = new SubmitAssessmentRequest(new List<SubmitAnswerItem>
        {
            new(question.Id, SelectedOptionId: correctOpt.Id, TimeTakenSeconds: 15)
        });

        // Act
        var result = await _sut.SubmitAttemptAsync(userId, attemptId, submitReq);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(10, result.Value.Score);
        Assert.Equal(10, result.Value.MaxScore);
        Assert.Equal(100, result.Value.ScorePercent);
        Assert.True(result.Value.Passed);
        Assert.Equal("Completed", result.Value.Status);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task SubmitAttempt_IDORCheck_DifferentUserAttempt_ReturnsForbiddenFailure()
    {
        // Arrange
        var ownerUserId = Guid.NewGuid();
        var attackerUserId = Guid.NewGuid();
        var attemptId = Guid.NewGuid();

        var attempt = AssessmentAttempt.Create(ownerUserId, Guid.NewGuid());

        _assessmentRepoMock.Setup(r => r.FindAttemptByIdWithDetailsAsync(attemptId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(attempt);

        var submitReq = new SubmitAssessmentRequest(new List<SubmitAnswerItem>());

        // Act
        var result = await _sut.SubmitAttemptAsync(attackerUserId, attemptId, submitReq);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("FORBIDDEN", result.ErrorCode);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task GetAttemptResult_DifferentUserAttempt_ReturnsForbiddenFailure()
    {
        // Arrange
        var ownerUserId = Guid.NewGuid();
        var attackerUserId = Guid.NewGuid();
        var attemptId = Guid.NewGuid();

        var attempt = AssessmentAttempt.Create(ownerUserId, Guid.NewGuid());

        _assessmentRepoMock.Setup(r => r.FindAttemptByIdWithDetailsAsync(attemptId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(attempt);

        // Act
        var result = await _sut.GetAttemptResultAsync(attackerUserId, attemptId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("FORBIDDEN", result.ErrorCode);
    }
}
