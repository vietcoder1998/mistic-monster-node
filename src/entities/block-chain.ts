const bip39 = require('bip39')
import faker from 'faker'
import { get_node_len, get_tx_detail } from '../db'
import { total } from '../db/base'
import { StoreSymbol } from '../enums'
import { AccountType } from '../enums/type'
import { BlockInfo, NodeInfo, TransactionInfo } from '../typings/info'
import { MonsterShortInfo } from '../typings/monster'
import { Address } from '../utils/address'
import { generate_stats } from '../utils/generate'
import Account from './account'
import Monster from './monster'
import MMCNode from './node'
import Wallet from './wallet'

export default class BlockChain {
    private wallets: Record<string, Wallet> = {}
    private accounts: Record<string, Account> = {}
    private monsters: Monster[] = []
    private nodes: Record<string, NodeInfo> = {}
    private txs: TransactionInfo[] = []
    private name: string
    private blocks: BlockInfo[] = []

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

    get _accounts() {
        return this.accounts
    }

    get _total_block() {
        return this.blocks.length
    }

    get _last_block() {
        return this.blocks[this.blocks.length - 1]
    }

    on_receiver_new_block(block: BlockInfo) {
        if (block.id > this._last_block.id) {
            this.blocks.push(block)
        }
    }

    query(page?: number, size?: number) {
        try {
            const start = page | 0
            const end = (start === 0 ? 1 : start) * (size | 10)
            return this.blocks.filter(
                (v: BlockInfo, i: number) => start <= i && i < end
            )
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    register(password: string, seed: string) {
        try {
            const wallet: Wallet = this.create_wallet(password, seed)
            const account: Account = this.create_account(
                wallet._address,
                AccountType.USER
            )

            wallet.push_account(account._address)
            Object.assign(this.wallets, {
                [String(wallet._address)]: wallet,
            })

            return wallet
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    create_account(walletId: string, type?: AccountType, name?: string) {
        try {
            const account = new Account(walletId, name, type)
            this.accounts = { ...this.accounts, [account._address]: account }

            return account
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    get_wallet_detail(address?: string): Wallet {
        return this.wallets[address]
    }

    get_account_detail(address: string) {
        return this.accounts[address]
    }

    create_wallet(password: string, seed: string, name?: string) {
        try {
            const create_at = new Date().getTime()
            const address = bip39
                .mnemonicToSeedSync(seed + create_at)
                .toString('hex')
            const wallet: Wallet = new Wallet(password, seed, address, name)

            Object.assign(this.wallets, { [address]: wallet })
            return wallet
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async get_transaction_detail(address: string) {
        return await get_tx_detail(address)
    }

    register_node(
        address: string,
        port: number,
        name: string,
        private_key?: string
    ) {
        try {
            const mmc_node = new MMCNode(
                this.get_object_size(this.nodes),
                address,
                port,
                name,
                private_key
            )

            this.nodes = { ...this.nodes, [mmc_node._id]: mmc_node }

            return {
                msg: 'success',
                code: '1',
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    add_block(block_info: BlockInfo) {
        try {
            if (!this._last_block || this._last_block.id < block_info.id) {
                this.blocks.push(block_info)
                return this._last_block
            }

            return {}
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    compare_transaction(len: number) {
        try {
            return Number(len >= this.txs.length)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    get_object_size(obj: Object) {
        try {
            return Object.keys(obj).length
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
