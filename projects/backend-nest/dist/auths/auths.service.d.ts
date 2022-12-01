import { AuthInput } from './inputs/auth.input';
import { AuthType } from './dto/auth-user.dto';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ProductsRepository } from '../products/repositories/product.repository';
export declare class AuthsService {
    private readonly usersService;
    private readonly jwtService;
    private readonly productsRepository;
    constructor(usersService: UsersService, jwtService: JwtService, productsRepository: ProductsRepository);
    validateUser(input: AuthInput): Promise<IUser>;
    login(userDto: IUser): Promise<AuthType>;
}
