import { AccountType, CoinUnit, TransactionType } from '../enums/type';
import { Address } from '../utils/address';
declare type TransactionInfo = {
    address: string;
    block_id: number;
    from: Address;
    to: Address;
    payer: Address;
    type: TransactionType;
    value: number;
    unit: CoinUnit;
    hash: string;
    data: string;
    create_at: number;
    status: string;
};
declare type AccountInfo = {
    name: string;
    address: Address;
    txs_hash: string[];
    monster_hash: string[];
    coin: Record<CoinUnit, number>;
    type: AccountType;
    create_at: number;
};
declare type NodeInfo = {
    address: string;
    port: number;
    id: number;
    name: string;
    transaction_length: number;
};
declare type ContractInfo = {
    category: AccountType;
    balance: number;
    source: string;
    address: Address;
    deploy_by: Address;
    language: 'ts';
};
declare type BlockInfo = {
    id: number;
    rule: number;
    create_at: number;
    last_hash: string;
    hash: string;
    txs: string[];
    proof: number;
    node_id: number;
};
declare type WalletInfo = {
    address: string;
    name: string;
    accounts: string[];
    txs_hash: string[];
    create_at: number;
};
export { BlockInfo, TransactionInfo, NodeInfo, AccountInfo, WalletInfo, ContractInfo, };
