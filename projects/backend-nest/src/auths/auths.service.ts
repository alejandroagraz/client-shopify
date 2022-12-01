import { Injectable, Inject } from '@nestjs/common';
import { AuthInput } from './inputs/auth.input';
import { AuthType } from './dto/auth-user.dto';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProductsRepository } from '../products/repositories/product.repository';

@Injectable()
export class AuthsService {
  constructor(
    @Inject('USER_MODEL')
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async validateUser(input: AuthInput): Promise<IUser> {
    const { username, password } = input;
    const isUSer: IUser = await this.usersService.findOne({
      $or: [{ email: username }, { username }],
    });

    if (isUSer) {
      const verifyPassword = await bcrypt.compare(password, isUSer.password);
      if (verifyPassword) {
        return isUSer;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async login(userDto: IUser): Promise<AuthType> {
    const authType = new AuthType();
    const payload = {
      sub: userDto._id,
      username: userDto.username,
      email: userDto.email,
    };

    const isData = await this.productsRepository.isData();
    if (isData == 0) {
      await this.productsRepository.generateDataApi();
    }

    authType.access_token = await this.jwtService.sign(payload);
    return authType;
  }
}
