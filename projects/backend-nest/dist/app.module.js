"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const database_module_1 = require("./database/database.module");
const database_providers_1 = require("./database/database.providers");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auths_module_1 = require("./auths/auths.module");
const product_module_1 = require("./products/product.module");
const schedule_1 = require("@nestjs/schedule");
const tasks_module_1 = require("./commands/tasks/tasks.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: './graphql/schema.gql',
                context: ({ req }) => ({ req }),
            }),
            schedule_1.ScheduleModule.forRoot(),
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            auths_module_1.AuthsModule,
            product_module_1.ProductModule,
            tasks_module_1.TasksModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ...database_providers_1.databaseProviders],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map