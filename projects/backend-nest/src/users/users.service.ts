import { Injectable, Inject } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import {User} from './schemas/users.schema';
import { IUser } from './interfaces/user.interface';
import { UserInput } from './inputs/user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: UserInput): Promise<IUser> {
    // Hashear password
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.privateKey = await bcrypt.hash(createUserDto.username, salt);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async find(query: FilterQuery<User>): Promise<IUser[]> {
    return this.userModel.find(query).exec();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async findOne(query: FilterQuery<User>): Promise<IUser> {
    return this.userModel.findOne(query).exec();
  }
}
