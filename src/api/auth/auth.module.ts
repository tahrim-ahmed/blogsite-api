import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/user.module';
import { BcryptService } from '../../package/services/bcrypt.service';
import { ExceptionService } from '../../package/services/exception.service';
import { ResponseService } from '../../package/services/response.service';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    BcryptService,
    ExceptionService,
    ResponseService,
    ConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
