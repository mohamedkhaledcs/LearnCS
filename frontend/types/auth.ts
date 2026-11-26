export interface UserDto {
  id: string;
  username: string;
  email: string;
  accountStatus: string;
  emailVerified: boolean;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  user: UserDto;
}
