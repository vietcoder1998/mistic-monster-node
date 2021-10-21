"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wallet {
    constructor(password, address, name, create_at) {
        this.accounts = [];
        this.txs_hash = [];
        this.address = address;
        this.password = password;
        this.create_at = create_at;
        this.name = name;
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
    push_account(info) {
        this.accounts.push(info);
    }
    push_txs(tx_hash, address) {
        const account = this.accounts.filter((acc) => acc.address === address)[0];
        if (account) {
            account.txs.push(tx_hash);
            this.accounts.push(account);
        }
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
