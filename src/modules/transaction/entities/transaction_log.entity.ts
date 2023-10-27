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

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed"
}

@Entity('transaction_log')
@ObjectType('Transaction_log')
export class TransactionLogEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  transactionID: string;

  @Field()
  @Column()
  transactionReference: string;

  @Field()
  @Column()
  amount: number;

  @ManyToOne(() => UserEntity, user => user.id, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  userTransactionSender: UserEntity;

  @ManyToOne(() => UserEntity, user => user.id, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'reciever_id', referencedColumnName: 'id' })
  userTransactionReciever: UserEntity;

  @Column({
      type: "enum",
      enum: TransactionStatus,
  })
  transaction_status: TransactionStatus

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
