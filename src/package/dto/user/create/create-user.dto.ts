import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty } from 'class-validator';

import { UserType } from '../../../enum/user-type.enum';
import { UserDto } from '../user.dto';

export class CreateUserDto extends UserDto {
  @ApiProperty({ enum: UserType, enumName: 'user type' })
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsEnum(UserType, { message: 'Must be a valid user type [1-2]' })
  type: UserType;
}
