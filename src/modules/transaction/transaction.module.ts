import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service'
import { TransactionResolver } from './transaction.resolver'
import { TransactionRepository } from './repositories/transaction.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { TransactionLogEntity } from './entities/transaction_log.entity'
import { UserRepository } from '../users/repositories/user.repository'
import { ServiceHelper } from '../transaction/helpers/service.helper'
import { WalletRepository } from '../wallet/repositories/walletRepository'
import { WalletLogRepository } from '../wallet/repositories/walletLogRepository'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([
            TransactionRepository,
            UserRepository,
            WalletRepository,
            WalletLogRepository
        ]),
    ],
    providers: [TransactionService, TransactionResolver, TransactionLogEntity, ServiceHelper],
})
export class TransactionModule {}
