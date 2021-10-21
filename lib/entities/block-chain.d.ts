import { Block } from '.';
import { Code } from '../enums';
import { BlockInfo, NodeInfo, TransactionInfo } from '../typings/info';
import Transaction from './transaction';
export default class BlockChain {
    constructor();
    _total_tx(): Promise<{
        code: Code;
        total: number;
    } | {
        code: Code;
        total?: undefined;
    }>;
    _total_nodes(): Promise<{
        code: Code;
        total: number;
    } | {
        code: Code;
        total?: undefined;
    }>;
    _total_account(): Promise<{
        code: Code;
        total: number;
    } | {
        code: Code;
        total?: undefined;
    }>;
    get_total_block(): Promise<{
        code: Code;
        total: number;
    } | {
        code: Code;
        total?: undefined;
    }>;
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
        msg: string;
        data?: string;
        address?: undefined;
        add_list?: undefined;
    } | {
        block: Block;
        tx: Transaction;
        code: Code;
        msg: string;
        data?: string;
        address: string;
        add_list: any;
    }>;
    validate_block(block_info: BlockInfo, address: string, private_key: string): Promise<{
        code: Code;
    }>;
    add_block(block: BlockInfo): Promise<{
        code: Code;
        msg: string;
        address?: undefined;
        add_list?: undefined;
    } | {
        code: Code;
        address: string;
        add_list: any;
        msg?: undefined;
    }>;
    get_list_block(page: number, size: number): Promise<{
        code?: Code;
        data?: BlockInfo[];
    }>;
    get_list_txs(page: number, size: number): Promise<{
        code?: Code;
        data?: TransactionInfo[];
    }>;
    create_account(address: string, name: string, private_key: string): Promise<any>;
    resolve_block(block: BlockInfo, address: string): Promise<{
        code: Code;
        msg: string;
        address?: undefined;
        add_list?: undefined;
    } | {
        code: Code;
        address: string;
        add_list: any;
        msg?: undefined;
    }>;
    get_wallet_detail(address: string, private_key: string): Promise<{
        code: Code;
        data?: import("../typings/info").WalletInfo;
        msg?: string;
    }>;
    create_tx(tx: TransactionInfo): Promise<{
        code: Code;
        msg: string;
        data?: string;
        address?: undefined;
        add_list?: undefined;
    } | {
        code: Code;
        msg: string;
        data?: string;
        address: string;
        add_list: any;
    }>;
    register_node(node: NodeInfo): Promise<{
        code: Code;
        msg: string;
        address?: undefined;
        add_list?: undefined;
    } | {
        code: Code;
        address: string;
        add_list: any;
        msg?: undefined;
    }>;
    add_node(node: NodeInfo): Promise<{
        code: Code;
        msg: string;
        address?: undefined;
        add_list?: undefined;
    } | {
        code: Code;
        address: string;
        add_list: any;
        msg?: undefined;
    }>;
}
