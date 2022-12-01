import { Model, FilterQuery } from 'mongoose';
import { User } from './schemas/users.schema';
import { IUser } from './interfaces/user.interface';
import { UserInput } from './inputs/user.input';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
    create(createUserDto: UserInput): Promise<IUser>;
    find(query: FilterQuery<User>): Promise<IUser[]>;
    findAll(): Promise<IUser[]>;
    findOne(query: FilterQuery<User>): Promise<IUser>;
}
