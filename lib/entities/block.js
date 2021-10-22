"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
class Block {
    constructor(height, node_address, last_hash) {
        this.rule = 2;
        this.txs = [];
        this.height = height;
        this.last_hash = last_hash;
        const { hash, proof } = this.generate_hash(last_hash);
        this.proof = proof;
        this.hash = hash;
        this.node_address = node_address;
    }
    // setRule
    set _rule(rule) {
        this.rule = rule;
    }
    get _hash() {
        return this.hash;
    }
    get _height() {
        return this.height;
    }
    get _node_address() {
        return this.node_address;
    }
    set _node_address(node_address) {
        this.node_address = node_address;
    }
    get _all_transaction_info() {
        return this.txs.map((tx) => tx);
    }
    push_transaction(tx_hash) {
        this.txs.push(tx_hash);
    }
    generate_hash(last_hash) {
        let hash;
        let invalid = true;
        let proof = 0;
        while (invalid) {
            const random_string = last_hash + proof;
            hash = crypto_js_1.default.SHA256(random_string).toString();
            if (this.is_valid_hash(hash)) {
                invalid = false;
                this.proof = proof;
            }
            else
                proof += 1;
        }
        return { hash, proof };
    }
    is_valid_hash(hash) {
        if (hash) {
            if (hash.substr(0, 1) == '0')
                return true;
        }
        return false;
    }
    get _info() {
        return {
            height: this.height,
            rule: this.rule,
            create_at: this.create_at,
            proof: this.proof,
            hash: this.hash,
            last_hash: this.last_hash,
            txs: this._all_transaction_info,
            node_address: this.node_address,
        };
    }
}
exports.default = Block;
