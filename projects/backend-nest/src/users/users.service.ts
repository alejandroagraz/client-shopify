import { Injectable, Inject } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import {User} from './schemas/users.schema';
import { IUser } from './interfaces/user.interface';
import { UserInput } from './inputs/user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<IUser>) {}

  async find(query: FilterQuery<User>): Promise<IUser[]> {
    return await this.userModel.find(query).exec();
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async findOne(query: FilterQuery<User>): Promise<IUser> {
    return await this.userModel.findOne(query).exec();
  }
}
