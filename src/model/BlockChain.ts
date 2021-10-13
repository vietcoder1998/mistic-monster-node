import { CoinUnit, TransactionType } from '../enums/type'
import Block from './Block'
import Transaction from './Transaction'

export default class BlockChain {
    private transactions: Transaction[] = []
    private name: string
    private createAt: number = new Date().getDate()
    private author: string = 'tran_duy_viet'

    constructor(name: string) {
        this.name = name
    }

    get _total(): number {
        return this.transactions.length
    }

    get _last_hash() {
        if (this.transactions.length === 0) {
            return ''
        } else return this.transactions[this.transactions.length - 1].hash
    }

    get _create_date() {
        return this.createAt
    }

    get _author(): string {
        return this.author
    }

    get _name(): string {
        return this.name
    }

    get _last_transaction() {
        if (this.transactions.length === 0) {
            return undefined
        } else {
            return this.transactions[this.transactions.length - 1]
        }
    }

    get _transactions() {
        return this.transactions
    }

    append(
        data: string,
        from: string,
        to: string,
        value: number,
        unit: CoinUnit,
        type: TransactionType,
    ) {
        const transaction = new Transaction(
            this._last_hash,
            data,
            from,
            to,
            value,
            type,
            unit,
        )

        if (this.validate()) {
            this.transactions.push(transaction)
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
                var compareHash = block.gen_hash()

                if (compareHash === nextHash) {
                    isTruth = false
                    break
                }
            }
        }

        return isTruth
    }

    query(page?: number, size?: number) {
        const start = page | 0
        const end = (start === 0 ? 1 : start) * (size | 10)
        return this.transactions.filter(
            (v: Block, i: number) => start <= i && i < end
        )
    }
}
