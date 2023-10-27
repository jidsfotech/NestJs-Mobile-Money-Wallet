import { ILike, In, Repository } from 'typeorm'
import {v4 as uuidv4} from 'uuid';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'

interface Itransaction {
    amount: number,
    reciever_id: number,
    sender_id: number,
    transactionID: string,
}

@Injectable()
export class ServiceHelper {
    async initiateTransaction(
        data: Itransaction,
        walletRepository: Repository<any>,
        walletLogRepository: Repository<any>,
        transactionRepository: Repository<any>
      ): Promise<any> {
        let payload = {
            ...data,
            transactionReference: this.createReference(),
        }

        //debit sender
        await this.debitUser(
            data.sender_id,
            data.amount,
            walletRepository,
            walletLogRepository,
            payload
        )

        //credit reciever
        await this.creditUser(
            data.reciever_id,
            data.sender_id,
            data.amount,
            walletRepository,
            walletLogRepository,
            payload
        )

        const logData = {
            transactionID: payload.transactionID,
            transactionReference: payload.transactionReference,
            transaction_status: 'success',
            userTransactionSender: payload.sender_id,
            userTransactionReciever: payload.reciever_id,
            amount: payload.amount
        }

        return await transactionRepository.save(logData)
    }


    /**
     * Create Transaction reference key
     */
    private createReference() {
        return  `REF-${uuidv4()}`;
    }


    /**
     * Process a debit on user wallet
     * @param id 
     * @param amount 
     * @param walletRepository 
     */
    private async debitUser (
        id,
        amount,
        walletRepository: Repository<any>,
        walletLogRepository: Repository<any>,
        payload
    ): Promise<any> {

        const senderWallet = await walletRepository.findOne({
            where: {
                user: id
            },
        })

        if(!senderWallet) {
            throw new HttpException(
                `[NOT FOUND - could not fetch user wallet]: user ${id}`,
                HttpStatus.NOT_FOUND,
            )
        }

        if(parseFloat(senderWallet.current_amount) < parseFloat(amount)) {
            throw new HttpException (
                `[INSUFFICIENT FUNDS - insufficient funds]`,
                HttpStatus.BAD_REQUEST,
            )
        }

        senderWallet.previous_amount = parseFloat(senderWallet.current_amount);
        senderWallet.current_amount = parseFloat(senderWallet.current_amount) - parseFloat(amount);
        let logData = {
            transactionReference: payload.transactionReference,
            action: 'debit',
            amount: amount,
            walletIdRef: senderWallet.id,
            walletOwnerRef: id
        }

        await walletLogRepository.save(logData)
        return await walletRepository.save(senderWallet)
    }



    /**
     * Process a debit on user wallet
     * @param id 
     * @param amount 
     * @param walletRepository 
     */
    private async creditUser (
        id,
        sender_id,
        amount,
        walletRepository: Repository<any>,
        walletLogRepository: Repository<any>,
        payload
    ): Promise<any> {
        const recieverWallet = await walletRepository.findOne({
            where: {
                user: id
            },
        })

        let data = {
            id,
            recieverWallet,
            transactionReference: payload.transactionReference,
            amount,
        }

        if(!recieverWallet) {
            //refund sender
            data.id = sender_id;
            await this.credit(
                walletRepository,
                walletLogRepository,
                data
            )

            throw new HttpException(
                `[NOT FOUND - could not fetch user wallet]: user ${id}`,
                HttpStatus.NOT_FOUND,
            )
        }

        return await this.credit(
            walletRepository,
            walletLogRepository,
            data
        )
    }


    /**
     * Process wallet credit and refunds
     * @param walletRepository 
     * @param walletLogRepository 
     * @param data 
     */
    private async credit (
        walletRepository: Repository<any>,
        walletLogRepository: Repository<any>,
        data
    ): Promise<any> {
        
        data.recieverWallet.previous_amount = parseFloat(data.recieverWallet.current_amount);
        data.recieverWallet.current_amount = parseFloat(data.recieverWallet.current_amount) + parseFloat(data.amount);

        let logData = {
            transactionReference: data.transactionReference,
            action: 'credit',
            amount: data.amount,
            walletIdRef: data.recieverWallet.id,
            walletOwnerRef: data.id
        }

        await walletLogRepository.save(logData)
        return await walletRepository.save(data.recieverWallet)
    }
}
