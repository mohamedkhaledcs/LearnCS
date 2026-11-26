import { LocalizedString } from "./concept";
import { PrerequisiteRule } from "./prerequisites";

export type LearningModuleUnitReference = {
  unitId: string; // The ID of the ReusableLearningUnit
  isOptional?: boolean;
};

export type LearningModule = {
  id: string; // e.g., 'sorting-algorithms'
  title: LocalizedString;
  description: LocalizedString;
  
  /**
   * The reusable learning units (layers) included in this module.
   */
  units: LearningModuleUnitReference[];
};

export type LearningPath = {
  /**
   * Unique identifier for the path.
   * e.g., 'competitive-programming', 'programming-fundamentals'
   */
  id: string;
  
  title: LocalizedString;
  description: LocalizedString;
  
  /**
   * Who is this path for?
   */
  targetAudience?: LocalizedString;

  /**
   * The structural grouping of content within this path.
   */
  modules: LearningModule[];

  /**
   * Path-level prerequisites.
   * For example, the 'Algorithms' path might require completion of the 'Programming Fundamentals' path.
   */
  prerequisites?: PrerequisiteRule[];

  /**
   * Recommended paths to take after finishing this one.
   */
  recommendedNextPaths?: string[];
  
  /**
   * Which module(s) the user should ideally start with if they haven't started.
   */
  entryPoints?: string[]; // IDs of Modules
};
