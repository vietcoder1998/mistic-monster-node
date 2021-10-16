import { BlockInfo } from '../typings/info';
import Transaction from './transaction';
export default class Block {
    private rule;
    private create_at;
    private last_hash;
    private hash?;
    private txs;
    private proof;
    private id;
    private node_id;
    constructor(id: number, node_id: number, last_hash: string);
    set _rule(rule: number);
    get _hash(): string;
    get _id(): number;
    get _info(): BlockInfo;
    get _all_transaction_info(): import("../typings/info").TransactionInfo[];
    push_transaction(tx: Transaction): void;
    gen_hash(last_hash: string): {
        proof: number;
        hash: string;
    };
    is_valid_hash(hash: string): boolean;
}
