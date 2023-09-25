import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '@/package/entities/user/role.entity';
import { UserEntity } from '@/package/entities/user/user.entity';
import { UserRoleEntity } from '@/package/entities/user/user-role.entity';
import { BcryptService } from '@/package/services/bcrypt.service';

import { RoleSeeder } from './services/role.seeder';
import { UserSeeder } from './services/user.seeder';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, UserRoleEntity])],
  providers: [BcryptService, UserSeeder, RoleSeeder, UserService],
  exports: [UserService],
})
export class UserSeederModule {}
