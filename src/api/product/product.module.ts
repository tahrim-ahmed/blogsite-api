import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '@/package/entities/product/product.entity';
import { ExceptionService } from '@/package/services/exception.service';
import { PermissionService } from '@/package/services/permission.service';
import { RequestService } from '@/package/services/request.service';
import { ResponseService } from '@/package/services/response.service';

import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  exports: [ProductService],
  providers: [
    ProductService,
    ResponseService,
    ExceptionService,
    RequestService,
    PermissionService,
  ],
})
export class ProductModule {}
