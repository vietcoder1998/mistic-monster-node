import { AccountType, CoinUnit } from '../enums/type';
import { Address } from '../utils/address';
export default class Account {
    private id;
    private name;
    private address;
    private transaction_hash;
    private monster_hash;
    private coin;
    private type;
    private create_at;
    constructor(id: string, name: string, type: AccountType);
    set _address(address: Address);
    get _address(): Address;
    get _id(): string;
    set _id(id: string);
    get _create_at(): number;
    set _name(name: string);
    get _name(): string;
    get _monster_hash(): string[];
    set _monster_hash(monster_hash: string[]);
    get _type(): AccountType;
    set _type(type: AccountType);
    get _coin(): Record<CoinUnit, number>;
    push_coin(unit: CoinUnit, value: number): void;
    add_transaction(hash: string): void;
}
