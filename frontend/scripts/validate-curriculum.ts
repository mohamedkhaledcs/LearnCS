import { validateCurriculum } from "../lib/curriculum/validation/validate-curriculum";

console.log("==================================================");
console.log("   LearnCS Curriculum Architecture Validator      ");
console.log("==================================================\n");

const report = validateCurriculum();

console.log("📊 Curriculum Statistics:");
console.log(`   - Learning Paths:           ${report.stats.pathsCount}`);
console.log(`   - Modules:                  ${report.stats.modulesCount}`);
console.log(`   - Canonical Concepts:       ${report.stats.conceptsCount}`);
console.log(`   - Reusable Learning Units:  ${report.stats.unitsCount}`);
console.log(`   - Shared Cross-Path Units:  ${report.stats.sharedUnitsCount}`);
console.log(`   - Mapped Quiz Questions:    ${report.stats.mappedQuestionsCount}`);
console.log(`   - Question Bank Size:       ${report.stats.questionBankTotal}\n`);

if (report.warnings.length > 0) {
  console.log(`⚠️  Warnings (${report.warnings.length}):`);
  report.warnings.forEach((w) => console.log(`   - ${w}`));
  console.log("");
}

if (!report.isValid) {
  console.error(`❌ Validation FAILED with ${report.errors.length} error(s):`);
  report.errors.forEach((err) => console.error(`   ✖ ${err}`));
  console.log("\n==================================================");
  process.exit(1);
} else {
  console.log("✅ Validation SUCCESSFUL: 0 errors detected!");
  console.log("   - All concepts and units have globally unique IDs.");
  console.log("   - All cross-path units and module references resolve.");
  console.log("   - Dependency graph is strictly acyclic (0 circular prerequisites).");
  console.log("   - All mapped assessment question IDs exist in Question Bank.");
  console.log("   - Path and prerequisite rules are 100% data-driven.");
  console.log("==================================================");
  process.exit(0);
}
