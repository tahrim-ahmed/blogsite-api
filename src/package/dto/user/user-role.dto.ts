import { Type } from 'class-transformer';

import { BaseDto } from '../core/base.dto';

import { RoleDto } from './role.dto';
import { UserDto } from './user.dto';

export class UserRoleDto extends BaseDto {
  @Type(() => UserDto)
  user: UserDto;

  @Type(() => RoleDto)
  role: RoleDto;
}
