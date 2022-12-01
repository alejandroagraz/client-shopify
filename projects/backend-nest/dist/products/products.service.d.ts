import { FilterQuery, Model } from 'mongoose';
import { IProduct } from "./interfaces/product.interface";
import { ProductInput } from "./inputs/product.input";
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<IProduct>);
    create(createProductDto: ProductInput): Promise<IProduct>;
    find(query: FilterQuery<IProduct>): Promise<IProduct[]>;
    findAll(): Promise<IProduct[]>;
    count(): Promise<Number>;
}
