import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserEntity } from '../../users/entities/user.entity'
import { WalletLogEntity } from '../../wallet/entities/wallet.log.entity'

@Entity('wallet')
@ObjectType('Wallet')
export class WalletEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  previous_amount: number;

  @Field()
  @Column()
  current_amount: number;

  // @ManyToOne(() => UserEntity, user => user.wallets, {
  //   eager: true,
  //   cascade: true,
  // })
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  // walletOwner: UserEntity;

  @OneToMany(() => WalletLogEntity, (wallet: WalletLogEntity) => wallet.walletIdRef)
  wallets: Array<WalletLogEntity>

  @OneToOne(type => UserEntity)
  @JoinColumn()
  user: UserEntity;

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
