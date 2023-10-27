import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserEntity } from '../../users/entities/user.entity'
import { WalletEntity } from './wallet.entity'

export enum WalletAction {
  DEBIT = "debit",
  CREDIT = "credit",
}

@Entity('wallet_log')
@ObjectType('Wallet_log')
export class WalletLogEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  transactionReference: string;

  @ManyToOne(() => WalletEntity, wallet => wallet.wallets, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'wallet_id', referencedColumnName: 'id' })
  walletIdRef: WalletEntity;

  @ManyToOne(() => UserEntity, user => user.logs, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  walletOwnerRef: UserEntity;

  @Column({
    type: "enum",
    enum: WalletAction,
  })
  action: WalletAction

  @Field()
  @Column()
  amount: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  updatedAt?: Date;
}
