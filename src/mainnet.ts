import redis from 'redis'
import { promisify } from 'util'
import { RedisStore } from './enums/redis'
import { BaseWallet, CoinUnit, TransactionType, WalletType } from './enums/type'
import Blockchain from './model/BlockChain'
import Transaction from './model/Transaction'
import Wallet from './model/Wallet'

// init client functions
const client = redis.createClient()
const getAsync = promisify(client.GET).bind(client)
const hsetAsync = promisify(client.HSET).bind(client)
const hgetAsync = promisify(client.HGET).bind(client)
const hgetAllAsync = promisify(client.HGETALL).bind(client)
const llenAsync = promisify(client.LLEN).bind(client)

export default class MainNet {
    monstersChain: Blockchain = new Blockchain('monster')
    trans: Blockchain = new Blockchain('transaction')

    /**
     *
     */
    constructor() {
        this.init()
    }

    async getAllTransaction() {
        const data = await hgetAsync(
            RedisStore.MisticMonsterChain,
            `${RedisStore.Transaction}`
        )
        console.log(data)
        return data
    }

    async registerWallet(name: string, pass: string) {
        const wallet = new Wallet(name, pass, BaseWallet.USER)

        if (name && name.length > 6 && pass && pass.length > 6) {
            const address = wallet.createAddress(WalletType.USER)
            const code = await hsetAsync([
                RedisStore.MisticMonsterChain,
                `${RedisStore.MMWallet}.${address}`,
                JSON.stringify(wallet),
            ])

            return {
                code,
                wallet,
            }
        } else return null
    }

    async getWallet(address: string) {
        const wallet = await hgetAsync(
            RedisStore.MisticMonsterChain,
            `${RedisStore.MMWallet}.${address}`
        )
        console.log('opp _____')
        console.log('wallet founded is', wallet)
        if (wallet) {
            return JSON.parse(wallet)
        } else {
            return null
        }
    }

    async getAllWallet() {
        const hWallet: Record<string, string> = await hgetAllAsync(
            RedisStore.MisticMonsterChain
        )
        let wallets: Record<string, Wallet> = {}
        Object.keys(hWallet).forEach((k: string) => {
            const wl: Wallet = JSON.parse(hWallet[k])
            Object.assign(wallets, {
                [k.split(RedisStore.MMWallet + '.')[1]]: wl,
            })
        })
    }

    async addTransaction(transaction: Transaction) {
        const trans = await hgetAsync(
            RedisStore.MisticMonsterChain,
            RedisStore.Transaction
        )
    }

    async createTransaction(from: string, to: string, value: number, data: any) {
        this.trans.appendNew(
            data,
            from,
            to,
            value,
            CoinUnit.DgCoin,
            TransactionType.Transfer,
            3
        )

        // get send wallet
        const sendWallet: Wallet = JSON.parse(
            await hgetAsync(
                RedisStore.MisticMonsterChain,
                `${RedisStore.MMWallet}.${from}`
            )
        )

        // get receiver wallet
        const receivedWallet: Wallet = JSON.parse(
            await hgetAsync(
                RedisStore.MisticMonsterChain,
                `${RedisStore.MMWallet}.${from}`
            )
        )

        sendWallet.value -= Number(value)
        receivedWallet.value += Number(value)
        const lastTransaction = this.trans.getLastTransaction()
        return lastTransaction
    }

    async init() {
        // remove db
        client.FLUSHALL((err, rp) => {
            if (err) {
                console.log(err)
            } else console.log('remove ')
        })

        // create base banking
        const baseAddress = BaseWallet.BANKER + 0
        let baseList: string[] = []
        Array([0, 1, 2]).forEach((i) => {
            baseList.push(baseAddress + i)
        })

        baseList.forEach((address: string, index: number) => {
            const bank = new Wallet(
                'tran_duy_viet',
                'yes, is me',
                address,
                10000,
                WalletType.BANKER,
                null
            )

            client.HSET(
                RedisStore.MisticMonsterChain,
                `${RedisStore.MMWallet}.${address}`,
                JSON.stringify(bank),
                (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('success ->', bank)
                    }
                }
            )

            client.HGET(
                // find redis mmc_chain
                RedisStore.MisticMonsterChain,

                // find [wallet].[address]
                `${[RedisStore.MMWallet]}.${address}`,
                (err, bank) => {
                    console.log('bank is ->', bank)
                }
            )
        })

        // create base monster list
        client.HSET(
            RedisStore.MisticMonsterChain,
            // create none data array
            RedisStore.Transaction,
            (err, data) => {
                console.log('transaction is ->', data)
            }
        )

        // create base transaction
    }
}
