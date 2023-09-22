import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { configEnvironment } from './package/env-config/env-config';
import { AuthMiddleware } from './package/middlewares/auth.middleware';
import { publicUrls } from './public.url';
import { configTypeorm } from './package/typeorm-config/typeorm.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RoleModule } from './api/role/role.module';
import { UserModule } from './api/users/user.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    configEnvironment(),
    configTypeorm(),
    EventEmitterModule.forRoot(),
    AuthModule,
    RoleModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...publicUrls)
      .forRoutes('*');
  }
}
