const bip39 = require('bip39')
import {
    add_wallet,
    get_account,
    get_last_block,
    get_wallet_detail,
} from '../db'
import { total } from '../db/base'
import { StoreSymbol } from '../enums'
import { AccountType } from '../enums/type'
import { BlockInfo } from '../typings/info'
import { address } from '../utils'
import Wallet from './wallet'

export default class BlockChain {
    constructor() {}

    async _total_tx() {
        return await total(StoreSymbol.txs)
    }

    async _total_nodes() {
        return await total(StoreSymbol.nodes)
    }

    async _total_account() {
        return await total(StoreSymbol.accounts)
    }

    async get_total_block() {
        return await total(StoreSymbol.blocks)
    }

    async get_last_block() {
        return await get_last_block()
    }

    async register_wallet(password: string, seed: string, name: string) {
        const wallet: Wallet = new Wallet(password, seed, address(128), name)
        return await add_wallet(wallet._info, password)
    }

    async create_account(
        wallet_address: string,
        type?: AccountType,
        name?: string
    ) {
        return
    }
    
    async get_wallet_detail(address: string, private_key: string) {
        return await get_wallet_detail(address, private_key)
    }

    async get_account_detail(address: string, private_key: string) {
        return await get_account(address, private_key)
    }

    async create_wallet(password: string, seed: string, name?: string) {}
    async get_transaction_detail(address: string) {}
    async register_node(
        address: string,
        port: number,
        name: string,
        private_key?: string
    ) {
        return
    }

    async add_block(block_info: BlockInfo) {
        return
    }
    async compare_transaction(len: number) {}
}
