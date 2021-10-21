import { NodeInfo } from '..'
import { StoreSymbol } from '../enums'
import { add, get, set, total } from '.'

async function get_node_len() {
    return await total(StoreSymbol.nodes)
}

async function get_node_detail(address: string) {
    return await get<NodeInfo>(StoreSymbol.nodes, address)
}

async function register_node(node: NodeInfo) {
    return await add<NodeInfo>(StoreSymbol.txs, String(node.id), node)
}

async function update_node(node: NodeInfo) {
    const result = await get<NodeInfo>(StoreSymbol.txs, String(node.id))

    if (!result || !result.data) {
        return result
    } else {
        return await set<NodeInfo>(StoreSymbol.txs, String(node.id), node)
    }
}

export { get_node_len, get_node_detail, register_node, update_node }
