import { ASSESSMENT_CONFIG } from "../lib/assessment/config";
import { generateAssessment } from "../lib/assessment/engine";

function testEngine() {
  console.log("=== Testing Assessment Engine ===");
  
  // Default config generates min 50 questions, but we only have ~15 in seed.
  // We want to make sure it gracefully degrades.
  console.log("Generating assessment with config:", ASSESSMENT_CONFIG);
  const questions = generateAssessment(ASSESSMENT_CONFIG);
  
  console.log(`\nGenerated ${questions.length} questions (Expected max available in seed).`);
  
  if (questions.length === 0) {
    console.error("FAILED: No questions generated.");
    process.exit(1);
  }

  // Check that secure properties are stripped
  let isSecure = true;
  questions.forEach((q: any) => {
    if (q.correctAnswer !== undefined || q.explanation !== undefined) {
      isSecure = false;
      console.error(`FAILED: Secure property leaked on question ${q.id}`);
    }
  });

  if (isSecure) {
    console.log("SUCCESS: All secure properties stripped from public view.");
  } else {
    process.exit(1);
  }
  
  // Check duplicates
  const ids = new Set(questions.map(q => q.id));
  if (ids.size !== questions.length) {
    console.error(`FAILED: Duplicate questions generated! (${ids.size} unique vs ${questions.length} total)`);
    process.exit(1);
  } else {
    console.log("SUCCESS: All generated questions are unique.");
  }
  
  // Breakdown
  const difficulties = { easy: 0, medium: 0, hard: 0 };
  questions.forEach(q => {
    difficulties[q.difficulty]++;
  });
  
  console.log("\nDifficulty Distribution:");
  console.log(difficulties);
  
  console.log("\n=== Test Complete ===");
}

testEngine();
