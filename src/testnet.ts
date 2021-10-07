import { CoinUnit, TransactionType } from './enums/type'
import Blockchain from './model/BlockChain'
import Monster from './model/Monster'
import Transaction from './model/Transaction'
import Wallet from './model/Wallet'

export default class TestNet {
    monstersChain: Blockchain = new Blockchain('monster')
    transactionsChain: Blockchain = new Blockchain('transaction')
    wallets: Record<string, Wallet> = {}

    // init()

    // get wallet detail
    async getWalletDetail(address: string): Promise<Wallet | undefined> {
        return this.wallets[address]
    }

    // create transaction
    async createTransaction(
        sender: string,
        receiver: string,
        data: Monster | string,
        value: number,
        unit: CoinUnit,
    ): Promise<Transaction> {
        const transaction: Transaction = this.transactionsChain.appendNew(
            data,
            sender,
            receiver,
            value,
            unit,
            TransactionType.Transfer,
            5,
        )
        return transaction
    }

    // get transaction
    async getTransaction(hash: string): Promise<Array<Transaction>> {
        return this.transactionsChain.transactions.filter(
            (trans: Transaction) => trans.hash.includes(hash)
        )
    }
}
