import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleController } from '@/api/role/controller/role.controller';
import { RoleService } from '@/api/role/service/role.service';
import { RoleEntity } from '@/package/entities/user/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  exports: [RoleService],
  providers: [RoleService],
})
export class RoleModule {}
