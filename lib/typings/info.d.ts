import { AccountType, CoinUnit, TransactionType, TransactionState } from '../enums/type';
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
    monster_hash: string[];
    coin: Record<CoinUnit, number>;
    type: AccountType;
    create_at: number;
};
declare type ShortAccountInfo = {
    name: string;
    address: Address;
    coin: Record<CoinUnit, number>;
    txs: string[];
};
declare type ShotTransactionInfo = {
    address: Address;
    unit: CoinUnit;
    value: number;
    create_at: number;
    state: TransactionState;
};
declare type NodeInfo = {
    address: string;
    host: string;
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
    height: number;
    rule: number;
    create_at: number;
    last_hash: string;
    hash: string;
    txs: string[];
    proof: number;
    node_address: string;
};
declare type WalletInfo = {
    address: string;
    name: string;
    accounts: ShortAccountInfo[];
    txs_hash: string[];
    create_at: number;
};
export { BlockInfo, TransactionInfo, NodeInfo, AccountInfo, WalletInfo, ContractInfo, ShortAccountInfo, ShotTransactionInfo, };
