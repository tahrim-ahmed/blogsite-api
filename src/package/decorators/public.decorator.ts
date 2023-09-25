/** NestJS Packages */
import { SetMetadata } from '@nestjs/common';

export const IsPublicSymbolName = Symbol('IsPublicSymbolName');

export const Public = () => SetMetadata(IsPublicSymbolName, true);
