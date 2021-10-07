import crypto from 'crypto-js'

export default class Block {
    rule = 3
    isMining = true
    timeStamp = 0
    createdDate: number
    lastHash: string
    hash?: string
    data: string

    constructor(lastHash: string, data: string, rule?: number) {
        this.createdDate = new Date().getDate()
        this.lastHash = lastHash
        this.data = data
        if (rule) {
            this.rule = rule
        }
        this.hash = this.genHash()
    }

    // generate stri Hash
    genHash() {
        let hash
        console.log('mining ...', this.rule)
        while (1) {
            const availableString: string =
                this.lastHash + String(Math.floor(Math.random() * 1000000))

            hash = crypto.AES.encrypt(availableString, 'axies_copy').toString()

            if (this.isValidHash(hash)) {
                return hash
            }
        }

        return hash
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
