import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { WalletEntity } from '../../wallet/entities/wallet.entity';
import { TransactionLogEntity } from '../../transaction/entities/transaction_log.entity'
import { WalletLogEntity } from 'src/modules/wallet/entities/wallet.log.entity';

@Entity('users')
@ObjectType('Users')
export class UserEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firebaseId?: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  telephone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  accountNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bankName?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  updatedAt?: Date;

  @Column()
  active: boolean;

  @OneToMany(() => WalletLogEntity, (log: WalletLogEntity) => log.walletOwnerRef)
  logs: Array<WalletLogEntity>

  @OneToMany(() => TransactionLogEntity, (transaction: TransactionLogEntity) => transaction.userTransactionReciever)
  recieverTransactions: Array<TransactionLogEntity>

  @OneToMany(() => TransactionLogEntity, (transaction: TransactionLogEntity) => transaction.userTransactionSender)
  senderTransactions: Array<TransactionLogEntity>
}
