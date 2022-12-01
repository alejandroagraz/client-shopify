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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = void 0;
const graphql_1 = require("@nestjs/graphql");
let ProductType = class ProductType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], ProductType.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductType.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductType.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", String)
], ProductType.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", String)
], ProductType.prototype, "updated_at", void 0);
ProductType = __decorate([
    (0, graphql_1.ObjectType)()
], ProductType);
exports.ProductType = ProductType;
//# sourceMappingURL=create-product.dto.js.map