import crypto from 'crypto-js'
import { BlockInfo } from '../typings/info'

export default class Block {
    private rule = 2
    private create_at: number
    private last_hash: string
    private hash?: string
    private txs: string[] = []
    private proof: number
    private height: number
    private node_address: string

    constructor(height: number, node_address: string, last_hash: string) {
        this.height = height
        this.last_hash = last_hash
        const { hash, proof } = this.generate_hash(last_hash)
        this.proof = proof
        this.hash = hash
        this.node_address = node_address
    }

    // setRule
    set _rule(rule: number) {
        this.rule = rule
    }

    get _hash() {
        return this.hash
    }

    get _height() {
        return this.height
    }

    get _node_address() {
        return this.node_address
    }

    set _node_address(node_address: string) {
        this.node_address = node_address
    }

    get _all_transaction_info(): string[] {
        return this.txs.map((tx) => tx)
    }

    push_transaction(tx_hash: string) {
        this.txs.push(tx_hash)
    }

    generate_hash(last_hash: string): { proof: number; hash: string } {
        let hash
        let invalid = true
        let proof = 0
        while (invalid) {
            const random_string: string = last_hash + proof
            hash = crypto.SHA256(random_string).toString()

            if (this.is_valid_hash(hash)) {
                invalid = false
                this.proof = proof
            } else proof += 1
        }

        return { hash, proof }
    }

    is_valid_hash(hash: string): boolean {
        if (hash) {
            if (hash.substr(0, 1) == '0') return true
        }

        return false
    }

    get _info(): BlockInfo {
        return {
            height: this.height,
            rule: this.rule,
            create_at: this.create_at,
            proof: this.proof,
            hash: this.hash,
            last_hash: this.last_hash,
            txs: this._all_transaction_info,
            node_address: this.node_address,
        }
    }
}
