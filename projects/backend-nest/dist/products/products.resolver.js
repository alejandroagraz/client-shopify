"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const jwt_auth_guard_1 = require("../auths/guards/jwt-auth.guard");
const search_input_1 = require("./inputs/search.input");
let ProductsResolver = class ProductsResolver {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getProducts() {
        return this.productsService.findAll();
    }
    async searchProducts(input) {
        const reg = new RegExp(input.search, "ig");
        return this.productsService.find({
            $or: [
                { 'name': reg },
                { 'description': reg }
            ]
        });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [create_product_dto_1.ProductType]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "getProducts", null);
__decorate([
    (0, graphql_1.Mutation)(() => [create_product_dto_1.ProductType]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_input_1.SearchProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "searchProducts", null);
ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsResolver);
exports.ProductsResolver = ProductsResolver;
//# sourceMappingURL=products.resolver.js.map