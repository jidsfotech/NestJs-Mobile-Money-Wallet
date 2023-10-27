import { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm/decorator/EntityRepository'
import { WalletEntity } from '../entities/wallet.entity'

@EntityRepository(WalletEntity)
export class WalletRepository extends Repository<WalletEntity> {}
