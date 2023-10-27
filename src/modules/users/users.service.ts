import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { UserRepository } from './repositories/user.repository'
import { Firebase } from 'config/firebase'
import { WalletRepository } from '../wallet/repositories/walletRepository'

@Injectable()
export class UserService {
    private logger: Logger

    constructor(
        private readonly userRepository: UserRepository,
        private readonly walletRepository: WalletRepository
      ) {
        this.logger = new Logger('UserService.Auth')
      }

    public getStatus() {
        return {
            message: 'healthy!'
        }
    }

    /**
     * Create user
     * @param inputs 
     */
    public async createUserRecord(inputs): Promise<object> {
        const app = await new Firebase().init()
        let userData =  await this.userRepository.find({
            where: {
              email: inputs.email
            },
          })
        
          if(!userData.length) {
            return await app.auth().createUser({
                email: inputs.email,
                phoneNumber: inputs.telephone,
            })
            .then(async () => {
                return await this.userRepository.save({...inputs, active: true})
            })
            .then(async (model) => {
                //create wallet for new users
                await this.walletRepository.save({
                    previous_amount: 0,
                    current_amount: 0,
                    user: model
                })
                return inputs;
            })
            .catch((e) => {
                this.logger.error('an error ocured while creating user', JSON.stringify(e))
                throw new HttpException(
                    e.toString(), HttpStatus.INTERNAL_SERVER_ERROR,
                )        
            })
          }
        throw new HttpException(
            '[Duplicate Entry]', HttpStatus.BAD_REQUEST,
        )      
    }
}
