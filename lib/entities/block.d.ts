import { BlockInfo } from '../typings/info';
export default class Block {
    private rule;
    private create_at;
    private last_hash;
    private hash?;
    private txs;
    private proof;
    private height;
    private node_address;
    constructor(height: number, node_address: string, last_hash: string);
    set _rule(rule: number);
    get _hash(): string;
    get _height(): number;
    get _info(): BlockInfo;
    get _node_address(): string;
    set _node_address(node_address: string);
    get _all_transaction_info(): string[];
    push_transaction(tx_hash: string): void;
    generate_hash(last_hash: string): {
        proof: number;
        hash: string;
    };
    is_valid_hash(hash: string): boolean;
}
