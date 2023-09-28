import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientEntity } from '@/package/entities/client/client.entity';
import { ExceptionService } from '@/package/services/exception.service';
import { PermissionService } from '@/package/services/permission.service';
import { RequestService } from '@/package/services/request.service';
import { ResponseService } from '@/package/services/response.service';

import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  exports: [ClientService],
  providers: [
    ClientService,
    ResponseService,
    ExceptionService,
    RequestService,
    PermissionService,
  ],
})
export class ClientModule {}
