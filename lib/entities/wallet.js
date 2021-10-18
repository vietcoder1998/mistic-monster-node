"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wallet {
    constructor(password, seed, address, name) {
        this.accounts = [];
        this.txs_hash = [];
        this.address = address;
        this.password = password;
        this.seed = seed;
        this.create_at = new Date().getTime();
        this.name = name;
    }
    get _seed() {
        return this.seed;
    }
    get _name() {
        return this.name;
    }
    get _address() {
        return this.address;
    }
    get _pass() {
        return this.password;
    }
    get _accounts() {
        return this.accounts;
    }
    set _accounts(accounts) {
        this.accounts = accounts;
    }
    get _txs_hash() {
        return this.txs_hash;
    }
    set _txs_hash(txs_hash) {
        this.txs_hash = txs_hash;
    }
    push_account(address) {
        this.accounts.push(address);
    }
    push_txs_hash(txs_hash) {
        this.accounts.push(txs_hash);
    }
    get _info() {
        return {
            address: this._address,
            accounts: this._accounts,
            txs_hash: this._txs_hash,
            create_at: this.create_at,
            name: this._name,
        };
    }
}
exports.default = Wallet;
