import CryptoJS from 'crypto-js'

function encode<T>(data: T, private_key?: string): string {
    try {
        const input = JSON.stringify(data)
        const key = private_key || 'no_private_key'
        const result = CryptoJS.AES.encrypt(input, key).toString()
        return result
    } catch (error) {
        console.log(error)
        return ''
    }
}

function decode<T>(data: string, private_key?: string): T {
    try {
        const key = private_key || 'no_private_key'
        const output = CryptoJS.AES.decrypt(data, key).toString(
            CryptoJS.enc.Utf8
        )

        const result: T = JSON.parse(output)
        return result
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export { encode, decode }
