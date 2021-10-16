import { Message } from 'websocket';
import { Code } from '../enums';
export default class Response<T> {
    code: Code;
    msg?: Message;
    data: T | Message | string;
    constructor(code?: Code, data?: T | Message | string);
}
