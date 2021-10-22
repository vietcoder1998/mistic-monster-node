import { Block } from '.';
import { Code, Message } from '../enums';
import { BlockInfo, NodeInfo, TransactionInfo } from '../typings/info';
import Transaction from './transaction';
export default class BlockChain {
    provider: string;
    constructor();
    _total_tx(): Promise<number>;
    _total_account(): Promise<number>;
    get_total_block(): Promise<number>;
    get_last_block(): Promise<{
        code: Code;
        data: BlockInfo;
        msg?: undefined;
    } | {
        code: Code;
        msg: string;
        data?: undefined;
    } | {
        code: Code;
        data?: undefined;
        msg?: undefined;
    }>;
    get_block_detail(height: number): Promise<{
        code: Code;
        data?: BlockInfo;
        msg?: string;
    }>;
    get_tx_detail(hash: string): Promise<{
        code: Code;
        data?: TransactionInfo;
        msg?: string;
    }>;
    register_wallet(password: string, name: string): Promise<{
        code: Code;
        result: any;
        msg?: undefined;
    } | {
        code: Code;
        msg: string;
        result?: undefined;
    } | {
        wallet_address: string;
        account_address: string;
        msg?: undefined;
        seed: string;
        private_key: string;
    } | {
        msg: string;
        wallet_address?: undefined;
        account_address?: undefined;
        seed: string;
        private_key: string;
    }>;
    private compare_hash;
    mine_block(node_address: string, address: string): Promise<{
        code: Code;
        msg: string;
    } | {
        block: Block;
        tx: Transaction;
        code: Code;
        msg?: string;
        data?: string;
        address: string;
    } | {
        block: Block;
        tx: Transaction;
        code: Code;
        msg: string;
        data?: string;
        address?: undefined;
    } | {
        code: Code;
        msg?: undefined;
    }>;
    add_block(block: BlockInfo): Promise<{
        code: Code;
        address: string;
        msg?: undefined;
    } | {
        code: Code;
        msg: string;
        address?: undefined;
    }>;
    get_list_block(page: number, size: number): Promise<{
        code?: Code;
        data?: BlockInfo[];
        total?: number;
        start?: number;
        end?: number;
    }>;
    get_list_txs(page: number, size: number): Promise<{
        code?: Code;
        data?: TransactionInfo[];
        total?: number;
        start?: number;
        end?: number;
    }>;
    create_account(address: string, name: string, private_key: string): Promise<any>;
    resolve_block(block: BlockInfo, address: string): Promise<{
        code: Code;
        msg: Message;
    } | {
        code: Code;
        msg?: undefined;
    }>;
    get_wallet_detail(address: string, private_key: string): Promise<{
        code: Code;
        data?: import("../typings/info").WalletInfo;
        msg?: string;
    }>;
    create_tx(tx: TransactionInfo): Promise<{
        code: Code;
        msg?: string;
        data?: string;
        address: string;
    } | {
        code: Code;
        msg: string;
        data?: string;
        address?: undefined;
    }>;
    register_node(node: NodeInfo): Promise<{
        code: Code;
        address: string;
        msg?: undefined;
    } | {
        code: Code;
        msg: string;
        address?: undefined;
    } | {
        code: Code;
    }>;
    add_node(node: NodeInfo): Promise<{
        code: Code;
        address: string;
        msg?: undefined;
    } | {
        code: Code;
        msg: string;
        address?: undefined;
    } | {
        code: Code;
    }>;
    get_price_of_account(address: string): Promise<{
        code: Code;
        txs?: undefined;
    } | {
        code: Code;
        txs: TransactionInfo[];
    }>;
}
