import { Connection } from 'mongoose';
export declare const productsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("./schemas/product.schema").Product, {}, {}, {}, import("mongoose").Schema<import("./schemas/product.schema").Product, import("mongoose").Model<import("./schemas/product.schema").Product, any, any, any, any>, {}, {}, {}, {}, "type", import("./schemas/product.schema").Product>>;
    inject: string[];
}[];
