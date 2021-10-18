import { AccountInfo } from '..'
import { AccountType, CoinUnit } from '../enums/type'
import { address, Address } from '../utils/address'

export default class Account {
    private id: string
    private name: string
    private address: Address = address(64)
    private txs_hash: string[] = []
    private monster_hash: string[] = []
    private coin: Record<CoinUnit, number> = {
        [CoinUnit.Monster]: 0,
        [CoinUnit.DgCoin]: 0,
        [CoinUnit.Dollar]: 0,
    }
    private type: AccountType
    private create_at: number

    constructor(id: string, name: string, type: AccountType) {
        this.id = id
        this.name = name
        this.type = type
        this.create_at = new Date().getTime()
    }

    set _address(address: Address) {
        this.address = address
    }

    get _address() {
        return this.address
    }

    get _id() {
        return this.id
    }

    set _id(id: string) {
        this.id = id
    }

    get _create_at() {
        return this.create_at
    }

    set _name(name: string) {
        this.name = name
    }

    get _name() {
        return this.name
    }

    get _monster_hash() {
        return this.monster_hash
    }

    set _monster_hash(monster_hash: string[]) {
        this.monster_hash = monster_hash
    }

    get _type(): AccountType {
        return this.type
    }

    set _type(type: AccountType) {
        this.type = type
    }

    get _coin() {
        return this.coin
    }

    get _txs_hash() {
        return this.txs_hash
    }

    push_coin(unit: CoinUnit, value: number) {
        this.coin[unit] = value
    }

    add_transaction(hash: string) {
        this.txs_hash.push(hash)
    }

    get _info(): AccountInfo {
        return {
            id: this._id,
            name: this._name,
            address: this._address,
            txs_hash: this._txs_hash,
            monster_hash: this._monster_hash,
            coin: this._coin,
            type: this._type,
            create_at: this._create_at,
        }
    }
}
