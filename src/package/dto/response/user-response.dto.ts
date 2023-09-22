import { CustomUserRoleDto } from '../user/custom-user-role.dto';

export class UserResponseDto {
  userID: string;
  userName: string;
  email: string;
  phone: string;
  accessToken: string;
  roles: CustomUserRoleDto[];

  isAdmin: boolean;
  isUser: boolean;
}
