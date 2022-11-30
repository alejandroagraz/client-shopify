import { InputType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class ProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field(() => GraphQLISODateTime)
  created_at: string;

  @Field(() => GraphQLISODateTime)
  updated_at: string;
}

