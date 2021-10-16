import { CoinUnit, TransactionType } from '../enums/type';
import { BlockInfo } from '../typings';
declare class MMCNode {
    private id;
    private address;
    private port;
    private private_key;
    private name;
    private level;
    private txs;
    private blocks;
    private last_block;
    constructor(id: number, address: string, port: number, name: string, private_key: string);
    get _address(): string;
    get _last_block(): BlockInfo;
    set _last_block(block: BlockInfo);
    get _port(): number;
    get _private_key(): string;
    get _id(): number;
    get _name(): string;
    get _level(): number;
    get _info(): {
        address: string;
        port: number;
        id: number;
        name: string;
        level: number;
    };
    get _last_transaction(): {};
    change_key(last_key: string, new_key: string): "Success" | "Error Key";
    create_transaction(from: string, to: string, value: number, unit: CoinUnit, type: TransactionType, data: string): void;
    create_block(): BlockInfo;
    is_validate_hash(): boolean;
}
export default MMCNode;
