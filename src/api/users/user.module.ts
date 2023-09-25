import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '@/package/entities/user/role.entity';
import { UserEntity } from '@/package/entities/user/user.entity';
import { UserRoleEntity } from '@/package/entities/user/user-role.entity';

import { RoleController } from '../role/controller/role.controller';
import { RoleService } from '../role/service/role.service';

import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, UserRoleEntity])],
  exports: [UserService],
  providers: [UserService, RoleService],
  controllers: [UserController, RoleController],
})
export class UserModule {}
