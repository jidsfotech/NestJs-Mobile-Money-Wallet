import { Query, Mutation, Args, Resolver } from '@nestjs/graphql'
import { WalletService } from './wallet.service'
import { WalletEntity } from './entities/wallet.entity';
import { TopUpInput } from './dto/inputs/topUp.input'
import { from } from 'rxjs'

@Resolver(() => WalletEntity)
export class WalletResolver {
    constructor(private readonly walletService: WalletService) {}

    @Mutation(() => WalletEntity)
    topUpWallet(@Args('topUp') topUp: TopUpInput){
      return this.walletService.topUp(topUp)
    }
}