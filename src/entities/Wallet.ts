import Account from './account'

class Wallet {
    private address: string
    private password: string
    private seed: string
    private accounts: string[] = []
    private transaction_hash: string[] = []
    public create_at: number

    constructor(password: string, seed: string, address: string) {
        this.address = address
        this.password = password
        this.seed = seed
        this.create_at = new Date().getTime()
    }

    get _seed() {
        return this.seed
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

    get _transaction_hash() {
        return this.transaction_hash
    }

    set _transaction_hash(transaction_hash: string[]) {
        this.transaction_hash = transaction_hash
    }

    push_account(address: string) {
        this.accounts.push(address)
    }

    push_transaction_hash(transaction_hash: string) {
        this.accounts.push(transaction_hash)
    }

    get _info() {
        return {
            address: this._address,
            seed: this._seed,
            accounts: this._accounts,
            transaction_hash: this._transaction_hash,
            create_at: this.create_at,
        }
    }
}

export default Wallet
