"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const tasks_init_service_1 = require("./commands/tasks/tasks.init.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(4000);
    app.get(tasks_init_service_1.TasksInitService);
    console.log('Application is running on: http://localhost:4000');
}
bootstrap();
//# sourceMappingURL=main.js.map