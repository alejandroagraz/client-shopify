import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TasksInitService } from './commands/tasks/tasks.init.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(4000);
  app.get(TasksInitService);
  console.log('Application is running on: http://localhost:4000');
}
bootstrap();
