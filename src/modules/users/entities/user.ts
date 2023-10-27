import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class User {
    @Field()
    userId: string;

    @Field()
    email: string;

    @Field()
    phone: number;

    @Field()
    name: string
}