import { BaseAddress } from './enums/address'
import { CoinUnit, TransactionType, WalletType } from './enums/type'
import Blockchain from './model/BlockChain'
import Transaction from './model/Transaction'
import Wallet from './model/Wallet'

export default class TestNet {
    monstersChain: Blockchain = new Blockchain('monster')
    transactionsChain: Blockchain = new Blockchain('transaction')
    wallets: Record<string, Wallet> = {}

    constructor() {
        this.init()
    }

    // init()
    async init() {
        ;[0, 1, 2]
            .map((e) => BaseAddress.Wallet + e)
            .forEach((address: string, index: number) => {
                const bank = new Wallet(
                    'tran_duy_viet',
                    'yes, is me',
                    address,
                    10000,
                    WalletType.BANKER,
                    null
                )

                Object.assign(this.wallets, { [bank.address]: bank })
            })
    }

    // get wallet detail
    async getWalletDetail(address: string): Promise<Wallet | undefined> {
        return this.wallets[address]
    }

    // register wallet
    async registerWallet(name: string, pass: string) {
        const wallet: Wallet = new Wallet(name, pass)
        Object.assign(this.wallets, wallet)
        const address = wallet.createAddress(WalletType.USER)
        if (wallet) {
            return address
        } else return 'No wallet'
    }

    // create transaction
    async createTransaction(
        sender: string,
        receiver: string,
        data: string,
        value: number,
        unit: CoinUnit
    ): Promise<Transaction> {
        const transaction: Transaction = this.transactionsChain.appendNew(
            data,
            sender,
            receiver,
            value,
            unit,
            TransactionType.Transfer,
            5
        )
        return transaction
    }

    // get transaction
    async getTransaction(hash: string): Promise<Array<Transaction>> {
        return this.transactionsChain.transactions.filter(
            (trans: Transaction) => trans.hash.includes(hash)
        )
    }

    // get list wallet
    async getWalletList() {
        return this.wallets
    }
}
