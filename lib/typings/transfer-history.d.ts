import { CoinUnit, TransactionType } from '../enums/type';
declare type Result = {
    from: string;
    time_stamp: number;
    to: string;
    txHash: string;
    type: TransactionType;
    price: number;
    unit: CoinUnit;
};
declare type TransferHistory = {
    result: Result[];
    total: number;
};
export { Result, TransferHistory };
