import { AuthsService } from './auths.service';
import { AuthType } from './dto/auth-user.dto';
import { AuthInput } from './inputs/auth.input';
export declare class AuthsResolver {
    private authsService;
    constructor(authsService: AuthsService);
    authenticateUser(input: AuthInput): Promise<AuthType>;
}
