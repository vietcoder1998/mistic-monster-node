import { encode, NodeInfo, Store } from '..'
import { StoreSymbol } from '../enums'
import { add, get, set, total } from './base'

async function get_node_len() {
    return await total(StoreSymbol.nodes)
}

async function get_node_detail(address: string) {
    return await total(StoreSymbol.nodes)
}

async function add_node(node: NodeInfo) {
    return await add<NodeInfo>(StoreSymbol.txs, String(node.id), node)
}

async function update_node(node: NodeInfo) {
    const data = await get<NodeInfo>(StoreSymbol.txs, String(node.id))

    if (!data || !data.data) {
        return data
    } else {
        return await set<NodeInfo>(StoreSymbol.txs, String(node.id), node)
    }
}

export { get_node_len, get_node_detail, add_node, update_node }
