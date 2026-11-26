using LearnCS.Infrastructure.Persistence;
using LearnCS.Infrastructure.Seeding;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/achievements")]
public class AchievementsController(AppDbContext db) : ApiControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCatalog(CancellationToken cancellationToken)
    {
        var items = await db.Achievements
            .Where(a => a.IsActive)
            .OrderBy(a => a.Threshold)
            .ThenBy(a => a.Name)
            .AsNoTracking()
            .Select(a => new
            {
                a.Id,
                Code = a.Code ?? a.Name.ToLower().Replace(" ", "_"),
                a.Name,
                a.TitleAr,
                a.Description,
                a.DescriptionAr,
                Category = a.Category ?? "General",
                Threshold = a.Threshold > 0 ? a.Threshold : 1,
                a.XpReward
            })
            .ToListAsync(cancellationToken);

        return Ok(items);
    }

    [HttpGet("my")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMyAchievements(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var evaluated = await GamificationEvaluator.EvaluateAndSyncAsync(db, userId, cancellationToken);
        var totalXp = await db.UserXpEvents.Where(x => x.UserId == userId).SumAsync(x => (long)x.XpAmount, cancellationToken);
        var streak = await db.StudyStreaks.AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);

        return Ok(new
        {
            TotalXp = totalXp,
            CurrentStreak = streak?.CurrentStreak ?? 0,
            LongestStreak = streak?.LongestStreak ?? 0,
            UnlockedCount = evaluated.Count(a => a.Unlocked),
            TotalCount = evaluated.Count,
            Achievements = evaluated
        });
    }
}
