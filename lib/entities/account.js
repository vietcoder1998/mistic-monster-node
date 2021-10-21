"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../enums/type");
class Account {
    constructor(address, name, type) {
        this.txs = [];
        this.monster_hash = [];
        this.coin = {
            [type_1.CoinUnit.Monster]: 0,
            [type_1.CoinUnit.DgCoin]: 0,
            [type_1.CoinUnit.Dollar]: 0,
        };
        this.address = address;
        this.name = name;
        this.type = type;
        this.create_at = new Date().getTime();
    }
    set _address(address) {
        this.address = address;
    }
    get _address() {
        return this.address;
    }
    get _create_at() {
        return this.create_at;
    }
    set _name(name) {
        this.name = name;
    }
    get _name() {
        return this.name;
    }
    get _monster_hash() {
        return this.monster_hash;
    }
    set _monster_hash(monster_hash) {
        this.monster_hash = monster_hash;
    }
    get _type() {
        return this.type;
    }
    set _type(type) {
        this.type = type;
    }
    get _coin() {
        return this.coin;
    }
    push_coin(unit, value) {
        this.coin[unit] = value;
    }
    add_transaction(tx) {
        this.txs.push(tx);
    }
    get _info() {
        return {
            address: this._address,
            name: this._name,
            monster_hash: this._monster_hash,
            coin: this._coin,
            type: this._type,
            create_at: this._create_at,
        };
    }
    get _short_info() {
        return {
            name: this._name,
            address: this._address,
            coin: this._coin,
            txs: this.txs,
        };
    }
}
exports.default = Account;
