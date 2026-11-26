"use server";

import { ASSESSMENT_CONFIG } from "@/lib/assessment/config";
import { generateAssessment, scoreAssessment } from "@/lib/assessment/engine";
import { PublicQuestion, SubmittedAnswer, AssessmentResult } from "@/lib/assessment/schema";

// Ensures that the returned object is purely serializable data
// and absolutely does NOT contain any correctAnswers or explanations.
export async function getDiagnosticAssessment(questionCount: number = ASSESSMENT_CONFIG.defaultQuestions): Promise<{
  sessionId: string;
  questions: PublicQuestion[];
}> {
  // In a real app, you would create a DB session here and return the ID.
  // For now, we simulate a unique session ID.
  const sessionId = "session_" + Math.random().toString(36).substring(2, 15);
  
  // Create a config clone if we wanted to dynamically override the target count
  const config = { ...ASSESSMENT_CONFIG };
  if (questionCount > 0 && questionCount <= config.maxQuestions) {
    config.defaultQuestions = questionCount;
  }
  
  // Engine strips answers automatically
  const questions = generateAssessment(config);
  
  return {
    sessionId,
    questions,
  };
}

export async function submitAssessmentResult(sessionId: string, answers: SubmittedAnswer[]): Promise<AssessmentResult> {
  // In a real app, we would load the session from the DB to verify it's valid
  // and load the EXACT questions assigned to that session if we dynamically generate.
  // For this architecture phase, we score against the global QUESTION_BANK.
  
  const result = scoreAssessment(sessionId, answers);
  
  // Here you would save `result` to the database.
  
  return result;
}
