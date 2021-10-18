"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bip39 = require('bip39');
const db_1 = require("../db");
const base_1 = require("../db/base");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const wallet_1 = __importDefault(require("./wallet"));
class BlockChain {
    constructor() { }
    async _total_tx() {
        return await (0, base_1.total)(enums_1.StoreSymbol.txs);
    }
    async _total_nodes() {
        return await (0, base_1.total)(enums_1.StoreSymbol.nodes);
    }
    async _total_account() {
        return await (0, base_1.total)(enums_1.StoreSymbol.accounts);
    }
    async get_total_block() {
        return await (0, base_1.total)(enums_1.StoreSymbol.blocks);
    }
    async get_last_block() {
        return await (0, db_1.get_last_block)();
    }
    async register_wallet(password, seed, name) {
        const wallet = new wallet_1.default(password, seed, (0, utils_1.address)(128), name);
        return await (0, db_1.add_wallet)(wallet._info, password);
    }
    async create_account(wallet_address, type, name) {
        return;
    }
    async get_wallet_detail(address, private_key) {
        return await (0, db_1.get_wallet_detail)(address, private_key);
    }
    async get_account_detail(address) { }
    async create_wallet(password, seed, name) { }
    async get_transaction_detail(address) { }
    async register_node(address, port, name, private_key) {
        return;
    }
    async add_block(block_info) {
        return;
    }
    async compare_transaction(len) { }
}
exports.default = BlockChain;
