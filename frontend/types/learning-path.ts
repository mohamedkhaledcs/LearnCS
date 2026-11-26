export interface LessonSummaryDto {
  id: string;
  title: string;
  slug: string;
  type: string;
  displayOrder: number;
  estimatedMinutes: number;
  isFree: boolean;
  conceptId?: string;
}

export interface ModuleDetailsDto {
  id: string;
  title: string;
  description?: string;
  displayOrder: number;
  estimatedMinutes: number;
  lessons: LessonSummaryDto[];
}

export interface TrackDetailsDto {
  id: string;
  title: string;
  description?: string;
  displayOrder: number;
  modules: ModuleDetailsDto[];
}

export interface LearningPathDetailsDto {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  difficulty: string;
  estimatedHours: number;
  status: string;
  isFeatured: boolean;
  tracks: TrackDetailsDto[];
}

export interface EnrollmentDto {
  id: string;
  userId: string;
  learningPathId: string;
  learningPathTitle: string;
  learningPathSlug: string;
  enrolledAt: string;
  status: string;
  progressPercent: number;
  completedAt?: string;
}
