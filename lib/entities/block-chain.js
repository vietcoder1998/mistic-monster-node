"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
const db_1 = require("../db");
const account_1 = require("../db/account");
const block_1 = require("../db/block");
const node_1 = require("../db/node");
const transaction_1 = require("../db/transaction");
const wallet_1 = require("../db/wallet");
const enums_1 = require("../enums");
const type_1 = require("../enums/type");
const utils_1 = require("../utils");
const generate_1 = require("../utils/generate");
const transaction_2 = __importDefault(require("./transaction"));
const wallet_2 = __importDefault(require("./wallet"));
class BlockChain {
    constructor() { }
    async _total_tx() {
        return await (0, db_1.total)(enums_1.StoreSymbol.txs);
    }
    async _total_nodes() {
        return await (0, db_1.total)(enums_1.StoreSymbol.nodes);
    }
    async _total_account() {
        return await (0, db_1.total)(enums_1.StoreSymbol.accounts);
    }
    async get_total_block() {
        return await (0, db_1.total)(enums_1.StoreSymbol.blocks);
    }
    async get_last_block() {
        return await (0, block_1.get_last_block)();
    }
    async get_block_detail(height) {
        const data = await (0, block_1.get_block_detail)(String(height));
        console.log('🚀 ~ file: block-chain.ts ~ line 52 ~ BlockChain ~ get_block ~ data', data);
        return data;
    }
    async get_tx_detail(hash) {
        return await (0, transaction_1.get_tx_detail)(hash);
    }
    async register_wallet(password, name) {
        const create_at = new Date().getTime();
        const { address, seed, private_key } = (0, generate_1.generate_public_private_key)(password);
        const wallet = new wallet_2.default(password, address, name, create_at);
        const result_2 = await (0, account_1.add_account)(wallet._address);
        if (result_2.code < 0) {
            return result_2;
        }
        else {
            const result = await (0, wallet_1.add_wallet)(wallet._info, private_key);
            return Object.assign({ seed,
                private_key }, result);
        }
    }
    compare_hash(hash, proof, last_hash) {
        if (CryptoJS.SHA256(hash + proof).toString() === last_hash) {
            return true;
        }
        return false;
    }
    async mine_block(node_address, address) {
        var _a;
        const last_block = (_a = (await (0, db_1.take_last)(enums_1.StoreSymbol.blocks))) === null || _a === void 0 ? void 0 : _a.data;
        const sender = await (0, account_1.is_exist_account)(address);
        console.log('sender ->', sender);
        if (!sender) {
            return {
                code: enums_1.Code.not_found,
                msg: 'sender is required',
            };
        }
        const block = new _1.Block(last_block ? Number(last_block.height) + 1 : 0, node_address, (last_block === null || last_block === void 0 ? void 0 : last_block.hash) || '');
        if (block._info.proof > last_block.proof) {
            const tx = new transaction_2.default(block._height, '0', address, 1, type_1.TransactionType.Mining, type_1.CoinUnit.Monster, 0, '1000', 'mining', '0');
            block.push_transaction(tx._address);
            const add_block_result = await this.add_block(block._info);
            const add_tx_result = await (0, account_1.add_tx_to_account)(tx._hash, tx._to);
            return Object.assign(Object.assign(Object.assign({}, add_block_result), add_tx_result), { block,
                tx });
        }
        return {
            code: enums_1.Code.error_block,
            msg: 'block is lower than error block'
        };
    }
    async validate_block(block_info, address, private_key) {
        var _a;
        const last_block = (_a = (await (0, db_1.take_last)(enums_1.StoreSymbol.blocks))) === null || _a === void 0 ? void 0 : _a.data;
        if (last_block &&
            block_info &&
            this.compare_hash(block_info.hash, block_info.proof, last_block.hash)) {
            return {
                code: enums_1.Code.success,
            };
        }
        return {
            code: enums_1.Code.error_block,
        };
    }
    async add_block(block) {
        return await (0, block_1.push_block)(block);
    }
    async get_list_block(page, size) {
        return await (0, block_1.get_list_block)(page, size);
    }
    async get_list_txs(page, size) {
        return await (0, transaction_1.get_list_txs)(page, size);
    }
    async create_account(address, name, private_key) {
        const account = new __1.Account((0, utils_1.m_address)(64), name, type_1.AccountType.USER);
        return await (0, wallet_1.add_account_to_wallet)(account._short_info, address, private_key);
    }
    async resolve_block(block, address) {
        const last_block = (await (0, block_1.get_last_block)()).data;
        const node = (await (0, node_1.get_node_detail)(address)).data;
        if (!node) {
            return { code: enums_1.Code.not_found, msg: enums_1.Message.not_found };
        }
        else if (!last_block && block.proof > last_block.proof) {
            return await this.add_block(block);
        }
        else {
            return {
                code: enums_1.Code.error_block,
                msg: enums_1.Message.block_err,
            };
        }
    }
    async get_wallet_detail(address, private_key) {
        return await (0, wallet_1.get_wallet_detail)(address, private_key);
    }
    async create_tx(tx) {
        return await (0, transaction_1.add_tx)(tx);
    }
    async register_node(node) {
        return await (0, node_1.register_node)(node);
    }
    async add_node(node) {
        return await (0, node_1.register_node)(node);
    }
}
exports.default = BlockChain;
