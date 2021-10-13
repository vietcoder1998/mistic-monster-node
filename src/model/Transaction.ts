import { CoinUnit, TransactionType } from '../enums/type'
import Block from './Block'

class Transaction extends Block {
    type: TransactionType
    from: string
    to: string
    value: number
    unit: CoinUnit

    constructor(
        last_hash: string,
        data: any,
        from: string,
        to: string,
        value: number,
        type: TransactionType,
        unit: CoinUnit
    ) {
        super(last_hash, data)
        this.value = value
        this.from = from
        this.to = to
        this.unit = unit
        this.type = type
        this.hash = this.gen_hash()
        this.create_at = new Date().getTime()
    }
}

export default Transaction
