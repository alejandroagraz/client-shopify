import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { HttpModule } from '@nestjs/axios';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories/product.repository';
import {Product, ProductSchema} from "./schemas/product.schema";
import {productsProviders} from "./products.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [
    DatabaseModule,
    HttpModule
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    ProductsRepository,
    ...productsProviders
  ],
})
export class ProductModule {}
