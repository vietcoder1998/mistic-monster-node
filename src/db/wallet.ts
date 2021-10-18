import { AccountInfo, WalletInfo } from '..'
import { Account } from '../entities'
import { AccountType, StoreSymbol } from '../enums'
import { address } from '../utils'
import { add, get, set } from './base'

async function add_wallet(wallet_info: WalletInfo, private_key: string) {
    const account = new Account(
        address(128),
        wallet_info.name,
        AccountType.USER
    )

    wallet_info.accounts.push(account._address)

    const rs1 = await add<WalletInfo>(
        StoreSymbol.wallets,
        wallet_info.address,
        wallet_info,
        private_key
    )

    const rs2 = await add<AccountInfo>(
        StoreSymbol.accounts,
        account._address,
        account._info
    )

    return {
        rs1,
        rs2,
    }
}

async function get_wallet_detail(address: string, private_key: string) {
    return await get<WalletInfo>(StoreSymbol.wallets, address, private_key)
}

async function add_tx_to_wallet(
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

export { add_tx_to_wallet, add_wallet, update_private_key, get_wallet_detail }
