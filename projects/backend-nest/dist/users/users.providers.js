"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const users_schema_1 = require("./schemas/users.schema");
exports.usersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection) => connection.model('users', users_schema_1.UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=users.providers.js.map