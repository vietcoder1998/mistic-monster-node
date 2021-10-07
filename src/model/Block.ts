import crypto from 'crypto-js'
import Monster from './Monster'

export default class Block {
    rule = 3
    isMining = true
    timeStamp = 0
    createdDate: number
    lastHash: string
    hash: string
    data: string

    constructor(lastHash: string, data: string, rule?: number) {
        this.createdDate = new Date().getDate()
        this.lastHash = lastHash
        this.hash = this.genHash()
        this.data = data

        if (rule) {
            this.rule = rule
        }
    }

    // generate next Hash
    genHash(): any {
        const availableString: string =
            this.lastHash +
            String(this.createdDate) +
            String(Math.floor(Math.random() + 10000))

        const hash = crypto.AES.encrypt(
            availableString,
            'axies_copy'
        ).toString()

        console.log(hash)
        if (this.isValidHash(hash)) {
            this.isMining = false
            return hash
        }
    }

    // setRule
    setRule(rule: number) {
        this.rule = rule
    }

    // check rule of block
    isValidHash(hash: string) {
        if (hash) {
            let count = 0
            for (let i = 0; i < hash.length - 1; i++) {
                if (hash[i] === '0') {
                    count += 1
                }
            }

            if (count === this.rule) {
                return true
            }
        }

        return false
    }
}
