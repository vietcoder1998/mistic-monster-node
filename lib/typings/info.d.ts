import { CoinUnit, TransactionType } from '../enums/type';
import { Address } from '../utils/address';
declare type TransactionInfo = {
    block_id: number;
    from: Address;
    to: Address;
    type: TransactionType;
    value: number;
    unit: CoinUnit;
    hash: string;
    data: string;
    create_at: number;
    status: string;
};
declare type NodeInfo = {
    address: string;
    port: number;
    id: number;
    name: string;
    transaction_length: number;
};
declare type BlockInfo = {
    id: number;
    rule: number;
    create_at: number;
    last_hash: string;
    hash: string;
    txs: TransactionInfo[];
    proof: number;
    node_id: number;
};
export { BlockInfo, TransactionInfo, NodeInfo };
