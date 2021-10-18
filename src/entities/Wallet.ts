import { WalletInfo } from '..'

class Wallet {
    private address: string
    private password: string
    private seed: string
    private accounts: string[] = []
    private txs_hash: string[] = []
    public create_at: number
    private name: string

    constructor(password: string, seed: string, address: string, name: string) {
        this.address = address
        this.password = password
        this.seed = seed
        this.create_at = new Date().getTime()
        this.name = name
    }

    get _seed() {
        return this.seed
    }

    get _name() {
        return this.name
    }
    get _address() {
        return this.address
    }

    get _pass() {
        return this.password
    }

    get _accounts() {
        return this.accounts
    }

    set _accounts(accounts: string[]) {
        this.accounts = accounts
    }

    get _txs_hash() {
        return this.txs_hash
    }

    set _txs_hash(txs_hash: string[]) {
        this.txs_hash = txs_hash
    }

    push_account(address: string) {
        this.accounts.push(address)
    }

    push_txs_hash(txs_hash: string) {
        this.accounts.push(txs_hash)
    }

    get _info(): WalletInfo {
        return {
            address: this._address,
            accounts: this._accounts,
            txs_hash: this._txs_hash,
            create_at: this.create_at,
            name: this._name,
        }
    }
}

export default Wallet
