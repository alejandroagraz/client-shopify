import { Connection } from 'mongoose';
export declare const usersProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("./schemas/users.schema").User, {}, {}, {}, import("mongoose").Schema<import("./schemas/users.schema").User, import("mongoose").Model<import("./schemas/users.schema").User, any, any, any, any>, {}, {}, {}, {}, "type", import("./schemas/users.schema").User>>;
    inject: string[];
}[];
