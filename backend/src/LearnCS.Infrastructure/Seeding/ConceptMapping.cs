using LearnCS.Domain.Knowledge;

namespace LearnCS.Infrastructure.Seeding;

/// <summary>
/// Shared mapping between canonical curriculum concept IDs (e.g. "concept-variables")
/// and knowledge-graph Concept slugs/difficulty levels so `/api/concepts` and
/// `/api/curriculum/concepts` stay aligned cleanly across all 40 concepts.
/// </summary>
public static class ConceptMapping
{
    public static readonly IReadOnlyDictionary<string, string> CanonicalToSlug =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            ["concept-computer-basics"] = "computer-basics",
            ["concept-data-representation"] = "data-representation",
            ["concept-internet-foundations"] = "internet-foundations",
            ["concept-programming-concepts"] = "programming-basics",
            ["concept-variables"] = "variables-data-types",
            ["concept-control-flow"] = "control-flow",
            ["concept-loops"] = "loops-iteration",
            ["concept-functions"] = "functions-methods",
            ["concept-memory"] = "memory-model",
            ["concept-arrays"] = "arrays-lists",
            ["concept-recursion"] = "recursion",
            ["concept-oop-classes"] = "oop",
            ["concept-dm-logic"] = "propositional-logic",
            ["concept-dm-sets-proofs"] = "sets-relations-proofs",
            ["concept-dm-counting"] = "counting-combinatorics",
            ["concept-linked-lists"] = "linked-lists",
            ["concept-stacks-queues"] = "stacks-queues",
            ["concept-hash-tables"] = "hash-tables",
            ["concept-trees"] = "trees-heaps",
            ["concept-graphs"] = "graphs",
            ["concept-complexity"] = "big-o-notation",
            ["concept-searching"] = "searching-algorithms",
            ["concept-binary-search"] = "binary-search",
            ["concept-sorting"] = "sorting-algorithms",
            ["concept-greedy"] = "greedy-algorithms",
            ["concept-dynamic-programming"] = "dynamic-programming",
            ["concept-graph-algorithms"] = "graph-algorithms",
            ["concept-cp-foundations"] = "cp-foundations",
            ["concept-two-pointers"] = "two-pointers",
            ["concept-cp-math"] = "cp-number-theory",
            ["concept-cp-range-queries"] = "cp-range-queries",
            ["concept-db-fundamentals"] = "databases-intro",
            ["concept-sql"] = "sql-fundamentals",
            ["concept-db-design"] = "database-design",
            ["concept-transactions"] = "acid-transactions",
            ["concept-os-processes"] = "os-processes-threads",
            ["concept-os-scheduling"] = "os-cpu-scheduling",
            ["concept-os-memory"] = "os-virtual-memory",
            ["concept-networking"] = "computer-networking",
            ["concept-software-engineering"] = "software-engineering"
        };

    public static readonly IReadOnlyDictionary<string, ConceptDifficulty> CanonicalDifficulty =
        new Dictionary<string, ConceptDifficulty>(StringComparer.OrdinalIgnoreCase)
        {
            ["concept-computer-basics"] = ConceptDifficulty.Beginner,
            ["concept-data-representation"] = ConceptDifficulty.Beginner,
            ["concept-internet-foundations"] = ConceptDifficulty.Beginner,
            ["concept-programming-concepts"] = ConceptDifficulty.Beginner,
            ["concept-variables"] = ConceptDifficulty.Beginner,
            ["concept-control-flow"] = ConceptDifficulty.Beginner,
            ["concept-loops"] = ConceptDifficulty.Beginner,
            ["concept-functions"] = ConceptDifficulty.Beginner,
            ["concept-memory"] = ConceptDifficulty.Intermediate,
            ["concept-arrays"] = ConceptDifficulty.Elementary,
            ["concept-recursion"] = ConceptDifficulty.Intermediate,
            ["concept-oop-classes"] = ConceptDifficulty.Intermediate,
            ["concept-dm-logic"] = ConceptDifficulty.Elementary,
            ["concept-dm-sets-proofs"] = ConceptDifficulty.Intermediate,
            ["concept-dm-counting"] = ConceptDifficulty.Intermediate,
            ["concept-linked-lists"] = ConceptDifficulty.Intermediate,
            ["concept-stacks-queues"] = ConceptDifficulty.Elementary,
            ["concept-hash-tables"] = ConceptDifficulty.Intermediate,
            ["concept-trees"] = ConceptDifficulty.Intermediate,
            ["concept-graphs"] = ConceptDifficulty.Intermediate,
            ["concept-complexity"] = ConceptDifficulty.Intermediate,
            ["concept-searching"] = ConceptDifficulty.Intermediate,
            ["concept-binary-search"] = ConceptDifficulty.Intermediate,
            ["concept-sorting"] = ConceptDifficulty.Intermediate,
            ["concept-greedy"] = ConceptDifficulty.Intermediate,
            ["concept-dynamic-programming"] = ConceptDifficulty.Advanced,
            ["concept-graph-algorithms"] = ConceptDifficulty.Advanced,
            ["concept-cp-foundations"] = ConceptDifficulty.Intermediate,
            ["concept-two-pointers"] = ConceptDifficulty.Intermediate,
            ["concept-cp-math"] = ConceptDifficulty.Advanced,
            ["concept-cp-range-queries"] = ConceptDifficulty.Advanced,
            ["concept-db-fundamentals"] = ConceptDifficulty.Elementary,
            ["concept-sql"] = ConceptDifficulty.Intermediate,
            ["concept-db-design"] = ConceptDifficulty.Intermediate,
            ["concept-transactions"] = ConceptDifficulty.Advanced,
            ["concept-os-processes"] = ConceptDifficulty.Intermediate,
            ["concept-os-scheduling"] = ConceptDifficulty.Intermediate,
            ["concept-os-memory"] = ConceptDifficulty.Advanced,
            ["concept-networking"] = ConceptDifficulty.Intermediate,
            ["concept-software-engineering"] = ConceptDifficulty.Intermediate
        };

    public static string ResolveSlug(string canonicalConceptId)
    {
        var normalized = canonicalConceptId.Trim().ToLowerInvariant();
        if (CanonicalToSlug.TryGetValue(normalized, out var slug)) return slug;
        return normalized.StartsWith("concept-", StringComparison.Ordinal)
            ? normalized["concept-".Length..]
            : normalized;
    }

    public static ConceptDifficulty ResolveDifficulty(string canonicalConceptId)
    {
        var normalized = canonicalConceptId.Trim().ToLowerInvariant();
        return CanonicalDifficulty.TryGetValue(normalized, out var diff)
            ? diff
            : ConceptDifficulty.Intermediate;
    }
}
