using System.Security.Claims;
using System.Text.Json;
using LearnCS.API.Controllers;
using LearnCS.Domain.Curriculum;
using LearnCS.Infrastructure.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class CurriculumQuizRetryTests : IDisposable
{
    private readonly AppDbContext _db;
    private readonly CurriculumController _controller;

    public CurriculumQuizRetryTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase($"CurriculumRetryTests_{Guid.NewGuid()}")
            .Options;
        _db = new AppDbContext(options);

        SeedUnitWithQuestionPool(_db);
        _controller = new CurriculumController(_db);
    }

    public void Dispose() => _db.Dispose();

    private static void SeedUnitWithQuestionPool(AppDbContext db)
    {
        var path = CurriculumPath.Create(
            "path-algo",
            "Algorithms",
            "الخوارزميات",
            "Algorithms path",
            "مسار الخوارزميات",
            "Algorithms & Complexity",
            1);
        db.CurriculumPaths.Add(path);

        var mod = CurriculumModule.Create(
            "mod-algo-1",
            "path-algo",
            "Module 1",
            "الوحدة الأولى",
            "Desc",
            "وصف",
            1);
        db.CurriculumModules.Add(mod);

        var concept = CanonicalConceptRecord.Create(
            "concept-test",
            "Binary Search",
            "البحث الثنائي",
            "Desc",
            "وصف",
            "Algorithms");
        db.CanonicalConcepts.Add(concept);

        var unit = ReusableUnit.Create(
            "unit-test",
            "concept-test",
            "Binary Search Foundations",
            "أساسيات البحث الثنائي",
            "Desc",
            "وصف",
            "beginner",
            30,
            "[]",
            quizPassPercentage: 60,
            quizQuestionCount: 4);
        db.ReusableUnits.Add(unit);

        db.ModuleUnitPlacements.Add(ModuleUnitPlacement.Create("mod-algo-1", "unit-test", 1));

        db.UnitSections.AddRange(
            UnitSection.Create("sec-1", "unit-test", "theory", "Sec 1", "القسم 1", "Body 1", "محتوى 1", 1, isRequired: true),
            UnitSection.Create("sec-2", "unit-test", "example", "Sec 2", "القسم 2", "Body 2", "محتوى 2", 2, isRequired: true),
            UnitSection.Create("sec-3", "unit-test", "summary", "Sec 3", "القسم 3", "Body 3", "محتوى 3", 3, isRequired: false)
        );

        var diffs = new[] { "easy", "medium", "hard" };
        for (int i = 1; i <= 12; i++)
        {
            var qId = $"Q-TEST-{i:000}";
            var q = QuestionBankItem.Create(
                qId,
                "Algorithms",
                "Searching",
                "Binary Search",
                diffs[(i - 1) % 3],
                "concept",
                $"Question prompt {i}?",
                $"سؤال تجريبي {i}؟",
                $"Secret explanation {i}",
                $"شرح سري {i}");
            db.QuestionBankItems.Add(q);

            db.QuestionBankOptions.AddRange(
                QuestionBankOption.Create(qId, "a", "Option A", "خيار أ", isCorrect: true, 0),
                QuestionBankOption.Create(qId, "b", "Option B", "خيار ب", isCorrect: false, 1),
                QuestionBankOption.Create(qId, "c", "Option C", "خيار ج", isCorrect: false, 2),
                QuestionBankOption.Create(qId, "d", "Option D", "خيار د", isCorrect: false, 3)
            );

            db.UnitQuestionMappings.Add(UnitQuestionMapping.Create("unit-test", qId, null, i));
        }

        db.SaveChanges();
    }

    private void SetUser(Guid userId, string role = "User")
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId.ToString()),
            new(ClaimTypes.Role, role)
        };
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(new ClaimsIdentity(claims, "Test"))
            }
        };
    }

    private static JsonElement ToJsonElement(IActionResult result)
    {
        var ok = Assert.IsType<OkObjectResult>(result);
        var json = JsonSerializer.Serialize(ok.Value);
        return JsonDocument.Parse(json).RootElement;
    }

    [Fact]
    public async Task StartUnitQuiz_AcrossMultipleAttempts_ExcludesLastThreeAttemptsAndHidesAnswers()
    {
        var userId = Guid.NewGuid();
        SetUser(userId);

        await _controller.CompleteSection("sec-1", new CompleteSectionRequest(null, 5), CancellationToken.None);
        await _controller.CompleteSection("sec-2", new CompleteSectionRequest(null, 5), CancellationToken.None);

        // Attempt 1 draws 4 fresh questions from 12
        var r1 = ToJsonElement(await _controller.StartUnitQuiz("unit-test", new StartUnitQuizRequest(), CancellationToken.None));
        // Space out timestamps slightly so OrderByDescending(StartedAt) captures strict recency even fast in-memory
        await Task.Delay(5);
        var r2 = ToJsonElement(await _controller.StartUnitQuiz("unit-test", new StartUnitQuizRequest(), CancellationToken.None));
        await Task.Delay(5);
        var r3 = ToJsonElement(await _controller.StartUnitQuiz("unit-test", new StartUnitQuizRequest(), CancellationToken.None));
        await Task.Delay(5);
        var r4 = ToJsonElement(await _controller.StartUnitQuiz("unit-test", new StartUnitQuizRequest(), CancellationToken.None));

        List<string> ExtractIds(JsonElement payload) =>
            payload.GetProperty("Questions").EnumerateArray().Select(q => q.GetProperty("Id").GetString()!).ToList();

        var ids1 = ExtractIds(r1);
        var ids2 = ExtractIds(r2);
        var ids3 = ExtractIds(r3);
        var ids4 = ExtractIds(r4);

        Assert.Equal(4, ids1.Count);
        Assert.Equal(4, ids2.Count);
        Assert.Equal(4, ids3.Count);
        Assert.Equal(4, ids4.Count);

        // Attempts 1, 2, 3 must be completely pairwise disjoint (all 12 distinct questions used!)
        Assert.Empty(ids1.Intersect(ids2));
        Assert.Empty(ids1.Intersect(ids3));
        Assert.Empty(ids2.Intersect(ids3));
        Assert.Equal(12, ids1.Concat(ids2).Concat(ids3).Distinct().Count());
        Assert.False(r1.GetProperty("PoolExhausted").GetBoolean());
        Assert.False(r3.GetProperty("PoolExhausted").GetBoolean());

        // Attempt 4 exhausts the 12-question pool but still avoids most recent attempt 3
        Assert.True(r4.GetProperty("PoolExhausted").GetBoolean());
        Assert.Empty(ids4.Intersect(ids3));

        // Verify sensitive fields (IsCorrect / CorrectAnswer / Explanation) are never leaked before submission
        var rawSerialized = r1.GetRawText();
        Assert.DoesNotContain("IsCorrect", rawSerialized, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("Secret explanation", rawSerialized, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("CorrectAnswer", rawSerialized, StringComparison.OrdinalIgnoreCase);

        // Verify option display keys get shuffled rather than locking 'a' first on all attempts
        var firstOptionOrders = r1.GetProperty("Questions").EnumerateArray()
            .Concat(r2.GetProperty("Questions").EnumerateArray())
            .Concat(r3.GetProperty("Questions").EnumerateArray())
            .Select(q => q.GetProperty("Options").EnumerateArray().Select(o => o.GetProperty("Key").GetString()!).First())
            .Distinct()
            .ToList();
        Assert.True(firstOptionOrders.Count >= 2, "Expected randomized option ordering across questions rather than fixed 'a' first.");
    }

    [Fact]
    public async Task VisitUnitSection_PersistsLastSectionId_WithoutMarkingSectionCompleted()
    {
        var userId = Guid.NewGuid();
        SetUser(userId);

        var visitRes = ToJsonElement(
            await _controller.VisitUnitSection("unit-test", new VisitUnitSectionRequest("sec-2"), CancellationToken.None));
        Assert.Equal("sec-2", visitRes.GetProperty("LastSectionId").GetString());

        var unitPayload = ToJsonElement(await _controller.GetUnit("unit-test", CancellationToken.None));
        Assert.Equal("sec-2", unitPayload.GetProperty("LastSectionId").GetString());

        // Ensure sec-2 was NOT falsely marked completed just by visiting
        var sec2 = unitPayload.GetProperty("Sections").EnumerateArray()
            .First(s => s.GetProperty("Id").GetString() == "sec-2");
        Assert.False(sec2.GetProperty("IsCompleted").GetBoolean());
    }
}
