import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AuthModule } from '@/api/auth/auth.module';
import { ClientModule } from '@/api/client/client.module';
import { ProductModule } from '@/api/product/product.module';
import { RoleModule } from '@/api/role/role.module';
import { UserModule } from '@/api/users/user.module';
import { AuthGuard } from '@/package/guard/auth.guard';
import { CommonServiceModule } from '@/package/modules/common-service.module';
import { EnvConfigModule } from '@/package/modules/env-config.module';
import { TypeormConfigModule } from '@/package/modules/typeorm-config.module';

@Module({
  imports: [
    EnvConfigModule,
    TypeormConfigModule,
    CommonServiceModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    RoleModule,
    UserModule,
    ClientModule,
    ProductModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
