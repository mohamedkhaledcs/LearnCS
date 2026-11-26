using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Career.DTOs;
using LearnCS.Domain.Career;

namespace LearnCS.Application.Features.Career.Services;

public class CareerService(
    ICareerRepository careerRepository,
    IUserRepository userRepository,
    IUnitOfWork unitOfWork) : ICareerService
{
    public async Task<Result<IReadOnlyList<CareerProfileDto>>> GetCareerProfilesAsync(CancellationToken cancellationToken = default)
    {
        var profiles = await careerRepository.GetAllActiveProfilesAsync(cancellationToken);
        var dtos = profiles
            .Select(p => new CareerProfileDto(p.Id, p.Name, p.Slug, p.Description, p.IconUrl))
            .ToList();

        return Result<IReadOnlyList<CareerProfileDto>>.Success(dtos);
    }

    public async Task<Result<CareerProfileDto>> GetCareerProfileBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return Result<CareerProfileDto>.Failure("Invalid career profile slug.", "INVALID_INPUT");
        }

        var normalizedSlug = slug.Trim().ToLowerInvariant();
        var profiles = await careerRepository.GetAllActiveProfilesAsync(cancellationToken);
        var profile = profiles.FirstOrDefault(p => p.Slug.Equals(normalizedSlug, StringComparison.OrdinalIgnoreCase));

        if (profile == null)
        {
            return Result<CareerProfileDto>.Failure($"Career profile '{slug}' not found.", "NOT_FOUND");
        }

        return Result<CareerProfileDto>.Success(new CareerProfileDto(profile.Id, profile.Name, profile.Slug, profile.Description, profile.IconUrl));
    }

    public async Task<Result<IReadOnlyList<CareerQuestionDto>>> GetCareerQuestionsAsync(CancellationToken cancellationToken = default)
    {
        var questions = await careerRepository.GetAllActiveQuestionsWithOptionsAsync(cancellationToken);
        var dtos = questions
            .Select(q => new CareerQuestionDto(
                q.Id,
                q.Text,
                q.HelpText,
                q.CategoryTag,
                q.DisplayOrder,
                q.Options
                    .OrderBy(o => o.DisplayOrder)
                    .Select(o => new CareerQuestionOptionDto(o.Id, o.Text, o.DisplayOrder))
                    .ToList()
            ))
            .ToList();

        return Result<IReadOnlyList<CareerQuestionDto>>.Success(dtos);
    }

    public async Task<Result<CareerAssessmentResultDto>> SubmitCareerAssessmentAsync(
        Guid userId,
        SubmitCareerAssessmentRequest request,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<CareerAssessmentResultDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<CareerAssessmentResultDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        if (request == null || request.Answers == null || request.Answers.Count == 0)
        {
            return Result<CareerAssessmentResultDto>.Failure("Assessment answers cannot be empty.", "INVALID_INPUT");
        }

        var activeQuestions = await careerRepository.GetAllActiveQuestionsWithOptionsAsync(cancellationToken);
        var activeProfiles = await careerRepository.GetAllActiveProfilesAsync(cancellationToken);

        if (activeQuestions.Count == 0 || activeProfiles.Count == 0)
        {
            return Result<CareerAssessmentResultDto>.Failure("Career assessment content unavailable.", "NOT_FOUND");
        }

        var optionMap = activeQuestions
            .SelectMany(q => q.Options)
            .ToDictionary(o => o.Id, o => o);

        var questionMap = activeQuestions.ToDictionary(q => q.Id, q => q);

        var attempt = CareerAssessmentAttempt.Create(userId);
        careerRepository.AddAttempt(attempt);

        // 1. Record submitted answers
        var answeredQuestionIds = new HashSet<Guid>();
        foreach (var answer in request.Answers)
        {
            if (answer == null) continue;
            if (!questionMap.ContainsKey(answer.QuestionId)) continue;
            if (!optionMap.TryGetValue(answer.SelectedOptionId, out var selectedOpt)) continue;
            if (selectedOpt.QuestionId != answer.QuestionId) continue; // Mismatched question-option pair

            if (answeredQuestionIds.Add(answer.QuestionId))
            {
                var response = CareerAnswerResponse.Create(attempt.Id, answer.QuestionId, answer.SelectedOptionId);
                careerRepository.AddAnswerResponse(response);
            }
        }

        if (answeredQuestionIds.Count == 0)
        {
            return Result<CareerAssessmentResultDto>.Failure("No valid answer choices submitted.", "INVALID_INPUT");
        }

        // 2. Compute Weighted Career Profile Scores
        var profileRawScores = activeProfiles.ToDictionary(p => p.Id, _ => 0.0m);
        var profileMaxScores = activeProfiles.ToDictionary(p => p.Id, _ => 0.0m);

        foreach (var q in activeQuestions)
        {
            // Track max potential score for each profile across options in this question
            var maxForQ = new Dictionary<Guid, decimal>();
            foreach (var opt in q.Options)
            {
                foreach (var s in opt.Scores)
                {
                    if (!maxForQ.TryGetValue(s.CareerProfileId, out var maxVal) || s.Score > maxVal)
                    {
                        maxForQ[s.CareerProfileId] = Math.Max(0, s.Score);
                    }
                }
            }

            foreach (var kvp in maxForQ)
            {
                profileMaxScores[kvp.Key] += kvp.Value;
            }
        }

        // Accumulate learner's actual selected option scores
        foreach (var qId in answeredQuestionIds)
        {
            var selectedOptionId = request.Answers.First(a => a.QuestionId == qId).SelectedOptionId;
            if (optionMap.TryGetValue(selectedOptionId, out var opt))
            {
                foreach (var s in opt.Scores)
                {
                    if (profileRawScores.ContainsKey(s.CareerProfileId))
                    {
                        profileRawScores[s.CareerProfileId] += s.Score;
                    }
                }
            }
        }

        // Calculate Match Percentage & Rank
        var profileResults = new List<(CareerProfile Profile, decimal RawScore, decimal ScorePercent)>();
        decimal highestRawScore = profileRawScores.Values.DefaultIfEmpty(0).Max();

        foreach (var profile in activeProfiles)
        {
            var raw = profileRawScores[profile.Id];
            var maxPotential = profileMaxScores[profile.Id];
            decimal percent = 0;

            if (maxPotential > 0)
            {
                percent = Math.Clamp(Math.Round((raw / maxPotential) * 100, 2), 0, 100);
            }
            else if (highestRawScore > 0 && raw > 0)
            {
                percent = Math.Clamp(Math.Round((raw / highestRawScore) * 100, 2), 0, 100);
            }

            profileResults.Add((profile, raw, percent));
        }

        var rankedProfiles = profileResults
            .OrderByDescending(r => r.ScorePercent)
            .ThenByDescending(r => r.RawScore)
            .ThenBy(r => r.Profile.Name)
            .ToList();

        var recommendations = new List<CareerRecommendation>();
        int rank = 1;

        foreach (var item in rankedProfiles)
        {
            var rec = CareerRecommendation.Create(
                attempt.Id,
                userId,
                item.Profile.Id,
                item.ScorePercent,
                rank++
            );
            recommendations.Add(rec);
        }

        careerRepository.AddRecommendations(recommendations);
        attempt.Complete();

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<CareerAssessmentResultDto>.Success(MapToResultDto(attempt, recommendations, activeProfiles));
    }

    public async Task<Result<CareerAssessmentResultDto>> GetMyLatestResultAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<CareerAssessmentResultDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<CareerAssessmentResultDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var recommendations = await careerRepository.GetLatestRecommendationsForUserAsync(userId, cancellationToken);
        if (recommendations.Count == 0)
        {
            return Result<CareerAssessmentResultDto>.Failure("No completed career assessment found for this user.", "NOT_FOUND");
        }

        var firstRec = recommendations[0];
        var attempt = await careerRepository.FindAttemptByIdAsync(firstRec.AttemptId, trackForUpdate: false, cancellationToken);

        if (attempt == null)
        {
            return Result<CareerAssessmentResultDto>.Failure("Associated career attempt not found.", "NOT_FOUND");
        }

        return Result<CareerAssessmentResultDto>.Success(MapToResultDto(attempt, recommendations));
    }

    public async Task<Result<CareerAssessmentResultDto>> GetResultByAttemptIdAsync(Guid userId, Guid attemptId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<CareerAssessmentResultDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var attempt = await careerRepository.FindAttemptByIdAsync(attemptId, trackForUpdate: false, cancellationToken);
        if (attempt == null)
        {
            return Result<CareerAssessmentResultDto>.Failure("Career assessment attempt not found.", "NOT_FOUND");
        }

        // IDOR Protection: Caller must own this attempt
        if (attempt.UserId != userId)
        {
            return Result<CareerAssessmentResultDto>.Failure("Access denied to this career assessment result.", "FORBIDDEN");
        }

        var recommendations = await careerRepository.GetRecommendationsForAttemptAsync(attemptId, cancellationToken);
        return Result<CareerAssessmentResultDto>.Success(MapToResultDto(attempt, recommendations));
    }

    private static CareerAssessmentResultDto MapToResultDto(
        CareerAssessmentAttempt attempt,
        IReadOnlyList<CareerRecommendation> recommendations,
        IReadOnlyList<CareerProfile>? profilesLookup = null)
    {
        var profileMap = profilesLookup?.ToDictionary(p => p.Id, p => p);

        var recDtos = recommendations
            .OrderBy(r => r.Rank)
            .Select(r =>
            {
                var profile = r.CareerProfile ?? (profileMap != null && profileMap.TryGetValue(r.CareerProfileId, out var p) ? p : null);
                return new CareerRecommendationDto(
                    r.CareerProfileId,
                    profile?.Name ?? "Career Profile",
                    profile?.Slug ?? string.Empty,
                    profile?.Description,
                    profile?.IconUrl,
                    r.Score,
                    r.Rank
                );
            })
            .ToList();

        return new CareerAssessmentResultDto(
            attempt.Id,
            attempt.UserId,
            attempt.Status.ToString(),
            attempt.StartedAt,
            attempt.CompletedAt,
            recDtos
        );
    }
}
