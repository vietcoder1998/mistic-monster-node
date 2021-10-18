import { WalletInfo, Code, decode, encode, Message } from '..'
import { StoreSymbol } from '../enums'
import { hgetAsync } from '../redis'
import { add, get, set } from './base'

export async function add_wallet(wallet_info: WalletInfo, private_key: string) {
    return await add<WalletInfo>(
        StoreSymbol.wallets,
        wallet_info.address,
        wallet_info,
        private_key
    )
}

export async function get_wallet_detail(address: string, private_key: string) {
    return await get<WalletInfo>(StoreSymbol.wallets, address, private_key)
}

export async function add_tx_to_wallet(
    address: string,
    tx_hash: string,
    private_key: string
) {
    const data = await get<WalletInfo>(
        StoreSymbol.wallets,
        address,
        private_key
    )
    if (!data.data) {
        return data
    } else {
        const wallet_info = data.data
        wallet_info.txs_hash.push(tx_hash)

        return await set<WalletInfo>(
            StoreSymbol.wallets,
            wallet_info.address,
            wallet_info
        )
    }
}
