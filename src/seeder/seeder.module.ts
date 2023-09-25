import { Module } from '@nestjs/common';

import { EnvConfigModule } from '@/package/modules/env-config.module';
import { TypeormConfigModule } from '@/package/modules/typeorm-config.module';
import { SeederService } from '@/seeder/seeder.service';
import { UserSeederModule } from '@/seeder/user/user-seeder.module';

@Module({
  imports: [EnvConfigModule, TypeormConfigModule, UserSeederModule],
  providers: [SeederService],
})
export class SeederModule {}
