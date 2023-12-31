import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from '@/package/decorators/public.decorator';
import { ResponseDto } from '@/package/dto/response/response.dto';
import { UserDto } from '@/package/dto/user/user.dto';
import { DtoValidationPipe } from '@/package/pipes/dto-validation.pipe';
import { IntValidationPipe } from '@/package/pipes/int-validation.pipe';
import { UuidValidationPipe } from '@/package/pipes/uuid-validation.pipe';
import { ResponseService } from '@/package/services/response.service';

import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiBearerAuth()
  @Get()
  findAll(): Promise<ResponseDto> {
    const userDto = this.userService.findAll();
    return this.responseService.toDtosResponse(
      <number>HttpStatus.OK,
      null,
      userDto,
    );
  }

  @ApiBearerAuth()
  @Post('find')
  findOne(
    @Body(new DtoValidationPipe({ skipMissingProperties: true })) dto: UserDto,
  ): Promise<ResponseDto> {
    const userDto = this.userService.findOne(dto);

    return this.responseService.toDtoResponse(HttpStatus.OK, null, userDto);
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
  })
  @Get('pagination')
  pagination(
    @Query('page', new IntValidationPipe()) page: number,
    @Query('limit', new IntValidationPipe()) limit: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
    @Query('search') search: string,
  ): Promise<ResponseDto> {
    const user = this.userService.pagination(page, limit, sort, order, search);
    return this.responseService.toPaginationResponse(
      HttpStatus.OK,
      null,
      page,
      limit,
      user,
    );
  }

  @Public()
  @ApiBody({ type: UserDto })
  @Post('registration')
  registration(
    @Body(
      new DtoValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    )
    createUserDto: UserDto,
  ): Promise<ResponseDto> {
    const userDto = this.userService.registration(createUserDto);

    return this.responseService.toDtoResponse(
      HttpStatus.CREATED,
      'Registration Success!!',
      userDto,
    );
  }

  @ApiBearerAuth()
  @ApiBody({ type: UserDto })
  @Post('create')
  create(
    @Body(
      new DtoValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    )
    createUserDto: UserDto,
  ): Promise<ResponseDto> {
    const userDto = this.userService.create(createUserDto);

    return this.responseService.toDtoResponse(
      HttpStatus.CREATED,
      'User Create Success!!',
      userDto,
    );
  }

  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id', new UuidValidationPipe()) id: string,
    @Body(new DtoValidationPipe({ skipMissingProperties: true })) dto: UserDto,
  ): Promise<ResponseDto> {
    const userDto = this.userService.update(id, dto);
    return this.responseService.toDtoResponse(
      HttpStatus.OK,
      'User updated successfully',
      userDto,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User successfully deleted!' })
  @Delete(':id')
  remove(@Param('id', new UuidValidationPipe()) id: string): Promise<any> {
    const userDto = this.userService.remove(id);
    return this.responseService.toResponse(
      <number>HttpStatus.OK,
      'User deleted successfully',
      userDto,
    );
  }

  @ApiBearerAuth()
  @Get(':id')
  findById(
    @Param('id', new UuidValidationPipe()) id: string,
  ): Promise<ResponseDto> {
    const userDto = this.userService.findById(id);
    return this.responseService.toDtoResponse(HttpStatus.OK, null, userDto);
  }
}
