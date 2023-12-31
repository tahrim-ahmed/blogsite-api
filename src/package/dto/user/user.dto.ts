import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { BaseDto } from '../core/base.dto';

import { UserRoleDto } from './user-role.dto';

export class UserDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(65, { message: 'Maximum 65 characters supported' })
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  @MaxLength(65, { message: 'Maximum 65 characters supported' })
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  @MaxLength(20, { message: 'Maximum 20 character supported' })
  phone: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  password: string;

  @Type(() => UserRoleDto)
  roles: UserRoleDto[];
}
