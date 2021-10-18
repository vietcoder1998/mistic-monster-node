import { Code, StoreSymbol } from '../enums'
import {
    delAsync,
    flushAsync,
    hgetAsync,
    hlenAsync,
    hsetAsync,
    lpushAsync,
    lrange,
} from '../redis'
import { decode, encode } from '../utils'

async function init() {
    Object.keys(StoreSymbol).forEach(async (symbol: StoreSymbol) => {
        if (symbol === StoreSymbol.privacy) {
            hsetAsync(symbol, {})
        } else hsetAsync(symbol, 'address', [])
    })
}

async function destroy() {
    return flushAsync()
}

async function add<T>(
    symbol: StoreSymbol,
    address: string,
    value: T,
    private_key?: string
) {
    try {
        const push_address = await lpushAsync(`${symbol}.address`, address)
        const add_symbol = await hsetAsync(
            symbol,
            address,
            encode(value, private_key)
        )

        return {
            add_symbol,
            push_address,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function get<T>(
    symbol: StoreSymbol,
    address: string,
    private_key?: string
): Promise<{ code: Code; data?: T | undefined }> {
    try {
        const value = await hgetAsync(symbol, address)
        const data: T = decode<T>(value, private_key)

        return {
            code: Code.success,
            data,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function take_last<T>(symbol: StoreSymbol, private_key?: string) {
    try {
        const last_address: string = await lrange(`${symbol}.address`, -1, -1)
        const data = await get<T>(symbol, last_address, private_key)
        return {
            code: Code.success,
            data,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}
async function set<T>(
    symbol: StoreSymbol,
    address: string,
    data: T,
    private_key?: string
) {
    try {
        const result = await hsetAsync(
            symbol,
            address,
            encode<T>(data, private_key)
        )

        return result
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function clear(symbol: StoreSymbol) {
    try {
        const result = await hsetAsync(symbol, {})

        return {
            code: Code.success,
            result,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function del(symbol: StoreSymbol, address: string) {
    try {
        const result = await delAsync(symbol, address)

        return {
            code: Code.success,
            result,
            address,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function validate(
    address: string,
    private_key: string
): Promise<boolean> {
    try {
        const data = await get<string>(StoreSymbol.privacy, address)
        if (!data || data.data !== private_key) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

async function total(symbol: StoreSymbol) {
    try {
        const total: number = await hlenAsync(symbol)
        return {
            code: Code.success,
            total,
        }
    } catch (error) {
        console.log(error)
        return {
            Code: Code.unknown,
        }
    }
}

async function query(symbol: Symbol, start: number, end: number) {
    try {
        const query_list: string[] = await hgetAsync(`${symbol}.address`)
        const result = await hgetAsync(symbol, ...query_list)
        return {
            code: Code.success,
            result,
        }
    } catch (error) {
        console.log(error)
        return {
            Code: Code.unknown,
        }
    }
}

export {
    add,
    get,
    set,
    clear,
    del,
    validate,
    total,
    init,
    destroy,
    query,
    take_last,
}
