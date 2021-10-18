import { WalletInfo } from '..';
declare class Wallet {
    private address;
    private password;
    private seed;
    private accounts;
    private txs_hash;
    create_at: number;
    private name;
    constructor(password: string, seed: string, address: string, name: string);
    get _seed(): string;
    get _name(): string;
    get _address(): string;
    get _pass(): string;
    get _accounts(): string[];
    set _accounts(accounts: string[]);
    get _txs_hash(): string[];
    set _txs_hash(txs_hash: string[]);
    push_account(address: string): void;
    push_txs_hash(txs_hash: string): void;
    get _info(): WalletInfo;
}
export default Wallet;
