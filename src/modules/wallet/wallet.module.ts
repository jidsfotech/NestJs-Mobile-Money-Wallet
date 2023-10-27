import { Module } from '@nestjs/common';
import { WalletLogRepository } from './repositories/walletLogRepository'
import { WalletRepository } from './repositories/walletRepository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { WalletEntity } from './entities/wallet.entity'
import { WalletLogEntity } from './entities/wallet.log.entity'
import { ServiceHelper } from './helpers/service.helper'
import { WalletService } from './wallet.service'
import { WalletResolver } from './wallet.resolver'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([WalletLogRepository, WalletRepository]),
    ],
    providers: [WalletService, WalletResolver, WalletLogEntity, WalletEntity,  ServiceHelper],
})
export class WalletModule {}
