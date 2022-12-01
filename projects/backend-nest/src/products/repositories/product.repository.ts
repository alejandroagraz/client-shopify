import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IProduct } from '../interfaces/product.interface';
import { ProductsService } from '../products.service';
import { ProductInput } from '../inputs/product.input';
const Cryptr = require('cryptr');

@Injectable()
export class ProductsRepository {
  constructor(
    @Inject('PRODUCT_MODEL') private productModel: Model<IProduct>,
    private readonly httpService: HttpService,
    private readonly productsService: ProductsService,
  ) {}

  async generateDataApi() {
    const products = await this.getDataApi();
    if (products) {
      const dataDto = products.map(function (resp) {
        const createDto: ProductInput = {
          name: resp.name,
          description: resp.description,
          image: resp.images,
          created_at: resp.created_at,
          updated_at: resp.updated_at,
        };
        return createDto;
      });

      for (const data of dataDto) {
        const resp = await this.productsService.find({
          name: data.name,
          description: data.description,
        });

        if (resp.length == 0) {
          await this.productsService.create(data);
        }
      }
    }
  }

  async getDataApi() {
    const hashPrivateKey = await this.encryData(process.env.PRIVATE_KEY);
    const resp = await this.httpService
      .post(`${process.env.API_EXT}login`, { private_key: hashPrivateKey })
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);
    console.log(resp);
    if (resp.status == 'success') {
      const token = resp.data.token;
      const products = await this.httpService
        .get(`${process.env.API_EXT}products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .toPromise()
        .then((res) => res.data)
        .catch((err) => err);

      if (products.status == 'success') {
        return products.data;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async isData() {
    return this.productModel.count();
  }

  async encryData(data: string) {
    const cryptr = new Cryptr(process.env.SECRET_JWT);
    return await cryptr.encrypt(data);
  }
}
