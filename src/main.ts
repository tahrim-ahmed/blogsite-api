import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { join } from 'path';

import { FieldExceptionFilter } from '@/package/filters/field-exception.filter';
import { SystemExceptionFilter } from '@/package/filters/system-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('chronicle-api-bootstrap');
  logger.warn('Running in ' + process.env.NODE_ENV + ' mode');

  const NEST_APP = await NestFactory.create<NestExpressApplication>(AppModule);
  NEST_APP.setGlobalPrefix('api/v1');
  NEST_APP.useGlobalFilters(new SystemExceptionFilter());
  NEST_APP.useGlobalFilters(new FieldExceptionFilter());

  NEST_APP.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false,
    prefix: '/public',
  });

  const config = new DocumentBuilder()
    .setTitle('Chronicle')
    .setDescription('The Chronicle API description')
    .setVersion('1.0')
    .addTag('chronicle')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(NEST_APP, config);
  SwaggerModule.setup('chronicle-api', NEST_APP, document);

  const configService = NEST_APP.get(ConfigService);
  const port = configService.get<number>('PORT');

  NEST_APP.enableCors();

  await NEST_APP.listen(port);

  logger.log(
    `Documentation is running in http://localhost:${port}/chronicle-api`,
  );
  logger.log(`Api is running in http://localhost:${port}`);
}

bootstrap();
