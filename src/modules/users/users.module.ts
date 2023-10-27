import { Module } from '@nestjs/common';
import { UserService } from './users.service'
import { UsersResolver } from './users.resolver'
import { UserRepository } from './repositories/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import {User} from './entities/user'
import { WalletRepository } from '../wallet/repositories/walletRepository'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([UserRepository, WalletRepository])
    ],
    providers: [UserService, UsersResolver, User],
})
export class UsersModule {}
