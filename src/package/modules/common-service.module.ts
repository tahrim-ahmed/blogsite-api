import { Global, Module } from '@nestjs/common';

import { BcryptService } from '@/package/services/bcrypt.service';
import { EnvConfigService } from '@/package/services/env-config.service';
import { ExceptionService } from '@/package/services/exception.service';
import { PermissionService } from '@/package/services/permission.service';
import { RequestService } from '@/package/services/request.service';
import { ResponseService } from '@/package/services/response.service';

const commonServices = [
  BcryptService,
  EnvConfigService,
  ExceptionService,
  PermissionService,
  RequestService,
  ResponseService,
];

@Global()
@Module({
  providers: [...commonServices],
  exports: [...commonServices],
})
export class CommonServiceModule {}
