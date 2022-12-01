import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import { ProductModule } from './products/product.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './commands/tasks/tasks.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './graphql/schema.gql',
      context: ({ req }) => ({ req }),
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthsModule,
    ProductModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
