import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductType } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';
import { SearchProductInput } from './inputs/search.input';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductType])
  @UseGuards(JwtAuthGuard)
  async getProducts() {
    return this.productsService.findAll();
  }

  @Mutation(() => [ProductType])
  @UseGuards(JwtAuthGuard)
  async searchProducts(@Args('input') input: SearchProductInput) {
    const reg = new RegExp(input.search, "ig");
    return this.productsService.find({
      $or: [
        {'name': reg},
        { 'description' : reg}
      ]
    });
  }
}
