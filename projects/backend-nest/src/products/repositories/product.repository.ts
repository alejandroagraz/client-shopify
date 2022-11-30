import { Model } from 'mongoose';
import {Inject, Injectable} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ProductInput } from '../inputs/product.input';
import {IProduct} from "../interfaces/product.interface";
import {IUser} from "../../users/interfaces/user.interface";
import {ProductsService} from "../products.service";
import * as dotenv from 'dotenv';
const bcrypt = require("bcrypt")

@Injectable()
export class ProductsRepository {
  constructor(
      @Inject('PRODUCT_MODEL') private productModel: Model<IProduct>,
      private readonly httpService: HttpService,
      private readonly productsService: ProductsService,
  ) {}

  async generateDataApi(userDto: IUser) {
    const products = await this.getDataApi(userDto);
    if (products) {
      const dataDto = products.map(function (resp) {
        const createDto: ProductInput = {
          name: resp.name,
          description: resp.description,
          image: resp.images,
          created_at: resp.created_at,
          updated_at: resp.updated_at
        };
        return createDto;
      });

      for (const data of dataDto) {
        const resp = await this.productsService.find({
          name: data.name,
          description: data.description
        });

        if (resp.length == 0) {
          await this.productsService.create(data);
        }
      }
    }
  }

  async getDataApi(userDto: IUser) {
    const hashPrivateKey = await bcrypt.hash(userDto.private_key, 10);
    const resp = await this.httpService
        .post(`${process.env.API_EXT}login`, {user_id : userDto._id, private_key : hashPrivateKey})
        .toPromise()
        .then((res) => res.data)
        .catch((err) => err);

    if (resp.status == 'success') {
      const token = resp.data.token;
      const products = await this.httpService.get(`${process.env.API_EXT}products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);

      if (products.status == 'success') {
        return products.data;
      } else {
        return null
      }

    } else {
      return null
    }
  }

  async isData() {
    return this.productModel.count();
  }
}
