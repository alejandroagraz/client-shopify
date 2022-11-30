import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class UserType {
    @Field(() => ID)
    _id: string;

    @Field()
    readonly email: string;

    @Field()
    readonly username: string;

    @Field()
    readonly privateKey: string;

    @Field(() => GraphQLISODateTime)
    readonly createdAt: string;

    @Field(() => GraphQLISODateTime)
    readonly updatedAt: string;
}
