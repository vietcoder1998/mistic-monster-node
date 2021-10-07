import { BaseAddress } from '../enums/address'
import { WalletType } from '../enums/type'

/**
 *
 */
export default class Wallet {
    monsterHash: string[] = []
    value: number = 0
    address?: string = ''
    name: string = ''
    baseAddress: string = ''
    transactionHash: string[] = []
    type: WalletType
    createAt: string
    pass: string = ''

    constructor(
        name?: string,
        pass?: string,
        address?: string,
        value?: number,
        type?: WalletType,
        baseAddress?: string
    ) {
        if (address) {
            this.address = this.address
        }

        if (pass) {
            this.pass = pass
        }
        this.address = address
        this.value = value
        this.baseAddress = baseAddress
        if (name) {
            this.name = name
        }

        if (type) {
            this.type = type
        }
    }

    createAddress(type: WalletType): string {
        this.address =
            BaseAddress.Wallet + type + new Date().getTime() + this.makeId(12)
        return this.address
    }

    setPass(pass: string): void {
        this.pass = pass
    }

    addTransactionHash(hash: string) {
        this.transactionHash.push(hash)
    }

    changeName(name: string) {
        this.name = name
    }

    getAddress(): string {
        return this.address
    }

    makeId(length: number): string {
        var result = ''
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var charactersLength = characters.length

        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }
}
