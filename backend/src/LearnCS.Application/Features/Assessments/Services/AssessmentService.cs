using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Assessments.DTOs;
using LearnCS.Domain.Assessment;

namespace LearnCS.Application.Features.Assessments.Services;

public class AssessmentService(
    IAssessmentRepository assessmentRepository,
    IUserRepository userRepository,
    IUnitOfWork unitOfWork) : IAssessmentService
{
    public async Task<Result<IReadOnlyList<AssessmentSummaryDto>>> GetAvailableAssessmentsAsync(AssessmentType? type = null, CancellationToken cancellationToken = default)
    {
        IReadOnlyList<Assessment> assessments;

        if (type.HasValue)
        {
            assessments = await assessmentRepository.GetPublishedByTypeAsync(type.Value, cancellationToken);
        }
        else
        {
            assessments = await assessmentRepository.GetAllPublishedAsync(cancellationToken);
        }

        var dtos = assessments.Select(MapToSummaryDto).ToList();
        return Result<IReadOnlyList<AssessmentSummaryDto>>.Success(dtos);
    }

    public async Task<Result<AssessmentSummaryDto>> GetAssessmentByIdAsync(Guid assessmentId, CancellationToken cancellationToken = default)
    {
        var assessment = await assessmentRepository.FindByIdAsync(assessmentId, cancellationToken);

        if (assessment == null || assessment.Status != AssessmentStatus.Published)
        {
            return Result<AssessmentSummaryDto>.Failure($"Assessment not found.", "NOT_FOUND");
        }

        return Result<AssessmentSummaryDto>.Success(MapToSummaryDto(assessment));
    }

    public async Task<Result<AssessmentAttemptDto>> StartAttemptAsync(Guid userId, Guid assessmentId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<AssessmentAttemptDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<AssessmentAttemptDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var assessment = await assessmentRepository.FindByIdWithQuestionsAsync(assessmentId, cancellationToken);
        if (assessment == null || assessment.Status != AssessmentStatus.Published)
        {
            return Result<AssessmentAttemptDto>.Failure("Assessment not found or not available.", "NOT_FOUND");
        }

        // Return existing active in-progress attempt if learner has one
        var latestAttempt = await assessmentRepository.GetLatestAttemptAsync(userId, assessmentId, cancellationToken);
        if (latestAttempt != null && latestAttempt.Status == AttemptStatus.InProgress)
        {
            return Result<AssessmentAttemptDto>.Success(MapToAttemptDto(latestAttempt, assessment));
        }

        var attempt = AssessmentAttempt.Create(userId, assessmentId);
        assessmentRepository.AddAttempt(attempt);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<AssessmentAttemptDto>.Success(MapToAttemptDto(attempt, assessment));
    }

    public async Task<Result<AssessmentAttemptDto>> GetActiveAttemptAsync(Guid userId, Guid attemptId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<AssessmentAttemptDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var attempt = await assessmentRepository.FindAttemptByIdAsync(attemptId, trackForUpdate: false, cancellationToken);
        if (attempt == null)
        {
            return Result<AssessmentAttemptDto>.Failure("Assessment attempt not found.", "NOT_FOUND");
        }

        // IDOR Protection: Caller must own this attempt
        if (attempt.UserId != userId)
        {
            return Result<AssessmentAttemptDto>.Failure("Access denied to this assessment attempt.", "FORBIDDEN");
        }

        var assessment = await assessmentRepository.FindByIdWithQuestionsAsync(attempt.AssessmentId, cancellationToken);
        if (assessment == null)
        {
            return Result<AssessmentAttemptDto>.Failure("Associated assessment not found.", "NOT_FOUND");
        }

        return Result<AssessmentAttemptDto>.Success(MapToAttemptDto(attempt, assessment));
    }

    public async Task<Result<AssessmentResultDto>> SubmitAttemptAsync(Guid userId, Guid attemptId, SubmitAssessmentRequest request, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<AssessmentResultDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var attempt = await assessmentRepository.FindAttemptByIdWithDetailsAsync(attemptId, cancellationToken);
        if (attempt == null)
        {
            return Result<AssessmentResultDto>.Failure("Assessment attempt not found.", "NOT_FOUND");
        }

        // IDOR Protection: Caller must own this attempt
        if (attempt.UserId != userId)
        {
            return Result<AssessmentResultDto>.Failure("Access denied to this assessment attempt.", "FORBIDDEN");
        }

        // Replay/Duplicate Protection: If already completed, return current result safely
        if (attempt.Status == AttemptStatus.Completed)
        {
            return await GetAttemptResultAsync(userId, attemptId, cancellationToken);
        }

        var assessment = await assessmentRepository.FindByIdWithQuestionsAsync(attempt.AssessmentId, cancellationToken);
        if (assessment == null)
        {
            return Result<AssessmentResultDto>.Failure("Associated assessment not found.", "NOT_FOUND");
        }

        var answerMap = (request?.Answers ?? [])
            .Where(a => a != null)
            .ToDictionary(a => a.QuestionId, a => a);

        decimal totalScore = 0;
        decimal maxScore = 0;

        foreach (var aq in assessment.AssessmentQuestions.OrderBy(q => q.DisplayOrder))
        {
            if (aq.Question == null) continue;

            maxScore += aq.Points;
            answerMap.TryGetValue(aq.QuestionId, out var submittedAnswer);

            bool isCorrect = false;
            int pointsEarned = 0;

            if (submittedAnswer != null && submittedAnswer.SelectedOptionId.HasValue)
            {
                var selectedOption = aq.Question.Options.FirstOrDefault(o => o.Id == submittedAnswer.SelectedOptionId.Value);
                if (selectedOption != null && selectedOption.IsCorrect)
                {
                    isCorrect = true;
                    pointsEarned = aq.Points;
                }
            }

            totalScore += pointsEarned;

            var answerEntity = AttemptAnswer.Create(
                attempt.Id,
                aq.QuestionId,
                submittedAnswer?.SelectedOptionId,
                submittedAnswer?.TextAnswer,
                isCorrect,
                pointsEarned,
                submittedAnswer?.TimeTakenSeconds
            );

            assessmentRepository.AddAnswer(answerEntity);
        }

        attempt.Complete(totalScore, maxScore, assessment.PassScore);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return await GetAttemptResultAsync(userId, attemptId, cancellationToken);
    }

    public async Task<Result<AssessmentResultDto>> GetAttemptResultAsync(Guid userId, Guid attemptId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<AssessmentResultDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var attempt = await assessmentRepository.FindAttemptByIdWithDetailsAsync(attemptId, cancellationToken);
        if (attempt == null)
        {
            return Result<AssessmentResultDto>.Failure("Assessment attempt not found.", "NOT_FOUND");
        }

        if (attempt.UserId != userId)
        {
            return Result<AssessmentResultDto>.Failure("Access denied to this assessment attempt.", "FORBIDDEN");
        }

        var assessment = attempt.Assessment ?? await assessmentRepository.FindByIdWithQuestionsAsync(attempt.AssessmentId, cancellationToken);

        var answerMap = attempt.Answers.ToDictionary(a => a.QuestionId);

        var questionResults = new List<QuestionResultDto>();

        if (assessment != null)
        {
            foreach (var aq in assessment.AssessmentQuestions.OrderBy(q => q.DisplayOrder))
            {
                if (aq.Question == null) continue;

                answerMap.TryGetValue(aq.QuestionId, out var answer);

                var optionsResult = aq.Question.Options
                    .OrderBy(o => o.DisplayOrder)
                    .Select(o => new QuestionOptionResultDto(
                        o.Id,
                        o.Text,
                        o.IsCorrect,
                        answer != null && answer.SelectedOptionId == o.Id,
                        o.DisplayOrder
                    ))
                    .ToList();

                questionResults.Add(new QuestionResultDto(
                    aq.QuestionId,
                    aq.Question.Text,
                    aq.Question.Type.ToString(),
                    answer?.PointsEarned ?? 0,
                    aq.Points,
                    answer?.IsCorrect ?? false,
                    aq.Question.Explanation,
                    optionsResult
                ));
            }
        }

        var dto = new AssessmentResultDto(
            attempt.Id,
            attempt.AssessmentId,
            assessment?.Title ?? "Assessment",
            attempt.Status.ToString(),
            attempt.Score,
            attempt.MaxScore,
            attempt.ScorePercent,
            assessment?.PassScore ?? 70,
            attempt.Passed,
            attempt.StartedAt,
            attempt.CompletedAt,
            questionResults
        );

        return Result<AssessmentResultDto>.Success(dto);
    }

    public async Task<Result<IReadOnlyList<AssessmentResultDto>>> GetMyAttemptHistoryAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<IReadOnlyList<AssessmentResultDto>>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var attempts = await assessmentRepository.GetAttemptsForUserAsync(userId, cancellationToken);
        var dtos = new List<AssessmentResultDto>();

        foreach (var attempt in attempts)
        {
            var res = await GetAttemptResultAsync(userId, attempt.Id, cancellationToken);
            if (res.IsSuccess && res.Value != null)
            {
                dtos.Add(res.Value);
            }
        }

        return Result<IReadOnlyList<AssessmentResultDto>>.Success(dtos);
    }

    private static AssessmentSummaryDto MapToSummaryDto(Assessment assessment)
    {
        return new AssessmentSummaryDto(
            assessment.Id,
            assessment.Title,
            assessment.Description,
            assessment.Type.ToString(),
            assessment.TimeLimitMinutes,
            assessment.PassScore,
            assessment.AssessmentQuestions?.Count ?? 0
        );
    }

    private static AssessmentAttemptDto MapToAttemptDto(AssessmentAttempt attempt, Assessment assessment)
    {
        var questionDtos = assessment.AssessmentQuestions
            .OrderBy(aq => aq.DisplayOrder)
            .Where(aq => aq.Question != null && aq.Question.IsActive)
            .Select(aq => new QuestionForTakingDto(
                aq.QuestionId,
                aq.Question!.Text,
                aq.Question.Type.ToString(),
                aq.Question.Difficulty.ToString(),
                aq.Points,
                aq.Question.CodeSnippet,
                aq.Question.Options
                    .OrderBy(o => o.DisplayOrder)
                    .Select(o => new QuestionOptionForTakingDto(
                        o.Id,
                        o.Text,
                        o.DisplayOrder
                    ))
                    .ToList()
            ))
            .ToList();

        return new AssessmentAttemptDto(
            attempt.Id,
            assessment.Id,
            assessment.Title,
            attempt.StartedAt,
            attempt.Status.ToString(),
            assessment.TimeLimitMinutes,
            questionDtos
        );
    }
}
