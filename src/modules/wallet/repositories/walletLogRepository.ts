import { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm/decorator/EntityRepository'
import { WalletLogEntity } from '../entities/wallet.log.entity'

@EntityRepository(WalletLogEntity)
export class WalletLogRepository extends Repository<WalletLogEntity> {}
