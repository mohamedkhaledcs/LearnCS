import { LEARNING_PATHS } from "../registries/path-registry";
import { CONCEPTS } from "../registries/concept-registry";
import { QUESTION_BANK } from "../../assessment/data";

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    pathsCount: number;
    modulesCount: number;
    conceptsCount: number;
    unitsCount: number;
    sharedUnitsCount: number;
    questionBankTotal: number;
    mappedQuestionsCount: number;
  };
}

export function validateCurriculum(): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Index of all Question Bank IDs
  const validQuestionIds = new Set(QUESTION_BANK.map((q) => q.id));

  // 1. Gather all concepts and units
  const conceptIds = new Set<string>();
  const allUnitsMap = new Map<string, { conceptId: string; unit: any }>();

  Object.values(CONCEPTS).forEach((concept) => {
    if (conceptIds.has(concept.id)) {
      errors.push(`Duplicate Concept ID detected: "${concept.id}".`);
    }
    conceptIds.add(concept.id);

    concept.units.forEach((unit) => {
      if (allUnitsMap.has(unit.id)) {
        errors.push(`Duplicate Unit ID detected: "${unit.id}" in concept "${concept.id}".`);
      }
      allUnitsMap.set(unit.id, { conceptId: concept.id, unit });

      // Validate assessment questions attached to this unit
      if (unit.assessmentQuestionIds) {
        unit.assessmentQuestionIds.forEach((qId: string) => {
          if (!validQuestionIds.has(qId)) {
            errors.push(
              `Unit "${unit.id}" references non-existent Assessment Question ID: "${qId}".`
            );
          }
        });
      }
    });
  });

  // 2. Gather paths and modules
  const pathIds = new Set<string>();
  const moduleIds = new Set<string>();
  const referencedUnitIds = new Set<string>();
  const unitPathOccurrences = new Map<string, string[]>();

  let totalModules = 0;

  Object.values(LEARNING_PATHS).forEach((path) => {
    if (pathIds.has(path.id)) {
      errors.push(`Duplicate Path ID detected: "${path.id}".`);
    }
    pathIds.add(path.id);

    // Validate path-level prerequisites
    if (path.prerequisites) {
      path.prerequisites.forEach((rule) => {
        rule.conditions.forEach((cond) => {
          if (cond.type === "path") {
            if (!LEARNING_PATHS[cond.targetId]) {
              errors.push(
                `Path "${path.id}" has prerequisite pointing to non-existent path: "${cond.targetId}".`
              );
            }
          } else if (cond.type === "unit") {
            if (!allUnitsMap.has(cond.targetId)) {
              errors.push(
                `Path "${path.id}" has prerequisite pointing to non-existent unit: "${cond.targetId}".`
              );
            }
          }
        });
      });
    }

    // Validate recommendedNextPaths
    if (path.recommendedNextPaths) {
      path.recommendedNextPaths.forEach((nextId) => {
        if (!LEARNING_PATHS[nextId]) {
          errors.push(
            `Path "${path.id}" has recommendedNextPaths referencing non-existent path: "${nextId}".`
          );
        }
      });
    }

    path.modules.forEach((mod) => {
      totalModules++;
      if (moduleIds.has(mod.id)) {
        errors.push(`Duplicate Module ID detected: "${mod.id}" in path "${path.id}".`);
      }
      moduleIds.add(mod.id);

      mod.units.forEach((uRef) => {
        referencedUnitIds.add(uRef.unitId);
        const existing = unitPathOccurrences.get(uRef.unitId) || [];
        existing.push(path.id);
        unitPathOccurrences.set(uRef.unitId, existing);

        if (!allUnitsMap.has(uRef.unitId)) {
          errors.push(
            `Path "${path.id}" (module "${mod.id}") references missing learning unit: "${uRef.unitId}".`
          );
        }
      });
    });
  });

  // 3. Validate Unit Prerequisites & Check for Cycles
  const dependencyGraph = new Map<string, string[]>();

  allUnitsMap.forEach(({ unit }, unitId) => {
    const deps: string[] = [];

    if (unit.prerequisites) {
      unit.prerequisites.forEach((rule: any) => {
        rule.conditions.forEach((cond: any) => {
          if (cond.type === "unit") {
            if (!allUnitsMap.has(cond.targetId)) {
              errors.push(
                `Unit "${unitId}" has prerequisite pointing to non-existent unit: "${cond.targetId}".`
              );
            } else {
              deps.push(cond.targetId);
            }
          } else if (cond.type === "path") {
            if (!pathIds.has(cond.targetId)) {
              errors.push(
                `Unit "${unitId}" has prerequisite pointing to non-existent path: "${cond.targetId}".`
              );
            }
          }
        });
      });
    }

    dependencyGraph.set(unitId, deps);
  });

  // DFS Cycle Detection
  const visited = new Map<string, "UNVISITED" | "VISITING" | "VISITED">();
  allUnitsMap.forEach((_, unitId) => visited.set(unitId, "UNVISITED"));

  function checkCycle(node: string, stack: string[]): boolean {
    visited.set(node, "VISITING");
    stack.push(node);

    const neighbors = dependencyGraph.get(node) || [];
    for (const neighbor of neighbors) {
      const state = visited.get(neighbor);
      if (state === "VISITING") {
        errors.push(
          `Circular prerequisite dependency detected: ${stack.join(" -> ")} -> ${neighbor}`
        );
        return true;
      }
      if (state === "UNVISITED") {
        if (checkCycle(neighbor, stack)) return true;
      }
    }

    visited.set(node, "VISITED");
    stack.pop();
    return false;
  }

  allUnitsMap.forEach((_, unitId) => {
    if (visited.get(unitId) === "UNVISITED") {
      checkCycle(unitId, []);
    }
  });

  // 4. Check for Orphan Units (defined in concepts but not in any path)
  allUnitsMap.forEach((_, unitId) => {
    if (!referencedUnitIds.has(unitId)) {
      warnings.push(`Unit "${unitId}" is defined in concept registry but not attached to any learning path.`);
    }
  });

  // Count shared units (units used in > 1 path)
  let sharedUnitsCount = 0;
  unitPathOccurrences.forEach((paths) => {
    const uniquePaths = new Set(paths);
    if (uniquePaths.size > 1) sharedUnitsCount++;
  });

  // Count total questions mapped
  let mappedQuestionsCount = 0;
  allUnitsMap.forEach(({ unit }) => {
    if (unit.assessmentQuestionIds) {
      mappedQuestionsCount += unit.assessmentQuestionIds.length;
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      pathsCount: pathIds.size,
      modulesCount: totalModules,
      conceptsCount: conceptIds.size,
      unitsCount: allUnitsMap.size,
      sharedUnitsCount,
      questionBankTotal: validQuestionIds.size,
      mappedQuestionsCount
    }
  };
}
