"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose_1 = require("mongoose");
const dotenv = require('dotenv').config();
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => mongoose_1.default.connect(process.env.MONO_DB_CONNECTION_STRING),
    },
];
//# sourceMappingURL=database.providers.js.map