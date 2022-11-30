import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly description: string;

  @Field({ nullable: true })
  readonly image: string;

  @Field(() => GraphQLISODateTime)
  readonly created_at: string;

  @Field(() => GraphQLISODateTime)
  readonly updated_at: string;
}
