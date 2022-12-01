"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsProviders = void 0;
const product_schema_1 = require("./schemas/product.schema");
exports.productsProviders = [
    {
        provide: 'PRODUCT_MODEL',
        useFactory: (connection) => connection.model('products', product_schema_1.ProductSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=products.providers.js.map