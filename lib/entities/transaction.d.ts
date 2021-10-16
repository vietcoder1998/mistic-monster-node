import { CoinUnit, TransactionType } from '../enums/type';
import { TransactionInfo } from '../typings';
declare class Transaction {
    private type;
    private from;
    private to;
    private value;
    private unit;
    private create_at;
    private data;
    private hash;
    private status;
    private block_id;
    constructor(block_id: number, from: string, to: string, value: number, type: TransactionType, unit: CoinUnit, data: any);
    get _type(): TransactionType;
    get _from(): string;
    get _to(): string;
    get _value(): number;
    get _unit(): CoinUnit;
    get _data(): string;
    get _hash(): string;
    get _create_at(): number;
    get _status(): string;
    get _block_id(): number;
    set _status(status: string);
    get _info(): TransactionInfo;
}
export default Transaction;
