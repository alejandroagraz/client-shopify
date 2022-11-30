import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ProductModule } from '../products/product.module';
import { ProductsRepository } from '../products/repositories/product.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import {usersProviders} from "../users/users.providers";
import {productsProviders} from "../products/products.providers";
import {DatabaseModule} from "../database/database.module";
import {ProductsService} from "../products/products.service";
import * as dotenv from 'dotenv';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    PassportModule,
    ProductModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '7200s' },
    }),
  ],
  providers: [
    AuthsResolver,
    JwtStrategy,
    AuthsService,
    UsersService,
    ProductsRepository,
    ProductsService,
    ...usersProviders,
    ...productsProviders
  ],
  exports: [AuthsService],
})
export class AuthsModule {}
