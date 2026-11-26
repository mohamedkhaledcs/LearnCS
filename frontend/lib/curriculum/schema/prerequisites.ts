export type PrerequisiteType = "path" | "concept" | "unit" | "assessment_score";

export type PrerequisiteCondition = {
  type: PrerequisiteType;
  targetId: string; // ID of the path, canonical unit, or assessment domain
  requiredScore?: number; // Only used for assessment_score or specific mastery levels
};

export type PrerequisiteRule = {
  /**
   * Defines whether this is a hard requirement to unlock the content, 
   * or a soft recommendation for a better learning experience.
   */
  enforcement: "hard_lock" | "recommended";
  
  /**
   * Logic combination.
   * 'all' = User must meet all conditions.
   * 'any' = User must meet at least one condition (e.g. either learn 'Python Basics' OR 'C++ Basics').
   */
  logicalOperator: "all" | "any";
  
  conditions: PrerequisiteCondition[];
};
