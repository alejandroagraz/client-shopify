import { FilterQuery, Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import {IProduct} from "./interfaces/product.interface";
import {ProductInput} from "./inputs/product.input";

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCT_MODEL') private productModel: Model<IProduct>) {}

  async create(createProductDto: ProductInput): Promise<IProduct> {
    const createProduct = new this.productModel(createProductDto);
    return createProduct.save();
  }

  async find(query: FilterQuery<IProduct>): Promise<IProduct[]> {
    return await this.productModel.find(query).sort({ created_at: -1 }).exec();
  }

  async findAll(): Promise<IProduct[]> {
    return await this.productModel.find().exec()
  }

  async count(): Promise<Number> {
    return await this.productModel.count().exec()
  }

}
