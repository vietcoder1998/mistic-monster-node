import { CoinUnit } from '../enums/type'

type Result = {
    from: string
    time_stamp: number
    to: string
    txHash: string
    type: ResultType
    price: number
    unit: CoinUnit
}

enum ResultType {
    Transfer = 'transfer',
}

type TransferHistory = {
    result: Result[]
    total: number
}

export { Result, ResultType, TransferHistory }
export default TransferHistory
