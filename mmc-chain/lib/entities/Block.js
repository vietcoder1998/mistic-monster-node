"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
class Block {
    constructor(id, node_id, last_hash) {
        this.rule = 3;
        this.txs = [];
        this.id = id;
        this.last_hash = last_hash ? last_hash.substring(0, -6) : '';
        const { hash, proof } = this.gen_hash(last_hash);
        this.proof = proof;
        this.hash = hash;
        this.node_id = node_id;
    }
    // setRule
    set _rule(rule) {
        this.rule = rule;
    }
    get _hash() {
        return this.hash;
    }
    get _id() {
        return this.id;
    }
    get _info() {
        return {
            id: this.id,
            rule: this.rule,
            create_at: this.create_at,
            proof: this.proof,
            hash: this.hash,
            last_hash: this.last_hash,
            txs: this._all_transaction_info,
            node_id: this.node_id,
        };
    }
    get _all_transaction_info() {
        return this.txs.map((tx) => tx._info);
    }
    push_transaction(tx) {
        this.txs.push(tx);
    }
    gen_hash(last_hash) {
        let hash;
        let invalid = true;
        let proof = 0;
        while (invalid) {
            const random_string = last_hash +
                String(1000000 + Math.floor(Math.random() * 8999999));
            hash = crypto_js_1.default.AES.encrypt(random_string.substring(0, -6), 'mistic_monster').toString();
            if (this.is_valid_hash(hash)) {
                invalid = false;
            }
            else {
                proof += 1;
            }
        }
        return { hash, proof };
    }
    is_valid_hash(hash) {
        let count = 0;
        if (hash) {
            for (let i = 0; i < hash.length - 1; i++) {
                if (hash[i] === '0') {
                    count += 1;
                }
            }
            if (count === this.rule) {
                return true;
            }
        }
        return false;
    }
}
exports.default = Block;
