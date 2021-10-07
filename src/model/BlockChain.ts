import { CoinUnit, TransactionType } from '../enums/type'
import Block from './Block'
import Monster from './Monster'
import Transaction from './Transaction'

export default class Blockchain {
    transactions: Transaction[] = []
    private name: string
    private createAt: number = new Date().getDate()
    private author: string = 'tran_duy_viet'

    constructor(name: string) {
        this.name = name
    }

    appendNew(
        data: Monster | any,
        sender: string,
        receiver: string,
        value: number,
        unit: CoinUnit,
        type: TransactionType,
        rule?: number
    ) {
        const trans = new Transaction(
            data,
            this.getLastHash(),
            rule,
            value,
            type,
            unit,
            sender,
            receiver
        )
        const validate = this.validate()
        if (validate) {
            this.transactions.push(trans)
        }
    }

    // check validate hash
    validate() {
        var isTruth = true

        if (this.transactions && this.transactions.length >= 2) {
            for (var i = 0; i < this.transactions.length - 2; i++) {
                var block = this.transactions[i]
                var nextBlock = this.transactions[i + 1]
                var nextHash = nextBlock.hash
                var compareHash = block.genHash()

                if (compareHash === nextHash) {
                    isTruth = false
                    break
                }
            }
        }

        return isTruth
    }

    getLastHash() {
        if (this.transactions.length === 0) {
            return ''
        } else return this.transactions[this.transactions.length - 1].hash
    }

    getDate() {
        return this.createAt
    }

    getAuth(): string {
        return this.author
    }

    getName(): string {
        return this.name
    }

    getLastTransaction() {
        if (this.transactions.length === 0) {
            return undefined
        } else {
            return this.transactions[this.transactions.length - 1]
        }
    }
}
