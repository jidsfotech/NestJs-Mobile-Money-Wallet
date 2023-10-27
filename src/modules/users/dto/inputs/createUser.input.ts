import { ArgsType, Field , InputType} from '@nestjs/graphql'
import { IsNotEmpty, MinLength, Length, IsOptional } from 'class-validator'

@InputType('CreateUserInput')
export class CreateUserInput {
    @Field()
    @MinLength(10)
    name: string;

    @Field()
    @IsNotEmpty()
    @Length(30, 500)
    email: string

    @Field({ nullable: true })
    @IsOptional()
    telephone?: string;

    @Field()
    @IsNotEmpty()
    @Length(5, 10)
    accountNumber: string;

    @Field()
    @IsNotEmpty()
    bankName: string;
}