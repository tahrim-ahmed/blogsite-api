import { Body, Controller, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { ResponseService } from '../../../package/services/response.service';
import { DtoValidationPipe } from '../../../package/pipes/dto-validation.pipe';
import { LoginDto } from '../../../package/dto/user/login.dto';
import { UserResponseDto } from '../../../package/dto/response/user-response.dto';
import { UserDto } from '../../../package/dto/user/user.dto';
import { ChangePasswordDto } from '../../../package/dto/user/change-password.dto';
import { ResponseDto } from '../../../package/dto/response/response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('login')
  async login(
    @Body(
      new DtoValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    loginDto: LoginDto,
  ) {
    const payload = this.authService.login(loginDto);
    return this.responseService.toResponse<{
      token: UserResponseDto;
      user: UserDto;
    }>(HttpStatus.OK, 'Login is successful', payload);
  }

  @ApiBearerAuth()
  @Put('change-password')
  async changePassword(
    @Body(
      new DtoValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    changePasswordDto: ChangePasswordDto,
  ): Promise<ResponseDto> {
    const payload = this.authService.changePassword(changePasswordDto);
    return this.responseService.toResponse<UserDto>(
      HttpStatus.OK,
      'Password is changed successfully!! You can login now!',
      payload,
    );
  }
}
