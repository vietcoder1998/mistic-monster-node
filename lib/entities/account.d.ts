import { AccountInfo } from '..';
import { AccountType, CoinUnit } from '../enums/type';
import { ShortAccountInfo } from '../typings/info';
import { Address } from '../utils/address';
export default class Account {
    private name;
    private address;
    private txs;
    private monster_hash;
    private coin;
    private type;
    private create_at;
    constructor(address: Address, name: string, type: AccountType);
    set _address(address: Address);
    get _address(): Address;
    get _create_at(): number;
    set _name(name: string);
    get _name(): string;
    get _monster_hash(): string[];
    set _monster_hash(monster_hash: string[]);
    get _type(): AccountType;
    set _type(type: AccountType);
    get _coin(): Record<CoinUnit, number>;
    push_coin(unit: CoinUnit, value: number): void;
    add_transaction(tx: string): void;
    get _info(): AccountInfo;
    get _short_info(): ShortAccountInfo;
}
