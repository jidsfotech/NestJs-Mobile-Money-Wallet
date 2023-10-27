import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { WalletRepository } from './repositories/walletRepository'
import { WalletLogRepository } from './repositories/walletLogRepository'


@Injectable()
export class WalletService {
    private logger: Logger

    constructor(
        private readonly walletRepository: WalletRepository,
        private readonly walletLogRepository: WalletLogRepository
      ) {
        this.logger = new Logger('Wallet.Service')
      }


    /**
     * Create user
     * @param inputs 
     */
    public async topUp(inputs) {
      const wallet = await this.walletRepository.findOne({
        where: {
          id: inputs.id
        },
        relations: ['user'],
      })

      if(!wallet) {
        throw new HttpException(
          `[NOT FOUND - could not fetch user wallet]: wallet ${inputs.id}`,
          HttpStatus.NOT_FOUND,
        )
      }

      if(inputs.amount > 100) {
        wallet.previous_amount = wallet.current_amount;
        wallet.current_amount = wallet.current_amount + inputs.amount
        return await this.walletRepository.save(wallet)
      }
      else {
        throw new HttpException(
          `[INVALID AMOUNT] - amount should be greater than 100`,
          HttpStatus.BAD_REQUEST,
        )
      }
    }
}
