import faker from 'faker'
import { MonsterShortInfo } from './entity/monster'
import { BaseAddress } from './enums/address'
import { AccountType, CoinUnit, TransactionType } from './enums/type'
import { address, Address } from './interface/address'
import { generate_stats } from './interface/generate'
import Account from './model/Account'
import Blockchain from './model/BlockChain'
import Monster from './model/Monster'
import Transaction from './model/Transaction'
import Wallet from './model/Wallet'
const bip39 = require('bip39')
export default class TestNet {
    private block_chain: Blockchain = new Blockchain('transaction')
    private wallets: Record<string, Wallet> = {}
    private accounts: Record<string, Account> = {}
    private monsters: Monster[] = []

    constructor() {
        const baseAddress = bip39.mnemonicToSeedSync().toString('hex')
        const wallet = new Wallet(
            'root123456',
            bip39.generateMnemonic(),
            baseAddress
        )

        Object.assign(this.wallets, { [baseAddress]: wallet })
        Array(0, 1, 2).forEach((v: number) => {
            const bank: Account = new Account(
                String(v),
                faker.name.findName(),
                AccountType.BANKER
            )

            bank._address = address(64)
            bank.push_coin(CoinUnit.Monster, 10000)
            this.accounts = { ...this.accounts, [bank._address]: bank }
            this.wallets[baseAddress].push_account(bank._address)
        })

        for (let i = 0; i < 10; i++) {
            this.generate_monster(this._last_account._address)
        }
    }

    get _last_account(): Account {
        const last_account = Object.keys(this.accounts).map(
            (k: string) => this.accounts[k]
        )[0]
        return last_account
    }

    get _wallets() {
        return this.wallets
    }

    get _block_chain() {
        return this.block_chain
    }

    get _monster() {
        return this.monsters
    }

    get _accounts() {
        return this.accounts
    }

    // register user
    register(password: string, seed: string) {
        const wallet: Wallet = this.create_wallet(password, seed)
        const account: Account = this.create_account(
            wallet._address,
            AccountType.USER
        )

        wallet.push_account(account._address)
        this.wallets = { ...this.wallets, [String(wallet._address)]: wallet }

        return wallet
    }

    // create account
    create_account(walletId: string, type?: AccountType, name?: string) {
        const address = bip39
            .mnemonicToSeedSync(walletId + type)
            .toString('hex')
        const account = new Account(walletId, name, type)
        this.accounts = { ...this.accounts, [account._address]: account }
        return account
    }

    // get wallet detail6888980bb
    get_wallet_detail(address?: string): Wallet {
        return this.wallets[address]
    }

    // get account detail
    get_account_detail(address: string) {
        return this.accounts[address]
    }

    // register wallet
    create_wallet(password: string, seed: string) {
        const create_at = new Date().getTime()
        const address = bip39
            .mnemonicToSeedSync(seed + create_at)
            .toString('hex')
        const wallet: Wallet = new Wallet(password, seed, address)

        Object.assign(this.wallets, { [address]: wallet })
        return wallet
    }

    get_transaction_detail(hash: string) {
        return this.block_chain._transactions.filter((trans: Transaction) =>
            trans.hash.includes(hash)
        )
    }

    // create monster transaction
    generate_monster(
        from?: Address,
        to?: Address,
        monster1?: Monster,
        monster2?: Monster
    ) {
        const index = this.monsters.length
        const short_info_1: MonsterShortInfo = monster1
            ? new MonsterShortInfo(
                  index + 1,
                  monster1.name,
                  monster1.class,
                  monster1.level,
                  monster1.img,
                  monster1.gene
              )
            : undefined

        const short_info_2: MonsterShortInfo = monster2
            ? new MonsterShortInfo(
                  index + 1,
                  monster1.name,
                  monster1.class,
                  monster1.level,
                  monster1.img,
                  monster1.gene
              )
            : undefined

        const monster = new Monster(
            String(index + 1),
            faker.name.findName(),
            faker.image.imageUrl(),
            from || this._accounts[0]._address,
            short_info_1 && short_info_2
                ? [short_info_1, short_info_2]
                : undefined,
            generate_stats(20, 10)
        )

        this.monsters.push(monster)
        this.block_chain.append(
            JSON.stringify(
                Buffer.from(JSON.stringify(monster)).toString('base64')
            ),
            from,
            to,
            monster.value,
            CoinUnit.Monster,
            TransactionType.Transfer
        )
    }
}
