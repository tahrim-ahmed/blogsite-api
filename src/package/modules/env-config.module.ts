import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

export const EnvironmentVariablesValidation = {
  PORT: Joi.number().required(),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_DB: Joi.string().required(),
  DATABASE_SYNCRONIZE: Joi.boolean().required(),

  JWT_SECRET: Joi.string().required(),
};

export type TEnvironmentVariables = typeof EnvironmentVariablesValidation;
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [`.env`],
      validationSchema: Joi.object(EnvironmentVariablesValidation),
    }),
  ],
})
export class EnvConfigModule {}
