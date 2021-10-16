import { CoinUnit, TransactionType } from '../enums/type'
import { TransactionInfo } from '../typings'

class Transaction {
    private type: TransactionType
    private from: string
    private to: string
    private value: number
    private unit: CoinUnit
    private create_at: number
    private data: string
    private hash: string
    private status: string = 'call'
    private block_id: number

    constructor(
        block_id: number,
        from: string,
        to: string,
        value: number,
        type: TransactionType,
        unit: CoinUnit,
        data: any
    ) {
        this.block_id = block_id
        this.value = value
        this.from = from
        this.to = to
        this.unit = unit
        this.type = type
        this.create_at = new Date().getTime()
        this.data = data
    }

    get _type() {
        return this.type
    }

    get _from() {
        return this.from
    }

    get _to() {
        return this.to
    }

    get _value() {
        return this.value
    }

    get _unit() {
        return this.unit
    }

    get _data() {
        return this.data
    }

    get _hash() {
        return this.hash
    }

    get _create_at() {
        return this.create_at
    }

    get _status() {
        return this.status
    }

    get _block_id() {
        return this.block_id
    }

    set _status(status: string) {
        this.status = status
    }

    get _info(): TransactionInfo {
        return {
            type: this._type,
            from: this._from,
            to: this._to,
            value: this._value,
            unit: this._unit,
            hash: this._hash,
            data: this._data,
            create_at: this._create_at,
            status: this._status,
            block_id: this._block_id,
        }
    }
}

export default Transaction
