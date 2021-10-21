"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../utils/address");
const crypto_js_1 = __importDefault(require("crypto-js"));
class Transaction {
    constructor(block_id, from, to, value, type, unit, gas, gas_price, payer, data) {
        this.status = 'call';
        this.gas = 0.00001;
        this.block_id = block_id;
        this.value = value;
        this.from = from;
        this.to = to;
        this.unit = unit;
        this.type = type;
        this.data = data;
        this.gas_price = gas_price;
        this.create_at = new Date().getTime();
        this.hash = this.gen_hash();
        this.gas = gas;
        this.address = (0, address_1.m_address)(64);
        this.payer = payer;
    }
    get _type() {
        return this.type;
    }
    gen_hash() {
        const info = this._info;
        delete info['hash'];
        const zip = JSON.stringify(info);
        const hash = crypto_js_1.default.SHA256(zip).toString();
        return hash;
    }
    get _payer() {
        return this.payer;
    }
    set _payer(payer) {
        this.payer = payer;
    }
    get _address() {
        return this.address;
    }
    set _address(address) {
        this.address = address;
    }
    get _from() {
        return this.from;
    }
    get _to() {
        return this.to;
    }
    get _value() {
        return this.value;
    }
    get _unit() {
        return this.unit;
    }
    get _data() {
        return this.data;
    }
    get _hash() {
        return this.hash;
    }
    get _create_at() {
        return this.create_at;
    }
    get _status() {
        return this.status;
    }
    get _block_id() {
        return this.block_id;
    }
    set _status(status) {
        this.status = status;
    }
    get _gas() {
        return this.gas;
    }
    set _gas(gas) {
        this.gas = gas;
    }
    get _gas_price() {
        return this.gas_price;
    }
    get _info() {
        return {
            address: this._address,
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
            payer: this._payer,
        };
    }
}
exports.default = Transaction;
