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
const request_promise_native_1 = __importDefault(require("request-promise-native"));
class BlockChain {
    constructor() {
        this.provider = 'http://localhost:8093';
    }
    async _total_tx() {
        return await (0, db_1.total)(enums_1.StoreSymbol.txs);
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
        return await (0, block_1.get_block_detail)(String(height));
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
    // mine_block
    async mine_block(node_address, address) {
        var _a, _b;
        const last_block = (_a = (await (0, db_1.take_last)(enums_1.StoreSymbol.blocks))) === null || _a === void 0 ? void 0 : _a.data;
        const sender = await (0, account_1.is_exist_account)(address);
        if (!sender) {
            return {
                code: enums_1.Code.not_found,
                msg: 'sender is required',
            };
        }
        const node = (_b = (await (0, node_1.get_node_detail)(node_address))) === null || _b === void 0 ? void 0 : _b.data;
        if (!node && this.provider) {
            return {
                code: enums_1.Code.not_found,
                msg: 'node is required',
            };
        }
        const block = new _1.Block(last_block ? Number(last_block.height) + 1 : 0, node_address, (last_block === null || last_block === void 0 ? void 0 : last_block.hash) || '');
        if (!last_block || block._info.height > last_block.height) {
            const tx = new transaction_2.default(block._height, '0', address, 1, type_1.TransactionType.Mining, type_1.CoinUnit.Monster, 0, '1000', 'mining', '0');
            block.push_transaction(tx._address);
            const resolve = await (0, request_promise_native_1.default)(`http://${node.address}/node/resolve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application-json',
                },
                body: String(block._info),
            });
            if (resolve) {
                const result = await this.add_block(block._info);
                const result1 = await (0, transaction_1.add_tx)(tx._info);
                const result2 = await (0, account_1.add_tx_to_account)(tx._to, tx._address);
                return Object.assign(Object.assign(Object.assign(Object.assign({}, result), result1), result2), { block,
                    tx });
            }
            else {
                return {
                    code: enums_1.Code.error,
                };
            }
        }
        return {
            code: enums_1.Code.error_block,
            msg: 'block is lower than error block',
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
        var _a, _b;
        const last_block = (_a = (await (0, block_1.get_last_block)())) === null || _a === void 0 ? void 0 : _a.data;
        const node = (_b = (await (0, node_1.get_node_detail)(address))) === null || _b === void 0 ? void 0 : _b.data;
        if (!node) {
            return { code: enums_1.Code.not_found, msg: enums_1.Message.not_found };
        }
        if (!last_block && block.height > last_block.height) {
            const res = await this.add_block(block);
            if (res) {
                return {
                    code: enums_1.Code.success,
                };
            }
        }
        return {
            code: enums_1.Code.error_block,
            msg: enums_1.Message.block_err,
        };
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
    async get_price_of_account(address) {
        return await (0, account_1.get_price_of_account)(address);
    }
}
exports.default = BlockChain;
