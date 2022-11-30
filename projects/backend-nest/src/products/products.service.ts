import { FilterQuery, Model, UpdateQuery } from 'mongoose';
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
    const resp = await this.productModel.find(query).sort({ created_at: -1 }).exec();
    return resp
  }

  async findAll(): Promise<IProduct[]> {
    const data = await this.productModel.find().exec()
    return data;
  }

}
