import { CoinUnit, TransactionType } from '../enums/type'
import { BlockInfo } from '../typings/info'
import Block from './block'
import Transaction from './transaction'

class MMCNode {
    private id: number
    private address: string
    private port: number
    private private_key: string
    private name: string
    private level: number
    private txs: Transaction[]
    private blocks: Block[] = []
    private last_block: BlockInfo

    constructor(
        id: number,
        address: string,
        port: number,
        name: string,
        private_key: string
    ) {
        this.id = id
        this.address = address
        this.port = port
        this.name = name
        this.private_key = private_key
    }

    get _address() {
        return this.address
    }

    get _last_block() {
        return this.last_block
    }

    set _last_block(block: BlockInfo) {
        this.last_block = block
    }

    get _port() {
        return this.port
    }

    get _private_key() {
        return this.private_key
    }

    get _id() {
        return this.id
    }

    get _name() {
        return this.name
    }

    get _level() {
        return this.level
    }

    get _info() {
        return {
            address: this.address,
            port: this.port,
            id: this.id,
            name: this.name,
            level: this.level,
        }
    }

    get _last_transaction() {
        if (this.txs.length > 0) {
            return this.txs[this.txs.length - 1]
        }
        return {}
    }

    change_key(last_key: string, new_key: string) {
        if (last_key === this.private_key) {
            this.private_key = new_key
            return 'Success'
        } else {
            return 'Error Key'
        }
    }

    create_transaction(
        from: string,
        to: string,
        value: number,
        unit: CoinUnit,
        type: TransactionType,
        data: string
    ) {
        const tx = new Transaction(this.id, from, to, value, type, unit, data)
        this.blocks[this.blocks.length - 1].push_transaction(tx)
    }

    create_block() {
        const block = new Block(
            this._last_block ? this._last_block.id + 1 : 0,
            this._id,
            this._last_block ? this.last_block.last_hash : ''
        )

        return block._info
    }

    is_validate_hash(): boolean {
        var is_truth = true

        if (this.blocks && this.blocks.length >= 1) {
            for (var i = 0; i < this.blocks.length - 2; i++) {
                var block: Block = this.blocks[i]
                var next_block: Block = this.blocks[i + 1]
                var next_hash: string = next_block._hash
                var compare_hash: string = block._hash

                if (compare_hash !== next_hash) {
                    is_truth = false
                    break
                }
            }
        }

        return is_truth
    }
}

export default MMCNode
