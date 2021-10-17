import {
    Account,
    Code,
    encode,
    hgetallAsync,
    hgetAsync,
    hsetAsync,
    Message,
    Store,
} from '..'

export async function set_account(
    address: string,
    private_key: string,
    account: Account
) {
    try {
        const is_valid: boolean = await validate_account(address, private_key)
        if (is_valid) {
            const encrypt = CryptoJS.AES.encrypt(
                JSON.stringify(account),
                private_key
            ).toString()
            await hsetAsync(Store.privacy, address, encrypt)

            return {
                code: Code.success,
                msg: Message.success,
            }
        } else {
            return {
                code: Code.err_private_key,
            }
        }
    } catch (error) {
        return {
            code: 2,
            msg: 'private_key is error',
        }
    }
}

export async function get_all_account_detail() {
    try {
        const rs = await hgetAsync(Store.account)

        Object.keys(rs).map((k) => {
            let data = Buffer.from(rs[k]).toString('utf-8')
            console.log(data)
        })
        return rs
    } catch (error) {
        console.log(error)
        return {
            code: Code.not_found,
            msg: Message.not_found,
        }
    }
}

export async function register_account(
    address: string,
    private_key: string,
    account: Account
) {
    try {
        const result_1 = await set_private_key(address, private_key)

        if (result_1) {
            const data = encode(account, private_key)
            const result = await hsetAsync(Store.account, address, data)

            return {
                code: Code.success,
                address,
                result,
            }
        } else
            return {
                code: Code.err_private_key,
                msg: Message.err_private_key,
            }
    } catch (error) {
        return {
            msg: Message.unknown,
            error,
        }
    }
}

export async function validate_account(address: string, private_key: string) {
    try {
        const rs = await hgetallAsync(Store.privacy, address)
        console.log(address, private_key, rs)

        if (!private_key || private_key !== rs) {
            console.log('error')
            return false
        } else {
            console.log('success')
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function set_private_key(address: string, private_key: string) {
    return await hsetAsync(Store.privacy, address, private_key)
}

export async function get_account(address: string, private_key: string) {
    try {
        const is_valid: boolean = await validate_account(address, private_key)
        console.log(
            '🚀 ~ file: api.ts ~ line 133 ~ Api ~ get_account ~ is_valid',
            is_valid
        )

        if (is_valid) {
            const data: string = await hgetAsync(Store.account, address)
            console.log(
                '🚀 ~ file: api.ts ~ line 137 ~ Api ~ get_account ~ address',
                address
            )
            console.log(
                '🚀 ~ file: api.ts ~ line 138 ~ Api ~ get_account ~ data',
                data
            )
            const decrypt = CryptoJS.AES.decrypt(data, private_key).toString(
                CryptoJS.enc.Utf8
            )

            return { account: JSON.parse(decrypt) }
        } else {
            return {
                code: Code.err_private_key,
                msg: Message.err_private_key,
            }
        }
    } catch (error) {
        return {
            code: Code.unknown,
            msg: Message.unknown,
        }
    }
}
