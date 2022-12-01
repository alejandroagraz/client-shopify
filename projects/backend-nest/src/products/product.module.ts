import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories/product.repository';
import { DatabaseModule } from '../database/database.module';
import { productsProviders } from './products.providers';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [
    ProductsResolver,
    ProductsService,
    ProductsRepository,
    ...productsProviders,
  ],
})
export class ProductModule {}
