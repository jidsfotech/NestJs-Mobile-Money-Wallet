import { ArgsType, Field , InputType} from '@nestjs/graphql'
import { IsNotEmpty, MinLength, Length, IsOptional, Min } from 'class-validator'

@InputType('CreateTransactionInput')
export class CreateTransactionInput {
    @Field()
    @MinLength(10)
    transactionID: string;

    @Field()
    @IsNotEmpty()
    sender_id: number

    @Field()
    @IsNotEmpty()
    reciever_email: string;

    @Field()
    @IsNotEmpty()
    @Min(200)
    amount: number;
}