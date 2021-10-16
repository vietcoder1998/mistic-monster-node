import { ResponseMessage } from './message';
import { RedisStore } from './redis';
import { MonsterType, AccountType, CoinUnit, TransactionType } from './type';
declare enum Code {
    Success = 200,
    Error = 500,
    NotFound = 404,
    RequestError = 409
}
declare enum Message {
    Success = "success",
    Error = "error",
    NotFound = "notfound",
    RequestError = "req_error"
}
export { ResponseMessage, RedisStore, MonsterType, AccountType, CoinUnit, TransactionType, Code, Message, };
