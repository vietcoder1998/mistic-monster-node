import { AccountType, CoinUnit, TransactionType } from '../enums/type'
import { Address } from '../utils/address'

type TransactionInfo = {
    address: string
    block_id: number
    from: Address
    to: Address
    payer: Address
    type: TransactionType
    value: number
    unit: CoinUnit
    hash: string
    data: string
    create_at: number
    status: string
}

type AccountInfo = {
    name: string
    address: Address
    txs_hash: string[]
    monster_hash: string[]
    coin: Record<CoinUnit, number>
    type: AccountType
    create_at: number
}

type NodeInfo = {
    address: string
    port: number
    id: number
    name: string
    transaction_length: number
}

type ContractInfo = {
    category: AccountType
    balance: number
    source: string
    address: Address
    deploy_by: Address
    language: 'ts'
}

type BlockInfo = {
    id: number
    rule: number
    create_at: number
    last_hash: string
    hash: string
    txs: string[]
    proof: number
    node_id: number
}

type WalletInfo = {
    address: string
    name: string
    accounts: string[]
    txs_hash: string[]
    create_at: number
}

export {
    BlockInfo,
    TransactionInfo,
    NodeInfo,
    AccountInfo,
    WalletInfo,
    ContractInfo,
}
