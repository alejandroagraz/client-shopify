"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auths_resolver_1 = require("./auths.resolver");
const auths_service_1 = require("./auths.service");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const product_module_1 = require("../products/product.module");
const product_repository_1 = require("../products/repositories/product.repository");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const axios_1 = require("@nestjs/axios");
const users_providers_1 = require("../users/users.providers");
const products_providers_1 = require("../products/products.providers");
const database_module_1 = require("../database/database.module");
const products_service_1 = require("../products/products.service");
let AuthsModule = class AuthsModule {
};
AuthsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            passport_1.PassportModule,
            product_module_1.ProductModule,
            axios_1.HttpModule,
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_JWT,
                signOptions: { expiresIn: '7200s' },
            }),
        ],
        providers: [
            auths_resolver_1.AuthsResolver,
            jwt_strategy_1.JwtStrategy,
            auths_service_1.AuthsService,
            users_service_1.UsersService,
            product_repository_1.ProductsRepository,
            products_service_1.ProductsService,
            ...users_providers_1.usersProviders,
            ...products_providers_1.productsProviders
        ],
        exports: [auths_service_1.AuthsService],
    })
], AuthsModule);
exports.AuthsModule = AuthsModule;
//# sourceMappingURL=auths.module.js.map