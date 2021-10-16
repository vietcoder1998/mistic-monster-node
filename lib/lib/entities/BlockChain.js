"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bip39 = require('bip39');
const faker_1 = __importDefault(require("faker"));
const type_1 = require("../enums/type");
const address_1 = require("../utils/address");
const generate_1 = require("../utils/generate");
const monster_1 = require("../typings/monster");
const Account_1 = __importDefault(require("./Account"));
const Monster_1 = __importDefault(require("./Monster"));
const Node_1 = __importDefault(require("./Node"));
const Wallet_1 = __importDefault(require("./Wallet"));
class BlockChain {
    constructor() {
        this.wallets = {};
        this.accounts = {};
        this.monsters = [];
        this.nodes = {};
        this.txs = [];
        this.create_at = new Date().getDate();
        this.author = 'tran_duy_viet';
        this.blocks = [];
        const baseAddress = (0, address_1.address)(64);
        const wallet = new Wallet_1.default('root123456', bip39.generateMnemonic(), baseAddress);
        Object.assign(this.wallets, { [baseAddress]: wallet });
        Array(0, 1, 2).forEach((v) => {
            const bank = new Account_1.default(String(v), faker_1.default.name.findName(), type_1.AccountType.BANKER);
            bank._address = (0, address_1.address)(64);
            bank.push_coin(type_1.CoinUnit.Monster, 10000);
            this.accounts = Object.assign(Object.assign({}, this.accounts), { [bank._address]: bank });
            this.wallets[baseAddress].push_account(bank._address);
        });
        console.log(this.accounts);
        for (let i = 0; i < 10; i++) {
            this.generate_monster(this._last_account._address);
        }
        const node1 = {
            id: 1,
            address: 'localhost',
            port: 8093,
            name: 'node_1',
            transaction_length: 0,
        };
        const node2 = {
            id: 2,
            address: 'localhost',
            port: 8093,
            name: 'node_1',
            transaction_length: 0,
        };
        this.nodes = { [node1.id]: node1, [node2.id]: node2 };
    }
    get _total_transaction() {
        return this.txs.length;
    }
    get _total_nodes() {
        return this.get_object_size(this._nodes);
    }
    get _total_account() {
        return this.get_object_size(this._accounts);
    }
    get _nodes() {
        return this.nodes;
    }
    get _create_date() {
        return this.create_at;
    }
    get _author() {
        return this.author;
    }
    get _name() {
        return this.name;
    }
    get _last_transaction() {
        return this.txs[this.txs.length - 1];
    }
    get _txs() {
        return this.txs;
    }
    get _last_account() {
        const last_account = Object.keys(this.accounts).map((k) => this.accounts[k])[0];
        return last_account;
    }
    get _wallets() {
        return this.wallets;
    }
    get _monster() {
        return this.monsters.map((monster, i) => monster._info);
    }
    get _accounts() {
        return this.accounts;
    }
    get _total_block() {
        return this.blocks.length;
    }
    get _last_block() {
        return this.blocks[this.blocks.length - 1];
    }
    on_receiver_new_block(block) {
        if (block.id > this._last_block.id) {
            this.blocks.push(block);
            block.txs.forEach((tx) => tx && this.txs.push(tx));
        }
    }
    generate_monster(from, to, monster1, monster2) {
        const id = this.monsters.length;
        const short_info_1 = monster1
            ? new monster_1.MonsterShortInfo(id + 1, monster1._name, monster1._class, monster1._level, monster1._img, monster1._gene)
            : undefined;
        const short_info_2 = monster2
            ? new monster_1.MonsterShortInfo(id + 1, monster2._name, monster2._class, monster2._level, monster2._img, monster2._gene)
            : undefined;
        const monster = new Monster_1.default(String(id + 1), faker_1.default.name.findName(), faker_1.default.image.imageUrl(), from, short_info_1 && short_info_2
            ? [short_info_1, short_info_2]
            : undefined, (0, generate_1.generate_stats)(20, 10));
        this.monsters.push(monster);
    }
    query(page, size) {
        const start = page | 0;
        const end = (start === 0 ? 1 : start) * (size | 10);
        return this.blocks.filter((v, i) => start <= i && i < end);
    }
    register(password, seed) {
        const wallet = this.create_wallet(password, seed);
        const account = this.create_account(wallet._address, type_1.AccountType.USER);
        wallet.push_account(account._address);
        this.wallets = Object.assign(Object.assign({}, this.wallets), { [String(wallet._address)]: wallet });
        return wallet;
    }
    create_account(walletId, type, name) {
        const account = new Account_1.default(walletId, name, type);
        this.accounts = Object.assign(Object.assign({}, this.accounts), { [account._address]: account });
        return account;
    }
    get_wallet_detail(address) {
        return this.wallets[address];
    }
    get_account_detail(address) {
        return this.accounts[address];
    }
    create_wallet(password, seed) {
        const create_at = new Date().getTime();
        const address = bip39
            .mnemonicToSeedSync(seed + create_at)
            .toString('hex');
        const wallet = new Wallet_1.default(password, seed, address);
        Object.assign(this.wallets, { [address]: wallet });
        return wallet;
    }
    get_transaction_detail(hash) {
        return this._txs.filter((tx) => tx.hash === hash);
    }
    register_node(address, port, name, private_key) {
        const mmc_node = new Node_1.default(this.get_object_size(this.nodes), address, port, name, private_key);
        this.nodes = Object.assign(Object.assign({}, this.nodes), { [mmc_node._id]: mmc_node });
        return 'Success';
    }
    add_block(block_info) {
        if (!this._last_block || this._last_block.id < block_info.id) {
            this.blocks.push(block_info);
            return this._last_block;
        }
        return {};
    }
    compare_transaction(len) {
        console.log('length is', len);
        return Number(len >= this.txs.length);
    }
    get_object_size(obj) {
        return Object.keys(obj).length;
    }
}
exports.default = BlockChain;
