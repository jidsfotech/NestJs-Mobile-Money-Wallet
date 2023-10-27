import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {UsersModule} from './modules/users/users.module'
import { TransactionModule } from './modules/transaction/transaction.module'
import { WalletModule } from './modules/wallet/wallet.module'
import { typeOrmConfig } from '../config/dbConfig'
import { Connection } from 'typeorm';

const TypeormConfig = typeOrmConfig as TypeOrmModuleOptions;

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    UsersModule,
    TransactionModule,
    WalletModule,
    TypeOrmModule.forRoot(TypeormConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
