import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AuthGuard } from '@/package/guard/auth.guard';
import { CommonServiceModule } from '@/package/modules/common-service.module';
import { EnvConfigModule } from '@/package/modules/env-config.module';
import { TypeormConfigModule } from '@/package/modules/typeorm-config.module';

import { AuthModule } from './api/auth/auth.module';
import { RoleModule } from './api/role/role.module';
import { UserModule } from './api/users/user.module';

@Module({
  imports: [
    EnvConfigModule,
    TypeormConfigModule,
    CommonServiceModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    RoleModule,
    UserModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
