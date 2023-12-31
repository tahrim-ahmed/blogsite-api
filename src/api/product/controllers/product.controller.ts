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

import { ProductDto } from '@/package/dto/product/product.dto';
import { ResponseDto } from '@/package/dto/response/response.dto';
import { DtoValidationPipe } from '@/package/pipes/dto-validation.pipe';
import { IntValidationPipe } from '@/package/pipes/int-validation.pipe';
import { UuidValidationPipe } from '@/package/pipes/uuid-validation.pipe';
import { RequestService } from '@/package/services/request.service';
import { ResponseService } from '@/package/services/response.service';

import { ProductService } from '../services/product.service';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
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
    const allProduct = this.productService.search(page, limit, search);
    return this.responseService.toPaginationResponse(
      HttpStatus.OK,
      null,
      page,
      limit,
      allProduct,
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
    const allProduct = this.productService.pagination(
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
      allProduct,
    );
  }

  @ApiCreatedResponse({
    description: 'Product successfully added!!',
  })
  @ApiBody({ type: ProductDto })
  @Post()
  create(
    @Body(
      new DtoValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createProductDto: ProductDto,
  ): Promise<ResponseDto> {
    const modifiedDto = this.requestService.forCreate(createProductDto);
    const region = this.productService.create(modifiedDto);
    return this.responseService.toDtoResponse(
      HttpStatus.CREATED,
      'Product successfully added!!',
      region,
    );
  }

  @ApiOkResponse({
    description: 'Product successfully updated!!',
  })
  @ApiBody({ type: ProductDto })
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
    createProductDto: ProductDto,
  ): Promise<ResponseDto> {
    const modifiedDto = this.requestService.forUpdate(createProductDto);
    const region = this.productService.update(id, modifiedDto);
    return this.responseService.toDtoResponse(
      HttpStatus.OK,
      'Product successfully updated!!',
      region,
    );
  }

  @ApiOkResponse({ description: 'Product successfully deleted!' })
  @Delete(':id')
  remove(
    @Param('id', new UuidValidationPipe()) id: string,
  ): Promise<ResponseDto> {
    const deleted = this.productService.remove(id);
    return this.responseService.toResponse(
      HttpStatus.OK,
      'Product successfully deleted!',
      deleted,
    );
  }
}
