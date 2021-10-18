import { BlockInfo } from '..'
import { StoreSymbol } from '../enums/redis'
import { add, get, set, take_last, total } from './base'

async function add_block(block_info: BlockInfo) {
    return add<BlockInfo>(StoreSymbol.blocks, String(block_info.id), block_info)
}

async function get_block_detail(id: string) {
    return get<BlockInfo>(StoreSymbol.blocks, id)
}

async function add_tx_to_block(tx_hash: string, block_id: string) {
    const r = await get<BlockInfo>(StoreSymbol.blocks, block_id)

    if (!r.data) {
        return {
            code: r.code,
        }
    } else {
        const new_block: BlockInfo = r.data
        new_block.txs.push(tx_hash)
        const result = await set<BlockInfo>(
            StoreSymbol.blocks,
            block_id,
            new_block
        )
        return result
    }
}

async function get_last_block() {
    return await take_last<BlockInfo>(StoreSymbol.blocks)
}

export { get_last_block, get_block_detail, add_tx_to_block, add_block }
