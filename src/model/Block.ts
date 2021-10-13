import crypto from 'crypto-js'

export default class Block {
    rule = 3
    time_stamp = 0
    create_at: number
    last_hash: string
    hash?: string
    data: string

    constructor(last_hash: string, data: string) {
        this.data = data
        this.last_hash = last_hash.substring(0, -6)
        this.hash = this.gen_hash()
    }

    // generate hash
    gen_hash() {
        let hash
        let invalid = true
        while (invalid) {
            const availableString: string =
                this.last_hash +
                String(1000000 + Math.floor(Math.random() * 8999999))

            hash = crypto.AES.encrypt(
                availableString.substring(0, -6),
                'mistic_monster'
            ).toString()

            if (this.is_valid_hash(hash)) {
                invalid = false
            }
        }

        return hash
    }

    // setRule
    set _rule(rule: number) {
        this.rule = rule
    }

    // check rule of block
    is_valid_hash(hash: string) {
        if (hash) {
            let count = 0
            for (let i = 0; i < hash.length - 1; i++) {
                if (hash[i] === '0') {
                    count += 1
                }
            }

            if (count === this.rule) {
                this.time_stamp = count
                return true
            }
        }

        return false
    }
}
