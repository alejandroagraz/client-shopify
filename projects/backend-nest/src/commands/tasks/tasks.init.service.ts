import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductsRepository } from '../../products/repositories/product.repository';

@Injectable()
export class TasksInitService implements OnModuleInit {
  constructor(private readonly productsRepository: ProductsRepository) {}
  onModuleInit(): any {
    this.getData();
  }

  async getData() {
    console.log(`Initialization data for products ...`);
    await this.productsRepository.generateDataApi();
  }
}
