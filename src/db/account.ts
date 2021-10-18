import { Account, Code, encode, Message, Store } from '..'
import { StoreSymbol } from '../enums'
import { AccountInfo } from '../typings'
import { get, set } from './base'

async function add_account(private_key: string, account: AccountInfo) {
    return await set<string>(
        StoreSymbol.privacy,
        account.address,
        encode(account, private_key)
    )
}

async function register_account(account: AccountInfo, private_key: string) {
    if (!private_key) {
        return {
            code: Code.not_found,
            msg: 'private key is requirement',
        }
    }
    return await set<AccountInfo>(
        StoreSymbol.accounts,
        account.address,
        account
    )
}

async function update_private_key(
    address: string,
    private_key: string,
    new_private_key: string
) {
    const data = await get<string>(StoreSymbol.privacy, address, private_key)

    if (!data.data || data.data !== private_key) {
        return data
    } else {
        return await set<string>(StoreSymbol.privacy, address, new_private_key)
    }
}

async function get_account(address: string, private_key: string) {
    return get<AccountInfo>(StoreSymbol.accounts, address, private_key)
}

export { add_account, get_account, register_account, update_private_key }
