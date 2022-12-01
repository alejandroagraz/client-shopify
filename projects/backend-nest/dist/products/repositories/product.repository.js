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
exports.ProductsRepository = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const products_service_1 = require("../products.service");
const Cryptr = require('cryptr');
let ProductsRepository = class ProductsRepository {
    constructor(productModel, httpService, productsService) {
        this.productModel = productModel;
        this.httpService = httpService;
        this.productsService = productsService;
    }
    async generateDataApi() {
        const products = await this.getDataApi();
        if (products) {
            const dataDto = products.map(function (resp) {
                const createDto = {
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
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    async isData() {
        return this.productModel.count();
    }
    async encryData(data) {
        const cryptr = new Cryptr(process.env.SECRET_JWT);
        return await cryptr.encrypt(data);
    }
};
ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        axios_1.HttpService,
        products_service_1.ProductsService])
], ProductsRepository);
exports.ProductsRepository = ProductsRepository;
//# sourceMappingURL=product.repository.js.map