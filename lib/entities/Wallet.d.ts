declare class Wallet {
    private address;
    private password;
    private seed;
    private accounts;
    private transaction_hash;
    create_at: number;
    constructor(password: string, seed: string, address: string);
    get _seed(): string;
    get _address(): string;
    get _pass(): string;
    get _accounts(): string[];
    set _accounts(accounts: string[]);
    get _transaction_hash(): string[];
    set _transaction_hash(transaction_hash: string[]);
    push_account(address: string): void;
    push_transaction_hash(transaction_hash: string): void;
    get _info(): {
        address: string;
        seed: string;
        accounts: string[];
        transaction_hash: string[];
        create_at: number;
    };
}
export default Wallet;
