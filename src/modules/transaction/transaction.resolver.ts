import { Query, Mutation, Args, Resolver } from '@nestjs/graphql'
import { TransactionLogEntity } from './entities/transaction_log.entity'
import { TransactionService } from './transaction.service'
import { CreateTransactionInput } from './dto/inputs/createTransaction.input'

@Resolver(() => TransactionLogEntity)
export class TransactionResolver {
    constructor(private readonly userService: TransactionService) {}

    @Mutation(() => TransactionLogEntity)
    createTransaction(@Args('createTransaction') createTransaction: CreateTransactionInput){
      return this.userService.createTransaction(createTransaction)
    }
}