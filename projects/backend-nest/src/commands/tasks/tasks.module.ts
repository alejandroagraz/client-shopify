import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { HttpModule } from '@nestjs/axios';
import { ProductModule } from '../../products/product.module';
import { ProductsRepository } from '../../products/repositories/product.repository';
import { productsProviders } from '../../products/products.providers';
import { DatabaseModule } from '../../database/database.module';
import { ProductsService } from '../../products/products.service';
import { TasksInitService } from './tasks.init.service';

@Module({
  imports: [ProductModule, HttpModule, DatabaseModule],
  providers: [
    TasksService,
    TasksInitService,
    ProductsRepository,
    ProductsService,
    ...productsProviders,
  ],
})
@Injectable()
export class TasksModule implements OnModuleInit {
  constructor(private tasksInitService: TasksInitService) {}
  onModuleInit(): any {
    this.tasksInitService.getData();
  }
}
