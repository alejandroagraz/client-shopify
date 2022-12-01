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
exports.AuthsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auths_service_1 = require("./auths.service");
const auth_user_dto_1 = require("./dto/auth-user.dto");
const auth_input_1 = require("./inputs/auth.input");
const graphql_2 = require("graphql");
let AuthsResolver = class AuthsResolver {
    constructor(authsService) {
        this.authsService = authsService;
    }
    async authenticateUser(input) {
        const validate = await this.authsService.validateUser(input);
        if (validate) {
            return await this.authsService.login(validate);
        }
        else {
            throw new graphql_2.GraphQLError('Authentication failed, invalid credentials!');
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => auth_user_dto_1.AuthType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.AuthInput]),
    __metadata("design:returntype", Promise)
], AuthsResolver.prototype, "authenticateUser", null);
AuthsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auths_service_1.AuthsService])
], AuthsResolver);
exports.AuthsResolver = AuthsResolver;
//# sourceMappingURL=auths.resolver.js.map