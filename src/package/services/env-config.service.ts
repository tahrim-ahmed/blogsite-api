import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TEnvironmentVariables } from '@/package/modules/env-config.module';

@Injectable()
export class EnvConfigService extends ConfigService<TEnvironmentVariables> {}
