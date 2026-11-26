import { LocalizedString } from "./concept";

export type InteractiveModuleType = 
  | "step_by_step_visualization"
  | "algorithm_visualizer"
  | "code_execution_walkthrough"
  | "drag_and_drop"
  | "ordering_exercise"
  | "prediction_checkpoint"
  | "simulation"
  | "state_machine"
  | "io_experiment"
  | "custom";

export type InteractiveState = {
  id: string;
  description: LocalizedString;
  data: any; // The state data for the visualizer at this step
};

export type InteractiveModule = {
  id: string;
  type: InteractiveModuleType;
  
  title: LocalizedString;
  description?: LocalizedString;
  
  /**
   * Defines whether this interactive is a required checkpoint for completion.
   */
  isRequired: boolean;
  
  /**
   * For step-by-step visualizers, the sequence of states.
   */
  states?: InteractiveState[];
  
  /**
   * Configuration data specific to the module type.
   */
  config?: any;
};
