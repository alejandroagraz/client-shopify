import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './graphql/schema.gql',
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot(process.env.MONO_DB_CONNECTION_STRING),
    UsersModule,
    AuthsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
