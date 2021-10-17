import crypto from 'crypto-js'
import { BlockInfo } from '../typings/info'
import Transaction from './transaction'

export default class Block {
    private rule = 3
    private create_at: number
    private last_hash: string
    private hash?: string
    private txs: string[] = []
    private proof: number
    private id: number
    private node_id: number

    constructor(id: number, node_id: number, last_hash: string) {
        this.id = id
        this.last_hash = last_hash ? last_hash.substring(0, -6) : ''
        const { hash, proof } = this.gen_hash(last_hash)
        this.proof = proof
        this.hash = hash
        this.node_id = node_id
    }

    // setRule
    set _rule(rule: number) {
        this.rule = rule
    }

    get _hash() {
        return this.hash
    }

    get _id() {
        return this.id
    }

    get _info(): BlockInfo {
        return {
            id: this.id,
            rule: this.rule,
            create_at: this.create_at,
            proof: this.proof,
            hash: this.hash,
            last_hash: this.last_hash,
            txs: this._all_transaction_info,
            node_id: this.node_id,
        }
    }

    get _all_transaction_info(): string[] {
        return this.txs.map((tx) => tx)
    }

    push_transaction(tx_hash: string) {
        this.txs.push(tx_hash)
    }

    gen_hash(last_hash: string): { proof: number; hash: string } {
        let hash
        let invalid = true
        let proof = 0
        while (invalid) {
            const random_string: string =
                last_hash +
                String(1000000 + Math.floor(Math.random() * 8999999))

            hash = crypto.AES.encrypt(
                random_string.substring(0, -6),
                'mistic_monster'
            ).toString()

            if (this.is_valid_hash(hash)) {
                invalid = false
            } else {
                proof += 1
            }
        }

        return { hash, proof }
    }

    is_valid_hash(hash: string): boolean {
        let count = 0

        if (hash) {
            for (let i = 0; i < hash.length - 1; i++) {
                if (hash[i] === '0') {
                    count += 1
                }
            }

            if (count === this.rule) {
                return true
            }
        }

        return false
    }
}
