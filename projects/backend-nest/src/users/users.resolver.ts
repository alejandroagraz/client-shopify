import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType])
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.usersService.findAll();
  }

  @Mutation(() => UserType)
  @UseGuards(JwtAuthGuard)
  async createUser(@Args('input') input: UserInput) {
    return this.usersService.create(input);
  }
}
