import { CoinUnit, TransactionType } from '../enums/type'
import Block from './Block'

export default class Transaction extends Block {
    block: Block
    type: TransactionType
    sender: string
    receiver: string
    createDate: number
    value: number
    unit: CoinUnit

    constructor(
        data: any,
        lastHash: string,
        value: number,
        rule: number,
        type: TransactionType,
        unit: CoinUnit,
        sender: string,
        receiver: string
    ) {
        super(lastHash, data, rule)
        this.sender = sender
        this.receiver = receiver
        this.type = type
        this.value = value
        this.unit = unit
        this.type = type
        this.createDate = new Date().getTime()
        this.hash = this.genHash()
    }
}
