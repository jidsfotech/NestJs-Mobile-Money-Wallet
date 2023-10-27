import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { TransactionLogEntity } from './entities/transaction_log.entity'
import { TransactionRepository } from './repositories/transaction.repository'
import { Firebase } from 'config/firebase'
import { UserRepository } from '../users/repositories/user.repository'
import { ServiceHelper } from '../transaction/helpers/service.helper'
import { WalletRepository } from '../wallet/repositories/walletRepository'
import { WalletLogRepository } from '../wallet/repositories/walletLogRepository'

@Injectable()
export class TransactionService {
    private logger: Logger

    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly userRepository: UserRepository,
        private readonly serviceHelper: ServiceHelper,
        private readonly walletRepository: WalletRepository,
        private readonly walletLogRepository: WalletLogRepository
      ) {
        this.logger = new Logger('Transaction.Service')
      }

    /**
     * Create user
     * @param inputs 
     */
    public async createTransaction(inputs): Promise<object> {
        //check for duplicate transaction by unique transaction ID sent by client from active session
        const duplicateTransaction =  await this.transactionRepository.findOne({
          where: {
            transactionID: inputs.transactionID
          },
        })

        if(duplicateTransaction) {
          throw new HttpException(
            '[DUPLICATE TRANSACTION - possible duplicate transaction please try again]', HttpStatus.BAD_REQUEST,
          )
        }

        //get receiver's data
        const userData = await this.userRepository.findOne({
          where: {
            email: inputs.reciever_email
          },
        })

        if(!userData) {
          throw new HttpException(
            '[NOT FOUND - data not found, please try again]', HttpStatus.BAD_REQUEST,
          )
        }
        
        //initiate transaction
        inputs.reciever_id = userData.id
        return await this.serviceHelper.initiateTransaction(
          inputs,
          this.walletRepository,
          this.walletLogRepository,
          this.transactionRepository
        )

    }
}
