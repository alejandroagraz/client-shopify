import { UsersService } from './users.service';
import { UserInput } from './inputs/user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("./interfaces/user.interface").IUser[]>;
    createUser(input: UserInput): Promise<import("./interfaces/user.interface").IUser>;
}
