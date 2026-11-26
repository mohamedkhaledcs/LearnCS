import { CONCEPTS, getConcept, getLearningUnit } from '../lib/curriculum/registries/concept-registry';
import { LEARNING_PATHS, getLearningPath } from '../lib/curriculum/registries/path-registry';

function validateArchitecture() {
  console.log("=== Validating Layered Architecture ===");
  
  // 1. Verify Concept and Units exist
  const binarySearchConcept = getConcept("concept-binary-search");
  if (!binarySearchConcept) throw new Error("Concept 'concept-binary-search' missing");
  
  const foundationsUnit = getLearningUnit("unit-binary-search-foundations");
  const onAnswerUnit = getLearningUnit("unit-binary-search-on-answer");
  
  if (!foundationsUnit || !onAnswerUnit) {
    throw new Error("Failed to resolve reusable units for Binary Search");
  }
  
  console.log("✅ Canonical Concept and its inner Reusable Learning Units exist.");
  
  // 2. Verify shared placement and independent advancement
  const algorithmsPath = getLearningPath("algorithms");
  const cpPath = getLearningPath("competitive-programming");
  
  const algoUnits = algorithmsPath?.modules.flatMap(m => m.units.map(u => u.unitId)) || [];
  const cpUnits = cpPath?.modules.flatMap(m => m.units.map(u => u.unitId)) || [];
  
  if (!algoUnits.includes("unit-binary-search-foundations")) {
    throw new Error("Algorithms path missing foundations.");
  }
  
  if (!cpUnits.includes("unit-binary-search-foundations") || !cpUnits.includes("unit-binary-search-on-answer")) {
    throw new Error("CP path missing foundations or advanced extensions.");
  }
  
  console.log("✅ Foundational units correctly shared. CP properly extends foundations without duplicating them.");
  
  // 3. Verify Unique IDs
  const allUnitIds = new Set<string>();
  for (const concept of Object.values(CONCEPTS)) {
    for (const unit of concept.units) {
      if (allUnitIds.has(unit.id)) throw new Error(`Duplicate Unit ID detected: ${unit.id}`);
      allUnitIds.add(unit.id);
    }
  }
  console.log("✅ All Learning Units have unique stable IDs.");
  
}

validateArchitecture();
