import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductsRepository } from '../../products/repositories/product.repository';

@Injectable()
export class TasksService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    this.productsRepository.generateDataApi();
    console.log('Task executed');
  }
}
