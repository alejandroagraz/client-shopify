import { ProductsService } from './products.service';
import { SearchProductInput } from './inputs/search.input';
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(): Promise<import("./interfaces/product.interface").IProduct[]>;
    searchProducts(input: SearchProductInput): Promise<import("./interfaces/product.interface").IProduct[]>;
}
