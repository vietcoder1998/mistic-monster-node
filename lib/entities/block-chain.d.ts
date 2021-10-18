import { AccountType } from '../enums/type';
import { BlockInfo } from '../typings/info';
export default class BlockChain {
    constructor();
    _total_tx(): Promise<{
        code: import("../enums/code").Code;
        total: number;
        Code?: undefined;
    } | {
        Code: import("../enums/code").Code;
        code?: undefined;
        total?: undefined;
    }>;
    _total_nodes(): Promise<{
        code: import("../enums/code").Code;
        total: number;
        Code?: undefined;
    } | {
        Code: import("../enums/code").Code;
        code?: undefined;
        total?: undefined;
    }>;
    _total_account(): Promise<{
        code: import("../enums/code").Code;
        total: number;
        Code?: undefined;
    } | {
        Code: import("../enums/code").Code;
        code?: undefined;
        total?: undefined;
    }>;
    get_total_block(): Promise<{
        code: import("../enums/code").Code;
        total: number;
        Code?: undefined;
    } | {
        Code: import("../enums/code").Code;
        code?: undefined;
        total?: undefined;
    }>;
    get_last_block(): Promise<{
        code: import("../enums/code").Code;
        data: {
            code: import("../enums/code").Code;
            data?: BlockInfo;
        };
    } | {
        code: import("../enums/code").Code;
        data?: undefined;
    }>;
    register_wallet(password: string, seed: string, name: string): Promise<{
        rs1: {
            add_symbol: any;
            push_address: any;
            code?: undefined;
        } | {
            code: import("../enums/code").Code;
            add_symbol?: undefined;
            push_address?: undefined;
        };
        rs2: {
            add_symbol: any;
            push_address: any;
            code?: undefined;
        } | {
            code: import("../enums/code").Code;
            add_symbol?: undefined;
            push_address?: undefined;
        };
    }>;
    create_account(wallet_address: string, type?: AccountType, name?: string): Promise<void>;
    get_wallet_detail(address: string, private_key: string): Promise<{
        code: import("../enums/code").Code;
        data?: import("../typings/info").WalletInfo;
    }>;
    get_account_detail(address: string): Promise<void>;
    create_wallet(password: string, seed: string, name?: string): Promise<void>;
    get_transaction_detail(address: string): Promise<void>;
    register_node(address: string, port: number, name: string, private_key?: string): Promise<void>;
    add_block(block_info: BlockInfo): Promise<void>;
    compare_transaction(len: number): Promise<void>;
}
