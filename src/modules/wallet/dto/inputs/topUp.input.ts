import { ArgsType, Field , InputType} from '@nestjs/graphql'
import { IsNotEmpty, MinLength, Length, IsOptional, Min } from 'class-validator'

@InputType('topUp')
export class TopUpInput {
    @Field()
    @IsNotEmpty()
    id: number

    @Field()
    @IsNotEmpty()
    @Min(200)
    amount: number;
}