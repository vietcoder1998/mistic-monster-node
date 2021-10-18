import { TransactionInfo } from '..'
import { StoreSymbol } from '../enums'
import { add, get, set } from './base'

async function get_tx_detail(address: string) {
    return await get<TransactionInfo>(StoreSymbol.txs, address)
}

async function add_tx(tx: TransactionInfo) {
    return await add<TransactionInfo>(StoreSymbol.txs, tx.address, tx)
}

async function update_tx(tx: TransactionInfo) {
    const data = await get<TransactionInfo>(StoreSymbol.txs, tx.address)

    if (!data || !data.data) {
        return data
    } else {
        return await set<TransactionInfo>(StoreSymbol.txs, tx.address, tx)
    }
}

export { get_tx_detail, add_tx, update_tx }
