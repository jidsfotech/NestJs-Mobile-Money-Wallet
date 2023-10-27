import { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm/decorator/EntityRepository'
import { TransactionLogEntity } from '../entities/transaction_log.entity'

@EntityRepository(TransactionLogEntity)
export class TransactionRepository extends Repository<TransactionLogEntity> {}
