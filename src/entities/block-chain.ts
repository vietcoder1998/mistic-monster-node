const bip39 = require('bip39')
import faker from 'faker'
import { AccountType, CoinUnit } from '../enums/type'
import { address, Address } from '../utils/address'
import { generate_stats } from '../utils/generate'
import { BlockInfo, NodeInfo, TransactionInfo } from '../typings/info'
import { MonsterShortInfo } from '../typings/monster'
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
    private create_at: number = new Date().getDate()
    private author: string = 'abc'
    private blocks: BlockInfo[] = []

    constructor() {}

    get _total_transaction(): number {
        return this.txs.length
    }

    get _total_nodes(): number {
        return this.get_object_size(this._nodes)
    }

    get _total_account(): number {
        return this.get_object_size(this._accounts)
    }

    get _nodes(): Record<number, NodeInfo> {
        return this.nodes
    }

    get _create_date() {
        return this.create_at
    }

    get _author(): string {
        return this.author
    }

    get _name(): string {
        return this.name
    }

    get _last_transaction(): TransactionInfo {
        return this.txs[this.txs.length - 1]
    }

    get _txs() {
        return this.txs
    }

    get _last_account(): Account {
        const last_account =
            Object.keys(this.accounts).length > 0
                ? Object.keys(this.accounts).map(
                      (k: string) => this.accounts[k]
                  )[0]
                : undefined
        return last_account
    }

    get _wallets() {
        return this.wallets
    }

    get _monster() {
        return this.monsters.map((monster: Monster, i: number) => monster._info)
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

    generate_monster(
        from?: Address,
        to?: Address,
        monster1?: Monster,
        monster2?: Monster
    ) {
        try {
            const id = this.monsters.length
            const short_info_1: MonsterShortInfo = monster1
                ? new MonsterShortInfo(
                      id + 1,
                      monster1._name,
                      monster1._class,
                      monster1._level,
                      monster1._img,
                      monster1._gene
                  )
                : undefined

            const short_info_2: MonsterShortInfo = monster2
                ? new MonsterShortInfo(
                      id + 1,
                      monster2._name,
                      monster2._class,
                      monster2._level,
                      monster2._img,
                      monster2._gene
                  )
                : undefined

            const monster = new Monster(
                String(id + 1),
                faker.name.findName(),
                faker.image.imageUrl(),
                from,
                short_info_1 && short_info_2
                    ? [short_info_1, short_info_2]
                    : undefined,
                generate_stats(20, 10)
            )

            this.monsters.push(monster)
        } catch (error) {
            console.log('error in  generate monster')
            throw error
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

    create_wallet(password: string, seed: string) {
        try {
            const create_at = new Date().getTime()
            const address = bip39
                .mnemonicToSeedSync(seed + create_at)
                .toString('hex')
            const wallet: Wallet = new Wallet(password, seed, address)

            Object.assign(this.wallets, { [address]: wallet })
            return wallet
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    get_transaction_detail(hash: string) {
        return (
            this._txs.filter((tx: TransactionInfo) => tx.hash === hash) ||
            undefined
        )
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
