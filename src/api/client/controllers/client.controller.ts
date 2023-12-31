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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ClientDto } from '@/package/dto/client/client.dto';
import { ResponseDto } from '@/package/dto/response/response.dto';
import { DtoValidationPipe } from '@/package/pipes/dto-validation.pipe';
import { IntValidationPipe } from '@/package/pipes/int-validation.pipe';
import { UuidValidationPipe } from '@/package/pipes/uuid-validation.pipe';
import { RequestService } from '@/package/services/request.service';
import { ResponseService } from '@/package/services/response.service';

import { ClientService } from '../services/client.service';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('client')
export class ClientController {
  constructor(
    private clientService: ClientService,
    private readonly responseService: ResponseService,
    private readonly requestService: RequestService,
  ) {}

  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
  })
  @Get('search')
  search(
    @Query('page', new IntValidationPipe()) page: number,
    @Query('limit', new IntValidationPipe()) limit: number,
    @Query('search') search: string,
  ): Promise<ResponseDto> {
    const allClient = this.clientService.search(page, limit, search);
    return this.responseService.toPaginationResponse(
      HttpStatus.OK,
      null,
      page,
      limit,
      allClient,
    );
  }

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
    const allClient = this.clientService.pagination(
      page,
      limit,
      sort,
      order,
      search,
    );
    return this.responseService.toPaginationResponse(
      HttpStatus.OK,
      null,
      page,
      limit,
      allClient,
    );
  }

  @ApiCreatedResponse({
    description: 'Client successfully added!!',
  })
  @ApiBody({ type: ClientDto })
  @Post()
  create(
    @Body(
      new DtoValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createClientDto: ClientDto,
  ): Promise<ResponseDto> {
    const modifiedDto = this.requestService.forCreate(createClientDto);
    const region = this.clientService.create(modifiedDto);
    return this.responseService.toDtoResponse(
      HttpStatus.CREATED,
      'Client successfully added!!',
      region,
    );
  }

  @ApiOkResponse({
    description: 'Client successfully updated!!',
  })
  @ApiBody({ type: ClientDto })
  @Put(':id')
  update(
    @Param('id', new UuidValidationPipe()) id: string,
    @Body(
      new DtoValidationPipe({
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createClientDto: ClientDto,
  ): Promise<ResponseDto> {
    const modifiedDto = this.requestService.forUpdate(createClientDto);
    const region = this.clientService.update(id, modifiedDto);
    return this.responseService.toDtoResponse(
      HttpStatus.OK,
      'Client successfully updated!!',
      region,
    );
  }

  @ApiOkResponse({ description: 'Client successfully deleted!' })
  @Delete(':id')
  remove(
    @Param('id', new UuidValidationPipe()) id: string,
  ): Promise<ResponseDto> {
    const deleted = this.clientService.remove(id);
    return this.responseService.toResponse(
      HttpStatus.OK,
      'Client successfully deleted!',
      deleted,
    );
  }
}
