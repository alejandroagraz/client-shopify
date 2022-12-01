import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { IProduct } from "../interfaces/product.interface";
import { IUser } from "../../users/interfaces/user.interface";
import { ProductsService } from "../products.service";
export declare class ProductsRepository {
    private productModel;
    private readonly httpService;
    private readonly productsService;
    constructor(productModel: Model<IProduct>, httpService: HttpService, productsService: ProductsService);
    generateDataApi(userDto: IUser): Promise<void>;
    getDataApi(userDto: IUser): Promise<any>;
    isData(): Promise<number>;
}
