import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '../entities/user/role.entity';
import { UserEntity } from '../entities/user/user.entity';
import { UserRoleEntity } from '../entities/user/user-role.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        synchronize: configService.get<boolean>('DATABASE_SYNCRONIZE'),
        logging: ['error', 'warn', 'info', 'schema', 'log'],
        entities: [UserEntity, UserRoleEntity, RoleEntity],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeormConfigModule {}
