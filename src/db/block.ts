import { BlockInfo } from '..'
import { StoreSymbol } from '../enums/redis'
import { add, get, query, set, take_last } from '.'

async function push_block(block_info: BlockInfo) {
    return await add<BlockInfo>(
        StoreSymbol.blocks,
        String(block_info.height),
        block_info
    )
}

async function get_block_detail(id: string) {
    return await get<BlockInfo>(StoreSymbol.blocks, id)
}

async function add_tx_to_block(tx_hash: string, height: number) {
    const r = await take_last<BlockInfo>(StoreSymbol.blocks)

    if (!r.data) {
        return {
            code: r.code,
            msg: 'block is not found',
        }
    } else {
        const new_block: BlockInfo = r.data
        new_block.txs.push(tx_hash)
        const result = await set<BlockInfo>(
            StoreSymbol.blocks,
            String(new_block.height),
            new_block
        )
        return result
    }
}

async function get_last_block() {
    return await take_last<BlockInfo>(StoreSymbol.blocks)
}

async function get_list_block(page: number, size: number) {
    const start = (page || 0) * (size || 0)
    const end = start + (size || 10)
    return await query<BlockInfo>(StoreSymbol.blocks, start, end)
}

export {
    get_last_block,
    get_block_detail,
    add_tx_to_block,
    push_block,
    get_list_block,
}
