"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../enums/type");
const address_1 = require("../utils/address");
class Account {
    constructor(id, name, type) {
        this.address = (0, address_1.address)(64);
        this.transaction_hash = [];
        this.monster_hash = [];
        this.coin = {
            [type_1.CoinUnit.Monster]: 0,
            [type_1.CoinUnit.DgCoin]: 0,
            [type_1.CoinUnit.Dollar]: 0,
        };
        this.id = id;
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
    get _id() {
        return this.id;
    }
    set _id(id) {
        this.id = id;
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
    add_transaction(hash) {
        this.transaction_hash.push(hash);
    }
}
exports.default = Account;
