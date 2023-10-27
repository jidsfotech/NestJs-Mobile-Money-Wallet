import { ArgsType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@ArgsType()
export class GetTransactionsArgs {
    @Field()
    @IsNotEmpty()
    reference: string
}