import { WalletInfo } from '..';
import { ShortAccountInfo } from '../typings/info';
declare class Wallet {
    private address;
    private password;
    private accounts;
    private txs_hash;
    create_at: number;
    private name;
    constructor(password?: string, address?: string, name?: string, create_at?: number);
    get _name(): string;
    get _address(): string;
    get _pass(): string;
    get _accounts(): ShortAccountInfo[];
    set _accounts(accounts: ShortAccountInfo[]);
    get _txs_hash(): string[];
    set _txs_hash(txs_hash: string[]);
    push_account(info: ShortAccountInfo): void;
    push_txs(tx_hash: string, address: string): void;
    get _info(): WalletInfo;
}
export default Wallet;
