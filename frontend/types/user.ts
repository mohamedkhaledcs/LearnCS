export interface UserProfileDto {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  country?: string;
  city?: string;
  timezone?: string;
  website?: string;
  dateOfBirth?: string;
}
