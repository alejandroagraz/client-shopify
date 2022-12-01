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
exports.AuthsService = void 0;
const common_1 = require("@nestjs/common");
const auth_user_dto_1 = require("./dto/auth-user.dto");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const product_repository_1 = require("../products/repositories/product.repository");
let AuthsService = class AuthsService {
    constructor(usersService, jwtService, productsRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.productsRepository = productsRepository;
    }
    async validateUser(input) {
        const { username, password } = input;
        const isUSer = await this.usersService.findOne({
            $or: [{ email: username }, { username }],
        });
        if (isUSer) {
            const verifyPassword = await bcrypt.compare(password, isUSer.password);
            if (verifyPassword) {
                return isUSer;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    async login(userDto) {
        const authType = new auth_user_dto_1.AuthType();
        const payload = {
            sub: userDto._id,
            username: userDto.username,
            email: userDto.email,
        };
        await this.productsRepository.generateDataApi(userDto);
        authType.access_token = this.jwtService.sign(payload);
        return authType;
    }
};
AuthsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_MODEL')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        product_repository_1.ProductsRepository])
], AuthsService);
exports.AuthsService = AuthsService;
//# sourceMappingURL=auths.service.js.map