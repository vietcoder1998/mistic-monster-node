import { add, append, get, get_arr, is_exist, push, query, set } from '.'
import { TransactionInfo } from '..'
import { StoreSymbol } from '../enums'
import { Address } from '../utils/address'

async function get_account_detail(address: string) {
    return await get<TransactionInfo>(StoreSymbol.accounts, address)
}

async function add_account(address: string | string[]) {
    return await append(StoreSymbol.accounts, address)
}

async function add_tx_to_account(tx_hash: Address, address: string) {
    return await push<string>(StoreSymbol.accounts, address, address)
}

async function get_list_accounts(page: number, size: number) {
    return await query<TransactionInfo>(StoreSymbol.accounts, page, size)
}

async function is_exist_account(address: string) {
    return await is_exist(StoreSymbol.accounts, address)
}
export {
    get_account_detail,
    add_account,
    add_tx_to_account,
    get_list_accounts,
    is_exist_account,
}
