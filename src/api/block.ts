import { BlockInfo, Code, decode, encode, hsetAsync, Message, Store } from '..'
import { hgetAsync } from '../redis'

export async function save_block(block_info: BlockInfo) {
    try {
        const data: string = encode(block_info)

        console.log(data)
        const result: string = await hsetAsync(
            Store.blocks,
            block_info.id,
            data
        )

        return {
            result,
            code: Code.success,
        }
    } catch (error) {
        return {
            code: Code.unknown,
            msg: Message.unknown,
        }
    }
}

export async function get_block(id: string) {
    try {
        console.log(id)
        const data: string = await hgetAsync(Store.blocks, id)
        const block: BlockInfo = decode<BlockInfo>(data)

        return {
            block,
            code: Code.success,
        }
    } catch (error) {
        return {
            code: Code.unknown,
            msg: Message.unknown,
        }
    }
}

export async function add_tx_to_block(hash: string, tx_hash: string) {
    try {
        const block: string = await hgetAsync(Store.blocks, hash)
        const block_info: BlockInfo = decode(block)

        block_info.txs.push(tx_hash)

        const result = await hsetAsync(Store.blocks, hash, encode(block_info))

        return {
            result,
            code: Code.success,
        }
    } catch (error) {
        return {
            code: Code.unknown,
            msg: Message.unknown,
        }
    }
}
